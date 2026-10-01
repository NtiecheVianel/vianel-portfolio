import { useEffect, useState } from "react";
import { testimonials as defaultTestimonials } from "@/data/content";

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  phone: string;
  rating: number;
  quote: string;
  createdAt: string;
  avatar?: string;
};

const STORAGE_KEY = "vianel_portfolio_testimonials";
const EVENT_KEY = "vianel_testimonials_updated";

export function getStoredTestimonials(): Testimonial[] {
  if (typeof window === "undefined") return defaultTestimonials as Testimonial[];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === null) {
      return defaultTestimonials as Testimonial[];
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : (defaultTestimonials as Testimonial[]);
  } catch (error) {
    console.error("Failed to parse stored testimonials", error);
    return defaultTestimonials as Testimonial[];
  }
}

export function saveStoredTestimonials(list: Testimonial[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    window.dispatchEvent(new Event(EVENT_KEY));
  } catch (error) {
    console.error("Failed to save testimonials", error);
  }
}

export function addTestimonial(data: Omit<Testimonial, "id" | "createdAt">): Testimonial {
  const newEntry: Testimonial = {
    ...data,
    id: `testimony_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    createdAt: new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
  };

  const current = getStoredTestimonials();
  const updated = [newEntry, ...current];
  saveStoredTestimonials(updated);
  return newEntry;
}

export function updateTestimonial(id: string, data: Partial<Testimonial>): Testimonial | null {
  const current = getStoredTestimonials();
  const index = current.findIndex((t) => t.id === id);
  if (index === -1) return null;
  const existing = current[index];
  if (!existing) return null;

  const updatedItem: Testimonial = {
    id: data.id ?? existing.id,
    name: data.name ?? existing.name,
    role: data.role ?? existing.role,
    company: data.company ?? existing.company,
    phone: data.phone ?? existing.phone,
    rating: data.rating ?? existing.rating,
    quote: data.quote ?? existing.quote,
    createdAt: data.createdAt ?? existing.createdAt,
    ...(data.avatar !== undefined || existing.avatar !== undefined
      ? { avatar: data.avatar ?? existing.avatar }
      : {}),
  };
  const updatedList = [...current];
  updatedList[index] = updatedItem;
  saveStoredTestimonials(updatedList);
  return updatedItem;
}

export function deleteTestimonial(id: string): boolean {
  const current = getStoredTestimonials();
  const updated = current.filter((t) => t.id !== id);
  saveStoredTestimonials(updated);
  return true;
}

export function resetTestimonials(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event(EVENT_KEY));
}

export function useTestimonials() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setItems(getStoredTestimonials());

    const handleUpdate = () => {
      setItems(getStoredTestimonials());
    };

    window.addEventListener(EVENT_KEY, handleUpdate);
    window.addEventListener("storage", handleUpdate);

    return () => {
      window.removeEventListener(EVENT_KEY, handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  return { testimonials: items, isMounted: mounted, addTestimonial };
}
