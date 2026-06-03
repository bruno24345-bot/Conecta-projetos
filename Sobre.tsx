import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Building2, Mail, MapPin, ShieldCheck, Trophy, Users, Zap, Star, CheckCircle2, LayoutGrid, Heart } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

export default function Sobre() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        {/* Header Imersivo */}
        <div className="brand-gradient py-32 relative overflow-hidden">
           <div className="absolute inset-0 opacity-10 pointer-events-none">
              <LayoutGrid size={500} className="absolute -right-20 -bottom-20 text-white" />
           </div>
          <div className="container relative z-10 text-center max-w-4xl mx-auto space-y-8">
            <Badge className="bg-white/10 text-white border-white/20 px-6 py-2 rounded-full backdrop-blur-md gap-3 font-black uppercase tracking-[0.3em] text-[10px]">
               <Star size={14} className="text-cyan-300 fill-cyan-300" /> Manifesto de Conformidade PRODIN
            </Badge>
            <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none">A Nova Era da <span className="text-cyan-400">Engenharia.</span></h1>
            <p className="text-white/80 text-2xl font-medium leading-relaxed">
              Aproximando talentos auditados a clientes visionários através de um ecossistema seguro, escalável e regido pelo rigor técnico.
            </p>
          </div>
        </div>

        <div className="container py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-32">
            <div className="space-y-10">
              <div className="flex items-center gap-3 text-primary font-black uppercase tracking-[0.3em] text-[10px]">
                 <Zap size={18} fill="currentColor" /> Nossa Gênese Técnica
              </div>
              <h2 className="text-5xl md:text-6xl font-black text-foreground leading-[0.9] tracking-tighter">Democratizando o <br/><span className="text-primary">Acesso ao Saber.</span></h2>
              <p className="text-muted-foreground text-xl leading-relaxed font-medium">
                A Conecta Projetos nasceu para resolver um gap histórico: a dificuldade de encontrar ativos técnicos de alta performance com segurança jurídica, rigor normativo e transparência financeira.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 {[
                    "Auditoria manual CREA/CAU",
                    "Conformidade estrita ABNT",
                    "Bidding Engine Inteligente",
                    "Protocolo PRODIN de Segurança"
                 ].map((item) => (
                    <div key={item} className="flex items-center gap-4 font-black text-foreground/80 text-xs uppercase tracking-widest bg-muted/30 p-4 rounded-2xl border border-border/40">
                       <CheckCircle2 size={18} className="text-primary shrink-0" />
                       {item}
                    </div>
                 ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8">
              {[
                { value: "R$ 4M+", label: "Transacionados", icon: Zap, color: "text-cyan-500" },
                { value: "850+", label: "Especialistas", icon: ShieldCheck, color: "text-emerald-500" },
                { value: "12k+", label: "Ativos Técnicos", icon: Trophy, color: "text-amber-500" },
                { value: "99%", label: "Satisfação", icon: Users, color: "text-violet-500" },
              ].map((stat) => (
                <Card key={stat.label} className="p-10 text-center border-border/60 shadow-2xl hover:border-primary/40 transition-all group rounded-[3rem] bg-background border-2">
                  <div className={cn("w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg", stat.color.replace('text', 'bg') + '/10')}>
                     <stat.icon size={32} className={stat.color} />
                  </div>
                  <p className="text-4xl font-black text-foreground mb-2 tracking-tighter leading-none">{stat.value}</p>
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">{stat.label}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Pilares PRODIN */}
          <div className="mb-40">
            <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
               <Badge variant="outline" className="rounded-full px-6 py-2 border-primary/20 text-primary font-black uppercase tracking-[0.3em] text-[10px]">Eixos de Atuação</Badge>
               <h2 className="text-5xl font-black text-foreground tracking-tighter leading-none">Matriz de Rigor PRODIN</h2>
               <p className="text-muted-foreground font-medium text-xl leading-relaxed">Os pilares que sustentam a maior infraestrutura de ativos técnicos do Brasil.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { icon: ShieldCheck, title: "Segurança de Ativos", desc: "Split de pagamento via Pagar.me com retenção estratégica para garantia absoluta do comprador." },
                { icon: Building2, title: "Curadoria Técnica", desc: "Processo de verificação humana e documental para cada projeto e profissional cadastrado." },
                { icon: Mail, title: "Suporte Direto", desc: "Atendimento centralizado e humanizado através do canal oficial de auditoria técnica." },
              ].map((value) => (
                <Card key={value.title} className="p-12 text-center border-border/60 shadow-2xl bg-muted/5 rounded-[4rem] hover:bg-background transition-all group border-2">
                  <div className="w-24 h-24 rounded-[2.5rem] brand-gradient flex items-center justify-center mx-auto mb-10 shadow-2xl group-hover:scale-110 transition-transform">
                    <value.icon size={44} className="text-white" />
                  </div>
                  <h3 className="text-3xl font-black text-foreground mb-6 tracking-tight leading-none">{value.title}</h3>
                  <p className="text-muted-foreground font-medium leading-relaxed text-lg">{value.desc}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
            <div className="lg:col-span-5 space-y-12">
              <div className="space-y-4">
                 <h2 className="text-5xl font-black text-foreground tracking-tighter leading-none">Canais de <br/><span className="text-primary">Atendimento.</span></h2>
                 <p className="text-xl text-muted-foreground font-medium leading-relaxed">Nossa diretoria técnica está pronta para mediar protocolos e fornecer suporte especializado.</p>
              </div>
              <div className="space-y-8">
                <div className="flex items-center gap-8 p-10 rounded-[3rem] bg-muted/30 border border-border/60 hover:bg-background transition-all shadow-xl group">
                  <div className="w-20 h-20 rounded-[2rem] brand-gradient flex items-center justify-center text-white shadow-2xl shrink-0 group-hover:scale-110 transition-transform">
                    <Mail size={36} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] mb-2">Protocolo de Auditoria</p>
                    <a href="mailto:conectaprojetos3@gmail.com" className="text-2xl font-black text-primary hover:underline tracking-tight">
                      conectaprojetos3@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-8 p-10 rounded-[3rem] bg-muted/30 border border-border/60 hover:bg-background transition-all shadow-xl group">
                  <div className="w-20 h-20 rounded-[2rem] brand-gradient flex items-center justify-center text-white shadow-2xl shrink-0 group-hover:scale-110 transition-transform">
                    <MapPin size={36} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] mb-2">Base Administrativa</p>
                    <p className="text-2xl font-black text-foreground tracking-tight">São Paulo, SP · Brasil</p>
                  </div>
                </div>
              </div>
            </div>
            
            <Card className="lg:col-span-7 p-16 border-border/60 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.2)] rounded-[4rem] bg-background border-2">
              <div className="flex items-center gap-4 mb-10">
                 <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                    <Heart size={24} fill="currentColor" />
                 </div>
                 <h3 className="text-4xl font-black text-foreground tracking-tight leading-none">Fale Conosco</h3>
              </div>
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] ml-2 text-muted-foreground">Nome Completo</Label>
                    <Input className="h-16 rounded-2xl border-border/60 font-bold px-8 text-lg bg-muted/20" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Ex: Arq. João Silva" />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] ml-2 text-muted-foreground">E-mail Corporativo</Label>
                    <Input className="h-16 rounded-2xl border-border/60 font-bold px-8 text-lg bg-muted/20" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="seu@email.com" />
                  </div>
                </div>
                <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase tracking-[0.2em] ml-2 text-muted-foreground">Sua Mensagem Técnica</Label>
                  <Textarea className="rounded-2xl border-border/60 font-bold p-8 min-h-[180px] text-lg bg-muted/20" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Como nossa diretoria pode auxiliar seu projeto hoje?" />
                </div>
                <Button
                  size="lg"
                  className="w-full h-20 brand-gradient text-white border-0 font-black text-xl rounded-[2rem] shadow-2xl hover:scale-[1.02] transition-transform"
                  onClick={() => { 
                    if (form.name.length < 3 || form.message.length < 10) {
                       toast.error("Por favor, preencha os campos corretamente.");
                       return;
                    }
                    toast.success("Protocolo de atendimento gerado com sucesso!"); 
                    setForm({ name: "", email: "", message: "" }); 
                  }}
                >
                  ENVIAR PROTOCOLO AUDITADO
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
