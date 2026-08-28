import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";
import { NoticiaCard } from "../../components/NoticiaCard";
import { sanitizeNoticiaHtml } from "../../lib/sanitizeHtml";
import { cn } from "../../lib/utils";
import {
  getPublishedPostBySlug,
  getRelatedPosts,
  calcularTempoLeitura,
  formatarData,
  coverImageAspectClass,
} from "../../lib/posts";

export const Route = createFileRoute("/noticias/$slug")({
  loader: async ({ params }) => {
    const noticia = await getPublishedPostBySlug(params.slug);
    if (!noticia) throw notFound();
    const relacionadas = await getRelatedPosts(noticia, 3);
    return { noticia, relacionadas };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { noticia } = loaderData;
    const title = noticia.seo_title || noticia.title;
    const description = noticia.seo_description || noticia.excerpt;
    return {
      meta: [
        { title: `${title} | GS Representações` },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        ...(noticia.cover_image ? [{ property: "og:image", content: noticia.cover_image }] : []),
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
        {
          "script:ld+json": {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: noticia.title,
            description,
            image: noticia.cover_image ? [noticia.cover_image] : undefined,
            datePublished: noticia.published_at,
            author: { "@type": "Organization", name: noticia.author },
            publisher: { "@type": "Organization", name: "GS Representações" },
          },
        },
      ],
      links: [{ rel: "canonical", href: `/noticias/${noticia.slug}` }],
    };
  },
  component: NoticiaDetalhe,
});

const WHATSAPP_CONTATO =
  "https://wa.me/5518997217576?text=Ol%C3%A1%21%20Vim%20atrav%C3%A9s%20do%20site%20e%20gostaria%20de%20falar%20com%20o%20Eduardo.";

function NoticiaDetalhe() {
  const { noticia, relacionadas } = Route.useLoaderData();
  const tempoLeitura = calcularTempoLeitura(noticia);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <article className="pt-32 pb-24">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              to="/noticias"
              className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:gap-3 transition-all mb-8"
            >
              <ArrowLeft className="w-4 h-4" /> Voltar para notícias
            </Link>

            <div className="flex items-center gap-3 mb-4">
              <span className="text-[10px] font-bold uppercase tracking-widest bg-accent/20 text-primary px-2 py-1 rounded">
                {noticia.category}
              </span>
              {noticia.published_at && (
                <span className="text-xs text-muted-foreground font-medium">
                  {formatarData(noticia.published_at)}
                </span>
              )}
              <span className="text-xs text-muted-foreground font-medium">
                · {tempoLeitura} min de leitura
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-primary leading-tight mb-4">
              {noticia.title}
            </h1>

            <p className="text-sm text-muted-foreground font-medium mb-8">Por {noticia.author}</p>
          </motion.div>

          {noticia.cover_image && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={cn(
                "w-full max-h-[560px] rounded-2xl overflow-hidden bg-muted mb-12",
                coverImageAspectClass(noticia.cover_image_ratio),
              )}
            >
              <img
                src={noticia.cover_image}
                alt={noticia.title}
                className="w-full h-full object-cover"
                fetchPriority="high"
              />
            </motion.div>
          )}

          <div
            className="noticia-content"
            dangerouslySetInnerHTML={{ __html: sanitizeNoticiaHtml(noticia.content) }}
          />

          {/* CTA final */}
          <div className="mt-16 bg-primary text-primary-foreground rounded-2xl p-8 md:p-10 text-center space-y-6">
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight">
              Quer conversar sobre esse assunto?
            </h3>
            <a
              href={WHATSAPP_CONTATO}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-4 rounded-full font-black text-sm hover:scale-105 transition-transform shadow-xl"
            >
              <MessageCircle className="w-5 h-5" /> Falar com a GS
            </a>
          </div>
        </div>
      </article>

      {relacionadas.length > 0 && (
        <section className="py-24 bg-secondary/10">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-primary uppercase mb-10">
              Conteúdos relacionados
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relacionadas.map((relacionada) => (
                <NoticiaCard key={relacionada.slug} noticia={relacionada} />
              ))}
            </div>
          </div>
        </section>
      )}

      <SiteFooter />
    </div>
  );
}
