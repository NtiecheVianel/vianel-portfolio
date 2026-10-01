import { useEffect, useState } from "react";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import tdeStatsGenerator from "@/assets/tde-statistics-generator.png";
import onomaMarketplace from "@/assets/onoma-marketplace.png";
import blog1 from "@/assets/blog-1.jpg";
import blog2 from "@/assets/blog-2.jpg";
import blog3 from "@/assets/blog-3.jpg";

export type Language = "en" | "fr" | "de";

export interface LanguageOption {
  code: Language;
  label: string;
  nativeLabel: string;
  flag: string;
  description: string;
}

export const languages: LanguageOption[] = [
  {
    code: "en",
    label: "English",
    nativeLabel: "English",
    flag: "🇬🇧",
    description: "Browse portfolio in English",
  },
  {
    code: "fr",
    label: "French",
    nativeLabel: "Français",
    flag: "🇫🇷",
    description: "Parcourir le portfolio en Français",
  },
  {
    code: "de",
    label: "German",
    nativeLabel: "Deutsch",
    flag: "🇩🇪",
    description: "Portfolio auf Deutsch ansehen",
  },
];

const STORAGE_LANG_KEY = "vianel_portfolio_language";
const LANG_EVENT_KEY = "vianel_language_changed";

export const translations = {
  en: {
    nav: {
      home: "Home",
      services: "Services",
      about: "About",
      projects: "Projects",
      blogs: "Blogs",
      testimonials: "Testimonials",
      contact: "Contact",
      contactMe: "Contact Me",
      chooseLanguage: "Change Language",
    },
    hero: {
      greeting: "Hello There!",
      name: "I'm Vianel TIAGUE N.",
      tagline: "UI/UX Designer & Web Developer based in Togo",
      quote: "Designing refined, user-centric interfaces and building lightning-fast web applications.",
      available: "Available for new projects",
      feedbackTitle: "Client Feedback",
      feedbackSub: "& Testimonials",
      leaveFeedback: "Share your review or read feedback →",
      portfolioBtn: "Portfolio",
      checkInBtn: "Check In",
      followMe: "Follow me on",
      tags: [
        { label: "UI/UX Design", tone: "red" as const },
        { label: "Web Developer", tone: "black" as const },
        { label: "Figma & Prototyping", tone: "red" as const },
        { label: "Software Engineer", tone: "black" as const },
        { label: "Tech Enthusiast", tone: "black" as const },
      ],
    },
    home: {
      stats: [
        { value: "UI/UX", label: "Figma & Prototyping Focus" },
        { value: "Full-Stack", label: "Web Apps & Analytics" },
        { value: "3", label: "Languages (FR, EN, DE)" },
        { value: "LBS", label: "Information Systems" },
      ],
      impactEyebrow: "Experience & Proven Track Record",
      impactTitle: "Where I have",
      impactHighlight: "delivered impact",
      viewResume: "Full Journey & Resume",
      servicesEyebrow: "What I do",
      servicesTitle: "Services built around",
      servicesHighlight: "your goals",
      allServices: "All services",
      learnMore: "Learn more",
      projectsEyebrow: "Selected work",
      projectsTitle: "Recent",
      projectsHighlight: "projects",
      allProjects: "All projects",
      testimonialsTitle: "What clients",
      testimonialsHighlight: "say",
      testimonialsDesc: "Direct feedback from clients, collaborators, and project partners. Leave your own review or read recent testimonials.",
      testimonialsBtn: "Read all testimonials",
      testimonialsLeaveBtn: "Leave a testimonial",
      workedTogether: "Have you worked with me?",
      workedTogetherDesc: "Share your experience on my testimonials page. Your review will appear live on the website immediately!",
      writeReview: "Write your review →",
      langSectionEyebrow: "Multilingual Experience",
      langSectionTitle: "Select your preferred",
      langSectionHighlight: "language",
      langSectionDesc: "This portfolio is natively available in English, French, and German. Select a language below or switch anytime from the navigation bar.",
      currentLanguageActive: "Currently Active",
      switchTo: "Switch to",
    },
    about: {
      metaTitle: "About & CV — Vianel TIAGUE NTIECHE",
      metaDesc: "About Vianel TIAGUE NTIECHE: UI/UX Designer & Web Developer based in Lomé, Togo. Experience at Société Togolaise des Eaux (TdE), ONOMA, and Lomé Business School.",
      eyebrow: "About me",
      title: "A designer who",
      titleHighlight: "codes",
      titleAnd: ", a developer who",
      titleDeliver: "delivers",
      blocks: [
        {
          title: "Who I am",
          text: "I'm Vianel TIAGUE NTIECHE, a dedicated UI/UX Designer and Web / Software Developer based in Lomé, Togo. I bridge the gap between human-centered design in Figma and robust web architecture.",
        },
        {
          title: "My background",
          text: "Bilingual 3rd-year Bachelor's student in Information Systems (Systèmes d'Information) at Lomé Business School (LBS), serving as President of the English Club, with a foundation from Rock Legacy International School (RLIS).",
        },
        {
          title: "What I do",
          text: "UI/UX design & prototyping, website redesigns (notably for Société Togolaise des Eaux - TdE), statistical analytics tools with automated report generation, e-commerce marketplace platforms (like ONOMA), and community tech leadership.",
        },
        {
          title: "My approach",
          text: "Understand the core problem first, build atomic design systems in Figma second, and ship clean, fast, mobile-friendly code third. Every feature must serve a real user need.",
        },
        {
          title: "My technical interests",
          text: "Figma design systems, interactive prototypes, performant web applications for African bandwidth, secure marketplace architecture, and automated statistical reporting.",
        },
        {
          title: "My career goals",
          text: "To lead impactful product design & engineering initiatives across Africa and globally, crafting secure digital tools that solve everyday problems without friction or scams.",
        },
      ],
      cvDownloadEyebrow: "Curriculum Vitae",
      cvDownloadTitle: "Download My",
      cvDownloadHighlight: "Official CV",
      cvDownloadSubtitle: "Get instant access to my verified CV in English and French in standard PDF format.",
      cvDownloadEnBtn: "Download English CV (PDF)",
      cvDownloadFrBtn: "Télécharger le CV en Français (PDF)",
      cvViewEnBtn: "Preview English CV",
      cvViewFrBtn: "Aperçu du CV en Français",
      journeyEyebrow: "Career Journey",
      journeyTitle: "Professional",
      journeyHighlight: "Experience",
      getInTouch: "Get in touch",
      volunteeringEyebrow: "Community & Leadership",
      volunteeringTitle: "Volunteering &",
      volunteeringHighlight: "Leadership",
      academicsEyebrow: "Academics & Formation",
      academicsTitle: "Education &",
      academicsHighlight: "Certifications",
      referencesEyebrow: "Recommendations",
      referencesTitle: "Academic",
      referencesHighlight: "Reference",
      skillsTitle: "Skills &",
      skillsHighlight: "expertise",
      ctaTitle: "Have a project or opportunity in",
      ctaHighlight: "mind?",
      ctaDesc: "Whether you need a full website redesign, UI/UX prototyping in Figma, a secure web app, or data reporting dashboards, let's talk.",
      ctaContact: "Contact Me",
      ctaProjects: "View All Projects",
    },
    servicesPage: {
      metaTitle: "Services — Vianel TIAGUE NTIECHE",
      metaDesc: "UI/UX Design, Website Redesign, Web & Full-Stack Development, Statistics & Reporting Dashboards by Vianel TIAGUE NTIECHE.",
      eyebrow: "My Services",
      title: "What I can",
      titleHighlight: "design and build for you",
      subtitle: "From a single landing page to a complete product interface, each service is delivered with my dedication to detail, speed, and clarity.",
      discuss: "Discuss this service",
      workflowTitle: "My collaboration",
      workflowHighlight: "process",
      steps: [
        { step: "01", title: "Discovery & Analysis", text: "I analyze your goals, target audience, timeline, and requirements to establish a clear project roadmap." },
        { step: "02", title: "Design & Prototyping", text: "I create wireframes and interactive Figma prototypes, validated with you before writing code." },
        { step: "03", title: "Development", text: "I build your solution through clean, fast iterations with regular live progress demos." },
        { step: "04", title: "Delivery & Support", text: "I deploy your solution, document the codebase, and provide ongoing support after launch." },
      ],
    },
    projectsPage: {
      metaTitle: "Projects — Vianel TIAGUE NTIECHE",
      metaDesc: "Selected UI/UX designs (TdE, Figma systems), marketplace web applications (Onomamarket), and statistics tools by Vianel TIAGUE NTIECHE.",
      eyebrow: "Projects",
      title: "Things I have",
      titleHighlight: "designed and built",
      subtitle: "Personal ventures, utility redesigns, and software solutions. Filter by category to explore the details.",
      viewProject: "View Project",
      github: "GitHub",
      noProjects: "No projects in this category yet — more are on the way.",
      allProjectsBack: "All projects",
      aboutProject: "About the project",
      keyFeatures: "Key features",
      technologies: "Technologies",
      visitProject: "Visit project",
      privateNotice: "Live link available on request — this project is private or internal.",
      startSimilar: "Start a similar project",
    },
    blogsPage: {
      metaTitle: "Blogs & Articles — Vianel TIAGUE NTIECHE",
      metaDesc: "Articles and case studies on UI/UX design, web development, Togo utility redesigns, and anti-scam platform architecture by Vianel TIAGUE NTIECHE.",
      eyebrow: "Articles & Insights",
      title: "Thoughts on design and",
      titleHighlight: "engineering",
      subtitle: "Case studies from real projects, design workflows in Figma, and engineering insights from Togo.",
    },
    testimonialsPage: {
      metaTitle: "Testimonials & Reviews — Vianel TIAGUE NTIECHE",
      metaDesc: "Read and submit feedback, reviews, and testimonials for Vianel TIAGUE NTIECHE on UI/UX design and web development projects.",
      eyebrow: "Feedback & Reviews",
      title: "Client and partner",
      titleHighlight: "testimonials",
      subtitle: "Read authentic reviews or leave your own feedback about working together on design and development projects.",
      formTitle: "Leave a Testimonial",
      formSubtitle: "Your review will appear immediately on the website",
      nameLabel: "Your Full Name *",
      namePlaceholder: "e.g. Samuel Lawson",
      roleLabel: "Your Role / Title *",
      rolePlaceholder: "e.g. Project Lead",
      companyLabel: "Company / Organization *",
      companyPlaceholder: "e.g. TdE / Tech Solutions",
      phoneLabel: "Phone Number (WhatsApp) *",
      phonePlaceholder: "e.g. +228 90 00 00 00",
      ratingLabel: "Rating *",
      quoteLabel: "Your Testimonial / Feedback *",
      quotePlaceholder: "Share your experience working with Vianel (communication, UI/UX quality, speed, deliverables)...",
      submitBtn: "Submit Testimonial",
      submittingBtn: "Publishing...",
      successToast: "Thank you! Your testimonial has been posted and is now live on the site.",
      errorToast: "Please fill in all required fields.",
      communityTitle: "Community",
      communityHighlight: "Reviews",
      noReviews: "No reviews published yet",
      liveFeedback: "Live Feedback",
      emptyTitle: "No Testimonials Yet",
      emptyDesc: "There are currently no reviews on this page. Be the first partner or client to share your experience by filling out the form on the left!",
      verifiedBadge: "Verified Client",
      contactCta: "Interested in working together? Get in touch",
    },
    contactPage: {
      metaTitle: "Contact — Vianel TIAGUE NTIECHE",
      metaDesc: "Contact Vianel TIAGUE NTIECHE for UI/UX design, web development, website redesigns, or consulting projects.",
      eyebrow: "Contact",
      title: "Let's build something",
      titleHighlight: "together",
      subtitle: "Have an upcoming project, redesign idea, or want to discuss design and development? Send me a message or reach out directly.",
      infoTitle: "Contact Information",
      infoSubtitle: "I'm open to freelance projects, internships, collaborations, and full-time opportunities.",
      emailLabel: "Email",
      phoneLabel: "Phone & WhatsApp",
      locationLabel: "Location",
      linktreeLabel: "Linktree Portfolio",
      socialsTitle: "Connect with me on social platforms",
      formTitle: "Send a Message",
      formSubtitle: "Fill out the form below and I'll get back to you within 24 hours.",
      nameLabel: "Your Name *",
      namePlaceholder: "e.g. John Doe",
      emailInputLabel: "Your Email *",
      emailInputPlaceholder: "e.g. john@example.com",
      subjectLabel: "Project or Subject",
      subjectPlaceholder: "e.g. Website Redesign / UI/UX Design",
      messageLabel: "Your Message *",
      messagePlaceholder: "Describe your goals, requirements, timeline, or questions...",
      sendBtn: "Send Message",
      sendingBtn: "Sending...",
      successToast: "Thank you! Your message has been sent successfully.",
      errorToast: "Please fill in all required fields.",
    },
    footer: {
      bio: "UI/UX Designer & Web Developer based in Togo, building fast, accessible, and carefully crafted digital products for people and businesses.",
      navTitle: "Navigation",
      contactTitle: "Contact",
      workTogether: "Let's work together",
      copyright: "© 2026 Vianel TIAGUE NTIECHE. All rights reserved.",
      langLabel: "Select Language / Langue / Sprache",
    },
  },
  fr: {
    nav: {
      home: "Accueil",
      services: "Services",
      about: "À propos",
      projects: "Projets",
      blogs: "Blog",
      testimonials: "Témoignages",
      contact: "Contact",
      contactMe: "Me Contacter",
      chooseLanguage: "Changer de langue",
    },
    hero: {
      greeting: "Bonjour !",
      name: "Je suis Vianel TIAGUE N.",
      tagline: "Designer UI/UX & Développeur Web basé au Togo",
      quote: "Conception d'interfaces soignées et centrées sur l'humain, développement d'applications web ultra-rapides.",
      available: "Disponible pour de nouveaux projets",
      feedbackTitle: "Avis Clients",
      feedbackSub: "& Témoignages",
      leaveFeedback: "Laisser un avis ou lire les retours →",
      portfolioBtn: "Portfolio",
      checkInBtn: "Me Contacter",
      followMe: "Suivez-moi sur",
      tags: [
        { label: "Design UI/UX", tone: "red" as const },
        { label: "Développeur Web", tone: "black" as const },
        { label: "Figma & Prototypage", tone: "red" as const },
        { label: "Génie Logiciel", tone: "black" as const },
        { label: "Passionné de Tech", tone: "black" as const },
      ],
    },
    home: {
      stats: [
        { value: "UI/UX", label: "Spécialiste Figma & Prototypage" },
        { value: "Full-Stack", label: "Applications Web & Graphiques" },
        { value: "3", label: "Langues (FR, EN, DE)" },
        { value: "LBS", label: "Systèmes d'Information" },
      ],
      impactEyebrow: "Expérience & Réalisations",
      impactTitle: "Là où j'ai apporté",
      impactHighlight: "un réel impact",
      viewResume: "Parcours complet & CV",
      servicesEyebrow: "Ce que je fais",
      servicesTitle: "Des services adaptés à",
      servicesHighlight: "vos objectifs",
      allServices: "Tous les services",
      learnMore: "En savoir plus",
      projectsEyebrow: "Travaux choisis",
      projectsTitle: "Projets",
      projectsHighlight: "récents",
      allProjects: "Tous les projets",
      testimonialsTitle: "Ce que disent",
      testimonialsHighlight: "les clients",
      testimonialsDesc: "Retours directs de clients, partenaires et collaborateurs. Laissez votre propre témoignage ou découvrez les avis récents.",
      testimonialsBtn: "Lire tous les témoignages",
      testimonialsLeaveBtn: "Laisser un témoignage",
      workedTogether: "Avez-vous collaboré avec moi ?",
      workedTogetherDesc: "Partagez votre expérience sur ma page de témoignages. Votre avis sera immédiatement visible sur le site !",
      writeReview: "Rédiger votre avis →",
      langSectionEyebrow: "Expérience Multilingue",
      langSectionTitle: "Choisissez votre",
      langSectionHighlight: "langue préférée",
      langSectionDesc: "Ce portfolio est disponible en Français, Anglais et Allemand. Sélectionnez une langue ci-dessous ou changez à tout moment via la barre de navigation.",
      currentLanguageActive: "Actuellement Actif",
      switchTo: "Passer en",
    },
    about: {
      metaTitle: "À propos & CV — Vianel TIAGUE NTIECHE",
      metaDesc: "À propos de Vianel TIAGUE NTIECHE : Designer UI/UX & Développeur Web basé à Lomé, Togo. Expériences à la Société Togolaise des Eaux (TdE), ONOMA, et Lomé Business School.",
      eyebrow: "À propos de moi",
      title: "Un designer qui",
      titleHighlight: "programme",
      titleAnd: ", un développeur qui",
      titleDeliver: "conçoit et livre",
      blocks: [
        {
          title: "Qui suis-je",
          text: "Je suis Vianel TIAGUE NTIECHE, Designer UI/UX et Développeur Web / Logiciel basé à Lomé, Togo. Je fais le pont entre le design centré sur l'utilisateur sur Figma et une architecture web performante.",
        },
        {
          title: "Mon parcours",
          text: "Étudiant bilingue en 3e année de Bachelor en Systèmes d'Information à Lomé Business School (LBS) et Président du Club d'Anglais, avec des bases solides acquises à Rock Legacy International School (RLIS).",
        },
        {
          title: "Ce que je fais",
          text: "Design UI/UX & prototypage, refonte de sites web (notamment pour la Société Togolaise des Eaux - TdE), applications d'analyse statistique et génération de rapports, plateformes e-commerce (comme ONOMA) et coordination d'initiatives tech.",
        },
        {
          title: "Mon approche",
          text: "Comprendre le problème d'abord, créer des systèmes de design atomiques sur Figma ensuite, et coder des interfaces rapides et adaptées aux mobiles. Chaque fonctionnalité doit répondre à un besoin réel.",
        },
        {
          title: "Mes intérêts techniques",
          text: "Design systems sur Figma, prototypes interactifs, applications web optimisées pour les réseaux africains, sécurité e-commerce anti-fraude et génération automatisée de rapports statistiques.",
        },
        {
          title: "Mes objectifs",
          text: "Diriger des projets technologiques et de design à fort impact en Afrique et à l'international, créant des outils digitaux fiables et accessibles sans arnaques ni frictions.",
        },
      ],
      cvDownloadEyebrow: "Curriculum Vitae",
      cvDownloadTitle: "Télécharger mon",
      cvDownloadHighlight: "CV Officiel",
      cvDownloadSubtitle: "Accédez et téléchargez instantanément mon CV complet en versions Française et Anglaise au format PDF.",
      cvDownloadEnBtn: "Télécharger le CV en Anglais (PDF)",
      cvDownloadFrBtn: "Télécharger le CV en Français (PDF)",
      cvViewEnBtn: "Aperçu du CV en Anglais",
      cvViewFrBtn: "Aperçu du CV en Français",
      journeyEyebrow: "Parcours Professionnel",
      journeyTitle: "Expériences",
      journeyHighlight: "Professionnelles",
      getInTouch: "Prendre contact",
      volunteeringEyebrow: "Communauté & Leadership",
      volunteeringTitle: "Bénévolat &",
      volunteeringHighlight: "Leadership",
      academicsEyebrow: "Formation & Diplômes",
      academicsTitle: "Études &",
      academicsHighlight: "Certifications",
      referencesEyebrow: "Recommandations",
      referencesTitle: "Référence",
      referencesHighlight: "Académique",
      skillsTitle: "Compétences &",
      skillsHighlight: "expertise",
      ctaTitle: "Vous avez un projet ou une opportunité en",
      ctaHighlight: "tête ?",
      ctaDesc: "Qu'il s'agisse d'une refonte complète de site web, d'un prototype Figma, d'une application web sécurisée ou d'un outil de statistiques, discutons-en.",
      ctaContact: "Me Contacter",
      ctaProjects: "Voir tous les projets",
    },
    servicesPage: {
      metaTitle: "Services — Vianel TIAGUE NTIECHE",
      metaDesc: "Design UI/UX, Refonte de sites web, Développement Web & Full-Stack, Outils de Statistiques et Rapports par Vianel TIAGUE NTIECHE.",
      eyebrow: "Mes Services",
      title: "Ce que je peux",
      titleHighlight: "concevoir et réaliser pour vous",
      subtitle: "D'une simple page de présentation à une plateforme complète, chaque projet bénéficie de mon exigence du détail, de rapidité et de clarté.",
      discuss: "Discuter de ce service",
      workflowTitle: "Ma méthode de",
      workflowHighlight: "collaboration",
      steps: [
        { step: "01", title: "Échange & Analyse", text: "J'analyse vos objectifs, vos utilisateurs cibles, vos délais et votre budget pour définir une feuille de route claire." },
        { step: "02", title: "Design & Prototypage", text: "Je conçois les wireframes puis les maquettes interactives sur Figma, validées avec vous avant le code." },
        { step: "03", title: "Développement", text: "Je développe votre solution en itérations soignées et modulaires avec des prévisualisations régulières." },
        { step: "04", title: "Livraison & Suivi", text: "Je déploie votre solution, documente le code et assure un accompagnement continu après le lancement." },
      ],
    },
    projectsPage: {
      metaTitle: "Projets — Vianel TIAGUE NTIECHE",
      metaDesc: "Projets de design UI/UX (TdE, Figma), applications marketplace (Onomamarket) et outils statistiques par Vianel TIAGUE NTIECHE.",
      eyebrow: "Projets",
      title: "Ce que j'ai",
      titleHighlight: "conçu et développé",
      subtitle: "Projets personnels, refontes d'institutions et solutions logicielles. Filtrez par catégorie pour voir les détails.",
      viewProject: "Voir le projet",
      github: "GitHub",
      noProjects: "Aucun projet dans cette catégorie pour le moment — d'autres arrivent bientôt.",
      allProjectsBack: "Tous les projets",
      aboutProject: "À propos du projet",
      keyFeatures: "Fonctionnalités clés",
      technologies: "Technologies",
      visitProject: "Visiter le projet",
      privateNotice: "Lien de démonstration disponible sur demande — projet privé ou interne.",
      startSimilar: "Lancer un projet similaire",
    },
    blogsPage: {
      metaTitle: "Articles & Blog — Vianel TIAGUE NTIECHE",
      metaDesc: "Articles et études de cas sur le design UI/UX, le développement web, les refontes et l'architecture anti-arnaque par Vianel TIAGUE NTIECHE.",
      eyebrow: "Articles & Analyses",
      title: "Réflexions sur le design et",
      titleHighlight: "le développement",
      subtitle: "Études de cas réelles, méthodologies de conception sur Figma et retours d'expérience depuis le Togo.",
    },
    testimonialsPage: {
      metaTitle: "Témoignages & Avis — Vianel TIAGUE NTIECHE",
      metaDesc: "Lisez et publiez des avis et retours d'expérience sur les collaborations avec Vianel TIAGUE NTIECHE.",
      eyebrow: "Retours & Avis",
      title: "Témoignages de clients et",
      titleHighlight: "partenaires",
      subtitle: "Consultez les avis authentiques ou partagez votre propre retour sur mes projets en design et développement.",
      formTitle: "Laisser un Témoignage",
      formSubtitle: "Votre avis apparaîtra immédiatement sur le site web",
      nameLabel: "Votre Nom Complet *",
      namePlaceholder: "ex. Samuel Lawson",
      roleLabel: "Votre Fonction / Rôle *",
      rolePlaceholder: "ex. Chef de Projet",
      companyLabel: "Entreprise / Organisation *",
      companyPlaceholder: "ex. TdE / Tech Solutions",
      phoneLabel: "Numéro de Téléphone (WhatsApp) *",
      phonePlaceholder: "ex. +228 90 00 00 00",
      ratingLabel: "Note d'évaluation *",
      quoteLabel: "Votre Témoignage / Avis *",
      quotePlaceholder: "Partagez votre retour d'expérience avec Vianel (communication, qualité du design UI/UX, rapidité, respect des délais)...",
      submitBtn: "Publier le Témoignage",
      submittingBtn: "Publication en cours...",
      successToast: "Merci ! Votre témoignage a été publié et est désormais visible en ligne.",
      errorToast: "Veuillez remplir tous les champs obligatoires.",
      communityTitle: "Avis de la",
      communityHighlight: "Communauté",
      noReviews: "Aucun avis publié pour le moment",
      liveFeedback: "Retours en direct",
      emptyTitle: "Aucun Témoignage pour l'instant",
      emptyDesc: "Il n'y a actuellement aucun avis sur cette page. Soyez le premier client ou partenaire à partager votre expérience en remplissant le formulaire à gauche !",
      verifiedBadge: "Client Vérifié",
      contactCta: "Envie de collaborer ? Contactez-moi",
    },
    contactPage: {
      metaTitle: "Contact — Vianel TIAGUE NTIECHE",
      metaDesc: "Contactez Vianel TIAGUE NTIECHE pour vos projets de design UI/UX, développement web, refonte de site ou conseil.",
      eyebrow: "Contact",
      title: "Construisons votre projet",
      titleHighlight: "ensemble",
      subtitle: "Vous avez un projet, une idée de refonte ou souhaitez discuter design et développement ? Envoyez-moi un message ou contactez-moi directement.",
      infoTitle: "Coordonnées",
      infoSubtitle: "Disponible pour des missions freelance, stages, collaborations et opportunités professionnelles.",
      emailLabel: "Email",
      phoneLabel: "Téléphone & WhatsApp",
      locationLabel: "Localisation",
      linktreeLabel: "Portfolio Linktree",
      socialsTitle: "Retrouvez-moi sur les réseaux sociaux",
      formTitle: "Envoyer un Message",
      formSubtitle: "Remplissez le formulaire ci-dessous et je vous répondrai sous 24 heures.",
      nameLabel: "Votre Nom *",
      namePlaceholder: "ex. Jean Dupont",
      emailInputLabel: "Votre Email *",
      emailInputPlaceholder: "ex. jean@example.com",
      subjectLabel: "Projet ou Sujet",
      subjectPlaceholder: "ex. Refonte de site web / Design UI/UX",
      messageLabel: "Votre Message *",
      messagePlaceholder: "Décrivez vos besoins, vos objectifs, les délais ou vos questions...",
      sendBtn: "Envoyer le Message",
      sendingBtn: "Envoi en cours...",
      successToast: "Merci ! Votre message a été envoyé avec succès.",
      errorToast: "Veuillez remplir tous les champs obligatoires.",
    },
    footer: {
      bio: "Designer UI/UX & Développeur Web basé au Togo, créant des produits digitaux rapides, accessibles et soigneusement conçus.",
      navTitle: "Navigation",
      contactTitle: "Contact",
      workTogether: "Travaillons ensemble",
      copyright: "© 2026 Vianel TIAGUE NTIECHE. Tous droits réservés.",
      langLabel: "Sélectionner la langue / Language / Sprache",
    },
  },
  de: {
    nav: {
      home: "Startseite",
      services: "Dienstleistungen",
      about: "Über mich",
      projects: "Projekte",
      blogs: "Blog",
      testimonials: "Referenzen",
      contact: "Kontakt",
      contactMe: "Kontaktieren",
      chooseLanguage: "Sprache ändern",
    },
    hero: {
      greeting: "Hallo !",
      name: "Ich bin Vianel TIAGUE N.",
      tagline: "UI/UX Designer & Webentwickler aus Togo",
      quote: "Gestaltung durchdachter, nutzerzentrierter Schnittstellen und Entwicklung blitzschneller Webanwendungen.",
      available: "Verfügbar für neue Projekte",
      feedbackTitle: "Kundenfeedback",
      feedbackSub: "& Referenzen",
      leaveFeedback: "Bewertung abgeben oder Feedback lesen →",
      portfolioBtn: "Portfolio",
      checkInBtn: "Kontaktieren",
      followMe: "Folgen Sie mir auf",
      tags: [
        { label: "UI/UX Design", tone: "red" as const },
        { label: "Webentwickler", tone: "black" as const },
        { label: "Figma & Prototyping", tone: "red" as const },
        { label: "Softwareentwickler", tone: "black" as const },
        { label: "Technikbegeistert", tone: "black" as const },
      ],
    },
    home: {
      stats: [
        { value: "UI/UX", label: "Figma & Prototyping Fokus" },
        { value: "Full-Stack", label: "Web-Apps & Analytics" },
        { value: "3", label: "Sprachen (FR, EN, DE)" },
        { value: "LBS", label: "Wirtschaftsinformatik" },
      ],
      impactEyebrow: "Erfahrung & Erfolge",
      impactTitle: "Wo ich messbare",
      impactHighlight: "Erfolge erzielt habe",
      viewResume: "Kompletter Lebenslauf",
      servicesEyebrow: "Meine Leistungen",
      servicesTitle: "Services abgestimmt auf",
      servicesHighlight: "Ihre Ziele",
      allServices: "Alle Leistungen",
      learnMore: "Mehr erfahren",
      projectsEyebrow: "Ausgewählte Arbeiten",
      projectsTitle: "Aktuelle",
      projectsHighlight: "Projekte",
      allProjects: "Alle Projekte",
      testimonialsTitle: "Was Kunden",
      testimonialsHighlight: "sagen",
      testimonialsDesc: "Direktes Feedback von Kunden und Kooperationspartnern. Hinterlassen Sie Ihre eigene Bewertung oder lesen Sie Rezensionen.",
      testimonialsBtn: "Alle Referenzen lesen",
      testimonialsLeaveBtn: "Referenz verfassen",
      workedTogether: "Haben Sie mit mir zusammengearbeitet?",
      workedTogetherDesc: "Teilen Sie Ihre Erfahrungen auf meiner Referenzseite. Ihre Bewertung wird sofort live auf der Website angezeigt!",
      writeReview: "Bewertung schreiben →",
      langSectionEyebrow: "Mehrsprachige Erfahrung",
      langSectionTitle: "Wählen Sie Ihre",
      langSectionHighlight: "bevorzugte Sprache",
      langSectionDesc: "Dieses Portfolio steht auf Deutsch, Englisch und Französisch zur Verfügung. Wählen Sie unten Ihre Sprache oder wechseln Sie jederzeit in der Navigation.",
      currentLanguageActive: "Derzeit aktiv",
      switchTo: "Wechseln zu",
    },
    about: {
      metaTitle: "Über mich & Lebenslauf — Vianel TIAGUE NTIECHE",
      metaDesc: "Über Vianel TIAGUE NTIECHE: UI/UX Designer & Webentwickler aus Lomé, Togo. Erfahrung bei Société Togolaise des Eaux (TdE), ONOMA und Lomé Business School.",
      eyebrow: "Über mich",
      title: "Ein Designer, der",
      titleHighlight: "programmiert",
      titleAnd: ", ein Entwickler, der",
      titleDeliver: "Ergebnisse liefert",
      blocks: [
        {
          title: "Wer ich bin",
          text: "Ich bin Vianel TIAGUE NTIECHE, UI/UX Designer und Web-/Softwareentwickler aus Lomé, Togo. Ich verbinde nutzerzentriertes Design in Figma mit robuster Webarchitektur.",
        },
        {
          title: "Mein Hintergrund",
          text: "Zweisprachiger Bachelor-Student im 3. Studienjahr für Wirtschaftsinformatik (Information Systems) an der Lomé Business School (LBS) und Präsident des Englisch-Clubs, mit Grundlagen der Rock Legacy International School (RLIS).",
        },
        {
          title: "Was ich mache",
          text: "UI/UX-Design & Prototyping, Website-Relaunches (wie für die Société Togolaise des Eaux - TdE), statistische Analyse-Tools mit Berichtsgenerierung, E-Commerce-Plattformen (wie ONOMA) und Leitung von Tech-Initiativen.",
        },
        {
          title: "Mein Ansatz",
          text: "Das Kernproblem verstehen, Design-Systeme in Figma aufbauen und sauberen, schnellen Code für mobile Endgeräte schreiben. Jedes Feature muss echten Nutzen stiften.",
        },
        {
          title: "Technische Interessen",
          text: "Figma Design-Systeme, interaktive Prototypen, performante Webanwendungen für afrikanische Netze, betrugssichere Marktplätze und automatisierte statistische Berichte.",
        },
        {
          title: "Meine Karriereziele",
          text: "Einflussreiche digitale Produkte und Designprojekte in Afrika und weltweit voranzutreiben und betrugssichere, reibungslose Tools zu schaffen.",
        },
      ],
      cvDownloadEyebrow: "Curriculum Vitae",
      cvDownloadTitle: "Lebenslauf",
      cvDownloadHighlight: "Herunterladen",
      cvDownloadSubtitle: "Erhalten Sie sofortigen Zugriff auf meinen offiziellen Lebenslauf auf Englisch und Französisch im PDF-Format.",
      cvDownloadEnBtn: "Lebenslauf auf Englisch herunterladen (PDF)",
      cvDownloadFrBtn: "Lebenslauf auf Französisch herunterladen (PDF)",
      cvViewEnBtn: "Vorschau Lebenslauf Englisch",
      cvViewFrBtn: "Vorschau Lebenslauf Französisch",
      journeyEyebrow: "Beruflicher Werdegang",
      journeyTitle: "Berufliche",
      journeyHighlight: "Erfahrung",
      getInTouch: "Kontakt aufnehmen",
      volunteeringEyebrow: "Engagement & Community",
      volunteeringTitle: "Freiwilligenarbeit &",
      volunteeringHighlight: "Leadership",
      academicsEyebrow: "Ausbildung & Abschluss",
      academicsTitle: "Ausbildung &",
      academicsHighlight: "Zertifikate",
      referencesEyebrow: "Empfehlungen",
      referencesTitle: "Akademische",
      referencesHighlight: "Referenz",
      skillsTitle: "Fähigkeiten &",
      skillsHighlight: "Expertise",
      ctaTitle: "Haben Sie ein Projekt oder eine",
      ctaHighlight: "Idee?",
      ctaDesc: "Ob Website-Relaunch, Figma UI/UX-Prototyp, sichere Webanwendung oder Daten-Dashboard – lassen Sie uns sprechen.",
      ctaContact: "Kontaktieren",
      ctaProjects: "Alle Projekte ansehen",
    },
    servicesPage: {
      metaTitle: "Dienstleistungen — Vianel TIAGUE NTIECHE",
      metaDesc: "UI/UX Design, Website-Relaunch, Web- & Softwareentwicklung, Statistik- und Reporting-Tools von Vianel TIAGUE NTIECHE.",
      eyebrow: "Meine Leistungen",
      title: "Was ich für Sie",
      titleHighlight: "gestalten und entwickeln kann",
      subtitle: "Von einer Landingpage bis zur vollständigen Plattform – jedes Projekt wird mit meiner Hingabe zum Detail, Schnelligkeit und Klarheit umgesetzt.",
      discuss: "Diesen Service anfragen",
      workflowTitle: "Meine Zusammenarbeits-",
      workflowHighlight: "methode",
      steps: [
        { step: "01", title: "Gespräch & Analyse", text: "Ich analysiere Ihre Ziele, Zielgruppen, Zeitrahmen und Anforderungen im Detail." },
        { step: "02", title: "Design & Prototyping", text: "Ich erstelle Wireframes und interaktive Figma-Designs, abgestimmt vor der Entwicklung." },
        { step: "03", title: "Entwicklung", text: "Ich entwickle Ihre Anwendung in sauberen Iterationen mit regelmäßigen Live-Vorschauen." },
        { step: "04", title: "Übergabe & Support", text: "Ich übergebe den vollständigen Code samt Dokumentation und biete kontinuierliche Unterstützung." },
      ],
    },
    projectsPage: {
      metaTitle: "Projekte — Vianel TIAGUE NTIECHE",
      metaDesc: "Ausgewählte UI/UX Designs (TdE, Figma), Marktplatz-Webanwendungen (Onomamarket) und Statistik-Tools von Vianel TIAGUE NTIECHE.",
      eyebrow: "Projekte",
      title: "Was ich",
      titleHighlight: "entworfen und gebaut habe",
      subtitle: "Eigene Projekte, institutionelle Relaunches und Softwarelösungen. Filtern Sie nach Kategorie.",
      viewProject: "Projekt ansehen",
      github: "GitHub",
      noProjects: "Derzeit keine Projekte in dieser Kategorie vorhanden.",
      allProjectsBack: "Alle Projekte",
      aboutProject: "Über das Projekt",
      keyFeatures: "Hauptfunktionen",
      technologies: "Technologien",
      visitProject: "Projekt öffnen",
      privateNotice: "Live-Link auf Anfrage verfügbar – dieses Projekt ist privat oder intern.",
      startSimilar: "Ähnliches Projekt starten",
    },
    blogsPage: {
      metaTitle: "Blog & Artikel — Vianel TIAGUE NTIECHE",
      metaDesc: "Artikel und Fallstudien zu UI/UX Design, Webentwicklung und sicherer Marktplatzarchitektur von Vianel TIAGUE NTIECHE.",
      eyebrow: "Artikel & Einblicke",
      title: "Gedanken zu Design und",
      titleHighlight: "Entwicklung",
      subtitle: "Fallstudien aus echten Projekten, Figma-Workflows und technische Einblicke aus Togo.",
    },
    testimonialsPage: {
      metaTitle: "Referenzen & Bewertungen — Vianel TIAGUE NTIECHE",
      metaDesc: "Bewertungen und Feedback über die Zusammenarbeit mit Vianel TIAGUE NTIECHE lesen und verfassen.",
      eyebrow: "Feedback & Referenzen",
      title: "Kunden- und Partner-",
      titleHighlight: "referenzen",
      subtitle: "Lesen Sie authentische Bewertungen oder hinterlassen Sie Ihr persönliches Feedback zur Zusammenarbeit mit mir.",
      formTitle: "Referenz verfassen",
      formSubtitle: "Ihre Bewertung wird sofort live auf der Website veröffentlicht",
      nameLabel: "Vollständiger Name *",
      namePlaceholder: "z.B. Samuel Lawson",
      roleLabel: "Ihre Position / Rolle *",
      rolePlaceholder: "z.B. Projektleiter",
      companyLabel: "Unternehmen / Organisation *",
      companyPlaceholder: "z.B. TdE / Tech Solutions",
      phoneLabel: "Telefonnummer (WhatsApp) *",
      phonePlaceholder: "z.B. +228 90 00 00 00",
      ratingLabel: "Bewertung *",
      quoteLabel: "Ihre Bewertung / Feedback *",
      quotePlaceholder: "Teilen Sie Ihre Erfahrungen mit Vianel (Kommunikation, UI/UX-Qualität, Schnelligkeit, Zuverlässigkeit)...",
      submitBtn: "Referenz veröffentlichen",
      submittingBtn: "Wird veröffentlicht...",
      successToast: "Vielen Dank! Ihre Referenz wurde veröffentlicht und ist jetzt live.",
      errorToast: "Bitte füllen Sie alle erforderlichen Felder aus.",
      communityTitle: "Kunden-",
      communityHighlight: "Bewertungen",
      noReviews: "Noch keine Bewertungen vorhanden",
      liveFeedback: "Live-Feedback",
      emptyTitle: "Noch keine Referenzen vorhanden",
      emptyDesc: "Auf dieser Seite gibt es derzeit noch keine Bewertungen. Seien Sie der erste Kunde oder Partner und füllen Sie das Formular links aus!",
      verifiedBadge: "Verifizierter Kunde",
      contactCta: "Interesse an einer Zusammenarbeit? Jetzt kontaktieren",
    },
    contactPage: {
      metaTitle: "Kontakt — Vianel TIAGUE NTIECHE",
      metaDesc: "Kontaktieren Sie Vianel TIAGUE NTIECHE für UI/UX Design, Webentwicklung, Website-Relaunches oder Beratungen.",
      eyebrow: "Kontakt",
      title: "Lassen Sie uns etwas",
      titleHighlight: "zusammen bauen",
      subtitle: "Haben Sie ein bevorstehendes Projekt oder möchten Sie über Design & Entwicklung sprechen? Schreiben Sie mir direkt.",
      infoTitle: "Kontaktdaten",
      infoSubtitle: "Offen für Freelance-Projekte, Praktika, Partnerschaften und Festanstellungen.",
      emailLabel: "E-Mail",
      phoneLabel: "Telefon & WhatsApp",
      locationLabel: "Standort",
      linktreeLabel: "Linktree Portfolio",
      socialsTitle: "Vernetzen Sie sich mit mir",
      formTitle: "Nachricht senden",
      formSubtitle: "Füllen Sie das Formular aus – ich antworte innerhalb von 24 Stunden.",
      nameLabel: "Ihr Name *",
      namePlaceholder: "z.B. Max Mustermann",
      emailInputLabel: "Ihre E-Mail *",
      emailInputPlaceholder: "z.B. max@example.com",
      subjectLabel: "Projekt oder Betreff",
      subjectPlaceholder: "z.B. Website-Relaunch / UI/UX Design",
      messageLabel: "Ihre Nachricht *",
      messagePlaceholder: "Beschreiben Sie Ihre Ziele, Anforderungen, Zeitplan oder Fragen...",
      sendBtn: "Nachricht senden",
      sendingBtn: "Wird gesendet...",
      successToast: "Vielen Dank! Ihre Nachricht wurde erfolgreich gesendet.",
      errorToast: "Bitte füllen Sie alle Pflichtfelder aus.",
    },
    footer: {
      bio: "UI/UX Designer & Webentwickler aus Togo – erstellt schnelle, barrierefreie und sorgfältig gestaltete digitale Produkte.",
      navTitle: "Navigation",
      contactTitle: "Kontakt",
      workTogether: "Zusammenarbeiten",
      copyright: "© 2026 Vianel TIAGUE NTIECHE. Alle Rechte vorbehalten.",
      langLabel: "Sprache auswählen / Select Language / Choisir la langue",
    },
  },
};

