import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Fica undefined até as env vars serem configuradas (ver ADMIN_SETUP.md) —
// isso deixa o resto do site (páginas públicas sem depender do painel)
// funcionando normalmente mesmo antes do Supabase estar configurado.
export const supabase = url && anonKey ? createClient(url, anonKey) : undefined;

export function requireSupabase() {
  if (!supabase) {
    throw new Error(
      "Supabase não configurado: defina VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY (veja ADMIN_SETUP.md).",
    );
  }
  return supabase;
}
