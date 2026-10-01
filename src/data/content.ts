import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import tdeStatsGenerator from "@/assets/tde-statistics-generator.png";
import onomaMarketplace from "@/assets/onoma-marketplace.png";
import blog1 from "@/assets/blog-1.jpg";
import blog2 from "@/assets/blog-2.jpg";
import blog3 from "@/assets/blog-3.jpg";
import client1 from "@/assets/client-1.jpg";
import client2 from "@/assets/client-2.jpg";
import client3 from "@/assets/client-3.jpg";
import client4 from "@/assets/client-4.jpg";

export const profile = {
  name: "Vianel TIAGUE NTIECHE",
  shortName: "Vianel TIAGUE N.",
  role: "UI/UX Designer & Web / Software Developer",
  tagline: "UI/UX Designer & Web Developer based in Togo",
  email: "tiaguentiechevianel@gmail.com",
  schoolEmail: "vianel.tiaguentieche@lomebs.com",
  phone: "+228 70 40 19 94",
  location: "Hédzranawoé, Tingamé — Lomé, Togo",
  linktree: "https://linktr.ee/tiaguentiechevianel",
  about:
    "Bilingual third-year Bachelor's student in Information Systems at Lomé Business School (LBS) and passionate UI/UX Designer and Web Developer. Experienced in website redesigns (notably for Société Togolaise des Eaux - TdE), developing statistical analysis applications with automated report generation, building secure marketplace platforms (ONOMA), and leading community tech initiatives.",
  socials: [
    { label: "LinkedIn", href: "https://linkedin.com", icon: "linkedin" as const },
    { label: "Linktree", href: "https://linktr.ee/tiaguentiechevianel", icon: "link" as const },
    { label: "GitHub", href: "https://github.com", icon: "github" as const },
    { label: "Instagram", href: "https://instagram.com", icon: "instagram" as const },
    { label: "Facebook", href: "https://facebook.com", icon: "facebook" as const },
    { label: "TikTok", href: "https://tiktok.com", icon: "tiktok" as const },
  ],
};

export const cvDownloads = {
  en: {
    label: "Download CV (English)",
    filename: "cv-vianel-tiague-ntieche-en.pdf",
    url: "/cv-vianel-tiague-ntieche-en.pdf",
    language: "English",
    badge: "EN",
    size: "PDF",
  },
  fr: {
    label: "Télécharger CV (Français)",
    filename: "cv-vianel-tiague-ntieche-fr.pdf",
    url: "/cv-vianel-tiague-ntieche-fr.pdf",
    language: "Français",
    badge: "FR",
    size: "PDF",
  },
};

export const experiences = [
  {
    id: "tde-intern",
    company: "Société Togolaise des Eaux (TdE)",
    role: "UI/UX Designer & Web Developer (Stage Académique)",
    period: "07/2026 – 09/2026",
    location: "Lomé, Togo",
    type: "Internship / Stage Académique",
    description:
      "Designed the new interface for the official TdE website using Figma, improving user experience and overall usability, and developed a statistical analysis application to process data, generate visualizations and automatically produce statistical reports.",
    highlights: [
      "Designed the new user interface for the official TdE website using Figma, significantly improving user experience and accessibility.",
      "Developed a statistical analysis application to process operational data, generate interactive charts, and automatically produce statistical reports.",
      "Conducted user experience flows and responsive layouts across mobile, tablet, and desktop screens.",
      "Engineered data export modules for rapid reporting and operational insights.",
    ],
    technologies: ["Figma", "UI/UX Design", "SQL", "JavaScript", "HTML/CSS", "Data Visualization & Reporting"],
  },
  {
    id: "onomamarket",
    company: "ONOMA",
    role: "Founder & Web Developer",
    period: "01/2026 – Present",
    location: "Lomé, Togo",
    type: "Entrepreneurial Venture / Projet Entrepreneurial",
    description:
      "Engineered and deployed a trusted e-commerce marketplace platform with dedicated features for both buyers and sellers.",
    highlights: [
      "Designed the entire product user interface in Figma and developed full-stack web features.",
      "Implemented seamless features tailored for both buyers and verified sellers.",
      "Integrated secure communication and optimized search filters for fast mobile browsing.",
    ],
    technologies: ["Figma", "UI/UX", "JavaScript", "SQL", "Full-Stack Development", "Responsive Design"],
  },
  {
    id: "wordpress-dev",
    company: "Personal Project (Projet Personnel)",
    role: "WordPress Developer",
    period: "10/2024 – 12/2024",
    location: "Lomé, Togo",
    type: "Personal Project",
    description:
      "Designed and managed a dynamic blog and fan page using WordPress, integrating multimedia content and refining user interfaces.",
    highlights: [
      "Built and configured custom WordPress layouts with responsive typography and media integration.",
      "Optimized user navigation, loading performance, and media gallery displays.",
      "Managed website administration, updates, and CMS configuration.",
    ],
    technologies: ["WordPress", "CMS", "PHP", "CSS", "Website Administration"],
  },
];

