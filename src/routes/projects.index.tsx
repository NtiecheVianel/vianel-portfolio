import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Github } from "lucide-react";
import { useState } from "react";
import { PageHeader } from "@/components/site/PageHeader";
import { MovingTicker } from "@/components/site/MovingTicker";
import { projectCategories } from "@/data/content";
import { useLanguage, getLocalizedProjects } from "@/lib/i18n";
import { useProjects } from "@/lib/portfolio-store";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title: "Projects — Vianel TIAGUE NTIECHE" },
      {
        name: "description",
        content:
          "Selected UI/UX designs (TdE, Figma systems), marketplace web applications (Onomamarket), and statistics tools by Vianel TIAGUE NTIECHE.",
      },
      { property: "og:title", content: "Projects — Vianel TIAGUE NTIECHE" },
      {
        property: "og:description",
        content: "A filterable portfolio of web, design and application projects.",
      },
    ],
  }),
  component: Projects,
});

function Projects() {
  const { language, t } = useLanguage();
  const [active, setActive] = useState("All");
  const { projects: storedProjects, isMounted } = useProjects();

  const localizedDefaults = getLocalizedProjects(language);

  // Combine stored projects with localized labels when available
  const allProjects = (isMounted ? storedProjects : localizedDefaults).map((p) => {
    const locMatch = localizedDefaults.find((ld) => ld.slug === p.slug);
    if (!locMatch) return p;
    return {
      ...p,
      // If user customized title/excerpt/description, keep it, otherwise localized version
      title: p.title === localizedDefaults.find(d => d.slug === p.slug)?.title || p.title === defaultProjectsTitle(p.slug) ? locMatch.title : p.title,
      category: p.category,
      excerpt: locMatch.excerpt || p.excerpt,
    };
  });

  function defaultProjectsTitle(slug: string) {
    return localizedDefaults.find(d => d.slug === slug)?.title || "";
  }

  const filtered = active === "All" ? allProjects : allProjects.filter((p) => p.category === active);

  return (
    <div className="pb-20">
      <PageHeader eyebrow={t.projectsPage.eyebrow} title={t.projectsPage.title} highlight={t.projectsPage.titleHighlight}>
        {t.projectsPage.subtitle}
      </PageHeader>

      {/* Moving Text Ribbon */}
      <div className="mt-8">
        <MovingTicker variant="dark" speed="normal" />
      </div>

      <section className="mx-auto mt-12 max-w-[1240px] px-4">
        <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3 overflow-x-auto no-scrollbar py-2" role="tablist" aria-label="Project categories">
          {projectCategories.map((category) => (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={active === category}
              onClick={() => setActive(category)}
              className={`rounded-full px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold transition-all hover:-translate-y-0.5 shadow-sm ${
                active === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-surface text-foreground"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <article key={project.slug} className="card-soft group flex flex-col overflow-hidden">
              <Link to="/projects/$slug" params={{ slug: project.slug }} className="block">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  width={1024}
                  height={768}
                  className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </Link>
              <div className="flex flex-1 flex-col p-6">
                <span className="w-fit rounded-full bg-muted px-4 py-1 text-xs font-semibold">
                  {project.category}
                </span>
                <h2 className="mt-3 text-lg font-bold">
                  <Link
                    to="/projects/$slug"
                    params={{ slug: project.slug }}
                    className="hover:text-primary"
                  >
                    {project.title}
                  </Link>
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">{project.excerpt}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <li key={tech} className="rounded-full bg-muted px-3 py-1 text-xs">
                      {tech}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap gap-3 pt-2">
                  <Link
                    to="/projects/$slug"
                    params={{ slug: project.slug }}
                    className="pill-black inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium"
                  >
                    {t.projectsPage.viewProject} <ArrowUpRight className="h-4 w-4" />
                  </Link>
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="pill-outline inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium"
                    >
                      <Github className="h-4 w-4" /> {t.projectsPage.github}
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-12 text-center text-muted-foreground">
            {t.projectsPage.noProjects}
          </p>
        )}
      </section>
    </div>
  );
}
