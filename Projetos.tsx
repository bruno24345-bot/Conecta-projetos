import { Navbar } from "@/components/Navbar";
import { ProjectCard, type ProjectCardData } from "@/components/ProjectCard";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { Filter, Search, SlidersHorizontal, X, Building2, LayoutGrid, Zap, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearch } from "wouter";
import { Footer } from "@/components/Footer";

const mockProjects: ProjectCardData[] = [
  { id: 1, title: "Casa Contemporânea 180m² — Alto Padrão", thumbnailUrl: null, price: "2800.00", category: "residential", architecturalStyle: "Contemporâneo", areaM2: "180.00", averageRating: "4.9", totalReviews: 47, totalSales: 23, viewCount: 1240, isPremiumFeatured: true, professional: { name: "Arq. Marina Costa", verificationStatus: "approved" } },
  { id: 2, title: "Escritório Corporativo Moderno 350m²", thumbnailUrl: null, price: "4500.00", category: "commercial", architecturalStyle: "Minimalista", areaM2: "350.00", averageRating: "4.7", totalReviews: 31, totalSales: 15, viewCount: 890, isPremiumFeatured: false, professional: { name: "Eng. Rafael Souza", verificationStatus: "approved" } },
  { id: 3, title: "Design de Interiores — Sala de Estar Premium", thumbnailUrl: null, price: "1200.00", category: "interior_design", architecturalStyle: "Escandinavo", areaM2: "45.00", averageRating: "5.0", totalReviews: 18, totalSales: 12, viewCount: 620, isPremiumFeatured: true, professional: { name: "Des. Ana Lima", verificationStatus: "approved" } },
  { id: 4, title: "Projeto Residencial Térrea 120m² — Econômico", thumbnailUrl: null, price: "890.00", category: "residential", architecturalStyle: "Clássico", areaM2: "120.00", averageRating: "4.5", totalReviews: 62, totalSales: 41, viewCount: 2100, isPremiumFeatured: false, professional: { name: "Eng. Carlos Mendes", verificationStatus: "approved" } },
];

const categoryOptions = [
  { value: "all", label: "Todas as categorias" },
  { value: "residential", label: "Residencial" },
  { value: "commercial", label: "Comercial" },
  { value: "industrial", label: "Industrial" },
  { value: "interior_design", label: "Design de Interiores" },
  { value: "landscape", label: "Paisagismo" },
  { value: "urban_planning", label: "Urbanismo" },
  { value: "renovation", label: "Reforma" },
];

const sortOptions = [
  { value: "relevance", label: "Mais relevantes" },
  { value: "newest", label: "Mais recentes" },
  { value: "price_asc", label: "Menor preço" },
  { value: "price_desc", label: "Maior preço" },
  { value: "rating", label: "Maior avaliação" },
  { value: "sales", label: "Mais vendidos" },
];

