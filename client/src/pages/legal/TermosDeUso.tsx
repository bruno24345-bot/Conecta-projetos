import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { FileText } from "lucide-react";

export default function TermosDeUso() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        <div className="brand-gradient py-12">
          <div className="container">
            <div className="flex items-center gap-3">
              <FileText size={28} className="text-white" />
              <div>
                <h1 className="text-3xl font-black text-white">Termos de Uso</h1>
                <p className="text-white/70 text-sm mt-1">Regras e condições para uso da plataforma Conecta Projetos</p>
              </div>
            </div>
          </div>
        </div>
        <div className="container py-12 max-w-3xl">
          <div className="prose prose-sm max-w-none text-foreground/80 leading-relaxed">
            <p className="text-xs text-muted-foreground mb-8">Última atualização: 22 de maio de 2026</p>

            <h2 className="text-xl font-bold text-foreground mt-8 mb-3">1. Aceitação dos Termos</h2>
            <p>Ao acessar ou usar a plataforma Conecta Projetos, você concorda com estes Termos de Uso. Se não concordar, não utilize a plataforma.</p>

            <h2 className="text-xl font-bold text-foreground mt-8 mb-3">2. Cadastro e Responsabilidades</h2>
            <p>Para utilizar a plataforma, você deve fornecer informações verdadeiras e mantê-las atualizadas. Profissionais devem possuir registro válido no CREA ou CAU e são responsáveis pela veracidade das informações fornecidas.</p>

            <h2 className="text-xl font-bold text-foreground mt-8 mb-3">3. Comissões e Pagamentos</h2>
            <p>A plataforma cobra comissão sobre cada venda realizada:</p>
            <ul className="list-disc pl-5 flex flex-col gap-1 mt-2">
              <li><strong>Plano Gratuito:</strong> 10% sobre o valor de cada transação;</li>
              <li><strong>Plano Premium:</strong> 5% sobre o valor de cada transação.</li>
            </ul>
            <p className="mt-2">Os valores são retidos por <strong>15 dias</strong> após a confirmação do pagamento antes de serem liberados para saque (retenção de segurança). Em caso de falha no pagamento, serão realizadas até <strong>3 tentativas</strong> de cobrança automática.</p>

            <h2 className="text-xl font-bold text-foreground mt-8 mb-3">4. Direitos Autorais dos Projetos</h2>
            <p>Os projetos publicados na plataforma são de propriedade intelectual exclusiva de seus autores. A compra de um projeto concede ao comprador licença de uso pessoal e intransferível. É expressamente proibido:</p>
            <ul className="list-disc pl-5 flex flex-col gap-1 mt-2">
              <li>Revender, redistribuir ou sublicenciar os projetos adquiridos;</li>
              <li>Utilizar os projetos para fins comerciais além do uso pessoal;</li>
              <li>Remover marcas d'água ou informações de autoria;</li>
              <li>Reproduzir parcial ou integralmente sem autorização do autor.</li>
            </ul>

            <h2 className="text-xl font-bold text-foreground mt-8 mb-3">5. Plano Premium e Assinaturas</h2>
            <p>O Plano Premium é cobrado mensalmente. A estrutura de preços é:</p>
            <ul className="list-disc pl-5 flex flex-col gap-1 mt-2">
              <li>R$ 50/mês nos primeiros 3 meses (período introdutório);</li>
              <li>R$ 280/mês a partir do 4º mês.</li>
            </ul>
            <p className="mt-2">O cancelamento pode ser feito a qualquer momento, com acesso mantido até o final do período pago.</p>

            <h2 className="text-xl font-bold text-foreground mt-8 mb-3">6. Programa de Indicação</h2>
            <p>O programa de indicação concede desconto de <strong>7,5%</strong> na assinatura Premium para cada indicação válida (cadastro + primeira venda realizada). Os descontos são cumulativos até o limite de 50% do valor da assinatura.</p>

            <h2 className="text-xl font-bold text-foreground mt-8 mb-3">7. Mediação de Disputas</h2>
            <p>Em caso de conflito entre comprador e profissional, a Conecta Projetos atuará como mediadora. A plataforma pode reter os valores envolvidos durante o processo de mediação e tomar decisões vinculantes sobre o repasse ou estorno.</p>

            <h2 className="text-xl font-bold text-foreground mt-8 mb-3">8. Limitação de Responsabilidade</h2>
            <p>A Conecta Projetos não se responsabiliza pela qualidade técnica dos projetos, adequação às normas locais de construção ou aprovação em órgãos públicos. A responsabilidade técnica é exclusiva do profissional autor do projeto.</p>

            <h2 className="text-xl font-bold text-foreground mt-8 mb-3">9. Contato</h2>
            <p>Para dúvidas sobre estes termos, entre em contato: <a href="mailto:conectaprojetos3@gmail.com" className="text-primary">conectaprojetos3@gmail.com</a>.</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
