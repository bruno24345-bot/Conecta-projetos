import { useAuth } from "@/_core/hooks/useAuth";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { StarRating } from "@/components/StarRating";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getLoginUrl } from "@/const";
import { cn } from "@/lib/utils";
import {
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  Download,
  FileText,
  Lock,
  ShieldCheck,
  ShoppingCart,
  Star,
  Eye,
  Trophy,
  Zap,
  LayoutGrid,
  Maximize2,
  Box,
  Compass,
  Sun,
  ShieldAlert,
  ArrowUpRight,
  X
} from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "wouter";
import { toast } from "sonner";

const mockProject = {
  id: 1,
  title: "Casa Contemporânea 180m² — Alto Padrão",
  description: `Projeto residencial completo para casa contemporânea de alto padrão com 180m² de área construída. O projeto inclui planta baixa completa, fachadas frontal e lateral, cortes transversal e longitudinal, planta de cobertura, detalhamentos construtivos e visualizações 3D em alta resolução.`,
  price: "2800.00",
  category: "residential",
  architecturalStyle: "Contemporâneo",
  areaM2: "180.00",
  averageRating: "4.9",
  totalReviews: 47,
  totalSales: 23,
  viewCount: 1240,
  professional: {
    name: "Arq. Marina Costa",
    verificationStatus: "approved",
    registrationType: "CAU",
    registrationNumber: "A-123456-8",
    registrationUF: "SP",
  },
};

