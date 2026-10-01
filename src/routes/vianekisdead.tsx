import { createFileRoute, Link } from "@tanstack/react-router";
import {
  FolderKanban,
  FileText,
  Share2,
  Plus,
  Trash2,
  Edit3,
  ExternalLink,
  Github,
  Save,
  RotateCcw,
  Upload,
  CheckCircle2,
  Sparkles,
  Layers,
  ArrowRight,
  Eye,
  ShieldCheck,
  Globe,
  Phone,
  Mail,
  MapPin,
  Download,
  Copy,
  MessageSquare,
  Star,
  Quote,
  Inbox,
  Check,
  CheckCheck,
  User,
  Building2,
  Calendar,
  Reply,
} from "lucide-react";
import { useState, useRef } from "react";
import { toast } from "sonner";
import {
  useProjects,
  usePosts,
  useProfile,
  StoredProject,
  StoredPost,
  ProfileData,
  SocialLink,
  PRESET_IMAGES,
  resetAllToDefaults,
} from "@/lib/portfolio-store";
import {
  useTestimonials,
  Testimonial,
  addTestimonial,
  updateTestimonial,
  deleteTestimonial,
  resetTestimonials,
} from "@/lib/testimonials";
import {
  useContactMessages,
  ContactMessage,
  markMessageAsRead,
  deleteContactMessage,
  clearAllContactMessages,
} from "@/lib/contact-messages";
import { projectCategories, postCategories } from "@/data/content";

import client1 from "@/assets/client-1.jpg";
import client2 from "@/assets/client-2.jpg";
import client3 from "@/assets/client-3.jpg";
import client4 from "@/assets/client-4.jpg";

