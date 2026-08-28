import { Instagram, Mail, MessageCircle } from "lucide-react";
import logoGS from "../assets/logo-gs.png";

// Rodapé compartilhado por todas as páginas do site (home, /noticias, etc.).
const quickLinks = [
  { href: "/#inicio", label: "Início" },
  { href: "/#a-gs", label: "A GS" },
  { href: "/#marcas", label: "Marcas" },
  { href: "/#diferenciais", label: "Diferenciais" },
  { href: "/#atendimento", label: "Onde Atendemos" },
  { href: "/#clientes", label: "Clientes" },
  { href: "/#contato", label: "Contato" },
];

export function SiteFooter() {
  return (
    <footer className="bg-secondary/20 py-20 border-t border-border">
      <div className="container mx-auto px-4 grid md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2 space-y-6">
          <img src={logoGS} alt="GS Representações" className="h-12 w-auto mb-4" loading="lazy" />
          <p className="text-muted-foreground max-w-sm text-sm leading-relaxed">
            Conectando grandes marcas ao varejo com relacionamento, estratégia e foco em resultados
            comerciais sólidos.
          </p>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <a
                href="mailto:garcia.e.silva.representacoes@gmail.com"
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors w-fit"
              >
                <Mail className="w-4 h-4 text-primary" />
                <span>garcia.e.silva.representacoes@gmail.com</span>
              </a>
            </div>
            <div className="flex flex-col gap-2">
              <a
                href="https://wa.me/5518997217576?text=Ol%C3%A1!%20Vim%20atrav%C3%A9s%20do%20site%20e%20gostaria%20de%20falar%20com%20o%20Eduardo."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors w-fit"
              >
                <MessageCircle className="w-4 h-4 text-primary" />
                <span>18 99721-7576 (Eduardo)</span>
              </a>
              <a
                href="https://wa.me/5518997888797?text=Ol%C3%A1%21%20Vim%20atrav%C3%A9s%20do%20site%20e%20gostaria%20de%20falar%20com%20o%20Pedro."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors w-fit"
              >
                <MessageCircle className="w-4 h-4 text-primary" />
                <span>18 99788-8797 (Pedro)</span>
              </a>
            </div>
            <div className="flex gap-4 mt-2">
              <a
                href="https://www.instagram.com/gs.representacao/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-white transition-all text-muted-foreground"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="mailto:garcia.e.silva.representacoes@gmail.com"
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-white transition-all text-muted-foreground"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/5518997217576?text=Ol%C3%A1%21%20Vim%20atrav%C3%A9s%20do%20site%20e%20gostaria%20de%20falar%20com%20o%20Eduardo."
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-white transition-all text-muted-foreground"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <h4 className="font-bold text-primary tracking-widest uppercase text-sm">
            Links Rápidos
          </h4>
          <nav className="flex flex-col gap-4 text-sm font-medium text-muted-foreground">
            {quickLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-primary transition-colors w-fit"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="space-y-6">
          <h4 className="font-bold text-primary tracking-widest uppercase text-sm">
            Região de Atuação
          </h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Atendimento focado em grandes redes e varejo regional com inteligência de mercado e
            proximidade logística.
          </p>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-20 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground font-semibold">
        <span>© 2026 GS Representações. Todos os direitos reservados.</span>
        <div className="flex gap-8">
          <a href="#" className="hover:text-primary">
            Políticas de Privacidade
          </a>
          <a href="#" className="hover:text-primary">
            Termos de Uso
          </a>
        </div>
      </div>
    </footer>
  );
}
