import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import type { Post } from "../lib/posts";
import { formatarData, coverImageAspectClass } from "../lib/posts";
import { cn } from "../lib/utils";

export function NoticiaCard({ noticia }: { noticia: Post }) {
  return (
    <motion.div whileHover={{ y: -5 }} className="h-full">
      <Link
        to="/noticias/$slug"
        params={{ slug: noticia.slug }}
        className="group flex flex-col h-full bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:border-accent transition-all duration-300"
      >
        <div
          className={cn(
            "bg-muted overflow-hidden max-h-72",
            coverImageAspectClass(noticia.cover_image_ratio),
          )}
        >
          {noticia.cover_image && (
            <img
              src={noticia.cover_image}
              alt={noticia.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              loading="lazy"
            />
          )}
        </div>

        <div className="p-6 space-y-3 flex flex-col flex-1">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold uppercase tracking-widest bg-accent/20 text-primary px-2 py-1 rounded">
              {noticia.category}
            </span>
            <span className="text-xs text-muted-foreground font-medium">
              {noticia.published_at && formatarData(noticia.published_at)}
            </span>
          </div>

          <h3 className="font-bold text-lg tracking-tight text-primary leading-snug">
            {noticia.title}
          </h3>

          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1">
            {noticia.excerpt}
          </p>

          <span className="inline-flex items-center gap-2 text-sm font-bold text-primary group-hover:gap-4 transition-all pt-2">
            Leia mais <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
