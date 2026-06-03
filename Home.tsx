import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ProjectCard, type ProjectCardData } from "@/components/ProjectCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  ArrowRight,
  Building2,
  ChevronRight,
  FileText,
  Search,
  Shield,
  Zap,
  Users,
  Trophy,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Target,
  LayoutGrid,
  Star,
  BrainCircuit,
  Lock,
  ArrowUpRight
} from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

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
];

const stats = [
  { value: "2.400+", label: "Ativos Técnicos" },
  { value: "850+", label: "Auditores CREA/CAU" },
  { value: "R$ 4M+", label: "Transacionados" },
  { value: "100%", label: "Segurança PRODIN" },
];

export default function Home() {
  const [heroSearch, setHeroSearch] = useState("");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* ─── HERO SECTION IMERSIVA ─────────────────────────────────────────── */}
      <section className="brand-gradient relative overflow-hidden pt-32 pb-48">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
           <LayoutGrid size={800} className="absolute -right-40 -bottom-40 text-white" />
        </div>

        <div className="container relative z-10">
          <div className="max-w-6xl mx-auto text-center space-y-12">
            <Badge className="bg-white/10 text-white border-white/20 px-8 py-3 rounded-full backdrop-blur-md gap-3 font-black uppercase tracking-[0.4em] text-[10px]">
              <Star size={14} className="text-cyan-300 fill-cyan-300" /> Marketplace Técnico #1 do Brasil
            </Badge>

            <h1 className="text-7xl md:text-9xl font-black text-white leading-[0.85] tracking-tighter">
              A Revolução do <br/><span className="text-cyan-400">Projeto Técnico.</span>
            </h1>

            <p className="text-2xl md:text-3xl text-white/70 max-w-4xl mx-auto leading-relaxed font-medium">
              Conectamos talentos auditados a clientes que exigem rigor técnico, conformidade ABNT e segurança financeira total via protocolo PRODIN.
            </p>

            <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto bg-white/5 p-4 rounded-[3rem] border border-white/10 backdrop-blur-2xl shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)]">
              <div className="relative flex-1">
                <Search size={28} className="absolute left-10 top-1/2 -translate-y-1/2 text-white/40" />
                <Input
                  value={heroSearch}
                  onChange={(e) => setHeroSearch(e.target.value)}
                  placeholder="Busque por m², estilo ou profissional..."
                  className="pl-24 h-24 text-2xl rounded-[2.2rem] bg-transparent border-0 text-white placeholder:text-white/30 focus-visible:ring-0 font-bold"
                />
              </div>
              <Button
                size="lg"
                className="h-24 px-16 brand-gradient text-white border-0 rounded-[2.2rem] text-2xl font-black shadow-2xl hover:scale-[1.02] transition-transform"
                onClick={() => window.location.href = `/projetos?q=${encodeURIComponent(heroSearch)}`}
              >
                BUSCAR AGORA
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── STATS BAR ───────────────────────────────────────────────────── */}
      <div className="relative z-20 -mt-24">
        <div className="container">
          <Card className="grid grid-cols-2 md:grid-cols-4 gap-12 p-16 border-border/60 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.1)] rounded-[4rem] bg-background">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center group space-y-3">
                <div className="text-5xl font-black text-foreground group-hover:text-primary transition-colors tracking-tighter leading-none">{stat.value}</div>
                <div className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">{stat.label}</div>
              </div>
            ))}
          </Card>
        </div>
      </div>

      {/* ─── MECANISMO DE IMERSÃO ─────────────────────────────────────────── */}
      <section className="py-48 bg-background overflow-hidden">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            <div className="relative group">
              <div className="absolute -inset-32 bg-primary/10 rounded-full blur-[200px] opacity-50 group-hover:opacity-100 transition-opacity" />
              <Card className="relative z-10 rounded-[5rem] overflow-hidden shadow-[0_64px_128px_-24px_rgba(0,0,0,0.3)] aspect-[4/3] border-border/60 group bg-muted/10 border-2">
                <div className="absolute inset-0 brand-gradient opacity-10 group-hover:opacity-20 transition-opacity" />
                <div className="absolute inset-0 flex items-center justify-center flex-col gap-10">
                   <div className="w-40 h-40 rounded-[3.5rem] bg-white shadow-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-700">
                      <Trophy size={64} />
                   </div>
                   <div className="text-center space-y-3">
                      <p className="text-4xl font-black text-foreground tracking-tight leading-none">Tour Virtual 3D</p>
                      <p className="text-muted-foreground font-black uppercase tracking-[0.3em] text-[10px]">Experiência Imersiva Ativa PRODIN</p>
                   </div>
                </div>
                <div className="absolute bottom-16 left-16 right-16">
                   <Button className="w-full h-20 rounded-[2rem] bg-black text-white border-0 font-black gap-4 shadow-2xl text-xl hover:scale-105 transition-transform">
                      <Zap size={24} fill="currentColor" /> INICIAR DEMONSTRAÇÃO
                   </Button>
                </div>
              </Card>
            </div>
            
            <div className="space-y-12">
              <Badge className="bg-primary/10 text-primary border-primary/20 py-3 px-8 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em]">
                 Tecnologia Auditada
              </Badge>
              <h2 className="text-6xl md:text-8xl font-black text-foreground leading-[0.85] tracking-tighter">
                Não apenas veja. <br/><span className="text-primary">Sinta o espaço.</span>
              </h2>
              <p className="text-2xl text-muted-foreground font-medium leading-relaxed">
                Nosso mecanismo de imersão permite que você navegue por plantas técnicas em 3D, verifique incidência solar e materiais antes de qualquer download auditado.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                {[
                  { icon: ShieldCheck, title: "Rigor Técnico", desc: "Conformidade total ABNT." },
                  { icon: Target, title: "Triagem IA", desc: "Briefing inteligente PRODIN." },
                ].map(item => (
                  <div key={item.title} className="flex gap-8 p-8 rounded-[3rem] bg-muted/30 border border-border/60 hover:bg-background transition-all hover:shadow-xl group">
                    <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:scale-110 transition-transform">
                      <item.icon size={32} />
                    </div>
                    <div className="space-y-2">
                      <p className="font-black text-2xl tracking-tight leading-none">{item.title}</p>
                      <p className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.2em]">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
	
              <Button size="lg" className="h-24 px-16 rounded-[2.5rem] brand-gradient text-white border-0 font-black text-2xl shadow-2xl hover:scale-[1.05] transition-transform">
                 EXPLORAR MECANISMO
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── LANCES REVERSOS ─────────────────────────────────────────────── */}
      <section className="py-48 bg-muted/10 border-y border-border/60 relative overflow-hidden">
         <div className="absolute inset-0 opacity-5 pointer-events-none">
            <Zap size={800} className="absolute -left-40 -top-40 text-primary" />
         </div>
         <div className="container relative z-10">
            <div className="max-w-5xl mx-auto text-center space-y-12">
               <Badge className="bg-primary/10 text-primary border-primary/20 px-6 py-2 rounded-full font-black text-[10px] uppercase tracking-widest">BIDDING ENGINE</Badge>
               <h2 className="text-6xl md:text-9xl font-black text-foreground tracking-tighter leading-[0.85]">
                  Publicar Demanda <br/>& <span className="text-primary">Receber Lances</span>
               </h2>
               <p className="text-2xl text-muted-foreground font-medium leading-relaxed max-w-3xl mx-auto">
                  Não encontrou o projeto ideal? Descreva sua necessidade e nossa IA fará a triagem para os profissionais mais qualificados enviarem propostas personalizadas via split seguro.
               </p>
               <div className="flex flex-wrap justify-center gap-8">
                  <Button size="lg" className="h-24 px-16 rounded-[2.5rem] bg-foreground text-background border-0 font-black text-2xl shadow-2xl hover:scale-[1.05] transition-transform group">
                     PUBLICAR DEMANDA GRÁTIS <ArrowUpRight className="ml-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </Button>
                  <Button size="lg" variant="outline" className="h-24 px-16 rounded-[2.5rem] border-4 border-primary text-primary font-black text-2xl hover:bg-primary/5 transition-all">
                     COMO FUNCIONA?
                  </Button>
               </div>
            </div>
         </div>
      </section>

      {/* ─── SEGURANÇA & CONFIANÇA ────────────────────────────────────────── */}
      <section className="py-48 bg-background">
         <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
               {[
                  { icon: Shield, title: "Segurança PRODIN", desc: "Protocolo de criptografia e auditoria imutável para cada transação técnica." },
                  { icon: Lock, title: "Split de Pagamento", desc: "Liquidação automática via Pagar.me com retenção de garantia de 15 dias." },
                  { icon: BrainCircuit, title: "Curadoria Humana", desc: "Todos os profissionais passam por verificação manual de CREA/CAU antes de publicar." }
               ].map(item => (
                  <Card key={item.title} className="p-12 border-border/60 rounded-[4rem] shadow-xl hover:border-primary/40 transition-all space-y-8 bg-muted/5">
                     <div className="w-20 h-20 rounded-[2rem] brand-gradient flex items-center justify-center text-white shadow-2xl">
                        <item.icon size={32} />
                     </div>
                     <div className="space-y-4">
                        <h3 className="text-3xl font-black tracking-tight leading-none">{item.title}</h3>
                        <p className="text-lg text-muted-foreground font-medium leading-relaxed">{item.desc}</p>
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
