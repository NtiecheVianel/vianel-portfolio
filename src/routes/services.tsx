import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Code2, Compass, Layers, PenTool, RefreshCw, Terminal } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { MovingTicker } from "@/components/site/MovingTicker";
import { useLanguage, getLocalizedServices } from "@/lib/i18n";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Vianel TIAGUE NTIECHE" },
      {
        name: "description",
        content:
          "UI/UX Design, Website Redesign (Refonte Web), Web & Full-Stack Development, Statistics & Reporting Dashboards, and Digital Solutions by Vianel TIAGUE NTIECHE.",
      },
      { property: "og:title", content: "Services — Vianel TIAGUE NTIECHE" },
      {
        property: "og:description",
        content: "Six services covering design, development and technical guidance for your project.",
      },
    ],
  }),
  component: Services,
});

const icons: Record<string, typeof Code2> = {
  code: Code2,
  pen: PenTool,
  refresh: RefreshCw,
  terminal: Terminal,
  layers: Layers,
  compass: Compass,
};

function Services() {
  const { language, t } = useLanguage();
  const localizedServices = getLocalizedServices(language);

  return (
    <div className="pb-20">
      <PageHeader eyebrow={t.servicesPage.eyebrow} title={t.servicesPage.title} highlight={t.servicesPage.titleHighlight}>
        {t.servicesPage.subtitle}
      </PageHeader>

      <section className="mx-auto mt-14 max-w-[1240px] px-4">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {localizedServices.map((service) => {
            const Icon = icons[service.icon] ?? Code2;
            return (
              <article key={service.slug} className="card-soft flex flex-col p-6 sm:p-8">
                <span className="grid h-12 w-12 sm:h-14 sm:w-14 place-items-center rounded-full bg-primary text-primary-foreground">
                  <Icon className="h-6 w-6" />
                </span>
                <h2 className="mt-5 sm:mt-6 text-xl font-bold">{service.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
                <ul className="mt-5 grid flex-1 gap-2.5">
                  {service.details.map((detail) => (
                    <li key={detail} className="flex gap-2 text-xs sm:text-sm text-muted-foreground">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className="pill-black mt-7 inline-block px-6 py-3 text-center text-sm font-semibold w-full"
                >
                  {t.servicesPage.discuss}
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      {/* Moving Text Banner */}
      <div className="mt-20">
        <MovingTicker variant="outline" speed="normal" />
      </div>

      <section className="mx-auto mt-20 max-w-[1240px] px-4">
        <h2 className="text-3xl sm:text-5xl">
          {t.servicesPage.workflowTitle} <span className="text-primary">{t.servicesPage.workflowHighlight}</span>
        </h2>
        <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.servicesPage.steps.map((item) => (
            <li key={item.step} className="card-soft p-6 sm:p-8">
              <span className="text-3xl font-extrabold text-primary">{item.step}</span>
              <h3 className="mt-3 text-lg font-bold">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.text}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
