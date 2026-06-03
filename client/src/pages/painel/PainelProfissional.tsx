import { useAuth } from "@/_core/hooks/useAuth";
import { Logo } from "@/components/Logo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
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
  ChevronRight,
  Crown,
  DollarSign,
  FileText,
  Home,
  LogOut,
  Package,
  Plus,
  Settings,
  TrendingUp,
  Upload,
  User,
  Zap,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { toast } from "sonner";
import { FileUploader } from "@/components/FileUploader";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const mockFinancialData = [
  { month: "Jan", bruto: 8400, liquido: 7560, taxa: 840 },
  { month: "Fev", bruto: 12600, liquido: 11340, taxa: 1260 },
  { month: "Mar", bruto: 9800, liquido: 8820, taxa: 980 },
  { month: "Abr", bruto: 15200, liquido: 13680, taxa: 1520 },
  { month: "Mai", bruto: 18900, liquido: 17010, taxa: 1890 },
  { month: "Jun", bruto: 22400, liquido: 20160, taxa: 2240 },
];

const mockProjects = [
  { id: 1, title: "Casa Contemporânea 180m²", status: "published", price: "2800.00", sales: 23, rating: "4.9", views: 1240 },
  { id: 2, title: "Sobrado Duplex 220m²", status: "published", price: "3200.00", sales: 17, rating: "4.8", views: 980 },
  { id: 3, title: "Projeto Residencial 120m²", status: "draft", price: "890.00", sales: 0, rating: "0.0", views: 0 },
  { id: 4, title: "Escritório Corporativo", status: "pending_review", price: "4500.00", sales: 0, rating: "0.0", views: 0 },
];

const sidebarItems = [
  { id: "dashboard", label: "Dashboard", icon: BarChart3 },
  { id: "projetos", label: "Meus Projetos", icon: Package },
  { id: "publicar", label: "Publicar Projeto", icon: Plus },
  { id: "financeiro", label: "Financeiro", icon: DollarSign },
  { id: "lances", label: "Lances Reversos", icon: Zap },
  { id: "perfil", label: "Meu Perfil", icon: User },
  { id: "plano", label: "Plano Premium", icon: Crown },
];

const wizardSteps = ["Informações", "Mídias", "Precificação", "Revisão"];

