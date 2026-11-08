import argparse
import datetime as dt
import html
import json
import logging
import re
import smtplib
import sys
import time
from dataclasses import dataclass
from email.message import EmailMessage
from pathlib import Path
from typing import List
from urllib.parse import urlencode, quote_plus, urljoin, urlparse

import feedparser
import pytz
import requests
from bs4 import BeautifulSoup

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, KeepTogether

USER_AGENT = "Mozilla/5.0 (compatible; RentalReporter/5.2; +local-script)"


@dataclass
class Listing:
    source: str
    title: str
    url: str
    price: str
    location: str
    posted: str
    snippet: str
    bedrooms: int | None
    address: str
    score: int
    category: str
    reasoning: List[str]


logger = logging.getLogger("rental_reporter")


def setup_logging(log_path: Path):
    log_path.parent.mkdir(parents=True, exist_ok=True)
    logger.setLevel(logging.INFO)
    logger.handlers.clear()

    formatter = logging.Formatter("%(asctime)s %(levelname)s %(message)s")

    file_handler = logging.FileHandler(log_path, encoding="utf-8")
    file_handler.setFormatter(formatter)
    logger.addHandler(file_handler)

    stream_handler = logging.StreamHandler(sys.stdout)
    stream_handler.setFormatter(formatter)
    logger.addHandler(stream_handler)


def load_json(path: Path, default):
    if path.exists():
        return json.loads(path.read_text(encoding="utf-8"))
    return default


def save_json(path: Path, data):
    path.write_text(json.dumps(data, indent=2, ensure_ascii=False), encoding="utf-8")


def norm(text: str) -> str:
    return re.sub(r"\s+", " ", (text or "").strip().lower())


def clean_text(text: str) -> str:
    return re.sub(r"\s+", " ", (text or "").strip())


def normalize_address(text: str) -> str:
    t = norm(text)
    replacements = {
        " street ": " st ",
        " avenue ": " ave ",
        " road ": " rd ",
        " drive ": " dr ",
        " lane ": " ln ",
        " boulevard ": " blvd ",
        " court ": " ct ",
        " place ": " pl ",
        " terrace ": " ter ",
        " apartment ": " apt ",
        "#": " apt ",
        ", mt": "",
        " montana": "",
    }
    t = f" {t} "
    for a, b in replacements.items():
        t = t.replace(a, b)
    t = re.sub(r"[^a-z0-9 ]+", " ", t)
    return re.sub(r"\s+", " ", t).strip()


def extract_bedrooms(text: str):
    t = norm(text)
    for p in [
        r"\b([1-9])\s*(?:br|bed|bedroom|bedrooms)\b",
        r"\b([1-9])\s*-\s*bed(?:room)?\b",
    ]:
        m = re.search(p, t)
        if m:
            return int(m.group(1))
    return None


def get_scoring(cfg: dict):
    defaults = {
        "two_bedroom": 4,
        "one_bedroom_office": 4,
        "one_bedroom_only": 1,
        "yard": 3,
        "pet_friendly": 3,
        "negative_pet_penalty": -5,
        "location_match": 1,
        "house_style": 1,
        "strong_match_min_score": 8,
        "possible_match_min_score": 4,
    }
    merged = defaults.copy()
    merged.update(cfg.get("scoring", {}))
    return merged


