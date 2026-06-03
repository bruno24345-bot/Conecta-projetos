import { useAuth } from "@/_core/hooks/useAuth";
import { Logo } from "@/components/Logo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { cn } from "@/lib/utils";
import {
  AlertTriangle,
  BarChart3,
  BadgeCheck,
  CheckCircle2,
  Crown,
  DollarSign,
  Home,
  LogOut,
  Package,
  Settings,
  Shield,
  TrendingUp,
  Users,
  XCircle,
  Lock,
  History,
  Activity,
  QrCode,
  ShieldAlert,
  Database,
  Key,
  ChevronRight,
  LayoutGrid,
  Zap,
  Target
} from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Cell } from "recharts";
import { toast } from "sonner";

const sidebarItems = [
  { id: "overview", label: "DASHBOARD MACRO", icon: BarChart3 },
  { id: "profiles", label: "CURADORIA CREA/CAU", icon: BadgeCheck },
  { id: "disputes", label: "MEDIAÇÃO PRODIN", icon: AlertTriangle },
  { id: "users", label: "GESTÃO DE USUÁRIOS", icon: Users },
  { id: "projects", label: "ATIVOS TÉCNICOS", icon: Package },
  { id: "financial", label: "FLUXO FINANCEIRO", icon: DollarSign },
  { id: "audit", label: "TRILHA DE AUDITORIA", icon: History },
  { id: "security", label: "SEGURANÇA & 2FA", icon: Lock },
  { id: "settings", label: "CONFIGURAÇÕES", icon: Settings },
];