export default function PainelProfissional() {
  const { user, isAuthenticated, logout, loading } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [wizardStep, setWizardStep] = useState(0);
  const [projectForm, setProjectForm] = useState({
    title: "",
    description: "",
    category: "",
    architecturalStyle: "",
    areaM2: "",
    price: "",
  });

  const feeRate = user?.accountType === "premium" ? 0.05 : 0.10;
  const price = parseFloat(projectForm.price) || 0;

  // Upload state for wizard step 1
  const [galleryUrls, setGalleryUrls] = useState<string[]>([]);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [technicalUrls, setTechnicalUrls] = useState<string[]>([]);
  const [render3dUrls, setRender3dUrls] = useState<string[]>([]);
  const [finalFileUrls, setFinalFileUrls] = useState<string[]>([]);

  // Auto-save draft every 30 seconds when form has content
  const autoSaveTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  useEffect(() => {
    if (activeTab !== "publicar") return;
    autoSaveTimer.current = setInterval(() => {
      if (projectForm.title) {
        setLastSaved(new Date());
        // In production: call trpc.projects.saveDraft.mutate({ ...projectForm, galleryUrls, thumbnailUrl })
      }
    }, 30000);
    return () => { if (autoSaveTimer.current) clearInterval(autoSaveTimer.current); };
  }, [activeTab, projectForm]);
  const platformFee = price * feeRate;
  const netAmount = price - platformFee;

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" /></div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="p-8 text-center max-w-sm w-full">
          <h2 className="text-xl font-bold mb-2">Acesso Restrito</h2>
          <Button className="w-full brand-gradient text-white border-0 mt-4" asChild>
            <a href={getLoginUrl()}>Entrar</a>
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 bg-[oklch(0.10_0.04_255)] text-white flex flex-col">
        <div className="p-5 border-b border-white/10">
          <Link href="/"><Logo size="sm" light /></Link>
        </div>
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full brand-gradient flex items-center justify-center text-white font-black">
              {user?.name?.charAt(0)?.toUpperCase() ?? "P"}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white truncate">{user?.name}</p>
              <div className="flex items-center gap-1">
                <BadgeCheck size={12} className="text-[oklch(0.72_0.18_210)]" />
                <span className="text-[10px] text-white/60">Profissional Verificado</span>
              </div>
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
              {item.id === "publicar" && <Plus size={12} className="ml-auto" />}
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
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-black text-foreground">
              {sidebarItems.find((i) => i.id === activeTab)?.label}
            </h1>
          </div>

          {/* ─── DASHBOARD ─────────────────────────────────────────────── */}
          {activeTab === "dashboard" && (
            <div className="flex flex-col gap-6">
              {/* KPI cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Faturamento Bruto", value: "R$ 22.400", sub: "+18% vs mês anterior", icon: TrendingUp, color: "text-[oklch(0.72_0.18_210)]" },
                  { label: "Faturamento Líquido", value: "R$ 20.160", sub: "Após comissão de 10%", icon: DollarSign, color: "text-[oklch(0.65_0.18_145)]" },
                  { label: "Projetos Publicados", value: "4", sub: "2 em destaque", icon: Package, color: "text-[oklch(0.45_0.22_255)]" },
                  { label: "Total de Vendas", value: "40", sub: "Este mês: 8 vendas", icon: BarChart3, color: "text-[oklch(0.78_0.16_75)]" },
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

              {/* Revenue chart */}
              <Card className="p-5">
                <h3 className="font-bold text-foreground mb-4">Evolução do Faturamento (6 meses)</h3>
                <ResponsiveContainer width="100%" height={220}>
                  <AreaChart data={mockFinancialData}>
                    <defs>
                      <linearGradient id="gradBruto" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="oklch(0.45 0.22 255)" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="oklch(0.45 0.22 255)" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="gradLiquido" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="oklch(0.72 0.18 210)" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="oklch(0.72 0.18 210)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.90 0.01 240)" />
                    <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `R$${(v / 1000).toFixed(0)}k`} />
                    <Tooltip formatter={(v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })} />
                    <Area type="monotone" dataKey="bruto" stroke="oklch(0.45 0.22 255)" fill="url(#gradBruto)" name="Bruto" />
                    <Area type="monotone" dataKey="liquido" stroke="oklch(0.72 0.18 210)" fill="url(#gradLiquido)" name="Líquido" />
                  </AreaChart>
                </ResponsiveContainer>
              </Card>
            </div>
          )}

          {/* ─── MEUS PROJETOS ─────────────────────────────────────────── */}
          {activeTab === "projetos" && (
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm text-muted-foreground">{mockProjects.length} projetos</p>
                <Button size="sm" className="brand-gradient text-white border-0 gap-1" onClick={() => setActiveTab("publicar")}>
                  <Plus size={14} /> Novo Projeto
                </Button>
              </div>
              {mockProjects.map((p) => (
                <Card key={p.id} className="p-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl brand-gradient flex items-center justify-center flex-shrink-0">
                    <FileText size={20} className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-foreground truncate">{p.title}</p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                      <span>{p.sales} vendas</span>
                      <span>{p.views} views</span>
                      {parseFloat(p.rating) > 0 && <span>⭐ {p.rating}</span>}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-bold text-sm text-foreground">
                      {parseFloat(p.price).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                    </p>
                    <Badge
                      className={cn("text-[10px]",
                        p.status === "published" ? "bg-[oklch(0.65_0.18_145)] text-white border-0" :
                        p.status === "pending_review" ? "bg-amber-100 text-amber-700 border-amber-200" :
                        "bg-muted text-muted-foreground"
                      )}
                    >
                      {p.status === "published" ? "Publicado" : p.status === "pending_review" ? "Em análise" : "Rascunho"}
                    </Badge>
                  </div>
                  <div className="flex gap-1 flex-shrink-0">
                    <Button variant="ghost" size="icon" className="h-8 w-8"><Settings size={14} /></Button>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* ─── PUBLICAR PROJETO (Wizard) ─────────────────────────────── */}
          {activeTab === "publicar" && (
            <div className="max-w-2xl">
              {/* Progress */}
              <div className="flex items-center gap-2 mb-8">
                {wizardSteps.map((step, idx) => (
                  <div key={step} className="flex items-center gap-2 flex-1">
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0",
                      idx < wizardStep ? "brand-gradient text-white" :
                      idx === wizardStep ? "border-2 border-primary text-primary" :
                      "border-2 border-border text-muted-foreground"
                    )}>
                      {idx < wizardStep ? <CheckCircle2 size={16} /> : idx + 1}
                    </div>
                    <span className={cn("text-sm font-medium", idx === wizardStep ? "text-foreground" : "text-muted-foreground")}>
                      {step}
                    </span>
                    {idx < wizardSteps.length - 1 && <div className={cn("flex-1 h-0.5", idx < wizardStep ? "brand-gradient" : "bg-border")} />}
                  </div>
                ))}
              </div>

              <Card className="p-6">
                {/* Step 0: Informações */}
                {wizardStep === 0 && (
                  <div className="flex flex-col gap-4">
                    <h3 className="font-bold text-foreground text-lg">Informações do Projeto</h3>
                    <div>
                      <Label className="text-xs font-semibold mb-1 block">Título do Projeto *</Label>
                      <Input value={projectForm.title} onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })} placeholder="Ex: Casa Contemporânea 180m² — Alto Padrão" />
                    </div>
                    <div>
                      <Label className="text-xs font-semibold mb-1 block">Descrição *</Label>
                      <Textarea value={projectForm.description} onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })} placeholder="Descreva o projeto em detalhes..." rows={4} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-xs font-semibold mb-1 block">Categoria *</Label>
                        <Select value={projectForm.category} onValueChange={(v) => setProjectForm({ ...projectForm, category: v })}>
                          <SelectTrigger><SelectValue placeholder="Selecionar..." /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="residential">Residencial</SelectItem>
                            <SelectItem value="commercial">Comercial</SelectItem>
                            <SelectItem value="industrial">Industrial</SelectItem>
                            <SelectItem value="interior_design">Design de Interiores</SelectItem>
                            <SelectItem value="landscape">Paisagismo</SelectItem>
                            <SelectItem value="renovation">Reforma</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-xs font-semibold mb-1 block">Estilo Arquitetônico</Label>
                        <Input value={projectForm.architecturalStyle} onChange={(e) => setProjectForm({ ...projectForm, architecturalStyle: e.target.value })} placeholder="Ex: Contemporâneo" />
                      </div>
                    </div>
                    <div>
                      <Label className="text-xs font-semibold mb-1 block">Área (m²)</Label>
                      <Input type="number" value={projectForm.areaM2} onChange={(e) => setProjectForm({ ...projectForm, areaM2: e.target.value })} placeholder="Ex: 180" />
                    </div>
                  </div>
                )}

                {/* Step 1: Mídias */}
                {wizardStep === 1 && (
                  <div className="flex flex-col gap-5">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-foreground text-lg">Mídias do Projeto</h3>
                      {lastSaved && (
                        <span className="text-xs text-muted-foreground">
                          Rascunho salvo às {lastSaved.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
                        </span>
                      )}
                    </div>

                    <FileUploader
                      label="Foto de Capa (Thumbnail)"
                      accept="image/*"
                      hint="Imagem principal exibida na vitrine. JPG ou PNG, mín. 800x600px. Máx. 5MB."
                      maxSizeMB={5}
                      onUpload={(files) => setThumbnailUrl(files[0]?.url ?? null)}
                    />

                    <FileUploader
                      label="Galeria de Fotos"
                      accept="image/*"
                      multiple
                      hint="Fotos do projeto, ambientes e fachadas. Até 20 imagens. Máx. 10MB cada."
                      maxSizeMB={10}
                      onUpload={(files) => setGalleryUrls(files.map((f) => f.url))}
                    />

                    <FileUploader
                      label="Cortes Técnicos e Plantas"
                      accept="image/*,application/pdf"
                      multiple
                      hint="Plantas baixas, cortes e elevações. PDF ou PNG. Máx. 20MB."
                      maxSizeMB={20}
                      onUpload={(files) => setTechnicalUrls(files.map((f) => f.url))}
                    />

                    <FileUploader
                      label="Visualização 3D (protegida)"
                      accept="image/*"
                      multiple
                      hint="Renders 3D — protegidos com desfoque e marca d'água até a compra. Máx. 15MB."
                      maxSizeMB={15}
                      onUpload={(files) => setRender3dUrls(files.map((f) => f.url))}
                    />

                    <FileUploader
                      label="Arquivos Finais (CAD/PDF) — entregues após compra"
                      accept=".dwg,.rvt,.pdf,.zip,application/pdf,application/zip,application/octet-stream"
                      multiple
                      hint="DWG, RVT, PDF ou ZIP. Entregues somente para compradores. Máx. 50MB."
                      maxSizeMB={50}
                      onUpload={(files) => setFinalFileUrls(files.map((f) => f.url))}
                    />
                  </div>
                )}

                {/* Step 2: Precificação */}
                {wizardStep === 2 && (
                  <div className="flex flex-col gap-4">
                    <h3 className="font-bold text-foreground text-lg">Precificação Dinâmica</h3>
                    <div>
                      <Label className="text-xs font-semibold mb-1 block">Preço de Venda (R$) *</Label>
                      <Input
                        type="number"
                        value={projectForm.price}
                        onChange={(e) => setProjectForm({ ...projectForm, price: e.target.value })}
                        placeholder="Ex: 2800.00"
                        className="text-lg font-bold"
                      />
                    </div>
                    {price > 0 && (
                      <Card className="p-4 bg-muted/30">
                        <p className="text-xs font-semibold text-muted-foreground mb-3">SIMULAÇÃO DE GANHOS</p>
                        <div className="flex flex-col gap-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-foreground/70">Preço de venda</span>
                            <span className="font-semibold">{price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-foreground/70">Comissão da plataforma ({(feeRate * 100).toFixed(0)}%)</span>
                            <span className="text-destructive font-semibold">- {platformFee.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span>
                          </div>
                          <Separator />
                          <div className="flex justify-between text-sm font-bold">
                            <span className="text-foreground">Você recebe</span>
                            <span className="text-[oklch(0.65_0.18_145)]">{netAmount.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span>
                          </div>
                        </div>
                        {user?.accountType !== "premium" && (
                          <div className="mt-3 p-2 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-700">
                            💡 Com o Plano Premium, sua comissão seria de apenas 5% — você receberia {(price * 0.95).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                          </div>
                        )}
                      </Card>
                    )}
                  </div>
                )}

                {/* Step 3: Revisão */}
                {wizardStep === 3 && (
                  <div className="flex flex-col gap-4">
                    <h3 className="font-bold text-foreground text-lg">Revisão Final</h3>
                    <div className="bg-muted/30 rounded-xl p-4 flex flex-col gap-2 text-sm">
                      <div className="flex justify-between"><span className="text-muted-foreground">Título</span><span className="font-medium">{projectForm.title || "—"}</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">Categoria</span><span className="font-medium">{projectForm.category || "—"}</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">Área</span><span className="font-medium">{projectForm.areaM2 ? `${projectForm.areaM2} m²` : "—"}</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">Preço</span><span className="font-bold text-foreground">{price > 0 ? price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) : "—"}</span></div>
                    </div>
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-700">
                      <AlertCircle size={14} className="inline mr-1" />
                      Seu projeto será enviado para análise da equipe Conecta Projetos antes de ser publicado na vitrine. Prazo: até 48 horas úteis.
                    </div>
                  </div>
                )}

                {/* Navigation buttons */}
                <div className="flex justify-between mt-6">
                  <Button variant="outline" onClick={() => setWizardStep(Math.max(0, wizardStep - 1))} disabled={wizardStep === 0}>
                    Voltar
                  </Button>
                  {wizardStep < wizardSteps.length - 1 ? (
                    <Button className="brand-gradient text-white border-0" onClick={() => setWizardStep(wizardStep + 1)}>
                      Próximo <ChevronRight size={14} className="ml-1" />
                    </Button>
                  ) : (
                    <Button
                      className="brand-gradient text-white border-0"
                      onClick={() => { toast.success("Projeto enviado para análise!"); setWizardStep(0); setActiveTab("projetos"); }}
                    >
                      Enviar para Análise
                    </Button>
                  )}
                </div>
              </Card>
            </div>
          )}

          {/* ─── FINANCEIRO ────────────────────────────────────────────── */}
          {activeTab === "financeiro" && (
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "A Receber (Retido)", value: "R$ 4.200", sub: "Liberação em 15 dias", color: "text-amber-500" },
                  { label: "Disponível para Saque", value: "R$ 15.960", sub: "Pronto para transferir", color: "text-[oklch(0.65_0.18_145)]" },
                  { label: "Total do Mês", value: "R$ 22.400", sub: "Junho 2024", color: "text-[oklch(0.45_0.22_255)]" },
                  { label: "Total Acumulado", value: "R$ 87.300", sub: "Desde o cadastro", color: "text-foreground" },
                ].map((kpi) => (
                  <Card key={kpi.label} className="p-4">
                    <p className="text-xs text-muted-foreground mb-2">{kpi.label}</p>
                    <p className={cn("text-2xl font-black", kpi.color)}>{kpi.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{kpi.sub}</p>
                  </Card>
                ))}
              </div>
              <Card className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-foreground">Histórico de Vendas</h3>
                  <Button variant="outline" size="sm">Exportar CSV</Button>
                </div>
                <div className="flex flex-col gap-2">
                  {[
                    { project: "Casa Contemporânea 180m²", buyer: "João P.", gross: "2800.00", fee: "280.00", net: "2520.00", status: "paid_out", date: "2024-06-15" },
                    { project: "Sobrado Duplex 220m²", buyer: "Maria S.", gross: "3200.00", fee: "320.00", net: "2880.00", status: "held", date: "2024-06-18" },
                    { project: "Casa Contemporânea 180m²", buyer: "Carlos M.", gross: "2800.00", fee: "280.00", net: "2520.00", status: "held", date: "2024-06-20" },
                  ].map((sale, idx) => (
                    <div key={idx} className="flex items-center gap-3 py-2 border-b border-border/60 last:border-0 text-sm">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground truncate">{sale.project}</p>
                        <p className="text-xs text-muted-foreground">{sale.buyer} · {sale.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-foreground">{parseFloat(sale.net).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p>
                        <p className="text-xs text-muted-foreground">taxa: {parseFloat(sale.fee).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p>
                      </div>
                      <Badge className={cn("text-[10px] flex-shrink-0",
                        sale.status === "paid_out" ? "bg-[oklch(0.65_0.18_145)] text-white border-0" : "bg-amber-100 text-amber-700 border-amber-200"
                      )}>
                        {sale.status === "paid_out" ? "Pago" : "Retido (15d)"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {/* ─── LANCES REVERSOS ───────────────────────────────────────── */}
          {activeTab === "lances" && (
            <div className="flex flex-col gap-4">
              <p className="text-sm text-muted-foreground">Clientes publicaram demandas abertas. Envie propostas e seja contratado diretamente.</p>
              {[
                { id: 1, title: "Preciso de projeto para casa 200m² em condomínio", category: "Residencial", budget: "R$ 3.000 – R$ 5.000", deadline: "2024-07-15", bids: 4 },
                { id: 2, title: "Reforma de escritório 80m² — layout aberto", category: "Comercial", budget: "R$ 1.500 – R$ 2.500", deadline: "2024-07-20", bids: 2 },
                { id: 3, title: "Design de interiores para apartamento 90m²", category: "Interiores", budget: "R$ 2.000 – R$ 3.500", deadline: "2024-07-30", bids: 7 },
              ].map((demand) => (
                <Card key={demand.id} className="p-4 flex items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-foreground">{demand.title}</p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                      <Badge variant="secondary" className="text-[10px]">{demand.category}</Badge>
                      <span>{demand.budget}</span>
                      <span>Prazo: {demand.deadline}</span>
                      <span>{demand.bids} propostas</span>
                    </div>
                  </div>
                  <Button size="sm" className="brand-gradient text-white border-0 flex-shrink-0">
                    Enviar Proposta
                  </Button>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
