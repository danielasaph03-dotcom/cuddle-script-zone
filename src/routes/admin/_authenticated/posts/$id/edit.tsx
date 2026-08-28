import { createFileRoute, notFound, useRouter } from "@tanstack/react-router";
import { PostForm } from "../../../../../components/admin/PostForm";
import { getPostById } from "../../../../../lib/posts";

export const Route = createFileRoute("/admin/_authenticated/posts/$id/edit")({
  ssr: false,
  loader: async ({ params }) => {
    const post = await getPostById(params.id);
    if (!post) throw notFound();
    return post;
  },
  component: EditPost,
});

function EditPost() {
  const post = Route.useLoaderData();
  const router = useRouter();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight text-primary">Editar publicação</h1>
      <PostForm post={post} onSaved={() => router.invalidate()} />
    </div>
  );
}
