import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getLoginUrl } from "@/const";
import { cn } from "@/lib/utils";
import { Check, Crown, X, Zap } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const plans = [
  {
    id: "free",
    name: "Gratuito",
    price: 0,
    period: "",
    description: "Para quem está começando a vender projetos na plataforma.",
    badge: null,
    cta: "Começar Grátis",
    highlight: false,
    features: [
      { label: "Publicação de projetos", included: true },
      { label: "Comissão de 10% por venda", included: true },
      { label: "Acesso à vitrine pública", included: true },
      { label: "Suporte por e-mail", included: true },
      { label: "Destaque na vitrine", included: false },
      { label: "Comissão reduzida (5%)", included: false },
      { label: "Selo Premium verificado", included: false },
      { label: "Anúncios desativados", included: false },
      { label: "Relatórios avançados", included: false },
      { label: "Suporte prioritário", included: false },
    ],
  },
  {
    id: "premium_intro",
    name: "Premium",
    price: 50,
    period: "/ mês (nos 3 primeiros meses)",
    description: "Comece com desconto e aproveite todos os benefícios Premium.",
    badge: "Mais Popular",
    cta: "Assinar Premium",
    highlight: true,
    features: [
      { label: "Publicação de projetos", included: true },
      { label: "Comissão de apenas 5% por venda", included: true },
      { label: "Acesso à vitrine pública", included: true },
      { label: "Suporte prioritário 24/7", included: true },
      { label: "Destaque na vitrine", included: true },
      { label: "Comissão reduzida (5%)", included: true },
      { label: "Selo Premium verificado", included: true },
      { label: "Anúncios desativados", included: true },
      { label: "Relatórios avançados", included: true },
      { label: "Programa de indicação (7,5% desconto)", included: true },
    ],
  },
  {
    id: "premium_full",
    name: "Premium Anual",
    price: 280,
    period: "/ mês (após período introdutório)",
    description: "Plano completo para profissionais que vendem regularmente.",
    badge: null,
    cta: "Assinar Anual",
    highlight: false,
    features: [
      { label: "Tudo do Premium", included: true },
      { label: "Comissão de apenas 5% por venda", included: true },
      { label: "Destaque na vitrine", included: true },
      { label: "Selo Premium verificado", included: true },
      { label: "Anúncios desativados", included: true },
      { label: "Relatórios avançados", included: true },
      { label: "Suporte prioritário 24/7", included: true },
      { label: "Programa de indicação (7,5%)", included: true },
      { label: "Acesso antecipado a novos recursos", included: true },
      { label: "Consultoria mensal de precificação", included: true },
    ],
  },
];

export default function Planos() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        {/* Hero */}
        <div className="brand-gradient py-16 text-center">
          <div className="container">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-white/80 text-sm mb-6">
              <Crown size={14} className="text-[oklch(0.78_0.16_75)]" />
              Planos e Assinaturas
            </div>
            <h1 className="text-4xl font-black text-white mb-4">
              Escolha o plano ideal para você
            </h1>
            <p className="text-white/70 text-lg max-w-xl mx-auto">
              Venda mais, pague menos comissão e destaque seus projetos na maior plataforma de projetos de engenharia e arquitetura do Brasil.
            </p>
          </div>
        </div>

        {/* Plans */}
        <div className="container py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className={cn(
                  "p-6 flex flex-col relative transition-all",
                  plan.highlight
                    ? "border-2 border-[oklch(0.45_0.22_255)] shadow-xl shadow-[oklch(0.45_0.22_255)]/10 scale-105"
                    : "border border-border"
                )}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="premium-badge text-xs px-3 py-1">{plan.badge}</span>
                  </div>
                )}

                <div className="mb-5">
                  <div className="flex items-center gap-2 mb-2">
                    {plan.highlight && <Crown size={16} className="text-[oklch(0.78_0.16_75)]" />}
                    <h3 className="font-black text-xl text-foreground">{plan.name}</h3>
                  </div>
                  <div className="flex items-end gap-1 mb-1">
                    <span className="text-4xl font-black text-foreground">
                      {plan.price === 0 ? "Grátis" : `R$ ${plan.price}`}
                    </span>
                    {plan.period && <span className="text-sm text-muted-foreground mb-1">{plan.period}</span>}
                  </div>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </div>

                <Separator className="mb-5" />

                <ul className="flex flex-col gap-2.5 flex-1 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature.label} className="flex items-start gap-2.5 text-sm">
                      {feature.included ? (
                        <Check size={15} className="text-[oklch(0.65_0.18_145)] flex-shrink-0 mt-0.5" />
                      ) : (
                        <X size={15} className="text-muted-foreground/40 flex-shrink-0 mt-0.5" />
                      )}
                      <span className={cn(feature.included ? "text-foreground/80" : "text-muted-foreground/50 line-through")}>
                        {feature.label}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={cn(
                    "w-full font-bold",
                    plan.highlight
                      ? "brand-gradient text-white border-0 hover:opacity-90"
                      : "variant-outline"
                  )}
                  variant={plan.highlight ? "default" : "outline"}
                  onClick={() => {
                    if (plan.price === 0) {
                      window.location.href = getLoginUrl();
                    } else {
                      toast.info("Redirecionando para o checkout de assinatura...");
                    }
                  }}
                >
                  {plan.cta}
                </Button>
              </Card>
            ))}
          </div>

          {/* Referral program */}
          <div className="mt-16 max-w-2xl mx-auto text-center">
            <div className="bg-muted/30 border border-border rounded-2xl p-8">
              <div className="w-12 h-12 rounded-full brand-gradient flex items-center justify-center mx-auto mb-4">
                <Zap size={20} className="text-white" />
              </div>
              <h3 className="text-xl font-black text-foreground mb-2">Programa de Indicação</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Indique amigos e profissionais para a plataforma e ganhe <strong>7,5% de desconto</strong> na sua próxima assinatura Premium para cada indicação que se cadastrar e realizar uma venda.
              </p>
              <Button variant="outline" className="gap-2">
                <Zap size={14} /> Gerar Link de Indicação
              </Button>
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-16 max-w-2xl mx-auto">
            <h2 className="text-2xl font-black text-foreground text-center mb-8">Perguntas Frequentes</h2>
            <div className="flex flex-col gap-4">
              {[
                { q: "Quando serei cobrado?", a: "A cobrança é feita mensalmente no cartão de crédito cadastrado. A primeira cobrança ocorre no momento da assinatura." },
                { q: "Posso cancelar a qualquer momento?", a: "Sim, você pode cancelar sua assinatura a qualquer momento. O acesso Premium permanece ativo até o final do período pago." },
                { q: "Como funciona a comissão?", a: "No plano gratuito, a plataforma retém 10% do valor de cada venda. No plano Premium, essa taxa é de apenas 5%. A comissão é descontada automaticamente antes do repasse." },
                { q: "Qual é o prazo de retenção de segurança?", a: "Após cada venda, o valor fica retido por 15 dias antes de ser liberado para saque. Isso protege tanto compradores quanto profissionais." },
                { q: "O que acontece com os anúncios no Premium?", a: "Assinantes Premium têm todos os anúncios do Google AdSense completamente desativados em toda a plataforma, proporcionando uma experiência limpa e sem interrupções." },
              ].map((faq) => (
                <div key={faq.q} className="border border-border rounded-xl p-4">
                  <p className="font-semibold text-foreground mb-2">{faq.q}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
