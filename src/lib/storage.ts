import { requireSupabase } from "./supabase";

const BUCKET = "article-images";
const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

const MIME_TO_EXT: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

export interface UploadedImage {
  path: string;
  publicUrl: string;
}

/** Valida tipo (pelo conteúdo real do arquivo, não pela extensão do nome) e tamanho, depois envia. */
export async function uploadArticleImage(file: File): Promise<UploadedImage> {
  const ext = MIME_TO_EXT[file.type];
  if (!ext) {
    throw new Error("Formato de imagem não suportado. Use JPG, PNG ou WEBP.");
  }
  if (file.size > MAX_SIZE_BYTES) {
    throw new Error("Imagem muito grande. O limite é 5MB.");
  }

  const path = `${crypto.randomUUID()}.${ext}`;
  const supabase = requireSupabase();
  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    contentType: file.type,
    upsert: false,
  });
  if (error) throw error;

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return { path, publicUrl: data.publicUrl };
}

export async function deleteArticleImage(path: string): Promise<void> {
  const { error } = await requireSupabase().storage.from(BUCKET).remove([path]);
  if (error) throw error;
}

export interface MediaFile {
  name: string;
  publicUrl: string;
  createdAt: string | null;
  sizeBytes: number | undefined;
}

export async function listArticleImages(): Promise<MediaFile[]> {
  const supabase = requireSupabase();
  const { data, error } = await supabase.storage
    .from(BUCKET)
    .list("", { sortBy: { column: "created_at", order: "desc" } });
  if (error) throw error;
  return (data ?? [])
    .filter((f) => f.id !== null) // ignora "placeholder" de pastas
    .map((f) => ({
      name: f.name,
      publicUrl: supabase.storage.from(BUCKET).getPublicUrl(f.name).data.publicUrl,
      createdAt: f.created_at,
      sizeBytes: f.metadata?.size as number | undefined,
    }));
}
