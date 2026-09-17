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
import { listAllPosts, updatePost, type Post } from "../../../lib/posts";

export const Route = createFileRoute("/admin/_authenticated/media")({
  ssr: false,
  loader: () => listAllPosts(),
  component: MediaLibrary,
});

function sizeOf(dataUrl: string): number {
  const base64 = dataUrl.slice(dataUrl.indexOf(",") + 1);
  return Math.round((base64.length * 3) / 4);
}

function MediaLibrary() {
  const posts = Route.useLoaderData();
  const router = useRouter();
  const [toDelete, setToDelete] = useState<Post | null>(null);
  const [deleting, setDeleting] = useState(false);

  const withCover = posts.filter((p) => p.cover_image);

  async function copyUrl(url: string) {
    await navigator.clipboard.writeText(url);
    toast.success("Imagem copiada para a área de transferência.");
  }

  async function confirmDelete() {
    if (!toDelete) return;
    setDeleting(true);
    try {
      await updatePost(toDelete.id, { cover_image: null });
      toast.success("Imagem de capa removida.");
      setToDelete(null);
      router.invalidate();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao remover. Tente novamente.");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight text-primary">Mídia</h1>
      <p className="text-sm text-muted-foreground">
        Imagens de capa das publicações. O upload de uma nova imagem acontece direto na tela de
        "Nova publicação" / "Editar" — aqui dá pra ver, copiar ou remover a capa de cada publicação.
      </p>

      {withCover.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          Nenhuma publicação com imagem de capa ainda.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {withCover.map((post) => (
            <div key={post.id} className="space-y-2 rounded-lg border border-border p-2">
              <div className="aspect-video overflow-hidden rounded bg-muted">
                <img src={post.cover_image!} alt="" className="h-full w-full object-cover" />
              </div>
              <p className="truncate text-xs text-muted-foreground" title={post.title}>
                {post.title}
              </p>
              <p className="text-[10px] text-muted-foreground">
                {(sizeOf(post.cover_image!) / 1024).toFixed(0)} KB
              </p>
              <div className="flex gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => copyUrl(post.cover_image!)}
                >
                  <Copy className="h-3.5 w-3.5" /> Copiar
                </Button>
                <Button variant="ghost" size="icon" onClick={() => setToDelete(post)}>
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
            <AlertDialogTitle>Remover a imagem de capa?</AlertDialogTitle>
            <AlertDialogDescription>
              Isso remove a imagem de capa da publicação <strong>"{toDelete?.title}"</strong>. O
              texto da publicação continua intacto.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} disabled={deleting}>
              Remover mesmo assim
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
