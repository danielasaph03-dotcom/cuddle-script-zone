import { useState } from "react";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { Copy, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../../../components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../../components/ui/alert-dialog";
import { listArticleImages, deleteArticleImage, type MediaFile } from "../../../lib/storage";
import { listAllPosts } from "../../../lib/posts";

export const Route = createFileRoute("/admin/_authenticated/media")({
  ssr: false,
  loader: async () => {
    const [files, posts] = await Promise.all([listArticleImages(), listAllPosts()]);
    return { files, posts };
  },
  component: MediaLibrary,
});

function MediaLibrary() {
  const { files, posts } = Route.useLoaderData();
  const router = useRouter();
  const [toDelete, setToDelete] = useState<MediaFile | null>(null);
  const [deleting, setDeleting] = useState(false);

  function usedBy(file: MediaFile) {
    return posts.find((p) => p.cover_image === file.publicUrl);
  }

  async function copyUrl(url: string) {
    await navigator.clipboard.writeText(url);
    toast.success("URL copiada.");
  }

  async function confirmDelete() {
    if (!toDelete) return;
    setDeleting(true);
    try {
      await deleteArticleImage(toDelete.name);
      toast.success("Imagem excluída.");
      setToDelete(null);
      router.invalidate();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao excluir. Tente novamente.");
    } finally {
      setDeleting(false);
    }
  }

  const conflictingPost = toDelete ? usedBy(toDelete) : undefined;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight text-primary">Mídia</h1>
      <p className="text-sm text-muted-foreground">
        Imagens enviadas pelo painel (capas de publicações). O upload de uma nova imagem acontece
        direto na tela de "Nova publicação" / "Editar".
      </p>

      {files.length === 0 ? (
        <p className="text-sm text-muted-foreground">Nenhuma imagem enviada ainda.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {files.map((file) => (
            <div key={file.name} className="space-y-2 rounded-lg border border-border p-2">
              <div className="aspect-video overflow-hidden rounded bg-muted">
                <img src={file.publicUrl} alt="" className="h-full w-full object-cover" />
              </div>
              <p className="truncate text-xs text-muted-foreground" title={file.name}>
                {file.name}
              </p>
              <div className="flex gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => copyUrl(file.publicUrl)}
                >
                  <Copy className="h-3.5 w-3.5" /> Copiar
                </Button>
                <Button variant="ghost" size="icon" onClick={() => setToDelete(file)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <AlertDialog open={!!toDelete} onOpenChange={(open) => !open && setToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir esta imagem?</AlertDialogTitle>
            <AlertDialogDescription>
              {conflictingPost ? (
                <>
                  Esta imagem está sendo usada como capa da publicação{" "}
                  <strong>"{conflictingPost.title}"</strong>. Excluir mesmo assim vai deixar essa
                  publicação sem imagem de capa.
                </>
              ) : (
                "Essa ação não pode ser desfeita."
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} disabled={deleting}>
              Excluir mesmo assim
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
