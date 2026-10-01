import { Link } from "@tanstack/react-router";
import { ArrowRight, Plus, Quote, Sparkles, Download, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";
import portrait from "@/assets/vianel-portrait.png";
import { Socials } from "./Socials";
import { useLanguage } from "@/lib/i18n";
import { MovingTicker } from "./MovingTicker";

export function Hero() {
  const { language, t } = useLanguage();

  const dynamicRoles =
    language === "fr"
      ? ["Designer UI/UX & Figma", "Développeur Web Full-Stack", "Étudiant en Systèmes d'Information (LBS)", "Concepteur de Produits Numériques"]
      : language === "de"
      ? ["UI/UX & Figma Designer", "Full-Stack Webentwickler", "Wirtschaftsinformatik-Student (LBS)", "Digitaler Produktentwickler"]
      : ["UI/UX & Figma Designer", "Full-Stack Web Developer", "Information Systems Student (LBS)", "Digital Product Architect"];

  const [roleIndex, setRoleIndex] = useState(0);
  const [fadeState, setFadeState] = useState("opacity-100 translate-y-0");

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeState("opacity-0 -translate-y-2");
      setTimeout(() => {
        setRoleIndex((prev) => (prev + 1) % dynamicRoles.length);
        setFadeState("opacity-100 translate-y-0");
      }, 300);
    }, 3200);

    return () => clearInterval(interval);
  }, [dynamicRoles.length]);

  return (
    <div className="w-full">
      <section className="relative px-3 sm:px-6 pt-6 sm:pt-12">
        <div className="mx-auto max-w-[1240px]">
          {/* Header Title with Animated Kinetic Typography */}
          <div className="animate-rise text-center">
            {/* Top eyebrow pill */}
            <div className="inline-flex items-center gap-2 rounded-full bg-surface border border-border/80 px-4 py-1.5 shadow-sm mb-3">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
              </span>
              <span className="text-xs sm:text-sm font-semibold tracking-wide text-foreground">
                {language === "fr" ? "À Propos & Présentation" : language === "de" ? "Über Mich & Profil" : "About & Biography"}
              </span>
            </div>

            <h1 className="mt-2 text-3xl xs:text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] text-foreground">
              {language === "fr" ? (
                <>
                  Je suis <span className="text-primary">Vianel TIAGUE NTIECHE</span>
                </>
              ) : language === "de" ? (
                <>
                  Ich bin <span className="text-primary">Vianel TIAGUE NTIECHE</span>
                </>
              ) : (
                <>
                  I'm <span className="text-primary">Vianel TIAGUE NTIECHE</span>
                </>
              )}
            </h1>

            {/* Dynamic Moving Role Text */}
            <div className="mt-3 flex items-center justify-center min-h-[32px] sm:min-h-[40px]">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/25 px-4 py-1.5 text-xs sm:text-base font-bold text-primary transition-all duration-300">
                <Sparkles className="h-4 w-4 animate-spin text-primary shrink-0" style={{ animationDuration: "5s" }} />
                <span className={`transition-all duration-300 transform ${fadeState}`}>
                  {dynamicRoles[roleIndex]}
                </span>
              </div>
            </div>

            <p className="mx-auto mt-3 max-w-2xl text-sm sm:text-lg text-muted-foreground px-2">
              {t.hero.tagline}
            </p>
          </div>

          {/* Main 3-Column Responsive Grid */}
          <div className="mt-8 sm:mt-12 grid items-center gap-8 lg:grid-cols-[1fr_1.3fr_1fr]">
            {/* Left: review block */}
            <div className="animate-rise order-2 lg:order-1 text-center lg:text-left bg-surface/90 backdrop-blur-sm lg:bg-transparent p-6 sm:p-8 lg:p-0 rounded-3xl border border-border/50 lg:border-none shadow-sm lg:shadow-none">
              <Quote className="mx-auto lg:mx-0 h-8 w-8 sm:h-9 sm:w-9 fill-primary text-primary" aria-hidden />
              <p className="mt-3 mx-auto lg:mx-0 max-w-xs text-base sm:text-lg font-medium leading-snug text-foreground">
                {t.hero.quote}
              </p>
              
              <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-surface px-4 py-2 text-xs font-semibold shadow-sm border border-border/60">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-foreground">{t.hero.available}</span>
              </div>
              
              <div className="mt-5">
                <p className="text-lg sm:text-xl font-extrabold text-foreground">
                  <span className="text-primary">{t.hero.feedbackTitle}</span>{" "}
                  <span className="text-sm sm:text-base font-semibold">{t.hero.feedbackSub}</span>
                </p>
                <Link
                  to="/testimonials"
                  className="mt-1.5 text-xs sm:text-sm text-primary hover:underline inline-flex items-center gap-1 font-semibold"
                >
                  {t.hero.leaveFeedback}
                </Link>
              </div>
            </div>

            {/* Center: portrait */}
            <div className="animate-rise relative order-1 mx-auto w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[480px] lg:order-2">
              <div className="relative aspect-square">
                <div className="absolute inset-x-[5%] top-[6%] aspect-square rounded-full bg-primary/20 animate-glow blur-2xl" />
                <div className="absolute inset-x-[10%] top-[10%] aspect-square rounded-full bg-primary/40 animate-pulse" />
                <img
                  src={portrait}
                  alt="Portrait of Vianel TIAGUE NTIECHE"
                  width={720}
                  height={720}
                  className="relative h-full w-full scale-105 origin-bottom object-contain object-bottom drop-shadow-2xl transition-transform duration-500 hover:scale-110"
                />
              </div>

              {/* Action Buttons Row - Fully Mobile Responsive */}
              <div className="relative mt-4 flex flex-col sm:flex-row flex-wrap justify-center gap-2.5 sm:gap-3 px-2">
                <a
                  href={language === "fr" ? "/cv-vianel-tiague-ntieche-fr.pdf" : "/cv-vianel-tiague-ntieche-en.pdf"}
                  download={language === "fr" ? "CV_Vianel_TIAGUE_NTIECHE_FR.pdf" : "CV_Vianel_TIAGUE_NTIECHE_EN.pdf"}
                  className="pill-red inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm sm:text-base font-semibold shadow-md w-full sm:w-auto"
                  title={language === "fr" ? "Télécharger mon CV (PDF)" : "Download my CV (PDF)"}
                >
                  <Download className="h-4 w-4" />
                  <span>{language === "fr" ? "Télécharger CV (PDF)" : "Download CV (PDF)"}</span>
                </a>

                <Link
                  to="/projects"
                  className="pill-black inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm sm:text-base font-semibold shadow-md w-full sm:w-auto"
                >
                  <span>{t.hero.portfolioBtn}</span>
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-primary text-primary-foreground">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </Link>

                <Link
                  to="/contact"
                  className="pill-outline inline-flex items-center justify-center px-6 py-3.5 text-sm sm:text-base font-semibold w-full sm:w-auto"
                >
                  {t.hero.checkInBtn}
                </Link>
              </div>
            </div>

            {/* Right: tags + socials */}
            <div className="animate-rise order-3 flex flex-col items-center gap-6 lg:items-end">
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 lg:justify-end">
                <span className="grid h-9 w-9 sm:h-11 sm:w-11 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground shadow-sm">
                  <Plus className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={3} />
                </span>
                {t.hero.tags.map((tag) => (
                  <span
                    key={tag.label}
                    className={`rounded-full px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-medium transition-transform hover:-translate-y-1 shadow-sm ${
                      tag.tone === "red"
                        ? "bg-primary text-primary-foreground"
                        : "bg-surface border border-border text-foreground"
                    }`}
                  >
                    {tag.label}
                  </span>
                ))}
              </div>

              <div className="text-center lg:text-right">
                <p className="text-xs sm:text-sm font-medium text-muted-foreground">{t.hero.followMe}</p>
                <Socials className="mt-2.5 justify-center lg:justify-end" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full-Width Kinetic Moving Text Ticker under Hero */}
      <div className="mt-12 sm:mt-16">
        <MovingTicker variant="dark" speed="normal" />
      </div>
    </div>
  );
}

