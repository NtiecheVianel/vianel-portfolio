import { useState, useEffect } from "react";

export type ThemeMode = "light" | "dark";

const THEME_STORAGE_KEY = "vianel_theme_mode";
const THEME_CHANGE_EVENT = "vianel_theme_changed";

export function getInitialTheme(): ThemeMode {
  if (typeof window === "undefined") return "dark";
  const saved = localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode | null;
  if (saved === "light" || saved === "dark") {
    return saved;
  }
  // Default to dark as preferred in modern portfolio
  return "dark";
}

export function applyTheme(theme: ThemeMode) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  if (theme === "dark") {
    root.classList.add("dark");
    root.style.colorScheme = "dark";
  } else {
    root.classList.remove("dark");
    root.style.colorScheme = "light";
  }
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
    window.dispatchEvent(new CustomEvent(THEME_CHANGE_EVENT, { detail: theme }));
  } catch {}
}

export function useTheme() {
  const [theme, setThemeState] = useState<ThemeMode>("dark");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const initial = getInitialTheme();
    setThemeState(initial);
    applyTheme(initial);

    const handleThemeChange = (e: Event) => {
      const customEvent = e as CustomEvent<ThemeMode>;
      if (customEvent.detail) {
        setThemeState(customEvent.detail);
      }
    };

    window.addEventListener(THEME_CHANGE_EVENT, handleThemeChange);
    return () => window.removeEventListener(THEME_CHANGE_EVENT, handleThemeChange);
  }, []);

  const toggleTheme = () => {
    const nextTheme: ThemeMode = theme === "dark" ? "light" : "dark";
    setThemeState(nextTheme);
    applyTheme(nextTheme);
  };

  const setTheme = (mode: ThemeMode) => {
    setThemeState(mode);
    applyTheme(mode);
  };

  return {
    theme,
    toggleTheme,
    setTheme,
    isMounted,
    isDark: theme === "dark",
  };
}
