import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  highlight,
  children,
}: {
  eyebrow: string;
  title: string;
  highlight?: string;
  children?: ReactNode;
}) {
  return (
    <header className="animate-rise mx-auto max-w-3xl px-4 pt-14 text-center sm:pt-20">
      <p className="flex items-center justify-center gap-3 text-lg font-semibold">
        <span className="h-[3px] w-8 rounded-full bg-primary" aria-hidden />
        {eyebrow}
      </p>
      <h1 className="mt-3 text-4xl leading-[1.05] sm:text-6xl">
        {title} {highlight && <span className="text-primary">{highlight}</span>}
      </h1>
      {children && (
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {children}
        </p>
      )}
    </header>
  );
}
