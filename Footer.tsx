import { Logo } from "./Logo";
import { Link } from "wouter";
import { Mail, Instagram, Linkedin, Youtube, ShieldCheck } from "lucide-react";

const footerLinks = {
  plataforma: [
    { label: "Projetos", href: "/projetos" },
    { label: "Planos e Preços", href: "/planos" },
    { label: "Cursos", href: "/cursos" },
    { label: "Sobre a Plataforma", href: "/sobre" },
  ],
  legal: [
    { label: "Termos de Uso", href: "/termos" },
    { label: "Política de Privacidade", href: "/privacidade" },
    { label: "Conformidade LGPD", href: "/privacidade" },
  ],
  profissional: [
    { label: "Área do Profissional", href: "/painel/profissional" },
    { label: "Verificação CREA/CAU", href: "/painel/profissional" },
    { label: "Vantagens Premium", href: "/planos" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-[oklch(0.08_0.04_255)] text-white/80 border-t border-white/10">
      <div className="container py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          {/* Brand column */}
          <div className="flex flex-col gap-8">
            <Logo size="md" light />
            <p className="text-sm text-white/50 leading-relaxed font-medium">
              O ecossistema técnico líder que conecta engenheiros, arquitetos e designers aos seus projetos ideais com segurança, rigor normativo e tecnologia.
            </p>
            <div className="flex flex-col gap-4">
              <a
                href="mailto:conectaprojetos3@gmail.com"
                className="flex items-center gap-4 text-sm text-white/60 hover:text-primary transition-colors font-black tracking-tight"
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                  <Mail size={18} />
                </div>
                conectaprojetos3@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-4">
              {[
                { icon: Instagram, href: "https://www.instagram.com/bsoliveiraengenharia08" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/bruno-santana-969890353" },
                { icon: Youtube, href: "https://youtube.com/@conectaprojetos002" }
              ].map((social, idx) => (
                <a 
                  key={idx}
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-primary transition-all shadow-xl"
                >
                  <social.icon size={24} />
                </a>
              ))}
            </div>
          </div>

          {/* Links columns */}
          <div>
            <h4 className="text-white font-black text-xs uppercase tracking-[0.2em] mb-8 opacity-50">Plataforma</h4>
            <ul className="flex flex-col gap-4">
              {footerLinks.plataforma.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm font-bold text-white/40 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black text-xs uppercase tracking-[0.2em] mb-8 opacity-50">Para Profissionais</h4>
            <ul className="flex flex-col gap-4">
              {footerLinks.profissional.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm font-bold text-white/40 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black text-xs uppercase tracking-[0.2em] mb-8 opacity-50">Legal e Segurança</h4>
            <ul className="flex flex-col gap-4 mb-10">
              {footerLinks.legal.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm font-bold text-white/40 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="p-6 rounded-[2rem] bg-primary/5 border border-primary/10 shadow-2xl">
               <div className="flex items-center gap-3 text-primary font-black text-xs mb-2 tracking-widest uppercase">
                 <ShieldCheck size={16} /> Site Auditado
               </div>
               <p className="text-[10px] text-white/40 font-bold leading-relaxed uppercase tracking-widest">Protocolo PRODIN Ativo · Conformidade LGPD</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5 bg-black/20">
        <div className="container py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">
            © {new Date().getFullYear()} Conecta Projetos · Acelerando a Construção Civil
          </p>
          <div className="flex items-center gap-8">
             <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">CNPJ: 00.000.000/0001-00</p>
             <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">SÃO PAULO · BRASIL</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
