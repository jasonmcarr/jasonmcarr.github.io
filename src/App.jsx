import React, { lazy, Suspense, useEffect, useRef, useState } from "react";
import {
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
  useParams,
} from "react-router-dom";
import ContactForm from "./components/portfolio/ContactForm";
import Arrow from "./components/portfolio/Arrow";
import Terrain from "./components/portfolio/Terrain";
import ResilientImage from "./components/portfolio/ResilientImage";
import { projects, resume } from "./components/portfolio/projects";
import "./App.css";
const ResearchPlots = lazy(
  () => import("./components/portfolio/ResearchPlots"),
);
const email = "jacecarrdev@gmail.com";

const centeredArtwork = new Set([
  "project2", "project1", "semiconductor-calculator", "database-pipeline",
  "tablet-driver-switch", "commander-simulator", "portfolio-engineering",
  "portfolio-archive", "tandela",
]);

function ProjectArtwork({ project, loading }) {
  return project.image ? (
    <ResilientImage src={project.image} alt={project.alt} style={project.imageFit ? { objectFit: project.imageFit, padding: project.imageInset, background: "var(--bg)" } : undefined} loading={loading} />
  ) : (
    <div className="data-art" aria-hidden="true">
      <span style={centeredArtwork.has(project.id) ? { textAlign: "center" } : undefined}>
        {project.art ||
          (project.plots === "optical" ? "5,000" : "DATA → INSIGHT")}
      </span>
      <small>
        {project.artCaption ||
          (project.plots === "optical"
            ? "IMAGES ANALYZED"
            : "COLLECT / ANALYZE / VISUALIZE")}
      </small>
    </div>
  );
}

function ProjectCard({ project, featured = false }) {
  return (
    <Link
      className={`project-card ${featured ? "featured-card" : ""}`}
      to={`/projects/${project.id}`}
    >
      <div className="card-image">
        <ProjectArtwork project={project} loading="lazy" />
        <span className="image-index">
          {project.number} / RESEARCH & DEVELOPMENT
        </span>
      </div>
      <div className="card-info">
        <p className="eyebrow">{project.category}</p>
        <h3>
          {project.name}
          <span aria-hidden="true">
            <Arrow />
          </span>
        </h3>
        <p>{project.summary}</p>
        <div className="tags">
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>
    </Link>
  );
}
function FieldNoteSlide({ project, className, onAnimationEnd, hidden }) {
  return (
    <div className={className} aria-hidden={hidden} onAnimationEnd={onAnimationEnd}>
      <div className="hero-photo">
        <ProjectArtwork project={project} />
        <span className="crosshair top-left" />
        <span className="crosshair bottom-right" />
      </div>
      <div className="instrument-caption">
        <span>{project.fieldLabel || project.tags[0]}<br />
          <strong>{project.fieldTitle || project.name}</strong>
        </span>
        <span className="round-arrow"><Arrow /></span>
      </div>
    </div>
  );
}

function shuffleFieldNotes() {
  const order = projects.map((_, index) => index);
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order;
}

