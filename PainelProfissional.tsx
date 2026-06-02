import { useAuth } from "@/_core/hooks/useAuth";
import { Logo } from "@/components/Logo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { getLoginUrl } from "@/const";
import { cn } from "@/lib/utils";
import {
  AlertCircle,
  BarChart3,
  BadgeCheck,
  CheckCircle2,
  Crown,
  DollarSign,
  FileText,
  Home,
  LogOut,
  Package,
  Plus,
  Settings,
  TrendingUp,
  User,
  Zap,
  Clock,
  MessageSquare,
  ChevronRight,
  ShieldCheck,
  Activity,
  ArrowUpRight,
  Target,
  LayoutGrid
} from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { toast } from "sonner";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const mockBids = [
  { id: 1, client: "Carlos Silva", description: "Reforma de Cozinha 15m²", budget: "R$ 5.000", status: "open", expiresAt: "24h" },
  { id: 2, client: "Ana Paula", description: "Projeto Luminotécnico Sala", budget: "R$ 1.200", status: "active", expiresAt: "12h" },
];

const sidebarItems = [
  { id: "dashboard", label: "DASHBOARD", icon: BarChart3 },
  { id: "projetos", label: "MEUS PROJETOS", icon: Package },
  { id: "publicar", label: "PUBLICAR ATIVO", icon: Plus },
  { id: "financeiro", label: "FLUXO FINANCEIRO", icon: DollarSign },
  { id: "lances", label: "LANCES REVERSOS", icon: Zap },
  { id: "perfil", label: "PERFIL & REGISTRO", icon: User },
];

