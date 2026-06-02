import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { FileText, ShieldCheck, LayoutGrid, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function TermosDeUso() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        {/* Header Imersivo */}
        <div className="brand-gradient py-24 relative overflow-hidden">
           <div className="absolute inset-0 opacity-10 pointer-events-none">
              <LayoutGrid size={400} className="absolute -right-20 -bottom-20 text-white" />
           </div>
          <div className="container relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-20 h-20 rounded-[2rem] bg-white/10 border border-white/20 flex items-center justify-center shadow-2xl backdrop-blur-md">
                 <FileText size={40} className="text-white" />
              </div>
              <div className="text-center md:text-left">
                <Badge className="mb-3 bg-white/10 text-white border-white/20 px-4 py-1 rounded-full backdrop-blur-md font-black uppercase tracking-widest text-[10px]">
                   Versão 2.0 · Auditada
                </Badge>
                <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter leading-none">Termos de Uso</h1>
                <p className="text-white/70 text-lg font-medium mt-2 uppercase tracking-[0.2em]">Matriz de Conformidade PRODIN · 2026</p>
              </div>
            </div>
          </div>
        </div>

        <div className="container py-24 max-w-5xl mx-auto">
          <div className="prose prose-lg max-w-none text-foreground/80 leading-relaxed font-medium">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-16 p-8 rounded-[2rem] bg-muted/30 border border-border/60 gap-4">
               <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">Protocolo de Auditoria Global: #PRODIN-2026-AF</p>
               <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">Última Atualização: 25 de Maio de 2026</p>
            </div>

            <section className="space-y-6 mb-16">
              <h2 className="text-3xl font-black text-foreground tracking-tight flex items-center gap-4">
                 <div className="w-2 h-8 brand-gradient rounded-full" /> 1. Ecossistema Conecta Projetos
              </h2>
              <p className="text-lg">A Conecta Projetos opera sob a matriz <strong>PRODIN (Processamento de Dados e Inteligência de Negócios)</strong>, garantindo um ambiente seguro para a transação de ativos técnicos de engenharia e arquitetura. Ao utilizar nossa plataforma, você aceita integralmente estas diretrizes de segurança e conformidade.</p>
            </section>

            <section className="space-y-6 mb-16">
              <h2 className="text-3xl font-black text-foreground tracking-tight flex items-center gap-4">
                 <div className="w-2 h-8 brand-gradient rounded-full" /> 2. Verificação de Registros (CREA/CAU)
              </h2>
              <p className="text-lg">Apenas profissionais com registro ativo e regular junto ao <strong>CREA</strong> (Conselho Regional de Engenharia e Agronomia) ou <strong>CAU</strong> (Conselho de Arquitetura e Urbanismo) podem publicar projetos. A plataforma realiza auditoria manual e constante destes registros, podendo suspender perfis que apresentem irregularidades.</p>
            </section>

            <section className="space-y-6 mb-16">
              <h2 className="text-3xl font-black text-foreground tracking-tight flex items-center gap-4">
                 <div className="w-2 h-8 brand-gradient rounded-full" /> 3. Matriz Financeira e Split de Pagamentos
              </h2>
              <p className="text-lg">Utilizamos o processador <strong>Pagar.me</strong> para garantir a segurança das transações. As regras de split são imutáveis no momento da transação:</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10">
                 {[
                    { title: "Plano Gratuito", value: "10%", desc: "Retenção administrativa PRODIN" },
                    { title: "Plano Premium", value: "5%", desc: "Retenção reduzida para assinantes" },
                    { title: "Garantia Técnica", value: "15 Dias", desc: "Prazo de retenção de segurança" }
                 ].map((item) => (
                    <div key={item.title} className="p-8 rounded-[2.5rem] bg-muted/20 border border-border/60 text-center space-y-2">
                       <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{item.title}</p>
                       <p className="text-4xl font-black text-primary tracking-tighter">{item.value}</p>
                       <p className="text-[10px] font-bold text-foreground/60 uppercase">{item.desc}</p>
                    </div>
                 ))}
              </div>
            </section>

            <section className="space-y-6 mb-16">
              <h2 className="text-3xl font-black text-foreground tracking-tight flex items-center gap-4">
                 <div className="w-2 h-8 brand-gradient rounded-full" /> 4. Programa de Indicação (7.5% OFF)
              </h2>
              <p className="text-lg">O programa de indicação PRODIN concede um desconto fixo de <strong>7,5%</strong> no valor de projetos ou assinaturas para novos usuários que utilizarem um código de indicação válido. Este benefício é processado automaticamente pelo motor financeiro.</p>
            </section>

            <section className="space-y-6 mb-16">
              <h2 className="text-3xl font-black text-foreground tracking-tight flex items-center gap-4">
                 <div className="w-2 h-8 brand-gradient rounded-full" /> 5. Propriedade Intelectual e Imersão
              </h2>
              <p className="text-lg">O acesso ao <strong>Mecanismo de Imersão 3D</strong> não transfere a propriedade do projeto. A compra definitiva libera os ativos técnicos (DWG, PDF, BIM) para uso específico conforme licença adquirida. É terminantemente vedada a redistribuição ou revenda de qualquer ativo técnico sem autorização expressa do autor auditado.</p>
            </section>

            <section className="space-y-6 mb-16">
              <h2 className="text-3xl font-black text-foreground tracking-tight flex items-center gap-4">
                 <div className="w-2 h-8 brand-gradient rounded-full" /> 6. Suporte e Mediação de Conflitos
              </h2>
              <p className="text-lg">Qualquer divergência técnica ou financeira será mediada pela nossa diretoria de auditoria. O canal oficial para abertura de chamados e protocolos é <strong>conectaprojetos3@gmail.com</strong>. O prazo de resposta padrão é de até 24 horas úteis.</p>
            </section>

            <div className="mt-24 p-12 bg-primary/5 rounded-[3rem] border-2 border-primary/20 flex flex-col md:flex-row items-center gap-10 shadow-2xl">
               <div className="w-24 h-24 rounded-[2rem] brand-gradient flex items-center justify-center text-white shadow-2xl shrink-0">
                  <ShieldCheck size={48} />
               </div>
               <div className="space-y-2 text-center md:text-left">
                  <h3 className="text-3xl font-black text-foreground tracking-tight leading-none">Compromisso com a Verdade Técnica</h3>
                  <p className="text-lg text-muted-foreground font-medium leading-relaxed">
                     Nossa plataforma é auditada em tempo real para garantir que cada prancha técnica e ativo digital siga rigorosamente as normas ABNT vigentes e os padrões de excelência PRODIN.
                  </p>
               </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
