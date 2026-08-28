import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { getSiteSettings, updateSiteSetting, SITE_SETTING_FIELDS } from "../../../lib/siteSettings";

export const Route = createFileRoute("/admin/_authenticated/conteudo")({
  ssr: false,
  loader: () => getSiteSettings(),
  component: ConteudoSite,
});

function ConteudoSite() {
  const initial = Route.useLoaderData();
  const [values, setValues] = useState<Record<string, string>>(initial);
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      await Promise.all(
        SITE_SETTING_FIELDS.map((field) => updateSiteSetting(field.key, values[field.key] ?? "")),
      );
      toast.success("Alterações salvas.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao salvar. Tente novamente.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold tracking-tight text-primary">Conteúdo do site</h1>
      <p className="text-sm text-muted-foreground">
        Só as informações abaixo são editáveis por aqui — layout, cores e código do site continuam
        no projeto.
      </p>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {SITE_SETTING_FIELDS.map((field) => (
          <div key={field.key} className="space-y-2">
            <Label htmlFor={field.key}>{field.label}</Label>
            <Input
              id={field.key}
              value={values[field.key] ?? ""}
              onChange={(e) => setValues((v) => ({ ...v, [field.key]: e.target.value }))}
            />
          </div>
        ))}
        <Button type="submit" disabled={saving}>
          {saving && <Loader2 className="h-4 w-4 animate-spin" />}
          Salvar alterações
        </Button>
      </form>
    </div>
  );
}
