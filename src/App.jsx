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
import { projects, resume } from "./components/portfolio/projects";
import "./App.css";
const ResearchPlots = lazy(
  () => import("./components/portfolio/ResearchPlots"),
);
const email = "jacecarrdev@gmail.com";

function ProjectCard({ project, featured = false }) {
  return (
    <Link
      className={`project-card ${featured ? "featured-card" : ""}`}
      to={`/projects/${project.id}`}
    >
      <div className="card-image">
        {project.image ? (
          <img src={project.image} alt={project.alt} loading="lazy" />
        ) : (
          <div className="data-art" aria-hidden="true">
            <span>
              {project.plots === "optical" ? "5,000" : "DATA → INSIGHT"}
            </span>
            <small>
              {project.plots === "optical"
                ? "IMAGES ANALYZED"
                : "COLLECT / ANALYZE / VISUALIZE"}
            </small>
          </div>
        )}
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
function Home() {
  return (
    <>
      <section className="hero wrap">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="status-dot" /> BUTTE, MONTANA · OPEN TO LOCAL &
            REMOTE ROLES
          </p>
          <h1>
            Curiosity.
            <br />
            Built into <em>systems.</em>
          </h1>
          <p className="hero-description">
            I’m Jason Carr. I design experiments, build research systems, and
            turn measurements into understanding.
          </p>
          <p className="hero-study">
            Experimental research · Optoelectronics · Electrical & computer
            engineering
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
        <Link
          to="/projects/project4"
          className="hero-instrument"
          aria-label="Explore the magnetic quadrupole trapping project"
        >
          <div className="instrument-label">
            <span>FIELD NOTES / 001</span>
            <span>EXPERIMENTAL SYSTEMS</span>
          </div>
          <div className="hero-photo">
            <img
              src={projects[0].image}
              alt={projects[0].alt}
              fetchpriority="high"
            />
            <span className="crosshair top-left" />
            <span className="crosshair bottom-right" />
          </div>
          <div className="instrument-caption">
            <span>
              Magnetic quadrupole
              <br />
              <strong>Particle levitation experiment</strong>
            </span>
            <span className="round-arrow">
              <Arrow />
            </span>
          </div>
        </Link>
      </section>
      <div className="discipline-strip">
        <div className="wrap">
          <span>DESIGN THE EXPERIMENT</span>
          <i>+</i>
          <span>BUILD THE SYSTEM</span>
          <i>+</i>
          <span>UNDERSTAND THE SIGNAL</span>
        </div>
      </div>
      <section className="wrap section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">01 / SELECTED WORK</p>
            <h2>Ideas, made measurable.</h2>
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
            <p className="eyebrow">02 / THE ENGINEER BEHIND THE EXPERIMENT</p>
            <h2>
              Hands on.
              <br />
              <em>Questions open.</em>
            </h2>
          </div>
          <div>
            <p className="large-copy">
              My work starts with a question—and often with a bench full of
              parts.
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
        <p className="eyebrow">LET’S BUILD SOMETHING THAT WORKS.</p>
        <h2>
          A good question
          <br />
          is a good beginning.
        </h2>
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
      <h1>
        From the bench.
        <br />
        <em>Into understanding.</em>
      </h1>
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
              <img src={src} alt={caption} loading="lazy" />
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
            <img src={selected[0]} alt={selected[1]} />
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
              {project.codeLabel || "Explore the code"} <Arrow />
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
            <h2>Inside the work.</h2>
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
      <h1>
        Build carefully.
        <br />
        <em>Keep asking why.</em>
      </h1>
      <div className="about-grid biography">
        <div>
          <p className="large-copy">
            Physics gave me a way to ask questions. Engineering gives me more
            ways to answer them.
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
          {[
            [
              "2024 — PRESENT",
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
        <h2>Engineering is a team effort.</h2>
        <p>
          Beyond the laboratory, my experience includes technical customer
          support, team leadership, and field service work. These roles have
          strengthened how I troubleshoot, explain complex problems, and
          coordinate work with other people.
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
      <h1>
        Let’s put curiosity
        <br />
        <em>to work.</em>
      </h1>
      <p className="page-intro">
        I’m interested in engineering opportunities where I can contribute to
        experimental systems, test and measurement, optics, and materials
        research.
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
      <p className="eyebrow">404 / OUTSIDE THE FIELD</p>
      <h1>Let’s recalibrate.</h1>
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
          <span className="brand-cross">+</span> JASON CARR
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
