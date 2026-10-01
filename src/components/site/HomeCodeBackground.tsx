import { useTheme } from "@/lib/theme";

interface CodeBadgeProps {
  code: string;
  className?: string;
  animationClass?: string;
  style?: React.CSSProperties;
}

function CodeBadge({ code, className = "", animationClass = "animate-float-slow", style }: CodeBadgeProps) {
  return (
    <div
      className={`hidden md:inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 font-mono text-xs shadow-sm transition-all duration-300 pointer-events-none select-none ${className} ${animationClass}`}
      style={style}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-primary/70" />
      <span>{code}</span>
    </div>
  );
}

export function HomeCodeBackground() {
  const { isDark } = useTheme();

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none overflow-hidden select-none -z-10"
    >
      {/* Soft Ambient Crimson Lighting Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Top-Right Ambient Red Aura */}
        <div
          className={`absolute -top-24 -right-24 w-[480px] h-[480px] rounded-full blur-[130px] transition-opacity duration-700 ${
            isDark ? "bg-primary/20 opacity-70" : "bg-primary/10 opacity-60"
          }`}
        />

        {/* Center-Left Ambient Glow */}
        <div
          className={`absolute top-[35%] -left-32 w-[520px] h-[520px] rounded-full blur-[150px] transition-opacity duration-700 ${
            isDark ? "bg-primary/15 opacity-50" : "bg-primary/8 opacity-50"
          }`}
        />

        {/* Bottom-Right Glow */}
        <div
          className={`absolute -bottom-28 right-[15%] w-[450px] h-[450px] rounded-full blur-[140px] transition-opacity duration-700 ${
            isDark ? "bg-primary/15 opacity-40" : "bg-primary/8 opacity-40"
          }`}
        />
      </div>

      {/* Modern Developer Dot Matrix Grid */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${
          isDark ? "opacity-[0.04]" : "opacity-[0.03]"
        }`}
        style={{
          backgroundImage: isDark
            ? "radial-gradient(rgba(255, 255, 255, 0.9) 1px, transparent 1px)"
            : "radial-gradient(rgba(0, 0, 0, 0.9) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage: "radial-gradient(ellipse 85% 85% at 50% 35%, #000 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 85% 85% at 50% 35%, #000 40%, transparent 100%)",
        }}
      />

      {/* Floating Code Snippets & Syntax Badges (Desktop & Tablet) */}
      <div className="relative mx-auto max-w-[1400px] h-full w-full">
        {/* Top Left: React & UI Component */}
        <CodeBadge
          code="<UIComponent design='Figma' />"
          className={`absolute top-12 left-6 lg:left-12 ${
            isDark
              ? "bg-surface/80 border-border/80 text-zinc-300"
              : "bg-white/85 border-zinc-300/80 text-zinc-700 shadow-sm"
          }`}
          animationClass="animate-float-slow"
          style={{ animationDuration: "8s" }}
        />

        {/* Top Right: Developer Declaration */}
        <CodeBadge
          code="const vianel = new FullStackDev();"
          className={`absolute top-16 right-8 lg:right-16 ${
            isDark
              ? "bg-surface/80 border-border/80 text-zinc-300"
              : "bg-white/85 border-zinc-300/80 text-zinc-700 shadow-sm"
          }`}
          animationClass="animate-float-reverse"
          style={{ animationDuration: "9s" }}
        />

        {/* Mid Left: SQL Query for Togo / Lomé */}
        <CodeBadge
          code="SELECT * FROM talent WHERE base = 'Lomé, Togo';"
          className={`absolute top-[320px] left-4 lg:left-10 ${
            isDark
              ? "bg-surface/75 border-border/70 text-zinc-400"
              : "bg-white/80 border-zinc-300/70 text-zinc-600 shadow-sm"
          }`}
          animationClass="animate-drift"
          style={{ animationDuration: "12s" }}
        />

        {/* Mid Right: TypeScript Interface & Security */}
        <CodeBadge
          code="type SecureApp = UI & Logic & Safety;"
          className={`absolute top-[290px] right-6 lg:right-12 ${
            isDark
              ? "bg-surface/75 border-border/70 text-zinc-400"
              : "bg-white/80 border-zinc-300/70 text-zinc-600 shadow-sm"
          }`}
          animationClass="animate-float-slow"
          style={{ animationDuration: "10s", animationDelay: "1s" }}
        />

        {/* Lower Left: Git Push / Deployment */}
        <CodeBadge
          code="git commit -m 'feat: ship modern experience'"
          className={`absolute top-[520px] left-8 lg:left-16 ${
            isDark
              ? "bg-surface/70 border-border/60 text-zinc-400"
              : "bg-white/75 border-zinc-300/60 text-zinc-600 shadow-sm"
          }`}
          animationClass="animate-float-reverse"
          style={{ animationDuration: "11s", animationDelay: "2s" }}
        />

        {/* Lower Right: JSON / Response object */}
        <CodeBadge
          code="{ status: 200, secure: true, ready: true }"
          className={`absolute top-[490px] right-10 lg:right-20 ${
            isDark
              ? "bg-surface/70 border-border/60 text-zinc-400"
              : "bg-white/75 border-zinc-300/60 text-zinc-600 shadow-sm"
          }`}
          animationClass="animate-drift"
          style={{ animationDuration: "13s", animationDelay: "1.5s" }}
        />

        {/* Binary / Tech Watermark in background */}
        <div
          className={`hidden xl:block absolute top-[180px] right-[2%] font-mono text-[11px] leading-relaxed select-none pointer-events-none opacity-20 ${
            isDark ? "text-zinc-400" : "text-zinc-600"
          }`}
        >
          <pre className="font-mono">
            {`// LBS System
01010110 01101001
01100001 01101110
01100101 01101100
// UI/UX + Web`}
          </pre>
        </div>

        <div
          className={`hidden xl:block absolute top-[210px] left-[2%] font-mono text-[11px] leading-relaxed select-none pointer-events-none opacity-20 ${
            isDark ? "text-zinc-400" : "text-zinc-600"
          }`}
        >
          <pre className="font-mono">
            {`// Stack definition
interface VianelDev {
  design: "Figma";
  code: "TS/React/SQL";
  location: "Lomé";
}`}
          </pre>
        </div>
      </div>
    </div>
  );
}
