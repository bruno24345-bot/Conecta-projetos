import { useAuth } from "@/_core/hooks/useAuth";
import { Logo } from "@/components/Logo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { getLoginUrl } from "@/const";
import { cn } from "@/lib/utils";
import {
  AlertTriangle,
  BarChart3,
  BadgeCheck,
  CheckCircle2,
  Crown,
  DollarSign,
  FileText,
  Home,
  LogOut,
  Package,
  Search,
  Settings,
  Shield,
  TrendingUp,
  User,
  Users,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { toast } from "sonner";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

const mockFinancialMacro = [
  { month: "Jan", gmv: 84000, comissao: 8400, assinaturas: 2800 },
  { month: "Fev", gmv: 126000, comissao: 12600, assinaturas: 3500 },
  { month: "Mar", gmv: 98000, comissao: 9800, assinaturas: 4200 },
  { month: "Abr", gmv: 152000, comissao: 15200, assinaturas: 5600 },
  { month: "Mai", gmv: 189000, comissao: 18900, assinaturas: 7000 },
  { month: "Jun", gmv: 224000, comissao: 22400, assinaturas: 8400 },
];

const mockPendingProfiles = [
  { id: 1, name: "Arq. Lucas Ferreira", type: "CAU", number: "A-987654-3", uf: "SP", submittedAt: "2024-06-20" },
  { id: 2, name: "Eng. Beatriz Alves", type: "CREA", number: "5062345-6", uf: "RJ", submittedAt: "2024-06-21" },
  { id: 3, name: "Des. Roberto Lima", type: "CAU", number: "A-112233-4", uf: "MG", submittedAt: "2024-06-22" },
];

const mockDisputes = [
  { id: 1, buyer: "João P.", professional: "Arq. Marina Costa", project: "Casa 180m²", amount: "2800.00", status: "open", openedAt: "2024-06-18" },
  { id: 2, buyer: "Maria S.", professional: "Eng. Rafael Souza", project: "Escritório 350m²", amount: "4500.00", status: "in_review", openedAt: "2024-06-15" },
];

const mockUsers = [
  { id: 1, name: "João Pedro Silva", email: "joao@email.com", role: "user", accountType: "free", createdAt: "2024-01-15" },
  { id: 2, name: "Arq. Marina Costa", email: "marina@email.com", role: "professional", accountType: "premium", createdAt: "2024-02-01" },
  { id: 3, name: "Carlos Eduardo", email: "carlos@email.com", role: "user", accountType: "premium", createdAt: "2024-03-10" },
];

const sidebarItems = [
  { id: "overview", label: "Visão Geral", icon: BarChart3 },
  { id: "profiles", label: "Aprovar Cadastros", icon: BadgeCheck },
  { id: "disputes", label: "Mediações", icon: AlertTriangle },
  { id: "users", label: "Usuários", icon: Users },
  { id: "projects", label: "Projetos", icon: Package },
  { id: "financial", label: "Financeiro", icon: DollarSign },
  { id: "settings", label: "Configurações", icon: Settings },
];

export default function PainelAdmin() {
  const { user, isAuthenticated, logout, loading } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [userSearch, setUserSearch] = useState("");

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" /></div>;
  }

  if (!isAuthenticated || (user?.role !== "admin" && user?.role !== "admin_sub")) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="p-8 text-center max-w-sm w-full">
          <Shield size={40} className="text-destructive mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">Acesso Negado</h2>
          <p className="text-muted-foreground text-sm mb-4">Esta área é restrita a administradores.</p>
          <Button variant="outline" asChild><Link href="/">Voltar ao site</Link></Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 bg-[oklch(0.08_0.04_255)] text-white flex flex-col">
        <div className="p-5 border-b border-white/10">
          <Link href="/"><Logo size="sm" light /></Link>
          <div className="mt-2 flex items-center gap-1">
            <Shield size={12} className="text-[oklch(0.72_0.18_210)]" />
            <span className="text-[10px] text-white/50">Painel Administrativo</span>
          </div>
        </div>
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white font-black">
              {user?.name?.charAt(0)?.toUpperCase() ?? "A"}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white truncate">{user?.name}</p>
              <Badge className="text-[10px] bg-red-600/30 text-red-300 border-red-500/30">
                {user?.role === "admin" ? "Administrador Sênior" : "Subalterno"}
              </Badge>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-3 flex flex-col gap-1">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left",
                activeTab === item.id ? "bg-white/10 text-white" : "text-white/60 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon size={16} />
              {item.label}
              {item.id === "profiles" && mockPendingProfiles.length > 0 && (
                <span className="ml-auto bg-amber-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {mockPendingProfiles.length}
                </span>
              )}
              {item.id === "disputes" && mockDisputes.length > 0 && (
                <span className="ml-auto bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {mockDisputes.length}
                </span>
              )}
            </button>
          ))}
        </nav>
        <div className="p-3 border-t border-white/10 flex flex-col gap-1">
          <Link href="/" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors">
            <Home size={16} /> Voltar ao Site
          </Link>
          <button onClick={() => logout()} className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/60 hover:text-red-400 hover:bg-white/5 transition-colors">
            <LogOut size={16} /> Sair
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto bg-muted/20">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-black text-foreground">
              {sidebarItems.find((i) => i.id === activeTab)?.label}
            </h1>
          </div>

          {/* ─── VISÃO GERAL ───────────────────────────────────────────── */}
          {activeTab === "overview" && (
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "GMV Total (Junho)", value: "R$ 224.000", sub: "+18% vs maio", icon: TrendingUp, color: "text-[oklch(0.45_0.22_255)]" },
                  { label: "Receita Plataforma", value: "R$ 30.800", sub: "Comissões + assinaturas", icon: DollarSign, color: "text-[oklch(0.65_0.18_145)]" },
                  { label: "Assinaturas Ativas", value: "284", sub: "Premium ativos", icon: Crown, color: "text-[oklch(0.78_0.16_75)]" },
                  { label: "Usuários Totais", value: "12.847", sub: "+342 esta semana", icon: Users, color: "text-[oklch(0.72_0.18_210)]" },
                ].map((kpi) => (
                  <Card key={kpi.label} className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-xs text-muted-foreground">{kpi.label}</p>
                      <kpi.icon size={16} className={kpi.color} />
                    </div>
                    <p className="text-2xl font-black text-foreground">{kpi.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{kpi.sub}</p>
                  </Card>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-5">
                  <h3 className="font-bold text-foreground mb-4">GMV Mensal (R$)</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={mockFinancialMacro}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                      <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                      <Tooltip formatter={(v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })} />
                      <Bar dataKey="gmv" fill="oklch(0.45 0.22 255)" radius={[4, 4, 0, 0]} name="GMV" />
                    </BarChart>
                  </ResponsiveContainer>
                </Card>
                <Card className="p-5">
                  <h3 className="font-bold text-foreground mb-4">Receita da Plataforma (R$)</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={mockFinancialMacro}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                      <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                      <Tooltip formatter={(v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })} />
                      <Line type="monotone" dataKey="comissao" stroke="oklch(0.72 0.18 210)" strokeWidth={2} name="Comissões" dot={false} />
                      <Line type="monotone" dataKey="assinaturas" stroke="oklch(0.78 0.16 75)" strokeWidth={2} name="Assinaturas" dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </Card>
              </div>

              {/* Pending alerts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Card className="p-4 border border-amber-200 bg-amber-50">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle size={16} className="text-amber-600" />
                    <h3 className="font-bold text-amber-800">{mockPendingProfiles.length} Cadastros Pendentes</h3>
                  </div>
                  <p className="text-xs text-amber-700 mb-3">Profissionais aguardando validação de CREA/CAU</p>
                  <Button size="sm" variant="outline" className="border-amber-300 text-amber-700" onClick={() => setActiveTab("profiles")}>
                    Revisar Agora
                  </Button>
                </Card>
                <Card className="p-4 border border-red-200 bg-red-50">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle size={16} className="text-red-600" />
                    <h3 className="font-bold text-red-800">{mockDisputes.length} Mediações Abertas</h3>
                  </div>
                  <p className="text-xs text-red-700 mb-3">Disputas entre compradores e profissionais</p>
                  <Button size="sm" variant="outline" className="border-red-300 text-red-700" onClick={() => setActiveTab("disputes")}>
                    Ver Mediações
                  </Button>
                </Card>
              </div>
            </div>
          )}

          {/* ─── APROVAR CADASTROS ─────────────────────────────────────── */}
          {activeTab === "profiles" && (
            <div className="flex flex-col gap-4">
              <p className="text-sm text-muted-foreground">{mockPendingProfiles.length} profissionais aguardando aprovação de CREA/CAU</p>
              {mockPendingProfiles.map((profile) => (
                <Card key={profile.id} className="p-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full brand-gradient flex items-center justify-center text-white font-black">
                    {profile.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground">{profile.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {profile.type} {profile.number} — {profile.uf} · Enviado em {profile.submittedAt}
                    </p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-red-300 text-red-600 hover:bg-red-50 gap-1"
                      onClick={() => toast.error(`Cadastro de ${profile.name} rejeitado.`)}
                    >
                      <XCircle size={14} /> Rejeitar
                    </Button>
                    <Button
                      size="sm"
                      className="bg-[oklch(0.65_0.18_145)] text-white border-0 hover:opacity-90 gap-1"
                      onClick={() => toast.success(`Cadastro de ${profile.name} aprovado!`)}
                    >
                      <CheckCircle2 size={14} /> Aprovar
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* ─── MEDIAÇÕES ─────────────────────────────────────────────── */}
          {activeTab === "disputes" && (
            <div className="flex flex-col gap-4">
              {mockDisputes.map((dispute) => (
                <Card key={dispute.id} className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="font-semibold text-foreground">{dispute.project}</p>
                      <p className="text-xs text-muted-foreground">
                        Comprador: {dispute.buyer} · Profissional: {dispute.professional}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-foreground">
                        {parseFloat(dispute.amount).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                      </p>
                      <Badge className={cn("text-[10px]",
                        dispute.status === "open" ? "bg-red-100 text-red-700 border-red-200" : "bg-amber-100 text-amber-700 border-amber-200"
                      )}>
                        {dispute.status === "open" ? "Aberta" : "Em análise"}
                      </Badge>
                    </div>
                  </div>
                  <Separator className="mb-3" />
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="gap-1">
                      <FileText size={12} /> Ver Detalhes
                    </Button>
                    <Button size="sm" className="brand-gradient text-white border-0 gap-1">
                      <CheckCircle2 size={12} /> Resolver
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* ─── USUÁRIOS ──────────────────────────────────────────────── */}
          {activeTab === "users" && (
            <div className="flex flex-col gap-4">
              <div className="relative max-w-sm">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input value={userSearch} onChange={(e) => setUserSearch(e.target.value)} placeholder="Buscar usuários..." className="pl-9" />
              </div>
              <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="text-left p-3 font-semibold text-muted-foreground">Nome</th>
                        <th className="text-left p-3 font-semibold text-muted-foreground">E-mail</th>
                        <th className="text-left p-3 font-semibold text-muted-foreground">Perfil</th>
                        <th className="text-left p-3 font-semibold text-muted-foreground">Plano</th>
                        <th className="text-left p-3 font-semibold text-muted-foreground">Cadastro</th>
                        <th className="text-left p-3 font-semibold text-muted-foreground">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockUsers.filter((u) => !userSearch || u.name.toLowerCase().includes(userSearch.toLowerCase())).map((u) => (
                        <tr key={u.id} className="border-t border-border/60 hover:bg-muted/20">
                          <td className="p-3 font-medium text-foreground">{u.name}</td>
                          <td className="p-3 text-muted-foreground">{u.email}</td>
                          <td className="p-3">
                            <Badge variant="secondary" className="text-[10px]">
                              {u.role === "professional" ? "Profissional" : u.role === "admin" ? "Admin" : "Cliente"}
                            </Badge>
                          </td>
                          <td className="p-3">
                            {u.accountType === "premium" ? (
                              <span className="premium-badge">⭐ Premium</span>
                            ) : (
                              <span className="text-xs text-muted-foreground">Gratuito</span>
                            )}
                          </td>
                          <td className="p-3 text-muted-foreground text-xs">{u.createdAt}</td>
                          <td className="p-3">
                            <Button variant="ghost" size="sm" className="h-7 text-xs">Ver</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