def score_listing(title: str, snippet: str, location: str, cfg: dict):
    weights = get_scoring(cfg)
    full = " ".join([title or "", snippet or "", location or ""])
    t = norm(full)
    reasons = []
    score = 0
    bedrooms = extract_bedrooms(full)

    if bedrooms == 2:
        score += weights["two_bedroom"]
        reasons.append(f"2-bedroom layout detected (+{weights['two_bedroom']})")
    elif bedrooms == 1 and re.search(r"\b(office|bonus room|den|study)\b", t):
        score += weights["one_bedroom_office"]
        reasons.append(f"1-bedroom with office/bonus-room language detected (+{weights['one_bedroom_office']})")
    elif bedrooms == 1:
        score += weights["one_bedroom_only"]
        reasons.append(f"1-bedroom detected, office not confirmed (+{weights['one_bedroom_only']})")

    if re.search(r"\b(yard|fenced yard|fenced|large yard|private yard|backyard|fenced-in yard)\b", t):
        score += weights["yard"]
        reasons.append(f"yard/fenced-yard language detected (+{weights['yard']})")

    if re.search(r"\b(dogs ok|dog ok|dogs allowed|pets ok|pet friendly|cats ok|dog friendly|pet accepted|dogs|pets)\b", t):
        score += weights["pet_friendly"]
        reasons.append(f"pet-friendly language detected (+{weights['pet_friendly']})")

    if re.search(r"\b(no pets|not pet friendly|sorry no pets)\b", t):
        score += weights["negative_pet_penalty"]
        reasons.append(f"negative pet language detected ({weights['negative_pet_penalty']})")

    for town in ["butte", "anaconda", "walkerville", "rocker", "opportunity"]:
        if town in t:
            score += weights["location_match"]
            reasons.append(f"location/radius match: {town} (+{weights['location_match']})")
            break

    if re.search(r"\b(house|single family|duplex|cottage|home)\b", t):
        score += weights["house_style"]
        reasons.append(f"house-style unit likely to have yard (+{weights['house_style']})")

    if score >= weights["strong_match_min_score"]:
        category = "Strong match"
    elif score >= weights["possible_match_min_score"]:
        category = "Possible match"
    else:
        category = "Weak / manual review"

    return score, category, reasons, bedrooms


def guess_address(title: str, snippet: str, location: str, url: str) -> str:
    text = " ".join([title or "", snippet or "", location or ""])
    m = re.search(r"\b\d{1,6}\s+[A-Za-z0-9.\-]+\s+(?:st|street|ave|avenue|rd|road|dr|drive|ln|lane|blvd|boulevard|ct|court|pl|place|way|ter|terrace)\b", text, flags=re.I)
    if m:
        return clean_text(m.group(0))
    path = urlparse(url).path.replace("-", " ").replace("/", " ")
    m2 = re.search(r"\b\d{1,6}\s+[A-Za-z0-9.\-]+\s+(?:st|street|ave|avenue|rd|road|dr|drive|ln|lane|blvd|boulevard|ct|court|pl|place|way|ter|terrace)\b", path, flags=re.I)
    if m2:
        return clean_text(m2.group(0))
    return clean_text(title or location or url)


def dedupe_cross_source(items: list[Listing]) -> list[Listing]:
    chosen = {}
    for item in items:
        addr_key = normalize_address(item.address)
        title_key = normalize_address(item.title)
        url_key = re.sub(r"[?#].*$", "", item.url or "")
        key = addr_key if re.search(r"\d", addr_key) else title_key or url_key
        current = chosen.get(key)
        if current is None:
            chosen[key] = item
            continue

        def richness(x: Listing):
            return (x.score, len(x.reasoning), len(x.snippet or ""), 1 if x.price else 0, 1 if x.address and re.search(r"\d", x.address) else 0, 1 if x.url else 0)

        if richness(item) > richness(current):
            chosen[key] = item

    return sorted(chosen.values(), key=lambda x: (-x.score, x.price or "", x.title.lower()))


def fetch(url: str) -> str:
    r = requests.get(url, headers={"User-Agent": USER_AGENT}, timeout=30)
    r.raise_for_status()
    return r.text


