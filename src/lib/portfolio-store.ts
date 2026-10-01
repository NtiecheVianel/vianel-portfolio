import { useEffect, useState } from "react";
import { profile as defaultProfile, projects as defaultProjects, posts as defaultPosts, Project as DefaultProjectType, Post as DefaultPostType } from "@/data/content";
import tdeStatsGenerator from "@/assets/tde-statistics-generator.png";
import onomaMarketplace from "@/assets/onoma-marketplace.png";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import blog1 from "@/assets/blog-1.jpg";
import blog2 from "@/assets/blog-2.jpg";
import blog3 from "@/assets/blog-3.jpg";
import vianelPortrait from "@/assets/vianel-portrait.png";

export interface SocialLink {
  id: string;
  label: string;
  href: string;
  icon: "linkedin" | "github" | "instagram" | "facebook" | "tiktok" | "link" | "twitter" | "youtube" | "mail";
  enabled: boolean;
}

export interface ProfileData {
  name: string;
  shortName: string;
  role: string;
  tagline: string;
  email: string;
  schoolEmail: string;
  phone: string;
  location: string;
  linktree: string;
  about: string;
  socials: SocialLink[];
}

export interface StoredProject {
  slug: string;
  title: string;
  category: string;
  image: string;
  excerpt: string;
  description: string;
  technologies: string[];
  features: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

export interface StoredPost {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  excerpt: string;
  body: string[];
}

export const PRESET_IMAGES = [
  { id: "tde-stats", name: "TdE Statistics Dashboard", url: tdeStatsGenerator },
  { id: "onoma-market", name: "ONOMA Marketplace", url: onomaMarketplace },
  { id: "project-1", name: "Web Dashboard Mockup", url: project1 },
  { id: "project-2", name: "Mobile UI System", url: project2 },
  { id: "project-3", name: "Figma UI Components", url: project3 },
  { id: "blog-1", name: "Code Editorial Illustration", url: blog1 },
  { id: "blog-2", name: "Design System Illustration", url: blog2 },
  { id: "blog-3", name: "Web Dev Illustration", url: blog3 },
  { id: "portrait", name: "Vianel Portrait Photo", url: vianelPortrait },
];

const PROJECTS_STORAGE_KEY = "vianel_portfolio_custom_projects";
const POSTS_STORAGE_KEY = "vianel_portfolio_custom_posts";
const PROFILE_STORAGE_KEY = "vianel_portfolio_custom_profile";
const STORE_UPDATE_EVENT = "vianel_portfolio_store_updated";

function getDefaultProfileData(): ProfileData {
  return {
    ...defaultProfile,
    socials: [
      { id: "linkedin", label: "LinkedIn", href: "https://linkedin.com", icon: "linkedin", enabled: true },
      { id: "github", label: "GitHub", href: "https://github.com", icon: "github", enabled: true },
      { id: "linktree", label: "Linktree", href: defaultProfile.linktree || "https://linktr.ee/tiaguentiechevianel", icon: "link", enabled: true },
      { id: "instagram", label: "Instagram", href: "https://instagram.com", icon: "instagram", enabled: true },
      { id: "facebook", label: "Facebook", href: "https://facebook.com", icon: "facebook", enabled: true },
      { id: "tiktok", label: "TikTok", href: "https://tiktok.com", icon: "tiktok", enabled: true },
      { id: "twitter", label: "X (Twitter)", href: "https://x.com", icon: "twitter", enabled: false },
      { id: "youtube", label: "YouTube", href: "https://youtube.com", icon: "youtube", enabled: false },
    ],
  };
}

export function getStoredProjects(): StoredProject[] {
  if (typeof window === "undefined") return defaultProjects as StoredProject[];
  try {
    const raw = localStorage.getItem(PROJECTS_STORAGE_KEY);
    if (raw === null) return defaultProjects as StoredProject[];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : (defaultProjects as StoredProject[]);
  } catch {
    return defaultProjects as StoredProject[];
  }
}

export function saveStoredProjects(projects: StoredProject[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(projects));
    window.dispatchEvent(new Event(STORE_UPDATE_EVENT));
  } catch (err) {
    console.error("Failed to save projects to localStorage", err);
  }
}

