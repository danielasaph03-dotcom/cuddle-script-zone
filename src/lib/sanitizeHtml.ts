// isomorphic-dompurify (não "dompurify" puro): sanitiza tanto no servidor
// (SSR das páginas públicas /noticias) quanto no navegador, sem depender de
// `window` estar disponível.
import DOMPurify from "isomorphic-dompurify";

const ALLOWED_TAGS = [
  "p",
  "h2",
  "h3",
  "strong",
  "em",
  "a",
  "ul",
  "ol",
  "li",
  "blockquote",
  "br",
  "img",
];

/** Limpa o HTML gerado pelo editor antes de renderizar no site público (proteção contra XSS). */
export function sanitizeNoticiaHtml(html: string): string {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS,
    ALLOWED_ATTR: ["href", "target", "rel", "src", "alt"],
  });
}
