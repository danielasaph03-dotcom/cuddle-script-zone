// ============================================================================
// CONTEÚDOS / NOTÍCIAS — arquivo único de dados
// ============================================================================
//
// COMO ADICIONAR UMA NOVA PUBLICAÇÃO:
// 1. Copie um objeto existente no array `noticias` abaixo (ou o modelo comentado).
// 2. Cole no topo (ou em qualquer posição) do array e preencha os campos.
// 3. Salve o arquivo.
//
// Não é preciso mexer em mais nada: a home, a página /noticias, as rotas
// individuais e a ordenação são todas automáticas a partir deste array.
//
// Campo "conteudo": texto simples, sem HTML.
//   - Uma linha em branco separa parágrafos.
//   - Uma linha começando com "## " vira um subtítulo.
//   - Linhas seguidas começando com "- " viram uma lista com marcadores.
//
// MODELO PARA COPIAR:
// {
//   slug: "titulo-em-formato-de-url",
//   titulo: "Título da publicação",
//   resumo: "Resumo curto (1–2 frases) usado nos cards e no compartilhamento.",
//   categoria: "Categoria",
//   autor: "Nome do autor",
//   dataPublicacao: "2026-01-01", // formato AAAA-MM-DD
//   imagemCapa: heroSupermarketAsset,
//   destaque: true,
//   conteudo: `
// Primeiro parágrafo...
//
// ## Um subtítulo
//
// Mais um parágrafo...
//
// - Item de lista
// - Outro item
// `,
//   referencias: [{ titulo: "Nome da fonte", url: "https://exemplo.com" }],
// },
// ============================================================================

import heroSupermarketAsset from "../assets/hero_supermarket.webp";

export interface ReferenciaNoticia {
  titulo: string;
  url?: string;
}

export interface Noticia {
  /** Identificador único usado na URL: /noticias/{slug} */
  slug: string;
  titulo: string;
  /** Resumo curto — usado nos cards, na listagem e como meta description. */
  resumo: string;
  /** Texto completo do artigo. Ver formatação suportada no topo do arquivo. */
  conteudo: string;
  imagemCapa: string;
  /** Formato AAAA-MM-DD, para ordenar corretamente. */
  dataPublicacao: string;
  categoria: string;
  autor: string;
  /** Se omitido, é calculado automaticamente a partir do tamanho do texto. */
  tempoLeituraMinutos?: number;
  referencias?: ReferenciaNoticia[];
  /** true = pode aparecer em destaque na home. */
  destaque?: boolean;
}

export const noticias: Noticia[] = [
  {
    slug: "queda-nas-vendas-o-que-o-mercado-pode-aprender",
    titulo: "[EXEMPLO] Queda nas vendas: o que o mercado pode aprender",
    resumo:
      "Conteúdo de demonstração — substitua por uma publicação real. Este é um texto placeholder para mostrar como a área de notícias funciona.",
    categoria: "Tendências",
    autor: "Equipe GS Representações",
    dataPublicacao: "2026-08-01",
    imagemCapa: heroSupermarketAsset,
    destaque: true,
    conteudo: `
Este é um texto de demonstração. Substitua por conteúdo real antes de publicar — nenhuma informação aqui deve ser tratada como fato.

Este parágrafo mostra como um bloco de texto comum aparece na matéria, com espaçamento e legibilidade pensados para leitura confortável tanto no desktop quanto no celular.

## Um exemplo de subtítulo

Use subtítulos (linhas começando com "## " no arquivo de origem) para dividir a matéria em seções, facilitando a leitura de textos mais longos.

Também é possível usar listas, como no exemplo abaixo:

- Primeiro ponto de exemplo
- Segundo ponto de exemplo
- Terceiro ponto de exemplo

## Como substituir este conteúdo

Abra o arquivo "src/content/noticias.ts" e edite (ou substitua) este objeto: título, resumo, categoria, autor, data, imagem de capa, texto e referências. Depois é só salvar — a home e a listagem se atualizam sozinhas.
`,
    referencias: [{ titulo: "Fonte de exemplo (substituir)", url: "https://exemplo.com" }],
  },
];

/** Todas as publicações, da mais recente para a mais antiga. */
export function getNoticiasOrdenadas(): Noticia[] {
  return [...noticias].sort((a, b) => b.dataPublicacao.localeCompare(a.dataPublicacao));
}

export function getNoticiaPorSlug(slug: string): Noticia | undefined {
  return noticias.find((n) => n.slug === slug);
}

/** As publicações mais recentes marcadas como destaque (ou as mais recentes, se nenhuma estiver marcada). */
export function getNoticiasDestaque(limit = 3): Noticia[] {
  const ordenadas = getNoticiasOrdenadas();
  const destacadas = ordenadas.filter((n) => n.destaque);
  const base = destacadas.length > 0 ? destacadas : ordenadas;
  return base.slice(0, limit);
}

/** Publicações relacionadas: prioriza a mesma categoria, completa com as mais recentes. */
export function getNoticiasRelacionadas(atual: Noticia, limit = 3): Noticia[] {
  const outras = getNoticiasOrdenadas().filter((n) => n.slug !== atual.slug);
  const mesmaCategoria = outras.filter((n) => n.categoria === atual.categoria);
  const resto = outras.filter((n) => n.categoria !== atual.categoria);
  return [...mesmaCategoria, ...resto].slice(0, limit);
}

export function calcularTempoLeitura(noticia: Noticia): number {
  if (noticia.tempoLeituraMinutos) return noticia.tempoLeituraMinutos;
  const palavras = noticia.conteudo.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(palavras / 200));
}

export function formatarData(dataPublicacao: string): string {
  const partes = dataPublicacao.split("-").map(Number);
  const [ano = 1970, mes = 1, dia = 1] = partes;
  const data = new Date(ano, mes - 1, dia);
  return new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(data);
}
