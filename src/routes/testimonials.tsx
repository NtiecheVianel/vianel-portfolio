import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Star,
  Quote,
  Send,
  Building2,
  User,
  Phone,
  Briefcase,
  Sparkles,
  MessageSquarePlus,
  ShieldCheck,
  Calendar,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/site/PageHeader";
import { MovingTicker } from "@/components/site/MovingTicker";
import { useTestimonials } from "@/lib/testimonials";
import { useLanguage } from "@/lib/i18n";

export const Route = createFileRoute("/testimonials")({
  head: () => ({
    meta: [
      { title: "Testimonials & Reviews — Vianel TIAGUE NTIECHE" },
      {
        name: "description",
        content:
          "Read and submit feedback, reviews, and testimonials for Vianel TIAGUE NTIECHE on UI/UX design and web development projects.",
      },
      { property: "og:title", content: "Testimonials & Reviews — Vianel TIAGUE NTIECHE" },
      {
        property: "og:description",
        content: "Client reviews and interactive testimonial submission for Vianel TIAGUE NTIECHE.",
      },
    ],
  }),
  component: Testimonials,
});

function getInitials(name: string): string {
  if (!name) return "??";
  const parts = name.trim().split(/\s+/);
  const first = parts[0] ?? "";
  const last = parts[parts.length - 1] ?? "";
  if (parts.length === 1) return first.substring(0, 2).toUpperCase();
  return ((first[0] ?? "") + (last[0] ?? "")).toUpperCase() || "??";
}

