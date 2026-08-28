import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2, Upload, X } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { RichTextEditor } from "./RichTextEditor";
import { slugify } from "../../lib/slugify";
import { uploadArticleImage } from "../../lib/storage";
import { createPost, updatePost, isSlugTaken, type Post, type PostStatus } from "../../lib/posts";

const schema = z.object({
  title: z.string().min(1, "Informe o título."),
  slug: z
    .string()
    .min(1, "Informe o slug.")
    .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "Use apenas letras minúsculas, números e hífens."),
  excerpt: z.string().min(1, "Informe o resumo."),
  category: z.string().min(1, "Informe a categoria."),
  author: z.string().min(1, "Informe o autor."),
  published_at: z.string().min(1, "Informe a data."),
  content: z.string().min(1, "Escreva o conteúdo."),
  seo_title: z.string().optional(),
  seo_description: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

function toDateInputValue(iso: string | null): string {
  if (!iso) return new Date().toISOString().slice(0, 10);
  return iso.slice(0, 10);
}

export function PostForm({ post, onSaved }: { post?: Post; onSaved: (post: Post) => void }) {
  const isEditing = !!post;
  const [slugTouched, setSlugTouched] = useState(isEditing);
  const [coverImageUrl, setCoverImageUrl] = useState<string | null>(post?.cover_image ?? null);
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(post?.cover_image ?? null);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState<PostStatus | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: post?.title ?? "",
      slug: post?.slug ?? "",
      excerpt: post?.excerpt ?? "",
      category: post?.category ?? "",
      author: post?.author ?? "",
      published_at: toDateInputValue(post?.published_at ?? null),
      content: post?.content ?? "",
      seo_title: post?.seo_title ?? "",
      seo_description: post?.seo_description ?? "",
    },
  });

  function handleTitleChange(value: string) {
    form.setValue("title", value);
    if (!slugTouched) {
      form.setValue("slug", slugify(value), { shouldValidate: true });
    }
  }

  function handleCoverFileChange(file: File | null) {
    setCoverImageFile(file);
    if (file) setCoverPreview(URL.createObjectURL(file));
  }

  async function onSubmit(values: FormValues, status: PostStatus) {
    setSubmitting(status);
    try {
      const taken = await isSlugTaken(values.slug, post?.id);
      if (taken) {
        form.setError("slug", { message: "Já existe uma publicação com esse slug." });
        setSubmitting(null);
        return;
      }

      let finalCoverImage = coverImageUrl;
      if (coverImageFile) {
        setUploading(true);
        const { publicUrl } = await uploadArticleImage(coverImageFile);
        finalCoverImage = publicUrl;
        setUploading(false);
      }

      const publishedAtIso =
        status === "published" ? new Date(values.published_at + "T00:00:00Z").toISOString() : null;

      const input = {
        title: values.title,
        slug: values.slug,
        excerpt: values.excerpt,
        content: values.content,
        cover_image: finalCoverImage,
        category: values.category,
        author: values.author,
        status,
        published_at: publishedAtIso,
        seo_title: values.seo_title || null,
        seo_description: values.seo_description || null,
      };

      const saved = isEditing ? await updatePost(post.id, input) : await createPost(input);
      toast.success(status === "published" ? "Publicação publicada." : "Rascunho salvo.");
      onSaved(saved);
    } catch (err) {
      setUploading(false);
      toast.error(err instanceof Error ? err.message : "Erro ao salvar. Tente novamente.");
    } finally {
      setSubmitting(null);
    }
  }

  const busy = submitting !== null || uploading;

  return (
    <Form {...form}>
      <form className="space-y-8">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-6 md:col-span-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input {...field} onChange={(e) => handleTitleChange(e.target.value)} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug (URL)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onChange={(e) => {
                        setSlugTouched(true);
                        field.onChange(e);
                      }}
                    />
                  </FormControl>
                  <p className="text-xs text-muted-foreground">
                    /noticias/{form.watch("slug") || "..."}
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="excerpt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Resumo</FormLabel>
                  <FormControl>
                    <Textarea rows={3} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categoria</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Ex.: Tendências" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Autor</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="published_at"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-2">
            <Label>Imagem de capa</Label>
            {coverPreview ? (
              <div className="relative h-40 w-full overflow-hidden rounded-md border border-border bg-muted">
                <img src={coverPreview} alt="" className="h-full w-full object-cover" />
                <Button
                  type="button"
                  variant="secondary"
                  size="icon"
                  className="absolute right-2 top-2 h-7 w-7"
                  onClick={() => {
                    setCoverPreview(null);
                    setCoverImageUrl(null);
                    setCoverImageFile(null);
                  }}
                  aria-label="Remover imagem"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <label className="flex h-40 w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-dashed border-input text-sm text-muted-foreground hover:bg-secondary/40">
                <Upload className="h-5 w-5" />
                JPG, PNG ou WEBP — até 5MB
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={(e) => handleCoverFileChange(e.target.files?.[0] ?? null)}
                />
              </label>
            )}
          </div>
        </div>

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Conteúdo</FormLabel>
              <FormControl>
                <RichTextEditor value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-6 rounded-lg border border-border p-4">
          <p className="text-sm font-bold uppercase tracking-widest text-primary">SEO (opcional)</p>
          <FormField
            control={form.control}
            name="seo_title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meta title</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Se vazio, usa o título da publicação" />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="seo_description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meta description</FormLabel>
                <FormControl>
                  <Textarea
                    rows={2}
                    {...field}
                    placeholder="Se vazio, usa o resumo da publicação"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-wrap gap-3">
          <Button
            type="button"
            variant="outline"
            disabled={busy}
            onClick={form.handleSubmit((values) => onSubmit(values, "draft"))}
          >
            {submitting === "draft" && <Loader2 className="h-4 w-4 animate-spin" />}
            Salvar como rascunho
          </Button>
          <Button
            type="button"
            disabled={busy}
            onClick={form.handleSubmit((values) => onSubmit(values, "published"))}
          >
            {submitting === "published" && <Loader2 className="h-4 w-4 animate-spin" />}
            Publicar
          </Button>
        </div>
      </form>
    </Form>
  );
}
