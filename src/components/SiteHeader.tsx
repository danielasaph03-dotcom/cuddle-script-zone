import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import logoGS from "../assets/logo-gs.png";

// Cabeçalho compartilhado por todas as páginas do site (home, /noticias, etc.).
// Os links de âncora (Início, A GS, Marcas...) usam "/#id" em vez de "#id" para
// funcionarem também quando a página atual não é a home.
const navLinks = [
  { href: "/#inicio", label: "Início" },
  { href: "/#a-gs", label: "A GS" },
  { href: "/#marcas", label: "Marcas" },
  { href: "/#diferenciais", label: "Diferenciais" },
  { href: "/#atendimento", label: "Onde Atendemos" },
  { href: "/#clientes", label: "Clientes" },
];

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src={logoGS} alt="GS Representações" className="h-14 w-auto" fetchPriority="high" />
        </div>
        <nav className="hidden md:flex gap-8 items-center text-sm font-semibold">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-primary transition-colors">
              {link.label}
            </a>
          ))}
          <Link to="/noticias" className="hover:text-primary transition-colors">
            Notícias
          </Link>
          <a href="/#contato" className="hover:text-primary transition-colors">
            Contato
          </a>
        </nav>

        <a
          href="/#contato"
          className="hidden md:inline-flex bg-primary text-primary-foreground px-6 py-2 rounded-full text-sm font-semibold hover:bg-primary/90 transition-all"
        >
          Fale com a GS
        </a>

        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-primary"
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-border overflow-hidden"
          >
            <nav className="flex flex-col p-4 gap-4 text-sm font-semibold">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="py-2 hover:text-primary transition-colors border-b border-border/50"
                >
                  {link.label}
                </a>
              ))}
              <Link
                to="/noticias"
                onClick={() => setIsMenuOpen(false)}
                className="py-2 hover:text-primary transition-colors border-b border-border/50"
              >
                Notícias
              </Link>
              <a
                href="/#contato"
                onClick={() => setIsMenuOpen(false)}
                className="py-2 hover:text-primary transition-colors border-b border-border/50"
              >
                Contato
              </a>

              <a
                href="/#contato"
                onClick={() => setIsMenuOpen(false)}
                className="mt-2 bg-primary text-primary-foreground px-6 py-3 rounded-full text-center font-bold"
              >
                Fale com a GS
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
