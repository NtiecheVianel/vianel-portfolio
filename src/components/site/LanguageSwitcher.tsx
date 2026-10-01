import { Globe, ChevronDown, Check } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { languages, useLanguage, type Language } from "@/lib/i18n";

export function LanguageSwitcher({
  className = "",
  size = "md",
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const { language, setLanguage, isMounted } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = languages.find((l) => l.code === language) ?? languages[0] ?? { code: "en" as const, label: "English", flag: "🇬🇧" };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!isMounted) {
    return (
      <div className={`inline-flex items-center gap-1.5 rounded-full bg-surface border border-border px-3 py-1.5 text-xs font-semibold ${className}`}>
        <Globe className="h-3.5 w-3.5 text-primary" />
        <span>EN</span>
      </div>
    );
  }

  const btnPadding =
    size === "sm"
      ? "px-2.5 py-1 text-xs"
      : size === "lg"
      ? "px-4 py-2 text-sm"
      : "px-3 py-1.5 text-xs";

  return (
    <div className={`relative inline-block ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen((prev) => !prev);
        }}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Sélectionner la langue"
        className={`group inline-flex items-center gap-2 rounded-full bg-surface border border-border/80 ${btnPadding} font-bold text-foreground shadow-sm transition-all duration-300 hover:border-primary/60 hover:shadow-md hover:scale-[1.03] active:scale-95 cursor-pointer select-none`}
      >
        <span className="relative flex h-5 w-5 items-center justify-center">
          <Globe className={`h-4 w-4 text-primary transition-transform duration-500 ease-out ${isOpen ? "rotate-180 scale-110" : "group-hover:rotate-45"}`} />
        </span>
        <span className="flex items-center gap-1 font-extrabold uppercase tracking-wider text-xs">
          <span>{currentLang.flag}</span>
          <span>{currentLang.code}</span>
        </span>
        <ChevronDown
          className={`h-3 w-3 text-muted-foreground transition-transform duration-300 ${
            isOpen ? "rotate-180 text-primary" : ""
          }`}
        />
      </button>

      {/* Animated Floating Dropdown */}
      {isOpen && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="animate-rise absolute right-0 mt-2 w-48 origin-top-right rounded-2xl border border-border/80 bg-surface/98 p-1.5 shadow-2xl backdrop-blur-xl z-50"
        >
          <div className="px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground border-b border-border/50">
            Langue / Language
          </div>
          <div className="mt-1 flex flex-col gap-1">
            {languages.map((lang) => {
              const active = language === lang.code;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLanguage(lang.code);
                    setIsOpen(false);
                  }}
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold transition-all duration-200 cursor-pointer ${
                    active
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-foreground hover:bg-muted hover:translate-x-1"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <span className="text-base leading-none">{lang.flag}</span>
                    <span className="capitalize font-bold">{lang.nativeLabel}</span>
                  </span>
                  {active && <Check className="h-4 w-4" strokeWidth={3} />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