export function getStoredLanguage(): Language {
  if (typeof window === "undefined") return "en";
  try {
    const saved = localStorage.getItem(STORAGE_LANG_KEY) as Language | null;
    if (saved && (saved === "en" || saved === "fr" || saved === "de")) {
      return saved;
    }
  } catch {
    // ignore
  }
  return "en";
}

export function setStoredLanguage(lang: Language) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_LANG_KEY, lang);
    window.dispatchEvent(new Event(LANG_EVENT_KEY));
  } catch {
    // ignore
  }
}

export function useLanguage() {
  const [currentLang, setCurrentLang] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setCurrentLang(getStoredLanguage());

    const handleChange = () => {
      setCurrentLang(getStoredLanguage());
    };

    window.addEventListener(LANG_EVENT_KEY, handleChange);
    window.addEventListener("storage", handleChange);

    return () => {
      window.removeEventListener(LANG_EVENT_KEY, handleChange);
      window.removeEventListener("storage", handleChange);
    };
  }, []);

  const changeLanguage = (lang: Language) => {
    setCurrentLang(lang);
    setStoredLanguage(lang);
  };

  const t = translations[currentLang] || translations.en;

  return {
    language: currentLang,
    setLanguage: changeLanguage,
    t,
    isMounted: mounted,
  };
}

