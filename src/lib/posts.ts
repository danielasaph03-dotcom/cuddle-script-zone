import { requireSupabase, supabase } from "./supabase";

export type PostStatus = "draft" | "published";

/** landscape = paisagem (16:9), square = quadrado (feed do Instagram, 1:1), portrait = retrato (4:5) */
export type CoverImageRatio = "landscape" | "square" | "portrait";

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string | null;
  cover_image_ratio: CoverImageRatio;
  category: string;
  author: string;
  status: PostStatus;
  published_at: string | null;
  seo_title: string | null;
  seo_description: string | null;
  created_at: string;
  updated_at: string;
}

export const COVER_IMAGE_RATIO_OPTIONS: {
  value: CoverImageRatio;
  label: string;
  className: string;
}[] = [
  { value: "landscape", label: "Paisagem (16:9)", className: "aspect-video" },
  { value: "square", label: "Quadrado — feed Instagram (1:1)", className: "aspect-square" },
  { value: "portrait", label: "Retrato (4:5)", className: "aspect-[4/5]" },
];

export function coverImageAspectClass(ratio: CoverImageRatio): string {
  return COVER_IMAGE_RATIO_OPTIONS.find((o) => o.value === ratio)?.className ?? "aspect-video";
}

export type PostInput = Omit<Post, "id" | "created_at" | "updated_at">;

const TABLE = "posts";

/** Publicações visíveis ao público, mais recentes primeiro (usa a RLS pública). */
export async function listPublishedPosts(limit?: number): Promise<Post[]> {
  if (!supabase) return [];
  let query = supabase
    .from(TABLE)
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false });
  if (limit) query = query.limit(limit);
  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}

export async function getPublishedPostBySlug(slug: string): Promise<Post | null> {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .eq("status", "published")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw error;
  return data;
}

/** Publicações relacionadas: mesma categoria primeiro, completa com as mais recentes. */
export async function getRelatedPosts(post: Post, limit = 3): Promise<Post[]> {
  const all = await listPublishedPosts();
  const others = all.filter((p) => p.id !== post.id);
  const sameCategory = others.filter((p) => p.category === post.category);
  const rest = others.filter((p) => p.category !== post.category);
  return [...sameCategory, ...rest].slice(0, limit);
}

// -------------------------------------------------------------------------
// Abaixo: só usado dentro do painel /admin (exige usuário autenticado, a
// RLS bloqueia quem não estiver logado).
// -------------------------------------------------------------------------

/** Todas as publicações (rascunho + publicadas), mais recentes primeiro. */
export async function listAllPosts(): Promise<Post[]> {
  const { data, error } = await requireSupabase()
    .from(TABLE)
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function getPostById(id: string): Promise<Post | null> {
  const { data, error } = await requireSupabase()
    .from(TABLE)
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function isSlugTaken(slug: string, excludeId?: string): Promise<boolean> {
  let query = requireSupabase().from(TABLE).select("id").eq("slug", slug);
  if (excludeId) query = query.neq("id", excludeId);
  const { data, error } = await query.maybeSingle();
  if (error) throw error;
  return data !== null;
}

export async function createPost(input: PostInput): Promise<Post> {
  const { data, error } = await requireSupabase().from(TABLE).insert(input).select().single();
  if (error) throw error;
  return data;
}

export async function updatePost(id: string, input: Partial<PostInput>): Promise<Post> {
  const { data, error } = await requireSupabase()
    .from(TABLE)
    .update(input)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deletePost(id: string): Promise<void> {
  const { error } = await requireSupabase().from(TABLE).delete().eq("id", id);
  if (error) throw error;
}

// -------------------------------------------------------------------------
// Helpers de exibição (usados tanto no site público quanto no painel).
// -------------------------------------------------------------------------

export function calcularTempoLeitura(post: Pick<Post, "content">): number {
  const texto = post.content.replace(/<[^>]+>/g, " ");
  const palavras = texto.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(palavras / 200));
}

export function formatarData(dataISO: string): string {
  // O painel salva a data escolhida como meia-noite UTC (ver PostForm.tsx);
  // formatar em UTC garante que o dia exibido seja sempre o dia escolhido
  // pelo admin, independentemente do fuso horário de quem está lendo.
  return new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(dataISO));
}
