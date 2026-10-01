import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Layers, Code2, ShieldCheck, Download, UserCheck, Compass } from "lucide-react";
import { useState, useEffect } from "react";
import { Socials } from "./Socials";
import { useLanguage } from "@/lib/i18n";
import { MovingTicker } from "./MovingTicker";
import portrait from "@/assets/vianel-portrait.png";

export function HomeHero() {
  const { language, t } = useLanguage();

  const dynamicRoles =
    language === "fr"
      ? ["Designer UI/UX & Figma", "Développeur Web & Logiciel", "Passionné de Cybersécurité", "Systèmes d'Information (LBS)"]
      : language === "de"
      ? ["UI/UX & Figma Designer", "Web- & Softwareentwickler", "Cybersicherheits-Enthusiast", "Wirtschaftsinformatik (LBS)"]
      : ["UI/UX & Figma Designer", "Web & Software Developer", "Cybersecurity Enthusiast", "Information Systems (LBS)"];

  const [roleIndex, setRoleIndex] = useState(0);
  const [fadeState, setFadeState] = useState("opacity-100 translate-y-0");

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeState("opacity-0 -translate-y-2");
      setTimeout(() => {
        setRoleIndex((prev) => (prev + 1) % dynamicRoles.length);
        setFadeState("opacity-100 translate-y-0");
      }, 280);
    }, 3000);

    return () => clearInterval(interval);
  }, [dynamicRoles.length]);

  const titles = {
    fr: {
      eyebrow: "UI/UX DESIGN • DÉVELOPPEMENT WEB • CYBERSÉCURITÉ",
      mainTitle: "UI/UX Designer, Développeur Web &",
      highlight: "Enthousiaste en Cybersécurité",
      sub: "Conception centrée utilisateur sur Figma, ingénierie d'applications web performantes et développement de plateformes sécurisées basées à Lomé, Togo.",
      discoverAbout: "Découvrir mon profil",
      exploreProjects: "Voir les projets",
      contact: "Me contacter",
      badgeLocation: "Lomé, Togo",
      badgeStatus: "Disponible pour nouveaux projets",
      card1Title: "UI/UX Design & Figma",
      card1Desc: "Systèmes de design atomiques, prototypage haute fidélité, parcours utilisateurs clairs et interfaces intuitives.",
      card2Title: "Développement Web & Logiciel",
      card2Desc: "Applications web réactives, architectures modernes (React, TypeScript, SQL), intégration d'APIs et rapidité d'exécution.",
      card3Title: "Cybersécurité & Solutions Fiables",
      card3Desc: "Sensibilisation et sécurité applicative, marketplace sécurisée anti-fraude (ONOMA) et reporting analytique fiable (TdE).",
    },
    de: {
      eyebrow: "UI/UX DESIGN • WEBENTWICKLUNG • CYBERSICHERHEIT",
      mainTitle: "UI/UX Designer, Webentwickler &",
      highlight: "Cybersicherheits-Enthusiast",
      sub: "Nutzerzentriertes Design in Figma, robuste Full-Stack-Webentwicklung und sichere digitale Plattformen aus Lomé, Togo.",
      discoverAbout: "Profil entdecken",
      exploreProjects: "Projekte ansehen",
      contact: "Kontakt aufnehmen",
      badgeLocation: "Lomé, Togo",
      badgeStatus: "Verfügbar für Projekte",
      card1Title: "UI/UX Design & Figma",
      card1Desc: "Atomare Design-Systeme, interaktives Prototyping und benutzerfreundliche Oberflächen.",
      card2Title: "Web- & Softwareentwicklung",
      card2Desc: "Reaktionsschnelle Web-Apps, moderne Architekturen (React, TypeScript, SQL) und API-Integrationen.",
      card3Title: "Cybersicherheit & Sichere Lösungen",
      card3Desc: "Sicherheit digitaler Produkte, vertrauenswürdige Plattformen (ONOMA) und zuverlässiges Datenreporting (TdE).",
    },
    en: {
      eyebrow: "UI/UX DESIGN • WEB DEVELOPMENT • CYBERSECURITY",
      mainTitle: "UI/UX Designer, Web Developer &",
      highlight: "Cybersecurity Enthusiast",
      sub: "Human-centered design in Figma, robust full-stack engineering, and secure digital platform architecture based in Lomé, Togo.",
      discoverAbout: "Discover About Me",
      exploreProjects: "Explore Projects",
      contact: "Get in Touch",
      badgeLocation: "Lomé, Togo",
      badgeStatus: "Available for projects",
      card1Title: "UI/UX Design & Figma",
      card1Desc: "Atomic design systems, interactive Figma prototypes, accessible interfaces, and intuitive user flows.",
      card2Title: "Web & Software Engineering",
      card2Desc: "Fast and responsive web apps, modern stacks (React, TypeScript, SQL), API development, and data optimization.",
      card3Title: "Cybersecurity & Secure Systems",
      card3Desc: "Application security awareness, fraud-resistant marketplace architecture (ONOMA), and data reporting tools (TdE).",
    },
  };

  const copy = titles[language] || titles.en;

  return (
    <div className="w-full">
      <section className="relative px-3 sm:px-6 pt-8 sm:pt-14">
        <div className="mx-auto max-w-[1240px]">
          {/* Top Status Badges */}
          <div className="animate-rise flex flex-wrap items-center justify-center gap-3 mb-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-surface border border-border/80 px-4 py-1.5 shadow-sm">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-semibold tracking-wide text-foreground">
                {copy.badgeStatus}
              </span>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full bg-surface border border-border/80 px-4 py-1.5 shadow-sm text-xs font-semibold text-muted-foreground">
              <span className="text-primary font-bold">📍</span>
              <span>{copy.badgeLocation}</span>
            </div>
          </div>

          {/* Main Headline */}
          <div className="animate-rise text-center max-w-4xl mx-auto">
            <h1 className="text-3xl xs:text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] text-foreground">
              {copy.mainTitle} <span className="text-primary">{copy.highlight}</span>
            </h1>

            {/* Dynamic Kinetic Role Switcher */}
            <div className="mt-4 flex items-center justify-center min-h-[36px]">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/25 px-4 py-1.5 text-xs sm:text-base font-bold text-primary">
                <Sparkles className="h-4 w-4 animate-spin text-primary shrink-0" style={{ animationDuration: "5s" }} />
                <span className={`transition-all duration-300 transform ${fadeState}`}>
                  {dynamicRoles[roleIndex]}
                </span>
              </div>
            </div>

            <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-lg text-muted-foreground leading-relaxed px-2">
              {copy.sub}
            </p>

            {/* Primary Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 px-2">
              <Link
                to="/projects"
                className="pill-red inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-sm sm:text-base font-semibold shadow-md w-full sm:w-auto"
              >
                <span>{copy.exploreProjects}</span>
                <span className="grid h-6 w-6 place-items-center rounded-full bg-white text-black">
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>

              <Link
                to="/about"
                className="pill-black inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm sm:text-base font-semibold shadow-md w-full sm:w-auto"
              >
                <UserCheck className="h-4 w-4" />
                <span>{copy.discoverAbout}</span>
              </Link>

              <Link
                to="/contact"
                className="pill-outline inline-flex items-center justify-center px-6 py-3.5 text-sm sm:text-base font-semibold w-full sm:w-auto"
              >
                {copy.contact}
              </Link>
            </div>
          </div>

          {/* Interactive Feature Cards Grid */}
          <div className="animate-rise mt-14 grid gap-5 sm:grid-cols-3">
            <div className="card-soft p-6 sm:p-7 flex flex-col justify-between">
              <div>
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary border border-primary/20">
                  <Layers className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-foreground">{copy.card1Title}</h3>
                <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {copy.card1Desc}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-border/50 text-[11px] font-bold text-primary uppercase tracking-wider">
                Figma • Ergonomie • Design System
              </div>
            </div>

            <div className="card-soft p-6 sm:p-7 flex flex-col justify-between">
              <div>
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary border border-primary/20">
                  <Code2 className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-foreground">{copy.card2Title}</h3>
                <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {copy.card2Desc}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-border/50 text-[11px] font-bold text-primary uppercase tracking-wider">
                React • TypeScript • Tailwind • SQL
              </div>
            </div>

            <div className="card-soft p-6 sm:p-7 flex flex-col justify-between">
              <div>
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary border border-primary/20">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-foreground">{copy.card3Title}</h3>
                <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {copy.card3Desc}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-border/50 text-[11px] font-bold text-primary uppercase tracking-wider">
                Sécurité Web • ONOMA • TdE Analytics
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Moving Text Ticker */}
      <div className="mt-14 sm:mt-18">
        <MovingTicker variant="dark" speed="normal" />
      </div>
    </div>
  );
}
