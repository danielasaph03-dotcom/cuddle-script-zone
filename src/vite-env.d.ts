/// <reference types="vite/client" />

// Tipagem explícita das env vars custom do projeto. Isso também evita o erro
// de TypeScript "noPropertyAccessFromIndexSignature" sem precisar usar
// import.meta.env["X"] (colchetes) — forma que o Vite NÃO substitui
// corretamente pelo valor real durante o build de produção, deixando a
// variável undefined mesmo com ela configurada na hospedagem.
interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL?: string;
  readonly VITE_SUPABASE_ANON_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
