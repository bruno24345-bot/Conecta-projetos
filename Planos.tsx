import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getLoginUrl } from "@/const";
import { cn } from "@/lib/utils";
import { Check, Crown, X, Zap, Gift, ShieldCheck, Star, LayoutGrid } from "lucide-react";
import { toast } from "sonner";

const plans = [
  {
    id: "free",
    name: "Gratuito",
    price: 0,
    period: "",
    description: "Ideal para profissionais que estão iniciando sua jornada digital no ecossistema.",
    badge: null,
    cta: "COMEÇAR AGORA",
    highlight: false,
    features: [
      { label: "Publicação de projetos ilimitada", included: true },
      { label: "Comissão de 10% por venda (PRODIN)", included: true },
      { label: "Acesso à vitrine pública auditada", included: true },
      { label: "Suporte via e-mail oficial", included: true },
      { label: "Destaque prioritário na vitrine", included: false },
      { label: "Comissão reduzida para 5%", included: false },
      { label: "Selo de Especialista Verificado", included: false },
      { label: "Zero anúncios na plataforma", included: false },
    ],
  },
  {
    id: "premium_intro",
    name: "Premium Mensal",
    price: 50,
    period: "/ mês",
    description: "Valor promocional nos primeiros 3 meses. Após, R$ 280,00/mês.",
    badge: "OFERTA DE LANÇAMENTO",
    cta: "ASSINAR COM DESCONTO",
    highlight: true,
    features: [
      { label: "Tudo do plano Gratuito", included: true },
      { label: "Comissão reduzida para 5% fixo", included: true },
      { label: "Selo de Especialista Verificado", included: true },
      { label: "Destaque prioritário na busca", included: true },
      { label: "Zero anúncios (Navegação AdFree)", included: true },
      { label: "Relatórios avançados de GMV", included: true },
      { label: "Suporte prioritário 24/7", included: true },
      { label: "Programa de Indicação 7,5%", included: true },
    ],
  },
  {
    id: "premium_full",
    name: "Premium Anual",
    price: 2800,
    period: "/ ano",
    description: "Pagamento único anual com economia estratégica de R$ 560,00.",
    badge: "MELHOR CUSTO-BENEFÍCIO",
    cta: "ASSINAR PLANO ANUAL",
    highlight: false,
    features: [
      { label: "Tudo do Premium Mensal", included: true },
      { label: "Economia real de 2 mensalidades", included: true },
      { label: "Suporte VIP via WhatsApp Direto", included: true },
      { label: "Participação em eventos exclusivos", included: true },
      { label: "Acesso antecipado a novas ferramentas", included: true },
      { label: "Consultoria de perfil semestral", included: true },
    ],
  },
];

