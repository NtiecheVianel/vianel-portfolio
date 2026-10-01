import { Sparkles, Code2, Layers, Cpu, Zap, Star } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

interface MovingTickerProps {
  variant?: "primary" | "dark" | "outline";
  speed?: "normal" | "fast";
  reverse?: boolean;
  className?: string;
  items?: string[];
}

export function MovingTicker({
  variant = "dark",
  speed = "normal",
  reverse = false,
  className = "",
  items,
}: MovingTickerProps) {
  const { language } = useLanguage();

  const defaultItems =
    language === "fr"
      ? [
          "DESIGN UI/UX & FIGMA",
          "DÉVELOPPEMENT WEB FULL-STACK",
          "ANALYSE DE DONNÉES & RAPPORTS",
          "STAGE TdE — REFONTE DE SITE WEB",
          "ONOMA MARKETPLACE SÉCURISÉE",
          "LOMÉ BUSINESS SCHOOL",
          "TRILINGUE : FR • EN • DE",
          "SYSTÈMES DE DESIGN ATOMIQUES",
          "WORDPRESS & GESTION CMS",
          "INTERFACES RAPIDES & RESPONSIVES",
        ]
      : language === "de"
      ? [
          "UI/UX DESIGN & FIGMA",
          "FULL-STACK WEBENTWICKLUNG",
          "DATENANALYSE & BERICHTSWESEN",
          "TdE PRAKTIKUM — WEBSITE-RELAUNCH",
          "ONOMA SICHERER MARKTPLATZ",
          "LOMÉ BUSINESS SCHOOL",
          "DREISPRACHIG : DE • EN • FR",
          "ATOMARE DESIGN-SYSTEME",
          "WORDPRESS & CMS-MANAGEMENT",
          "SCHNELLE & RESPONSIVE DESIGNS",
        ]
      : [
          "UI/UX DESIGN & FIGMA",
          "FULL-STACK WEB DEVELOPMENT",
          "DATA ANALYTICS & REPORTING",
          "TdE INTERNSHIP — WEBSITE REDESIGN",
          "ONOMA SCAM-FREE MARKETPLACE",
          "LOMÉ BUSINESS SCHOOL",
          "TRILINGUAL : EN • FR • DE",
          "ATOMIC DESIGN SYSTEMS",
          "WORDPRESS & CMS MANAGEMENT",
          "BLAZING FAST & FULLY RESPONSIVE",
        ];

  const contentItems = items || defaultItems;

  const bgStyles = {
    primary: "bg-primary text-primary-foreground border-y-2 border-black/10",
    dark: "bg-ink text-ink-foreground border-y border-white/10",
    outline: "bg-surface text-foreground border-y border-border",
  };

  const animationClass = reverse
    ? "animate-marquee-reverse"
    : speed === "fast"
    ? "animate-marquee-fast"
    : "animate-marquee";

  return (
    <div
      className={`relative w-full overflow-hidden py-3.5 sm:py-4 select-none ${bgStyles[variant]} ${className}`}
      aria-label="Scrolling Highlights Ticker"
    >
      <div className={`flex w-max items-center gap-6 sm:gap-8 ${animationClass} pause-hover`}>
        {/* Render twice for seamless loop */}
        {[...contentItems, ...contentItems].map((item, index) => (
          <div
            key={`${item}-${index}`}
            className="flex items-center gap-3 sm:gap-4 shrink-0 text-xs sm:text-sm md:text-base font-extrabold tracking-wider uppercase"
          >
            <span>{item}</span>
            <span
              className={`inline-flex h-2 w-2 rounded-full ${
                variant === "primary"
                  ? "bg-white"
                  : variant === "dark"
                  ? "bg-primary"
                  : "bg-primary"
              }`}
              aria-hidden="true"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function RotatingTextBadge() {
  const { language } = useLanguage();

  const titles =
    language === "fr"
      ? ["Designer UI/UX", "Développeur Web", "Spécialiste Figma", "Étudiant LBS"]
      : language === "de"
      ? ["UI/UX Designer", "Webentwickler", "Figma-Spezialist", "LBS-Student"]
      : ["UI/UX Designer", "Web Developer", "Figma Specialist", "LBS Student"];

  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-1.5 text-xs sm:text-sm font-bold text-primary">
      <Sparkles className="h-4 w-4 animate-spin text-primary shrink-0" style={{ animationDuration: "6s" }} />
      <span className="truncate">{titles[0]} • {titles[1]}</span>
    </div>
  );
}
