import { Link } from "@tanstack/react-router";
import { Logo } from "./Navbar";
import { Socials } from "./Socials";
import { useProfile } from "@/lib/portfolio-store";
import { useLanguage } from "@/lib/i18n";

export function Footer() {
  const { t } = useLanguage();
  const { profile } = useProfile();

  const navLinks = [
    { to: "/", label: t.nav.home },
    { to: "/about", label: t.nav.about },
    { to: "/services", label: t.nav.services },
    { to: "/projects", label: t.nav.projects },
    { to: "/blogs", label: t.nav.blogs },
    { to: "/testimonials", label: t.nav.testimonials },
    { to: "/contact", label: t.nav.contact },
  ] as const;

  return (
    <footer className="px-3 pb-6 sm:px-6">
      <div className="mx-auto max-w-[1240px] rounded-[2.5rem] bg-surface px-6 py-12 shadow-card sm:px-12">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="min-w-0">
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {t.footer.bio}
            </p>
            <Socials className="mt-6" />
          </div>

          <nav aria-label="Footer navigation">
            <h2 className="text-sm font-bold uppercase tracking-widest text-primary">{t.footer.navTitle}</h2>
            <ul className="mt-4 grid gap-2 text-sm">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-widest text-primary">{t.footer.contactTitle}</h2>
            <ul className="mt-4 grid gap-2 text-sm text-muted-foreground">
              <li>
                <a className="transition-colors hover:text-primary break-all" href={`mailto:${profile.email}`}>
                  {profile.email}
                </a>
              </li>
              <li>
                <a className="transition-colors hover:text-primary break-all text-xs" href={`mailto:${profile.schoolEmail}`}>
                  {profile.schoolEmail}
                </a>
              </li>
              <li>
                <a
                  className="transition-colors hover:text-primary"
                  href={`tel:${profile.phone.replace(/\s/g, "")}`}
                >
                  {profile.phone}
                </a>
              </li>
              <li>{profile.location}</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          <p className="text-center text-xs text-muted-foreground sm:text-left">
            {t.footer.copyright}
          </p>

          <p className="text-xs text-muted-foreground font-medium">
            Designed & Developed by <span className="text-foreground font-bold">Vianel TIAGUE N.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