export const volunteering = [
  {
    id: "tcc-co-lead",
    organization: "Tech Campus Club (TCC)",
    role: "TCC Co-Lead",
    period: "12/2025 – 06/2026",
    location: "Lomé, Togo",
    description: "Coordinated community activities and initiatives, organized workshops and training sessions, and managed volunteers.",
    highlights: [
      "Coordinated community activities, tech meetups, and student initiatives.",
      "Organized workshops, hands-on training sessions, and campus events.",
      "Managed a dedicated team of volunteers and delegated operational tasks.",
    ],
  },
  {
    id: "tcr-logistics",
    organization: "Togo Code Run (TCR)",
    role: "Logistics & Communications Officer (Chargé Logistique & Communication)",
    period: "11/2025 – 09/2026",
    location: "Lomé, Togo",
    description: "Coordinated event logistics, managed participant registrations and reception, and handled social media communications.",
    highlights: [
      "Coordinated full-scale event logistics for the developer community.",
      "Managed participant registrations, ticketing, and on-site reception.",
      "Handled social media communications and community outreach.",
    ],
  },
];

export const references = [
  {
    name: "M. GABA Guillaume",
    title: "Head of Studies (Chargé des Études)",
    institution: "Lomé Business School (LBS)",
    location: "Lomé, Togo",
    phone: "+228 90 26 47 67",
  },
];

export const education = [
  {
    degree: "Bachelor's Degree in Information Systems (Bachelor en Systèmes d'Information)",
    institution: "Lomé Business School (LBS)",
    location: "Lomé, Togo",
    period: "10/2024 – Present (3rd Year Student)",
    role: "President of the English Club",
    description:
      "Studying software engineering, database modeling (SQL), enterprise systems, project management, and information technologies.",
  },
  {
    degree: "Vocational Baccalaureate (Baccalauréat Professionnel)",
    institution: "Rock Legacy International School (RLIS)",
    location: "Lomé, Togo",
    period: "09/2021 – 08/2024 (Obtained : 2024)",
    role: "Student",
    description:
      "Solid foundation in information technology, scientific disciplines, problem-solving, and bilingual English-French communication.",
  },
];

export const certifications = [
  {
    title: "Certificate from AU CIEFFA & ImpactHER",
    issuer: "AU CIEFFA & ImpactHER",
    year: "2026",
    description: "Leadership, digital skills, and entrepreneurship development.",
  },
  {
    title: "Pix Digital Competence Certification",
    issuer: "Pix",
    year: "2026",
    description: "Validated digital literacy, data processing, online security, and digital collaboration.",
  },
];