export default function PainelProfissional() {
  const { user, isAuthenticated, logout, loading } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-background"><div className="w-12 h-12 rounded-2xl border-4 border-primary border-t-transparent animate-spin" /></div>;
  }

  if (!isAuthenticated || user?.role !== "professional") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[oklch(0.08_0.04_255)] p-6">
        <Card className="p-16 text-center max-w-xl w-full shadow-[0_64px_128px_-24px_rgba(0,0,0,0.5)] border-white/10 bg-white/5 backdrop-blur-xl rounded-[4rem]">
          <div className="w-24 h-24 rounded-[2rem] bg-primary/10 flex items-center justify-center mx-auto mb-10 text-primary border border-primary/20 shadow-2xl">
             <BadgeCheck size={48} className="animate-pulse" />
          </div>
          <h2 className="text-4xl font-black text-white mb-6 tracking-tighter">Acesso Profissional</h2>
          <p className="text-white/50 font-medium mb-12 text-lg leading-relaxed">
             Esta área é exclusiva para arquitetos e engenheiros com registro auditado (CREA/CAU).
          </p>
          <Button className="w-full h-20 brand-gradient text-white border-0 font-black text-xl rounded-[2rem] shadow-2xl hover:scale-[1.02] transition-transform" asChild>
             <a href={getLoginUrl()}>ENTRAR COMO PROFISSIONAL</a>
          </Button>
        </Card>
      </div>
    );
  }

  const isPremium = user?.accountType === "premium";

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Sidebar Imersiva */}
      <aside className="w-full md:w-80 flex-shrink-0 bg-[oklch(0.08_0.04_255)] text-white flex flex-col min-h-screen border-r border-white/5">
        <div className="p-10 border-b border-white/5">
          <Link href="/"><Logo size="sm" light /></Link>
          <div className="mt-8 flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/10">
            <ShieldCheck size={18} className="text-primary" />
            <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Operador Auditado</span>
          </div>
        </div>
        
        <div className="p-8 border-b border-white/5 bg-white/5">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl brand-gradient flex items-center justify-center text-white text-xl font-black shadow-2xl">
              {user?.name?.charAt(0)?.toUpperCase() ?? "P"}
            </div>
            <div className="min-w-0">
              <p className="text-base font-black text-white truncate uppercase tracking-tight">{user?.name}</p>
              <div className="flex items-center gap-2 mt-2">
                <BadgeCheck size={14} className="text-cyan-400" />
                <span className="text-[10px] font-black text-white/60 uppercase tracking-widest">Verificado</span>
              </div>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-6 flex flex-col gap-3 overflow-y-auto custom-scrollbar">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "flex items-center gap-4 px-6 py-4 rounded-2xl text-[10px] font-black transition-all text-left group uppercase tracking-[0.2em]",
                activeTab === item.id ? "bg-primary text-white shadow-2xl shadow-primary/40 scale-[1.02]" : "text-white/40 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon size={18} className={cn(activeTab === item.id ? "text-white" : "text-white/20 group-hover:text-white")} />
              {item.label}
              {item.id === "lances" && !isPremium && <Crown size={14} className="ml-auto text-amber-400" />}
            </button>
          ))}
        </nav>

        <div className="p-8 border-t border-white/5 flex flex-col gap-3">
          <Link href="/" className="flex items-center gap-4 px-6 py-4 rounded-2xl text-[10px] font-black text-white/40 hover:text-white hover:bg-white/5 transition-all uppercase tracking-[0.2em]">
            <Home size={18} /> Ver Vitrine
          </Link>
          <button onClick={() => logout()} className="flex items-center gap-4 px-6 py-4 rounded-2xl text-[10px] font-black text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-all uppercase tracking-[0.2em] w-full">
            <LogOut size={18} /> Encerrar Sessão
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-muted/20 p-6 md:p-12 lg:p-20">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="space-y-2">
              <Badge variant="outline" className="rounded-full px-4 py-1 border-primary/20 text-primary font-black uppercase tracking-[0.3em] text-[9px]">Portal do Profissional Auditado</Badge>
              <h1 className="text-5xl font-black text-foreground tracking-tighter leading-none">
                {sidebarItems.find((i) => i.id === activeTab)?.label}
              </h1>
            </div>
            {isPremium && (
              <Badge className="bg-amber-500 text-white border-0 py-3 px-6 gap-3 font-black text-[10px] tracking-[0.2em] rounded-2xl shadow-xl shadow-amber-500/20">
                <Crown size={18} /> MEMBRO PREMIUM
              </Badge>
            )}
          </div>

          {/* ─── DASHBOARD ─────────────────────────────────────────────── */}
          {activeTab === "dashboard" && (
            <div className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { label: "Saldo Disponível", value: "R$ 4.250", sub: "Repasse Pagar.me Ativo", icon: DollarSign, color: "text-emerald-500" },
                  { label: "Vendas do Mês", value: "12", sub: "+2 vs mês anterior", icon: TrendingUp, color: "text-cyan-500" },
                  { label: "Taxa de Comissão", value: isPremium ? "5%" : "10%", sub: isPremium ? "Protocolo Premium" : "Protocolo Base", icon: Zap, color: "text-amber-500" },
                  { label: "Visualizações", value: "1.240", sub: "Total em 30 dias", icon: BarChart3, color: "text-violet-500" },
                ].map((kpi) => (
                  <Card key={kpi.label} className="p-10 border-border/60 shadow-2xl rounded-[3rem] bg-background border-2 group hover:border-primary/40 transition-all">
                    <div className="flex items-center justify-between mb-8">
                      <div className={cn("p-5 rounded-2xl bg-muted group-hover:scale-110 transition-transform shadow-lg", kpi.color.replace('text', 'bg') + '/10')}>
                        <kpi.icon size={28} className={kpi.color} />
                      </div>
                      <Badge className="bg-primary/10 text-primary border-0 font-black text-[9px] tracking-widest px-3 py-1">+15%</Badge>
                    </div>
                    <p className="text-4xl font-black text-foreground tracking-tighter mb-2 leading-none">{kpi.value}</p>
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">{kpi.label}</p>
                    <p className="text-[10px] text-muted-foreground mt-2 font-medium">{kpi.sub}</p>
                  </Card>
                ))}
              </div>

              <Card className="p-12 border-border/60 rounded-[4rem] shadow-2xl bg-background border-2">
                <div className="flex items-center justify-between mb-12">
                   <h3 className="font-black text-2xl tracking-tight flex items-center gap-4">
                      <Activity size={28} className="text-primary" /> Performance de Vendas Auditada
                   </h3>
                   <div className="flex gap-3">
                      <Button variant="outline" size="sm" className="rounded-xl font-black text-[9px] tracking-widest px-4">DIÁRIO</Button>
                      <Button size="sm" className="rounded-xl font-black text-[9px] tracking-widest px-4 brand-gradient text-white border-0">SEMANAL</Button>
                   </div>
                </div>
                <div className="h-[350px] w-full flex items-center justify-center bg-muted/20 rounded-[3rem] border-2 border-dashed border-border/60">
                   <div className="text-center space-y-4">
                      <LayoutGrid size={48} className="text-muted-foreground/20 mx-auto" />
                      <p className="text-muted-foreground italic text-lg font-medium">Sincronizando gráficos em tempo real com o motor PRODIN...</p>
                   </div>
                </div>
              </Card>
            </div>
          )}

          {/* ─── LANCES REVERSOS ───────────────────────────────────────── */}
          {activeTab === "lances" && (
            <div className="space-y-10">
              {!isPremium && (
                <Card className="p-12 border-amber-500/30 bg-amber-500/5 rounded-[4rem] border-2 shadow-2xl overflow-hidden relative">
                  <div className="absolute inset-0 opacity-10 pointer-events-none">
                     <Crown size={300} className="absolute -right-20 -bottom-20 text-amber-500" />
                  </div>
                  <div className="flex flex-col lg:flex-row items-center gap-10 relative z-10">
                    <div className="p-8 bg-amber-500 rounded-[2.5rem] text-white shadow-2xl">
                      <Crown size={48} />
                    </div>
                    <div className="flex-1 text-center lg:text-left">
                      <h3 className="text-4xl font-black text-amber-900 tracking-tighter mb-4 leading-none">Acesso Restrito aos Lances Reversos</h3>
                      <p className="text-amber-800/70 font-medium text-xl leading-relaxed max-w-2xl">Apenas membros Premium podem participar de lances reversos e captar novos clientes de triagem técnica diretamente.</p>
                    </div>
                    <Button className="h-20 px-12 bg-amber-500 hover:bg-amber-600 text-white border-0 font-black text-xl rounded-[2rem] shadow-2xl transition-transform hover:scale-105" asChild>
                      <Link href="/planos">SEJA PREMIUM</Link>
                    </Button>
                  </div>
                </Card>
              )}

              <div className="grid gap-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-black text-2xl tracking-tight">Oportunidades de Triagem Ativa</h3>
                  <Badge variant="outline" className="gap-2 py-2 px-4 rounded-xl border-primary/20 text-primary font-black text-[10px] uppercase tracking-widest"><Clock size={14} /> Atualizado em tempo real</Badge>
                </div>
                
                {mockBids.map((bid) => (
                  <Card key={bid.id} className={cn("p-10 flex flex-col lg:flex-row items-center gap-10 border-border/60 rounded-[3.5rem] bg-background border-2 shadow-xl transition-all", !isPremium && "opacity-40 grayscale pointer-events-none")}>
                    <div className="w-20 h-20 rounded-[2rem] bg-primary/10 flex items-center justify-center text-primary shadow-inner shrink-0">
                      <MessageSquare size={36} />
                    </div>
                    <div className="flex-1 text-center lg:text-left space-y-2">
                      <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-2">
                        <p className="font-black text-3xl text-foreground tracking-tighter leading-none">{bid.description}</p>
                        <Badge className="bg-primary/10 text-primary border-0 font-black text-[10px] uppercase tracking-widest px-4 py-2 rounded-xl">Orçamento: {bid.budget}</Badge>
                      </div>
                      <p className="text-lg text-muted-foreground font-medium uppercase tracking-tight">Cliente: {bid.client} · Expira em: <span className="text-primary font-black">{bid.expiresAt}</span></p>
                    </div>
                    <Button 
                      className="h-16 px-10 brand-gradient text-white border-0 font-black text-lg rounded-2xl shadow-2xl hover:scale-105 transition-transform"
                      disabled={!isPremium}
                    >
                      ENVIAR PROPOSTA TÉCNICA
                    </Button>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* ─── FINANCEIRO ────────────────────────────────────────────── */}
          {activeTab === "financeiro" && (
            <div className="space-y-12">
              <Card className="p-12 border-border/60 rounded-[4rem] shadow-2xl bg-background border-2 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32" />
                
                <div className="flex flex-col md:flex-row items-center justify-between gap-10 mb-12 relative z-10">
                  <div className="space-y-3 text-center md:text-left">
                    <h3 className="text-4xl font-black tracking-tighter leading-none">Motor Financeiro PRODIN</h3>
                    <p className="text-xl text-muted-foreground font-medium">Transparência absoluta e split automatizado em cada transação.</p>
                  </div>
                  <div className="text-center md:text-right bg-primary/5 p-8 rounded-[3rem] border border-primary/10 shadow-inner">
                    <p className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.3em] mb-3">Protocolo de Taxa</p>
                    <p className="text-6xl font-black text-primary tracking-tighter leading-none">{isPremium ? "5%" : "10%"}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                  <div className="p-10 bg-muted/30 rounded-[3rem] border border-border/60 group hover:border-primary/20 transition-colors">
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-4">Bruto Acumulado Auditado</p>
                    <p className="text-4xl font-black tracking-tighter">R$ 12.450,00</p>
                  </div>
                  <div className="p-10 bg-muted/30 rounded-[3rem] border border-border/60 group hover:border-destructive/20 transition-colors">
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-4">Taxas Retidas Plataforma</p>
                    <p className="text-4xl font-black text-destructive tracking-tighter">- R$ {isPremium ? "622,50" : "1.245,00"}</p>
                  </div>
                  <div className="p-10 bg-primary/10 rounded-[3rem] border-2 border-primary/20 shadow-xl">
                    <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-4">Seu Recebimento Líquido</p>
                    <p className="text-4xl font-black text-primary tracking-tighter">R$ {isPremium ? "11.827,50" : "11.205,00"}</p>
                  </div>
                </div>

                <div className="mt-12 p-8 rounded-[2.5rem] bg-emerald-500/5 border border-emerald-500/20 flex items-center gap-6">
                   <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-600 shadow-sm">
                      <ShieldCheck size={24} />
                   </div>
                   <p className="text-emerald-900/70 font-bold text-sm uppercase tracking-tight leading-relaxed">
                      Seu saldo é auditado e protegido pelo protocolo de repasse imediato Pagar.me. Próximo saque disponível em: <span className="text-emerald-600 font-black">24h</span>.
                   </p>
                </div>
              </Card>
            </div>
          )}

          {/* Outras abas (projetos, publicar, perfil) seguem o mesmo padrão imersivo... */}
          {!["dashboard", "lances", "financeiro"].includes(activeTab) && (
             <Card className="p-32 text-center border-dashed border-4 border-border/40 rounded-[5rem] bg-muted/5">
                <div className="w-24 h-24 rounded-[2.5rem] bg-primary/10 flex items-center justify-center mx-auto mb-10 text-primary animate-pulse shadow-2xl">
                   <Target size={48} />
                </div>
                <h3 className="text-4xl font-black text-foreground mb-4 tracking-tighter leading-none">Módulo em Sincronização PRODIN</h3>
                <p className="text-xl text-muted-foreground font-medium max-w-xl mx-auto leading-relaxed">
                   Estamos auditando os protocolos de segurança para liberar esta funcionalidade com integridade total de dados.
                </p>
                <Button variant="outline" className="mt-12 h-16 px-12 rounded-2xl font-black text-[10px] uppercase tracking-widest border-2 border-primary/20 text-primary hover:bg-primary/5 transition-all" onClick={() => setActiveTab("dashboard")}>
                   VOLTAR AO DASHBOARD
                </Button>
             </Card>
          )}
        </div>
      </main>
    </div>
  );
}
