import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Briefcase, Code2, Compass, Layers, PenTool, RefreshCw, Terminal, Star, Quote, UserCheck } from "lucide-react";
import { HomeHero } from "@/components/site/HomeHero";
import { HomeCodeBackground } from "@/components/site/HomeCodeBackground";
import { MovingTicker } from "@/components/site/MovingTicker";
import { useTestimonials } from "@/lib/testimonials";
import {
  useLanguage,
  getLocalizedExperiences,
  getLocalizedServices,
  getLocalizedProjects,
} from "@/lib/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vianel TIAGUE NTIECHE — UI/UX Designer & Web Developer in Togo" },
      {
        name: "description",
        content:
          "Portfolio of Vianel TIAGUE NTIECHE, UI/UX Designer and Web Developer in Lomé, Togo. Specializing in website redesigns (TdE), marketplace platforms (Onomamarket), and statistics dashboards.",
      },
      { property: "og:title", content: "Vianel TIAGUE NTIECHE — UI/UX Designer & Web Developer in Togo" },
      {
        property: "og:description",
        content: "UI/UX design in Figma, full-stack web development, and digital solutions from Lomé, Togo.",
      },
    ],
  }),
  component: Home,
});

const icons: Record<string, typeof Code2> = {
  code: Code2,
  pen: PenTool,
  refresh: RefreshCw,
  terminal: Terminal,
  layers: Layers,
  compass: Compass,
};