export const services = [
  {
    slug: "ui-ux-design",
    icon: "pen",
    title: "UI/UX & Figma Design",
    description: "User interfaces, wireframes, design systems, and interactive clickable prototypes.",
    details: [
      "Figma wireframing, high-fidelity prototypes and full user journey mapping",
      "Design systems with reusable tokens, components, and documented states",
      "Mobile-first, intuitive interfaces tailored to African & international markets",
    ],
  },
  {
    slug: "website-redesign",
    icon: "refresh",
    title: "Website Redesign (Refonte Web)",
    description: "Modernizing outdated websites into sleek, responsive, accessible digital experiences.",
    details: [
      "Comprehensive UI/UX and UX audit of existing websites (e.g., TdE experience)",
      "Modern visual revamp retaining established brand authority",
      "Major speed improvements, mobile responsiveness, and intuitive navigation",
    ],
  },
  {
    slug: "web-development",
    icon: "code",
    title: "Web & Full-Stack Development",
    description: "Custom web applications, marketplaces, and responsive business platforms.",
    details: [
      "Full-stack platforms like Onomamarket, corporate portals, and interactive apps",
      "Semantic HTML, CSS/Tailwind, JavaScript/TypeScript, PHP & SQL",
      "Ultra-fast loading speed engineered for mobile and low-bandwidth connections",
    ],
  },
  {
    slug: "statistics-dashboards",
    icon: "terminal",
    title: "Statistics & Reporting Tools",
    description: "Data visualization dashboards with automated graph and report generation.",
    details: [
      "Dynamic interactive charts and analytics dashboards",
      "Automated summary report generation and PDF/spreadsheet export",
      "Clean database design, metric calculation, and key performance tracking",
    ],
  },
  {
    slug: "digital-solutions",
    icon: "layers",
    title: "Digital Operations & WordPress",
    description: "WordPress sites, digital content management, and virtual assistant operations.",
    details: [
      "WordPress setups, custom themes, and content management workflows",
      "Digital content creation, social media publishing, and campaign assets",
      "Virtual assistance, data organization, and international team support",
    ],
  },
  {
    slug: "technical-consulting",
    icon: "compass",
    title: "Technical Consulting & Strategy",
    description: "Guidance on technology stacks, anti-scam platform safety, and digital architecture.",
    details: [
      "Choosing the right architecture and tech stack for early-stage products",
      "Security best practices and scam prevention for marketplaces",
      "Mentoring and design/code review for students and founders",
    ],
  },
];

export type Project = (typeof projects)[number];

export const projects = [
  {
    slug: "tde-website-redesign",
    title: "Société Togolaise des Eaux (TdE) — Website Redesign",
    category: "Design",
    image: project1,
    excerpt: "Complete UI/UX redesign of the national water utility's official website in Togo.",
    description:
      "During my internship at Société Togolaise des Eaux (TdE), I spearheaded the complete UI/UX overhaul of their official website. The project aimed to transform an outdated layout into an accessible, citizen-first portal where users can effortlessly check water billing details, discover services, report incidents, and read national announcements.",
    technologies: ["Figma", "UI/UX Design", "Design Systems", "Prototyping", "User Flow"],
    features: [
      "Full mobile-first and desktop design systems built in Figma",
      "Intuitive customer portal for water bill checking and payment guidance",
      "Accessible typography and government-grade visual identity",
      "Interactive high-fidelity clickable prototype for stakeholder approval",
    ],
    liveUrl: "",
    githubUrl: "",
  },
  {
    slug: "tde-statistics-generator",
    title: "TdE Statistics & Graph Generation Platform",
    category: "Web Development",
    image: tdeStatsGenerator,
    excerpt: "An analytics web tool for generating operational statistics, charts, and downloadable reports.",
    description:
      "Developed at Société Togolaise des Eaux as a key technical solution: an internal web application that aggregates water utility data, calculates metrics, dynamically renders comparative graphs, and generates comprehensive printable/PDF reports with one click.",
    technologies: ["JavaScript", "HTML5", "CSS3", "PHP", "SQL", "Chart.js / Data Viz"],
    features: [
      "Dynamic multi-format graph generation (bar, line, pie)",
      "Automated summary report creation with exportable touches",
      "Data filtering by region, time period, and operational metrics",
      "Lightweight architecture ensuring fast loading on internal networks",
    ],
    liveUrl: "",
    githubUrl: "",
  },
  {
    slug: "onomamarket",
    title: "Onomamarket — Scam-Free Marketplace",
    category: "Applications",
    image: onomaMarketplace,
    excerpt: "A safe peer-to-peer e-commerce marketplace engineered to protect buyers and sellers from scams.",
    description:
      "Onomamarket is a personal venture born out of the need for a trustworthy local marketplace in West Africa. The platform eliminates fraudulent listings through verified accounts, direct secure communication, smart category filters, and an intuitive browsing interface.",
    technologies: ["JavaScript", "PHP", "SQL", "UI/UX Design", "Figma", "Responsive Web"],
    features: [
      "Zero-scam verified vendor and buyer workflow",
      "Categorized marketplace with instant search and geo-filtering",
      "Mobile-optimized catalog for low-bandwidth browsing",
      "Clean dashboard for sellers to manage inventory and orders",
    ],
    liveUrl: "",
    githubUrl: "https://github.com",
  },
  {
    slug: "figma-uiux-collection",
    title: "Figma UI/UX & Design Systems Collection",
    category: "Design",
    image: project2,
    excerpt: "A curated collection of web apps, mobile interfaces, and design systems crafted in Figma.",
    description:
      "An extensive showcase of UI/UX design work created in Figma. Encompasses design tokens, atomic component libraries, dark/light modes, micro-interactions, and mobile prototypes for fintech, travel, and public service platforms.",
    technologies: ["Figma", "UI/UX", "Interactive Prototyping", "Design Tokens", "Wireframing"],
    features: [
      "Complete design system with color palettes, typography scales, and button states",
      "Interactive prototypes with smooth transitions and animated overlays",
      "Cross-platform responsive components (iOS, Android, Web)",
      "User research personas and wireframe explorations",
    ],
    liveUrl: "https://figma.com",
    githubUrl: "",
  },
  {
    slug: "asiatic-digital-campaigns",
    title: "Asiatic International Corp — Digital Operations",
    category: "Other",
    image: project1,
    excerpt: "Multi-channel digital marketing graphics, content strategy, and remote operational workflows.",
    description:
      "Highlights of digital marketing visual assets, social media branding, and administrative data workflows managed during my international remote internship at Asiatic International Corp (India).",
    technologies: ["Digital Marketing", "Canva", "CapCut", "Social Media", "Data Processing"],
    features: [
      "Visual branding and campaign creatives for international audiences",
      "Organized data entry and documentation pipelines",
      "Cross-timezone remote collaboration and project tracking",
      "Consistent brand aesthetic across social channels",
    ],
    liveUrl: "",
    githubUrl: "",
  },
  {
    slug: "wordpress-digital-portal",
    title: "WordPress Blog & Dynamic Fan Portal",
    category: "Web Development",
    image: project3,
    excerpt: "Custom responsive WordPress blog and multimedia hub with optimized performance.",
    description:
      "A fast, modern WordPress portal built from scratch to deliver rich multimedia content, blogs, and community features with excellent mobile performance and clean layout hierarchy.",
    technologies: ["WordPress", "PHP", "CSS3", "JavaScript", "SEO"],
    features: [
      "Custom responsive theme and typography",
      "Optimized multimedia loading and caching",
      "Clean user comment and engagement system",
      "Search-engine-optimized structure",
    ],
    liveUrl: "",
    githubUrl: "",
  },
];