export default function ProjetoDetalhe() {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated } = useAuth();
  const [activeImage, setActiveImage] = useState(0);
  const [copyrightAgreed, setCopyrightAgreed] = useState(false);
  const [activeTab, setActiveTab] = useState("galeria");
  const [isImmersiveMode, setIsImmersiveMode] = useState(false);

  const handleBuy = () => {
    if (!isAuthenticated) {
      window.location.href = getLoginUrl();
      return;
    }
    if (!copyrightAgreed) {
      toast.error("Aceite os termos de direitos autorais para continuar.");
      return;
    }
    toast.info("Redirecionando para o checkout seguro (Pagar.me)...");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        <div className="container py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left: Gallery + Immersive View */}
            <div className="lg:col-span-8 flex flex-col gap-10">
              <div className="relative rounded-[4rem] overflow-hidden bg-[oklch(0.08_0.04_255)] aspect-[16/10] shadow-[0_64px_128px_-24px_rgba(0,0,0,0.4)] group border-2 border-white/5">
                {!isImmersiveMode ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
                     <div className="absolute inset-0 opacity-10 pointer-events-none">
                        <LayoutGrid size={600} className="absolute -right-20 -bottom-20 text-white" />
                     </div>
                     <div className="w-32 h-32 rounded-[2.5rem] bg-white/10 flex items-center justify-center mb-10 border border-white/20 backdrop-blur-xl group-hover:scale-110 transition-transform duration-700">
                        <Trophy size={56} className="text-cyan-400 animate-pulse" />
                     </div>
                     <Badge className="bg-cyan-500/10 text-cyan-400 border-cyan-500/20 px-6 py-2 rounded-full font-black uppercase tracking-[0.4em] text-[10px] mb-6">
                        Tecnologia PRODIN Ativa
                     </Badge>
                     <h2 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tighter leading-none">Mecanismo de <br/><span className="text-cyan-400">Imersão Técnica.</span></h2>
                     <p className="text-white/60 max-w-lg mb-12 text-xl font-medium leading-relaxed">
                       Navegue por este projeto em 3D, visualize cortes técnicos e experimente a iluminação real antes de baixar os ativos finais auditados.
                     </p>
                     <Button 
                        size="lg" 
                        onClick={() => setIsImmersiveMode(true)}
                        className="brand-gradient text-white border-0 px-16 h-20 rounded-3xl font-black text-xl shadow-2xl gap-4 hover:scale-105 transition-transform"
                     >
                        <Eye size={28} /> INICIAR TOUR VIRTUAL
                     </Button>
                  </div>
                ) : (
                  <div className="absolute inset-0 bg-background flex items-center justify-center">
                     <div className="absolute top-8 left-8 right-8 flex items-center justify-between z-20">
                        <Badge className="bg-black/80 text-white border-0 px-4 py-2 rounded-xl font-black text-[10px] tracking-widest uppercase backdrop-blur-md">3D VIEWPORT · v2.0</Badge>
                        <div className="flex gap-3">
                           <Button variant="secondary" size="icon" className="w-12 h-12 rounded-xl bg-white/10 text-white border-0 backdrop-blur-md hover:bg-white/20"><Box size={20} /></Button>
                           <Button variant="secondary" size="icon" className="w-12 h-12 rounded-xl bg-white/10 text-white border-0 backdrop-blur-md hover:bg-white/20"><Compass size={20} /></Button>
                           <Button variant="secondary" size="icon" className="w-12 h-12 rounded-xl bg-white/10 text-white border-0 backdrop-blur-md hover:bg-white/20"><Sun size={20} /></Button>
                           <Button 
                              variant="destructive" 
                              size="icon" 
                              className="w-12 h-12 rounded-xl shadow-xl"
                              onClick={() => setIsImmersiveMode(false)}
                           >
                              <X size={20} />
                           </Button>
                        </div>
                     </div>
                     <div className="text-center space-y-6">
                        <div className="w-24 h-24 rounded-[2rem] border-4 border-primary border-t-transparent animate-spin mx-auto" />
                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em]">Carregando Ativos Geométricos...</p>
                     </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                   <div className="space-y-2">
                      <Badge variant="outline" className="rounded-full px-4 py-1 border-primary/20 text-primary font-black uppercase tracking-[0.3em] text-[9px]">Ativo Técnico Auditado</Badge>
                      <h1 className="text-5xl font-black text-foreground tracking-tighter leading-none">{mockProject.title}</h1>
                   </div>
                   <div className="flex gap-4">
                      <Button variant="outline" size="icon" className="w-16 h-16 rounded-2xl border-2 hover:bg-primary/5 transition-colors"><Star size={24} className="text-primary" /></Button>
                      <Button variant="outline" size="icon" className="w-16 h-16 rounded-2xl border-2 hover:bg-primary/5 transition-colors"><Maximize2 size={24} className="text-primary" /></Button>
                   </div>
                </div>
                
                <div className="flex flex-wrap items-center gap-6">
                   <div className="flex items-center gap-3 bg-muted/50 px-6 py-3 rounded-2xl border border-border/60">
                      <StarRating rating={4.9} size="sm" />
                      <span className="text-sm font-black text-foreground tracking-tight">4.9 <span className="text-muted-foreground font-medium">(47 avaliações)</span></span>
                   </div>
                   <Badge className="bg-primary/10 text-primary border-0 font-black text-[10px] uppercase tracking-widest px-6 py-3 rounded-2xl">
                      {mockProject.architecturalStyle}
                   </Badge>
                   <Badge className="bg-muted text-muted-foreground border-0 font-black text-[10px] uppercase tracking-widest px-6 py-3 rounded-2xl">
                      {mockProject.areaM2} m² ÁREA TOTAL
                   </Badge>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
                  <TabsList className="bg-muted/30 p-2 rounded-2xl w-full max-w-lg border border-border/40">
                    <TabsTrigger value="galeria" className="rounded-xl font-black text-[10px] uppercase tracking-widest py-3">Descrição</TabsTrigger>
                    <TabsTrigger value="tecnico" className="rounded-xl font-black text-[10px] uppercase tracking-widest py-3">Ficha Técnica</TabsTrigger>
                    <TabsTrigger value="autor" className="rounded-xl font-black text-[10px] uppercase tracking-widest py-3">O Autor</TabsTrigger>
                  </TabsList>
                  <TabsContent value="galeria" className="py-8">
                    <p className="text-muted-foreground text-xl leading-relaxed font-medium">{mockProject.description}</p>
                  </TabsContent>
                  <TabsContent value="tecnico" className="py-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                       {[
                         { label: "Rigor Normativo", value: "ABNT NBR 15575 / 16280" },
                         { label: "Formatos de Ativo", value: "DWG (AutoCAD), PDF, PNG, RVT" },
                         { label: "Pranchas Técnicas", value: "12 pranchas executivas completas" },
                         { label: "Garantia PRODIN", value: "Retenção de 15 dias para conferência" }
                       ].map(i => (
                         <div key={i.label} className="p-8 bg-muted/30 rounded-3xl border border-border/60 group hover:border-primary/40 transition-colors">
                            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-3">{i.label}</p>
                            <p className="text-lg font-black text-foreground tracking-tight leading-tight">{i.value}</p>
                         </div>
                       ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="autor" className="py-8">
                    <Card className="p-10 border-border/60 rounded-[3rem] bg-muted/10 border-2">
                       <div className="flex flex-col md:flex-row items-center gap-10">
                          <div className="w-32 h-32 rounded-[2.5rem] brand-gradient flex items-center justify-center text-white text-4xl font-black shadow-2xl">
                             {mockProject.professional.name.charAt(0)}
                          </div>
                          <div className="space-y-4 text-center md:text-left">
                             <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                                <h3 className="text-3xl font-black tracking-tight">{mockProject.professional.name}</h3>
                                <Badge className="bg-emerald-500 text-white border-0 font-black text-[9px] tracking-widest uppercase px-3 py-1"><BadgeCheck size={12} className="mr-1" /> Auditado</Badge>
                             </div>
                             <p className="text-muted-foreground font-medium text-lg">Registro Profissional: <span className="text-foreground font-black">{mockProject.professional.registrationType} {mockProject.professional.registrationNumber}-{mockProject.professional.registrationUF}</span></p>
                             <Button variant="link" className="text-primary font-black p-0 h-auto text-sm uppercase tracking-widest">VER PORTFÓLIO COMPLETO <ArrowUpRight size={14} className="ml-1" /></Button>
                          </div>
                       </div>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>

            {/* Right: Checkout Sidebar */}
            <div className="lg:col-span-4 flex flex-col gap-8">
              <Card className="p-10 border-border/60 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.2)] rounded-[4rem] sticky top-32 border-2 bg-background overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16" />
                
                <div className="mb-10 relative">
                   <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] mb-3">Valor de Aquisição</p>
                   <div className="flex items-baseline gap-2">
                      <span className="text-6xl font-black text-foreground tracking-tighter">R$ 2.800</span>
                      <span className="text-xl font-black text-muted-foreground">,00</span>
                   </div>
                   <div className="flex items-center gap-2 mt-4 bg-green-500/10 text-green-600 px-4 py-2 rounded-xl w-fit">
                      <Zap size={14} fill="currentColor" /> 
                      <span className="text-[10px] font-black uppercase tracking-widest">Acesso Vitalício Auditado</span>
                   </div>
                </div>

                <Separator className="mb-10 opacity-40" />

                <div className="space-y-6 mb-10">
                   <div className="flex items-center gap-5 p-5 rounded-2xl bg-muted/30 border border-border/40">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shadow-sm">
                         <ShieldCheck size={24} />
                      </div>
                      <div>
                         <p className="text-sm font-black tracking-tight">Compra Segura</p>
                         <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">Protocolo PRODIN Ativo</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-5 p-5 rounded-2xl bg-muted/30 border border-border/40">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shadow-sm">
                         <ShoppingCart size={24} />
                      </div>
                      <div>
                         <p className="text-sm font-black tracking-tight">Liberação Imediata</p>
                         <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">Download após confirmação</p>
                      </div>
                   </div>
                </div>

                <div className="flex items-start gap-4 mb-10 bg-amber-500/5 p-6 rounded-3xl border border-amber-500/20">
                   <Checkbox 
                     id="terms" 
                     checked={copyrightAgreed} 
                     onCheckedChange={(checked) => setCopyrightAgreed(checked as boolean)}
                     className="mt-1 border-amber-500/40 data-[state=checked]:bg-amber-500"
                   />
                   <label htmlFor="terms" className="text-[11px] font-bold text-amber-900/70 leading-relaxed cursor-pointer uppercase tracking-tight">
                      Declaro estar ciente que este projeto é para fins de estudo e referência técnica, respeitando os direitos autorais e normas ABNT vigentes.
                   </label>
                </div>

                <Button 
                  size="lg" 
                  className="w-full h-20 brand-gradient text-white border-0 font-black text-xl rounded-[2rem] shadow-2xl hover:scale-[1.02] transition-transform"
                  onClick={handleBuy}
                >
                  ADQUIRIR ATIVO TÉCNICO
                </Button>

                <div className="flex items-center justify-center gap-4 mt-8 opacity-40">
                   <p className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.3em]">Checkout Seguro</p>
                   <div className="w-1 h-1 rounded-full bg-muted-foreground" />
                   <p className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.3em]">Pagar.me</p>
                </div>
              </Card>

              <Card className="p-8 border-border/60 rounded-[3rem] bg-muted/10 border-2 flex items-center gap-6 group hover:border-primary/20 transition-all">
                 <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center text-primary shrink-0 group-hover:scale-110 transition-transform">
                    <ShieldAlert size={32} />
                 </div>
                 <div className="space-y-1">
                    <p className="text-sm font-black tracking-tight leading-none">Denunciar Ativo</p>
                    <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">Violação de Rigor Técnico</p>
                 </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
