import { Footer } from "@/components/Footer";
import { Logo } from "@/components/Logo";
import { Navbar } from "@/components/Navbar";
import { ProjectCard, type ProjectCardData } from "@/components/ProjectCard";
import { StarRating } from "@/components/StarRating";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Building2,
  CheckCircle2,
  ChevronRight,
  Crown,
  FileText,
  Layers,
  MessageSquare,
  Search,
  Shield,
  Star,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

// ─── Mock data for demonstration ─────────────────────────────────────────────
const mockProjects: ProjectCardData[] = [
  {
    id: 1,
    title: "Casa Contemporânea 180m² — Alto Padrão",
    thumbnailUrl: null,
    price: "2800.00",
    category: "residential",
    architecturalStyle: "Contemporâneo",
    areaM2: "180.00",
    averageRating: "4.9",
    totalReviews: 47,
    totalSales: 23,
    viewCount: 1240,
    isPremiumFeatured: true,
    professional: { name: "Arq. Marina Costa", verificationStatus: "approved" },
  },
  {
    id: 2,
    title: "Escritório Corporativo Moderno 350m²",
    thumbnailUrl: null,
    price: "4500.00",
    category: "commercial",
    architecturalStyle: "Minimalista",
    areaM2: "350.00",
    averageRating: "4.7",
    totalReviews: 31,
    totalSales: 15,
    viewCount: 890,
    isPremiumFeatured: false,
    professional: { name: "Eng. Rafael Souza", verificationStatus: "approved" },
  },
  {
    id: 3,
    title: "Design de Interiores — Sala de Estar Premium",
    thumbnailUrl: null,
    price: "1200.00",
    category: "interior_design",
    architecturalStyle: "Escandinavo",
    areaM2: "45.00",
    averageRating: "5.0",
    totalReviews: 18,
    totalSales: 12,
    viewCount: 620,
    isPremiumFeatured: true,
    professional: { name: "Des. Ana Lima", verificationStatus: "approved" },
  },
  {
    id: 4,
    title: "Projeto Residencial Térrea 120m² — Econômico",
    thumbnailUrl: null,
    price: "890.00",
    category: "residential",
    architecturalStyle: "Clássico",
    areaM2: "120.00",
    averageRating: "4.5",
    totalReviews: 62,
    totalSales: 41,
    viewCount: 2100,
    isPremiumFeatured: false,
    professional: { name: "Eng. Carlos Mendes", verificationStatus: "approved" },
  },
  {
    id: 5,
    title: "Loja Comercial com Vitrine — Projeto Completo",
    thumbnailUrl: null,
    price: "1850.00",
    category: "commercial",
    architecturalStyle: "Industrial",
    areaM2: "80.00",
    averageRating: "4.8",
    totalReviews: 24,
    totalSales: 9,
    viewCount: 450,
    isPremiumFeatured: false,
    professional: { name: "Arq. Fernanda Dias", verificationStatus: "approved" },
  },
  {
    id: 6,
    title: "Paisagismo Jardim Tropical — Área Externa",
    thumbnailUrl: null,
    price: "650.00",
    category: "landscape",
    architecturalStyle: "Tropical",
    areaM2: "200.00",
    averageRating: "4.6",
    totalReviews: 15,
    totalSales: 8,
    viewCount: 380,
    isPremiumFeatured: false,
    professional: { name: "Pais. João Alves", verificationStatus: "approved" },
  },
];

const steps = [
  {
    icon: Search,
    title: "Busque e Filtre",
    description: "Encontre projetos por tipo, metragem, estilo arquitetônico e faixa de preço.",
    color: "text-[oklch(0.72_0.18_210)]",
    bg: "bg-[oklch(0.72_0.18_210)]/10",
  },
  {
    icon: FileText,
    title: "Visualize em Detalhes",
    description: "Galerias ricas com fotos, fachadas, cortes técnicos e visualização 3D.",
    color: "text-[oklch(0.45_0.22_255)]",
    bg: "bg-[oklch(0.45_0.22_255)]/10",
  },
  {
    icon: Shield,
    title: "Compre com Segurança",
    description: "Pagamento protegido via Pix ou cartão. Arquivos liberados após confirmação.",
    color: "text-[oklch(0.65_0.18_145)]",
    bg: "bg-[oklch(0.65_0.18_145)]/10",
  },
];

const stats = [
  { value: "2.400+", label: "Projetos disponíveis" },
  { value: "850+", label: "Profissionais verificados" },
  { value: "12.000+", label: "Clientes satisfeitos" },
  { value: "R$ 4M+", label: "Em projetos vendidos" },
];

const categories = [
  { label: "Residencial", icon: "🏠", href: "/projetos?categoria=residential" },
  { label: "Comercial", icon: "🏢", href: "/projetos?categoria=commercial" },
  { label: "Interiores", icon: "🛋️", href: "/projetos?categoria=interior_design" },
  { label: "Industrial", icon: "🏭", href: "/projetos?categoria=industrial" },
  { label: "Paisagismo", icon: "🌿", href: "/projetos?categoria=landscape" },
  { label: "Reforma", icon: "🔨", href: "/projetos?categoria=renovation" },
  { label: "Urbanismo", icon: "🌆", href: "/projetos?categoria=urban_planning" },
  { label: "Cursos", icon: "📚", href: "/cursos" },
];