export const projectCategories = ["All", "Design", "Web Development", "Applications", "Other"];

export type Post = (typeof posts)[number];

export const posts = [
  {
    slug: "tde-redesign-case-study",
    title: "Case Study: Redesigning the Société Togolaise des Eaux (TdE) Website",
    category: "Design",
    date: "2026-08-20",
    readTime: "7 min read",
    image: blog1,
    excerpt:
      "How I approached the UI/UX redesign of Togo's national water utility to make public utilities accessible, fast, and simple for citizens.",
    body: [
      "Public service websites have a responsibility: every citizen, regardless of tech literacy or device quality, should be able to find critical information within three clicks.",
      "During my UI/UX internship at Société Togolaise des Eaux (TdE), I analyzed user drop-off points on the existing site. The two most urgent citizen needs were bill inquiries and emergency service contacts.",
      "In Figma, I structured a clean, modern design system centered on accessibility, high contrast, and responsive cards. Citizens can now immediately access their bills and reports without complex navigation.",
      "Good design for public infrastructure isn't about decorative trends; it is about clarity, speed, and trust.",
    ],
  },
  {
    slug: "building-onomamarket-anti-scam",
    title: "Building Onomamarket: Engineering a Scam-Free Marketplace",
    category: "Web Development",
    date: "2026-07-15",
    readTime: "6 min read",
    image: onomaMarketplace,
    excerpt:
      "Why online marketplace fraud happens in West Africa and how Onomamarket's product architecture prevents scams by design.",
    body: [
      "Peer-to-peer commerce in West Africa is booming, but trust remains the biggest bottleneck. Informal sellers and fake listings drive buyers away from digital commerce.",
      "When designing Onomamarket, I focused on three pillars: verified seller identity, transparent product history, and structured messaging.",
      "The UI highlights seller credibility scores and makes reporting suspicious listings frictionless. The backend handles data securely without exposing personal contact details prematurely.",
      "By solving trust at the product design level, we make digital commerce accessible to thousands of honest entrepreneurs.",
    ],
  },
  {
    slug: "figma-to-code-workflow",
    title: "My Figma to Code Workflow as a Developer-Designer",
    category: "Design",
    date: "2026-06-10",
    readTime: "5 min read",
    image: blog3,
    excerpt:
      "How bridging the gap between Figma components and production code eliminates back-and-forth friction.",
    body: [
      "Being both the UI/UX designer and the developer gives you an unfair advantage: you never design something you don't know how to build efficiently.",
      "In Figma, every component is built with auto-layout that mirrors CSS flexbox and grid. Spacing tokens match Tailwind scale directly.",
      "When moving to code, there is zero guesswork. The layout transitions seamlessly from canvas to browser.",
    ],
  },
  {
    slug: "statistics-dashboards-reporting",
    title: "Designing Data Dashboards that Non-Technical Teams Love",
    category: "Programming",
    date: "2026-04-18",
    readTime: "6 min read",
    image: tdeStatsGenerator,
    excerpt:
      "Lessons from building the TdE statistics and report generator: converting raw numbers into actionable visual graphs.",
    body: [
      "A database full of metrics is useless if managers cannot extract insights at a glance.",
      "When building the statistics and report tool at TdE, the key feature was automated PDF summary report generation with custom chart views.",
      "Managers no longer need to spend hours compiling monthly spreadsheets—one click compiles the data, generates the graphs, and exports the report.",
    ],
  },
];