export function getStoredPosts(): StoredPost[] {
  if (typeof window === "undefined") return defaultPosts as StoredPost[];
  try {
    const raw = localStorage.getItem(POSTS_STORAGE_KEY);
    if (raw === null) return defaultPosts as StoredPost[];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : (defaultPosts as StoredPost[]);
  } catch {
    return defaultPosts as StoredPost[];
  }
}

export function saveStoredPosts(posts: StoredPost[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(posts));
    window.dispatchEvent(new Event(STORE_UPDATE_EVENT));
  } catch (err) {
    console.error("Failed to save posts to localStorage", err);
  }
}

export function getStoredProfile(): ProfileData {
  if (typeof window === "undefined") return getDefaultProfileData();
  try {
    const raw = localStorage.getItem(PROFILE_STORAGE_KEY);
    if (!raw) return getDefaultProfileData();
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? { ...getDefaultProfileData(), ...parsed } : getDefaultProfileData();
  } catch {
    return getDefaultProfileData();
  }
}

export function saveStoredProfile(profile: ProfileData) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
    window.dispatchEvent(new Event(STORE_UPDATE_EVENT));
  } catch (err) {
    console.error("Failed to save profile to localStorage", err);
  }
}

export function resetAllToDefaults() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(PROJECTS_STORAGE_KEY);
  localStorage.removeItem(POSTS_STORAGE_KEY);
  localStorage.removeItem(PROFILE_STORAGE_KEY);
  window.dispatchEvent(new Event(STORE_UPDATE_EVENT));
}

// React Hooks for reactivity across the app
export function useProjects(): { projects: StoredProject[]; isMounted: boolean; saveProjects: (p: StoredProject[]) => void } {
  const [projects, setProjects] = useState<StoredProject[]>(getStoredProjects());
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setProjects(getStoredProjects());

    const onUpdate = () => setProjects(getStoredProjects());
    window.addEventListener(STORE_UPDATE_EVENT, onUpdate);
    window.addEventListener("storage", onUpdate);

    return () => {
      window.removeEventListener(STORE_UPDATE_EVENT, onUpdate);
      window.removeEventListener("storage", onUpdate);
    };
  }, []);

  return { projects, isMounted, saveProjects: saveStoredProjects };
}

export function usePosts(): { posts: StoredPost[]; isMounted: boolean; savePosts: (p: StoredPost[]) => void } {
  const [posts, setPosts] = useState<StoredPost[]>(getStoredPosts());
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setPosts(getStoredPosts());

    const onUpdate = () => setPosts(getStoredPosts());
    window.addEventListener(STORE_UPDATE_EVENT, onUpdate);
    window.addEventListener("storage", onUpdate);

    return () => {
      window.removeEventListener(STORE_UPDATE_EVENT, onUpdate);
      window.removeEventListener("storage", onUpdate);
    };
  }, []);

  return { posts, isMounted, savePosts: saveStoredPosts };
}

export function useProfile(): { profile: ProfileData; isMounted: boolean; saveProfile: (p: ProfileData) => void } {
  const [profile, setProfile] = useState<ProfileData>(getStoredProfile());
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setProfile(getStoredProfile());

    const onUpdate = () => setProfile(getStoredProfile());
    window.addEventListener(STORE_UPDATE_EVENT, onUpdate);
    window.addEventListener("storage", onUpdate);

    return () => {
      window.removeEventListener(STORE_UPDATE_EVENT, onUpdate);
      window.removeEventListener("storage", onUpdate);
    };
  }, []);

  return { profile, isMounted, saveProfile: saveStoredProfile };
}

export function useSocials(): SocialLink[] {
  const { profile } = useProfile();
  return profile.socials.filter((s) => s.enabled && s.href.trim() !== "");
}
