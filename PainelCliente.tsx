import { useAuth } from "@/_core/hooks/useAuth";
import { Logo } from "@/components/Logo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { getLoginUrl } from "@/const";
import { cn } from "@/lib/utils";
import {
  Download,
  FileText,
  Home,
  LogOut,
  Package,
  Settings,
  ShoppingCart,
  User,
  Zap,
  Mail,
  MessageSquare,
  ShieldCheck,
  Clock,
  Star,
  Lock,
  Key,
  ShieldAlert,
  ChevronRight,
  LayoutGrid
} from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "wouter";
import { toast } from "sonner";

const sidebarItems = [
  { id: "compras", label: "MINHAS AQUISIÇÕES", icon: ShoppingCart },
  { id: "arquivos", label: "BIBLIOTECA TÉCNICA", icon: Download },
  { id: "demandas", label: "MEUS LANCES", icon: Zap },
  { id: "perfil", label: "DADOS E SEGURANÇA", icon: User },
  { id: "suporte", label: "SUPORTE DIRETO", icon: MessageSquare },
];

export default function PainelCliente() {
  const { user, isAuthenticated, logout, loading } = useAuth();
  const [activeTab, setActiveTab] = useState("compras");
  const [supportForm, setSupportForm] = useState({ subject: "", message: "" });
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      window.location.href = getLoginUrl();
    }
  }, [loading, isAuthenticated]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-background"><div className="w-12 h-12 rounded-2xl border-4 border-primary border-t-transparent animate-spin" /></div>;
  }

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Sidebar Imersiva */}
      <aside className="w-full md:w-80 flex-shrink-0 bg-[oklch(0.08_0.04_255)] text-white flex flex-col min-h-screen border-r border-white/5">
        <div className="p-10 border-b border-white/5">
          <Link href="/"><Logo size="sm" light /></Link>
        </div>
        
        <div className="p-8 border-b border-white/5 bg-white/5">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl brand-gradient flex items-center justify-center text-white text-xl font-black shadow-2xl">
              {user?.name?.charAt(0)?.toUpperCase() ?? "C"}
            </div>
            <div className="min-w-0">
              <p className="text-base font-black text-white truncate uppercase tracking-tight">{user?.name}</p>
              <div className="flex items-center gap-2 mt-1">
                 <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                 <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Conexão Auditada</span>
              </div>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-6 flex flex-col gap-3 overflow-y-auto">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "flex items-center gap-4 px-6 py-4 rounded-2xl text-[10px] font-black transition-all text-left group uppercase tracking-[0.2em]",
                activeTab === item.id 
                  ? "bg-primary text-white shadow-2xl shadow-primary/40 scale-[1.02]" 
                  : "text-white/40 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon size={18} className={cn(activeTab === item.id ? "text-white" : "text-white/20 group-hover:text-white")} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-8 border-t border-white/5 flex flex-col gap-3">
          <Link href="/" className="flex items-center gap-4 px-6 py-4 rounded-2xl text-[10px] font-black text-white/40 hover:text-white hover:bg-white/5 transition-all uppercase tracking-[0.2em]">
            <Home size={18} /> Ver Vitrine
          </Link>
          <button onClick={() => logout()} className="flex items-center gap-4 px-6 py-4 rounded-2xl text-[10px] font-black text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-all uppercase tracking-[0.2em]">
            <LogOut size={18} /> Sair da Conta
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-muted/20 p-6 md:p-12 lg:p-20">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="space-y-2">
              <Badge variant="outline" className="rounded-full px-4 py-1 border-primary/20 text-primary font-black uppercase tracking-[0.3em] text-[9px]">Dashboard Cliente</Badge>
              <h1 className="text-5xl font-black text-foreground tracking-tighter leading-none">
                {sidebarItems.find((i) => i.id === activeTab)?.label}
              </h1>
            </div>
            <div className="flex items-center gap-4">
               <div className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-background border border-border/60 shadow-xl">
                  <ShieldCheck size={20} className="text-primary" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">ID: {user?.id}</span>
               </div>
            </div>
          </div>

          {activeTab === "compras" && (
            <div className="space-y-12">
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    { label: "Projetos Adquiridos", value: "02", icon: ShoppingCart, color: "text-cyan-500" },
                    { label: "Total Investido", value: "R$ 4.000", icon: Zap, color: "text-amber-500" },
                    { label: "Garantia Ativa", value: "PRODIN", icon: ShieldCheck, color: "text-emerald-500" },
                  ].map(i => (
                    <Card key={i.label} className="p-10 border-border/60 shadow-2xl rounded-[3rem] bg-background border-2 group hover:border-primary/40 transition-all">
                       <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform", i.color.replace('text', 'bg') + '/10')}>
                          <i.icon size={28} className={i.color} />
                       </div>
                       <p className="text-5xl font-black text-foreground tracking-tighter leading-none">{i.value}</p>
                       <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] mt-3">{i.label}</p>
                    </Card>
                  ))}
               </div>

               <div className="space-y-8">
                  <div className="flex items-center justify-between">
                     <h3 className="text-2xl font-black flex items-center gap-3 tracking-tight">
                        <Clock size={24} className="text-primary" /> Histórico de Aquisições
                     </h3>
                  </div>
                  <Card className="p-24 border-border/60 text-center bg-muted/5 border-dashed border-2 rounded-[4rem]">
                     <div className="w-24 h-24 rounded-[2.5rem] bg-muted flex items-center justify-center mx-auto mb-8 text-muted-foreground/20">
                        <Package size={48} />
                     </div>
                     <p className="text-2xl font-black text-muted-foreground tracking-tight">Nenhuma aquisição finalizada.</p>
                     <p className="text-muted-foreground font-medium mt-2">Explore nossa vitrine técnica para encontrar o projeto ideal.</p>
                     <Button className="mt-10 h-16 px-10 rounded-2xl brand-gradient text-white border-0 font-black text-lg shadow-2xl hover:scale-105 transition-transform" asChild>
                        <Link href="/projetos">EXPLORAR VITRINE <ChevronRight className="ml-2" /></Link>
                     </Button>
                  </Card>
               </div>
            </div>
          )}

          {activeTab === "perfil" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
               <div className="lg:col-span-7 space-y-12">
                  <Card className="p-12 border-border/60 shadow-2xl rounded-[3rem] bg-background border-2">
                     <h3 className="text-3xl font-black mb-10 tracking-tight flex items-center gap-4">
                        <User size={28} className="text-primary" /> Dados Cadastrais
                     </h3>
                     <div className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                           <div className="space-y-3">
                              <Label className="text-[10px] font-black uppercase tracking-widest ml-2">Nome Completo</Label>
                              <Input className="h-16 rounded-2xl border-border/60 px-8 font-bold text-lg bg-muted/20" value={user?.name} disabled />
                           </div>
                           <div className="space-y-3">
                              <Label className="text-[10px] font-black uppercase tracking-widest ml-2">E-mail Principal</Label>
                              <Input className="h-16 rounded-2xl border-border/60 px-8 font-bold text-lg bg-muted/20" value={user?.email} disabled />
                           </div>
                        </div>
                        <div className="p-8 rounded-[2rem] bg-amber-500/5 border border-amber-500/20 flex gap-6 items-start">
                           <ShieldAlert size={24} className="text-amber-500 shrink-0 mt-1" />
                           <div className="space-y-1">
                              <p className="text-sm font-black text-amber-900 uppercase tracking-tight">Alteração de Dados</p>
                              <p className="text-sm text-amber-800/70 font-medium leading-relaxed">Para alterar seu e-mail ou nome, entre em contato com a auditoria técnica via protocolo de suporte.</p>
                           </div>
                        </div>
                     </div>
                  </Card>
               </div>

               <div className="lg:col-span-5 space-y-12">
                  <Card className="p-12 border-border/60 shadow-2xl rounded-[3rem] bg-background border-2 overflow-hidden relative">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16" />
                     <h3 className="text-3xl font-black mb-10 tracking-tight flex items-center gap-4">
                        <Lock size={28} className="text-primary" /> Segurança 2FA
                     </h3>
                     <div className="space-y-8 relative z-10">
                        <div className="flex items-center justify-between p-8 rounded-[2rem] bg-muted/30 border border-border/60">
                           <div className="flex items-center gap-5">
                              <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg", is2FAEnabled ? "bg-green-500 text-white" : "bg-muted text-muted-foreground")}>
                                 <Key size={24} />
                              </div>
                              <div>
                                 <p className="text-lg font-black tracking-tight">{is2FAEnabled ? "Ativo" : "Inativo"}</p>
                                 <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Segundo Fator</p>
                              </div>
                           </div>
                           <Button 
                              variant={is2FAEnabled ? "outline" : "default"}
                              className={cn("h-12 rounded-xl font-black text-[10px] uppercase tracking-widest px-6", is2FAEnabled ? "border-2" : "brand-gradient text-white border-0")}
                              onClick={() => {
                                 setIs2FAEnabled(!is2FAEnabled);
                                 toast.success(is2FAEnabled ? "2FA desativado com sucesso." : "Iniciando configuração de 2FA...");
                              }}
                           >
                              {is2FAEnabled ? "DESATIVAR" : "CONFIGURAR"}
                           </Button>
                        </div>
                        <p className="text-sm text-muted-foreground font-medium leading-relaxed px-2">
                           A autenticação de dois fatores adiciona uma camada extra de proteção à sua biblioteca técnica e dados financeiros.
                        </p>
                     </div>
                  </Card>

                  <Card className="p-10 border-border/60 bg-muted/5 rounded-[2.5rem] border-2">
                     <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                           <LayoutGrid size={24} />
                        </div>
                        <h4 className="text-xl font-black tracking-tight leading-none">Acesso Auditado</h4>
                     </div>
                     <p className="text-xs text-muted-foreground font-medium leading-relaxed">
                        Seu acesso é monitorado pelo protocolo PRODIN. Cada login gera um log de auditoria imutável para sua segurança.
                     </p>
                  </Card>
               </div>
            </div>
          )}

          {activeTab === "suporte" && (
            <div className="max-w-4xl mx-auto">
               <Card className="p-16 border-border/60 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.2)] rounded-[4rem] bg-background border-2 overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full -mr-24 -mt-24" />
                  
                  <div className="flex flex-col md:flex-row md:items-center gap-8 mb-16 relative">
                    <div className="w-24 h-24 rounded-[2.5rem] brand-gradient flex items-center justify-center text-white shadow-2xl shrink-0">
                      <Mail size={40} />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-4xl font-black tracking-tighter leading-none">Suporte Especializado</h3>
                      <p className="text-xl font-medium text-muted-foreground">Atendimento centralizado via <span className="text-primary font-black">conectaprojetos3@gmail.com</span></p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-10">
                    <div className="space-y-3">
                      <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground ml-2">Assunto do Atendimento</Label>
                      <Input 
                        className="h-20 rounded-2xl border-border/60 px-10 font-bold text-xl bg-muted/20"
                        placeholder="Ex: Dúvida técnica sobre aquisição..." 
                        value={supportForm.subject}
                        onChange={(e) => setSupportForm({...supportForm, subject: e.target.value})}
                      />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground ml-2">Descrição da Solicitação</Label>
                      <Textarea 
                        className="rounded-[2rem] border-border/60 p-10 font-medium text-lg min-h-[250px] bg-muted/20"
                        placeholder="Descreva detalhadamente como nossa equipe técnica pode te auxiliar hoje..." 
                        value={supportForm.message}
                        onChange={(e) => setSupportForm({...supportForm, message: e.target.value})}
                      />
                    </div>
                    <Button 
                      className="w-full h-20 brand-gradient text-white border-0 font-black text-2xl rounded-[2rem] shadow-2xl hover:scale-[1.02] transition-transform"
                      onClick={() => {
                        if(!supportForm.subject || !supportForm.message) return toast.error("Por favor, preencha todos os campos.");
                        toast.success("Protocolo de atendimento enviado com sucesso!");
                        setSupportForm({ subject: "", message: "" });
                      }}
                    >
                      ABRIR CHAMADO AUDITADO
                    </Button>
                  </div>
               </Card>
            </div>
          )}

          {["arquivos", "demandas"].includes(activeTab) && (
            <Card className="p-32 text-center border-dashed border-4 border-border/40 rounded-[5rem] bg-muted/5">
              <div className="w-24 h-24 rounded-[2.5rem] bg-primary/10 flex items-center justify-center mx-auto mb-10 text-primary animate-pulse">
                 <Zap size={48} />
              </div>
              <h3 className="text-4xl font-black text-foreground mb-4 tracking-tighter">Sincronizando Biblioteca</h3>
              <p className="text-xl text-muted-foreground font-medium max-w-xl mx-auto leading-relaxed">
                Estamos integrando seu perfil ao novo motor de banco de dados PostgreSQL para liberar o acesso seguro aos seus arquivos técnicos.
              </p>
              <Button variant="outline" className="mt-12 h-16 px-12 rounded-2xl font-black text-[10px] uppercase tracking-widest border-2 border-primary/20 text-primary hover:bg-primary/5 transition-all" onClick={() => setActiveTab("compras")}>
                VOLTAR AO INÍCIO
              </Button>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
