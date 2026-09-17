import { randomUUID } from "node:crypto";
import { createServerFn } from "@tanstack/react-start";
import { getCookie } from "@tanstack/react-start/server";
import { getPool, isDbConfigured } from "./db";
import { verifySessionToken, SESSION_COOKIE_NAME } from "./cookies";

export type PostStatus = "draft" | "published";

/**
 * landscape = paisagem (16:9), square = quadrado (feed do Instagram, 1:1),
 * portrait = retrato (4:5), portrait_story = retrato Stories/Reels (9:16),
 * original = mantém a proporção original da imagem, sem cortar.
 */
export type CoverImageRatio = "landscape" | "square" | "portrait" | "portrait_story" | "original";

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
  { value: "portrait", label: "Retrato — feed Instagram (4:5)", className: "aspect-[4/5]" },
  {
    value: "portrait_story",
    label: "Retrato — Stories/Reels (9:16)",
    className: "aspect-[9/16]",
  },
  { value: "original", label: "Original (sem cortar)", className: "" },
];

export function coverImageAspectClass(ratio: CoverImageRatio): string {
  return COVER_IMAGE_RATIO_OPTIONS.find((o) => o.value === ratio)?.className ?? "aspect-video";
}

/** "original" não tem proporção fixa: a imagem usa a altura natural em vez de preencher a caixa. */
export function coverImageIsOriginal(ratio: CoverImageRatio): boolean {
  return ratio === "original";
}

export type PostInput = Omit<Post, "id" | "created_at" | "updated_at">;

const TABLE = "posts";

const UPDATABLE_COLUMNS = new Set<keyof PostInput>([
  "title",
  "slug",
  "excerpt",
  "content",
  "cover_image",
  "cover_image_ratio",
  "category",
  "author",
  "status",
  "published_at",
  "seo_title",
  "seo_description",
]);

interface PostRow {
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
  published_at: Date | string | null;
  seo_title: string | null;
  seo_description: string | null;
  created_at: Date | string;
  updated_at: Date | string;
}

function toIso(value: Date | string): string {
  return value instanceof Date ? value.toISOString() : new Date(value).toISOString();
}

function firstRowOrThrow(rows: PostRow[]): PostRow {
  const row = rows[0];
  if (!row) throw new Error("Publicação não encontrada.");
  return row;
}

function rowToPost(row: PostRow): Post {
  return {
    ...row,
    published_at: row.published_at ? toIso(row.published_at) : null,
    created_at: toIso(row.created_at),
    updated_at: toIso(row.updated_at),
  };
}

/** Lança se não houver uma sessão de admin válida no cookie da requisição atual. */
function requireAdmin(): void {
  const token = getCookie(SESSION_COOKIE_NAME);
  if (!verifySessionToken(token)) {
    throw new Error("Não autenticado.");
  }
}

// -------------------------------------------------------------------------
// Público — usado pelo site (Home, /noticias, /noticias/$slug).
// -------------------------------------------------------------------------

const _listPublishedPosts = createServerFn({ method: "GET" })
  .validator((limit: number | undefined) => limit)
  .handler(async ({ data: limit }) => {
    if (!isDbConfigured) return [];
    const pool = getPool();
    const sql = limit
      ? "SELECT * FROM posts WHERE status = 'published' ORDER BY published_at DESC LIMIT ?"
      : "SELECT * FROM posts WHERE status = 'published' ORDER BY published_at DESC";
    const [rows] = await pool.query(sql, limit ? [limit] : []);
    return (rows as PostRow[]).map(rowToPost);
  });

/** Publicações visíveis ao público, mais recentes primeiro. */
export async function listPublishedPosts(limit?: number): Promise<Post[]> {
  return _listPublishedPosts({ data: limit });
}

const _getPublishedPostBySlug = createServerFn({ method: "GET" })
  .validator((slug: string) => slug)
  .handler(async ({ data: slug }) => {
    if (!isDbConfigured) return null;
    const pool = getPool();
    const [rows] = await pool.query(
      "SELECT * FROM posts WHERE status = 'published' AND slug = ? LIMIT 1",
      [slug],
    );
    const row = (rows as PostRow[])[0];
    return row ? rowToPost(row) : null;
  });