def fetch_craigslist(search_cfg: dict, cfg: dict) -> list[Listing]:
    base_url = "https://montana.craigslist.org/search/apa"
    queries = ["2br dog yard", "2 bedroom pets yard", "1 bedroom office dog yard", "bonus room fenced yard", ""]
    out = []
    for q in queries:
        params = {
            "hasPic": 1,
            "availabilityMode": 0,
            "search_distance": search_cfg.get("search_distance_miles", 35),
            "lat": search_cfg["lat"],
            "lon": search_cfg["lon"],
            "min_price": search_cfg.get("min_price", 0),
            "max_price": search_cfg.get("max_price", 999999),
            "sort": "date",
            "query": q,
        }
        url = f"{base_url}?{urlencode(params)}"
        try:
            html_text = fetch(url)
        except Exception as e:
            logger.warning("Craigslist fetch failed for query '%s': %s", q, e)
            continue
        try:
            soup = BeautifulSoup(html_text, "lxml")
            rows = soup.select("li.cl-static-search-result, li.result-row")
        except Exception as e:
            logger.warning("Craigslist parse failed for query '%s': %s", q, e)
            continue

        for row in rows:
            try:
                title_el = row.select_one(".title") or row.select_one("a.result-title")
                price_el = row.select_one(".price")
                loc_el = row.select_one(".location") or row.select_one(".result-hood")
                snippet_el = row.select_one(".description") or row.select_one(".result-meta")
                url_el = row.select_one("a")
                posted_el = row.select_one("time")
                title = clean_text(title_el.get_text(" ", strip=True) if title_el else "")
                listing_url = url_el.get("href", "") if url_el else ""
                price = clean_text(price_el.get_text(" ", strip=True) if price_el else "")
                location = clean_text((loc_el.get_text(" ", strip=True) if loc_el else "").strip(" ()"))
                snippet = clean_text(snippet_el.get_text(" ", strip=True) if snippet_el else "")
                posted = posted_el.get("datetime", "") if posted_el else ""
                score, category, reasons, bedrooms = score_listing(title, snippet, location, cfg)
                address = guess_address(title, snippet, location, listing_url)
                out.append(Listing("Craigslist", title, listing_url, price, location, posted, snippet, bedrooms, address, score, category, reasons))
            except Exception as e:
                logger.warning("Craigslist listing parse failed and was skipped: %s", e)
    return out


def fetch_zillow(location_query: str, cfg: dict) -> list[Listing]:
    base = f"https://www.zillow.com/homes/for_rent/{quote_plus(location_query).replace('%2C','')}_rb/"
    out = []
    try:
        html_text = fetch(base)
    except Exception as e:
        logger.warning("Zillow fetch failed for location '%s': %s", location_query, e)
        return out
    try:
        soup = BeautifulSoup(html_text, "lxml")
        cards = soup.select("article") or soup.select('[data-test="property-card"]')
    except Exception as e:
        logger.warning("Zillow parse failed for location '%s': %s", location_query, e)
        return out
    for card in cards:
        try:
            text = clean_text(card.get_text(" ", strip=True))
            if not text:
                continue
            a = card.select_one("a[href]")
            listing_url = urljoin("https://www.zillow.com", a.get("href", "")) if a else base
            title = text[:180]
            price_match = re.search(r"\$\s?[\d,]+(?:/\w+)?", text)
            price = price_match.group(0) if price_match else ""
            address = guess_address(text, text, location_query, listing_url)
            score, category, reasons, bedrooms = score_listing(title, text, location_query, cfg)
            out.append(Listing("Zillow", title, listing_url, price, location_query, "", text, bedrooms, address, score, category, reasons))
        except Exception as e:
            logger.warning("Zillow listing parse failed for location '%s' and was skipped: %s", location_query, e)
    return out


def fetch_redfin(location_query: str, cfg: dict) -> list[Listing]:
    slug = location_query.lower().replace(", mt", "").replace(" ", "-")
    candidate_feeds = [
        f"https://www.redfin.com/stingray/{slug}/newest_listings.rss",
        f"https://www.redfin.com/stingray/{slug}/rental_houses/newest_listings.rss",
        f"https://www.redfin.com/stingray/{slug}/rentals/newest_listings.rss",
    ]
    out = []
    for feed_url in candidate_feeds:
        try:
            parsed = feedparser.parse(feed_url)
        except Exception as e:
            logger.warning("Redfin feed parse failed for '%s': %s", feed_url, e)
            continue
        if not parsed.entries:
            logger.info("Redfin feed returned no entries for '%s'", feed_url)
            continue
        for entry in parsed.entries:
            try:
                title = clean_text(getattr(entry, "title", ""))
                listing_url = getattr(entry, "link", "")
                snippet = clean_text(BeautifulSoup(getattr(entry, "summary", ""), "lxml").get_text(" ", strip=True))
                price_match = re.search(r"\$\s?[\d,]+(?:/\w+)?", f"{title} {snippet}")
                price = price_match.group(0) if price_match else ""
                address = guess_address(title, snippet, location_query, listing_url)
                score, category, reasons, bedrooms = score_listing(title, snippet, location_query, cfg)
                out.append(Listing("Redfin", title, listing_url, price, location_query, "", snippet, bedrooms, address, score, category, reasons))
            except Exception as e:
                logger.warning("Redfin listing parse failed for location '%s' and was skipped: %s", location_query, e)
    return out