export function getLocalizedExperiences(lang: Language) {
  if (lang === "fr") {
    return [
      {
        id: "tde-intern",
        company: "Société Togolaise des Eaux (TdE)",
        role: "Designer UI/UX & Développeur Web (Stage Académique)",
        period: "07/2026 – 09/2026",
        location: "Lomé, Togo",
        type: "Stage Académique",
        description:
          "Conception de la nouvelle interface du site officiel de la TdE avec Figma, amélioration de l'expérience utilisateur et développement d'une application d'analyse de données avec génération automatique de rapports statistiques.",
        highlights: [
          "Conception de la nouvelle interface du site officiel de la TdE avec Figma et amélioration de l'expérience utilisateur et de l'ergonomie.",
          "Développement d'une application pour analyser les données et générer des graphiques et génération automatique de rapports statistiques.",
          "Conception de parcours utilisateurs fluides et ergonomie responsive pour mobile, tablette et ordinateur.",
          "Création de design system et validation de prototypes interactifs.",
        ],
        technologies: ["Figma", "UI/UX", "SQL", "JavaScript", "HTML/CSS", "Visualisation de Données & Rapports"],
      },
      {
        id: "onomamarket",
        company: "ONOMA",
        role: "Fondateur & Développeur Web",
        period: "01/2026 – Présent",
        location: "Lomé, Togo",
        type: "Projet Entrepreneurial",
        description:
          "Conception et développement d'une plateforme marketplace avec mise en place des fonctionnalités destinées aux acheteurs et vendeurs.",
        highlights: [
          "Conception de l'architecture utilisateur et prototypage haute fidélité sur Figma.",
          "Développement full-stack de la plateforme marketplace avec espace acheteurs et vendeurs vérifiés.",
          "Optimisation pour les vitesses de connexion mobiles et protection contre la fraude.",
        ],
        technologies: ["Figma", "UI/UX", "JavaScript", "SQL", "Développement Web", "Design Responsive"],
      },
      {
        id: "wordpress-dev",
        company: "Projet Personnel",
        role: "Développeur WordPress",
        period: "10/2024 – 12/2024",
        location: "Lomé, Togo",
        type: "Projet Personnel",
        description:
          "Conception et gestion d'un blog et d'une fan page avec WordPress. Intégration de contenus multimédias (textes, images) et amélioration de l'interface utilisateur.",
        highlights: [
          "Conception et gestion d'un blog et d'une fan page avec WordPress.",
          "Intégration de contenus multimédias (textes et images) et optimisation de l'interface utilisateur.",
          "Administration du site web, structuration SEO et gestion CMS.",
        ],
        technologies: ["WordPress", "CMS", "PHP", "CSS", "Administration de Sites Web"],
      },
    ];
  }

  if (lang === "de") {
    return [
      {
        id: "tde-intern",
        company: "Société Togolaise des Eaux (TdE)",
        role: "UI/UX Designer & Webentwickler (Praktikum)",
        period: "07/2026 – 09/2026",
        location: "Lomé, Togo",
        type: "Akademisches Praktikum",
        description:
          "Neugestaltung der offiziellen TdE-Website mit Figma zur Verbesserung der Benutzerfreundlichkeit und Entwicklung einer statistischen Analyseanwendung mit automatischer Berichterstellung.",
        highlights: [
          "Neugestaltung der Benutzeroberfläche der offiziellen TdE-Website auf Figma zur Optimierung von Barrierefreiheit und Usability.",
          "Entwicklung einer Webanwendung zur Datenanalyse, Diagrammerstellung und automatischen Erstellung statistischer Berichte.",
          "Entwicklung intuitiver User Flows und responsiver Layouts für alle Bildschirmgrößen.",
        ],
        technologies: ["Figma", "UI/UX Design", "SQL", "JavaScript", "HTML/CSS", "Datenvisualisierung & Reporting"],
      },
      {
        id: "onomamarket",
        company: "ONOMA",
        role: "Gründer & Webentwickler",
        period: "01/2026 – Heute",
        location: "Lomé, Togo",
        type: "Unternehmerisches Projekt",
        description:
          "Konzeption und Entwicklung einer zuverlässigen E-Commerce-Marktplatz-Plattform mit Funktionen für Käufer und Verkäufer.",
        highlights: [
          "Vollständiges Interface-Design in Figma und Full-Stack-Webentwicklung.",
          "Verifizierte Verkäuferprofile, Produktsuche und Schutz vor Online-Betrug.",
          "Optimiert für schnelle Ladezeiten auf mobilen Geräten.",
        ],
        technologies: ["Figma", "UI/UX", "JavaScript", "SQL", "Webentwicklung", "Responsive Design"],
      },
      {
        id: "wordpress-dev",
        company: "Eigenes Projekt",
        role: "WordPress-Entwickler",
        period: "10/2024 – 12/2024",
        location: "Lomé, Togo",
        type: "Eigenes Projekt",
        description:
          "Design und Verwaltung eines Blogs und einer Fan-Seite mit WordPress, Integration von Multimedia-Inhalten und Optimierung der Benutzeroberfläche.",
        highlights: [
          "Erstellung responsiver Layouts und intuitive Inhaltsverwaltung über WordPress CMS.",
          "Integration von Bild- und Textmedien mit verbesserter Ladegeschwindigkeit.",
          "SEO-Strukturierung und Administration.",
        ],
        technologies: ["WordPress", "CMS", "PHP", "CSS", "Website-Administration"],
      },
    ];
  }

  // English default
  return [
    {
      id: "tde-intern",
      company: "Togolese Water Company (TdE)",
      role: "UI/UX Designer & Web Developer (Academic Internship)",
      period: "07/2026 – 09/2026",
      location: "Lomé, Togo",
      type: "Academic Internship",
      description:
        "Designed the new interface for the official TdE website using Figma, improving user experience and overall usability. Developed a statistical analysis application to process data, generate visualizations and automatically produce statistical reports.",
      highlights: [
        "Designed the new interface for the official TdE website using Figma, improving user experience and overall usability.",
        "Developed a statistical analysis application to process data, generate visualizations and automatically produce statistical reports.",
        "Created streamlined responsive user flows across mobile, tablet, and desktop viewports.",
        "Engineered instant automated PDF and chart export capabilities for operational metrics.",
      ],
      technologies: ["Figma", "UI/UX Design", "SQL", "JavaScript", "HTML/CSS", "Data Analytics & Reporting"],
    },
    {
      id: "onomamarket",
      company: "ONOMA",
      role: "Founder & Web Developer",
      period: "01/2026 – Present",
      location: "Lomé, Togo",
      type: "Entrepreneurial Venture",
      description:
        "Designed and developed the platform. Implemented features for both buyers and sellers.",
      highlights: [
        "Designed the comprehensive UI/UX interactive prototype in Figma.",
        "Developed full-stack e-commerce marketplace workflows connecting verified buyers and sellers.",
        "Built responsive mobile-first views engineered for African network reliability.",
      ],
      technologies: ["Figma", "UI/UX", "JavaScript", "SQL", "Web Development", "Responsive Design"],
    },
    {
      id: "wordpress-dev",
      company: "Personal Project",
      role: "WordPress Developer",
      period: "10/2024 – 12/2024",
      location: "Lomé, Togo",
      type: "Personal Project",
      description:
        "Designed and managed a blog and fan page using WordPress. Integrated multimedia content, including text and images, and improved the user interface.",
      highlights: [
        "Designed and managed a dedicated blog and fan page using WordPress.",
        "Integrated multimedia content, including rich text and high-res imagery, with streamlined UI.",
        "Handled CMS setup, SEO optimization, and website administration.",
      ],
      technologies: ["WordPress", "CMS", "PHP", "CSS", "Website Administration"],
    },
  ];
}

