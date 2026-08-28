import type { ReactNode } from "react";

// Converte o texto simples de `Noticia.conteudo` (ver src/content/noticias.ts)
// em elementos React: blocos separados por linha em branco, "## " vira <h2>,
// linhas em sequência começando com "- " viram <ul><li>.
export function renderNoticiaContent(conteudo: string): ReactNode[] {
  const blocos = conteudo
    .trim()
    .split(/\n\s*\n/)
    .map((b) => b.trim())
    .filter(Boolean);

  return blocos.map((bloco, index) => {
    if (bloco.startsWith("## ")) {
      return (
        <h2
          key={index}
          className="text-2xl md:text-3xl font-bold tracking-tight text-primary uppercase mt-10 mb-4 first:mt-0"
        >
          {bloco.slice(3).trim()}
        </h2>
      );
    }

    const linhas = bloco
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);
    const ehLista = linhas.length > 0 && linhas.every((l) => l.startsWith("- "));
    if (ehLista) {
      return (
        <ul
          key={index}
          className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed mb-6"
        >
          {linhas.map((l, i) => (
            <li key={i}>{l.slice(2).trim()}</li>
          ))}
        </ul>
      );
    }

    return (
      <p key={index} className="text-muted-foreground leading-relaxed mb-6">
        {bloco}
      </p>
    );
  });
}