function Testimonials() {
  const { t, language } = useLanguage();
  const { testimonials, isMounted, addTestimonial } = useTestimonials();

  const [form, setForm] = useState({
    name: "",
    role: "",
    company: "",
    phone: "",
    rating: 5,
    quote: "",
  });

  const [hoverRating, setHoverRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const ratingDescriptions: Record<string, Record<number, string>> = {
    en: {
      1: "1 Star — Poor",
      2: "2 Stars — Fair",
      3: "3 Stars — Good",
      4: "4 Stars — Very Good",
      5: "5 Stars — Exceptional!",
    },
    fr: {
      1: "1 Étoile — Faible",
      2: "2 Étoiles — Moyen",
      3: "3 Étoiles — Bon",
      4: "4 Étoiles — Très bon",
      5: "5 Étoiles — Exceptionnel !",
    },
    de: {
      1: "1 Stern — Mangelhaft",
      2: "2 Sterne — Ausreichend",
      3: "3 Sterne — Gut",
      4: "4 Sterne — Sehr gut",
      5: "5 Sterne — Hervorragend!",
    },
  };

  const currentRatingDesc = ratingDescriptions[language] ?? ratingDescriptions["en"] ?? {};

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim() || !form.role.trim() || !form.company.trim() || !form.phone.trim() || !form.quote.trim()) {
      toast.error(t.testimonialsPage.errorToast);
      return;
    }

    setSubmitting(true);

    try {
      addTestimonial({
        name: form.name.trim(),
        role: form.role.trim(),
        company: form.company.trim(),
        phone: form.phone.trim(),
        rating: form.rating,
        quote: form.quote.trim(),
      });

      toast.success(t.testimonialsPage.successToast);

      setForm({
        name: "",
        role: "",
        company: "",
        phone: "",
        rating: 5,
        quote: "",
      });
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while posting your testimonial. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pb-20">
      <PageHeader
        eyebrow={t.testimonialsPage.eyebrow}
        title={t.testimonialsPage.title}
        highlight={t.testimonialsPage.titleHighlight}
      >
        {t.testimonialsPage.subtitle}
      </PageHeader>

      {/* Moving Text Ribbon */}
      <div className="mt-8">
        <MovingTicker variant="dark" speed="normal" />
      </div>

      <section className="mx-auto mt-14 max-w-[1240px] px-4">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1.3fr]">
          {/* Left Column: Interactive Form */}
          <div>
            <div className="card-soft border border-border/60 p-8 sm:p-10 sticky top-24">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground">
                  <MessageSquarePlus className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="text-2xl font-bold">{t.testimonialsPage.formTitle}</h2>
                  <p className="text-xs text-muted-foreground">{t.testimonialsPage.formSubtitle}</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="mt-8 grid gap-5">
                {/* Name */}
                <div>
                  <label htmlFor="testi-name" className="block text-xs font-semibold uppercase text-muted-foreground mb-1.5">
                    {t.testimonialsPage.nameLabel}
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      id="testi-name"
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder={t.testimonialsPage.namePlaceholder}
                      className="w-full rounded-2xl border border-border bg-background pl-11 pr-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>

                {/* Role & Company */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="testi-role" className="block text-xs font-semibold uppercase text-muted-foreground mb-1.5">
                      {t.testimonialsPage.roleLabel}
                    </label>
                    <div className="relative">
                      <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        id="testi-role"
                        type="text"
                        required
                        value={form.role}
                        onChange={(e) => setForm({ ...form, role: e.target.value })}
                        placeholder={t.testimonialsPage.rolePlaceholder}
                        className="w-full rounded-2xl border border-border bg-background pl-11 pr-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="testi-company" className="block text-xs font-semibold uppercase text-muted-foreground mb-1.5">
                      {t.testimonialsPage.companyLabel}
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        id="testi-company"
                        type="text"
                        required
                        value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                        placeholder={t.testimonialsPage.companyPlaceholder}
                        className="w-full rounded-2xl border border-border bg-background pl-11 pr-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
                      />
                    </div>
                  </div>
                </div>

                {/* Phone Number */}
                <div>
                  <label htmlFor="testi-phone" className="block text-xs font-semibold uppercase text-muted-foreground mb-1.5">
                    {t.testimonialsPage.phoneLabel}
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      id="testi-phone"
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder={t.testimonialsPage.phonePlaceholder}
                      className="w-full rounded-2xl border border-border bg-background pl-11 pr-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>

                {/* Star Rating Picker */}
                <div>
                  <label className="block text-xs font-semibold uppercase text-muted-foreground mb-2">
                    {t.testimonialsPage.ratingLabel}
                  </label>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5" onMouseLeave={() => setHoverRating(0)}>
                      {[1, 2, 3, 4, 5].map((star) => {
                        const active = (hoverRating || form.rating) >= star;
                        return (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setForm({ ...form, rating: star })}
                            onMouseEnter={() => setHoverRating(star)}
                            className="p-1 text-2xl transition-transform hover:scale-125 focus:outline-none"
                            aria-label={`Rate ${star} star`}
                          >
                            <Star
                              className={`h-7 w-7 transition-colors ${
                                active
                                  ? "fill-primary text-primary drop-shadow-sm"
                                  : "text-muted-foreground/30 hover:text-muted-foreground"
                              }`}
                            />
                          </button>
                        );
                      })}
                    </div>
                    <span className="text-xs font-bold text-primary">
                      {currentRatingDesc[hoverRating || form.rating] ?? ""}
                    </span>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="testi-quote" className="block text-xs font-semibold uppercase text-muted-foreground mb-1.5">
                    {t.testimonialsPage.quoteLabel}
                  </label>
                  <textarea
                    id="testi-quote"
                    rows={4}
                    required
                    value={form.quote}
                    onChange={(e) => setForm({ ...form, quote: e.target.value })}
                    placeholder={t.testimonialsPage.quotePlaceholder}
                    className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="pill-red inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold transition disabled:opacity-50"
                >
                  {submitting ? t.testimonialsPage.submittingBtn : t.testimonialsPage.submitBtn}
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>

          {/* Right Column: Live Testimonials Display */}
          <div>
            <div className="flex items-center justify-between pb-6">
              <div>
                <h3 className="text-2xl font-bold">
                  {t.testimonialsPage.communityTitle} <span className="text-primary">{t.testimonialsPage.communityHighlight}</span>
                </h3>
                <p className="text-xs text-muted-foreground">
                  {isMounted && testimonials.length > 0
                    ? `${testimonials.length} review${testimonials.length > 1 ? "s" : ""}`
                    : t.testimonialsPage.noReviews}
                </p>
              </div>

              {isMounted && testimonials.length > 0 && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary">
                  <Sparkles className="h-3.5 w-3.5" /> {t.testimonialsPage.liveFeedback}
                </span>
              )}
            </div>

            {/* If Empty */}
            {isMounted && testimonials.length === 0 && (
              <div className="card-soft border border-dashed border-border flex flex-col items-center justify-center p-12 text-center">
                <div className="grid h-16 w-16 place-items-center rounded-full bg-primary/10 text-primary mb-4">
                  <Quote className="h-8 w-8 fill-primary/20 text-primary" />
                </div>
                <h4 className="text-xl font-bold">{t.testimonialsPage.emptyTitle}</h4>
                <p className="mt-2 max-w-md text-sm text-muted-foreground leading-relaxed">
                  {t.testimonialsPage.emptyDesc}
                </p>
              </div>
            )}

            {/* List of Testimonials */}
            {isMounted && testimonials.length > 0 && (
              <div className="grid gap-6">
                {testimonials.map((testi) => (
                  <article
                    key={testi.id}
                    className="card-soft border border-border/60 p-7 sm:p-8 flex flex-col justify-between transition hover:border-primary/40"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          {Array.from({ length: testi.rating }).map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                          ))}
                        </div>
                        <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-[11px] font-semibold text-muted-foreground">
                          <ShieldCheck className="h-3.5 w-3.5 text-primary" /> {t.testimonialsPage.verifiedBadge}
                        </span>
                      </div>

                      <blockquote className="mt-5 text-sm sm:text-base leading-relaxed text-foreground font-medium">
                        "{testi.quote}"
                      </blockquote>
                    </div>

                    <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-border/60 pt-5">
                      <div className="flex items-center gap-3">
                        {testi.avatar ? (
                          <img
                            src={testi.avatar}
                            alt={testi.name}
                            width={44}
                            height={44}
                            className="h-11 w-11 shrink-0 rounded-full object-cover border border-border shadow-sm"
                          />
                        ) : (
                          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-ink font-extrabold text-sm text-ink-foreground">
                            {getInitials(testi.name)}
                          </div>
                        )}
                        <div>
                          <h4 className="text-sm font-bold text-foreground leading-tight">{testi.name}</h4>
                          <p className="text-xs text-primary font-medium">
                            {testi.role} {testi.company ? `at ${testi.company}` : ""}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        {testi.phone && (
                          <span className="flex items-center gap-1 rounded-full bg-muted px-3 py-1 font-mono text-[11px]">
                            <Phone className="h-3 w-3 text-primary" />
                            {testi.phone}
                          </span>
                        )}
                        {testi.createdAt && (
                          <span className="flex items-center gap-1 font-medium text-[11px]">
                            <Calendar className="h-3 w-3 text-muted-foreground" />
                            {testi.createdAt}
                          </span>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-20 text-center">
          <Link to="/contact" className="pill-black inline-block px-8 py-4 font-medium text-sm">
            {t.testimonialsPage.contactCta}
          </Link>
        </div>
      </section>
    </div>
  );
}