export function getLocalizedVolunteering(lang: Language) {
  if (lang === "fr") {
    return [
      {
        id: "tcc-co-lead",
        organization: "Tech Campus Club (TCC)",
        role: "Co-Lead TCC",
        period: "12/2025 – 06/2026",
        location: "Lomé, Togo",
        description: "Coordination des activités de la communauté, organisation d'ateliers et gestion d'une équipe de bénévoles.",
        highlights: [
          "Coordination des activités de la communauté tech étudiante.",
          "Organisation d'ateliers, de formations pratiques et d'événements universitaires.",
          "Gestion d'une équipe de bénévoles et répartition efficace des tâches.",
        ],
      },
      {
        id: "tcr-logistics",
        organization: "Togo Code Run (TCR)",
        role: "Chargé Logistique & Communication",
        period: "11/2025 – 09/2026",
        location: "Lomé, Togo",
        description: "Organisation logistique des événements, gestion des inscriptions et de l'accueil, et communication sur les réseaux sociaux.",
        highlights: [
          "Organisation logistique des événements tech et hackathons.",
          "Gestion des inscriptions et de l'accueil des participants.",
          "Communication sur les réseaux sociaux et engagement communautaire.",
        ],
      },
    ];
  }

  if (lang === "de") {
    return [
      {
        id: "tcc-co-lead",
        organization: "Tech Campus Club (TCC)",
        role: "TCC Co-Lead",
        period: "12/2025 – 06/2026",
        location: "Lomé, Togo",
        description: "Koordination von Gemeinschaftsaktivitäten, Organisation von Workshops und Leitung von Freiwilligenteams.",
        highlights: [
          "Koordination von Technologie-Events und studentischen Initiativen.",
          "Organisation von Workshops, Trainings und Campus-Veranstaltungen.",
          "Leitung eines engagierten Freiwilligenteams und Aufgabenverteilung.",
        ],
      },
      {
        id: "tcr-logistics",
        organization: "Togo Code Run (TCR)",
        role: "Beauftragter für Logistik & Kommunikation",
        period: "11/2025 – 09/2026",
        location: "Lomé, Togo",
        description: "Eventlogistik, Betreuung der Teilnehmenden und Social-Media-Kommunikation.",
        highlights: [
          "Organisation der Gesamteventlogistik.",
          "Verwaltung der Registrierungen und Vor-Ort-Empfang der Teilnehmenden.",
          "Social-Media-Kommunikation und Öffentlichkeitsarbeit.",
        ],
      },
    ];
  }

  return [
    {
      id: "tcc-co-lead",
      organization: "Tech Campus Club (TCC)",
      role: "TCC Co-Lead",
      period: "12/2025 – 06/2026",
      location: "Lomé, Togo",
      description: "Coordinated community activities, organized workshops and training sessions, and managed volunteer teams.",
      highlights: [
        "Coordinated community activities and technology initiatives.",
        "Organized workshops, practical training sessions, and events.",
        "Managed a team of volunteers and delegated operational tasks.",
      ],
    },
    {
      id: "tcr-logistics",
      organization: "Togo Code Run (TCR)",
      role: "Logistics & Communications Officer",
      period: "11/2025 – 09/2026",
      location: "Lomé, Togo",
      description: "Coordinated event logistics, managed participant registrations and reception, and handled social media communications.",
      highlights: [
        "Coordinated event logistics and operations.",
        "Managed participant registrations and on-site reception.",
        "Handled social media communications and community reach.",
      ],
    },
  ];
}

