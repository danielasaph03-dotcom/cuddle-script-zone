import { createFileRoute, Link } from "@tanstack/react-router";
import { FilePlus } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { listAllPosts, formatarData } from "../../../lib/posts";

export const Route = createFileRoute("/admin/_authenticated/")({
  ssr: false,
  loader: () => listAllPosts(),
  component: Dashboard,
});

function Dashboard() {
  const posts = Route.useLoaderData();
  const published = posts.filter((p) => p.status === "published");
  const drafts = posts.filter((p) => p.status === "draft");
  const last = published[0];

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight text-primary">Dashboard</h1>
        <Button asChild>
          <Link to="/admin/posts/new">
            <FilePlus className="h-4 w-4" /> Nova publicação
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total de publicações
            </CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold text-primary">{posts.length}</CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Publicadas</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold text-primary">{published.length}</CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Rascunhos</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold text-primary">{drafts.length}</CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Última publicação
            </CardTitle>
          </CardHeader>
          <CardContent className="truncate text-sm font-semibold text-primary">
            {last ? formatarData(last.published_at!) : "—"}
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-bold text-primary">Publicações recentes</h2>
        {posts.length === 0 ? (
          <p className="text-sm text-muted-foreground">Nenhuma publicação ainda.</p>
        ) : (
          <div className="divide-y divide-border rounded-lg border border-border">
            {posts.slice(0, 5).map((post) => (
              <Link
                key={post.id}
                to="/admin/posts/$id/edit"
                params={{ id: post.id }}
                className="flex items-center justify-between gap-4 px-4 py-3 text-sm hover:bg-secondary/40"
              >
                <span className="truncate font-medium text-foreground">{post.title}</span>
                <Badge variant={post.status === "published" ? "default" : "secondary"}>
                  {post.status === "published" ? "Publicado" : "Rascunho"}
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
