import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/lib/theme";

export function ThemeToggle({
  className = "",
  size = "md",
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const { theme, toggleTheme, isMounted, isDark } = useTheme();

  const btnSize =
    size === "sm"
      ? "h-9 w-9"
      : size === "lg"
      ? "h-11 w-11"
      : "h-10 w-10";

  const iconSize =
    size === "sm"
      ? "h-4 w-4"
      : size === "lg"
      ? "h-5 w-5"
      : "h-4 w-4";

  if (!isMounted) {
    return (
      <div
        className={`flex ${btnSize} items-center justify-center rounded-full bg-surface border border-border/80 text-foreground ${className}`}
      >
        <Moon className={`${iconSize} text-primary`} />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Passer en mode clair" : "Passer en mode sombre"}
      title={isDark ? "Mode clair (Light Mode)" : "Mode sombre (Dark Mode)"}
      className={`group relative flex ${btnSize} shrink-0 items-center justify-center overflow-hidden rounded-full bg-surface border border-border/80 text-foreground shadow-sm transition-all duration-300 hover:border-primary/60 hover:scale-105 active:scale-95 ${className}`}
    >
      <div className="relative flex h-5 w-5 items-center justify-center overflow-hidden">
        {/* Sun Icon */}
        <Sun
          className={`${iconSize} text-amber-500 absolute transition-all duration-500 ease-out ${
            isDark
              ? "opacity-0 rotate-90 scale-0 pointer-events-none"
              : "opacity-100 rotate-0 scale-100 group-hover:rotate-45"
          }`}
        />

        {/* Moon Icon */}
        <Moon
          className={`${iconSize} text-primary absolute transition-all duration-500 ease-out ${
            isDark
              ? "opacity-100 rotate-0 scale-100 group-hover:-rotate-12"
              : "opacity-0 -rotate-90 scale-0 pointer-events-none"
          }`}
        />
      </div>

      {/* Subtle hover glow inside boundary */}
      <span
        className={`absolute inset-0 rounded-full transition-opacity duration-300 opacity-0 group-hover:opacity-100 pointer-events-none ${
          isDark ? "bg-primary/10" : "bg-amber-500/10"
        }`}
      />
    </button>
  );
}