export default function Planos() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        {/* Header Imersivo */}
        <div className="brand-gradient py-24 relative overflow-hidden">
           <div className="absolute inset-0 opacity-10 pointer-events-none">
              <LayoutGrid size={400} className="absolute -right-20 -bottom-20 text-white" />
           </div>
          <div className="container relative z-10 text-center max-w-4xl mx-auto">
            <Badge className="mb-8 bg-white/10 text-white border-white/20 px-6 py-2 rounded-full backdrop-blur-md gap-3 font-black uppercase tracking-[0.3em] text-[10px]">
               <ShieldCheck size={14} className="text-cyan-300 fill-cyan-300" /> Matriz de Planos Profissionais
            </Badge>
            <h1 className="text-6xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-none">Escala e <span className="text-cyan-400">Rentabilidade.</span></h1>
            <p className="text-white/80 text-2xl font-medium leading-relaxed">
              Venda seus ativos técnicos com a menor taxa do mercado e segurança financeira total via protocolo PRODIN.
            </p>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="container py-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className={cn(
                  "p-12 flex flex-col relative transition-all duration-500 hover:shadow-[0_32px_64px_-12px_rgba(0,0,0,0.2)] rounded-[3rem] border-2",
                  plan.highlight
                    ? "border-primary shadow-2xl scale-105 z-10 bg-background"
                    : "border-border/60 bg-background/50"
                )}
              >
                {plan.badge && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary text-white border-0 px-6 py-2 shadow-2xl font-black text-[10px] tracking-widest uppercase">
                      {plan.badge}
                    </Badge>
                  </div>
                )}

                <div className="mb-10">
                  <h3 className="font-black text-2xl text-foreground mb-6 uppercase tracking-widest">{plan.name}</h3>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-6xl font-black text-foreground tracking-tighter">
                      {plan.price === 0 ? "Grátis" : `R$ ${plan.price.toLocaleString("pt-BR")}`}
                    </span>
                    {plan.period && <span className="text-xl text-muted-foreground font-black">{plan.period}</span>}
                  </div>
                  <p className="text-sm text-muted-foreground font-bold leading-relaxed">{plan.description}</p>
                </div>

                <Separator className="mb-10 opacity-40" />

                <ul className="flex flex-col gap-5 flex-1 mb-12">
                  {plan.features.map((feature) => (
                    <li key={feature.label} className="flex items-start gap-4 text-sm">
                      <div className={cn(
                        "mt-0.5 rounded-full p-1 shadow-sm",
                        feature.included ? "bg-primary/10 text-primary" : "text-muted-foreground/30 bg-muted"
                      )}>
                        {feature.included ? <Check size={16} strokeWidth={4} /> : <X size={16} strokeWidth={4} />}
                      </div>
                      <span className={cn(
                        "font-black uppercase tracking-widest text-[10px]",
                        feature.included ? "text-foreground/80" : "text-muted-foreground/40 line-through"
                      )}>
                        {feature.label}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={cn(
                    "w-full h-16 text-lg font-black rounded-2xl shadow-2xl transition-all hover:scale-[1.05]",
                    plan.highlight
                      ? "brand-gradient text-white border-0"
                      : "bg-muted text-foreground hover:bg-muted/80 border-0"
                  )}
                  onClick={() => {
                    if (plan.price === 0) {
                      window.location.href = getLoginUrl();
                    } else {
                      toast.info("Iniciando checkout seguro PRODIN...");
                    }
                  }}
                >
                  {plan.cta}
                </Button>
              </Card>
            ))}
          </div>

          {/* Referral Section */}
          <div className="mt-32 max-w-5xl mx-auto">
            <Card className="bg-primary/5 border-primary/20 p-12 md:p-16 rounded-[4rem] relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
                 <Gift size={200} className="text-primary rotate-12" />
              </div>
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
                <div className="flex-1 text-center md:text-left space-y-6">
                  <Badge className="bg-primary text-white border-0 px-6 py-2 rounded-full font-black text-[10px] tracking-widest uppercase">Programa de Indicação 2.0</Badge>
                  <h3 className="text-4xl font-black text-foreground tracking-tight">Indique Talentos e Ganhe <span className="text-primary">7,5%</span></h3>
                  <p className="text-muted-foreground text-xl font-medium leading-relaxed">
                    Compartilhe seu link exclusivo. Quando um profissional indicado realizar a primeira venda auditada, você recebe <strong>7,5% de desconto acumulativo</strong> em sua próxima fatura Premium.
                  </p>
                </div>
                <Button 
                  size="lg"
                  className="brand-gradient text-white border-0 h-20 px-12 rounded-[2rem] font-black text-xl shadow-2xl gap-3 hover:scale-110 transition-transform"
                  onClick={() => {
                    toast.success("Protocolo de indicação gerado com sucesso!");
                  }}
                >
                  <Zap size={24} fill="currentColor" /> GERAR MEU LINK
                </Button>
              </div>
            </Card>
          </div>

          {/* FAQ Section */}
          <div className="mt-32 max-w-4xl mx-auto">
            <div className="text-center mb-16">
               <h2 className="text-4xl font-black text-foreground tracking-tight mb-4">Dúvidas Frequentes</h2>
               <p className="text-muted-foreground font-medium text-lg">Tudo o que você precisa saber sobre a monetização no ecossistema.</p>
            </div>
            <div className="grid gap-6">
              {[
                { q: "Como funciona a comissão de venda?", a: "No plano gratuito, retemos 10% para manutenção da infraestrutura auditada. No Premium, essa taxa cai para 5%, maximizando seu lucro líquido." },
                { q: "O que é o Selo de Especialista Verificado?", a: "É um selo de confiança absoluta concedido após a validação humana do seu registro CREA ou CAU pela nossa diretoria técnica." },
                { q: "Como funciona o split de pagamento?", a: "Utilizamos tecnologia Pagar.me para garantir que seu valor seja liquidado diretamente em sua conta, com segurança total e transparência PRODIN." },
                { q: "Posso realizar o upgrade a qualquer momento?", a: "Sim. O upgrade para o Premium pode ser feito instantaneamente para aproveitar as taxas reduzidas e a visibilidade prioritária." }
              ].map((faq) => (
                <Card key={faq.q} className="p-8 border-border/60 hover:border-primary/40 transition-all rounded-[2rem] bg-background/50">
                  <p className="font-black text-foreground mb-3 text-xl tracking-tight">{faq.q}</p>
                  <p className="text-muted-foreground font-medium leading-relaxed">{faq.a}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