def fetch_apartments(location_query: str, cfg: dict) -> list[Listing]:
    slug = location_query.lower().replace(", mt", "").replace(" ", "-")
    base = f"https://www.apartments.com/{slug}-mt/"
    out = []
    try:
        html_text = fetch(base)
    except Exception as e:
        logger.warning("Apartments.com fetch failed for location '%s': %s", location_query, e)
        return out
    try:
        soup = BeautifulSoup(html_text, "lxml")
        cards = soup.select("article.placard") or soup.select("li.mortar-wrapper")
    except Exception as e:
        logger.warning("Apartments.com parse failed for location '%s': %s", location_query, e)
        return out
    for card in cards:
        try:
            text = clean_text(card.get_text(" ", strip=True))
            if not text:
                continue
            a = card.select_one("a[href]")
            listing_url = urljoin("https://www.apartments.com", a.get("href", "")) if a else base
            title_el = card.select_one(".property-title") or card.select_one(".js-placardTitle") or card.select_one("a.property-link")
            title = clean_text(title_el.get_text(" ", strip=True) if title_el else text[:180])
            price_el = card.select_one(".property-pricing") or card.select_one(".price-range")
            price = clean_text(price_el.get_text(" ", strip=True) if price_el else "")
            address_el = card.select_one(".property-address") or card.select_one(".address")
            address = clean_text(address_el.get_text(" ", strip=True) if address_el else guess_address(title, text, location_query, listing_url))
            score, category, reasons, bedrooms = score_listing(title, text, location_query, cfg)
            out.append(Listing("Apartments.com", title, listing_url, price, location_query, "", text, bedrooms, address, score, category, reasons))
        except Exception as e:
            logger.warning("Apartments.com listing parse failed for location '%s' and was skipped: %s", location_query, e)
    return out


def group_listings(listings: list[Listing]):
    groups = {"Strong match": [], "Possible match": [], "Weak / manual review": []}
    for item in listings:
        groups.setdefault(item.category, []).append(item)
    return groups


def render_listing_card_html(x: Listing) -> str:
    reasons = "".join(f"<li>{html.escape(r)}</li>" for r in x.reasoning)
    return f"""
    <div style="border:1px solid #ddd;border-radius:12px;padding:14px;margin:12px 0;">
      <div style="font-size:18px;font-weight:700;">{html.escape(x.title)}</div>
      <div><a href="{html.escape(x.url)}">{html.escape(x.url)}</a></div>
      <div><b>Source:</b> {html.escape(x.source)} &nbsp; <b>Address key:</b> {html.escape(x.address or "n/a")}</div>
      <div><b>Price:</b> {html.escape(x.price or "n/a")} &nbsp; <b>Location:</b> {html.escape(x.location or "n/a")} &nbsp; <b>Posted:</b> {html.escape(x.posted or "n/a")}</div>
      <div><b>Snippet:</b> {html.escape(x.snippet or "")}</div>
      <div><b>Why it was included:</b></div>
      <ul>{reasons}</ul>
    </div>
    """


