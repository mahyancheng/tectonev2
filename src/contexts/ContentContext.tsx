// src/contexts/ContentContext.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";
import { useLocation } from "react-router-dom";
import type { Query, DocumentData } from "firebase/firestore";
import { getDb } from "@/lib/firebase";

/* ======================= Types ======================= */
export interface BlogPost {
  updatedAt: Date;
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  publishedAt: Date;
  imageUrl?: string;
  tags: string[];
  featured?: boolean;
}

interface ContentContextType {
  blogPosts: BlogPost[];
  addBlogPost: (post: Omit<BlogPost, "publishedAt" | "updatedAt">) => Promise<void>;
  updateBlogPost: (id: string, post: Partial<BlogPost>) => Promise<void>;
  deleteBlogPost: (id: string) => Promise<void>;
  setFeaturedPost: (id: string) => Promise<void>;
  getFeaturedPost: () => BlogPost | undefined;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error("useContent must be used within a ContentProvider");
  return ctx;
}

/* ======================= Helpers ======================= */
const sanitizeTags = (tags: unknown): string[] => {
  if (Array.isArray(tags)) return tags.map((t) => String(t).trim()).filter(Boolean);
  if (typeof tags === "string")
    return tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
  return [];
};

const docToBlogPost = (snap: any): BlogPost => {
  const d = snap.data() || {};
  return {
    id: snap.id,
    title: d.title ?? "",
    content: d.content ?? "",
    excerpt: d.excerpt ?? "",
    author: d.author ?? "",
    imageUrl: d.imageUrl ?? "",
    tags: sanitizeTags(d.tags),
    featured: !!d.featured,
    publishedAt: d.publishedAt?.toDate?.() ?? new Date(0),
    updatedAt: d.updatedAt?.toDate?.() ?? new Date(0),
  };
};

const toSlug = (s: string) =>
  String(s)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-_]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);

const isTransportError = (err: any) => {
  const code = err?.code || "";
  return !code || ["unavailable", "cancelled", "deadline-exceeded", "internal"].includes(code);
};

async function startPolling<T>(
  q: Query<DocumentData>,
  mapFn: (snap: any) => T,
  setter: React.Dispatch<React.SetStateAction<T[]>>,
  intervalMs = 10000
) {
  const { getDocs } = await import("firebase/firestore");

  let timer: number | undefined;

  const run = async () => {
    try {
      const snap = await getDocs(q);
      setter(snap.docs.map(mapFn));
    } catch (e) {
      console.error("[poll blogPosts] failed:", e);
    }
  };

  run();
  timer = window.setInterval(run, intervalMs);

  return () => {
    if (timer) window.clearInterval(timer);
  };
}

/* ======================= Provider ======================= */
export function ContentProvider({ children }: { children: ReactNode }): JSX.Element {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const { pathname } = useLocation();

  // ✅ 只在 Blog 页面才加载/订阅
  const shouldLoadBlog =   pathname.startsWith("/blog") || pathname.startsWith("/admin");


  useEffect(() => {
    if (!shouldLoadBlog) return;

    let unsub: undefined | (() => void);
    let stopPolling: undefined | (() => void);

    (async () => {
      const db = await getDb();
      const {
        collection,
        onSnapshot,
        orderBy,
        query,
      } = await import("firebase/firestore");

      const qBlog = query(collection(db, "blogPosts"), orderBy("publishedAt", "desc"));

      try {
        unsub = onSnapshot(
          qBlog,
          (snap) => setBlogPosts(snap.docs.map(docToBlogPost)),
          async (err) => {
            console.error("[onSnapshot blogPosts] error:", err?.code, err?.message);
            if (isTransportError(err)) {
              unsub?.();
              stopPolling = await startPolling(qBlog, docToBlogPost, setBlogPosts);
            }
          }
        );
      } catch (e) {
        console.error("[onSnapshot blogPosts] setup failed:", e);
        stopPolling = await startPolling(qBlog, docToBlogPost, setBlogPosts);
      }
    })();

    return () => {
      unsub?.();
      stopPolling?.();
    };
  }, [shouldLoadBlog]);

  /* =========== CRUD: Blog =========== */
  const addBlogPost: ContentContextType["addBlogPost"] = async (input) => {
    const db = await getDb();
    const { doc, getDoc, setDoc, serverTimestamp } = await import("firebase/firestore");

    const id = toSlug(input.id);
    if (!id) throw new Error("Post ID (URL) is required.");

    const existed = await getDoc(doc(db, "blogPosts", id));
    if (existed.exists()) throw new Error(`ID already exists: ${id}`);

    const payload = {
      title: input.title,
      content: input.content,
      excerpt: input.excerpt || String(input.content).slice(0, 150) + "...",
      author: input.author,
      imageUrl: input.imageUrl || "",
      tags: sanitizeTags(input.tags),
      featured: !!input.featured,
      publishedAt: serverTimestamp(),
    };

    await setDoc(doc(db, "blogPosts", id), payload);
  };

  const updateBlogPost: ContentContextType["updateBlogPost"] = async (id, updates) => {
    const db = await getDb();
    const { doc, updateDoc } = await import("firebase/firestore");

    const ref = doc(db, "blogPosts", id);
    const payload: Record<string, any> = {};
    if (updates.title !== undefined) payload.title = updates.title;
    if (updates.content !== undefined) payload.content = updates.content;
    if (updates.excerpt !== undefined) payload.excerpt = updates.excerpt;
    if (updates.author !== undefined) payload.author = updates.author;
    if (updates.imageUrl !== undefined) payload.imageUrl = updates.imageUrl;
    if (updates.tags !== undefined) payload.tags = sanitizeTags(updates.tags);
    if (updates.featured !== undefined) payload.featured = !!updates.featured;

    await updateDoc(ref, payload);
  };

  const deleteBlogPost: ContentContextType["deleteBlogPost"] = async (id) => {
    const db = await getDb();
    const { deleteDoc, doc } = await import("firebase/firestore");
    await deleteDoc(doc(db, "blogPosts", id));
  };

  const setFeaturedPost: ContentContextType["setFeaturedPost"] = async (id) => {
    const db = await getDb();
    const { collection, getDocs, writeBatch } = await import("firebase/firestore");

    const batch = writeBatch(db);
    const snap = await getDocs(collection(db, "blogPosts"));
    snap.forEach((d) => batch.update(d.ref, { featured: d.id === id }));
    await batch.commit();
  };

  const getFeaturedPost = useMemo(
    () => () => blogPosts.find((p) => p.featured) as BlogPost | undefined,
    [blogPosts]
  );

  const value: ContentContextType = {
    blogPosts,
    addBlogPost,
    updateBlogPost,
    deleteBlogPost,
    setFeaturedPost,
    getFeaturedPost,
  };

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}