function FieldNotes() {
  const fieldRef = useRef(null);
  const [initialOrder] = useState(shuffleFieldNotes);
  const sequence = useRef({ order: initialOrder, position: 0 });
  const [slide, setSlide] = useState({ index: initialOrder[0], previous: null, direction: 1 });
  const [hovered, setHovered] = useState(false);
  const project = projects[slide.index];

  function step(direction) {
    const cursor = sequence.current;
    const previous = cursor.order[cursor.position];
    cursor.position += direction;
    if (cursor.position < 0 || cursor.position === cursor.order.length) {
      const nextRound = shuffleFieldNotes();
      const edge = direction > 0 ? 0 : nextRound.length - 1;
      if (nextRound[edge] === previous) {
        [nextRound[edge], nextRound[edge + direction]] = [nextRound[edge + direction], nextRound[edge]];
      }
      // Keep one adjacent round so reversing direction retraces recent slides.
      if (direction > 0) {
        cursor.order = cursor.order.slice(-projects.length).concat(nextRound);
        cursor.position = projects.length;
      } else {
        cursor.order = nextRound.concat(cursor.order.slice(0, projects.length));
        cursor.position = projects.length - 1;
      }
    }
    setSlide({ index: cursor.order[cursor.position], previous, direction });
  }

  useEffect(() => {
    if (hovered || projects.length < 2) return;
    const autoplay = window.matchMedia("(min-width: 761px) and (prefers-reduced-motion: no-preference)");
    let timer;
    let visible = false;
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    function sync() {
      window.clearInterval(timer);
      if (visible && autoplay.matches && !document.hidden) {
        timer = window.setInterval(() => step(1), 7000);
      }
    }
    observer.observe(fieldRef.current);
    autoplay.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    return () => {
      window.clearInterval(timer);
      observer.disconnect();
      autoplay.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
    };
  }, [hovered]);

  if (!project) return null;
  return (
    <section ref={fieldRef} className="hero-instrument" aria-label="Field notes" aria-roledescription="carousel"
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div className="instrument-label">
        <span>FIELD NOTES / {String(slide.index + 1).padStart(3, "0")}</span>
        <span>{project.category.toUpperCase()}</span>
      </div>
      <Link className="field-viewport" to={`/projects/${project.id}`} aria-label={`Explore ${project.name}`}
        style={{ "--entry-x": slide.direction > 0 ? "100%" : "-100%" }}>
        {slide.previous !== null && (
          <FieldNoteSlide key={projects[slide.previous].id} project={projects[slide.previous]}
            className="field-outgoing" hidden />
        )}
        <FieldNoteSlide key={project.id} project={project}
          className={slide.previous === null ? "" : "field-incoming"}
          onAnimationEnd={event => {
            if (event.target === event.currentTarget) {
              setSlide(current => current === slide ? { ...current, previous: null } : current);
            }
          }} />
      </Link>
      {projects.length > 1 && (
        <div className="field-controls">
          <button type="button" onClick={() => step(-1)} aria-label="Previous field note"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h16m-7-7 7 7-7 7" /></svg></button>
          <button type="button" onClick={() => step(1)} aria-label="Next field note"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h16m-7-7 7 7-7 7" /></svg></button>
        </div>
      )}
    </section>
  );
}
function Home() {
  useEffect(() => {
    // Native scrolling remains available at /?scroll=native.
    if (new URLSearchParams(window.location.search).get("scroll") === "native")
      return;
    const desktopMotion = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    let instance;
    let revision = 0;
    const sync = async () => {
      const current = ++revision;
      instance?.destroy();
      instance = undefined;
      if (!desktopMotion.matches) return;
      try {
        const { default: Lenis } = await import("lenis");
        if (current !== revision) return;
        instance = new Lenis({
          autoRaf: true,
          lerp: 0.19,
          syncTouch: false,
          allowNestedScroll: true,
          // HashRouter owns links; Lenis only eases wheel input.
          anchors: false,
          prevent: (node) =>
            node.matches("dialog, input, select, textarea, [contenteditable]"),
        });
      } catch {
        // A failed optional chunk must not change native scrolling.
      }
    };
    const releaseWheel = () => {
      if (instance?.isScrolling === "smooth") {
        instance.stop();
        instance.start();
      }
    };
    const onKey = (event) => {
      if (["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "].includes(event.key))
        releaseWheel();
    };
    const onClick = (event) => {
      if (event.target instanceof Element && event.target.closest("a"))
        releaseWheel();
    };
    desktopMotion.addEventListener("change", sync);
    window.addEventListener("keydown", onKey, true);
    window.addEventListener("click", onClick, true);
    sync();
    return () => {
      ++revision;
      desktopMotion.removeEventListener("change", sync);
      window.removeEventListener("keydown", onKey, true);
      window.removeEventListener("click", onClick, true);
      instance?.destroy();
    };
  }, []);

  return (
    <>
      <section className="hero wrap">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="status-dot" /> BUTTE, MONTANA · OPEN TO LOCAL &
            REMOTE ROLES
          </p>
          <h1>
            Hi, I’m <em>Jason.</em>
          </h1>
          <p className="hero-description">
            I’m a physicist and researcher studying electrical and computer
            engineering. I design experiments, build equipment, and analyze data.
          </p>
          <p className="hero-study">
            Experimental Research • Optoelectronics • Electrical & Computer Engineering
          </p>
          <div className="actions">
            <Link className="button primary" to="/projects">
              Explore my work{" "}
              <span>
                <Arrow />
              </span>
            </Link>
            <a
              className="text-link"
              href={resume}
              target="_blank"
              rel="noreferrer"
            >
              View resume{" "}
              <span>
                <Arrow direction="down" />
              </span>
            </a>
          </div>
        </div>
        <FieldNotes />
      </section>
      <section className="wrap section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">01 / SELECTED WORK</p>
            <h2>Some of my work</h2>
          </div>
          <Link className="text-link" to="/projects">
            All projects{" "}
            <span>
              <Arrow />
            </span>
          </Link>
        </div>
        <div className="featured-grid">
          {projects.slice(0, 3).map((p, i) => (
            <ProjectCard key={p.id} project={p} featured={i === 0} />
          ))}
        </div>
      </section>
      <section className="about-band">
        <div className="wrap about-grid">
          <div>
            <p className="eyebrow">02 / ABOUT ME</p>
            <h2>I like figuring things out.</h2>
          </div>
          <div>
            <p className="large-copy">
              I enjoy learning how things work and finding ways to improve
              them. That often means building the equipment myself, testing an
              idea, and working through what the measurements actually show.
            </p>
            <p>
              I’m a physicist and experimental researcher pursuing an M.S. in
              Electrical and Computer Engineering at CU Boulder. I’ve designed
              experiments, built many of the systems I worked with from
              components or scratch, and carried the work through measurement
              and analysis.
            </p>
            <p>
              My graduate studies span optics, semiconductors, power systems,
              engineering management, IT networking, and AI. I bring that
              growing perspective to a foundation in laboratory research and
              materials characterization.
            </p>
            <Link className="text-link" to="/about">
              Experience & approach{" "}
              <span>
                <Arrow />
              </span>
            </Link>
          </div>
        </div>
      </section>
      <section className="wrap section capabilities">
        <p className="eyebrow">03 / HOW I WORK</p>
        <div className="capability-grid">
          {[
            [
              "01",
              "Design & build",
              "Experimental design, apparatus construction, optical systems, and laboratory troubleshooting.",
            ],
            [
              "02",
              "Measure & characterize",
              "Spectroscopy, microscopy, thin films, crystal growth, and cryo-vacuum systems.",
            ],
            [
              "03",
              "Analyze & communicate",
              "Python, MATLAB, image analysis, data visualization, and technical documentation.",
            ],
          ].map(([n, t, b]) => (
            <div key={n}>
              <span className="mono">{n}</span>
              <h3>{t}</h3>
              <p>{b}</p>
            </div>
          ))}
        </div>
      </section>
      <ContactCallout />
    </>
  );
}
function ContactCallout() {
  return (
    <section className="wrap contact-callout">
      <div>
        <p className="eyebrow">GET IN TOUCH</p>
        <h2>Have a project in mind?</h2>
        <p>Available for engineering opportunities in Butte and remotely.</p>
      </div>
      <Link className="button primary" to="/contact">
        Start a conversation{" "}
        <span>
          <Arrow />
        </span>
      </Link>
    </section>
  );
}
function Projects() {
  const [filter, setFilter] = useState("All work");
  const categories = [
    "All work",
    "Experimental systems",
    "Materials & optics",
    "Software & data",
  ];
  const visible = projects.filter(
    (p) => filter === "All work" || p.category === filter,
  );
  return (
    <section className="wrap section page-top">
      <p className="eyebrow">THE PROJECT INDEX</p>
      <h1>Research & projects</h1>
      <p className="page-intro">
        Experiments, materials, and the software that helps make sense of them.
        I was the primary contributor on each project presented here.
      </p>
      <div className="filters" aria-label="Filter projects">
        {categories.map((c) => (
          <button
            key={c}
            aria-pressed={filter === c}
            onClick={() => setFilter(c)}
          >
            {c}
          </button>
        ))}
      </div>
      <p className="sr-only" role="status">
        {visible.length} projects shown
      </p>
      <div className="project-grid">
        {visible.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </section>
  );
}
function Gallery({ items }) {
  const [selected, setSelected] = useState(null);
  const dialog = useRef(null);
  function open(item) {
    setSelected(item);
    dialog.current.showModal();
  }
  return (
    <>
      <div className="gallery">
        {items.map(([src, caption]) => (
          <figure key={src}>
            <button
              className="gallery-image"
              onClick={() => open([src, caption])}
              aria-label={`Enlarge ${caption}`}
            >
              <ResilientImage src={src} alt={caption} loading="lazy" />
              <span>
                VIEW FULL IMAGE <Arrow />
              </span>
            </button>
            <figcaption>{caption}</figcaption>
          </figure>
        ))}
      </div>
      <dialog
        aria-label="Research image viewer"
        ref={dialog}
        onClick={(e) => {
          if (e.target === dialog.current) dialog.current.close();
        }}
      >
        <button
          className="dialog-close"
          onClick={() => dialog.current.close()}
          aria-label="Close image"
        >
          Close ×
        </button>
        {selected && (
          <figure>
            <ResilientImage src={selected[0]} alt={selected[1]} />
            <figcaption>{selected[1]}</figcaption>
            <a href={selected[0]} target="_blank" rel="noreferrer">
              Open original size <Arrow />
            </a>
          </figure>
        )}
      </dialog>
    </>
  );
}
function ProjectDetail() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);
  if (!project) return <NotFound />;
  return (
    <article className="wrap section page-top case-study">
      <Link className="text-link" to="/projects">
        <Arrow direction="left" /> Project index
      </Link>
      <p className="eyebrow case-eyebrow">
        {project.number} / {project.category}
      </p>
      <h1>{project.title}</h1>
      <p className="page-intro">{project.summary}</p>
      <div className="case-meta">
        <span>
          ROLE <strong>Primary contributor</strong>
        </span>
        <span>
          PROJECT <strong>{project.name}</strong>
        </span>
        <span>
          TOOLS & METHODS <strong>{project.tags.join(" · ")}</strong>
        </span>
      </div>
      <div className="case-body">
        <aside>
          <p className="eyebrow">THE QUESTION</p>
          <h2>{project.question}</h2>
          {project.code && (
            <a
              className="button outline"
              href={project.code}
              target="_blank"
              rel="noreferrer"
            >
              {project.codeLabel || "View code on GitHub"} <Arrow />
            </a>
          )}
          {project.demo && (
            <a
              className="button outline"
              href={project.demo}
              target="_blank"
              rel="noreferrer"
            >
              {project.demoLabel || "Open project"} <Arrow />
            </a>
          )}
        </aside>
        <div>
          {[
            ["My contribution", project.contribution],
            ["Method", project.method],
            ["Outcome", project.result],
          ].map(([h, p]) => (
            <section key={h}>
              <h3>{h}</h3>
              <p>{p}</p>
            </section>
          ))}
        </div>
      </div>
      {project.plots && (
        <Suspense
          fallback={<p role="status">Loading interactive research plots…</p>}
        >
          <ResearchPlots type={project.plots} />
        </Suspense>
      )}
      {project.gallery.length > 0 && (
        <section className="case-gallery">
          <div className="section-heading">
            <h2>Photos & results</h2>
            <span className="mono">IMAGES & RESULTS</span>
          </div>
          <Gallery items={project.gallery} />
        </section>
      )}
      <div className="case-bottom">
        <Link className="text-link" to="/projects">
          <Arrow direction="left" /> Back to all projects
        </Link>
        <Link className="text-link" to="/contact">
          Discuss this work <Arrow />
        </Link>
      </div>
    </article>
  );
}
function About() {
  return (
    <section className="wrap section page-top">
      <p className="eyebrow">EXPERIENCE & APPROACH</p>
      <div className="about-grid biography">
        <div>
          <h1>A little about me</h1>
          <p className="large-copy">
            My background is in physics. I’m continuing my education in
            electrical and computer engineering because I want to broaden the
            kinds of problems I can work on.
          </p>
          <p>
            I’m based in Butte, Montana, with a background in experimental
            research, optoelectronics, and data analysis. My work combines
            designing experiments and constructing apparatus with the
            quantitative work needed to interpret the results.
          </p>
          <p>
            At Montana State University’s Cone–Thiel Spectroscopy Laboratory, I
            worked on crystal growth, quantum information science, and
            optoelectronics. My collaborative research involved Boeing, the U.S.
            Department of Defense, and AdvR.
          </p>
          <p>
            I’m now expanding that foundation through graduate study in
            electrical and computer engineering, with interests spanning optics,
            semiconductors, power systems, management, networking, and AI.
          </p>
          <a
            href={resume}
            className="button primary"
            target="_blank"
            rel="noreferrer"
          >
            View full resume <Arrow direction="down" />
          </a>
        </div>
        <div className="timeline">
          <img className="about-portrait" src="/research/jason-carr.webp" width="700" height="596" alt="Jason Carr" />
          {[
            [
              "2025 — PRESENT",
              "M.S. in Electrical & Computer Engineering",
              "University of Colorado Boulder · In progress",
            ],
            [
              "2017 — 2021",
              "Laboratory Researcher",
              "Cone–Thiel Spectroscopy Laboratory · Montana State University",
            ],
            [
              "2015 — 2019",
              "B.S. in Professional Physics",
              "Montana State University · Mathematics minor",
            ],
          ].map(([date, title, desc]) => (
            <div key={title}>
              <p className="eyebrow">{date}</p>
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="experience-note">
        <h2>Working with people</h2>
        <p>
          Beyond the laboratory, my experience includes technical customer
          support, team leadership, and field service work. These roles have
          taught me to listen carefully, explain what I know, and ask for
          another perspective when I need one.
        </p>
        <p>
          I value clear responsibilities and trust in the people I work with.
          People bring different strengths to a project, and I think good
          collaboration gives them room to use those strengths. I also believe
          that taking responsibility means being willing to question my own
          assumptions and consider who will be affected by a decision.
        </p>
        <p>
          Outside the lab, I love dancing Argentine tango and teaching it with
          Lela at Butte Tango. One of my favorite things about teaching tango is helping
          people discover the elegance and control that resides within themselves.
        </p>
      </div>
    </section>
  );
}
function Contact() {
  return (
    <section className="wrap section page-top contact-page">
      <p className="eyebrow">
        <span className="status-dot" /> BUTTE, MT / REMOTE
      </p>
      <h1>Let’s talk</h1>
      <p className="page-intro">
        I’m interested in engineering opportunities in power systems,
        semiconductor process engineering, and network engineering. My background
        in experimental research, test and measurement, optics, and materials
        characterization gives me a practical foundation for approaching
        technical problems across these fields.
      </p>
      <a className="email-link" href={`mailto:${email}`}>
        {email} <Arrow />
      </a>
      <p className="muted">
        Based in Butte, Montana. Available for local and remote opportunities
        while completing my master’s degree.
      </p>
      <div className="contact-links">
        <a href={resume} target="_blank" rel="noreferrer">
          Resume <Arrow direction="down" />
        </a>
        <a
          href="https://github.com/jasonmcarr"
          target="_blank"
          rel="noreferrer"
        >
          GitHub <Arrow />
        </a>
        <a
          href="https://www.linkedin.com/in/jasonmcarr/"
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn <Arrow />
        </a>
      </div>
      <ContactForm />
    </section>
  );
}
function NotFound() {
  return (
    <section className="wrap section page-top">
      <p className="eyebrow">404 / PAGE NOT FOUND</p>
      <h1>This page isn’t here.</h1>
      <Link className="button primary" to="/">
        Return home <Arrow />
      </Link>
    </section>
  );
}
export default function App() {
  const [paused, setPaused] = useState(false);
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    const project = projects.find(
      (p) => location.pathname === `/projects/${p.id}`,
    );
    document.title = `${project ? project.name : "Experimental Engineering"} | Jason Carr`;
  }, [location.pathname]);
  return (
    <>
      <Terrain paused={paused} />
      <div className="terrain-shade" />
      <a
        href="#main-content"
        className="skip-link"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("main-content").focus();
        }}
      >
        Skip to content
      </a>
      <header className="site-header wrap">
        <Link className="wordmark" to="/" aria-label="Jason Carr home">
          JASON CARR
          <span className="brand-sub">ENGINEERING & RESEARCH</span>
        </Link>
        <nav aria-label="Main navigation">
          <NavLink to="/projects">Work</NavLink>
          <NavLink to="/about">About</NavLink>
          <a href={resume} target="_blank" rel="noreferrer">
            Resume <Arrow />
          </a>
          <NavLink className="nav-contact" to="/contact">
            Let’s talk{" "}
            <span>
              <Arrow />
            </span>
          </NavLink>
        </nav>
      </header>
      <main id="main-content" tabIndex="-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route
            path="/projects/:id"
            element={<ProjectDetail key={location.pathname} />}
          />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer className="wrap site-footer">
        <span>
          JASON CARR <span className="muted">/ ENGINEERING & RESEARCH</span>
        </span>
        <button onClick={() => setPaused((p) => !p)} aria-pressed={paused}>
          {paused ? "Resume terrain" : "Pause terrain"}{" "}
          <span aria-hidden="true">{paused ? "▷" : "Ⅱ"}</span>
        </button>
        <span className="muted">BUTTE, MONTANA</span>
      </footer>
    </>
  );
}
