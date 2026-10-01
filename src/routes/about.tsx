import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Briefcase,
  Calendar,
  CheckCircle2,
  GraduationCap,
  MapPin,
  Award,
  Download,
  FileText,
  HeartHandshake,
  UserCheck,
  Eye,
  Phone,
  ArrowDownToLine,
} from "lucide-react";
import { Hero } from "@/components/site/Hero";
import { MovingTicker } from "@/components/site/MovingTicker";
import { profile } from "@/data/content";
import {
  useLanguage,
  getLocalizedExperiences,
  getLocalizedVolunteering,
  getLocalizedReferences,
  getLocalizedEducation,
  getLocalizedCertifications,
  getLocalizedSkillGroups,
} from "@/lib/i18n";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About & CV — Vianel TIAGUE NTIECHE" },
      {
        name: "description",
        content:
          "About & CV of Vianel TIAGUE NTIECHE: UI/UX Designer & Web Developer based in Lomé, Togo. Experience at Société Togolaise des Eaux (TdE), ONOMA, and Lomé Business School.",
      },
      { property: "og:title", content: "About & CV — Vianel TIAGUE NTIECHE" },
      {
        property: "og:description",
        content: "Experience, education, approach, technical skills and downloadable CV of Vianel TIAGUE NTIECHE in Togo.",
      },
    ],
  }),
  component: About,
});