def render_html_report(new_items: list[Listing], fallback_items: list[Listing], generated_at: str) -> str:
    strong_new_count = sum(1 for x in new_items if x.category == "Strong match")
    sections = [f"<p><b>New strong matches:</b> {strong_new_count}</p>", "<h2>New listings since last report</h2>"]
    if new_items:
        sections.extend(render_listing_card_html(x) for x in new_items)
    else:
        sections.append("<p>No new listings were found since the last report.</p>")
    sections.append("<h2>Top current matches</h2>")
    if fallback_items:
        fallback_groups = group_listings(fallback_items)
        for section_name in ["Strong match", "Possible match", "Weak / manual review"]:
            sections.append(f"<h3>{html.escape(section_name)}</h3>")
            items = fallback_groups.get(section_name, [])
            sections.extend(render_listing_card_html(x) for x in items) if items else sections.append("<p>No listings in this section.</p>")
    else:
        sections.append("<p>No current matches available.</p>")

    return f"""
    <html><body style="font-family:Arial,sans-serif;max-width:1000px;margin:auto;padding:20px;">
    <h1>Montana Rental Report</h1>
    <p><b>Generated:</b> {html.escape(generated_at)}</p>
    <p><b>Timezone:</b> America/Denver</p>
    <p><b>Sources:</b> Craigslist, Zillow, Redfin, Apartments.com</p>
    <p><b>Deduping:</b> normalized address/title/url cross-reference across sources</p>
    {''.join(sections)}
    </body></html>
    """


def render_pdf_report(new_items: list[Listing], fallback_items: list[Listing], generated_at: str, output_path: Path):
    styles = getSampleStyleSheet()
    title_style = ParagraphStyle("ReportTitle", parent=styles["Title"], fontSize=20, leading=24, textColor=colors.HexColor("#16324f"), spaceAfter=10)
    meta_style = ParagraphStyle("Meta", parent=styles["BodyText"], fontSize=10, leading=13, textColor=colors.HexColor("#444444"), spaceAfter=8)
    heading_style = ParagraphStyle("Heading", parent=styles["Heading2"], fontSize=14, leading=17, textColor=colors.HexColor("#1f4e79"), spaceBefore=10, spaceAfter=8)
    subheading_style = ParagraphStyle("SubHeading", parent=styles["Heading3"], fontSize=11.5, leading=14, textColor=colors.HexColor("#355c7d"), spaceBefore=8, spaceAfter=6)
    card_title = ParagraphStyle("CardTitle", parent=styles["Heading3"], fontSize=11, leading=14, textColor=colors.black, spaceAfter=4)
    body = ParagraphStyle("Body", parent=styles["BodyText"], fontSize=9.5, leading=12.5, alignment=TA_LEFT, spaceAfter=4)
    bullet = ParagraphStyle("Bullet", parent=styles["BodyText"], fontSize=9, leading=11.5, leftIndent=14, bulletIndent=4, spaceAfter=2)

    doc = SimpleDocTemplate(str(output_path), pagesize=letter, leftMargin=0.7*inch, rightMargin=0.7*inch, topMargin=0.7*inch, bottomMargin=0.7*inch, title="Montana Rental Report")
    story = []
    strong_new_count = sum(1 for x in new_items if x.category == "Strong match")
    story.append(Paragraph("Montana Rental Report", title_style))
    story.append(Paragraph(f"Generated: {generated_at}", meta_style))
    story.append(Paragraph("Timezone: America/Denver", meta_style))
    story.append(Paragraph(f"New strong matches: {strong_new_count}", meta_style))
    story.append(Paragraph("Filters emphasized: Butte / Anaconda / Walkerville / Rocker / Opportunity; 2BR or 1BR + office language; yard/fenced yard; pet/dog-friendly language.", meta_style))
    story.append(Paragraph("Sources included: Craigslist, Zillow, Redfin, Apartments.com. Cross-source duplicates are reduced using normalized address, title, and URL comparison.", meta_style))
    story.append(Spacer(1, 8))

    def add_listing(item: Listing):
        card_parts = [Paragraph(html.escape(item.title), card_title)]
        meta_line = f"<b>Source:</b> {html.escape(item.source)} &nbsp;&nbsp; <b>Price:</b> {html.escape(item.price or 'n/a')} &nbsp;&nbsp; <b>Location:</b> {html.escape(item.location or 'n/a')}"
        card_parts.append(Paragraph(meta_line, body))
        card_parts.append(Paragraph(f"<b>Address key:</b> {html.escape(item.address or 'n/a')}", body))
        if item.posted:
            card_parts.append(Paragraph(f"<b>Posted:</b> {html.escape(item.posted)}", body))
        if item.url:
            card_parts.append(Paragraph(f"<b>Link:</b> <link href='{html.escape(item.url)}' color='blue'>{html.escape(item.url)}</link>", body))
        if item.snippet:
            card_parts.append(Paragraph(f"<b>Snippet:</b> {html.escape(item.snippet[:900])}", body))
        card_parts.append(Paragraph("<b>Why it was included:</b>", body))
        for reason in item.reasoning:
            card_parts.append(Paragraph(html.escape(reason), bullet, bulletText="•"))
        card_parts.append(Spacer(1, 8))
        story.append(KeepTogether(card_parts))

    story.append(Paragraph("New listings since last report", heading_style))
    if new_items:
        for x in new_items:
            add_listing(x)
    else:
        story.append(Paragraph("No new listings were found since the last report.", body))

    story.append(Paragraph("Top current matches", heading_style))
    if fallback_items:
        groups = group_listings(fallback_items)
        for section_name in ["Strong match", "Possible match", "Weak / manual review"]:
            story.append(Paragraph(section_name, subheading_style))
            items = groups.get(section_name, [])
            if items:
                for x in items:
                    add_listing(x)
            else:
                story.append(Paragraph("No listings in this section.", body))
    else:
        story.append(Paragraph("No current matches available.", body))
    doc.build(story)