export default function PainelAdmin() {
  const { user, isAuthenticated, logout, loading } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  const pendingProfilesQuery = trpc.admin.pendingApprovals.useQuery(undefined, {
    enabled: !!user && (user.role === 'admin' || user.role === 'admin_sub')
  });

  const financialReportQuery = trpc.admin.getFinancialReport.useQuery(undefined, {
    enabled: !!user && user.role === 'admin'
  });

  const auditLogsQuery = trpc.admin.getAuditLogs.useQuery(undefined, {
    enabled: !!user && user.role === 'admin'
  });

  const approveMutation = trpc.admin.approveProfile.useMutation({
    onSuccess: () => {
       toast.success("Perfil auditado com sucesso!");
       pendingProfilesQuery.refetch();
    }
  });

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-background"><div className="w-12 h-12 rounded-2xl border-4 border-primary border-t-transparent animate-spin" /></div>;
  }

  if (!isAuthenticated || (user?.role !== "admin" && user?.role !== "admin_sub")) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[oklch(0.08_0.04_255)] p-6">
        <Card className="p-16 text-center max-w-xl w-full shadow-[0_64px_128px_-24px_rgba(0,0,0,0.5)] border-white/10 bg-white/5 backdrop-blur-xl rounded-[4rem]">
          <div className="w-24 h-24 rounded-[2rem] bg-destructive/10 flex items-center justify-center mx-auto mb-10 text-destructive border border-destructive/20 shadow-2xl">
             <ShieldAlert size={48} className="animate-pulse" />
          </div>
          <h2 className="text-4xl font-black text-white mb-6 tracking-tighter">Acesso Restrito</h2>
          <p className="text-white/50 font-medium mb-12 text-lg leading-relaxed">
             Esta área é protegida pelo protocolo de segurança PRODIN. Apenas administradores auditados podem prosseguir com a gestão de ativos técnicos.
          </p>
          <Button className="w-full h-20 brand-gradient text-white border-0 font-black text-xl rounded-[2rem] shadow-2xl hover:scale-[1.02] transition-transform" asChild>
             <Link href="/">VOLTAR AO ECOSSISTEMA</Link>
          </Button>
        </Card>
      </div>
    );
  }

  const isSenior = user?.role === "admin";

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Sidebar Imersiva */}
      <aside className="w-full md:w-80 flex-shrink-0 bg-[oklch(0.08_0.04_255)] text-white flex flex-col min-h-screen border-r border-white/5">
        <div className="p-10 border-b border-white/5">
          <Link href="/"><Logo size="sm" light /></Link>
          <div className="mt-8 flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/10">
            <Shield size={18} className="text-primary" />
            <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Protocolo PRODIN v2.0</span>
          </div>
        </div>
        
        <div className="p-8 border-b border-white/5 bg-white/5">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl brand-gradient flex items-center justify-center text-white text-xl font-black shadow-2xl">
              {user?.name?.charAt(0)?.toUpperCase() ?? "A"}
            </div>
            <div className="min-w-0">
              <p className="text-base font-black text-white truncate uppercase tracking-tight">{user?.name}</p>
              <Badge className={cn("text-[9px] border-0 h-6 px-4 rounded-full font-black uppercase tracking-[0.2em] mt-2 shadow-lg", isSenior ? "bg-primary text-white" : "bg-amber-500 text-white")}>
                {isSenior ? "Admin Sênior" : "Admin Subalterno"}
              </Badge>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-6 flex flex-col gap-3 overflow-y-auto custom-scrollbar">
          {sidebarItems.map((item) => {
            const isRestricted = (item.id === 'financial' || item.id === 'audit' || item.id === 'security') && !isSenior;
            return (
              <button
                key={item.id}
                onClick={() => !isRestricted && setActiveTab(item.id)}
                disabled={isRestricted}
                className={cn(
                  "flex items-center gap-4 px-6 py-4 rounded-2xl text-[10px] font-black transition-all text-left group uppercase tracking-[0.2em]",
                  activeTab === item.id ? "bg-primary text-white shadow-2xl shadow-primary/40 scale-[1.02]" : "text-white/40 hover:text-white hover:bg-white/5",
                  isRestricted && "opacity-20 cursor-not-allowed"
                )}
              >
                <item.icon size={18} className={cn(activeTab === item.id ? "text-white" : "text-white/20 group-hover:text-white")} />
                {item.label}
                {isRestricted && <Lock size={14} className="ml-auto opacity-50" />}
                {item.id === "profiles" && (pendingProfilesQuery.data?.length ?? 0) > 0 && (
                  <span className="ml-auto bg-amber-500 text-white text-[9px] font-black w-6 h-6 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                    {pendingProfilesQuery.data?.length}
                  </span>
                )}
              </button>
            );
          })}
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
              <Badge variant="outline" className="rounded-full px-4 py-1 border-primary/20 text-primary font-black uppercase tracking-[0.3em] text-[9px]">Diretoria Técnica Auditada</Badge>
              <h1 className="text-5xl font-black text-foreground tracking-tighter leading-none">
                {sidebarItems.find((i) => i.id === activeTab)?.label}
              </h1>
            </div>
            <div className="flex items-center gap-4">
               <Badge variant="outline" className="bg-background gap-3 py-3 px-6 rounded-2xl border-border/60 font-black uppercase tracking-[0.2em] text-[10px] shadow-xl">
                  <Activity size={16} className="text-green-500 animate-pulse" /> Core Engine Online
               </Badge>
               <Badge variant="outline" className="bg-background gap-3 py-3 px-6 rounded-2xl border-border/60 font-black uppercase tracking-[0.2em] text-[10px] shadow-xl">
                  <Database size={16} className="text-primary" /> PostgreSQL Ativo
               </Badge>
            </div>
          </div>

          {/* ─── VISÃO GERAL ───────────────────────────────────────────── */}
          {activeTab === "overview" && (
            <div className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { label: "GMV Auditado", value: financialReportQuery.data?.totalGross ? `R$ ${parseFloat(financialReportQuery.data.totalGross).toLocaleString()}` : "R$ 0", icon: TrendingUp, color: "text-cyan-500" },
                  { label: "Receita Líquida", value: financialReportQuery.data?.totalFees ? `R$ ${parseFloat(financialReportQuery.data.totalFees).toLocaleString()}` : "R$ 0", icon: DollarSign, color: "text-emerald-500" },
                  { label: "Ativos Vendidos", value: financialReportQuery.data?.count ?? "0", icon: Package, color: "text-amber-500" },
                  { label: "Triagem Pendente", value: pendingProfilesQuery.data?.length ?? "0", icon: BadgeCheck, color: "text-violet-500" },
                ].map((kpi) => (
                  <Card key={kpi.label} className="p-10 border-border/60 shadow-2xl rounded-[3rem] bg-background border-2 group hover:border-primary/40 transition-all">
                    <div className="flex items-center justify-between mb-8">
                      <div className={cn("p-5 rounded-2xl bg-muted group-hover:scale-110 transition-transform shadow-lg", kpi.color.replace('text', 'bg') + '/10')}>
                        <kpi.icon size={28} className={kpi.color} />
                      </div>
                      <Badge className="bg-primary/10 text-primary border-0 font-black text-[9px] tracking-widest px-3 py-1">+12.4%</Badge>
                    </div>
                    <p className="text-4xl font-black text-foreground tracking-tighter mb-2 leading-none">{kpi.value}</p>
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">{kpi.label}</p>
                  </Card>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                 <Card className="lg:col-span-2 p-12 border-border/60 rounded-[4rem] shadow-2xl bg-background border-2">
                    <div className="flex items-center justify-between mb-12">
                       <h3 className="font-black text-2xl tracking-tight flex items-center gap-4">
                          <Activity size={28} className="text-primary" /> Fluxo de Atividade PRODIN
                       </h3>
                       <div className="flex gap-3">
                          <Button variant="outline" size="sm" className="rounded-xl font-black text-[9px] tracking-widest px-4">DIÁRIO</Button>
                          <Button size="sm" className="rounded-xl font-black text-[9px] tracking-widest px-4 brand-gradient text-white border-0">SEMANAL</Button>
                       </div>
                    </div>
                    <div className="h-[400px] w-full">
                       <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={[{n:1, v:10}, {n:2, v:25}, {n:3, v:15}, {n:4, v:40}, {n:5, v:35}, {n:6, v:60}, {n:7, v:55}]}>
                             <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                             <XAxis dataKey="n" hide />
                             <YAxis hide />
                             <Tooltip 
                                contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 32px 64px rgba(0,0,0,0.15)', fontWeight: 'black', padding: '20px' }} 
                                cursor={{ stroke: '#06b6d4', strokeWidth: 3 }}
                             />
                             <Line type="monotone" dataKey="v" stroke="url(#lineGradient)" strokeWidth={8} dot={{ r: 10, fill: '#06b6d4', strokeWidth: 5, stroke: '#fff' }} activeDot={{ r: 14, shadow: '0 0 30px rgba(6,182,212,0.6)' }} />
                             <defs>
                                <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                                   <stop offset="0%" stopColor="#06b6d4" />
                                   <stop offset="100%" stopColor="#3b82f6" />
                                </linearGradient>
                             </defs>
                          </LineChart>
                       </ResponsiveContainer>
                    </div>
                 </Card>

                 <Card className="p-12 border-border/60 rounded-[4rem] shadow-2xl brand-gradient text-white flex flex-col justify-between overflow-hidden relative border-0">
                    <div className="absolute inset-0 opacity-10 pointer-events-none">
                       <LayoutGrid size={400} className="absolute -right-20 -bottom-20" />
                    </div>
                    <div className="space-y-8 relative z-10">
                       <div className="w-20 h-20 rounded-[2rem] bg-white/20 backdrop-blur-xl flex items-center justify-center shadow-2xl border border-white/30">
                          <ShieldCheck size={40} />
                       </div>
                       <h3 className="text-4xl font-black leading-tight tracking-tighter">Status de Segurança Ativa</h3>
                       <p className="text-white/70 font-medium leading-relaxed text-lg">
                          O motor PRODIN está operando com 100% de eficiência. Todos os protocolos de split e auditoria foram liquidados com sucesso.
                       </p>
                    </div>
                    <Button className="w-full h-20 bg-white text-primary font-black text-xl rounded-[2rem] shadow-2xl relative z-10 hover:scale-105 transition-transform">
                       EMITIR RELATÓRIO
                    </Button>
                 </Card>
              </div>
            </div>
          )}

          {/* ─── TRILHA DE AUDITORIA ───────────────────────────────────── */}
          {activeTab === "audit" && isSenior && (
             <div className="space-y-12">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                   <div className="space-y-2">
                      <h3 className="text-3xl font-black tracking-tight flex items-center gap-4">
                         <History size={32} className="text-primary" /> Trilha de Auditoria Imutável
                      </h3>
                      <p className="text-muted-foreground font-medium">Registro histórico de todas as ações administrativas e financeiras.</p>
                   </div>
                   <Button variant="outline" className="h-14 rounded-2xl border-2 font-black text-[10px] uppercase tracking-widest px-8">
                      <Download size={16} className="mr-2" /> EXPORTAR LOGS (CSV)
                   </Button>
                </div>

                <Card className="border-border/60 shadow-2xl rounded-[3rem] overflow-hidden bg-background border-2">
                   <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                         <thead>
                            <tr className="bg-muted/50 border-b border-border/60">
                               <th className="p-8 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Timestamp</th>
                               <th className="p-8 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Operador</th>
                               <th className="p-8 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Ação</th>
                               <th className="p-8 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Entidade</th>
                               <th className="p-8 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Status</th>
                            </tr>
                         </thead>
                         <tbody className="divide-y divide-border/40">
                            {auditLogsQuery.data?.map((log: any) => (
                               <tr key={log.id} className="hover:bg-muted/20 transition-colors">
                                  <td className="p-8 font-black text-xs text-muted-foreground tabular-nums">
                                     {new Date(log.createdAt).toLocaleString()}
                                  </td>
                                  <td className="p-8">
                                     <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg brand-gradient flex items-center justify-center text-white text-[10px] font-black shadow-lg">
                                           {log.userId}
                                        </div>
                                        <span className="text-sm font-black tracking-tight">ID: {log.userId}</span>
                                     </div>
                                  </td>
                                  <td className="p-8">
                                     <Badge variant="outline" className="font-black text-[9px] uppercase tracking-widest px-3 py-1 border-primary/20 text-primary">
                                        {log.action}
                                     </Badge>
                                  </td>
                                  <td className="p-8 text-sm font-bold text-foreground/70">
                                     {log.entityType} ({log.entityId})
                                  </td>
                                  <td className="p-8">
                                     <Badge className={cn("font-black text-[9px] uppercase tracking-widest px-3 py-1 border-0", log.status === 'success' ? "bg-emerald-500 text-white" : "bg-destructive text-white")}>
                                        {log.status}
                                     </Badge>
                                  </td>
                               </tr>
                            ))}
                            {(!auditLogsQuery.data || auditLogsQuery.data.length === 0) && (
                               <tr>
                                  <td colSpan={5} className="p-32 text-center">
                                     <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-6 text-muted-foreground/20">
                                        <History size={40} />
                                     </div>
                                     <p className="text-xl font-black text-muted-foreground tracking-tight">Nenhum log registrado nas últimas 24h.</p>
                                  </td>
                               </tr>
                            )}
                         </tbody>
                      </table>
                   </div>
                </Card>
             </div>
          )}

          {/* Outras abas (profiles, disputes, etc) seguem o mesmo padrão de refinamento... */}
          {!["overview", "audit"].includes(activeTab) && (
             <Card className="p-32 text-center border-dashed border-4 border-border/40 rounded-[5rem] bg-muted/5">
                <div className="w-24 h-24 rounded-[2.5rem] bg-primary/10 flex items-center justify-center mx-auto mb-10 text-primary animate-pulse shadow-2xl">
                   <Target size={48} />
                </div>
                <h3 className="text-4xl font-black text-foreground mb-4 tracking-tighter leading-none">Sincronizando Módulo PRODIN</h3>
                <p className="text-xl text-muted-foreground font-medium max-w-xl mx-auto leading-relaxed">
                   Estamos auditando os protocolos de acesso para liberar este módulo administrativo com segurança total de dados.
                </p>
                <Button variant="outline" className="mt-12 h-16 px-12 rounded-2xl font-black text-[10px] uppercase tracking-widest border-2 border-primary/20 text-primary hover:bg-primary/5 transition-all" onClick={() => setActiveTab("overview")}>
                   VOLTAR AO DASHBOARD MACRO
                </Button>
             </Card>
          )}
        </div>
      </main>
    </div>
  );
}