export default function Projetos() {
  const searchStr = useSearch();
  const params = new URLSearchParams(searchStr);
  const [query, setQuery] = useState(params.get("q") ?? "");
  const [category, setCategory] = useState(params.get("category") ?? "all");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [sortBy, setSortBy] = useState("relevance");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = mockProjects.filter((p) => {
    const matchesQuery = p.title.toLowerCase().includes(query.toLowerCase()) || (p.professional?.name ?? "").toLowerCase().includes(query.toLowerCase());
    const matchesCategory = category === "all" || p.category === category;
    const matchesPrice = parseFloat(p.price as string) >= priceRange[0] && parseFloat(p.price as string) <= priceRange[1];
    return matchesQuery && matchesCategory && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        {/* Header Imersivo */}
        <div className="brand-gradient py-20 relative overflow-hidden">
           <div className="absolute inset-0 opacity-10 pointer-events-none">
              <LayoutGrid size={400} className="absolute -right-20 -bottom-20 text-white" />
           </div>
          <div className="container relative z-10">
            <div className="max-w-3xl">
               <Badge className="mb-6 bg-white/10 text-white border-white/20 px-4 py-2 rounded-full backdrop-blur-md gap-2 font-bold uppercase tracking-widest text-[10px]">
                  <Building2 size={14} className="text-cyan-300" /> Vitrine Auditada PRODIN
               </Badge>
               <h1 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight leading-none">Explorar <span className="text-cyan-400">Projetos</span></h1>
               <p className="text-white/70 text-xl font-medium leading-relaxed max-w-2xl">Encontre ativos técnicos de alta performance, prontos para execução e em total conformidade ABNT.</p>
            </div>
          </div>
        </div>

        <div className="container py-16">
          <div className="flex flex-col lg:flex-row gap-12">
             {/* Sidebar Filters */}
             <div className="lg:w-80 shrink-0 space-y-10">
                <div className="space-y-4">
                   <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground">O que você busca?</h3>
                   <div className="relative">
                      <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <Input 
                        value={query} 
                        onChange={(e) => setQuery(e.target.value)} 
                        placeholder="Busque por m², estilo..." 
                        className="pl-12 h-14 rounded-2xl border-border/60 font-bold" 
                      />
                   </div>
                </div>

                <div className="space-y-4">
                   <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground">Categorias</h3>
                   <div className="flex flex-col gap-2">
                      {categoryOptions.map((cat) => (
                        <button
                          key={cat.value}
                          onClick={() => setCategory(cat.value)}
                          className={cn(
                            "text-left px-5 py-3.5 rounded-2xl text-sm font-bold transition-all border",
                            category === cat.value 
                              ? "brand-gradient text-white border-transparent shadow-lg" 
                              : "bg-background text-muted-foreground hover:text-foreground border-border/60 hover:border-primary/40"
                          )}
                        >
                          {cat.label}
                        </button>
                      ))}
                   </div>
                </div>

                <div className="space-y-6">
                   <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground">Investimento Máximo</h3>
                   <div className="px-2">
                      <Slider
                        min={0}
                        max={10000}
                        step={100}
                        value={[priceRange[1]]}
                        onValueChange={(v) => setPriceRange([0, v[0]])}
                        className="mt-3"
                      />
                      <div className="flex justify-between mt-4">
                         <span className="text-xs font-black text-muted-foreground">R$ 0</span>
                         <span className="text-sm font-black text-primary">Até {priceRange[1].toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span>
                      </div>
                   </div>
                </div>

                <Card className="p-8 border-primary/20 bg-primary/5 rounded-[2.5rem] relative overflow-hidden">
                   <Zap size={120} className="absolute -right-8 -bottom-8 text-primary opacity-10 rotate-12" />
                   <h4 className="text-xl font-black text-foreground mb-3 relative z-10">Não encontrou?</h4>
                   <p className="text-xs font-medium text-muted-foreground mb-8 relative z-10 leading-relaxed">
                      Publique sua demanda no sistema de <strong>Lances Reversos</strong> e receba propostas personalizadas.
                   </p>
                   <Button className="w-full h-14 brand-gradient text-white border-0 font-black rounded-2xl relative z-10 shadow-xl hover:scale-[1.02] transition-transform">
                      PUBLICAR DEMANDA
                   </Button>
                </Card>
             </div>

             {/* Main Content */}
             <div className="flex-1">
                <div className="flex items-center justify-between mb-10 bg-muted/30 p-4 rounded-2xl border border-border/60">
                   <p className="text-sm font-bold text-muted-foreground ml-2">
                      Exibindo <span className="text-foreground">{filtered.length}</span> projetos auditados
                   </p>
                   <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-48 h-10 rounded-xl border-border/60 font-bold text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {sortOptions.map((o) => (
                          <SelectItem key={o.value} value={o.value} className="font-bold text-xs">{o.label}</SelectItem>
                        ))}
                      </SelectContent>
                   </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {filtered.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>

                {filtered.length === 0 && (
                  <Card className="p-24 text-center border-dashed border-2 border-border/60 rounded-[3rem] bg-muted/5">
                    <Search size={64} className="text-muted-foreground mx-auto mb-6 opacity-20" />
                    <h3 className="text-2xl font-black text-foreground mb-2">Nenhum projeto encontrado</h3>
                    <p className="text-muted-foreground font-medium max-w-md mx-auto">
                      Tente ajustar seus filtros técnicos ou buscar por termos mais abrangentes.
                    </p>
                    <Button variant="outline" className="mt-8 rounded-2xl font-black border-primary/20 text-primary h-14 px-8" onClick={() => {setQuery(""); setCategory("all"); setPriceRange([0, 10000]);}}>
                      LIMPAR BUSCA
                    </Button>
                  </Card>
                )}

                <div className="mt-20 p-10 rounded-[3rem] border border-border/60 bg-muted/10 flex flex-col md:flex-row items-center gap-10">
                   <div className="w-20 h-20 rounded-3xl brand-gradient flex items-center justify-center text-white shadow-2xl shrink-0">
                      <ShieldCheck size={40} />
                   </div>
                   <div className="space-y-2 text-center md:text-left">
                      <h4 className="text-2xl font-black text-foreground tracking-tight">Garantia PRODIN</h4>
                      <p className="text-muted-foreground font-medium leading-relaxed">
                         Todos os projetos nesta vitrine passam por auditoria técnica de 24h antes da liberação. Seu investimento é protegido por nossa retenção de segurança de 15 dias.
                      </p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
