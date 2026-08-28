import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PostForm } from "../../../../components/admin/PostForm";

export const Route = createFileRoute("/admin/_authenticated/posts/new")({
  ssr: false,
  component: NewPost,
});

function NewPost() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight text-primary">Nova publicação</h1>
      <PostForm
        onSaved={(post) => navigate({ to: "/admin/posts/$id/edit", params: { id: post.id } })}
      />
    </div>
  );
}
