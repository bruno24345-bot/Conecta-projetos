import { Logo } from "./Logo";
import { Link } from "wouter";
import { Mail, Instagram, Linkedin, Youtube } from "lucide-react";

const footerLinks = {
  plataforma: [
    { label: "Projetos", href: "/projetos" },
    { label: "Profissionais", href: "/profissionais" },
    { label: "Cursos", href: "/cursos" },
    { label: "Demandas Abertas", href: "/demandas" },
    { label: "Planos e Preços", href: "/planos" },
  ],
  empresa: [
    { label: "Quem Somos", href: "/quem-somos" },
    { label: "Fale Conosco", href: "/fale-conosco" },
    { label: "Blog", href: "/blog" },
    { label: "Imprensa", href: "/imprensa" },
  ],
  legal: [
    { label: "Termos de Uso", href: "/termos-de-uso" },
    { label: "Política de Privacidade", href: "/politica-de-privacidade" },
    { label: "LGPD", href: "/lgpd" },
    { label: "Cookies", href: "/cookies" },
  ],
  profissional: [
    { label: "Cadastrar como Profissional", href: "/cadastro/profissional" },
    { label: "Como Funciona", href: "/como-funciona" },
    { label: "Plano Premium", href: "/planos" },
    { label: "Central de Ajuda", href: "/ajuda" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-[oklch(0.10_0.04_255)] text-white/80 border-t border-white/10">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-1 flex flex-col gap-4">
            <Logo size="md" light />
            <p className="text-sm text-white/50 leading-relaxed">
              O marketplace que conecta engenheiros, arquitetos e designers de interiores aos clientes finais.
            </p>
            <div className="flex items-center gap-3 mt-2">
              <a
                href="mailto:conectaprojetos3@gmail.com"
                className="flex items-center gap-2 text-xs text-white/50 hover:text-white transition-colors"
              >
                <Mail size={14} />
                conectaprojetos3@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-3">
              <a href="#" className="text-white/40 hover:text-white transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-white/40 hover:text-white transition-colors">
                <Linkedin size={18} />
              </a>
              <a href="#" className="text-white/40 hover:text-white transition-colors">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Links columns */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Plataforma</h4>
            <ul className="flex flex-col gap-2">
              {footerLinks.plataforma.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-white/50 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Para Profissionais</h4>
            <ul className="flex flex-col gap-2">
              {footerLinks.profissional.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-white/50 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Empresa</h4>
            <ul className="flex flex-col gap-2">
              {footerLinks.empresa.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-white/50 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Legal</h4>
            <ul className="flex flex-col gap-2">
              {footerLinks.legal.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-white/50 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} Conecta Projetos. Todos os direitos reservados.
          </p>
          <p className="text-xs text-white/30">
            CNPJ: 00.000.000/0001-00 · São Paulo, SP · Brasil
          </p>
        </div>
      </div>
    </footer>
  );
}