export function getLocalizedReferences(lang: Language) {
  if (lang === "fr") {
    return [
      {
        name: "M. GABA Guillaume",
        title: "Chargé des Études",
        institution: "Lomé Business School (LBS)",
        location: "Lomé, Togo",
        phone: "+228 90 26 47 67",
      },
    ];
  }

  if (lang === "de") {
    return [
      {
        name: "M. GABA Guillaume",
        title: "Studienleiter (Head of Studies)",
        institution: "Lomé Business School (LBS)",
        location: "Lomé, Togo",
        phone: "+228 90 26 47 67",
      },
    ];
  }

  return [
    {
      name: "M. GABA Guillaume",
      title: "Head of Studies",
      institution: "Lomé Business School (LBS)",
      location: "Lomé, Togo",
      phone: "+228 90 26 47 67",
    },
  ];
}

export function getLocalizedServices(lang: Language) {
  if (lang === "fr") {
    return [
      {
        slug: "ui-ux-design",
        icon: "pen",
        title: "Design UI/UX & Figma",
        description: "Interfaces utilisateur, wireframes, design systems et prototypes cliquables interactifs.",
        details: [
          "Wireframing, prototypes haute fidélité et parcours utilisateur complets sur Figma",
          "Design systems avec composants réutilisables, tokens et états documentés",
          "Interfaces intuitives et mobile-first adaptées aux marchés africains et internationaux",
        ],
      },
      {
        slug: "website-redesign",
        icon: "refresh",
        title: "Refonte de Sites Web (Refonte Web)",
        description: "Modernisation de sites existants en plateformes ergonomiques, rapides et accessibles.",
        details: [
          "Audit UX/UI complet de sites existants (ex. retour d'expérience TdE)",
          "Modernisation visuelle valorisant l'image de marque et l'accessibilité",
          "Optimisation majeure des temps de chargement et réactivité mobile",
        ],
      },
      {
        slug: "web-development",
        icon: "code",
        title: "Développement Web & Full-Stack",
        description: "Applications web sur mesure, marketplaces et plateformes professionnelles sécurisées.",
        details: [
          "Développement complet (comme Onomamarket), portails d'entreprise et outils web",
          "HTML sémantique, CSS/Tailwind, JavaScript/TypeScript, PHP et bases de données SQL",
          "Vitesse de chargement ultra-rapide optimisée pour les mobiles et connexions légères",
        ],
      },
      {
        slug: "statistics-dashboards",
        icon: "terminal",
        title: "Outils de Statistiques & Rapports",
        description: "Tableaux de bord de visualisation de données avec génération automatique de graphiques et rapports.",
        details: [
          "Graphiques interactifs dynamiques et tableaux de bord analytiques",
          "Génération automatisée de rapports de synthèse et exports PDF/tableurs",
          "Architecture de base de données claire et suivi d'indicateurs clés de performance",
        ],
      },
      {
        slug: "digital-solutions",
        icon: "layers",
        title: "Opérations Digitales & WordPress",
        description: "Sites WordPress, gestion de contenus digitaux et assistance opérationnelle à distance.",
        details: [
          "Configuration WordPress, thèmes personnalisés et gestion de contenu éditorial",
          "Création de visuels digitaux, publication sur les réseaux sociaux et campagnes",
          "Assistance virtuelle, traitement de données et collaboration internationale",
        ],
      },
      {
        slug: "technical-consulting",
        icon: "compass",
        title: "Conseil Technique & Stratégie",
        description: "Accompagnement sur les choix technologiques, la sécurité anti-arnaque et l'architecture web.",
        details: [
          "Choix des technologies adaptées aux projets et startups en phase de lancement",
          "Bonnes pratiques de sécurité et prévention de la fraude pour marketplaces",
          "Mentorat et revues de code/design pour étudiants et porteurs de projet",
        ],
      },
    ];
  }

  if (lang === "de") {
    return [
      {
        slug: "ui-ux-design",
        icon: "pen",
        title: "UI/UX & Figma Design",
        description: "Benutzeroberflächen, Wireframes, Design-Systeme und interaktive klickbare Prototypen.",
        details: [
          "Figma-Wireframing, High-Fidelity-Prototypen und User Journey Mapping",
          "Design-Systeme mit wiederverwendbaren Token, Komponenten und Dokumentation",
          "Mobile-First, intuitive Schnittstellen für afrikanische und internationale Märkte",
        ],
      },
      {
        slug: "website-redesign",
        icon: "refresh",
        title: "Website-Relaunch & Redesign",
        description: "Modernisierung bestehender Websites in elegante, schnelle und barrierefreie Plattformen.",
        details: [
          "Umfassendes UX/UI-Audit bestehender Websites (z.B. TdE-Erfahrung)",
          "Modernes Redesign unter Beibehaltung der etablierten Markenidentität",
          "Signifikante Ladezeitoptimierung und voll responsive Navigation",
        ],
      },
      {
        slug: "web-development",
        icon: "code",
        title: "Web- & Full-Stack-Entwicklung",
        description: "Maßgeschneiderte Webanwendungen, Marktplätze und sichere Unternehmensportale.",
        details: [
          "Full-Stack-Plattformen wie Onomamarket, Portale und Web-Tools",
          "Semantisches HTML, CSS/Tailwind, JavaScript/TypeScript, PHP und SQL-Datenbanken",
          "Blitzschnelle Ladezeiten optimiert für mobile Verbindungen",
        ],
      },
      {
        slug: "statistics-dashboards",
        icon: "terminal",
        title: "Statistik- & Reporting-Tools",
        description: "Dashboards zur Datenvisualisierung mit automatischer Diagramm- und Berichterstellung.",
        details: [
          "Dynamische interaktive Diagramme und Analysedashboards",
          "Automatische Generierung von Berichten und PDF-/Tabellenexport",
          "Saubere Datenmodellierung und Kennzahlenverfolgung",
        ],
      },
      {
        slug: "digital-solutions",
        icon: "layers",
        title: "Digitale Workflows & WordPress",
        description: "WordPress-Websites, digitales Content-Management und virtuelle Assistenz.",
        details: [
          "WordPress-Setups, maßgeschneiderte Themes und Content-Workflows",
          "Erstellung digitaler Inhalte und Social-Media-Marketinggrafiken",
          "Virtuelle Assistenz, Datenverarbeitung und internationale Remote-Unterstützung",
        ],
      },
      {
        slug: "technical-consulting",
        icon: "compass",
        title: "Technische Beratung & Strategie",
        description: "Beratung zu Technologie-Stacks, Betrugsschutz auf Plattformen und Softwarearchitektur.",
        details: [
          "Auswahl der passenden Architektur für frühe Produktphasen",
          "Sicherheits- und Betrugsprävention für Online-Marktplätze",
          "Mentoring und Code/Design-Reviews für Studierende und Gründer",
        ],
      },
    ];
  }

  // English default
  return [
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
}

export function getLocalizedProjects(lang: Language) {
  if (lang === "fr") {
    return [
      {
        slug: "tde-website-redesign",
        title: "Société Togolaise des Eaux (TdE) — Refonte de Site Web",
        category: "Design",
        image: project1,
        excerpt: "Refonte UI/UX complète du site officiel de la compagnie nationale des eaux au Togo.",
        description:
          "Lors de mon stage à la Société Togolaise des Eaux (TdE), j'ai dirigé la refonte UI/UX complète de leur site web officiel. Le projet visait à transformer une interface ancienne en un portail accessible, centré sur le citoyen, facilitant la consultation des factures, la découverte des services et les démarches en ligne.",
        technologies: ["Figma", "Design UI/UX", "Design Systems", "Prototypage", "Parcours Utilisateur"],
        features: [
          "Système de design complet mobile-first et desktop conçu dans Figma",
          "Portail usagers intuitif pour vérification et paiement des factures d'eau",
          "Typographie accessible et identité visuelle institutionnelle moderne",
          "Prototype cliquable interactif validé par les équipes décisionnaires",
        ],
        liveUrl: "",
        githubUrl: "",
      },
      {
        slug: "tde-statistics-generator",
        title: "TdE — Générateur de Statistiques & Graphiques",
        category: "Web Development",
        image: tdeStatsGenerator,
        excerpt: "Outil web d'analyse pour la génération de statistiques opérationnelles, graphiques et rapports téléchargeables.",
        description:
          "Développé au sein de la TdE comme solution technique majeure : une application web interne qui agrège les indicateurs d'exploitation de l'eau, génère dynamiquement des graphiques comparatifs et exporte des rapports PDF complets en un clic.",
        technologies: ["JavaScript", "HTML5", "CSS3", "PHP", "SQL", "Chart.js / Data Viz"],
        features: [
          "Génération dynamique de graphiques multi-formats (barres, courbes, secteurs)",
          "Création automatisée de rapports de synthèse exportables",
          "Filtrage des données par région, période et paramètres d'exploitation",
          "Architecture légère assurant un affichage instantané sur réseau local",
        ],
        liveUrl: "",
        githubUrl: "",
      },
      {
        slug: "onomamarket",
        title: "Onomamarket — Marketplace Sécurisée Sans Arnaque",
        category: "Applications",
        image: onomaMarketplace,
        excerpt: "Place de marché e-commerce entre particuliers conçue pour protéger acheteurs et vendeurs des arnaques.",
        description:
          "Onomamarket est une initiative personnelle née du besoin de confiance dans le commerce en ligne en Afrique de l'Ouest. La plateforme élimine les annonces frauduleuses grâce à des comptes vérifiés, une messagerie encadrée et des filtres intelligents.",
        technologies: ["JavaScript", "PHP", "SQL", "Design UI/UX", "Figma", "Design Responsive"],
        features: [
          "Processus de vérification sans faille pour vendeurs et acheteurs",
          "Catalogue catégorisé avec recherche instantanée et géolocalisation",
          "Interface mobile ultra-rapide optimisée pour les faibles bandes passantes",
          "Tableau de bord ergonomique pour la gestion des stocks et commandes",
        ],
        liveUrl: "",
        githubUrl: "https://github.com",
      },
      {
        slug: "figma-uiux-collection",
        title: "Collection UI/UX & Design Systems sur Figma",
        category: "Design",
        image: project2,
        excerpt: "Ensemble sélectionné d'applications web, d'écrans mobiles et de design systems créés sur Figma.",
        description:
          "Une vitrine approfondie de travaux de conception UI/UX réalisés sur Figma. Comprend des tokens de design, des bibliothèques de composants atomiques, des modes clair/sombre et des prototypes animés.",
        technologies: ["Figma", "UI/UX", "Prototypage Interactif", "Design Tokens", "Wireframing"],
        features: [
          "Design system exhaustif avec palettes de couleurs et typographies",
          "Prototypes interactifs avec micro-interactions et transitions fluides",
          "Composants responsives multiplateformes (iOS, Android, Web)",
          "Recherche utilisateur, personas et explorations de wireframes",
        ],
        liveUrl: "https://figma.com",
        githubUrl: "",
      },
      {
        slug: "asiatic-digital-campaigns",
        title: "Asiatic International Corp — Opérations Digitales",
        category: "Other",
        image: project1,
        excerpt: "Création graphique multicanale, stratégie de contenu et flux opérationnels à distance.",
        description:
          "Aperçu des visuels marketing, de la gestion de marque sur les réseaux sociaux et des flux de données administratives traités lors de mon stage international à distance pour Asiatic International Corp (Inde).",
        technologies: ["Marketing Digital", "Canva", "CapCut", "Réseaux Sociaux", "Traitement de Données"],
        features: [
          "Identité visuelle et contenus créatifs adaptés à une audience internationale",
          "Organisation rigoureuse des pipelines de données et documents",
          "Collaboration à distance efficace à travers différents fuseaux horaires",
          "Cohérence graphique globale sur l'ensemble des canaux digitaux",
        ],
        liveUrl: "",
        githubUrl: "",
      },
      {
        slug: "wordpress-digital-portal",
        title: "Portail Multimédia & Blog WordPress",
        category: "Web Development",
        image: project3,
        excerpt: "Blog WordPress responsive et portail média sur mesure avec performances optimisées.",
        description:
          "Un portail WordPress rapide et moderne, développé sur mesure pour diffuser des contenus multimédias riches et des articles de blog avec une excellente ergonomie mobile.",
        technologies: ["WordPress", "PHP", "CSS3", "JavaScript", "SEO"],
        features: [
          "Thème sur mesure adapté à tous les formats d'écran",
          "Optimisation du chargement des médias et mise en cache",
          "Système d'engagement des lecteurs et commentaires",
          "Structure technique optimisée pour le référencement naturel (SEO)",
        ],
        liveUrl: "",
        githubUrl: "",
      },
    ];
  }

  if (lang === "de") {
    return [
      {
        slug: "tde-website-redesign",
        title: "Société Togolaise des Eaux (TdE) — Website-Relaunch",
        category: "Design",
        image: project1,
        excerpt: "Vollständiges UI/UX-Redesign der offiziellen Website des nationalen Wasserversorgers in Togo.",
        description:
          "Während meines Praktikums bei der Société Togolaise des Eaux (TdE) leitete ich die komplette UI/UX-Überarbeitung der offiziellen Website. Ziel war ein barrierefreies, bürgerfreundliches Portal zur Rechnungsabfrage und Serviceanforderung.",
        technologies: ["Figma", "UI/UX Design", "Design-Systeme", "Prototyping", "User Flows"],
        features: [
          "Vollständiges Mobile-First und Desktop Design-System in Figma",
          "Intuitives Kundenportal zur Wasserrechnungsabfrage und Beratung",
          "Barrierefreie Typografie und behördengerechte visuelle Identität",
          "Interaktiver Klickprototyp zur Abstimmung mit Entscheidungsträgern",
        ],
        liveUrl: "",
        githubUrl: "",
      },
      {
        slug: "tde-statistics-generator",
        title: "TdE Statistik- & Diagramm-Generierungsplattform",
        category: "Web Development",
        image: tdeStatsGenerator,
        excerpt: "Analyse-Webtool zur Erstellung von Betriebsstatistiken, Diagrammen und Berichten.",
        description:
          "Entwickelt bei der TdE als zentrale technische Lösung: eine interne Webanwendung zur Aggregation von Betriebsdaten, dynamischer Diagrammerstellung und Ein-Klick-Export von PDF-Berichten.",
        technologies: ["JavaScript", "HTML5", "CSS3", "PHP", "SQL", "Chart.js / Datenvisualisierung"],
        features: [
          "Dynamische Diagrammerstellung in verschiedenen Formaten (Balken, Linien, Torten)",
          "Automatischer Export strukturierter Zusammenfassungsberichte",
          "Filterung nach Region, Zeitspanne und operativen Kennzahlen",
          "Schlanke Architektur für schnelle Ladezeiten im Intranet",
        ],
        liveUrl: "",
        githubUrl: "",
      },
      {
        slug: "onomamarket",
        title: "Onomamarket — Sicherer E-Commerce Marktplatz",
        category: "Applications",
        image: onomaMarketplace,
        excerpt: "Ein sicherer Peer-to-Peer-Marktplatz, der Käufer und Verkäufer zuverlässig vor Betrug schützt.",
        description:
          "Onomamarket entstand aus dem Bedürfnis nach einem vertrauenswürdigen lokalen Online-Marktplatz in Westafrika. Verifizierte Konten und intelligente Filter schützen vor Betrugsfällen.",
        technologies: ["JavaScript", "PHP", "SQL", "UI/UX Design", "Figma", "Responsive Web"],
        features: [
          "Verifizierte Verkäufer- und Käufer-Workflows ohne Betrug",
          "Kategorisierter Marktplatz mit Sofortsuche und Geo-Filterung",
          "Optimiert für Verbindungen mit geringer Bandbreite",
          "Übersichtliches Dashboard zur Bestands- und Bestellverwaltung",
        ],
        liveUrl: "",
        githubUrl: "https://github.com",
      },
      {
        slug: "figma-uiux-collection",
        title: "Figma UI/UX & Design-Systeme Sammlung",
        category: "Design",
        image: project2,
        excerpt: "Kuratierte Sammlung von Web-Apps, mobilen Interfaces und Design-Systemen in Figma.",
        description:
          "Eine umfangreiche Präsentation von UI/UX-Arbeiten in Figma: Design-Tokens, atomare Komponentenbibliotheken, Hell-/Dunkel-Modi und animierte Prototypen.",
        technologies: ["Figma", "UI/UX", "Interaktives Prototyping", "Design Tokens", "Wireframing"],
        features: [
          "Komplettes Design-System mit Farbpaletten und Typografieskalen",
          "Interaktive Prototypen mit geschmeidigen Animationen",
          "Plattformübergreifende Komponenten (iOS, Android, Web)",
          "Nutzerforschung, Personas und strukturierte Wireframes",
        ],
        liveUrl: "https://figma.com",
        githubUrl: "",
      },
      {
        slug: "asiatic-digital-campaigns",
        title: "Asiatic International Corp — Digitale Kampagnen",
        category: "Other",
        image: project1,
        excerpt: "Multichannel-Grafikdesign, Content-Strategie und administrative Remote-Workflows.",
        description:
          "Einblicke in visuelle Marketinginhalte, Social-Media-Branding und Datenverarbeitung während meines internationalen Remote-Praktikums bei Asiatic International Corp (Indien).",
        technologies: ["Digital Marketing", "Canva", "CapCut", "Social Media", "Datenverarbeitung"],
        features: [
          "Visuelles Branding und Kampagnen für ein internationales Publikum",
          "Strukturierte Datenerfassung und administrative Workflows",
          "Zeitzonenübergreifende Remote-Zusammenarbeit",
          "Konsistente visuelle Ästhetik über alle Kanäle",
        ],
        liveUrl: "",
        githubUrl: "",
      },
      {
        slug: "wordpress-digital-portal",
        title: "WordPress Blog & Multimedia Portal",
        category: "Web Development",
        image: project3,
        excerpt: "Responsiver WordPress-Blog und Medienportal mit optimierter Ladegeschwindigkeit.",
        description:
          "Ein modernes, performantes WordPress-Portal für reichhaltige Multimedia-Inhalte, Blogartikel und Community-Interaktionen mit erstklassiger Mobilansicht.",
        technologies: ["WordPress", "PHP", "CSS3", "JavaScript", "SEO"],
        features: [
          "Maßgeschneidertes responsives Layout und Typografie",
          "Optimiertes Medien-Caching und schnelle Ladezeiten",
          "Benutzerfreundliches Kommentarsystem",
          "Suchmaschinenoptimierte Struktur",
        ],
        liveUrl: "",
        githubUrl: "",
      },
    ];
  }

  // English default
  return [
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
}

export function getLocalizedPosts(lang: Language) {
  if (lang === "fr") {
    return [
      {
        slug: "tde-redesign-case-study",
        title: "Étude de Cas : Refonte du Site de la Société Togolaise des Eaux (TdE)",
        category: "Design",
        date: "2026-08-20",
        readTime: "7 min de lecture",
        image: blog1,
        excerpt:
          "Comment j'ai abordé la refonte UI/UX de la compagnie nationale des eaux pour rendre le service public accessible, rapide et simple pour les citoyens.",
        body: [
          "Les sites de services publics ont une exigence absolue : chaque citoyen, quel que soit son niveau technique ou son appareil, doit pouvoir trouver l'information en moins de trois clics.",
          "Durant mon stage à la TdE, j'ai analysé les points de friction sur le site existant. Les deux besoins prioritaires étaient la consultation des factures d'eau et les contacts d'urgence.",
          "Sur Figma, j'ai structuré un système de design clair, à fort contraste avec des cartes adaptatives. Les démarches sont désormais directes et intuitives.",
          "Un bon design pour les services publics ne relève pas du superflu : c'est une question de clarté, de rapidité et de confiance.",
        ],
      },
      {
        slug: "building-onomamarket-anti-scam",
        title: "Concevoir Onomamarket : L'Architecture d'une Marketplace Anti-Fraude",
        category: "Web Development",
        date: "2026-07-15",
        readTime: "6 min de lecture",
        image: onomaMarketplace,
        excerpt:
          "Pourquoi les arnaques prolifèrent sur les plateformes informelles en Afrique de l'Ouest et comment Onomamarket élimine ce risque dès la conception.",
        body: [
          "Le commerce entre particuliers explose en Afrique de l'Ouest, mais le manque de confiance freine son essor. Les faux profils et annonces frauduleuses découragent les acheteurs.",
          "Lors de la conception d'Onomamarket, j'ai axé le produit sur trois piliers : vendeurs vérifiés, historique transparent et messagerie protégée.",
          "L'interface met en avant la réputation des vendeurs sans exposer les coordonnées privées avant la validation des échanges.",
          "En intégrant la sécurité au niveau même de l'UX, j'ouvre le commerce digital à des milliers d'entrepreneurs honnêtes.",
        ],
      },
      {
        slug: "figma-to-code-workflow",
        title: "Mon Flux de Travail de Figma au Code en tant que Développeur-Designer",
        category: "Design",
        date: "2026-06-10",
        readTime: "5 min de lecture",
        image: blog3,
        excerpt:
          "Comment la double compétence Figma et développement élimine toute perte de temps entre la maquette et la mise en production.",
        body: [
          "Être à la fois designer UI/UX et développeur offre un avantage considérable : vous ne concevez jamais une interface irréaliste ou trop lourde à coder.",
          "Dans Figma, chaque composant est structuré avec l'Auto-Layout qui reproduit exactement le comportement Flexbox et Grid en CSS.",
          "Lors du passage au code, tout s'enchaîne sans approximation, garantissant une fidélité visuelle parfaite et une rapidité d'exécution.",
        ],
      },
      {
        slug: "statistics-dashboards-reporting",
        title: "Concevoir des Tableaux de Bord que les Équipes Opérationnelles Adorent",
        category: "Programming",
        date: "2026-04-18",
        readTime: "6 min de lecture",
        image: tdeStatsGenerator,
        excerpt:
          "Retours d'expérience sur la plateforme de statistiques TdE : transformer des données brutes en graphiques visuels et rapports automatisés.",
        body: [
          "Une base de données remplie de chiffres n'a aucune valeur si les décideurs ne peuvent pas en extraire les tendances d'un simple coup d'œil.",
          "Dans l'outil développé pour la TdE, la fonctionnalité maîtresse a été la génération automatique de synthèses PDF avec graphiques intégrés.",
          "Les managers n'ont plus à passer des heures à consolider des feuilles de calcul : un clic génère les graphiques et exporte le compte-rendu.",
        ],
      },
    ];
  }

  if (lang === "de") {
    return [
      {
        slug: "tde-redesign-case-study",
        title: "Fallstudie: Website-Relaunch für Société Togolaise des Eaux (TdE)",
        category: "Design",
        date: "2026-08-20",
        readTime: "7 Min. Lesezeit",
        image: blog1,
        excerpt:
          "Wie ich das UI/UX-Redesign des nationalen Wasserversorgers in Togo angegangen bin, um öffentliche Dienste bürgerfreundlich und schnell zu machen.",
        body: [
          "Websites öffentlicher Einrichtungen haben eine Verantwortung: Jeder Bürger muss wichtige Informationen mit maximal drei Klicks finden.",
          "Während meines Praktikums analysierte ich die Hürden der alten Website: Rechnungsabfragen und Notfallkontakte waren die wichtigsten Nutzerbedürfnisse.",
          "In Figma entwickelte ich ein klares, barrierefreies Design-System mit hohem Kontrast und responsiven Karten.",
          "Gutes Design für öffentliche Infrastruktur dient keinem Selbstzweck, sondern schafft Klarheit, Schnelligkeit und Vertrauen.",
        ],
      },
      {
        slug: "building-onomamarket-anti-scam",
        title: "Entwicklung von Onomamarket: Architektur eines betrugssicheren Marktplatzes",
        category: "Web Development",
        date: "2026-07-15",
        readTime: "6 Min. Lesezeit",
        image: onomaMarketplace,
        excerpt:
          "Warum Online-Betrug im westafrikanischen E-Commerce auftritt und wie Onomamarket Betrug von vornherein verhindert.",
        body: [
          "Der Online-Handel in Westafrika wächst rasant, Vertrauen ist jedoch der kritische Engpass.",
          "Bei Onomamarket habe ich mich auf verifizierte Profile, transparente Historien und geschützte Kommunikation konzentriert.",
          "Die Benutzeroberfläche hebt Verkäufer-Bewertungen hervor und schützt persönliche Kontaktdaten.",
          "Durch nutzerzentriertes Produktdesign mache ich sicheren digitalen Handel für tausende ehrliche Unternehmer möglich.",
        ],
      },
      {
        slug: "figma-to-code-workflow",
        title: "Mein Workflow von Figma zu Code als Designer & Entwickler",
        category: "Design",
        date: "2026-06-10",
        readTime: "5 Min. Lesezeit",
        image: blog3,
        excerpt:
          "Wie die Kombination aus Figma-Design und Webentwicklung Abstimmungsaufwände minimiert.",
        body: [
          "Sowohl UI/UX-Designer als auch Entwickler zu sein bietet enorme Vorteile: Man gestaltet nur Dinge, die sich sauber und performant umsetzen lassen.",
          "In Figma nutzt jedes Element Auto-Layout, das dem CSS-Flexbox-Modell entspricht.",
          "Beim Coden entfällt langes Rätselraten – das Design überträgt sich nahtlos in den Browser.",
        ],
      },
      {
        slug: "statistics-dashboards-reporting",
        title: "Daten-Dashboards gestalten, die operative Teams begeistern",
        category: "Programming",
        date: "2026-04-18",
        readTime: "6 Min. Lesezeit",
        image: tdeStatsGenerator,
        excerpt:
          "Erkenntnisse aus dem Statistik-Tool der TdE: Rohe Zahlen in aussagekräftige Diagramme und automatisierte Berichte verwandeln.",
        body: [
          "Eine Datenbank voller Zahlen nützt nichts, wenn Führungskräfte die Erkenntnisse nicht auf einen Blick erfassen können.",
          "Bei der TdE-Entwicklung war die Kernfunktion der automatische PDF-Berichtsexport mit integrierten Diagrammen.",
          "Kein stundenlanges manuelles Erstellen von Tabellen mehr – ein Klick generiert den vollständigen Monatsbericht.",
        ],
      },
    ];
  }

  // English default
  return [
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
        "By solving trust at the product design level, I make digital commerce accessible to thousands of honest entrepreneurs.",
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
}

export function getLocalizedEducation(lang: Language) {
  if (lang === "fr") {
    return [
      {
        degree: "Bachelor en Systèmes d'Information",
        institution: "Lomé Business School (LBS)",
        location: "Lomé, Togo",
        period: "10/2024 – Présent (Étudiant en 3e année)",
        role: "Président du Club d'Anglais",
        description:
          "Étude du génie logiciel, modélisation de bases de données (SQL), systèmes d'entreprise, gestion de projet et technologies de l'information.",
      },
      {
        degree: "Baccalauréat Professionnel",
        institution: "Rock Legacy International School (RLIS)",
        location: "Lomé, Togo",
        period: "09/2021 – 08/2024 (Obtenu en 2024)",
        role: "Élève",
        description:
          "Solides bases en technologies de l'information, sciences, résolution de problèmes et communication bilingue.",
      },
    ];
  }

  if (lang === "de") {
    return [
      {
        degree: "Bachelor in Wirtschaftsinformatik (Information Systems)",
        institution: "Lomé Business School (LBS)",
        location: "Lomé, Togo",
        period: "10/2024 – Heute (Student im 3. Studienjahr)",
        role: "Präsident des Englisch-Clubs",
        description:
          "Softwareentwicklung, Datenbankmodellierung (SQL), Unternehmenssysteme, IT-Projektmanagement und Informationstechnologie.",
      },
      {
        degree: "Berufliches Abitur (Baccalauréat Professionnel)",
        institution: "Rock Legacy International School (RLIS)",
        location: "Lomé, Togo",
        period: "09/2021 – 08/2024 (Abschluss : 2024)",
        role: "Schüler",
        description:
          "Fundierte Grundlagen in Informationstechnologie, Naturwissenschaften, Problemlösung und zweisprachiger Kommunikation.",
      },
    ];
  }

  // English
  return [
    {
      degree: "Bachelor's Degree in Information Systems",
      institution: "Lomé Business School (LBS)",
      location: "Lomé, Togo",
      period: "10/2024 – Present (3rd Year Student)",
      role: "President of the English Club",
      description:
        "Studying software engineering, database modeling (SQL), enterprise systems, project management, and information technologies.",
    },
    {
      degree: "Vocational Baccalaureate",
      institution: "Rock Legacy International School (RLIS)",
      location: "Lomé, Togo",
      period: "09/2021 – 08/2024 (Obtained : 2024)",
      role: "Student",
      description:
        "Solid foundation in information technology, scientific disciplines, problem-solving, and bilingual English-French communication.",
    },
  ];
}

export function getLocalizedCertifications(lang: Language) {
  if (lang === "fr") {
    return [
      {
        title: "Certificat AU CIEFFA & ImpactHER",
        issuer: "AU CIEFFA & ImpactHER",
        year: "2026",
        description: "Leadership, compétences numériques et entrepreneuriat.",
      },
      {
        title: "Certification de Compétences Numériques Pix",
        issuer: "Pix",
        year: "2026",
        description: "Validation des compétences en traitement de données, sécurité en ligne et collaboration digitale.",
      },
    ];
  }

  if (lang === "de") {
    return [
      {
        title: "Zertifikat von AU CIEFFA & ImpactHER",
        issuer: "AU CIEFFA & ImpactHER",
        year: "2026",
        description: "Führungskompetenz, digitale Fähigkeiten und Unternehmertum.",
      },
      {
        title: "Pix Zertifizierung digitaler Kompetenzen",
        issuer: "Pix",
        year: "2026",
        description: "Zertifizierte Kenntnisse in Datenverarbeitung, Online-Sicherheit und digitaler Zusammenarbeit.",
      },
    ];
  }

  return [
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
}

export function getLocalizedSkillGroups(lang: Language) {
  if (lang === "fr") {
    return [
      {
        title: "Compétences Techniques & Design",
        items: ["Figma", "Canva", "SQL / Bases de Données", "Conception Web (WordPress, CMS)", "JavaScript / TypeScript", "HTML5 & CSS3", "Analyse de Données & Rapports", "Pack Microsoft Office"],
      },
      {
        title: "Gestion de Projets & Leadership",
        items: ["Gestion de Projets", "Coordination d'Équipe", "Logistique d'Événements", "Animation de Communauté", "Communication Bilingue"],
      },
      {
        title: "Soft Skills (Qualités)",
        items: ["Autonomie", "Sens des Responsabilités", "Communication", "Esprit d'Équipe", "Réactivité", "Esprit d'Analyse"],
      },
      {
        title: "Langues (Trilingue)",
        items: ["Français (Langue Maternelle / Excellent)", "Anglais (Langue Maternelle / Excellent)", "Allemand (A1 - Débutant)"],
      },
      {
        title: "Centres d'Intérêt",
        items: ["Musique", "Natation", "Lecture", "Innovations Technologiques"],
      },
    ];
  }

  if (lang === "de") {
    return [
      {
        title: "Technische Fähigkeiten & Design",
        items: ["Figma", "Canva", "SQL / Datenbanken", "Website-Design & CMS (WordPress)", "JavaScript / TypeScript", "HTML5 & CSS3", "Datenanalyse & Reporting", "Microsoft Office Suite"],
      },
      {
        title: "Projektmanagement & Führung",
        items: ["Projektmanagement", "Teamführung", "Eventlogistik", "Community-Koordination", "Zweisprachige Kommunikation"],
      },
      {
        title: "Soft Skills (Sozialkompetenz)",
        items: ["Autonomie & Selbstständigkeit", "Verantwortungsbewusstsein", "Kommunikationsstärke", "Teamfähigkeit", "Reaktionsschnelligkeit", "Analytisches Denken"],
      },
      {
        title: "Sprachen (Dreisprachig)",
        items: ["Französisch (Muttersprache / Exzellent)", "Englisch (Muttersprache / Exzellent)", "Deutsch (A1 - Anfänger)"],
      },
      {
        title: "Interessen",
        items: ["Musik", "Schwimmen", "Lesen", "Technologische Innovationen"],
      },
    ];
  }

  return [
    {
      title: "Technical Skills & Design",
      items: ["Figma", "Canva", "Databases: SQL", "Website Design & Admin: WordPress, CMS", "JavaScript / TypeScript", "HTML5 & CSS3", "Data Visualization & Reporting", "Microsoft Office Suite"],
    },
    {
      title: "Project Management & Leadership",
      items: ["Project Management", "Team Leadership", "Event Logistics", "Community Coordination", "Bilingual Communication"],
    },
    {
      title: "Soft Skills",
      items: ["Autonomy", "Sense of Responsibility", "Communication", "Teamwork", "Responsiveness", "Analytical Thinking"],
    },
    {
      title: "Languages (Trilingual)",
      items: ["English (Native / Excellent)", "French (Native / Excellent)", "German (A1 - Beginner)"],
    },
    {
      title: "Interests",
      items: ["Music", "Swimming", "Reading", "Tech Innovations"],
    },
  ];
}
