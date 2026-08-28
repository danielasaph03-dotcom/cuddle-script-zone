import { useState, type ReactNode } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { LayoutDashboard, Newspaper, FilePlus, FileText, Image, LogOut, Menu } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTitle } from "../ui/sheet";
import { cn } from "../../lib/utils";
import { signOut } from "../../lib/auth";

const NAV_ITEMS = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/posts", label: "Postagens", icon: Newspaper },
  { to: "/admin/posts/new", label: "Nova publicação", icon: FilePlus },
  { to: "/admin/conteudo", label: "Conteúdo do site", icon: FileText },
  { to: "/admin/media", label: "Mídia", icon: Image },
] as const;

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav className="flex flex-col gap-1">
      {NAV_ITEMS.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          onClick={onNavigate}
          activeOptions={{ exact: "exact" in item && item.exact }}
          activeProps={{ className: "bg-primary text-primary-foreground" }}
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <item.icon className="h-4 w-4" />
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

export function AdminLayout({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  async function handleSignOut() {
    await signOut();
    toast.success("Sessão encerrada.");
    navigate({ to: "/admin/login" });
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Sidebar desktop */}
      <aside className="hidden md:fixed md:inset-y-0 md:left-0 md:flex md:w-64 md:flex-col md:border-r md:border-border md:bg-card">
        <div className="flex h-16 items-center px-6 text-lg font-bold tracking-tight text-primary">
          Painel administrativo
        </div>
        <div className="flex-1 overflow-y-auto px-3 py-2">
          <NavLinks />
        </div>
        <div className="border-t border-border p-3">
          <Button variant="ghost" className="w-full justify-start gap-3" onClick={handleSignOut}>
            <LogOut className="h-4 w-4" /> Sair
          </Button>
        </div>
      </aside>

      {/* Header + drawer mobile */}
      <header className="flex h-16 items-center justify-between border-b border-border bg-card px-4 md:hidden">
        <span className="text-lg font-bold tracking-tight text-primary">Painel administrativo</span>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setMobileOpen(true)}
          aria-label="Abrir menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </header>
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="flex w-72 flex-col p-0">
          <SheetTitle className="px-6 pt-6 text-lg font-bold tracking-tight text-primary">
            Painel administrativo
          </SheetTitle>
          <div className="flex-1 overflow-y-auto px-3 py-4">
            <NavLinks onNavigate={() => setMobileOpen(false)} />
          </div>
          <div className="border-t border-border p-3">
            <Button variant="ghost" className="w-full justify-start gap-3" onClick={handleSignOut}>
              <LogOut className="h-4 w-4" /> Sair
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      <main className={cn("md:pl-64")}>
        <div className="mx-auto max-w-5xl px-4 py-8 md:px-8">{children}</div>
      </main>
    </div>
  );
}
