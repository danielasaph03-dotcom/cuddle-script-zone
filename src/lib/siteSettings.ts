import { requireSupabase, supabase } from "./supabase";

export interface SiteSetting {
  key: string;
  value: string;
}

/** Chaves editáveis em /admin/conteudo. Adicionar uma nova aqui basta para
 * que ela apareça no formulário — nenhuma outra alteração é necessária. */
export const SITE_SETTING_FIELDS: { key: string; label: string }[] = [
  { key: "site_title", label: "Título principal" },
  { key: "site_description", label: "Descrição institucional" },
  { key: "phone", label: "Telefone" },
  { key: "whatsapp_number", label: "WhatsApp (só números, com DDI)" },
  { key: "email", label: "E-mail" },
  { key: "instagram_url", label: "Instagram" },
  { key: "facebook_url", label: "Facebook" },
  { key: "linkedin_url", label: "LinkedIn" },
  { key: "address", label: "Endereço" },
  { key: "cta_main", label: "CTA principal" },
];

export async function getSiteSettings(): Promise<Record<string, string>> {
  if (!supabase) return {};
  const { data, error } = await supabase.from("site_settings").select("key, value");
  if (error) throw error;
  const map: Record<string, string> = {};
  for (const row of data ?? []) map[row.key] = row.value;
  return map;
}

export async function updateSiteSetting(key: string, value: string): Promise<void> {
  const { error } = await requireSupabase()
    .from("site_settings")
    .upsert({ key, value }, { onConflict: "key" });
  if (error) throw error;
}
