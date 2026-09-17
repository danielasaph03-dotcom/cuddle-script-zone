const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

export interface UploadedImage {
  path: string;
  publicUrl: string;
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Falha ao ler a imagem."));
    reader.readAsDataURL(file);
  });
}

/**
 * Valida tipo e tamanho, depois converte a imagem numa data URL (guardada
 * direto na coluna cover_image do post — nada é enviado pra um serviço
 * externo nem gravado como arquivo solto no servidor).
 */
export async function uploadArticleImage(file: File): Promise<UploadedImage> {
  if (!ALLOWED_TYPES.has(file.type)) {
    throw new Error("Formato de imagem não suportado. Use JPG, PNG ou WEBP.");
  }
  if (file.size > MAX_SIZE_BYTES) {
    throw new Error("Imagem muito grande. O limite é 5MB.");
  }

  const dataUrl = await fileToDataUrl(file);
  return { path: "", publicUrl: dataUrl };
}
