import { createFileRoute } from "@tanstack/react-router";
import { Calendar, Clock } from "lucide-react";
import { useState } from "react";
import { PageHeader } from "@/components/site/PageHeader";
import { MovingTicker } from "@/components/site/MovingTicker";
import { postCategories } from "@/data/content";
import { useLanguage, getLocalizedPosts } from "@/lib/i18n";
import { usePosts } from "@/lib/portfolio-store";

export const Route = createFileRoute("/blogs")({
  head: () => ({
    meta: [
      { title: "Blogs & Articles — Vianel TIAGUE NTIECHE" },
      {
        name: "description",
        content:
          "Articles and case studies on UI/UX design, web development, Togo utility redesigns, and anti-scam platform architecture by Vianel TIAGUE NTIECHE.",
      },
      { property: "og:title", content: "Blogs & Articles — Vianel TIAGUE NTIECHE" },
      {
        property: "og:description",
        content: "Thoughts, design breakdowns, and technical articles by Vianel TIAGUE NTIECHE.",
      },
    ],
  }),
  component: Blogs,
});

function Blogs() {
  const { language, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("All");
  const { posts: storedPosts, isMounted } = usePosts();

  const localizedDefaults = getLocalizedPosts(language);
  const postsList = (isMounted ? storedPosts : localizedDefaults).map((p) => {
    const locMatch = localizedDefaults.find((ld) => ld.slug === p.slug);
    if (!locMatch) return p;
    return {
      ...p,
      title: p.title,
      excerpt: locMatch.excerpt || p.excerpt,
      body: Array.isArray(p.body) ? p.body : locMatch.body,
    };
  });

  const filteredPosts =
    activeCategory === "All"
      ? postsList
      : postsList.filter((p) => p.category === activeCategory);

  return (
    <div className="pb-20">
      <PageHeader eyebrow={t.blogsPage.eyebrow} title={t.blogsPage.title} highlight={t.blogsPage.titleHighlight}>
        {t.blogsPage.subtitle}
      </PageHeader>

      {/* Moving Text Ribbon */}
      <div className="mt-8">
        <MovingTicker variant="primary" speed="normal" />
      </div>

      <section className="mx-auto mt-12 max-w-[1240px] px-4">
        <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3 overflow-x-auto no-scrollbar py-2" role="tablist">
          {postCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold transition-all hover:-translate-y-0.5 shadow-sm ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-surface text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {filteredPosts.map((post) => (
            <article
              key={post.slug}
              className="card-soft flex flex-col overflow-hidden transition hover:border-primary/40"
            >
              <img
                src={post.image}
                alt={post.title}
                loading="lazy"
                width={800}
                height={500}
                className="h-56 w-full object-cover"
              />
              <div className="flex flex-1 flex-col p-8">
                <div className="flex items-center gap-4 text-xs font-semibold text-muted-foreground">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-primary">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 text-primary" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-primary" />
                    {post.readTime}
                  </span>
                </div>

                <h2 className="mt-4 text-2xl font-bold leading-snug">{post.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {post.excerpt}
                </p>

                <div className="mt-6 border-t border-border pt-4">
                  {post.body.map((para, i) => (
                    <p key={i} className="mb-3 text-xs leading-relaxed text-muted-foreground">
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