function About() {
  const { language, t } = useLanguage();

  const localizedExperiences = getLocalizedExperiences(language);
  const localizedVolunteering = getLocalizedVolunteering(language);
  const localizedReferences = getLocalizedReferences(language);
  const localizedEducation = getLocalizedEducation(language);
  const localizedCertifications = getLocalizedCertifications(language);
  const localizedSkillGroups = getLocalizedSkillGroups(language);

  return (
    <div className="pb-20">
      <Hero />

      {/* CV Download Section */}
      <section className="mx-auto mt-20 max-w-[1240px] px-4" id="download-cv">
        <div className="rounded-3xl border-2 border-primary/20 bg-card p-8 sm:p-12 shadow-lg">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="max-w-2xl">
              <p className="flex items-center gap-3 font-semibold text-primary">
                <span className="h-[3px] w-8 rounded-full bg-primary" aria-hidden />
                {t.about.cvDownloadEyebrow}
              </p>
              <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold">
                {t.about.cvDownloadTitle}{" "}
                <span className="text-primary">{t.about.cvDownloadHighlight}</span>
              </h2>
              <p className="mt-3 text-base text-muted-foreground leading-relaxed">
                {t.about.cvDownloadSubtitle}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              {/* French CV Card */}
              <div className="card-soft border border-border/80 p-5 flex flex-col justify-between gap-4 rounded-2xl min-w-[280px]">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                      <FileText className="h-5 w-5" />
                    </span>
                    <div>
                      <h4 className="font-bold text-sm">CV — Français</h4>
                      <p className="text-xs text-muted-foreground">PDF • Format A4</p>
                    </div>
                  </div>
                  <span className="text-xl" title="Français">🇫🇷</span>
                </div>
                <div className="flex gap-2">
                  <a
                    href="/cv-vianel-tiague-ntieche-fr.pdf"
                    download="CV_Vianel_TIAGUE_NTIECHE_FR.pdf"
                    className="pill-red flex-1 py-2.5 px-4 text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <ArrowDownToLine className="h-4 w-4" />
                    <span>{language === "fr" ? "Télécharger" : "Download FR"}</span>
                  </a>
                  <a
                    href="/cv-vianel-tiague-ntieche-fr.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="pill-outline py-2.5 px-3 text-xs font-semibold flex items-center justify-center gap-1"
                    title="Ouvrir dans un nouvel onglet"
                  >
                    <Eye className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>

              {/* English CV Card */}
              <div className="card-soft border border-border/80 p-5 flex flex-col justify-between gap-4 rounded-2xl min-w-[280px]">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                      <FileText className="h-5 w-5" />
                    </span>
                    <div>
                      <h4 className="font-bold text-sm">CV — English</h4>
                      <p className="text-xs text-muted-foreground">PDF • A4 Format</p>
                    </div>
                  </div>
                  <span className="text-xl" title="English">🇬🇧</span>
                </div>
                <div className="flex gap-2">
                  <a
                    href="/cv-vianel-tiague-ntieche-en.pdf"
                    download="CV_Vianel_TIAGUE_NTIECHE_EN.pdf"
                    className="pill-black flex-1 py-2.5 px-4 text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <ArrowDownToLine className="h-4 w-4" />
                    <span>{language === "fr" ? "Télécharger EN" : "Download EN"}</span>
                  </a>
                  <a
                    href="/cv-vianel-tiague-ntieche-en.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="pill-outline py-2.5 px-3 text-xs font-semibold flex items-center justify-center gap-1"
                    title="Open in new tab"
                  >
                    <Eye className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Summary Cards */}
      <section className="mx-auto mt-24 max-w-[1240px] px-4">
        <p className="flex items-center gap-3 font-semibold">
          <span className="h-[3px] w-8 rounded-full bg-primary" aria-hidden />
          {t.about.eyebrow}
        </p>
        <h2 className="mt-2 max-w-2xl text-3xl sm:text-5xl">
          {t.about.title} <span className="text-primary">{t.about.titleHighlight}</span>
          {t.about.titleAnd}{" "}
          <span className="text-primary">{t.about.titleDeliver}</span>
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {t.about.blocks.map((block) => (
            <article key={block.title} className="card-soft p-8">
              <h3 className="text-xl font-bold">{block.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{block.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Professional Experience Section */}
      <section className="mx-auto mt-24 max-w-[1240px] px-4">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="flex items-center gap-3 font-semibold">
              <span className="h-[3px] w-8 rounded-full bg-primary" aria-hidden />
              {t.about.journeyEyebrow}
            </p>
            <h2 className="mt-2 text-3xl sm:text-5xl">
              {t.about.journeyTitle} <span className="text-primary">{t.about.journeyHighlight}</span>
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="/cv-vianel-tiague-ntieche-fr.pdf"
              download="CV_Vianel_TIAGUE_NTIECHE_FR.pdf"
              className="pill-outline px-5 py-2.5 text-xs font-medium inline-flex items-center gap-2"
            >
              <Download className="h-3.5 w-3.5 text-primary" />
              <span>CV (FR)</span>
            </a>
            <a
              href="/cv-vianel-tiague-ntieche-en.pdf"
              download="CV_Vianel_TIAGUE_NTIECHE_EN.pdf"
              className="pill-outline px-5 py-2.5 text-xs font-medium inline-flex items-center gap-2"
            >
              <Download className="h-3.5 w-3.5 text-primary" />
              <span>CV (EN)</span>
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="pill-black px-6 py-2.5 text-xs font-medium"
            >
              {t.about.getInTouch}
            </a>
          </div>
        </div>

        <div className="mt-10 grid gap-8">
          {localizedExperiences.map((exp) => (
            <article
              key={exp.id}
              className="card-soft border border-border/50 p-8 sm:p-10 transition-all hover:border-primary/40"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-primary">
                      <Briefcase className="h-5 w-5 text-primary" />
                    </span>
                    <div>
                      <h3 className="text-2xl font-extrabold">{exp.role}</h3>
                      <p className="text-base font-semibold text-primary">{exp.company}</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-muted-foreground sm:text-right">
                  <span className="flex items-center gap-1.5 rounded-full bg-muted px-3.5 py-1.5">
                    <Calendar className="h-3.5 w-3.5 text-primary" />
                    {exp.period}
                  </span>
                  <span className="flex items-center gap-1.5 rounded-full bg-muted px-3.5 py-1.5">
                    <MapPin className="h-3.5 w-3.5 text-primary" />
                    {exp.location}
                  </span>
                  <span className="rounded-full bg-ink px-3.5 py-1.5 text-ink-foreground">
                    {exp.type}
                  </span>
                </div>
              </div>

              <p className="mt-5 text-sm leading-relaxed text-foreground font-medium">
                {exp.description}
              </p>

              <div className="mt-4 grid gap-2.5">
                {exp.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-2 border-t border-border/60 pt-4">
                {exp.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-muted px-3.5 py-1 text-xs font-medium text-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Moving Text Banner */}
      <div className="mt-20">
        <MovingTicker variant="primary" speed="fast" />
      </div>

      {/* Volunteering & Leadership Section */}
      <section className="mx-auto mt-20 max-w-[1240px] px-4">
        <p className="flex items-center gap-3 font-semibold">
          <span className="h-[3px] w-8 rounded-full bg-primary" aria-hidden />
          {t.about.volunteeringEyebrow}
        </p>
        <h2 className="mt-2 text-3xl sm:text-5xl">
          {t.about.volunteeringTitle} <span className="text-primary">{t.about.volunteeringHighlight}</span>
        </h2>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {localizedVolunteering.map((vol) => (
            <article key={vol.id} className="card-soft p-8">
              <div className="flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-primary/10 text-primary">
                  <HeartHandshake className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="text-xl font-bold">{vol.role}</h3>
                  <p className="text-sm font-semibold text-primary">{vol.organization}</p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted-foreground">
                <span className="rounded-full bg-muted px-3 py-1 font-medium">{vol.period}</span>
                <span className="rounded-full bg-muted px-3 py-1 font-medium">{vol.location}</span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {vol.description}
              </p>
              <div className="mt-4 grid gap-2">
                {vol.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Education & Academic Reference Section */}
      <section className="mx-auto mt-24 max-w-[1240px] px-4">
        <p className="flex items-center gap-3 font-semibold">
          <span className="h-[3px] w-8 rounded-full bg-primary" aria-hidden />
          {t.about.academicsEyebrow}
        </p>
        <h2 className="mt-2 text-3xl sm:text-5xl">
          {t.about.academicsTitle} <span className="text-primary">{t.about.academicsHighlight}</span>
        </h2>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {localizedEducation.map((edu) => (
            <article key={edu.degree} className="card-soft p-8">
              <div className="flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-foreground">
                  <GraduationCap className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="text-xl font-bold">{edu.degree}</h3>
                  <p className="text-sm font-semibold text-primary">{edu.institution}</p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted-foreground">
                <span className="rounded-full bg-muted px-3 py-1 font-medium">{edu.period}</span>
                <span className="rounded-full bg-muted px-3 py-1 font-medium">{edu.location}</span>
                <span className="rounded-full bg-ink px-3 py-1 font-medium text-ink-foreground">
                  {edu.role}
                </span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {edu.description}
              </p>
            </article>
          ))}
        </div>

        {/* Academic Reference & Certifications */}
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          {localizedReferences.map((ref) => (
            <article key={ref.name} className="card-soft p-6 flex items-start gap-4 border border-primary/20">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                <UserCheck className="h-6 w-6" />
              </span>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                  {t.about.referencesTitle} {t.about.referencesHighlight}
                </span>
                <h4 className="text-base font-bold mt-0.5">{ref.name}</h4>
                <p className="text-xs font-semibold text-muted-foreground">{ref.title}</p>
                <p className="text-xs text-muted-foreground">{ref.institution} • {ref.location}</p>
                <a
                  href={`tel:${ref.phone.replace(/\s/g, "")}`}
                  className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
                >
                  <Phone className="h-3 w-3" />
                  <span>{ref.phone}</span>
                </a>
              </div>
            </article>
          ))}

          {localizedCertifications.map((cert) => (
            <article key={cert.title} className="card-soft p-6 flex items-start gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-ink text-primary">
                <Award className="h-6 w-6" />
              </span>
              <div>
                <h4 className="text-base font-bold">{cert.title}</h4>
                <p className="text-xs font-semibold text-primary">{cert.issuer} • {cert.year}</p>
                <p className="mt-1 text-xs text-muted-foreground">{cert.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Skills & Tools */}
      <section className="mx-auto mt-24 max-w-[1240px] px-4">
        <h2 className="text-3xl sm:text-5xl">
          {t.about.skillsTitle} <span className="text-primary">{t.about.skillsHighlight}</span>
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {localizedSkillGroups.map((group) => (
            <article key={group.title} className="card-soft p-8">
              <h3 className="text-lg font-bold text-foreground">{group.title}</h3>
              <ul className="mt-5 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full bg-muted border border-border px-3.5 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* CTA Box */}
      <section className="mx-auto mt-24 max-w-[1240px] px-4">
        <div className="rounded-[2.5rem] bg-surface border border-border px-6 py-14 text-center text-foreground shadow-card sm:px-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold">
            {t.about.ctaTitle} <span className="text-primary">{t.about.ctaHighlight}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground">
            {t.about.ctaDesc}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href={language === "fr" ? "/cv-vianel-tiague-ntieche-fr.pdf" : "/cv-vianel-tiague-ntieche-en.pdf"}
              download
              className="pill-red px-8 py-4 font-semibold inline-flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              <span>{language === "fr" ? "Télécharger mon CV (PDF)" : "Download my CV (PDF)"}</span>
            </a>
            <Link to="/contact" className="pill-outline px-8 py-4 font-semibold">
              {t.about.ctaContact}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
