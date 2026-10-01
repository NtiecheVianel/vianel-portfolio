import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Check, Github } from "lucide-react";
import { projects } from "@/data/content";
import { useLanguage, getLocalizedProjects } from "@/lib/i18n";
import { useProjects, getStoredProjects } from "@/lib/portfolio-store";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const all = getStoredProjects();
    const project = all.find((p) => p.slug === params.slug) || projects.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    return { title: project.title, excerpt: project.excerpt };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Project not found — Vianel." }, { name: "robots", content: "noindex" }],
      };
    }
    return {
      meta: [
        { title: `${loaderData.title} — Projects | Vianel TIAGUE NTIECHE` },
        { name: "description", content: loaderData.excerpt },
        { property: "og:title", content: `${loaderData.title} — Projects | Vianel TIAGUE NTIECHE` },
        { property: "og:description", content: loaderData.excerpt },
      ],
    };
  },
  notFoundComponent: ProjectNotFound,
  component: ProjectDetail,
});

function ProjectNotFound() {
  const { t } = useLanguage();

  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="text-4xl">Project not found</h1>
      <p className="mt-3 text-muted-foreground">This project doesn't exist or has been removed.</p>
      <Link to="/projects" className="pill-black mt-8 inline-block px-7 py-3 font-medium">
        {t.projectsPage.allProjectsBack}
      </Link>
    </div>
  );
}

function ProjectDetail() {
  const { slug } = Route.useParams();
  const { language, t } = useLanguage();
  const { projects: storedProjects } = useProjects();
  const localizedProjects = getLocalizedProjects(language);
  const storedMatch = storedProjects.find((p) => p.slug === slug);
  const localizedMatch = localizedProjects.find((p) => p.slug === slug);
  const project = storedMatch || localizedMatch || projects.find((p) => p.slug === slug);

  if (!project) {
    return <ProjectNotFound />;
  }

  return (
    <article className="mx-auto max-w-[1000px] px-4 pb-20 pt-12">
      <Link
        to="/projects"
        className="inline-flex items-center gap-2 text-sm font-semibold hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" /> {t.projectsPage.allProjectsBack}
      </Link>

      <header className="mt-6">
        <span className="rounded-full bg-primary px-4 py-1 text-xs font-semibold text-primary-foreground">
          {project.category}
        </span>
        <h1 className="mt-4 text-4xl sm:text-5xl">{project.title}</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{project.excerpt}</p>
      </header>

      <img
        src={project.image}
        alt={project.title}
        width={1024}
        height={768}
        className="mt-8 aspect-[4/3] w-full rounded-[2rem] object-cover shadow-card sm:aspect-[16/9]"
      />

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
        <div>
          <h2 className="text-2xl">{t.projectsPage.aboutProject}</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">{project.description}</p>

          <h2 className="mt-10 text-2xl">{t.projectsPage.keyFeatures}</h2>
          <ul className="mt-4 grid gap-3">
            {project.features.map((feature) => (
              <li key={feature} className="flex gap-3 text-muted-foreground">
                <Check className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <aside className="card-soft h-fit p-8">
          <h2 className="text-lg font-bold">{t.projectsPage.technologies}</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <li
                key={tech}
                className="rounded-full bg-ink px-4 py-2 text-xs font-medium text-ink-foreground"
              >
                {tech}
              </li>
            ))}
          </ul>

          <div className="mt-8 grid gap-3">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="pill-red px-6 py-3 text-center text-sm font-medium"
              >
                {t.projectsPage.visitProject}
              </a>
            ) : (
              <p className="text-xs text-muted-foreground">
                {t.projectsPage.privateNotice}
              </p>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="pill-outline inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium"
              >
                <Github className="h-4 w-4" /> {t.projectsPage.github}
              </a>
            )}
            <Link to="/contact" className="pill-black px-6 py-3 text-center text-sm font-medium">
              {t.projectsPage.startSimilar}
            </Link>
          </div>
        </aside>
      </div>
    </article>
  );
}
