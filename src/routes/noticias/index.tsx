import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";
import { NoticiaCard } from "../../components/NoticiaCard";
import { listPublishedPosts } from "../../lib/posts";

export const Route = createFileRoute("/noticias/")({
  loader: () => listPublishedPosts(),
  head: () => ({
    meta: [
      { title: "Notícias e Conteúdos | GS Representações" },
      {
        name: "description",
        content:
          "Análises, tendências e novidades do mercado de representação comercial, por quem vive o varejo todos os dias.",
      },
      { property: "og:title", content: "Notícias e Conteúdos | GS Representações" },
      {
        property: "og:description",
        content:
          "Análises, tendências e novidades do mercado de representação comercial, por quem vive o varejo todos os dias.",
      },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/noticias" }],
  }),
  component: NoticiasIndex,
});

function NoticiasIndex() {
  const noticias = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <section className="pt-32 pb-24 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl space-y-4 mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary uppercase leading-tight">
            NOTÍCIAS E CONTEÚDOS.
          </h1>
          <div className="w-20 h-1 bg-accent" />
          <p className="text-muted-foreground text-lg">
            Análises, tendências e novidades do mercado para quem quer estar sempre um passo à
            frente.
          </p>
        </motion.div>

        {noticias.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {noticias.map((noticia) => (
              <NoticiaCard key={noticia.slug} noticia={noticia} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">Em breve, novos conteúdos.</p>
        )}
      </section>

      <SiteFooter />
    </div>
  );
}