export default function Home() {
  const [heroSearch, setHeroSearch] = useState("");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* ─── HERO SECTION ─────────────────────────────────────────────────── */}
      <section className="hero-gradient relative overflow-hidden pt-16">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-96 h-96 rounded-full bg-[oklch(0.72_0.18_210)]/10 blur-3xl" />
          <div className="absolute bottom-0 left-20 w-64 h-64 rounded-full bg-[oklch(0.45_0.22_255)]/15 blur-2xl" />
          {/* Grid lines */}
          <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="container relative py-24 md:py-32">
          <div className="max-w-3xl">
            {/* Tag */}
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-white/80 text-sm mb-6">
              <Zap size={14} className="text-[oklch(0.72_0.18_210)]" />
              Marketplace #1 de Projetos de Engenharia e Arquitetura
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
              O projeto dos seus{" "}
              <span className="text-[oklch(0.72_0.18_210)]">sonhos</span>{" "}
              está a um clique de distância
            </h1>

            <p className="text-lg text-white/70 mb-8 max-w-xl leading-relaxed">
              Conectamos engenheiros, arquitetos e designers de interiores diretamente a você. Compre projetos completos com fotos, fachadas e cortes técnicos.
            </p>

            {/* Hero search */}
            <div className="flex gap-2 max-w-xl">
              <div className="relative flex-1">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={heroSearch}
                  onChange={(e) => setHeroSearch(e.target.value)}
                  placeholder="Ex: casa 150m², escritório moderno..."
                  className="pl-11 h-12 text-base rounded-xl bg-white border-0 shadow-lg"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && heroSearch.trim()) {
                      window.location.href = `/projetos?q=${encodeURIComponent(heroSearch)}`;
                    }
                  }}
                />
              </div>
              <Button
                className="h-12 px-6 brand-gradient text-white border-0 rounded-xl text-base font-semibold hover:opacity-90 shadow-lg"
                onClick={() => {
                  if (heroSearch.trim()) {
                    window.location.href = `/projetos?q=${encodeURIComponent(heroSearch)}`;
                  }
                }}
              >
                Buscar
              </Button>
            </div>

            {/* Quick tags */}
            <div className="flex flex-wrap gap-2 mt-4">
              {["Casa térrea", "Apartamento", "Escritório", "Reforma", "Interiores"].map((tag) => (
                <Link
                  key={tag}
                  href={`/projetos?q=${encodeURIComponent(tag)}`}
                  className="text-xs text-white/60 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full px-3 py-1 transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="border-t border-white/10 bg-black/20">
          <div className="container py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-black text-white">{stat.value}</div>
                  <div className="text-xs text-white/50 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── CATEGORIES ───────────────────────────────────────────────────── */}
      <section className="py-10 border-b border-border/60">
        <div className="container">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-foreground">Explorar por Categoria</h2>
            <Link href="/projetos" className="text-sm text-primary flex items-center gap-1 hover:underline">
              Ver todos <ChevronRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
            {categories.map((cat) => (
              <Link
                key={cat.label}
                href={cat.href}
                className="flex flex-col items-center gap-2 p-3 rounded-xl bg-muted/50 hover:bg-primary/5 hover:border-primary/30 border border-transparent transition-all text-center group"
              >
                <span className="text-2xl">{cat.icon}</span>
                <span className="text-xs font-medium text-foreground/70 group-hover:text-primary transition-colors">
                  {cat.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED PROJECTS ────────────────────────────────────────────── */}
      <section className="py-16">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-black text-foreground">Projetos em Destaque</h2>
              <p className="text-muted-foreground text-sm mt-1">Selecionados por qualidade e avaliações dos compradores</p>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/projetos">
                Ver todos <ArrowRight size={14} className="ml-1" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {mockProjects.map((project, idx) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-3">Como Funciona</Badge>
            <h2 className="text-3xl font-black text-foreground">Simples, rápido e seguro</h2>
            <p className="text-muted-foreground mt-2 max-w-lg mx-auto">
              Do projeto à obra em três passos. Sem complicações, sem intermediários desnecessários.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, idx) => (
              <div key={step.title} className="flex flex-col items-center text-center gap-4">
                <div className={`w-16 h-16 rounded-2xl ${step.bg} flex items-center justify-center`}>
                  <step.icon size={28} className={step.color} />
                </div>
                <div className="w-8 h-8 rounded-full brand-gradient flex items-center justify-center text-white text-sm font-black">
                  {idx + 1}
                </div>
                <h3 className="text-lg font-bold text-foreground">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PROFESSIONAL CTA ─────────────────────────────────────────────── */}
      <section className="py-16">
        <div className="container">
          <div className="brand-gradient rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-white max-w-lg">
              <div className="flex items-center gap-2 mb-3">
                <Building2 size={20} className="text-cyan-300" />
                <span className="text-cyan-300 text-sm font-semibold">Para Profissionais</span>
              </div>
              <h2 className="text-3xl font-black mb-3">
                Venda seus projetos para milhares de clientes
              </h2>
              <p className="text-white/80 leading-relaxed">
                Cadastre-se como engenheiro, arquiteto ou designer de interiores. Publique seus projetos, defina seus preços e receba pagamentos automáticos com split garantido.
              </p>
              <div className="flex flex-wrap gap-3 mt-5">
                {["CREA/CAU verificado", "Pagamento automático", "Dashboard financeiro", "Sem mensalidade obrigatória"].map((f) => (
                  <div key={f} className="flex items-center gap-1.5 text-white/90 text-sm">
                    <CheckCircle2 size={14} className="text-cyan-300 flex-shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-3 flex-shrink-0">
              <Button
                size="lg"
                className="bg-white text-[oklch(0.45_0.22_255)] hover:bg-white/90 font-bold px-8"
                asChild
              >
                <Link href="/cadastro/profissional">
                  Cadastrar como Profissional <ArrowRight size={16} className="ml-2" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white/40 text-white hover:bg-white/10 px-8"
                asChild
              >
                <Link href="/como-funciona">Saiba mais</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PLANS PREVIEW ────────────────────────────────────────────────── */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="text-center mb-10">
            <Badge variant="secondary" className="mb-3">Planos</Badge>
            <h2 className="text-3xl font-black text-foreground">Escolha o plano ideal</h2>
            <p className="text-muted-foreground mt-2">Para profissionais que querem vender mais e pagar menos comissão</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {/* Free plan */}
            <Card className="p-6 border border-border">
              <div className="flex items-center gap-2 mb-4">
                <Users size={20} className="text-muted-foreground" />
                <h3 className="font-bold text-foreground">Conta Gratuita</h3>
              </div>
              <div className="text-3xl font-black text-foreground mb-1">R$ 0<span className="text-base font-normal text-muted-foreground">/mês</span></div>
              <p className="text-sm text-muted-foreground mb-5">10% de comissão por venda</p>
              <ul className="flex flex-col gap-2 text-sm">
                {["Publicar projetos ilimitados", "Receber pagamentos", "Dashboard básico", "Chat com clientes"].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-foreground/70">
                    <CheckCircle2 size={14} className="text-[oklch(0.65_0.18_145)] flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="w-full mt-6" asChild>
                <a href={getLoginUrl()}>Começar grátis</a>
              </Button>
            </Card>

            {/* Premium plan */}
            <Card className="p-6 border-2 border-[oklch(0.45_0.22_255)] relative overflow-hidden">
              <div className="absolute top-0 right-0 brand-gradient text-white text-xs font-bold px-3 py-1 rounded-bl-xl">
                MAIS POPULAR
              </div>
              <div className="flex items-center gap-2 mb-4">
                <Crown size={20} className="text-[oklch(0.78_0.16_75)]" />
                <h3 className="font-bold text-foreground">Conta Premium</h3>
              </div>
              <div className="text-3xl font-black text-foreground mb-1">
                R$ 50<span className="text-base font-normal text-muted-foreground">/mês</span>
              </div>
              <p className="text-xs text-muted-foreground mb-1">nos 3 primeiros meses, depois R$ 280/mês</p>
              <p className="text-sm text-[oklch(0.65_0.18_145)] font-semibold mb-5">Apenas 5% de comissão por venda</p>
              <ul className="flex flex-col gap-2 text-sm">
                {[
                  "Tudo do plano gratuito",
                  "Comissão reduzida (5%)",
                  "Sem anúncios na plataforma",
                  "Selo de destaque Premium",
                  "Prioridade máxima na vitrine",
                  "Dashboard financeiro avançado",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-foreground/80">
                    <CheckCircle2 size={14} className="text-primary flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button className="w-full mt-6 brand-gradient text-white border-0 hover:opacity-90" asChild>
                <Link href="/planos">
                  Assinar Premium <Crown size={14} className="ml-2" />
                </Link>
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS / TRUST ─────────────────────────────────────────── */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-foreground">Quem já usa o Conecta Projetos</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Mariana Oliveira",
                role: "Arquiteta — SP",
                text: "Vendi 23 projetos no primeiro mês. A plataforma é incrível e o split de pagamento é automático.",
                rating: 5,
              },
              {
                name: "Carlos Eduardo",
                role: "Cliente — RJ",
                text: "Encontrei o projeto perfeito para minha casa. Visualizei todos os detalhes antes de comprar.",
                rating: 5,
              },
              {
                name: "Ana Paula",
                role: "Engenheira Civil — MG",
                text: "O painel financeiro me dá total controle. Sei exatamente quanto vou receber em cada venda.",
                rating: 5,
              },
            ].map((t) => (
              <Card key={t.name} className="p-6 border border-border/60">
                <StarRating rating={t.rating} size="sm" className="mb-3" />
                <p className="text-sm text-foreground/80 leading-relaxed mb-4">"{t.text}"</p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full brand-gradient flex items-center justify-center text-white text-xs font-bold">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