def attach_file(msg: EmailMessage, path: Path):
    data = path.read_bytes()
    if path.suffix.lower() == ".html":
        msg.add_attachment(data, maintype="text", subtype="html", filename=path.name)
    elif path.suffix.lower() == ".pdf":
        msg.add_attachment(data, maintype="application", subtype="pdf", filename=path.name)
    else:
        msg.add_attachment(data, maintype="application", subtype="octet-stream", filename=path.name)


def send_email(cfg: dict, html_body: str, attachments: list[Path], strong_new_count: int):
    subject_base = cfg["email"].get("subject_base", "new strong rental matches for Lela")
    subject = f"{strong_new_count} {subject_base}"
    msg = EmailMessage()
    msg["Subject"] = subject
    msg["From"] = cfg["email"]["from_email"]
    msg["To"] = ", ".join(cfg["email"]["to_emails"])
    msg.set_content("Your rental report is attached in HTML and PDF formats.")
    msg.add_alternative(html_body, subtype="html")
    for path in attachments:
        attach_file(msg, path)
    with smtplib.SMTP(cfg["email"]["smtp_host"], cfg["email"]["smtp_port"], timeout=30) as smtp:
        smtp.starttls()
        smtp.login(cfg["email"]["smtp_username"], cfg["email"]["smtp_password"])
        smtp.send_message(msg)
        logger.info("Email sent successfully to %s with subject: %s", msg["To"], msg["Subject"])


def compute_report_sets(deduped: list[Listing], seen: set[str]):
    new_items = []
    for item in deduped:
        key = normalize_address(item.address) or re.sub(r"[?#].*$", "", item.url or "") or normalize_address(item.title)
        if key not in seen:
            new_items.append(item)
    return new_items[:60], deduped[:40]


def mark_seen(deduped: list[Listing], seen: set[str]) -> set[str]:
    for item in deduped:
        key = normalize_address(item.address) or re.sub(r"[?#].*$", "", item.url or "") or normalize_address(item.title)
        seen.add(key)
    return seen


def now_in_tz(tz_name: str):
    return dt.datetime.now(pytz.timezone(tz_name))


def safe_collect_source(name: str, fn):
    try:
        items = fn()
        logger.info("%s returned %d listings", name, len(items))
        return items
    except Exception as e:
        logger.exception("%s source failed and was skipped: %s", name, e)
        return []


