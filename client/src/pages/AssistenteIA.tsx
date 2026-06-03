import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc";
import { cn } from "@/lib/utils";
import { Bot, ChevronRight, Loader2, Send, Sparkles, Zap } from "lucide-react";
import { useRef, useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const INITIAL_MESSAGE: Message = {
  role: "assistant",
  content: `Olá! Sou o **Assistente IA da Conecta Projetos** 🏗️

Posso te ajudar com:
- **Estimativas de orçamento** para projetos de arquitetura e engenharia
- **Busca inteligente** de projetos na vitrine
- **Comparação de profissionais** por especialidade e avaliação
- **Lances reversos** — publique sua demanda e receba propostas

Como posso te ajudar hoje?`,
};

const starterPrompts = [
  "Qual o custo médio de um projeto residencial de 150m²?",
  "Preciso de um projeto para escritório de 80m². Qual o preço?",
  "Quais profissionais atendem projetos de paisagismo?",
  "Me ajude a encontrar projetos contemporâneos com piscina",
];

export default function AssistenteIA() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const chatMutation = trpc.ai.chat.useMutation({
    onSuccess: (data) => {
      setMessages((prev) => [...prev, { role: "assistant", content: data.content }]);
      setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    },
    onError: () => {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Desculpe, ocorreu um erro. Por favor, tente novamente." },
      ]);
    },
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

  const renderContent = (content: string) => {
    return content.split("\n").map((line, i) => {
      // Bold text
      const parts = line.split(/\*\*(.*?)\*\*/g);
      return (
        <p key={i} className={line.startsWith("- ") ? "pl-2" : ""}>
          {parts.map((part, j) =>
            j % 2 === 1 ? <strong key={j}>{part}</strong> : part
          )}
        </p>
      );
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        {/* Hero */}
        <div className="brand-gradient py-10">
          <div className="container">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center">
                <Sparkles size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-black text-white">Assistente IA</h1>
                <p className="text-white/70 text-sm">Orçamentos inteligentes, busca avançada e lances reversos</p>
              </div>
            </div>
          </div>
        </div>

        <div className="container py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {/* Sidebar */}
            <div className="flex flex-col gap-4">
              <Card className="p-4">
                <h3 className="font-bold text-sm text-foreground mb-3 flex items-center gap-2">
                  <Zap size={14} className="text-[oklch(0.78_0.16_75)]" />
                  Sugestões Rápidas
                </h3>
                <div className="flex flex-col gap-2">
                  {starterPrompts.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => sendMessage(prompt)}
                      disabled={chatMutation.isPending}
                      className="text-left text-xs text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg p-2 transition-colors flex items-start gap-1.5 disabled:opacity-50"
                    >
                      <ChevronRight size={12} className="mt-0.5 flex-shrink-0 text-primary" />
                      {prompt}
                    </button>
                  ))}
                </div>
              </Card>

              <Card className="p-4">
                <h3 className="font-bold text-sm text-foreground mb-3">Lance Reverso</h3>
                <p className="text-xs text-muted-foreground mb-3">
                  Publique sua demanda e receba propostas de profissionais verificados.
                </p>
                <Button
                  size="sm"
                  className="w-full brand-gradient text-white border-0 gap-1.5"
                  onClick={() => sendMessage("Quero publicar uma demanda para receber propostas de profissionais. Como funciona o lance reverso?")}
                >
                  <Zap size={12} /> Publicar Demanda
                </Button>
              </Card>
            </div>

            {/* Chat */}
            <div className="lg:col-span-3 flex flex-col">
              <Card className="flex flex-col h-[600px]">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
                  {messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={cn("flex gap-3", msg.role === "user" ? "flex-row-reverse" : "flex-row")}
                    >
                      {msg.role === "assistant" && (
                        <div className="w-8 h-8 rounded-full brand-gradient flex items-center justify-center flex-shrink-0">
                          <Bot size={14} className="text-white" />
                        </div>
                      )}
                      <div
                        className={cn(
                          "max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed flex flex-col gap-0.5",
                          msg.role === "user"
                            ? "brand-gradient text-white rounded-tr-sm"
                            : "bg-muted text-foreground rounded-tl-sm"
                        )}
                      >
                        {renderContent(msg.content)}
                      </div>
                    </div>
                  ))}
                  {chatMutation.isPending && (
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full brand-gradient flex items-center justify-center flex-shrink-0">
                        <Bot size={14} className="text-white" />
                      </div>
                      <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-2">
                        <Loader2 size={14} className="animate-spin text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Analisando...</span>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t border-border">
                  <div className="flex gap-2">
                    <Input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
                      placeholder="Pergunte sobre orçamentos, projetos ou profissionais..."
                      className="flex-1"
                      disabled={chatMutation.isPending}
                    />
                    <Button
                      onClick={() => sendMessage()}
                      disabled={!input.trim() || chatMutation.isPending}
                      className="brand-gradient text-white border-0"
                    >
                      <Send size={16} />
                    </Button>
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-2 text-center">
                    O Assistente IA fornece estimativas baseadas em dados da plataforma. Valores reais podem variar.
                  </p>
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