export async function getPublishedPostBySlug(slug: string): Promise<Post | null> {
  return _getPublishedPostBySlug({ data: slug });
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
// Abaixo: só usado dentro do painel /admin (exige sessão de admin válida).
// -------------------------------------------------------------------------

const _listAllPosts = createServerFn({ method: "GET" }).handler(async () => {
  requireAdmin();
  const [rows] = await getPool().query("SELECT * FROM posts ORDER BY created_at DESC");
  return (rows as PostRow[]).map(rowToPost);
});

/** Todas as publicações (rascunho + publicadas), mais recentes primeiro. */
export async function listAllPosts(): Promise<Post[]> {
  return _listAllPosts();
}

const _getPostById = createServerFn({ method: "GET" })
  .validator((id: string) => id)
  .handler(async ({ data: id }) => {
    requireAdmin();
    const [rows] = await getPool().query("SELECT * FROM posts WHERE id = ?", [id]);
    const row = (rows as PostRow[])[0];
    return row ? rowToPost(row) : null;
  });

export async function getPostById(id: string): Promise<Post | null> {
  return _getPostById({ data: id });
}

const _isSlugTaken = createServerFn({ method: "GET" })
  .validator((data: { slug: string; excludeId?: string }) => data)
  .handler(async ({ data }) => {
    requireAdmin();
    const sql = data.excludeId
      ? "SELECT id FROM posts WHERE slug = ? AND id <> ? LIMIT 1"
      : "SELECT id FROM posts WHERE slug = ? LIMIT 1";
    const params = data.excludeId ? [data.slug, data.excludeId] : [data.slug];
    const [rows] = await getPool().query(sql, params);
    return (rows as unknown[]).length > 0;
  });

export async function isSlugTaken(slug: string, excludeId?: string): Promise<boolean> {
  return _isSlugTaken({ data: excludeId ? { slug, excludeId } : { slug } });
}

const _createPost = createServerFn({ method: "POST" })
  .validator((input: PostInput) => input)
  .handler(async ({ data: input }) => {
    requireAdmin();
    const pool = getPool();
    const id = randomUUID();
    await pool.query(
      `INSERT INTO ${TABLE}
        (id, title, slug, excerpt, content, cover_image, cover_image_ratio, category, author, status, published_at, seo_title, seo_description)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        input.title,
        input.slug,
        input.excerpt,
        input.content,
        input.cover_image,
        input.cover_image_ratio,
        input.category,
        input.author,
        input.status,
        input.published_at,
        input.seo_title,
        input.seo_description,
      ],
    );
    const [rows] = await pool.query("SELECT * FROM posts WHERE id = ?", [id]);
    return rowToPost(firstRowOrThrow(rows as PostRow[]));
  });

export async function createPost(input: PostInput): Promise<Post> {
  return _createPost({ data: input });
}

const _updatePost = createServerFn({ method: "POST" })
  .validator((data: { id: string; input: Partial<PostInput> }) => data)
  .handler(async ({ data }) => {
    requireAdmin();
    const pool = getPool();
    const entries = Object.entries(data.input).filter(
      ([key, value]) => value !== undefined && UPDATABLE_COLUMNS.has(key as keyof PostInput),
    );
    if (entries.length > 0) {
      const setClause = entries.map(([key]) => `${key} = ?`).join(", ");
      const values = entries.map(([, value]) => value);
      await pool.query(`UPDATE ${TABLE} SET ${setClause} WHERE id = ?`, [...values, data.id]);
    }
    const [rows] = await pool.query("SELECT * FROM posts WHERE id = ?", [data.id]);
    return rowToPost(firstRowOrThrow(rows as PostRow[]));
  });

export async function updatePost(id: string, input: Partial<PostInput>): Promise<Post> {
  return _updatePost({ data: { id, input } });
}

const _deletePost = createServerFn({ method: "POST" })
  .validator((id: string) => id)
  .handler(async ({ data: id }) => {
    requireAdmin();
    await getPool().query("DELETE FROM posts WHERE id = ?", [id]);
  });

export async function deletePost(id: string): Promise<void> {
  await _deletePost({ data: id });
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
