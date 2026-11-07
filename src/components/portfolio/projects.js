import trapDiagram from "../../assets/images/project2/trap_diagram.png";
import trajectories from "../../assets/images/project2/Trajectories.png";
import fft from "../../assets/images/project2/Axial_FFT.png";
import quality from "../../assets/images/project2/q_avg.png";
import spectrum from "../../assets/images/project5/fluo_spectra.png";
import poster from "../../assets/images/project6/optical-cooling.png";
import dashboard from "../../assets/images/project3/tracker-home.png";
import dashboardBars from "../../assets/images/project3/tracker-bar.png";
const photo = (name) => `${process.env.PUBLIC_URL}/research/${name}.png`;
export const resume = `${process.env.PUBLIC_URL}/documents/Jason-Carr-Resume.pdf`;
export const projects = [
  {
    id: "project4",
    number: "01",
    title: "Holding a particle in place.",
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
    number: "02",
    title: "From chemistry to crystal.",
    name: "Crystal growth & material characterization",
    category: "Materials & optics",
    tags: ["Crystal growth", "SEM", "Fluorescence"],
    image: photo("sem-5652"),
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
    title: "Finding structure in a spectrum.",
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
    title: "Measuring the smallest movements.",
    name: "Optical trapping & image analysis",
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
    number: "05",
    title: "Exploring light as a cooling tool.",
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
    title: "Turning web data into answers.",
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
    title: "Making a global dataset navigable.",
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
    code: "https://public.tableau.com/views/coviddashboard_16748574137170/CovidTrackerDashboard1",
    codeLabel: "Open Tableau dashboard",
    gallery: [
      [dashboard, "Dashboard overview"],
      [dashboardBars, "Comparative dashboard view"],
    ],
  },
];
