import codeScreen from "../../assets/images/portfolio/code-screen.svg?no-inline";
import dashboardCover from "../../assets/images/portfolio/dashboardCover.webp";
import chamberCover from "../../assets/images/portfolio/chamberCover.webp";
import trapCover from "../../assets/images/portfolio/trapCover.webp";
import tandelaDancers from "../../assets/images/portfolio/tandela-dancers.webp";
import discordMark from "../../assets/images/portfolio/discord-mark.svg?no-inline";
import rentalSearch from "../../assets/images/portfolio/rental-search.svg?no-inline";
import commanderHand from "../../assets/images/portfolio/commander-hand.svg?no-inline";
import penTablet from "../../assets/images/portfolio/pen-tablet.svg?no-inline";
import cameraSchema from "../../assets/images/portfolio/camera-schema.svg?no-inline";
import semiconductorChip from "../../assets/images/portfolio/semiconductor-chip.svg?no-inline";
import flightRoute from "../../assets/images/portfolio/flight-route.svg?no-inline";
import originalSite from "../../assets/images/portfolio/original-site.webp";
import opticalWaist from "../../assets/images/portfolio/optical-waist.svg?no-inline";
import trapDiagram from "../../assets/images/project2/trap_diagram.png";
import poster from "../../assets/images/project6/optical-cooling.png";
import dashboard from "../../assets/images/project3/tracker-home.png";
import dashboardBars from "../../assets/images/project3/tracker-bar.png";
const trajectories = `/research/charts/Trajectories.png`;
const fft = `/research/charts/Axial_FFT.png`;
const quality = `/research/charts/q_avg.png`;
const spectrum = `/research/charts/fluo_spectra.png`;
const photo = (name) => `/research/${name}.png`;
export const resume = `/documents/Jason-Carr-Resume.pdf?v=20261108-approved`;
export const projects = [
  {
    id: "project4",
    fieldLabel: "Magnetic quadrupole",
    fieldTitle: "Particle levitation experiment",
    number: "01",
    title: "Magneto-gravitational trapping",
    name: "Magneto-gravitational trapping",
    category: "Experimental systems",
    tags: ["Vacuum systems", "FFT analysis", "Python"],
    image: trapCover,
    alt: "Green-illuminated magnetic quadrupole particle trap",
    summary:
      "An experimental platform for studying levitated particle motion across atmospheric and vacuum conditions.",
    question: "How does a trapped particle move as its environment changes?",
    contribution:
      "I tracked three levitated particles, one at atmospheric pressure, one in rough vacuum, and one in high vacuum. A magnetic quadrupole supports a diamagnetic particle against gravity. That leaves it free to move around an equilibrium point without resting on a surface.",
    method:
      "I plotted each particle’s path in two directions. A Fourier transform separates its position record into frequencies, so a repeated oscillation appears as a peak. I then combined those frequencies with a fit to the distribution of thermal displacements to estimate particle mass.",
    result:
      "The three mass estimates were (4.5 ± 0.6), (6.1 ± 0.5), and (3.8 ± 0.5) nanograms, respectively. Each run tracked a different particle, so the differences between those numbers cannot be attributed to pressure alone. The high-vacuum estimate also depends on how well a thermal-motion model describes a particle that rarely collides with gas molecules.",
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
    image: `/research/sem-5638.webp`,
    alt: "Scanning electron micrograph showing crystalline particle morphology",
    summary:
      "Growing and examining materials through synthesis, electron microscopy, and fluorescence measurements.",
    question:
      "How do growth conditions and composition appear in a material’s structure and optical response?",
    contribution:
      "I grew europium-doped yttrium vanadate crystals and synthesized europium-doped vaterite, a crystalline form of calcium carbonate. I wanted to see both the shapes that formed during growth and where they emitted light under excitation.",
    method:
      "I compared ordinary microscope images with images taken under ultraviolet illumination. The erbium-doped yttrium vanadate images show the same recognizable crystal edges under both conditions. For finer surface detail, I used scanning electron microscopy, which makes it possible to see facets, rounded grains, and clusters that blend together in the optical images.",
    result:
      "The paired images show where fluorescence is concentrated relative to the visible crystals and particle clusters. The electron micrographs answer a different question about shape. I kept the original sample labels with the photographs because similar-looking grains can have different compositions.",
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
    imageFit: "contain",
    imageInset: "3%",
    alt: "Measured thulium fluorescence spectrum and fitted component curves",
    summary:
      "Optical measurement and component fitting to investigate the fluorescence of a thin-film crystalline system.",
    question:
      "What can the shape of an emission spectrum reveal about a material?",
    contribution:
      "I measured light emitted by a 20 nm thulium film on magnesium-oxide-doped lithium niobate. The challenge was to pick out overlapping features in one broad emission band while keeping scattered light from the excitation laser out of the measurement.",
    method:
      "I excited the sample with a 670 nm laser and collected light through a 750 nm long-pass filter and a 900 nm short-pass filter. That pair passes the wavelength range of interest to an Ocean Optics spectrometer. I modeled the recorded band as a sum of Voigt profiles, a peak shape that combines Gaussian and Lorentzian broadening.",
    result:
      "The plot shows the measured spectrum alongside the individual fitted peaks and their sum. Comparing the sum with the data shows how well the model reproduces the band. Seeing the components separately also makes it easier to identify features that would be hard to locate by eye in the combined signal.",
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
    image: opticalWaist,
    alt: "Horizontal optical trap diagram showing the beam waist, trapped particle, and Rayleigh range",
    imageFit: "contain",
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
      "I used a tightly focused laser to hold a polystyrene microsphere in view while it moved in response to collisions with the surrounding fluid. The light draws the sphere toward the focus and supplies a restoring force when it wanders away.",
    method:
      "I recorded 5,000 microscope images and used Python image processing to extract the particle’s position along two axes. Plotting successive positions shows its path. Grouping the same measurements into histograms shows how often it occupied each position, which is easier to compare across the two directions.",
    result:
      "From the measured radius of 1.72 micrometers and the density of polystyrene, I estimated a mass of 2.25 × 10⁻¹⁴ kg. My analysis gave a trap stiffness of about 1.14 × 10⁻⁵ N/m. Stiffness describes how strongly the trap pulls the particle back for a given displacement. The interactive plots show the motion behind those estimates.",
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
    image: chamberCover,
    alt: "Fluorescing sample inside a laboratory chamber",
    imageNote: "Fluorescence chamber from my laboratory work.",
    summary:
      "Materials synthesis, structural characterization, and fluorescence thermometry for optical-cooling research.",
    question:
      "How can material preparation and optical measurements support solid-state cooling research?",
    contribution:
      "At Montana State University, I worked with C. W. Thiel and P. J. T. Woodburn on materials for optical refrigeration. The underlying idea is that a crystal can lose heat if the light it emits carries away more energy than the light it absorbs. My part of the work brought together crystal growth, structural measurements, and an optical way to read temperature.",
    method:
      "We compared batches of ytterbium-doped yttrium aluminum garnet (Yb:YAG) prepared by co-precipitation. Electron microscopy showed how individual grains grew or clumped together. X-ray diffraction let us check their crystal structure. For thermometry, we compared the intensities of two ytterbium emission features as the sample temperature changed.",
    result:
      "The poster records how changes in preparation affected grain size and separation, alongside the diffraction and fluorescence measurements. The intensity ratio gave us a way to study temperature through the light leaving the sample, a measurement needed to evaluate a candidate cooling material.",
    gallery: [
      [
        poster,
        "Optical Cooling — Material Synthesis, SEM & XRD Analysis, & Fluorescence Thermometry",
      ],
    ],
  },
  {
    id: "project1",
    image: flightRoute,
    alt: "A plane crossing a folded map along a dotted flight path",
    imageFit: "contain",
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
      "I built a Python collector to answer a question I had when comparing flights: did the airline that appeared most often in Expedia’s recommendations also tend to have the lowest fare? I kept the search to one route and collected the five flights Expedia ranked “best” for each search.",
    method:
      "Selenium loaded the results and BeautifulSoup extracted airline, fare, departure date, and departure time. I saved those fields to CSV, grouped them in Pandas, and used Plotly to compare average prices with how frequently each carrier appeared in the recommendations.",
    result:
      "Delta accounted for 43% of the sampled listings and United for 40%. United generally had the cheapest available fare on this route, while Delta offered the widest range of departure times. Those are two different reasons a flight might appeal to a traveler. Both findings describe the recommended listings collected for this route.",
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
    image: dashboardCover,
    imageFit: "contain",
    imageInset: "3%",
    alt: "Tableau dashboard showing global coronavirus and vaccination data",
    summary:
      "An interactive dashboard for exploring geographic and temporal patterns in pandemic data.",
    question: "How can a large public-health dataset become easier to explore?",
    contribution:
      "I built a Tableau dashboard for exploring the first year of COVID-19 data, with particular attention to vaccination rates. I wanted a reader looking at a global figure to be able to narrow the question to a particular place and period.",
    method:
      "I connected date-range, continent, and country filters to the dashboard views. A reader can first choose a time window, then narrow the geography while keeping that window fixed. The comparative chart gives a second view of the selected data alongside the geographic overview.",
    result:
      "The dashboard makes it possible to ask a specific question, such as how the reported vaccination figures compare across countries during the same period. The embedded images show the overall layout, and the linked Tableau workbook lets the reader try a different selection.",
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
    image: semiconductorChip,
    alt: "Semiconductor chip with a central die, pins, and circuit traces",
    imageFit: "contain",
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
      "I built a desktop calculator for the semiconductor equations I was working through. I wanted to look up a quantity such as carrier concentration, see which inputs it requires, and evaluate it without having to remember a Python function name or argument order.",
    method:
      "I kept the equations in a Python module and used NumPy for the calculations. The interface inspects each function’s parameters and reads its documentation to build the corresponding input form. Tkinter and ttkbootstrap handle the searchable desktop interface. The library includes Fermi-level, charge-neutrality, and recombination calculations.",
    result:
      "Keeping each equation and its input definitions together made it easier to extend the calculator. When a documented function is added to the library, the interface can build its form from that definition. I can work through a numerical example and then inspect the exact expression used to calculate it.",
    code: "https://github.com/jasonmcarr/Semiconductor-Eq-GUI",
    number: "08",
    category: "Software & data",
    gallery: [],
  },
  {
    id: "database-pipeline",
    image: cameraSchema,
    alt: "Camera retail schema linking customers, orders, and order items",
    imageFit: "contain",
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
      "I built a small camera-retail dataset to practice relational database design. A flat sales file tends to repeat a customer’s name and address for every item they buy. I wanted to separate those records while keeping enough information to put an order back together.",
    method:
      "I generated 1,000 synthetic profiles with Faker, then combined them with camera and lens products, prices, and order identifiers. A Pandas transformation writes separate customer, address, order, and item files. The PostgreSQL schema uses identifiers to link the records across tables.",
    result:
      "The resulting tables support questions at different levels. An order identifies a purchase, its item records describe what was bought, and the customer record identifies who placed it. Using synthetic profiles also makes it possible to inspect and share examples without exposing real customer information.",
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
    image: penTablet,
    alt: "Drawing tablet with shortcut buttons and a stylus above the active area",
    imageFit: "contain",
    title: "Tablet driver setup",
    name: "Tablet driver switching automation",
    tags: ["Python", "Windows", "Process automation"],
    art: "DETECT → SWITCH",
    artCaption: "DESKTOP AUTOMATION",
    summary:
      "A Windows utility that watches for a tablet-related process and coordinates switching to OpenTabletDriver.",
    question: "How can a recurring pen-tablet setup sequence be automated?",
    contribution:
      "I wrote a Windows utility for a pen-tablet setup that involved closing the Wacom interface and starting OpenTabletDriver. Repeating that sequence by hand made a simple driver change depend on remembering which applications were already running.",
    method:
      "The Python script polls the Windows process list for TabTip.exe. When it detects the configured condition, it calls a batch file for driver control, closes Wacom Center, and starts the OpenTabletDriver daemon and user interface as needed. The daemon handles driver work in the background while the interface exposes its controls.",
    result:
      "The script turns the process state into a repeatable startup sequence on my machine. It also makes the installation-specific parts easy to identify: someone adapting it to another Windows setup would need to check the executable paths and process names against that installation.",
    code: "https://github.com/jasonmcarr/Tablet-Driver-Switch-Script",
    number: "10",
    category: "Software & data",
    gallery: [],
  },
  {
    id: "commander-simulator",
    image: commanderHand,
    alt: "A fan of seven illustrated trading cards",
    imageFit: "contain",
    title: "Commander game simulator",
    name: "MTG Unified Simulator",
    tags: ["Rust", "Monte Carlo", "Reproducibility"],
    art: "SEED → TRIAL → REPORT",
    artCaption: "SIMULATION ENGINE",
    summary:
      "A versioned Commander goldfish simulation framework with explicit rules coverage and reproducible statistical reports.",
    question:
      "How can deck comparisons use consistent assumptions and repeatable measurements?",
    contribution:
      "I built a simulator to compare Commander decks across repeated opening hands and turns. A “goldfish” trial plays one deck without an opponent. That makes it possible to study a narrow question, such as how often a deck can produce the mana to cast its commander by a chosen turn.",
    method:
      "The engine follows a specified mulligan and play policy and resolves the card interactions it supports. Each run records the random seed, deck fingerprint, and engine version so I can reproduce a result after changing a card or a rule. Repeated trials produce milestone rates with Wilson confidence intervals, which show the sampling uncertainty around each rate.",
    result:
      "I can compare two deck configurations using the same assumptions and investigate the trials where a deck misses its target. The result measures the modeled sequence, such as casting a commander on time. It does not estimate a win rate against other players. Unsupported cards are flagged so their effects do not silently disappear from a comparison.",
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
    image: codeScreen,
    alt: "Sage outline of a desktop monitor displaying a code editor",
    imageFit: "contain",
    summary:
      "A responsive portfolio combining research case studies, interactive data, and a custom vector topographic background.",
    question:
      "How can technical work remain rigorous while being easy to explore?",
    contribution:
      "I rebuilt this site around the material I most wanted people to see: photographs of the apparatus, the measurements it produced, and the code I used to analyze them. For a research project, the reader can move from a short description of the experiment directly to the relevant figure.",
    method:
      "React renders the project pages from a shared set of records containing the narrative, gallery, and source links. The Brownian-motion and flight pages also load interactive Plotly charts. I drew the background contours as SVG paths so the lines stay sharp as the layout changes, and included a control to pause their motion.",
    result:
      "A new project can use the existing page layout while bringing its own evidence, whether that is a micrograph, a dataset, or a software repository. The production build is served through GitHub Pages, and each project has a direct link that also works when opened on its own.",
    code: "https://github.com/jasonmcarr/jasonmcarr.github.io/tree/main",
    number: "12",
    category: "Software & data",
    gallery: [],
  },
  {
    id: "portfolio-archive",
    image: originalSite,
    alt: "Sage-tinted screenshot of my original portfolio with its navigation and About text",
    imageFit: "contain",
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
      "My first portfolio was a collection of standalone pages for my projects, background, and contact information. Building a separate page for each section gave me room to try different layouts for introductions, longer project descriptions, and supporting images.",
    method:
      "I built the pages with HTML and page-specific CSS, and used JavaScript sketches to experiment with animated visuals. A separate test environment gave me somewhere to adjust those experiments before putting them into the portfolio.",
    result:
      "The archive preserves the early layout and visual experiments. In the current portfolio I still use the same progression from a physical or practical question to a figure or result. Moving the common layout into React made it easier to keep that structure consistent as the number of projects grew.",
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
    image: rentalSearch,
    alt: "A rental listing with a house scanned by a magnifying glass",
    imageFit: "contain",
    title: "Rental search reports",
    name: "Rental discovery & reporting pipeline",
    tags: ["Python", "BeautifulSoup", "ReportLab"],
    art: "COLLECT → RANK → REPORT",
    artCaption: "SEARCH AUTOMATION",
    summary:
      "A configurable pipeline that collects rental listings, scores their fit, removes duplicates, and produces email-ready reports.",
    question: "How can recurring housing searches become easier to review?",
    contribution:
      "I wrote a rental-search script because the same home can turn up on several sites, sometimes under different titles. I wanted a daily report that would surface newly seen listings and explain which ones fit my priorities well enough to look at first.",
    method:
      "Separate collectors read listings from Craigslist, Zillow, Redfin, and Apartments.com. The script scores clues such as layout, yard, pet policy, and location, then normalizes addresses to identify repeat listings. It saves identifiers between runs and falls back to a cleaned URL or title when an address is missing.",
    result:
      "Each run produces an HTML report and a PDF, with optional email delivery. Previously seen listings remain available as fallback results. Collection errors are handled per source, so a change to one site can leave a partial report instead of preventing the other sources from being reviewed.",
    code: "https://github.com/jasonmcarr/jasonmcarr.github.io/blob/main/public/project-code/rental_reporter.py",
    sourceNote:
      "Based on the supplied message-1.txt script. Personal configuration and email credentials are not published.",
    number: "14",
    category: "Software & data",
    gallery: [],
  },
  {
    id: "discord-cleanup",
    image: discordMark,
    alt: "Discord controller logo in sage outline",
    imageFit: "contain",
    title: "Discord message cleanup",
    name: "Discord channel cleanup bot",
    tags: ["Python", "discord.py", "Asyncio"],
    art: "MESSAGE → DELAY → CLEANUP",
    artCaption: "EVENT-DRIVEN AUTOMATION",
    summary:
      "A small asynchronous bot prototype for removing messages from a designated Discord text channel after a delay.",
    question: "How can a selected channel keep only recent conversation?",
    contribution:
      "I built a Discord bot for a text channel used alongside voice chat, where a message can be useful during a conversation and have little value the next day. I wanted a retention rule for that one channel while leaving the rest of the server alone.",
    method:
      "The bot listens for a new-message event, checks the channel name, and skips messages posted by bots. For each eligible message it starts a 12-hour asynchronous wait. Other messages can be processed during that wait. When the timer expires, the bot asks Discord to delete that specific message and handles the case where someone has already removed it.",
    result:
      "That design gives each message its own expiration time without periodically scanning the channel history. The tradeoff is that timers live in memory. If the bot restarts, it can handle new arrivals immediately, but messages that were waiting before the restart lose their pending deletion.",
    code: "https://github.com/jasonmcarr/jasonmcarr.github.io/blob/main/public/project-code/discord_cleanup_bot.py",
    sourceNote:
      "Sanitized source from the supplied bot.py. No bot token is included. Deployment still requires appropriate Discord intents and permissions.",
    number: "15",
    category: "Software & data",
    gallery: [],
  },
  {
    id: "tandela",
    image: tandelaDancers,
    alt: "Sage outline of two Argentine tango dancers in close embrace",
    imageFit: "contain",
    number: "16",
    title: "Tandela",
    name: "Tandela",
    category: "Software & data",
    tags: ["Rust", "Slint", "Desktop audio"],
    art: "Tandela",
    artCaption: "TANGO DJ SOFTWARE",
    summary: "A desktop DJ app I’m building for Lela to organize music and run Argentine tango dance evenings.",
    question: "How can a tango DJ adjust the music during a milonga?",
    contribution:
      "I’m building Tandela for Lela to use when she DJs Argentine tango. At a milonga, the DJ plays a group of songs called a tanda, followed by a short musical break called a cortina. I wanted her to be able to prepare an evening around those groups and still change the order when she sees what the dancers respond to.",
    method:
      "The desktop app uses Rust and Slint for its shared Windows and macOS implementation. It separates a local recording, a reusable tanda, and a placement of that tanda in a playlist. That distinction matters when the same set appears in several playlists: the DJ can edit its shared definition without having to track down and update each copy.",
    result:
      "Lela can organize recordings into sets ahead of time and arrange those sets for a particular evening. During planning, moving a tanda keeps the group together. Editing a linked tanda keeps its placements consistent across playlists, so a correction made while preparing one event carries through to the next.",
    code: "https://github.com/jasonmcarr/tango-dj-software",
    codeLabel: "View GitHub (private)",
    gallery: [],
  },
];