def run_once(cfg: dict, config_path: Path):
    output_dir = (config_path.parent / cfg["storage"].get("output_dir", "output")).resolve()
    output_dir.mkdir(parents=True, exist_ok=True)
    seen_path = (config_path.parent / cfg["storage"].get("seen_db", "seen_listings.json")).resolve()
    log_path = (config_path.parent / cfg["storage"].get("log_file", "rental_reporter.log")).resolve()
    if not logger.handlers:
        setup_logging(log_path)

    seen = set(load_json(seen_path, []))
    all_items: list[Listing] = []

    if cfg["sources"].get("craigslist", True):
        for i, search_cfg in enumerate(cfg["searches"], start=1):
            all_items.extend(safe_collect_source(f"Craigslist search #{i}", lambda sc=search_cfg: fetch_craigslist(sc, cfg)))
    if cfg["sources"].get("zillow", True):
        for loc in cfg.get("location_queries", []):
            all_items.extend(safe_collect_source(f"Zillow {loc}", lambda l=loc: fetch_zillow(l, cfg)))
    if cfg["sources"].get("redfin", True):
        for loc in cfg.get("location_queries", []):
            all_items.extend(safe_collect_source(f"Redfin {loc}", lambda l=loc: fetch_redfin(l, cfg)))
    if cfg["sources"].get("apartments", True):
        for loc in cfg.get("location_queries", []):
            all_items.extend(safe_collect_source(f"Apartments.com {loc}", lambda l=loc: fetch_apartments(l, cfg)))

    deduped = dedupe_cross_source(all_items)
    new_items, fallback_items = compute_report_sets(deduped, seen)
    strong_new_count = sum(1 for x in new_items if x.category == "Strong match")

    tz_name = cfg.get("schedule", {}).get("timezone", "America/Denver")
    timestamp = now_in_tz(tz_name).strftime("%Y-%m-%d %H:%M:%S %Z")
    stamp = now_in_tz(tz_name).strftime("%Y%m%d_%H%M%S")
    html_report = render_html_report(new_items, fallback_items, timestamp)

    html_path = output_dir / f"rental_report_{stamp}.html"
    pdf_path = output_dir / f"rental_report_{stamp}.pdf"
    html_path.write_text(html_report, encoding="utf-8")
    render_pdf_report(new_items, fallback_items, timestamp, pdf_path)

    save_json(seen_path, sorted(mark_seen(deduped, seen)))

    try:
        send_email(cfg, html_report, [html_path, pdf_path], strong_new_count)
    except Exception as e:
        logger.exception("Email send failed: %s", e)
        raise

    logger.info("Saved HTML: %s", html_path)
    logger.info("Saved PDF: %s", pdf_path)
    logger.info("Listings before dedupe: %d", len(all_items))
    logger.info("Listings after dedupe: %d", len(deduped))
    logger.info("New listings sent: %d", len(new_items))
    logger.info("New strong matches: %d", strong_new_count)


def seconds_until_next_run(hour: int, minute: int, tz_name: str) -> float:
    now = dt.datetime.now(pytz.timezone(tz_name))
    target = now.replace(hour=hour, minute=minute, second=0, microsecond=0)
    if now >= target:
        target += dt.timedelta(days=1)
    return max((target - now).total_seconds(), 1.0)


def loop_daily(cfg: dict, config_path: Path):
    hour = int(cfg.get("schedule", {}).get("hour", 10))
    minute = int(cfg.get("schedule", {}).get("minute", 0))
    tz_name = cfg.get("schedule", {}).get("timezone", "America/Denver")
    log_path = (config_path.parent / cfg["storage"].get("log_file", "rental_reporter.log")).resolve()
    if not logger.handlers:
        setup_logging(log_path)
    logger.info("Daily loop mode enabled. Next run time each day: %02d:%02d %s.", hour, minute, tz_name)
    while True:
        sleep_seconds = seconds_until_next_run(hour, minute, tz_name)
        next_run = now_in_tz(tz_name) + dt.timedelta(seconds=sleep_seconds)
        logger.info("Sleeping until next run at %s...", next_run.strftime("%Y-%m-%d %H:%M:%S %Z"))
        time.sleep(sleep_seconds)
        try:
            run_once(cfg, config_path)
        except Exception as e:
            logger.exception("Run failed: %s", e)
            time.sleep(300)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--config", required=True)
    parser.add_argument("--once", action="store_true")
    args = parser.parse_args()
    config_path = Path(args.config).resolve()
    cfg = json.loads(config_path.read_text(encoding="utf-8"))
    setup_logging((config_path.parent / cfg["storage"].get("log_file", "rental_reporter.log")).resolve())
    if args.once:
        run_once(cfg, config_path)
    else:
        loop_daily(cfg, config_path)


if __name__ == "__main__":
    main()