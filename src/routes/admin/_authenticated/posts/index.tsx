import { useState } from "react";
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { Eye, Pencil, Trash2, FilePlus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Badge } from "../../../../components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../../../components/ui/alert-dialog";
import {
  listAllPosts,
  deletePost,
  formatarData,
  type Post,
  type PostStatus,
} from "../../../../lib/posts";

export const Route = createFileRoute("/admin/_authenticated/posts/")({
  ssr: false,
  loader: () => listAllPosts(),
  component: PostsList,
});

type FilterStatus = "all" | PostStatus;

function PostsList() {
  const posts = Route.useLoaderData();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterStatus>("all");
  const [postToDelete, setPostToDelete] = useState<Post | null>(null);
  const [deleting, setDeleting] = useState(false);

  const filtered = posts.filter((post) => {
    if (filter !== "all" && post.status !== filter) return false;
    if (search && !post.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  async function confirmDelete() {
    if (!postToDelete) return;
    setDeleting(true);
    try {
      await deletePost(postToDelete.id);
      toast.success("Publicação excluída.");
      setPostToDelete(null);
      router.invalidate();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao excluir. Tente novamente.");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight text-primary">Postagens</h1>
        <Button asChild>
          <Link to="/admin/posts/new">
            <FilePlus className="h-4 w-4" /> Nova publicação
          </Link>
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Input
          placeholder="Buscar por título..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs"
        />
        <div className="flex gap-2">
          {(["all", "published", "draft"] as const).map((f) => (
            <Button
              key={f}
              size="sm"
              variant={filter === f ? "default" : "outline"}
              onClick={() => setFilter(f)}
            >
              {f === "all" ? "Todos" : f === "published" ? "Publicados" : "Rascunhos"}
            </Button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Imagem</TableHead>
              <TableHead>Título</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Data</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-sm text-muted-foreground">
                  Nenhuma publicação encontrada.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((post) => (
                <TableRow key={post.id}>
                  <TableCell>
                    <div className="h-10 w-14 overflow-hidden rounded bg-muted">
                      {post.cover_image && (
                        <img src={post.cover_image} alt="" className="h-full w-full object-cover" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs truncate font-medium">{post.title}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{post.category}</TableCell>
                  <TableCell>
                    <Badge variant={post.status === "published" ? "default" : "secondary"}>
                      {post.status === "published" ? "Publicado" : "Rascunho"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {post.published_at ? formatarData(post.published_at) : "—"}
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-1">
                      {post.status === "published" && (
                        <Button asChild variant="ghost" size="icon" title="Visualizar">
                          <a
                            href={`/noticias/${post.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Eye className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                      <Button asChild variant="ghost" size="icon" title="Editar">
                        <Link to="/admin/posts/$id/edit" params={{ id: post.id }}>
                          <Pencil className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        title="Excluir"
                        onClick={() => setPostToDelete(post)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={!!postToDelete} onOpenChange={(open) => !open && setPostToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Tem certeza que deseja excluir esta publicação?</AlertDialogTitle>
            <AlertDialogDescription>
              "{postToDelete?.title}" será removida permanentemente. Essa ação não pode ser
              desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} disabled={deleting}>
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
