import trapDiagram from "../../assets/images/project2/trap_diagram.png";
import poster from "../../assets/images/project6/optical-cooling.png";
import dashboard from "../../assets/images/project3/tracker-home.png";
import dashboardBars from "../../assets/images/project3/tracker-bar.png";
const trajectories = `${process.env.PUBLIC_URL}/research/charts/Trajectories.png`;
const fft = `${process.env.PUBLIC_URL}/research/charts/Axial_FFT.png`;
const quality = `${process.env.PUBLIC_URL}/research/charts/q_avg.png`;
const spectrum = `${process.env.PUBLIC_URL}/research/charts/fluo_spectra.png`;
const photo = (name) => `${process.env.PUBLIC_URL}/research/${name}.png`;
export const resume = `${process.env.PUBLIC_URL}/documents/Jason-Carr-Resume.pdf?v=20261108-approved`;
export const projects = [
  {
    id: "project4",
    number: "01",
    title: "Magneto-gravitational trapping",
    name: "Magneto-gravitational trapping",
    category: "Experimental systems",
    tags: ["Vacuum systems", "FFT analysis", "Python"],
    image: photo("magnetic-quadrupole-trap"),
    alt: "Green-illuminated magnetic quadrupole particle trap",
    summary:
      "An experimental platform for studying levitated particle motion across atmospheric and vacuum conditions.",
    question: "How does a trapped particle move as its environment changes?",
    contribution:
      "Primary contributor to the experiment and analysis, studying particle trajectories across pressure conditions and interpreting the resulting oscillations.",
    method:
      "Recorded position data were analyzed using Fourier transforms, displacement distributions, model fits, and quality factors. The workflow connects measured motion with physical estimates of particle behavior.",
    result:
      "Compared trajectories, oscillation frequencies, and quality factors across pressure conditions, with fitted particle-mass estimates reported in the original analysis.",
    code: "https://github.com/jasonmcarr/MagnetoGravitationalTrap",
    gallery: [
      [trapDiagram, "Magnetic quadrupole trap geometry"],
      [trajectories, "Particle trajectories at different pressures"],
      [fft, "Axial frequency analysis"],
      [quality, "Average quality factor analysis"],
    ],
  },
  {
    id: "materials",
    code: "https://github.com/jasonmcarr/jasonmcarr.github.io/blob/main/src/components/portfolio/projects.js",
    codeLabel: "View page source on GitHub",
    sourceNote:
      "The linked source contains this research presentation; standalone analysis code is not included.",
    number: "02",
    title: "Crystal growth & microscopy",
    name: "Crystal growth & material characterization",
    category: "Materials & optics",
    tags: ["Crystal growth", "SEM", "Fluorescence"],
    image: `${process.env.PUBLIC_URL}/research/sem-5638.webp`,
    alt: "Scanning electron micrograph showing crystalline particle morphology",
    summary:
      "Growing and examining materials through synthesis, electron microscopy, and fluorescence measurements.",
    question:
      "How do growth conditions and composition appear in a material’s structure and optical response?",
    contribution:
      "Primary contributor to the research. Grew Eu:YVO₄ crystals and investigated rare-earth-doped materials using microscopy and fluorescence, alongside laboratory crystal-growth and characterization work.",
    method:
      "Examined Er:YVO₄ crystals under normal and UV illumination. Synthesized europium-doped vaterite particles and observed their fluorescence. Used SEM imagery to examine morphology across compositions.",
    result:
      "Produced a visual record linking materials preparation with morphology and optical response. The SEM photographs show multiple compositions; individual material identities and magnifications are not assigned where the source captions omit them.",
    gallery: [
      [
        photo("eu-yvo4-grown-crystal"),
        "Eu:YVO₄ crystal I grew, viewed by microscopy",
      ],
      [photo("er-yvo4-normal-02"), "Er:YVO₄ under normal illumination"],
      [photo("er-yvo4-uv-02"), "Er:YVO₄ under UV illumination"],
      [
        photo("eu-vaterite-normal"),
        "Eu-doped vaterite particles under normal illumination",
      ],
      [photo("eu-vaterite-fluorescence-02"), "Eu-doped vaterite fluorescence"],
      [photo("sem-5644"), "SEM particle morphology; composition unspecified"],
    ],
  },
  {
    id: "project5",
    number: "03",
    title: "Thulium fluorescence",
    name: "Thulium fluorescence spectroscopy",
    category: "Materials & optics",
    tags: ["Spectroscopy", "Thin films", "Curve fitting"],
    image: spectrum,
    alt: "Measured thulium fluorescence spectrum and fitted component curves",
    summary:
      "Optical measurement and component fitting to investigate the fluorescence of a thin-film crystalline system.",
    question:
      "What can the shape of an emission spectrum reveal about a material?",
    contribution:
      "Primary contributor to the experiment and analysis, combining optical measurement with spectral fitting to characterize a thulium thin-film system.",
    method:
      "Measured a magnesium-oxide-doped lithium niobate crystal with a 20 nm thulium film. A 670 nm excitation laser, optical filters, and an Ocean Optics spectrometer formed the measurement chain. Component profiles were combined into a cumulative Voigt fit.",
    result:
      "Resolved the measured spectrum into fitted components for interpretation of the material’s optical response.",
    code: "https://github.com/jasonmcarr/ThuliumFluorescenceSpectrum",
    gallery: [
      [
        spectrum,
        "Experimental spectrum with component fits and cumulative fit",
      ],
    ],
  },
  {
    id: "project2",
    number: "04",
    title: "Brownian motion & optical trapping",
    name: "Brownian motion & optical trapping",
    category: "Experimental systems",
    tags: ["Optical tweezers", "Computer vision", "NumPy"],
    summary:
      "A 5,000-frame image-analysis workflow for extracting the motion of an optically trapped microsphere.",
    question:
      "How can image sequences quantify the motion of an optically trapped particle?",
    contribution:
      "Primary contributor to the experiment and analysis, using optical trapping and Python image processing to extract transverse and vertical particle motion.",
    method:
      "A single-beam optical tweezer confines a dielectric particle near the laser focus. Computer-vision analysis of 5,000 images produces position data for statistical analysis with NumPy and Pandas.",
    result:
      "Connected image-derived motion to estimates of particle properties and trap behavior. The original measurements can be explored in the interactive plots below.",
    code: "https://github.com/jasonmcarr/OpticalTrap",
    plots: "optical",
    gallery: [],
  },
  {
    id: "project6",
    code: "https://github.com/jasonmcarr/jasonmcarr.github.io/blob/main/src/components/projects/opticalCooling.jsx",
    codeLabel: "View page source on GitHub",
    sourceNote:
      "The linked source is the research-poster presentation, not a separate analysis package.",
    number: "05",
    title: "Optical cooling research",
    name: "Optical cooling research",
    category: "Materials & optics",
    tags: ["Materials synthesis", "SEM / XRD", "Thermometry"],
    image: photo("fluorescence-chamber"),
    alt: "Fluorescing sample inside a laboratory chamber",
    imageNote: "Fluorescence chamber from my laboratory work.",
    summary:
      "Materials synthesis, structural characterization, and fluorescence thermometry for optical-cooling research.",
    question:
      "How can material preparation and optical measurements support solid-state cooling research?",
    contribution:
      "Primary contributor to the research presented with C. W. Thiel and P. J. T. Woodburn at Montana State University.",
    method:
      "Investigated crystal-growth methods, characterized materials with scanning electron microscopy and X-ray diffraction, and measured temperature-dependent fluorescence in Yb:YAG.",
    result:
      "Documented growth procedures, microscopy, diffraction results, and fluorescence thermometry in a research poster.",
    gallery: [
      [
        poster,
        "Optical Cooling — Material Synthesis, SEM & XRD Analysis, & Fluorescence Thermometry",
      ],
    ],
  },
  {
    id: "project1",
    number: "06",
    title: "Expedia flight data",
    name: "Flight-price data pipeline",
    category: "Software & data",
    tags: ["Selenium", "Pandas", "Plotly"],
    summary:
      "Collecting flight listings and comparing airline pricing, departure dates, and departure times.",
    question:
      "What pricing patterns emerge from Expedia’s selected flight listings?",
    contribution:
      "Primary contributor. Built a Python workflow to collect listings, structure the results, analyze patterns, and present interactive charts.",
    method:
      "Used Selenium and BeautifulSoup to collect the five flights ranked “best” by Expedia for the selected searches. Exported the data to CSV, analyzed it with Pandas, and visualized it with Plotly.",
    result:
      "Compared airline averages and time-dependent prices within the sampled route and date range. The findings describe this collected sample.",
    code: "https://github.com/jasonmcarr/ExpediaWebscraper",
    plots: "flights",
    gallery: [],
  },
  {
    id: "project3",
    number: "07",
    title: "COVID-19 dashboard",
    name: "COVID-19 Tableau dashboard",
    category: "Software & data",
    tags: ["Tableau", "Data visualization", "Interactive filtering"],
    image: dashboard,
    alt: "Tableau dashboard showing global coronavirus and vaccination data",
    summary:
      "An interactive dashboard for exploring geographic and temporal patterns in pandemic data.",
    question: "How can a large public-health dataset become easier to explore?",
    contribution:
      "Primary contributor. Developed an interactive Tableau dashboard that lets viewers explore data through date and geographic filters.",
    method:
      "Organized the dashboard around country, continent, and date selection, with views highlighting vaccination data and comparative trends.",
    result:
      "Created a navigable visual interface that makes geographic comparisons and time filtering available to viewers.",
    code: "https://github.com/jasonmcarr/jasonmcarr.github.io/blob/main/src/components/projects/pandemicTracker.jsx",
    codeLabel: "View integration on GitHub",
    demo: "https://public.tableau.com/views/coviddashboard_16748574137170/CovidTrackerDashboard1",
    demoLabel: "Open Tableau dashboard",
    gallery: [
      [dashboard, "Dashboard overview"],
      [dashboardBars, "Comparative dashboard view"],
    ],
  },

  {
    id: "semiconductor-calculator",
    title: "Semiconductor equation calculator",
    name: "Semiconductor equations GUI",
    tags: ["Python", "Tkinter", "NumPy"],
    art: "n · p = nᵢ²",
    artCaption: "SEMICONDUCTOR PHYSICS",
    summary:
      "A desktop calculator that turns a Python equation library into searchable, parameter-driven calculations.",
    question:
      "How can a library of semiconductor equations become easier to explore?",
    contribution:
      "Built the equation library and desktop interface, connecting semiconductor physics calculations with a searchable GUI.",
    method:
      "Python introspection extracts functions and parameter descriptions from docstrings. Tkinter and ttkbootstrap generate input fields, while NumPy implements carrier concentrations, Fermi levels, charge neutrality, recombination, and related equations.",
    result:
      "A reusable desktop study tool whose interface is driven by the underlying functions. The repository includes the GUI and equation module; it is an educational calculator rather than a validated device simulator.",
    code: "https://github.com/jasonmcarr/Semiconductor-Eq-GUI",
    number: "08",
    category: "Software & data",
    gallery: [],
  },
  {
    id: "database-pipeline",
    title: "Database design in Python",
    name: "Synthetic retail database pipeline",
    tags: ["PostgreSQL", "Pandas", "Faker"],
    art: "1,000",
    artCaption: "SYNTHETIC PROFILES",
    summary:
      "Generating synthetic camera-retail records and preparing connected tables for relational analysis.",
    question:
      "How can a flat synthetic dataset become a structured relational database?",
    contribution:
      "Created the synthetic-data generator, CSV transformation workflow, and SQL schema in the DatabaseMachineLearning repository.",
    method:
      "Faker generates 1,000 profiles. Python combines profiles with camera and lens products, prices, and order identifiers. Pandas exports separate order, item, customer, and address files; PostgreSQL definitions connect tables using row identifiers.",
    result:
      "An inspectable data-preparation and schema-design project. The current repository contains generation and database setup, rather than a trained machine-learning model.",
    code: "https://github.com/jasonmcarr/DatabaseMachineLearning",
    number: "09",
    category: "Software & data",
    gallery: [],
    codeLabel: "View GitHub (private)",
    sourceNote:
      "Private repository. GitHub access is required to view its source.",
  },
  {
    id: "tablet-driver-switch",
    title: "Tablet driver setup",
    name: "Tablet driver switching automation",
    tags: ["Python", "Windows", "Process automation"],
    art: "DETECT → SWITCH",
    artCaption: "DESKTOP AUTOMATION",
    summary:
      "A Windows utility that watches for a tablet-related process and coordinates switching to OpenTabletDriver.",
    question: "How can a recurring pen-tablet setup sequence be automated?",
    contribution:
      "Wrote the process-monitoring script and supporting Windows batch files for a personal tablet workflow.",
    method:
      "Polls Windows task lists for TabTip.exe, runs a driver-control batch file, closes Wacom Center, and starts the OpenTabletDriver daemon and interface when needed. Uses psutil, subprocess, and window management to coordinate the sequence.",
    result:
      "A focused desktop utility that replaces repeated manual setup actions. Paths and driver names are specific to the configured Windows installation.",
    code: "https://github.com/jasonmcarr/Tablet-Driver-Switch-Script",
    number: "10",
    category: "Software & data",
    gallery: [],
  },
  {
    id: "commander-simulator",
    title: "Commander game simulator",
    name: "MTG Unified Simulator",
    tags: ["Python", "Monte Carlo", "Reproducibility"],
    art: "SEED → TRIAL → REPORT",
    artCaption: "SIMULATION ENGINE",
    summary:
      "A versioned Commander goldfish simulation framework with explicit rules coverage and reproducible statistical reports.",
    question:
      "How can deck comparisons use consistent assumptions and repeatable measurements?",
    contribution:
      "Developed a shared simulation framework for deck studies, with recorded seeds, deck fingerprints, policies, and engine versions.",
    method:
      "Models a defined subset of mana, mulligans, commander deployment, and card effects. Runs repeated trials, reports milestone rates with Wilson confidence intervals, and supports extensible rule modules and regression tests.",
    result:
      "An experimental simulation baseline with CLI workflows and test coverage. Unmodeled cards are rejected by default; opponents and the complete Magic rules engine are outside the current baseline.",
    code: "https://github.com/jasonmcarr/mtg-unified-simulator",
    number: "11",
    category: "Software & data",
    gallery: [],
    codeLabel: "View GitHub (private)",
    sourceNote:
      "Private repository. GitHub access is required to view its source.",
  },
  {
    id: "portfolio-engineering",
    title: "This portfolio",
    name: "Engineering portfolio website",
    tags: ["React", "SVG", "Plotly"],
    art: "DESIGN · BUILD · SHARE",
    artCaption: "THIS PORTFOLIO",
    summary:
      "A responsive portfolio combining research case studies, interactive data, and a custom vector topographic background.",
    question:
      "How can technical work remain rigorous while being easy to explore?",
    contribution:
      "Built and iterated the portfolio around experiment design, system construction, and data analysis, with a unified sage visual theme.",
    method:
      "React routes connect project narratives, source links, image galleries, and Plotly visualizations. SVG contours preserve sharp lines at different screen sizes; motion controls and responsive layouts support accessible viewing.",
    result:
      "A browsable record of laboratory and software projects, with original research photography and direct paths to supporting code.",
    code: "https://github.com/jasonmcarr/jasonmcarr.github.io/tree/main",
    number: "12",
    category: "Software & data",
    gallery: [],
  },
  {
    id: "portfolio-archive",
    title: "My first portfolio",
    name: "Original portfolio website",
    tags: ["HTML", "CSS", "JavaScript"],
    art: "HTML / CSS / JS",
    artCaption: "ARCHIVED WEB PROJECT",
    summary:
      "The archived static-site foundation for presenting technical projects and experimenting with animated visuals.",
    question:
      "How can a personal website bring project work into one coherent place?",
    contribution:
      "Created the early multi-page portfolio, including project, about, and contact pages and visual experiments.",
    method:
      "Used standalone HTML pages, page-specific CSS, and JavaScript sketches. The repository also contains a test environment for visual iteration.",
    result:
      "An archived predecessor that documents the portfolio’s evolution from a static multi-page site to the current React implementation.",
    code: "https://github.com/jasonmcarr/PortfolioWebsite",
    number: "13",
    category: "Software & data",
    gallery: [],
    codeLabel: "View GitHub (private)",
    sourceNote:
      "Private repository. GitHub access is required to view its source.",
  },
  {
    id: "rental-reporter",
    title: "Rental search reports",
    name: "Rental discovery & reporting pipeline",
    tags: ["Python", "BeautifulSoup", "ReportLab"],
    art: "COLLECT → RANK → REPORT",
    artCaption: "SEARCH AUTOMATION",
    summary:
      "A configurable pipeline that collects rental listings, scores their fit, removes duplicates, and produces email-ready reports.",
    question: "How can recurring housing searches become easier to review?",
    contribution:
      "Built the rental-reporting script supplied with this portfolio, covering collection, ranking, persistence, reporting, and scheduling.",
    method:
      "Source adapters target Craigslist, Zillow, Redfin, and Apartments.com. Explicit scoring weighs layout, yard, pet language, and location. Normalized addresses and titles reduce duplicates; saved listing keys distinguish new results. ReportLab and HTML templates produce grouped reports, with optional SMTP delivery and a timezone-aware daily loop.",
    result:
      "A complete script for producing prioritized rental summaries. Live collection depends on each source’s markup and availability; source failures are logged so other adapters can continue.",
    code: "https://github.com/jasonmcarr/jasonmcarr.github.io/blob/main/public/project-code/rental_reporter.py",
    sourceNote:
      "Based on the supplied message-1.txt script. Personal configuration and email credentials are not published.",
    number: "14",
    category: "Software & data",
    gallery: [],
  },
  {
    id: "discord-cleanup",
    title: "Discord message cleanup",
    name: "Discord channel cleanup bot",
    tags: ["Python", "discord.py", "Asyncio"],
    art: "MESSAGE → DELAY → CLEANUP",
    artCaption: "EVENT-DRIVEN AUTOMATION",
    summary:
      "A small asynchronous bot prototype for removing messages from a designated Discord text channel after a delay.",
    question: "How can a selected channel keep only recent conversation?",
    contribution:
      "Created a channel-specific cleanup prototype using Discord events and asynchronous delays.",
    method:
      "Filters incoming messages by channel name, ignores messages from bots, waits 12 hours, then attempts deletion. A missing-message exception is suppressed when a message has already been removed.",
    result:
      "A concise event-driven prototype. Scheduled deletions live in process memory, so restarts interrupt pending tasks. The portfolio source replaces the embedded credential and server identifiers with environment variables.",
    code: "https://github.com/jasonmcarr/jasonmcarr.github.io/blob/main/public/project-code/discord_cleanup_bot.py",
    sourceNote:
      "Sanitized source from the supplied bot.py. No bot token is included. Deployment still requires appropriate Discord intents and permissions.",
    number: "15",
    category: "Software & data",
    gallery: [],
  },
];
