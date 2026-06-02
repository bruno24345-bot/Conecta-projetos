import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ShieldCheck, Lock, Eye, Trash2, Mail } from "lucide-react";

export default function PrivacidadeLGPD() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="brand-gradient py-20">
          <div className="container">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center">
                 <ShieldCheck size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-black text-white tracking-tight">Privacidade & LGPD</h1>
                <p className="text-white/70 text-sm font-medium mt-1 uppercase tracking-widest">Matriz de Proteção PRODIN · 2026</p>
              </div>
            </div>
          </div>
        </div>

        <div className="container py-16 max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-between mb-12 pb-6 border-b border-border">
             <p className="text-xs font-black text-muted-foreground uppercase tracking-widest">Protocolo de Segurança 2.0</p>
             <p className="text-xs font-black text-muted-foreground uppercase tracking-widest">Atualizado: 23 de Maio de 2026</p>
          </div>

          <div className="space-y-12">
            <section className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="md:col-span-1">
                 <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                    <Lock size={24} />
                 </div>
                 <h2 className="text-lg font-black text-foreground">Segurança Bancária</h2>
              </div>
              <div className="md:col-span-3">
                <p className="text-muted-foreground font-medium leading-relaxed">
                  A <strong>Conecta Projetos</strong> implementa criptografia de ponta a ponta em todas as transações. Dados sensíveis de pagamento são processados exclusivamente pelo gateway Pagar.me, garantindo que informações de cartões nunca toquem nossos servidores.
                </p>
              </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="md:col-span-1">
                 <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                    <Eye size={24} />
                 </div>
                 <h2 className="text-lg font-black text-foreground">Transparência Total</h2>
              </div>
              <div className="md:col-span-3">
                <p className="text-muted-foreground font-medium leading-relaxed mb-4">
                  Coletamos apenas os dados estritamente necessários para a verificação técnica (CREA/CAU) e segurança financeira:
                </p>
                <ul className="list-none space-y-3 p-0 m-0">
                   <li className="flex items-center gap-3 text-sm font-bold text-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" /> Identificação e Contato
                   </li>
                   <li className="flex items-center gap-3 text-sm font-bold text-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" /> Habilitação Profissional Auditada
                   </li>
                   <li className="flex items-center gap-3 text-sm font-bold text-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" /> Logs de Auditoria de Acesso (RBAC)
                   </li>
                </ul>
              </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="md:col-span-1">
                 <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                    <Trash2 size={24} />
                 </div>
                 <h2 className="text-lg font-black text-foreground">Direito ao Esquecimento</h2>
              </div>
              <div className="md:col-span-3">
                <p className="text-muted-foreground font-medium leading-relaxed mb-6">
                  Em conformidade com a LGPD, você pode solicitar a exclusão definitiva de seus dados a qualquer momento. Nossa plataforma garante o anonimato de transações históricas para fins fiscais enquanto remove qualquer vínculo com sua identidade pessoal.
                </p>
                <div className="p-8 bg-muted/30 rounded-3xl border border-border flex flex-col sm:flex-row items-center gap-6">
                   <div className="w-12 h-12 rounded-xl brand-gradient flex items-center justify-center text-white shadow-lg">
                      <Mail size={20} />
                   </div>
                   <div>
                      <p className="text-xs font-black text-muted-foreground uppercase tracking-widest mb-1">Encarregado de Dados (DPO)</p>
                      <a href="mailto:conectaprojetos3@gmail.com" className="text-lg font-black text-primary hover:underline">
                         conectaprojetos3@gmail.com
                      </a>
                   </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
