import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeToggle } from "./ThemeToggle";
import { useLanguage } from "@/lib/i18n";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      to="/"
      onClick={() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      className="flex shrink-0 items-center gap-1 group select-none whitespace-nowrap"
      aria-label="Vianel home"
    >
      <span
        className={`font-black tracking-tight text-foreground transition-all duration-300 group-hover:text-primary ${
          compact ? "text-xl sm:text-2xl" : "text-2xl sm:text-3xl"
        }`}
      >
        Vianel<span className="text-primary">.</span>
      </span>
    </Link>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [isCompact, setIsCompact] = useState(false);
  const lastScrollYRef = useRef(0);
  const tickingRef = useRef(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      if (!tickingRef.current) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const delta = currentScrollY - lastScrollYRef.current;

          // Always expand at the top
          if (currentScrollY <= 80) {
            setIsCompact(false);
          } else if (delta > 10 && currentScrollY > 120) {
            // Significant scroll DOWN -> compact
            if (!open) {
              setIsCompact(true);
            }
          } else if (delta < -10) {
            // Significant scroll UP -> expand
            setIsCompact(false);
          }

          lastScrollYRef.current = currentScrollY;
          tickingRef.current = false;
        });
        tickingRef.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [open]);

  const navLinks = [
    { to: "/", label: t.nav.home },
    { to: "/services", label: t.nav.services },
    { to: "/about", label: t.nav.about },
    { to: "/projects", label: t.nav.projects },
    { to: "/blogs", label: t.nav.blogs },
    { to: "/testimonials", label: t.nav.testimonials },
  ] as const;

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4 transition-all duration-300 pointer-events-auto">
      <nav
        aria-label="Main navigation"
        className={`relative mx-auto rounded-full bg-surface/95 border border-border/80 backdrop-blur-md shadow-pill transition-all duration-500 ease-out ${
          isCompact
            ? "max-w-[140px] sm:max-w-[160px] px-4 py-2 hover:scale-105 hover:border-primary/60 cursor-pointer shadow-lg"
            : "max-w-[1240px] px-4 py-3 sm:px-6"
        }`}
        onClick={() => {
          if (isCompact) {
            setIsCompact(false);
          }
        }}
      >
        <div className="flex items-center justify-between w-full">
          {/* Logo is always mounted without flickering */}
          <div className={`${isCompact ? "w-full flex items-center justify-center py-0.5" : "flex shrink-0"}`}>
            <Logo compact={isCompact} />
          </div>

          {/* Expanded elements smoothly hidden on compact */}
          {!isCompact && (
            <>
              <ul className="hidden items-center gap-6 text-[15px] font-medium lg:flex ml-8">
                {navLinks.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      activeOptions={{ exact: link.to === "/" }}
                      className="pb-1 transition-colors hover:text-primary data-[status=active]:border-b-2 data-[status=active]:border-primary data-[status=active]:text-primary whitespace-nowrap"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-2 sm:gap-3 ml-auto">
                <LanguageSwitcher className="hidden sm:inline-flex" />
                <ThemeToggle className="inline-flex" />

                <Link
                  to="/contact"
                  className="pill-black hidden px-6 py-2.5 text-sm font-medium md:inline-block whitespace-nowrap"
                >
                  {t.nav.contactMe}
                </Link>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpen((v) => !v);
                  }}
                  aria-expanded={open}
                  aria-label={open ? "Close menu" : "Open menu"}
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ink text-foreground border border-border lg:hidden transition-transform hover:scale-105"
                >
                  {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
              </div>
            </>
          )}
        </div>

        {/* Mobile menu drawer */}
        {!isCompact && open && (
          <div className="animate-rise mt-4 grid gap-3 border-t border-border pt-4 lg:hidden">
            <ul className="grid gap-1">
              {[...navLinks, { to: "/contact", label: t.nav.contactMe } as const].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    activeOptions={{ exact: link.to === "/" }}
                    onClick={() => setOpen(false)}
                    className="block rounded-full px-4 py-3 font-medium transition-colors hover:bg-muted data-[status=active]:bg-primary data-[status=active]:text-primary-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex items-center justify-between rounded-2xl bg-muted/60 px-4 py-3">
              <span className="text-xs font-semibold text-muted-foreground">{t.nav.chooseLanguage}</span>
              <div className="flex items-center gap-2">
                <ThemeToggle size="sm" />
                <LanguageSwitcher size="sm" />
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
