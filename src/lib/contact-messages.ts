import { useEffect, useState } from "react";

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
  createdAt: string;
  read: boolean;
}

const STORAGE_KEY = "vianel_portfolio_contact_messages";
const EVENT_KEY = "vianel_contact_messages_updated";

const DEFAULT_MESSAGES: ContactMessage[] = [
  {
    id: "msg-demo-1",
    name: "Alexandre Dupont",
    email: "alexandre.dupont@innovatech.fr",
    subject: "Proposition de mission UI/UX & Redesign",
    message:
      "Bonjour Vianel, j'ai découvert votre travail sur la refonte de la TdE. Nous cherchons un designer-développeur pour concevoir une application SaaS B2B. Êtes-vous disponible pour un échange cette semaine ?",
    phone: "+33 6 12 34 56 78",
    createdAt: "Hier à 14:30",
    read: false,
  },
  {
    id: "msg-demo-2",
    name: "Koffi Mensah",
    email: "koffi.mensah@africatech.tg",
    subject: "Développement Marketplace",
    message:
      "Salut Vianel ! Félicitations pour ONOMA. Nous souhaiterions intégrer un module de paiement mobile sécurisé pour notre plateforme togolaise. Pouvons-nous collaborer ?",
    phone: "+228 90 12 34 56",
    createdAt: "29 Sept 2026",
    read: true,
  },
];

export function getStoredContactMessages(): ContactMessage[] {
  if (typeof window === "undefined") return DEFAULT_MESSAGES;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return DEFAULT_MESSAGES;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : DEFAULT_MESSAGES;
  } catch (error) {
    console.error("Failed to parse contact messages", error);
    return DEFAULT_MESSAGES;
  }
}

export function saveStoredContactMessages(list: ContactMessage[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    window.dispatchEvent(new Event(EVENT_KEY));
  } catch (error) {
    console.error("Failed to save contact messages", error);
  }
}

export function addContactMessage(data: Omit<ContactMessage, "id" | "createdAt" | "read">): ContactMessage {
  const newMsg: ContactMessage = {
    ...data,
    id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    createdAt: new Date().toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
    read: false,
  };

  const current = getStoredContactMessages();
  const updated = [newMsg, ...current];
  saveStoredContactMessages(updated);
  return newMsg;
}

export function markMessageAsRead(id: string): void {
  const current = getStoredContactMessages();
  const updated = current.map((m) => (m.id === id ? { ...m, read: true } : m));
  saveStoredContactMessages(updated);
}

export function deleteContactMessage(id: string): boolean {
  const current = getStoredContactMessages();
  const updated = current.filter((m) => m.id !== id);
  saveStoredContactMessages(updated);
  return true;
}

export function clearAllContactMessages(): void {
  saveStoredContactMessages([]);
}

export function useContactMessages() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setMessages(getStoredContactMessages());

    const handleUpdate = () => {
      setMessages(getStoredContactMessages());
    };

    window.addEventListener(EVENT_KEY, handleUpdate);
    window.addEventListener("storage", handleUpdate);

    return () => {
      window.removeEventListener(EVENT_KEY, handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  const unreadCount = messages.filter((m) => !m.read).length;

  return {
    messages,
    unreadCount,
    isMounted,
    addMessage: addContactMessage,
    markAsRead: markMessageAsRead,
    deleteMessage: deleteContactMessage,
    clearAll: clearAllContactMessages,
  };
}
