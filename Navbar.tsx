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
  LayoutDashboard,
  ShieldCheck,
  ShieldAlert,
  Zap,
  Star,
  Sparkles
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

const navLinks = [
  { label: "PROJETOS", href: "/projetos" },
  { label: "PLANOS", href: "/planos" },
  { label: "CURSOS", href: "/cursos" },
  { label: "SOBRE", href: "/sobre" },
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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      window.location.href = `/projetos?q=${encodeURIComponent(search)}`;
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled || !isHome
          ? "bg-white/80 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.05)] border-b border-border/40 py-4"
          : "bg-transparent py-6"
      )}
    >
      <div className="container">
        <div className="flex items-center h-12 gap-8">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 hover:scale-105 transition-transform">
            <Logo
              size="sm"
              light={!scrolled && isHome}
            />
          </Link>

          {/* Nav links — desktop */}
          <nav className="hidden lg:flex items-center gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-5 py-2 text-[10px] font-black rounded-full transition-all uppercase tracking-[0.2em]",
                  location === link.href
                    ? "text-primary bg-primary/10 shadow-sm"
                    : scrolled || !isHome
                    ? "text-foreground/60 hover:text-foreground hover:bg-muted"
                    : "text-white/60 hover:text-white hover:bg-white/10"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Search bar — desktop */}
          <div className="hidden md:flex flex-1 max-w-sm relative">
            <form onSubmit={handleSearch} className="w-full relative group">
              <Search
                size={16}
                className={cn(
                  "absolute left-4 top-1/2 -translate-y-1/2 transition-colors",
                  !scrolled && isHome ? "text-white/30 group-focus-within:text-white" : "text-muted-foreground group-focus-within:text-primary"
                )}
              />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Busque ativos técnicos..."
                className={cn(
                  "pl-12 pr-4 h-11 text-xs font-bold rounded-2xl transition-all border-2",
                  !scrolled && isHome 
                    ? "bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:bg-white/10 focus:border-white/30" 
                    : "bg-muted/30 border-transparent focus:bg-white focus:border-primary/20"
                )}
              />
            </form>
          </div>

          {/* Auth area */}
          <div className="flex items-center gap-4 ml-auto">
            {isAuthenticated && user ? (
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-11 w-11 rounded-2xl transition-all",
                    !scrolled && isHome ? "text-white hover:bg-white/10" : "bg-muted/30 hover:bg-muted"
                  )}
                >
                  <Bell size={18} />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className={cn(
                        "flex items-center gap-3 h-11 px-3 rounded-2xl transition-all border-2",
                        !scrolled && isHome 
                          ? "bg-white/5 border-white/10 text-white hover:bg-white/10" 
                          : "bg-muted/30 border-transparent hover:bg-muted"
                      )}
                    >
                      <div className="w-8 h-8 rounded-xl brand-gradient flex items-center justify-center text-white text-[10px] font-black shadow-lg">
                        {user.name?.charAt(0)?.toUpperCase() ?? "U"}
                      </div>
                      <span className="hidden lg:block text-xs font-black uppercase tracking-widest truncate max-w-[80px]">
                        {user.name?.split(" ")[0]}
                      </span>
                      <ChevronDown size={14} className="opacity-40" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-64 p-4 rounded-[2rem] shadow-2xl border-border/60 bg-background/95 backdrop-blur-xl">
                    <div className="px-3 py-2 mb-2">
                       <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-1">Perfil Auditado</p>
                       <div className="flex items-center gap-2">
                          {user.role === "admin" ? (
                            <Badge className="bg-primary text-white border-0 font-black text-[9px] tracking-widest uppercase px-2 py-0.5"><ShieldCheck size={10} className="mr-1" /> Admin Sênior</Badge>
                          ) : user.role === "admin_sub" ? (
                            <Badge className="bg-amber-500 text-white border-0 font-black text-[9px] tracking-widest uppercase px-2 py-0.5"><ShieldAlert size={10} className="mr-1" /> Admin Subalterno</Badge>
                          ) : user.role === "professional" ? (
                            <Badge className="bg-emerald-500 text-white border-0 font-black text-[9px] tracking-widest uppercase px-2 py-0.5"><Sparkles size={10} className="mr-1" /> Profissional</Badge>
                          ) : (
                            <Badge className="bg-blue-500 text-white border-0 font-black text-[9px] tracking-widest uppercase px-2 py-0.5"><User size={10} className="mr-1" /> Cliente</Badge>
                          )}
                       </div>
                    </div>
                    <DropdownMenuSeparator className="opacity-40" />
                    <DropdownMenuItem asChild className="rounded-xl focus:bg-primary/10 focus:text-primary transition-colors">
                      <Link href={user.role === "admin" || user.role === "admin_sub" ? "/painel/admin" : user.role === "professional" ? "/painel/profissional" : "/painel/cliente"}>
                        <LayoutDashboard size={16} className="mr-3" /> <span className="font-black text-[10px] uppercase tracking-widest">Painel de Controle</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="rounded-xl focus:bg-primary/10 focus:text-primary transition-colors">
                      <Link href="/painel/cliente">
                        <Settings size={16} className="mr-3" /> <span className="font-black text-[10px] uppercase tracking-widest">Configurações</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="opacity-40" />
                    <DropdownMenuItem
                      className="rounded-xl text-destructive focus:bg-destructive/10 focus:text-destructive transition-colors"
                      onClick={() => logout()}
                    >
                      <LogOut size={16} className="mr-3" /> <span className="font-black text-[10px] uppercase tracking-widest">Sair da Conta</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "hidden sm:flex font-black text-[10px] uppercase tracking-[0.2em] rounded-xl h-11 px-6",
                    !scrolled && isHome ? "text-white hover:bg-white/10" : "text-foreground/70 hover:text-foreground hover:bg-muted"
                  )}
                  asChild
                >
                  <a href={getLoginUrl()}>ENTRAR</a>
                </Button>
                <Button
                  size="sm"
                  className="brand-gradient text-white border-0 shadow-xl text-[10px] font-black uppercase tracking-[0.2em] rounded-xl h-11 px-8 hover:scale-105 transition-transform"
                  asChild
                >
                  <a href={getLoginUrl()}>CADASTRAR</a>
                </Button>
              </div>
            )}

            {/* Mobile menu toggle */}
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "lg:hidden h-11 w-11 rounded-2xl",
                !scrolled && isHome ? "text-white hover:bg-white/10" : "bg-muted/30 hover:bg-muted"
              )}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-background/95 backdrop-blur-2xl border-t border-border/40 shadow-2xl animate-in slide-in-from-top duration-300">
          <div className="container py-10 flex flex-col gap-6">
            {/* Mobile search */}
            <form onSubmit={handleSearch} className="relative">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar ativos técnicos..."
                className="pl-14 h-14 text-sm font-bold rounded-2xl border-2 border-border/40 bg-muted/20"
              />
            </form>
            {/* Mobile nav links */}
            <div className="grid grid-cols-1 gap-2">
               {navLinks.map((link) => (
                 <Link
                   key={link.href}
                   href={link.href}
                   className="text-[10px] font-black text-foreground/60 hover:text-primary py-4 px-4 rounded-xl hover:bg-primary/5 transition-all uppercase tracking-[0.3em] border-b border-border/20 last:border-0"
                   onClick={() => setMobileOpen(false)}
                 >
                   {link.label}
                 </Link>
               ))}
            </div>
            {!isAuthenticated && (
              <div className="flex flex-col gap-3 pt-4">
                <Button variant="outline" size="lg" className="h-14 font-black text-[10px] uppercase tracking-widest rounded-xl border-2" asChild>
                  <a href={getLoginUrl}>ENTRAR NA CONTA</a>
                </Button>
                <Button size="lg" className="h-14 brand-gradient text-white border-0 font-black text-[10px] uppercase tracking-widest rounded-xl shadow-xl" asChild>
                  <a href={getLoginUrl}>CRIAR CADASTRO AUDITADO</a>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