export const postCategories = [
  "All",
  "Design",
  "Web Development",
  "Programming",
  "Entrepreneurship",
];

export type DefaultTestimonial = {
  id: string;
  name: string;
  role: string;
  company?: string;
  phone?: string;
  rating: number;
  quote: string;
  avatar?: string;
  createdAt?: string;
};

export const testimonials: DefaultTestimonial[] = [
  {
    id: "testi-1",
    name: "Amivi Mensah",
    role: "Product Lead",
    company: "TechTogo Hub",
    phone: "+228 91 45 22 10",
    rating: 5,
    avatar: client1,
    quote:
      "Vianel delivered our UI/UX redesign on Figma ahead of schedule. The wireframes and responsive components were flawless and ready for developer handover!",
    createdAt: "Aug 28, 2026",
  },
  {
    id: "testi-2",
    name: "M. Guillaume GABA",
    role: "Head of Studies",
    company: "Lomé Business School (LBS)",
    phone: "+228 90 26 47 67",
    rating: 5,
    avatar: client2,
    quote:
      "An exceptionally disciplined and skilled student in Information Systems. Vianel demonstrates both leadership in the English Club and technical maturity in software architecture.",
    createdAt: "Aug 15, 2026",
  },
  {
    id: "testi-3",
    name: "Koffi Emmanuel",
    role: "Verified Seller & Entrepreneur",
    company: "ONOMA Marketplace",
    phone: "+228 93 11 84 55",
    rating: 5,
    avatar: client3,
    quote:
      "Onomamarket made selling electronics safe and hassle-free. The mobile interface is extremely fast and intuitive even on slower 3G connections.",
    createdAt: "Jul 22, 2026",
  },
  {
    id: "testi-4",
    name: "Fatima Al-Hassan",
    role: "Operations Manager",
    company: "Asiatic International Corp",
    phone: "+91 98 76 54 32 10",
    rating: 5,
    avatar: client4,
    quote:
      "Working with Vianel remotely across timezones was seamless. He produced brilliant digital marketing visuals and demonstrated high professionalism.",
    createdAt: "Jun 30, 2026",
  },
];

export const skillGroups = [
  {
    title: "Technical Skills & Design",
    items: ["Figma", "Canva", "SQL / Databases", "WordPress", "CMS", "JavaScript / TypeScript", "HTML5 & CSS3", "Data Analytics & Reporting", "Microsoft Office Suite"],
  },
  {
    title: "Project & Leadership",
    items: ["Project Management", "Team Leadership", "Event Logistics", "Community Coordination", "Bilingual Communication"],
  },
  {
    title: "Soft Skills",
    items: ["Autonomy", "Sense of Responsibility", "Communication", "Teamwork", "Responsiveness", "Analytical Thinking"],
  },
  {
    title: "Languages (Trilingual)",
    items: ["English (Native / Excellent)", "French (Native / Excellent)", "German (A1 / Beginner)"],
  },
  {
    title: "Interests",
    items: ["Music", "Swimming", "Reading", "Tech Innovations"],
  },
];