export const Route = createFileRoute("/vianekisdead")({
  head: () => ({
    meta: [
      { title: "Gestionnaire de Contenu — Vianel Portfolio Admin" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: VianekIsDeadAdmin,
});

type TabType = "messages" | "testimonials" | "projects" | "posts" | "socials" | "backup";

const CLIENT_AVATARS = [
  { id: "client-1", name: "Amivi Mensah (Client 1)", url: client1 },
  { id: "client-2", name: "Guillaume Gaba (Client 2)", url: client2 },
  { id: "client-3", name: "Koffi Emmanuel (Client 3)", url: client3 },
  { id: "client-4", name: "Fatima Al-Hassan (Client 4)", url: client4 },
];

function VianekIsDeadAdmin() {
  const [activeTab, setActiveTab] = useState<TabType>("projects");

  const { projects, saveProjects } = useProjects();
  const { posts, savePosts } = usePosts();
  const { profile, saveProfile } = useProfile();
  const { testimonials, isMounted: testiMounted } = useTestimonials();
  const { messages, unreadCount, isMounted: msgMounted } = useContactMessages();

  // Project modal state
  const [editingProject, setEditingProject] = useState<StoredProject | null>(null);
  const [isNewProject, setIsNewProject] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);

  // Post modal state
  const [editingPost, setEditingPost] = useState<StoredPost | null>(null);
  const [isNewPost, setIsNewPost] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);

  // Testimonial modal state
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [isNewTestimonial, setIsNewTestimonial] = useState(false);
  const [showTestimonialModal, setShowTestimonialModal] = useState(false);

  // Selected message for details view
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  // File input refs
  const projectFileRef = useRef<HTMLInputElement>(null);
  const postFileRef = useRef<HTMLInputElement>(null);
  const testiFileRef = useRef<HTMLInputElement>(null);

  // Social form state
  const [socialForm, setSocialForm] = useState<ProfileData>(profile);

  // Handle Project Image Upload
  const handleProjectImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("L'image dépasse la taille maximale recommandée (5 Mo)");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (editingProject && event.target?.result) {
        setEditingProject({ ...editingProject, image: event.target.result as string });
        toast.success("Image importée avec succès !");
      }
    };
    reader.readAsDataURL(file);
  };

  // Handle Post Image Upload
  const handlePostImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("L'image dépasse la taille maximale recommandée (5 Mo)");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (editingPost && event.target?.result) {
        setEditingPost({ ...editingPost, image: event.target.result as string });
        toast.success("Image importée avec succès !");
      }
    };
    reader.readAsDataURL(file);
  };

  // Handle Testimonial Avatar Upload
  const handleTestiAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (editingTestimonial && event.target?.result) {
        setEditingTestimonial({ ...editingTestimonial, avatar: event.target.result as string });
        toast.success("Photo de profil importée avec succès !");
      }
    };
    reader.readAsDataURL(file);
  };

  // Save project
  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    if (!editingProject.title.trim() || !editingProject.slug.trim()) {
      toast.error("Veuillez remplir au moins le titre et le slug.");
      return;
    }

    let updatedList: StoredProject[];
    if (isNewProject) {
      if (projects.some((p) => p.slug === editingProject.slug)) {
        toast.error("Un projet avec ce slug existe déjà.");
        return;
      }
      updatedList = [editingProject, ...projects];
    } else {
      updatedList = projects.map((p) => (p.slug === editingProject.slug ? editingProject : p));
    }

    saveProjects(updatedList);
    setShowProjectModal(false);
    setEditingProject(null);
    toast.success(isNewProject ? "Projet ajouté avec succès !" : "Projet mis à jour avec succès !");
  };

  // Delete project
  const handleDeleteProject = (slug: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce projet ?")) {
      const updated = projects.filter((p) => p.slug !== slug);
      saveProjects(updated);
      toast.success("Projet supprimé !");
    }
  };

  // Save post
  const handleSavePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost) return;

    if (!editingPost.title.trim() || !editingPost.slug.trim()) {
      toast.error("Veuillez remplir au moins le titre et le slug de l'article.");
      return;
    }

    let updatedList: StoredPost[];
    if (isNewPost) {
      if (posts.some((p) => p.slug === editingPost.slug)) {
        toast.error("Un article avec ce slug existe déjà.");
        return;
      }
      updatedList = [editingPost, ...posts];
    } else {
      updatedList = posts.map((p) => (p.slug === editingPost.slug ? editingPost : p));
    }

    savePosts(updatedList);
    setShowPostModal(false);
    setEditingPost(null);
    toast.success(isNewPost ? "Article ajouté avec succès !" : "Article mis à jour avec succès !");
  };

  // Delete post
  const handleDeletePost = (slug: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) {
      const updated = posts.filter((p) => p.slug !== slug);
      savePosts(updated);
      toast.success("Article supprimé !");
    }
  };

  // Save Testimonial
  const handleSaveTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTestimonial) return;

    if (!editingTestimonial.name.trim() || !editingTestimonial.quote.trim()) {
      toast.error("Le nom et le témoignage sont obligatoires.");
      return;
    }

    if (isNewTestimonial) {
      addTestimonial({
        name: editingTestimonial.name,
        role: editingTestimonial.role || "Client",
        company: editingTestimonial.company || "",
        phone: editingTestimonial.phone || "",
        rating: editingTestimonial.rating || 5,
        quote: editingTestimonial.quote,
        ...(editingTestimonial.avatar ? { avatar: editingTestimonial.avatar } : {}),
      });
      toast.success("Témoignage ajouté avec succès !");
    } else {
      updateTestimonial(editingTestimonial.id, editingTestimonial);
      toast.success("Témoignage mis à jour !");
    }

    setShowTestimonialModal(false);
    setEditingTestimonial(null);
  };

  // Delete Testimonial
  const handleDeleteTestimonial = (id: string) => {
    if (confirm("Supprimer ce témoignage ?")) {
      deleteTestimonial(id);
      toast.success("Témoignage supprimé !");
    }
  };

  // Save Profile & Socials
  const handleSaveProfileAndSocials = (e: React.FormEvent) => {
    e.preventDefault();
    saveProfile(socialForm);
    toast.success("Réseaux sociaux et contacts enregistrés sur tout le site !");
  };

  // Export JSON
  const handleExportJSON = () => {
    const data = {
      projects,
      posts,
      profile,
      testimonials,
      messages,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `vianel-portfolio-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Sauvegarde exportée avec succès !");
  };

  // Reset all
  const handleResetDefaults = () => {
    if (confirm("Voulez-vous réinitialiser tous les projets, articles, témoignages et réseaux aux valeurs par défaut ?")) {
      resetAllToDefaults();
      resetTestimonials();
      toast.success("Toutes les données ont été réinitialisées.");
      setTimeout(() => window.location.reload(), 500);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-28 pt-8">
      <div className="mx-auto max-w-[1240px] px-4">
        {/* Top Header Card */}
        <div className="rounded-3xl border border-border/80 bg-surface p-6 sm:p-10 shadow-lg">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-3.5 py-1 text-xs font-bold text-primary mb-3">
                <ShieldCheck className="h-4 w-4" /> Espace Privé d'Administration (/vianekisdead)
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                Gestionnaire <span className="text-primary">Global du Portfolio</span>
              </h1>
              <p className="mt-2 text-sm text-muted-foreground max-w-2xl">
                Consultez qui vous a écrit via le formulaire de contact, modifiez les avis & témoignages, gérez les projets avec leurs images et liens (Live & GitHub), les articles et vos réseaux sociaux.
              </p>
            </div>

            <div className="flex flex-wrap gap-2.5">
              <Link
                to="/"
                target="_blank"
                className="pill-outline inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold"
              >
                <Eye className="h-4 w-4 text-primary" /> Voir le Site
              </Link>
              <button
                type="button"
                onClick={handleExportJSON}
                className="pill-black inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold"
              >
                <Download className="h-4 w-4" /> Exporter JSON
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="mt-8 flex flex-wrap gap-2 border-t border-border/60 pt-6">
            <button
              type="button"
              onClick={() => setActiveTab("messages")}
              className={`inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-xs sm:text-sm font-bold transition-all shadow-sm ${
                activeTab === "messages"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-background text-foreground hover:bg-muted"
              }`}
            >
              <Inbox className="h-4 w-4" /> Messages Reçus ({messages.length})
              {unreadCount > 0 && (
                <span className="ml-1 rounded-full bg-red-600 text-white px-2 py-0.5 text-[10px] font-extrabold animate-pulse">
                  {unreadCount} nouveau{unreadCount > 1 ? "x" : ""}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("testimonials")}
              className={`inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-xs sm:text-sm font-bold transition-all shadow-sm ${
                activeTab === "testimonials"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-background text-foreground hover:bg-muted"
              }`}
            >
              <Star className="h-4 w-4" /> Témoignages & Avis ({testiMounted ? testimonials.length : 0})
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("projects")}
              className={`inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-xs sm:text-sm font-bold transition-all shadow-sm ${
                activeTab === "projects"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-background text-foreground hover:bg-muted"
              }`}
            >
              <FolderKanban className="h-4 w-4" /> Projets ({projects.length})
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("posts")}
              className={`inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-xs sm:text-sm font-bold transition-all shadow-sm ${
                activeTab === "posts"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-background text-foreground hover:bg-muted"
              }`}
            >
              <FileText className="h-4 w-4" /> Blog & Articles ({posts.length})
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab("socials");
                setSocialForm(profile);
              }}
              className={`inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-xs sm:text-sm font-bold transition-all shadow-sm ${
                activeTab === "socials"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-background text-foreground hover:bg-muted"
              }`}
            >
              <Share2 className="h-4 w-4" /> Réseaux Sociaux & Contact
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("backup")}
              className={`inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-xs sm:text-sm font-bold transition-all shadow-sm ${
                activeTab === "backup"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-background text-foreground hover:bg-muted"
              }`}
            >
              <RotateCcw className="h-4 w-4" /> Sauvegarde / Reset
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* TAB: MESSAGES RECUS (CONTACT) */}
        {/* ========================================================================= */}
        {activeTab === "messages" && (
          <div className="mt-8">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl font-bold">Messages Reçus via la Page Contact</h2>
                <p className="text-xs text-muted-foreground">
                  Voici toutes les personnes qui vous ont envoyé un message depuis le formulaire de contact.
                </p>
              </div>

              {messages.length > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    if (confirm("Voulez-vous supprimer tous les messages reçus ?")) {
                      clearAllContactMessages();
                      toast.success("Boîte de réception vidée.");
                    }
                  }}
                  className="pill-outline px-4 py-2 text-xs font-semibold text-destructive hover:bg-destructive hover:text-white"
                >
                  <Trash2 className="h-3.5 w-3.5 inline mr-1" /> Vider la boîte
                </button>
              )}
            </div>

            {messages.length === 0 ? (
              <div className="card-soft p-12 text-center border border-dashed border-border">
                <Inbox className="h-12 w-12 mx-auto text-muted-foreground mb-3 opacity-60" />
                <h3 className="text-lg font-bold">Aucun message reçu pour le moment</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Les messages envoyés sur votre page <Link to="/contact" className="text-primary underline">Contact</Link> apparaîtront directement ici.
                </p>
              </div>
            ) : (
              <div className="grid gap-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`card-soft border p-6 transition-all ${
                      msg.read ? "border-border/80 opacity-90" : "border-primary/60 bg-primary/5 shadow-sm"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-border/60">
                      <div className="flex items-center gap-3">
                        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary/10 text-primary font-bold text-sm">
                          {msg.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-sm text-foreground">{msg.name}</h4>
                            {!msg.read && (
                              <span className="rounded-full bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5">
                                Nouveau
                              </span>
                            )}
                          </div>
                          <a
                            href={`mailto:${msg.email}`}
                            className="text-xs text-primary hover:underline font-medium inline-flex items-center gap-1"
                          >
                            <Mail className="h-3 w-3" /> {msg.email}
                          </a>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5 text-primary" /> {msg.createdAt}
                        </span>
                        {msg.phone && (
                          <span className="flex items-center gap-1">
                            <Phone className="h-3.5 w-3.5 text-primary" /> {msg.phone}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="mt-4">
                      <h5 className="font-bold text-sm text-foreground mb-1.5">
                        Objet : <span className="text-primary">{msg.subject}</span>
                      </h5>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed whitespace-pre-line bg-background/60 p-4 rounded-2xl border border-border/60">
                        {msg.message}
                      </p>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-2">
                      <div className="flex items-center gap-2">
                        <a
                          href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`}
                          className="pill-red px-4 py-2 text-xs font-semibold inline-flex items-center gap-1.5 shadow-sm"
                        >
                          <Reply className="h-3.5 w-3.5" /> Répondre par Email
                        </a>

                        {!msg.read ? (
                          <button
                            type="button"
                            onClick={() => {
                              markMessageAsRead(msg.id);
                              toast.success("Marqué comme lu !");
                            }}
                            className="pill-outline px-3.5 py-2 text-xs font-semibold inline-flex items-center gap-1"
                          >
                            <Check className="h-3.5 w-3.5 text-primary" /> Marquer lu
                          </button>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground font-medium px-2 py-1">
                            <CheckCheck className="h-3.5 w-3.5 text-emerald-500" /> Lu
                          </span>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          deleteContactMessage(msg.id);
                          toast.success("Message supprimé.");
                        }}
                        className="rounded-full bg-destructive/10 text-destructive p-2 hover:bg-destructive hover:text-white transition"
                        title="Supprimer ce message"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB: TEMOIGNAGES & AVIS */}
        {/* ========================================================================= */}
        {activeTab === "testimonials" && (
          <div className="mt-8">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl font-bold">Gestion des Témoignages & Avis Clients</h2>
                <p className="text-xs text-muted-foreground">
                  Modifiez, ajoutez ou supprimez les avis affichés sur la page Témoignages et sur la page d'accueil.
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setEditingTestimonial({
                      id: `testi-${Date.now()}`,
                      name: "",
                      role: "Client / Partenaire",
                      company: "",
                      phone: "+228 ",
                      rating: 5,
                      avatar: client1,
                      quote: "",
                      createdAt: new Date().toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      }),
                    });
                    setIsNewTestimonial(true);
                    setShowTestimonialModal(true);
                  }}
                  className="pill-red inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold shadow-md"
                >
                  <Plus className="h-4 w-4" /> Nouveau Témoignage
                </button>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {testimonials.map((testi) => (
                <div
                  key={testi.id}
                  className="card-soft border border-border/80 p-6 flex flex-col justify-between hover:border-primary/40 transition-all shadow-sm"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1">
                        {Array.from({ length: testi.rating }).map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                        ))}
                      </div>
                      {testi.createdAt && (
                        <span className="text-[11px] text-muted-foreground font-medium">
                          {testi.createdAt}
                        </span>
                      )}
                    </div>

                    <blockquote className="text-sm font-medium leading-relaxed text-foreground italic">
                      "{testi.quote}"
                    </blockquote>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-border/60 pt-4">
                    <div className="flex items-center gap-3">
                      {testi.avatar ? (
                        <img
                          src={testi.avatar}
                          alt={testi.name}
                          className="h-11 w-11 shrink-0 rounded-full object-cover border border-border"
                        />
                      ) : (
                        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-ink text-white font-bold text-xs">
                          {testi.name.slice(0, 2).toUpperCase()}
                        </div>
                      )}

                      <div>
                        <h4 className="font-bold text-sm text-foreground leading-tight">{testi.name}</h4>
                        <p className="text-xs text-primary font-medium">
                          {testi.role} {testi.company ? `chez ${testi.company}` : ""}
                        </p>
                        {testi.phone && (
                          <p className="text-[11px] text-muted-foreground font-mono">{testi.phone}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingTestimonial({ ...testi });
                          setIsNewTestimonial(false);
                          setShowTestimonialModal(true);
                        }}
                        className="pill-outline px-3 py-1.5 text-xs font-semibold inline-flex items-center gap-1"
                      >
                        <Edit3 className="h-3.5 w-3.5 text-primary" /> Modifier
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteTestimonial(testi.id)}
                        className="rounded-full bg-destructive/10 text-destructive p-2 hover:bg-destructive hover:text-white transition"
                        title="Supprimer"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 1: PROJECTS */}
        {/* ========================================================================= */}
        {activeTab === "projects" && (
          <div className="mt-8">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl font-bold">Liste des Projets</h2>
                <p className="text-xs text-muted-foreground">
                  Gérez les images, les liens en ligne (Live Demo) et les liens GitHub de chaque projet.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setEditingProject({
                    slug: `project-${Date.now()}`,
                    title: "",
                    category: "Web Development",
                    image: PRESET_IMAGES[0]?.url ?? "",
                    excerpt: "",
                    description: "",
                    technologies: ["JavaScript", "React", "Tailwind CSS"],
                    features: ["Interface responsive et ergonomique", "Performances optimisées"],
                    liveUrl: "",
                    githubUrl: "",
                  });
                  setIsNewProject(true);
                  setShowProjectModal(true);
                }}
                className="pill-red inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold shadow-md"
              >
                <Plus className="h-4 w-4" /> Nouveau Projet
              </button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((proj) => (
                <div
                  key={proj.slug}
                  className="card-soft flex flex-col overflow-hidden border border-border/80 group hover:border-primary/50 transition-all shadow-sm"
                >
                  <div className="relative h-48 w-full bg-muted overflow-hidden">
                    <img
                      src={proj.image}
                      alt={proj.title}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                    <span className="absolute top-3 left-3 rounded-full bg-ink/80 backdrop-blur-sm px-3 py-1 text-[11px] font-semibold text-white">
                      {proj.category}
                    </span>
                  </div>

                  <div className="p-6 flex flex-1 flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-base text-foreground leading-snug">{proj.title}</h3>
                      <p className="mt-2 text-xs text-muted-foreground line-clamp-2">{proj.excerpt}</p>

                      {/* Links Badges */}
                      <div className="mt-4 flex flex-wrap gap-2 text-xs">
                        {proj.liveUrl ? (
                          <a
                            href={proj.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2.5 py-1 text-[11px] font-bold"
                          >
                            <Globe className="h-3 w-3" /> Live Demo
                          </a>
                        ) : (
                          <span className="rounded-full bg-muted text-muted-foreground px-2.5 py-1 text-[11px]">
                            Pas de lien Live
                          </span>
                        )}

                        {proj.githubUrl ? (
                          <a
                            href={proj.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 rounded-full bg-primary/10 text-primary px-2.5 py-1 text-[11px] font-bold"
                          >
                            <Github className="h-3 w-3" /> GitHub
                          </a>
                        ) : (
                          <span className="rounded-full bg-muted text-muted-foreground px-2.5 py-1 text-[11px]">
                            Pas de GitHub
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="mt-6 flex items-center justify-between border-t border-border/60 pt-4">
                      <Link
                        to="/projects/$slug"
                        params={{ slug: proj.slug }}
                        target="_blank"
                        className="text-xs text-muted-foreground hover:text-primary inline-flex items-center gap-1"
                      >
                        <Eye className="h-3.5 w-3.5" /> Voir page
                      </Link>

                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingProject({ ...proj });
                            setIsNewProject(false);
                            setShowProjectModal(true);
                          }}
                          className="pill-outline px-3 py-1.5 text-xs font-medium inline-flex items-center gap-1"
                          title="Modifier le projet"
                        >
                          <Edit3 className="h-3.5 w-3.5 text-primary" /> Modifier
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteProject(proj.slug)}
                          className="rounded-full bg-destructive/10 text-destructive p-2 hover:bg-destructive hover:text-white transition"
                          title="Supprimer"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: POSTS */}
        {/* ========================================================================= */}
        {activeTab === "posts" && (
          <div className="mt-8">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl font-bold">Articles du Blog</h2>
                <p className="text-xs text-muted-foreground">
                  Ajoutez ou modifiez les articles de blog avec leurs images et contenus.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setEditingPost({
                    slug: `article-${Date.now()}`,
                    title: "",
                    category: "Web Development",
                    date: new Date().toISOString().slice(0, 10),
                    readTime: "5 min read",
                    image: PRESET_IMAGES[5]?.url ?? PRESET_IMAGES[0]?.url ?? "",
                    excerpt: "",
                    body: ["Premier paragraphe de l'article..."],
                  });
                  setIsNewPost(true);
                  setShowPostModal(true);
                }}
                className="pill-red inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold shadow-md"
              >
                <Plus className="h-4 w-4" /> Nouvel Article
              </button>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {posts.map((post) => (
                <div
                  key={post.slug}
                  className="card-soft flex flex-col overflow-hidden border border-border/80 group hover:border-primary/50 transition-all shadow-sm"
                >
                  <div className="relative h-48 w-full bg-muted overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                    <span className="absolute top-3 left-3 rounded-full bg-primary px-3 py-1 text-[11px] font-semibold text-primary-foreground">
                      {post.category}
                    </span>
                  </div>

                  <div className="p-6 flex flex-1 flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                        <span>{post.date}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>
                      <h3 className="font-bold text-lg text-foreground leading-snug">{post.title}</h3>
                      <p className="mt-2 text-xs text-muted-foreground line-clamp-2">{post.excerpt}</p>
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t border-border/60 pt-4">
                      <Link
                        to="/blogs"
                        target="_blank"
                        className="text-xs text-muted-foreground hover:text-primary inline-flex items-center gap-1"
                      >
                        <Eye className="h-3.5 w-3.5" /> Voir sur le blog
                      </Link>

                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingPost({ ...post });
                            setIsNewPost(false);
                            setShowPostModal(true);
                          }}
                          className="pill-outline px-3 py-1.5 text-xs font-medium inline-flex items-center gap-1"
                        >
                          <Edit3 className="h-3.5 w-3.5 text-primary" /> Modifier
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeletePost(post.slug)}
                          className="rounded-full bg-destructive/10 text-destructive p-2 hover:bg-destructive hover:text-white transition"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: SOCIALS & CONTACT */}
        {/* ========================================================================= */}
        {activeTab === "socials" && (
          <div className="mt-8">
            <form onSubmit={handleSaveProfileAndSocials} className="card-soft border border-border/80 p-6 sm:p-10">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-border">
                <div>
                  <h2 className="text-xl font-bold">Liens des Réseaux Sociaux & Coordonnées</h2>
                  <p className="text-xs text-muted-foreground">
                    Ces liens seront automatiquement mis à jour sur tout le site (Navbar, Hero, Footer, Contact).
                  </p>
                </div>
                <button
                  type="submit"
                  className="pill-red inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold shadow-md"
                >
                  <Save className="h-4 w-4" /> Enregistrer les Réseaux
                </button>
              </div>

              {/* Social links grid */}
              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                {socialForm.socials.map((soc, idx) => (
                  <div key={soc.id} className="rounded-2xl border border-border/80 bg-background p-4 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2.5">
                        <span className="grid h-8 w-8 place-items-center rounded-full bg-primary/10 text-primary font-bold text-xs">
                          {soc.label[0]}
                        </span>
                        <span className="text-sm font-bold">{soc.label}</span>
                      </div>

                      <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold">
                        <input
                          type="checkbox"
                          checked={soc.enabled}
                          onChange={(e) => {
                            const copy = [...socialForm.socials];
                            copy[idx] = { ...soc, enabled: e.target.checked };
                            setSocialForm({ ...socialForm, socials: copy });
                          }}
                          className="h-4 w-4 rounded text-primary focus:ring-primary"
                        />
                        <span>{soc.enabled ? "Activé" : "Désactivé"}</span>
                      </label>
                    </div>

                    <input
                      type="url"
                      value={soc.href}
                      onChange={(e) => {
                        const copy = [...socialForm.socials];
                        copy[idx] = { ...soc, href: e.target.value };
                        setSocialForm({ ...socialForm, socials: copy });
                      }}
                      placeholder={`https://${soc.id}.com/...`}
                      className="w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 text-xs outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </div>
                ))}
              </div>

              {/* Global Contact Info */}
              <div className="mt-12 pt-8 border-t border-border">
                <h3 className="text-lg font-bold mb-4">Informations de Contact Globales</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1">
                      Email Principal
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        type="email"
                        value={socialForm.email}
                        onChange={(e) => setSocialForm({ ...socialForm, email: e.target.value })}
                        className="w-full rounded-xl border border-border bg-background pl-10 pr-4 py-2.5 text-xs outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1">
                      Email Académique / LBS
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        type="email"
                        value={socialForm.schoolEmail}
                        onChange={(e) => setSocialForm({ ...socialForm, schoolEmail: e.target.value })}
                        className="w-full rounded-xl border border-border bg-background pl-10 pr-4 py-2.5 text-xs outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1">
                      Numéro de Téléphone
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        type="tel"
                        value={socialForm.phone}
                        onChange={(e) => setSocialForm({ ...socialForm, phone: e.target.value })}
                        className="w-full rounded-xl border border-border bg-background pl-10 pr-4 py-2.5 text-xs outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1">
                      Localisation
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        type="text"
                        value={socialForm.location}
                        onChange={(e) => setSocialForm({ ...socialForm, location: e.target.value })}
                        className="w-full rounded-xl border border-border bg-background pl-10 pr-4 py-2.5 text-xs outline-none focus:border-primary"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    type="submit"
                    className="pill-red inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold shadow-md"
                  >
                    <Save className="h-4 w-4" /> Enregistrer Tout
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: BACKUP & RESET */}
        {/* ========================================================================= */}
        {activeTab === "backup" && (
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="card-soft border border-border/80 p-8 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold">Exporter les Données</h3>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                  Sauvegardez l'ensemble de vos projets, articles, messages reçus, avis clients et liens de réseaux sociaux sous forme de fichier JSON.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleExportJSON}
                  className="pill-black inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold"
                >
                  <Download className="h-4 w-4" /> Télécharger Sauvegarde JSON
                </button>
              </div>
            </div>

            <div className="card-soft border border-destructive/30 p-8 flex flex-col justify-between bg-destructive/5">
              <div>
                <h3 className="text-xl font-bold text-destructive">Réinitialiser aux Valeurs d'Origine</h3>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                  Cette action réinitialise tous les projets, les articles de blog, les avis clients et les réseaux sociaux aux contenus d'origine.
                </p>
              </div>

              <div className="mt-8">
                <button
                  type="button"
                  onClick={handleResetDefaults}
                  className="rounded-full bg-destructive text-destructive-foreground px-6 py-3 text-xs font-bold shadow hover:bg-destructive/90 transition"
                >
                  Réinitialiser Toutes les Données
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* TESTIMONIAL MODAL */}
      {/* ========================================================================= */}
      {showTestimonialModal && editingTestimonial && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-xl rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <h3 className="text-xl font-bold">
                {isNewTestimonial ? "Ajouter un Avis / Témoignage" : `Modifier : ${editingTestimonial.name}`}
              </h3>
              <button
                type="button"
                onClick={() => setShowTestimonialModal(false)}
                className="rounded-full bg-muted p-2 hover:bg-primary hover:text-white transition"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveTestimonial} className="mt-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold uppercase text-muted-foreground mb-1">
                    Nom Complet *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingTestimonial.name}
                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, name: e.target.value })}
                    placeholder="ex: Amivi Mensah"
                    className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-muted-foreground mb-1">
                    Poste / Rôle
                  </label>
                  <input
                    type="text"
                    value={editingTestimonial.role}
                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, role: e.target.value })}
                    placeholder="ex: Product Lead"
                    className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold uppercase text-muted-foreground mb-1">
                    Entreprise / Organisation
                  </label>
                  <input
                    type="text"
                    value={editingTestimonial.company}
                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, company: e.target.value })}
                    placeholder="ex: Lomé Business School"
                    className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-muted-foreground mb-1">
                    Numéro de Téléphone (Optionnel)
                  </label>
                  <input
                    type="tel"
                    value={editingTestimonial.phone || ""}
                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, phone: e.target.value })}
                    placeholder="+228 90 00 00 00"
                    className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs outline-none focus:border-primary"
                  />
                </div>
              </div>

              {/* Rating */}
              <div>
                <label className="block text-xs font-bold uppercase text-muted-foreground mb-1.5">
                  Note ({editingTestimonial.rating} / 5 étoiles)
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setEditingTestimonial({ ...editingTestimonial, rating: star })}
                      className="p-1 text-xl"
                    >
                      <Star
                        className={`h-6 w-6 ${
                          editingTestimonial.rating >= star
                            ? "fill-primary text-primary"
                            : "text-muted-foreground/30"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* AVATAR CHOOSER */}
              <div className="rounded-2xl border border-border/80 bg-surface/60 p-4">
                <label className="block text-xs font-bold uppercase text-muted-foreground mb-2">
                  Photo de Profil / Avatar
                </label>

                <div className="flex items-center gap-3 mb-3">
                  {editingTestimonial.avatar ? (
                    <img
                      src={editingTestimonial.avatar}
                      alt="Avatar"
                      className="h-14 w-14 rounded-full object-cover border border-border"
                    />
                  ) : (
                    <div className="grid h-14 w-14 place-items-center rounded-full bg-ink text-white font-bold text-sm">
                      {editingTestimonial.name ? editingTestimonial.name.slice(0, 2).toUpperCase() : "??"}
                    </div>
                  )}

                  <div>
                    <button
                      type="button"
                      onClick={() => testiFileRef.current?.click()}
                      className="pill-black px-3.5 py-1.5 text-xs font-semibold inline-flex items-center gap-1.5"
                    >
                      <Upload className="h-3 w-3" /> Importer une photo
                    </button>
                    <input
                      ref={testiFileRef}
                      type="file"
                      accept="image/*"
                      onChange={handleTestiAvatarUpload}
                      className="hidden"
                    />
                  </div>
                </div>

                <p className="text-[11px] font-semibold text-muted-foreground mb-1.5">Ou choisir parmi les avatars clients :</p>
                <div className="flex flex-wrap gap-2">
                  {CLIENT_AVATARS.map((av) => (
                    <button
                      key={av.id}
                      type="button"
                      onClick={() => setEditingTestimonial({ ...editingTestimonial, avatar: av.url })}
                      className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] transition ${
                        editingTestimonial.avatar === av.url
                          ? "border-primary bg-primary text-primary-foreground font-bold"
                          : "border-border bg-background hover:border-primary/50"
                      }`}
                    >
                      <img src={av.url} alt={av.name} className="h-5 w-5 rounded-full object-cover" />
                      <span>{av.name.split(" ")[0]}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quote */}
              <div>
                <label className="block text-xs font-bold uppercase text-muted-foreground mb-1">
                  Message / Avis *
                </label>
                <textarea
                  rows={4}
                  required
                  value={editingTestimonial.quote}
                  onChange={(e) => setEditingTestimonial({ ...editingTestimonial, quote: e.target.value })}
                  placeholder="Écrivez le retour ou témoignage ici..."
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs outline-none focus:border-primary resize-none"
                />
              </div>

              <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-border">
                <button
                  type="button"
                  onClick={() => setShowTestimonialModal(false)}
                  className="pill-outline px-5 py-2.5 text-xs font-medium"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="pill-red inline-flex items-center gap-2 px-6 py-2.5 text-xs font-bold shadow-md"
                >
                  <Save className="h-4 w-4" /> Enregistrer le Témoignage
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* PROJECT MODAL */}
      {/* ========================================================================= */}
      {showProjectModal && editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <h3 className="text-xl font-bold">
                {isNewProject ? "Ajouter un Projet" : `Modifier : ${editingProject.title || "Projet"}`}
              </h3>
              <button
                type="button"
                onClick={() => setShowProjectModal(false)}
                className="rounded-full bg-muted p-2 hover:bg-primary hover:text-white transition"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="mt-6 space-y-5">
              {/* Title & Slug */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold uppercase text-muted-foreground mb-1">
                    Titre du Projet *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProject.title}
                    onChange={(e) => {
                      const newTitle = e.target.value;
                      const autoSlug = isNewProject
                        ? newTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
                        : editingProject.slug;
                      setEditingProject({
                        ...editingProject,
                        title: newTitle,
                        slug: isNewProject ? autoSlug || editingProject.slug : editingProject.slug,
                      });
                    }}
                    placeholder="ex: Onomamarket — Marketplace"
                    className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-muted-foreground mb-1">
                    Slug / Identifiant URL *
                  </label>
                  <input
                    type="text"
                    required
                    disabled={!isNewProject}
                    value={editingProject.slug}
                    onChange={(e) => setEditingProject({ ...editingProject, slug: e.target.value })}
                    placeholder="ex: onomamarket"
                    className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs outline-none focus:border-primary disabled:opacity-60"
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-bold uppercase text-muted-foreground mb-1">
                  Catégorie
                </label>
                <select
                  value={editingProject.category}
                  onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs outline-none focus:border-primary"
                >
                  {projectCategories.filter((c) => c !== "All").map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* IMAGE SECTION */}
              <div className="rounded-2xl border border-border/80 bg-surface/60 p-4">
                <label className="block text-xs font-bold uppercase text-muted-foreground mb-2">
                  Image du Projet
                </label>

                <div className="flex items-center gap-4 mb-3">
                  <img
                    src={editingProject.image}
                    alt="Aperçu"
                    className="h-20 w-32 rounded-xl object-cover border border-border shadow-sm"
                  />
                  <div className="flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() => projectFileRef.current?.click()}
                      className="pill-black px-4 py-2 text-xs font-semibold inline-flex items-center gap-1.5"
                    >
                      <Upload className="h-3.5 w-3.5" /> Uploader une image (PC)
                    </button>
                    <input
                      ref={projectFileRef}
                      type="file"
                      accept="image/*"
                      onChange={handleProjectImageUpload}
                      className="hidden"
                    />
                    <span className="text-[11px] text-muted-foreground">PNG, JPG, WebP jusqu'à 5 Mo</span>
                  </div>
                </div>

                <div className="mt-3">
                  <p className="text-[11px] font-semibold text-muted-foreground mb-1.5">Ou choisir une image existante :</p>
                  <div className="flex flex-wrap gap-2">
                    {PRESET_IMAGES.map((preset) => (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => setEditingProject({ ...editingProject, image: preset.url })}
                        className={`rounded-lg border px-2.5 py-1 text-[11px] font-medium transition ${
                          editingProject.image === preset.url
                            ? "border-primary bg-primary text-primary-foreground font-bold"
                            : "border-border bg-background hover:border-primary/50"
                        }`}
                      >
                        {preset.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-3">
                  <input
                    type="text"
                    value={editingProject.image.startsWith("data:") ? "" : editingProject.image}
                    onChange={(e) => setEditingProject({ ...editingProject, image: e.target.value })}
                    placeholder="Ou collez une URL directe d'image (https://...)"
                    className="w-full rounded-xl border border-border bg-background px-3.5 py-2 text-xs outline-none focus:border-primary"
                  />
                </div>
              </div>

              {/* LINKS SECTION */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold uppercase text-muted-foreground mb-1">
                    Lien Live du Projet (Voir le projet)
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="url"
                      value={editingProject.liveUrl || ""}
                      onChange={(e) => setEditingProject({ ...editingProject, liveUrl: e.target.value })}
                      placeholder="https://mon-projet.com"
                      className="w-full rounded-xl border border-border bg-background pl-9 pr-3.5 py-2.5 text-xs outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-muted-foreground mb-1">
                    Lien GitHub (Affiché si renseigné)
                  </label>
                  <div className="relative">
                    <Github className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="url"
                      value={editingProject.githubUrl || ""}
                      onChange={(e) => setEditingProject({ ...editingProject, githubUrl: e.target.value })}
                      placeholder="https://github.com/vianel/..."
                      className="w-full rounded-xl border border-border bg-background pl-9 pr-3.5 py-2.5 text-xs outline-none focus:border-primary"
                    />
                  </div>
                </div>
              </div>

              {/* Short Excerpt */}
              <div>
                <label className="block text-xs font-bold uppercase text-muted-foreground mb-1">
                  Court Résumé (Excerpt)
                </label>
                <input
                  type="text"
                  required
                  value={editingProject.excerpt}
                  onChange={(e) => setEditingProject({ ...editingProject, excerpt: e.target.value })}
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs outline-none focus:border-primary"
                />
              </div>

              {/* Detailed Description */}
              <div>
                <label className="block text-xs font-bold uppercase text-muted-foreground mb-1">
                  Description Complète
                </label>
                <textarea
                  rows={3}
                  value={editingProject.description}
                  onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs outline-none focus:border-primary resize-none"
                />
              </div>

              {/* Technologies */}
              <div>
                <label className="block text-xs font-bold uppercase text-muted-foreground mb-1">
                  Technologies (séparées par des virgules)
                </label>
                <input
                  type="text"
                  value={editingProject.technologies.join(", ")}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      technologies: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                    })
                  }
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs outline-none focus:border-primary"
                />
              </div>

              {/* Features */}
              <div>
                <label className="block text-xs font-bold uppercase text-muted-foreground mb-1">
                  Fonctionnalités Clés (une par ligne)
                </label>
                <textarea
                  rows={3}
                  value={editingProject.features.join("\n")}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      features: e.target.value.split("\n").filter((s) => s.trim() !== ""),
                    })
                  }
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs outline-none focus:border-primary resize-none"
                />
              </div>

              <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-border">
                <button
                  type="button"
                  onClick={() => setShowProjectModal(false)}
                  className="pill-outline px-5 py-2.5 text-xs font-medium"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="pill-red inline-flex items-center gap-2 px-6 py-2.5 text-xs font-bold shadow-md"
                >
                  <Save className="h-4 w-4" /> Enregistrer le Projet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* POST MODAL */}
      {/* ========================================================================= */}
      {showPostModal && editingPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <h3 className="text-xl font-bold">
                {isNewPost ? "Ajouter un Article" : `Modifier : ${editingPost.title || "Article"}`}
              </h3>
              <button
                type="button"
                onClick={() => setShowPostModal(false)}
                className="rounded-full bg-muted p-2 hover:bg-primary hover:text-white transition"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSavePost} className="mt-6 space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold uppercase text-muted-foreground mb-1">
                    Titre de l'Article *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingPost.title}
                    onChange={(e) => {
                      const newTitle = e.target.value;
                      const autoSlug = isNewPost
                        ? newTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
                        : editingPost.slug;
                      setEditingPost({
                        ...editingPost,
                        title: newTitle,
                        slug: isNewPost ? autoSlug || editingPost.slug : editingPost.slug,
                      });
                    }}
                    placeholder="ex: Comment concevoir une marketplace"
                    className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-muted-foreground mb-1">
                    Slug / Identifiant URL *
                  </label>
                  <input
                    type="text"
                    required
                    disabled={!isNewPost}
                    value={editingPost.slug}
                    onChange={(e) => setEditingPost({ ...editingPost, slug: e.target.value })}
                    className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs outline-none focus:border-primary disabled:opacity-60"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-muted-foreground mb-1">
                    Catégorie
                  </label>
                  <select
                    value={editingPost.category}
                    onChange={(e) => setEditingPost({ ...editingPost, category: e.target.value })}
                    className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs outline-none focus:border-primary"
                  >
                    {postCategories.filter((c) => c !== "All").map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-muted-foreground mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    value={editingPost.date}
                    onChange={(e) => setEditingPost({ ...editingPost, date: e.target.value })}
                    className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-muted-foreground mb-1">
                    Temps de lecture
                  </label>
                  <input
                    type="text"
                    value={editingPost.readTime}
                    onChange={(e) => setEditingPost({ ...editingPost, readTime: e.target.value })}
                    placeholder="5 min read"
                    className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs outline-none focus:border-primary"
                  />
                </div>
              </div>

              {/* IMAGE SECTION */}
              <div className="rounded-2xl border border-border/80 bg-surface/60 p-4">
                <label className="block text-xs font-bold uppercase text-muted-foreground mb-2">
                  Image de l'Article
                </label>

                <div className="flex items-center gap-4 mb-3">
                  <img
                    src={editingPost.image}
                    alt="Aperçu"
                    className="h-20 w-32 rounded-xl object-cover border border-border shadow-sm"
                  />
                  <div className="flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() => postFileRef.current?.click()}
                      className="pill-black px-4 py-2 text-xs font-semibold inline-flex items-center gap-1.5"
                    >
                      <Upload className="h-3.5 w-3.5" /> Uploader une image
                    </button>
                    <input
                      ref={postFileRef}
                      type="file"
                      accept="image/*"
                      onChange={handlePostImageUpload}
                      className="hidden"
                    />
                  </div>
                </div>

                <div className="mt-3">
                  <p className="text-[11px] font-semibold text-muted-foreground mb-1.5">Ou choisir un preset :</p>
                  <div className="flex flex-wrap gap-2">
                    {PRESET_IMAGES.map((preset) => (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => setEditingPost({ ...editingPost, image: preset.url })}
                        className={`rounded-lg border px-2.5 py-1 text-[11px] font-medium transition ${
                          editingPost.image === preset.url
                            ? "border-primary bg-primary text-primary-foreground font-bold"
                            : "border-border bg-background hover:border-primary/50"
                        }`}
                      >
                        {preset.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-xs font-bold uppercase text-muted-foreground mb-1">
                  Résumé (Excerpt)
                </label>
                <input
                  type="text"
                  required
                  value={editingPost.excerpt}
                  onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs outline-none focus:border-primary"
                />
              </div>

              {/* Body Paragraphs */}
              <div>
                <label className="block text-xs font-bold uppercase text-muted-foreground mb-1">
                  Contenu de l'Article (Paragraphes séparés par une ligne vide)
                </label>
                <textarea
                  rows={6}
                  value={editingPost.body.join("\n\n")}
                  onChange={(e) =>
                    setEditingPost({
                      ...editingPost,
                      body: e.target.value.split("\n\n").filter((p) => p.trim() !== ""),
                    })
                  }
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs outline-none focus:border-primary resize-y"
                />
              </div>

              <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-border">
                <button
                  type="button"
                  onClick={() => setShowPostModal(false)}
                  className="pill-outline px-5 py-2.5 text-xs font-medium"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="pill-red inline-flex items-center gap-2 px-6 py-2.5 text-xs font-bold shadow-md"
                >
                  <Save className="h-4 w-4" /> Enregistrer l'Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
