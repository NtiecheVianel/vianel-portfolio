import { Facebook, Github, Instagram, Link2, Linkedin, Music2, Twitter, Youtube, Mail } from "lucide-react";
import { useSocials } from "@/lib/portfolio-store";

const icons = {
  facebook: Facebook,
  tiktok: Music2,
  instagram: Instagram,
  linkedin: Linkedin,
  github: Github,
  link: Link2,
  twitter: Twitter,
  youtube: Youtube,
  mail: Mail,
};

export function Socials({ className = "" }: { className?: string }) {
  const socials = useSocials();

  return (
    <ul className={`flex flex-wrap items-center gap-3 ${className}`}>
      {socials.map((social) => {
        const Icon = icons[social.icon] || Link2;
        return (
          <li key={social.id || social.label}>
            <a
              href={social.href}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={social.label}
              title={social.label}
              className="grid h-11 w-11 place-items-center rounded-full bg-ink text-ink-foreground transition-all hover:-translate-y-1 hover:bg-primary shadow-sm"
            >
              <Icon className="h-5 w-5" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
