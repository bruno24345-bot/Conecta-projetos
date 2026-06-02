import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";
import { cn } from "@/lib/utils";
import { Bot, ChevronRight, Loader2, Send, Sparkles, Zap, BrainCircuit, Target, ShieldCheck, LayoutGrid } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { toast } from "sonner";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const INITIAL_MESSAGE: Message = {
  role: "assistant",
  content: `Olá! Sou o **Assistente de Triagem PRODIN** 🏗️

Minha missão é garantir o rigor técnico e a conformidade do seu briefing antes de conectá-lo aos nossos especialistas auditados.

Posso te ajudar com:
- **Triagem de Escopo:** Definição técnica de necessidades e normas ABNT.
- **Estimativas PRODIN:** Valores baseados em m², complexidade e acabamento.
- **Consultoria de Registros:** Dúvidas sobre validação de CREA e CAU.
- **Lances Reversos:** Estruturação de editais para receber propostas competitivas.

Como posso auxiliar seu projeto hoje?`,
};

const starterPrompts = [
  "Qual a metragem mínima para um projeto residencial?",
  "Quanto custa um projeto estrutural de 200m²?",
  "Como funciona o split de pagamento seguro?",
  "Preciso de um projeto para reforma comercial.",
];

export default function AssistenteIA() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const chatMutation = trpc.ai.chat.useMutation({
    onSuccess: (data) => {
      setMessages((prev) => [...prev, { role: "assistant", content: data.content }]);
    },
    onError: (err) => {
      toast.error("Falha na conexão com o motor IA: " + err.message);
    }
  });

  const sendMessage = (text?: string) => {
    const userText = text ?? input;
    if (!userText.trim() || chatMutation.isPending) return;

    const updatedMessages: Message[] = [...messages, { role: "user", content: userText }];
    setMessages(updatedMessages);
    setInput("");

    chatMutation.mutate({
      messages: updatedMessages.map((m) => ({ role: m.role, content: m.content })),
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        {/* Header Imersivo */}
        <div className="brand-gradient py-24 relative overflow-hidden">
           <div className="absolute inset-0 opacity-10 pointer-events-none">
              <BrainCircuit size={400} className="absolute -right-20 -top-20 text-white" />
           </div>
          <div className="container relative z-10">
            <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-8">
              <div className="w-24 h-24 rounded-[2.5rem] bg-white/10 border border-white/20 flex items-center justify-center shadow-2xl backdrop-blur-xl group hover:scale-110 transition-transform duration-500">
                <Sparkles size={48} className="text-cyan-300 group-hover:rotate-12 transition-transform" />
              </div>
              <Badge className="bg-white/10 text-white border-white/20 px-6 py-2 rounded-full backdrop-blur-md gap-3 font-black uppercase tracking-[0.3em] text-[10px]">
                 <ShieldCheck size={14} className="text-cyan-300 fill-cyan-300" /> Motor de Inteligência PRODIN
              </Badge>
              <h1 className="text-6xl md:text-7xl font-black text-white tracking-tighter leading-none">Triagem <span className="text-cyan-400">Inteligente.</span></h1>
              <p className="text-white/70 text-2xl font-medium leading-relaxed">
                O motor de IA que transforma sua visão em um briefing técnico auditado de alta performance.
              </p>
            </div>
          </div>
        </div>

        <div className="container py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-7xl mx-auto">
            {/* Sidebar Tools */}
            <div className="lg:col-span-4 space-y-10">
              <Card className="p-10 border-border/60 shadow-xl rounded-[3rem] bg-background">
                <h3 className="font-black text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-8 flex items-center gap-3">
                  <Target size={18} className="text-primary" /> Sugestões de Triagem
                </h3>
                <div className="flex flex-col gap-4">
                  {starterPrompts.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => sendMessage(prompt)}
                      disabled={chatMutation.isPending}
                      className="text-left text-sm font-black text-foreground/70 hover:text-primary hover:bg-primary/5 rounded-2xl p-5 transition-all flex items-start gap-4 border border-border/40 hover:border-primary/40 group uppercase tracking-widest leading-relaxed"
                    >
                      <ChevronRight size={18} className="mt-0.5 flex-shrink-0 text-primary group-hover:translate-x-2 transition-transform" />
                      {prompt}
                    </button>
                  ))}
                </div>
              </Card>

              <Card className="p-10 border-primary/20 bg-primary/5 shadow-2xl rounded-[3rem] overflow-hidden relative">
                <div className="absolute -right-10 -bottom-10 opacity-10 rotate-12">
                   <Zap size={200} className="text-primary" />
                </div>
                <div className="relative z-10 space-y-6">
                  <Badge className="bg-primary text-white border-0 px-4 py-1.5 font-black text-[10px] tracking-widest uppercase">PRODIN BID</Badge>
                  <h3 className="text-3xl font-black text-foreground leading-tight tracking-tight">Publicar <br/>Lance Reverso</h3>
                  <p className="text-sm font-bold text-muted-foreground leading-relaxed uppercase tracking-widest">
                    Nossa IA estrutura o edital técnico perfeito para você receber propostas competitivas de especialistas.
                  </p>
                  <Button
                    size="lg"
                    className="w-full h-16 brand-gradient text-white border-0 gap-4 font-black text-lg rounded-2xl shadow-2xl hover:scale-105 transition-transform"
                    onClick={() => sendMessage("Quero estruturar um briefing para publicar um lance reverso.")}
                  >
                    <Zap size={24} fill="currentColor" /> ESTRUTURAR AGORA
                  </Button>
                </div>
              </Card>

              <div className="flex items-center gap-6 p-8 rounded-[2rem] bg-muted/30 border border-border/60">
                 <div className="w-16 h-16 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-600 shadow-xl">
                    <ShieldCheck size={32} />
                 </div>
                 <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-1">Privacidade Ativa</p>
                    <p className="text-lg font-black text-foreground tracking-tight">Conformidade LGPD</p>
                 </div>
              </div>
            </div>

            {/* Chat Interface */}
            <div className="lg:col-span-8">
              <Card className="flex flex-col h-[900px] border-border/60 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.2)] rounded-[4rem] overflow-hidden bg-background relative border-2">
                <div className="bg-muted/30 p-8 border-b border-border flex items-center justify-between">
                   <div className="flex items-center gap-6">
                      <div className="w-16 h-16 rounded-2xl brand-gradient flex items-center justify-center text-white shadow-2xl">
                         <Bot size={32} />
                      </div>
                      <div className="space-y-1">
                         <p className="text-2xl font-black text-foreground tracking-tight">Assistente PRODIN</p>
                         <div className="flex items-center gap-2">
                            <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Motor IA Ativo & Auditado</span>
                         </div>
                      </div>
                   </div>
                   <Badge variant="outline" className="border-border/60 text-[10px] font-black uppercase tracking-widest py-2 px-4 rounded-xl">Gemini 2.5 Flash</Badge>
                </div>

                <div className="flex-1 overflow-y-auto p-12 flex flex-col gap-10 scrollbar-thin">
                  {messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={cn("flex gap-6", msg.role === "user" ? "flex-row-reverse" : "flex-row")}
                    >
                      <div
                        className={cn(
                          "max-w-[85%] rounded-[2.5rem] px-10 py-8 text-lg font-medium leading-relaxed shadow-xl",
                          msg.role === "user"
                            ? "brand-gradient text-white rounded-tr-none"
                            : "bg-muted/50 text-foreground rounded-tl-none border border-border/40"
                        )}
                      >
                        {msg.content.split("\n").map((line, i) => (
                           <p key={i} className={i > 0 ? "mt-4" : ""}>
                             {line.includes("**") ? (
                               line.split("**").map((part, j) => (
                                 j % 2 === 1 ? <strong key={j} className="font-black text-cyan-400">{part}</strong> : part
                               ))
                             ) : line}
                           </p>
                        ))}
                      </div>
                    </div>
                  ))}
                  {chatMutation.isPending && (
                    <div className="flex gap-6">
                      <div className="bg-muted/50 rounded-[2.5rem] rounded-tl-none px-10 py-8 flex items-center gap-6 border border-border/40 shadow-xl">
                        <Loader2 size={24} className="animate-spin text-primary" />
                        <span className="text-sm font-black text-muted-foreground uppercase tracking-[0.3em]">Processando Auditoria...</span>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                <div className="p-12 border-t border-border bg-muted/10">
                  <div className="flex gap-6">
                    <div className="flex-1 relative">
                       <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
                        placeholder="Descreva seu desafio técnico ou solicite uma triagem..."
                        className="w-full h-20 rounded-2xl border-border/60 focus:ring-primary shadow-2xl px-10 font-bold text-xl placeholder:text-muted-foreground/40"
                        disabled={chatMutation.isPending}
                      />
                    </div>
                    <Button
                      size="icon"
                      onClick={() => sendMessage()}
                      disabled={!input.trim() || chatMutation.isPending}
                      className="w-20 h-20 rounded-2xl brand-gradient text-white border-0 shadow-2xl hover:scale-110 transition-transform shrink-0"
                    >
                      <Send size={32} />
                    </Button>
                  </div>
                  <div className="flex items-center justify-center gap-10 mt-10 opacity-40">
                     <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em]">Matriz PRODIN 2.0</p>
                     <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
                     <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em]">Auditado por Manus AI</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