function Home() {
  const { testimonials, isMounted } = useTestimonials();
  const { language, t } = useLanguage();

  const localizedExperiences = getLocalizedExperiences(language);
  const localizedServices = getLocalizedServices(language);
  const localizedProjects = getLocalizedProjects(language);

  return (
    <div className="relative pb-20 overflow-hidden">
      <HomeCodeBackground />
      <HomeHero />

      {/* Metrics Strip */}
      <section className="mx-auto mt-20 max-w-[1240px] px-4">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.home.stats.map((stat) => (
            <div key={stat.label} className="card-soft px-6 py-8 text-center">
              <p className="text-3xl sm:text-4xl font-extrabold text-primary">{stat.value}</p>
              <p className="mt-2 text-sm text-muted-foreground font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Experience Highlights */}
      <section className="mx-auto mt-24 max-w-[1240px] px-4">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="min-w-0">
            <p className="flex items-center gap-3 font-semibold text-primary text-sm uppercase tracking-wider">
              <span className="h-[3px] w-8 rounded-full bg-primary" aria-hidden />
              {t.home.impactEyebrow}
            </p>
            <h2 className="mt-2 text-3xl sm:text-5xl text-foreground font-extrabold">
              {t.home.impactTitle} <span className="text-primary">{t.home.impactHighlight}</span>
            </h2>
          </div>
          <Link to="/about" className="pill-black px-6 py-3 text-sm font-semibold inline-flex items-center gap-2">
            <UserCheck className="h-4 w-4" />
            <span>{t.home.viewResume}</span>
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {localizedExperiences.slice(0, 3).map((exp) => (
            <article key={exp.id} className="card-soft flex flex-col justify-between p-8">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-xs font-semibold text-primary">
                  <Briefcase className="h-3.5 w-3.5" />
                  {exp.period}
                </span>
                <h3 className="mt-4 text-xl font-bold text-foreground">{exp.role}</h3>
                <p className="mt-1 text-sm font-semibold text-primary">{exp.company}</p>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {exp.description}
                </p>
              </div>

              <div className="mt-6 border-t border-border pt-4">
                <div className="flex flex-wrap gap-1.5">
                  {exp.technologies.slice(0, 3).map((tech) => (
                    <span key={tech} className="rounded-full bg-muted border border-border/50 px-2.5 py-0.5 text-xs text-muted-foreground font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="mx-auto mt-24 max-w-[1240px] px-4">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="min-w-0">
            <p className="flex items-center gap-3 font-semibold text-primary text-sm uppercase tracking-wider">
              <span className="h-[3px] w-8 rounded-full bg-primary" aria-hidden />
              {t.home.servicesEyebrow}
            </p>
            <h2 className="mt-2 text-3xl sm:text-5xl text-foreground font-extrabold">
              {t.home.servicesTitle} <span className="text-primary">{t.home.servicesHighlight}</span>
            </h2>
          </div>
          <Link to="/services" className="pill-black px-6 py-3 text-sm font-semibold">
            {t.home.allServices}
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {localizedServices.slice(0, 3).map((service) => {
            const Icon = icons[service.icon] ?? Code2;
            return (
              <article key={service.slug} className="card-soft p-8 flex flex-col justify-between">
                <div>
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 border border-primary/20 text-primary">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-6 text-xl font-bold text-foreground">{service.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                </div>
                <Link
                  to="/services"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all"
                >
                  {t.home.learnMore} <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      {/* Selected Projects */}
      <section className="mx-auto mt-24 max-w-[1240px] px-4">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="min-w-0">
            <p className="flex items-center gap-3 font-semibold text-primary text-sm uppercase tracking-wider">
              <span className="h-[3px] w-8 rounded-full bg-primary" aria-hidden />
              {t.home.projectsEyebrow}
            </p>
            <h2 className="mt-2 text-3xl sm:text-5xl text-foreground font-extrabold">
              {t.home.projectsTitle} <span className="text-primary">{t.home.projectsHighlight}</span>
            </h2>
          </div>
          <Link to="/projects" className="pill-black px-6 py-3 text-sm font-semibold">
            {t.home.allProjects}
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {localizedProjects.slice(0, 3).map((project) => (
            <Link
              key={project.slug}
              to="/projects/$slug"
              params={{ slug: project.slug }}
              className="card-soft group overflow-hidden"
            >
              <div className="overflow-hidden h-52 bg-surface">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  width={1024}
                  height={768}
                  className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                />
              </div>
              <div className="p-6">
                <span className="rounded-full bg-muted border border-border px-3.5 py-1 text-xs font-semibold text-foreground">
                  {project.category}
                </span>
                <h3 className="mt-3 text-lg font-bold text-foreground group-hover:text-primary transition-colors">{project.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{project.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Moving Text Marquee */}
      <div className="mt-20">
        <MovingTicker variant="primary" reverse={true} speed="fast" />
      </div>

      {/* Testimonials Banner */}
      <section className="mx-auto mt-20 max-w-[1240px] px-4">
        <div className="rounded-[2.5rem] bg-surface border border-border p-8 sm:p-14 shadow-card">
          <div className="grid gap-10 lg:grid-cols-2 items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-primary mb-2">Témoignages & Avis</p>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground">
                {t.home.testimonialsTitle} <span className="text-primary">{t.home.testimonialsHighlight}</span>
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
                {t.home.testimonialsDesc}
              </p>
              <Link
                to="/testimonials"
                className="pill-red mt-8 inline-block px-7 py-3.5 text-sm font-semibold"
              >
                {isMounted && testimonials.length > 0 ? t.home.testimonialsBtn : t.home.testimonialsLeaveBtn}
              </Link>
            </div>

            <div className="grid gap-4">
              {isMounted && testimonials.length > 0 ? (
                testimonials.slice(0, 2).map((testi) => (
                  <figure key={testi.id} className="rounded-3xl bg-background border border-border p-6 text-foreground shadow-sm">
                    <div className="flex items-center gap-1 mb-2">
                      {Array.from({ length: testi.rating }).map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-primary text-primary" />
                      ))}
                    </div>
                    <blockquote className="text-sm leading-relaxed font-medium">"{testi.quote}"</blockquote>
                    <figcaption className="mt-4 flex items-center gap-3">
                      {testi.avatar ? (
                        <img
                          src={testi.avatar}
                          alt={testi.name}
                          width={40}
                          height={40}
                          className="h-10 w-10 shrink-0 rounded-full object-cover border border-border shadow-sm"
                        />
                      ) : (
                        <div className="grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground font-bold text-xs">
                          {testi.name.slice(0, 2).toUpperCase()}
                        </div>
                      )}
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-bold text-foreground">{testi.name}</span>
                        <span className="block truncate text-xs text-muted-foreground">
                          {testi.role} {testi.company ? `at ${testi.company}` : ""}
                        </span>
                      </span>
                    </figcaption>
                  </figure>
                ))
              ) : (
                <div className="rounded-3xl bg-background border border-border p-8 text-center">
                  <Quote className="h-8 w-8 text-primary mx-auto mb-3" />
                  <p className="text-base font-semibold text-foreground">{t.home.workedTogether}</p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {t.home.workedTogetherDesc}
                  </p>
                  <Link
                    to="/testimonials"
                    className="mt-5 inline-block text-xs font-bold text-primary hover:underline"
                  >
                    {t.home.writeReview}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
