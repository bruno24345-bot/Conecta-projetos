import { Navbar } from "@/components/Navbar";
import { ProjectCard, type ProjectCardData } from "@/components/ProjectCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { Filter, Search, SlidersHorizontal, X } from "lucide-react";
import { AdSenseBlock } from "@/components/AdSenseBlock";
import { useEffect, useState } from "react";
import { useSearch } from "wouter";
import { Footer } from "@/components/Footer";

const mockProjects: ProjectCardData[] = [
  { id: 1, title: "Casa Contemporânea 180m² — Alto Padrão", thumbnailUrl: null, price: "2800.00", category: "residential", architecturalStyle: "Contemporâneo", areaM2: "180.00", averageRating: "4.9", totalReviews: 47, totalSales: 23, viewCount: 1240, isPremiumFeatured: true, professional: { name: "Arq. Marina Costa", verificationStatus: "approved" } },
  { id: 2, title: "Escritório Corporativo Moderno 350m²", thumbnailUrl: null, price: "4500.00", category: "commercial", architecturalStyle: "Minimalista", areaM2: "350.00", averageRating: "4.7", totalReviews: 31, totalSales: 15, viewCount: 890, isPremiumFeatured: false, professional: { name: "Eng. Rafael Souza", verificationStatus: "approved" } },
  { id: 3, title: "Design de Interiores — Sala de Estar Premium", thumbnailUrl: null, price: "1200.00", category: "interior_design", architecturalStyle: "Escandinavo", areaM2: "45.00", averageRating: "5.0", totalReviews: 18, totalSales: 12, viewCount: 620, isPremiumFeatured: true, professional: { name: "Des. Ana Lima", verificationStatus: "approved" } },
  { id: 4, title: "Projeto Residencial Térrea 120m² — Econômico", thumbnailUrl: null, price: "890.00", category: "residential", architecturalStyle: "Clássico", areaM2: "120.00", averageRating: "4.5", totalReviews: 62, totalSales: 41, viewCount: 2100, isPremiumFeatured: false, professional: { name: "Eng. Carlos Mendes", verificationStatus: "approved" } },
  { id: 5, title: "Loja Comercial com Vitrine — Projeto Completo", thumbnailUrl: null, price: "1850.00", category: "commercial", architecturalStyle: "Industrial", areaM2: "80.00", averageRating: "4.8", totalReviews: 24, totalSales: 9, viewCount: 450, isPremiumFeatured: false, professional: { name: "Arq. Fernanda Dias", verificationStatus: "approved" } },
  { id: 6, title: "Paisagismo Jardim Tropical — Área Externa", thumbnailUrl: null, price: "650.00", category: "landscape", architecturalStyle: "Tropical", areaM2: "200.00", averageRating: "4.6", totalReviews: 15, totalSales: 8, viewCount: 380, isPremiumFeatured: false, professional: { name: "Pais. João Alves", verificationStatus: "approved" } },
  { id: 7, title: "Sobrado Duplex 220m² — Estilo Moderno", thumbnailUrl: null, price: "3200.00", category: "residential", architecturalStyle: "Moderno", areaM2: "220.00", averageRating: "4.8", totalReviews: 29, totalSales: 17, viewCount: 980, isPremiumFeatured: true, professional: { name: "Arq. Paulo Ferreira", verificationStatus: "approved" } },
  { id: 8, title: "Clínica Médica — Layout Funcional 200m²", thumbnailUrl: null, price: "2100.00", category: "commercial", architecturalStyle: "Funcional", areaM2: "200.00", averageRating: "4.4", totalReviews: 11, totalSales: 6, viewCount: 290, isPremiumFeatured: false, professional: { name: "Arq. Beatriz Santos", verificationStatus: "approved" } },
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

const styleOptions = [
  { value: "all", label: "Todos os estilos" },
  { value: "Contemporâneo", label: "Contemporâneo" },
  { value: "Minimalista", label: "Minimalista" },
  { value: "Clássico", label: "Clássico" },
  { value: "Moderno", label: "Moderno" },
  { value: "Industrial", label: "Industrial" },
  { value: "Escandinavo", label: "Escandinavo" },
  { value: "Tropical", label: "Tropical" },
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
  const [style, setStyle] = useState(params.get("style") ?? "all");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState("relevance");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = mockProjects.filter((p) => {
    const matchesQuery = p.title.toLowerCase().includes(query.toLowerCase()) || (p.professional?.name ?? "").toLowerCase().includes(query.toLowerCase());
    const matchesCategory = category === "all" || p.category === category;
    const matchesStyle = style === "all" || p.architecturalStyle === style;
    const matchesPrice = parseFloat(p.price as string) >= priceRange[0] && parseFloat(p.price as string) <= priceRange[1];
    const matchesRating = parseFloat(p.averageRating as string) >= minRating;
    return matchesQuery && matchesCategory && matchesStyle && matchesPrice && matchesRating;
  });

  const sorted = [...filtered].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return 0;
      case "price_asc":
        return parseFloat(a.price as string) - parseFloat(b.price as string);
      case "price_desc":
        return parseFloat(b.price as string) - parseFloat(a.price as string);
      case "rating":
        return parseFloat(b.averageRating as string) - parseFloat(a.averageRating as string);
      case "sales":
        return (b.totalSales as number) - (a.totalSales as number);
      default:
        return 0;
    }
  });

  const activeFiltersCount = [category !== "all", style !== "all", priceRange[0] > 0 || priceRange[1] < 10000, minRating > 0].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        {/* Header */}
        <div className="brand-gradient py-10">
          <div className="container">
            <h1 className="text-3xl font-black text-white mb-2">Projetos de Engenharia e Arquitetura</h1>
            <p className="text-white/70">Encontre o projeto ideal entre mais de 2.400 opções verificadas</p>
          </div>
        </div>

        <div className="container py-8">
          {/* Search + Sort bar */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar projetos..."
                className="pl-9 h-10"
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-48 h-10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((o) => (
                  <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              className={cn("h-10 gap-2", activeFiltersCount > 0 && "border-primary text-primary")}
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal size={16} />
              Filtros
              {activeFiltersCount > 0 && (
                <Badge className="h-4 w-4 p-0 text-[10px] brand-gradient text-white border-0 rounded-full flex items-center justify-center">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </div>

          {/* Filters panel */}
          {showFilters && (
            <div className="bg-card border border-border rounded-xl p-5 mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div>
                <Label className="text-xs font-semibold text-muted-foreground mb-2 block">Categoria</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categoryOptions.map((o) => (
                      <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs font-semibold text-muted-foreground mb-2 block">Estilo Arquitetônico</Label>
                <Select value={style} onValueChange={setStyle}>
                  <SelectTrigger className="h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {styleOptions.map((o) => (
                      <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs font-semibold text-muted-foreground mb-2 block">
                  Faixa de Preço: {priceRange[0].toLocaleString("pt-BR", { style: "currency", currency: "BRL" })} — {priceRange[1].toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                </Label>
                <Slider
                  min={0}
                  max={10000}
                  step={100}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="mt-3"
                />
              </div>
              <div>
                <Label className="text-xs font-semibold text-muted-foreground mb-2 block">Avaliação Mínima</Label>
                <Select value={minRating.toString()} onValueChange={(v) => setMinRating(parseFloat(v))}>
                  <SelectTrigger className="h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[0, 3, 3.5, 4, 4.5, 5].map((r) => (
                      <SelectItem key={r} value={r.toString()}>
                        {r === 0 ? "Qualquer" : `${r}+ ⭐`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {activeFiltersCount > 0 && (
                <div className="sm:col-span-2 lg:col-span-4 flex justify-end">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground gap-1"
                    onClick={() => { setCategory("all"); setStyle("all"); setPriceRange([0, 10000]); setMinRating(0); }}
                  >
                    <X size={14} /> Limpar filtros
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Results count */}
          <div className="flex items-center justify-between mb-5">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{sorted.length}</span> projetos encontrados
              {query && <span> para "<strong>{query}</strong>"</span>}
            </p>
          </div>

          {/* Grid com AdSense in-feed a cada 6 projetos (desativado para Premium) */}
          {sorted.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {sorted.map((project, idx) => (
                <div key={`project-${project.id}`}>
                  <ProjectCard project={project} />
                  {(idx + 1) % 6 === 0 && (
                    <div className="sm:col-span-2 lg:col-span-3 xl:col-span-4">
                      <AdSenseBlock slot="in-feed" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-lg font-bold text-foreground mb-2">Nenhum projeto encontrado</h3>
              <p className="text-muted-foreground text-sm">Tente ajustar os filtros ou buscar por outros termos.</p>
              <Button variant="outline" className="mt-4" onClick={() => { setQuery(""); setCategory("all"); setStyle("all"); setPriceRange([0, 10000]); setMinRating(0); }}>
                Limpar busca
              </Button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
