import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getLoginUrl } from "@/const";
import { cn } from "@/lib/utils";
import {
  Bell,
  ChevronDown,
  LogOut,
  Menu,
  Search,
  Settings,
  User,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { Logo } from "./Logo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { trpc } from "@/lib/trpc";

const navLinks = [
  { label: "Projetos", href: "/projetos" },
  { label: "Profissionais", href: "/profissionais" },
  { label: "Cursos", href: "/cursos" },
  { label: "Demandas", href: "/demandas" },
  { label: "Planos", href: "/planos" },
];

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const isHome = location === "/";

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled || !isHome
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-border/60"
          : "bg-transparent"
      )}
    >
      <div className="container">
        <div className="flex items-center h-16 gap-4">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Logo
              size="sm"
              light={!scrolled && isHome}
            />
          </Link>

          {/* Search bar — desktop */}
          <div className="hidden md:flex flex-1 max-w-md relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar projetos, profissionais..."
              className={cn(
                "pl-9 pr-4 h-9 text-sm rounded-full border-border/60 bg-white/90",
                !scrolled && isHome && "bg-white/15 border-white/30 text-white placeholder:text-white/60"
              )}
              onKeyDown={(e) => {
                if (e.key === "Enter" && search.trim()) {
                  window.location.href = `/projetos?q=${encodeURIComponent(search)}`;
                }
              }}
            />
          </div>

          {/* Nav links — desktop */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-1.5 text-sm font-medium rounded-md transition-colors",
                  location === link.href
                    ? "text-primary bg-primary/10"
                    : scrolled || !isHome
                    ? "text-foreground/70 hover:text-foreground hover:bg-muted"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Spacer */}
          <div className="flex-1 lg:flex-none" />

          {/* Auth area */}
          {isAuthenticated && user ? (
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-8 w-8 rounded-full",
                  !scrolled && isHome && "text-white hover:bg-white/10"
                )}
              >
                <Bell size={16} />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className={cn(
                      "flex items-center gap-2 h-8 px-2 rounded-full",
                      !scrolled && isHome && "text-white hover:bg-white/10"
                    )}
                  >
                    <div className="w-7 h-7 rounded-full brand-gradient flex items-center justify-center text-white text-xs font-bold">
                      {user.name?.charAt(0)?.toUpperCase() ?? "U"}
                    </div>
                    <span className="hidden sm:block text-sm font-medium max-w-[100px] truncate">
                      {user.name?.split(" ")[0]}
                    </span>
                    <ChevronDown size={12} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link href="/painel/cliente">
                      <User size={14} className="mr-2" /> Meu Painel
                    </Link>
                  </DropdownMenuItem>
                  {(user.role === "admin" || user.role === "admin_sub") && (
                    <DropdownMenuItem asChild>
                      <Link href="/painel/admin">
                        <Settings size={14} className="mr-2" /> Administração
                      </Link>
                    </DropdownMenuItem>
                  )}
                  {user.role === "professional" && (
                    <DropdownMenuItem asChild>
                      <Link href="/painel/profissional">
                        <Settings size={14} className="mr-2" /> Área Profissional
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-destructive focus:text-destructive"
                    onClick={() => logout()}
                  >
                    <LogOut size={14} className="mr-2" /> Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "hidden sm:flex",
                  !scrolled && isHome && "text-white hover:bg-white/10"
                )}
                asChild
              >
                <a href={getLoginUrl()}>Entrar</a>
              </Button>
              <Button
                size="sm"
                className="brand-gradient text-white border-0 hover:opacity-90 text-xs px-4"
                asChild
              >
                <a href={getLoginUrl()}>Cadastrar</a>
              </Button>
            </div>
          )}

          {/* Mobile menu toggle */}
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "lg:hidden h-8 w-8",
              !scrolled && isHome && "text-white hover:bg-white/10"
            )}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-border/60 shadow-lg">
          <div className="container py-4 flex flex-col gap-3">
            {/* Mobile search */}
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar projetos..."
                className="pl-9 h-9 text-sm rounded-full"
              />
            </div>
            {/* Mobile nav links */}
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-foreground/80 hover:text-primary py-1.5 border-b border-border/40 last:border-0"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {!isAuthenticated && (
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1" asChild>
                  <a href={getLoginUrl()}>Entrar</a>
                </Button>
                <Button size="sm" className="flex-1 brand-gradient text-white border-0" asChild>
                  <a href={getLoginUrl()}>Cadastrar</a>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
