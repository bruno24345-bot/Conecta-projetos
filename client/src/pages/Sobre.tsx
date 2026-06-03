import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Building2, Mail, MapPin, Phone, Users } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

export default function Sobre() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        {/* Hero */}
        <div className="brand-gradient py-16">
          <div className="container text-center">
            <h1 className="text-4xl font-black text-white mb-4">Sobre a Conecta Projetos</h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              A maior plataforma marketplace de projetos de engenharia e arquitetura do Brasil, conectando profissionais verificados a clientes que buscam qualidade e segurança.
            </p>
          </div>
        </div>

        {/* Mission */}
        <div className="container py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-black text-foreground mb-4">Nossa Missão</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                A Conecta Projetos nasceu com o propósito de democratizar o acesso a projetos de qualidade no setor da construção civil, ao mesmo tempo em que valoriza e remunera justamente os profissionais de engenharia e arquitetura.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Acreditamos que um bom projeto é o alicerce de toda construção bem-sucedida. Por isso, todos os profissionais da plataforma passam por verificação rigorosa de CREA/CAU antes de publicar seus trabalhos.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "2.400+", label: "Projetos publicados" },
                { value: "850+", label: "Profissionais verificados" },
                { value: "12.800+", label: "Clientes ativos" },
                { value: "R$ 2,4M+", label: "Em projetos vendidos" },
              ].map((stat) => (
                <Card key={stat.label} className="p-5 text-center">
                  <p className="text-3xl font-black text-foreground mb-1">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Values */}
          <div className="mb-16">
            <h2 className="text-2xl font-black text-foreground text-center mb-8">Nossos Valores</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: Building2, title: "Qualidade Técnica", desc: "Todos os projetos passam por análise antes de serem publicados, garantindo conformidade com normas ABNT." },
                { icon: Users, title: "Confiança e Transparência", desc: "Profissionais verificados, avaliações reais e sistema de mediação para resolver qualquer conflito." },
                { icon: Mail, title: "Suporte Dedicado", desc: "Nossa equipe está disponível para ajudar compradores e profissionais em todas as etapas da transação." },
              ].map((value) => (
                <Card key={value.title} className="p-6 text-center">
                  <div className="w-12 h-12 rounded-2xl brand-gradient flex items-center justify-center mx-auto mb-4">
                    <value.icon size={20} className="text-white" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{value.desc}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-black text-foreground mb-6">Entre em Contato</h2>
              <div className="flex flex-col gap-4 mb-6">
                {[
                  { icon: Mail, label: "E-mail", value: "conectaprojetos3@gmail.com", href: "mailto:conectaprojetos3@gmail.com" },
                  { icon: MapPin, label: "Localização", value: "Brasil — Atendimento 100% digital" },
                ].map((contact) => (
                  <div key={contact.label} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl brand-gradient flex items-center justify-center flex-shrink-0">
                      <contact.icon size={16} className="text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{contact.label}</p>
                      {contact.href ? (
                        <a href={contact.href} className="text-sm font-medium text-primary hover:underline">{contact.value}</a>
                      ) : (
                        <p className="text-sm font-medium text-foreground">{contact.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <Card className="p-6">
              <h3 className="font-bold text-foreground mb-4">Envie uma Mensagem</h3>
              <div className="flex flex-col gap-3">
                <div>
                  <Label className="text-xs font-semibold mb-1 block">Nome</Label>
                  <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Seu nome completo" />
                </div>
                <div>
                  <Label className="text-xs font-semibold mb-1 block">E-mail</Label>
                  <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="seu@email.com" />
                </div>
                <div>
                  <Label className="text-xs font-semibold mb-1 block">Mensagem</Label>
                  <Textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Como podemos ajudar?" rows={4} />
                </div>
                <Button
                  className="brand-gradient text-white border-0 hover:opacity-90"
                  onClick={() => { toast.success("Mensagem enviada! Responderemos em até 24h."); setForm({ name: "", email: "", message: "" }); }}
                >
                  Enviar Mensagem
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
