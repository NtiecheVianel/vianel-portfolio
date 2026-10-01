import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone, Send, ExternalLink } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/site/PageHeader";
import { MovingTicker } from "@/components/site/MovingTicker";
import { Socials } from "@/components/site/Socials";
import { profile } from "@/data/content";
import { useLanguage } from "@/lib/i18n";
import { addContactMessage } from "@/lib/contact-messages";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Vianel TIAGUE NTIECHE" },
      {
        name: "description",
        content:
          "Contact Vianel TIAGUE NTIECHE for UI/UX design, web development, website redesigns, or consulting projects.",
      },
      { property: "og:title", content: "Contact — Vianel TIAGUE NTIECHE" },
      {
        property: "og:description",
        content: "Get in touch with Vianel TIAGUE NTIECHE in Lomé, Togo.",
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error(t.contactPage.errorToast);
      return;
    }

    setLoading(true);
    addContactMessage({
      name: form.name.trim(),
      email: form.email.trim(),
      subject: form.subject.trim() || "Nouveau message de contact",
      message: form.message.trim(),
    });

    setTimeout(() => {
      setLoading(false);
      toast.success(t.contactPage.successToast);
      setForm({ name: "", email: "", subject: "", message: "" });
    }, 600);
  };

  return (
    <div className="pb-20">
      <PageHeader
        eyebrow={t.contactPage.eyebrow}
        title={t.contactPage.title}
        highlight={t.contactPage.titleHighlight}
      >
        {t.contactPage.subtitle}
      </PageHeader>

      {/* Moving Text Ribbon */}
      <div className="mt-8">
        <MovingTicker variant="dark" speed="normal" />
      </div>

      <section className="mx-auto mt-12 max-w-[1240px] px-4">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          {/* Contact Details */}
          <div className="card-soft flex flex-col justify-between p-8 sm:p-10">
            <div>
              <h2 className="text-2xl font-bold">{t.contactPage.infoTitle}</h2>
              <p className="mt-3 text-sm text-muted-foreground">
                {t.contactPage.infoSubtitle}
              </p>

              <div className="mt-8 grid gap-6">
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-start gap-4 transition-colors hover:text-primary"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
                    <Mail className="h-5 w-5" />
                  </span>
                  <div>
                    <span className="block text-xs font-semibold uppercase text-muted-foreground">{t.contactPage.emailLabel}</span>
                    <span className="font-semibold">{profile.email}</span>
                    <span className="block text-xs text-muted-foreground">{profile.schoolEmail}</span>
                  </div>
                </a>

                <a
                  href={`tel:${profile.phone.replace(/\s/g, "")}`}
                  className="flex items-start gap-4 transition-colors hover:text-primary"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
                    <Phone className="h-5 w-5" />
                  </span>
                  <div>
                    <span className="block text-xs font-semibold uppercase text-muted-foreground">{t.contactPage.phoneLabel}</span>
                    <span className="font-semibold">{profile.phone}</span>
                  </div>
                </a>

                <div className="flex items-start gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
                    <MapPin className="h-5 w-5" />
                  </span>
                  <div>
                    <span className="block text-xs font-semibold uppercase text-muted-foreground">{t.contactPage.locationLabel}</span>
                    <span className="font-semibold">{profile.location}</span>
                  </div>
                </div>

                <a
                  href={profile.linktree}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-start gap-4 transition-colors hover:text-primary"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-ink text-ink-foreground">
                    <ExternalLink className="h-5 w-5 text-primary" />
                  </span>
                  <div>
                    <span className="block text-xs font-semibold uppercase text-muted-foreground">{t.contactPage.linktreeLabel}</span>
                    <span className="font-semibold">linktr.ee/tiaguentiechevianel</span>
                  </div>
                </a>
              </div>
            </div>

            <div className="mt-10 border-t border-border pt-6">
              <p className="text-sm font-semibold">{t.contactPage.socialsTitle}</p>
              <Socials className="mt-4" />
            </div>
          </div>

          {/* Form */}
          <div className="card-soft p-8 sm:p-10">
            <h2 className="text-2xl font-bold">{t.contactPage.formTitle}</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {t.contactPage.formSubtitle}
            </p>

            <form onSubmit={handleSubmit} className="mt-8 grid gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold uppercase text-muted-foreground mb-2">
                    {t.contactPage.nameLabel}
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder={t.contactPage.namePlaceholder}
                    className="w-full rounded-2xl border border-border bg-background px-4 py-3.5 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-semibold uppercase text-muted-foreground mb-2">
                    {t.contactPage.emailInputLabel}
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder={t.contactPage.emailInputPlaceholder}
                    className="w-full rounded-2xl border border-border bg-background px-4 py-3.5 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-xs font-semibold uppercase text-muted-foreground mb-2">
                  {t.contactPage.subjectLabel}
                </label>
                <input
                  id="subject"
                  type="text"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder={t.contactPage.subjectPlaceholder}
                  className="w-full rounded-2xl border border-border bg-background px-4 py-3.5 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-semibold uppercase text-muted-foreground mb-2">
                  {t.contactPage.messageLabel}
                </label>
                <textarea
                  id="message"
                  rows={5}
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder={t.contactPage.messagePlaceholder}
                  className="w-full rounded-2xl border border-border bg-background px-4 py-3.5 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="pill-red inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold transition disabled:opacity-50"
              >
                {loading ? t.contactPage.sendingBtn : t.contactPage.sendBtn}
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
