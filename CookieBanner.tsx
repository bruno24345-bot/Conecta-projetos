import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShieldCheck, X, Settings2, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true,
    performance: false,
    functionality: false,
    marketing: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem("prodin-cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem("prodin-cookie-consent", JSON.stringify({
      essential: true,
      performance: true,
      functionality: true,
      marketing: true,
      timestamp: new Date().toISOString()
    }));
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem("prodin-cookie-consent", JSON.stringify({
      ...preferences,
      timestamp: new Date().toISOString()
    }));
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-8 left-8 right-8 z-[100] animate-in fade-in slide-in-from-bottom-10 duration-700">
      <Card className="max-w-4xl mx-auto p-8 border-primary/20 bg-background/95 backdrop-blur-xl shadow-[0_32px_64px_-12px_rgba(0,0,0,0.2)] rounded-[2.5rem] flex flex-col md:flex-row items-center gap-8 border-2">
        <div className="w-16 h-16 rounded-2xl brand-gradient flex items-center justify-center text-white shadow-xl shrink-0">
          <ShieldCheck size={32} />
        </div>
        
        <div className="flex-1 space-y-2 text-center md:text-left">
          <h4 className="text-xl font-black text-foreground tracking-tight">Privacidade & Cookies PRODIN</h4>
          <p className="text-sm font-medium text-muted-foreground leading-relaxed">
            Utilizamos tecnologias de auditoria para garantir a melhor experiência técnica. Ao continuar, você concorda com nossa <a href="/privacidade" className="text-primary hover:underline font-bold">Política de Privacidade</a> e o rigoroso protocolo de proteção de dados.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="h-14 px-6 rounded-2xl font-black border-border/60 hover:bg-muted text-xs tracking-widest uppercase">
                <Settings2 size={16} className="mr-2" /> Preferências
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] rounded-[2.5rem] p-10">
              <DialogHeader>
                <DialogTitle className="text-3xl font-black tracking-tight">Centro de Preferências</DialogTitle>
                <DialogDescription className="text-base font-medium">
                  Gerencie como seus dados técnicos são processados em nossa infraestrutura auditada.
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-8 py-6">
                <div className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-muted/30 border border-border/40">
                  <div className="space-y-1">
                    <Label className="text-sm font-black uppercase tracking-widest">Cookies Essenciais</Label>
                    <p className="text-xs text-muted-foreground font-medium">Obrigatórios para o funcionamento da plataforma e segurança PRODIN.</p>
                  </div>
                  <Switch checked disabled />
                </div>

                <div className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-muted/30 border border-border/40">
                  <div className="space-y-1">
                    <Label className="text-sm font-black uppercase tracking-widest">Desempenho & Análise</Label>
                    <p className="text-xs text-muted-foreground font-medium">Nos ajudam a entender como você interage com as vitrines técnicas.</p>
                  </div>
                  <Switch 
                    checked={preferences.performance} 
                    onCheckedChange={(v) => setPreferences(p => ({ ...p, performance: v }))} 
                  />
                </div>

                <div className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-muted/30 border border-border/40">
                  <div className="space-y-1">
                    <Label className="text-sm font-black uppercase tracking-widest">Funcionalidade</Label>
                    <p className="text-xs text-muted-foreground font-medium">Permite personalizações avançadas e recursos de imersão 3D.</p>
                  </div>
                  <Switch 
                    checked={preferences.functionality} 
                    onCheckedChange={(v) => setPreferences(p => ({ ...p, functionality: v }))} 
                  />
                </div>
              </div>

              <Button onClick={handleSavePreferences} className="w-full h-14 brand-gradient text-white border-0 font-black rounded-2xl shadow-xl">
                SALVAR CONFIGURAÇÕES
              </Button>
            </DialogContent>
          </Dialog>

          <Button onClick={handleAcceptAll} className="h-14 px-8 brand-gradient text-white border-0 font-black rounded-2xl shadow-xl text-xs tracking-widest uppercase">
            <CheckCircle2 size={16} className="mr-2" /> ACEITAR TODOS
          </Button>
        </div>
      </Card>
    </div>
  );
}
