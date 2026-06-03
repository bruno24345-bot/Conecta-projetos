import { useAuth } from "@/_core/hooks/useAuth";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { StarRating } from "@/components/StarRating";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { getLoginUrl } from "@/const";
import { cn } from "@/lib/utils";
import {
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  FileText,
  Lock,
  MapPin,
  MessageSquare,
  Plus,
  Share2,
  ShoppingCart,
  Star,
  ZoomIn,
} from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "wouter";
import { toast } from "sonner";

// Mock project data
const mockProject = {
  id: 1,
  title: "Casa Contemporânea 180m² — Alto Padrão",
  description: `Projeto residencial completo para casa contemporânea de alto padrão com 180m² de área construída. O projeto inclui planta baixa completa, fachadas frontal e lateral, cortes transversal e longitudinal, planta de cobertura, detalhamentos construtivos e visualizações 3D em alta resolução.

O projeto foi desenvolvido seguindo as normas ABNT vigentes e contempla: sala de estar e jantar integradas, cozinha gourmet, 3 suítes (sendo 1 master com closet), lavabo, área de serviço, garagem para 2 carros e área de lazer com piscina.`,
  price: "2800.00",
  category: "residential",
  architecturalStyle: "Contemporâneo",
  areaM2: "180.00",
  averageRating: "4.9",
  totalReviews: 47,
  totalSales: 23,
  viewCount: 1240,
  isPremiumFeatured: true,
  tags: ["3 suítes", "piscina", "garagem", "alto padrão", "ABNT"],
  professional: {
    id: 1,
    name: "Arq. Marina Costa",
    verificationStatus: "approved",
    registrationType: "CAU",
    registrationNumber: "A-123456-8",
    registrationUF: "SP",
    bio: "Arquiteta com 12 anos de experiência em projetos residenciais de alto padrão. Especialista em arquitetura contemporânea e sustentável.",
    averageRating: "4.9",
    totalReviews: 124,
    totalSales: 87,
  },
  galleryUrls: [] as string[],
  technicalDrawingUrls: [] as string[],
  model3dUrl: null as string | null,
  reviews: [
    { id: 1, reviewerName: "João P.", rating: 5, comment: "Projeto excelente! Muito detalhado e a arquiteta foi super atenciosa. Recomendo!", createdAt: "2024-03-15" },
    { id: 2, reviewerName: "Maria S.", rating: 5, comment: "Comprei e não me arrependi. Os arquivos vieram completos e em alta qualidade.", createdAt: "2024-02-28" },
    { id: 3, reviewerName: "Carlos M.", rating: 4, comment: "Ótimo projeto. Só tive uma dúvida técnica que foi esclarecida rapidamente pelo chat.", createdAt: "2024-02-10" },
  ],
};

const galleryPlaceholders = [
  { label: "Fachada Principal", type: "facade" },
  { label: "Planta Baixa", type: "plan" },
  { label: "Sala de Estar", type: "interior" },
  { label: "Cozinha", type: "interior" },
  { label: "Suíte Master", type: "interior" },
  { label: "Corte Longitudinal", type: "technical" },
];

export default function ProjetoDetalhe() {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated, user } = useAuth();
  const [activeImage, setActiveImage] = useState(0);
  const [copyrightAgreed, setCopyrightAgreed] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [activeTab, setActiveTab] = useState("galeria");

  // Simulating: user has NOT purchased this project
  const hasPurchased = false;

  const price = parseFloat(mockProject.price);
  const rating = parseFloat(mockProject.averageRating);

  const handleBuy = () => {
    if (!isAuthenticated) {
      window.location.href = getLoginUrl();
      return;
    }
    if (!copyrightAgreed) {
      toast.error("Você precisa aceitar os termos de direitos autorais para continuar.");
      return;
    }
    toast.info("Redirecionando para o checkout...");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        <div className="container py-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-primary">Início</Link>
            <ChevronRight size={14} />
            <Link href="/projetos" className="hover:text-primary">Projetos</Link>
            <ChevronRight size={14} />
            <span className="text-foreground truncate max-w-xs">{mockProject.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Gallery + Details */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              {/* Main image / 3D viewer */}
              <div className="relative rounded-2xl overflow-hidden bg-muted aspect-[16/10]">
                {/* Placeholder image */}
                <div className="w-full h-full brand-gradient flex items-center justify-center">
                  <div className="text-center text-white/60">
                    <FileText size={48} className="mx-auto mb-2" />
                    <p className="text-sm">{galleryPlaceholders[activeImage]?.label}</p>
                    <p className="text-xs opacity-60">{galleryPlaceholders[activeImage]?.type === "technical" ? "Corte Técnico" : galleryPlaceholders[activeImage]?.type === "facade" ? "Fachada" : "Visualização"}</p>
                  </div>
                </div>

                {/* Blur overlay for non-buyers on 3D/technical views */}
                {!hasPurchased && (activeImage >= 4) && (
                  <div className="absolute inset-0 project-blur-overlay flex flex-col items-center justify-center gap-3">
                    <div className="bg-white/10 border border-white/20 rounded-2xl p-6 text-center backdrop-blur-sm">
                      <Lock size={32} className="text-white mx-auto mb-2" />
                      <p className="text-white font-bold text-lg">Conteúdo Protegido</p>
                      <p className="text-white/70 text-sm mt-1">Compre o projeto para acessar os cortes técnicos e visualizações 3D completas</p>
                      <div className="text-xs text-white/50 mt-2 border border-white/20 rounded px-2 py-1 inline-block">
                        © Conecta Projetos — Todos os direitos reservados
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation arrows */}
                <button
                  onClick={() => setActiveImage(Math.max(0, activeImage - 1))}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={() => setActiveImage(Math.min(galleryPlaceholders.length - 1, activeImage + 1))}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors"
                >
                  <ChevronRight size={16} />
                </button>

                {/* Image counter */}
                <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                  {activeImage + 1} / {galleryPlaceholders.length}
                </div>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-2 overflow-x-auto pb-1">
                {galleryPlaceholders.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={cn(
                      "flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all",
                      activeImage === idx ? "border-primary" : "border-transparent opacity-60 hover:opacity-100"
                    )}
                  >
                    <div className={cn(
                      "w-full h-full flex items-center justify-center text-[8px] text-white font-medium",
                      idx >= 4 && !hasPurchased ? "bg-gray-800" : "brand-gradient"
                    )}>
                      {idx >= 4 && !hasPurchased ? <Lock size={10} className="text-white/60" /> : img.label.slice(0, 6)}
                    </div>
                  </button>
                ))}
              </div>

              {/* Tabs: Description, Technical, Reviews, Comments */}
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="w-full">
                  <TabsTrigger value="galeria" className="flex-1">Descrição</TabsTrigger>
                  <TabsTrigger value="tecnico" className="flex-1">Técnico</TabsTrigger>
                  <TabsTrigger value="avaliacoes" className="flex-1">Avaliações ({mockProject.totalReviews})</TabsTrigger>
                  <TabsTrigger value="comentarios" className="flex-1">Comentários</TabsTrigger>
                </TabsList>

                <TabsContent value="galeria" className="mt-4">
                  <div className="prose prose-sm max-w-none text-foreground/80">
                    <p className="leading-relaxed whitespace-pre-line">{mockProject.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {mockProject.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="tecnico" className="mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: "Área construída", value: `${mockProject.areaM2} m²` },
                      { label: "Categoria", value: "Residencial" },
                      { label: "Estilo", value: mockProject.architecturalStyle },
                      { label: "Formato dos arquivos", value: "PDF, DWG, PNG" },
                      { label: "Normas", value: "ABNT NBR" },
                      { label: "Pranchas incluídas", value: "12 pranchas" },
                    ].map((item) => (
                      <div key={item.label} className="bg-muted/50 rounded-lg p-3">
                        <p className="text-xs text-muted-foreground">{item.label}</p>
                        <p className="text-sm font-semibold text-foreground mt-0.5">{item.value}</p>
                      </div>
                    ))}
                  </div>
                  {!hasPurchased && (
                    <div className="mt-4 p-4 border border-dashed border-border rounded-xl text-center">
                      <Lock size={20} className="text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Arquivos CAD e PDF disponíveis após a compra</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="avaliacoes" className="mt-4">
                  <div className="flex items-center gap-6 mb-6 p-4 bg-muted/30 rounded-xl">
                    <div className="text-center">
                      <div className="text-5xl font-black text-foreground">{rating.toFixed(1)}</div>
                      <StarRating rating={rating} size="sm" className="justify-center mt-1" />
                      <p className="text-xs text-muted-foreground mt-1">{mockProject.totalReviews} avaliações</p>
                    </div>
                    <div className="flex-1">
                      {[5, 4, 3, 2, 1].map((star) => {
                        const count = star === 5 ? 38 : star === 4 ? 7 : star === 3 ? 2 : 0;
                        const pct = (count / mockProject.totalReviews) * 100;
                        return (
                          <div key={star} className="flex items-center gap-2 mb-1">
                            <span className="text-xs text-muted-foreground w-4">{star}</span>
                            <Star size={10} className="star-filled fill-current flex-shrink-0" />
                            <div className="flex-1 bg-muted rounded-full h-1.5">
                              <div className="brand-gradient h-1.5 rounded-full" style={{ width: `${pct}%` }} />
                            </div>
                            <span className="text-xs text-muted-foreground w-6">{count}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    {mockProject.reviews.map((review) => (
                      <div key={review.id} className="border-b border-border/60 pb-4 last:border-0">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full brand-gradient flex items-center justify-center text-white text-xs font-bold">
                              {review.reviewerName.charAt(0)}
                            </div>
                            <span className="text-sm font-semibold text-foreground">{review.reviewerName}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <StarRating rating={review.rating} size="sm" />
                            <span className="text-xs text-muted-foreground">{review.createdAt}</span>
                          </div>
                        </div>
                        <p className="text-sm text-foreground/80 leading-relaxed">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="comentarios" className="mt-4">
                  <p className="text-sm text-muted-foreground mb-4">
                    Faça perguntas técnicas sobre o projeto. O profissional e outros compradores podem responder.
                  </p>
                  {isAuthenticated ? (
                    <div className="flex flex-col gap-2 mb-6">
                      <Textarea
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="Faça uma pergunta ou comentário sobre o projeto..."
                        className="resize-none"
                        rows={3}
                      />
                      <Button
                        size="sm"
                        className="self-end brand-gradient text-white border-0"
                        onClick={() => { toast.success("Comentário enviado!"); setCommentText(""); }}
                      >
                        <MessageSquare size={14} className="mr-1" /> Enviar
                      </Button>
                    </div>
                  ) : (
                    <div className="p-4 bg-muted/30 rounded-xl text-center mb-6">
                      <p className="text-sm text-muted-foreground">
                        <a href={getLoginUrl()} className="text-primary hover:underline font-medium">Faça login</a> para comentar
                      </p>
                    </div>
                  )}
                  <div className="text-center py-8 text-muted-foreground text-sm">
                    Seja o primeiro a comentar neste projeto.
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Right: Purchase card + Professional */}
            <div className="flex flex-col gap-4">
              {/* Price card */}
              <Card className="p-5 border border-border sticky top-20">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="text-3xl font-black text-foreground">
                      {price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                    </div>
                    {mockProject.isPremiumFeatured && (
                      <span className="premium-badge mt-1 inline-block">⭐ Destaque Premium</span>
                    )}
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Share2 size={16} />
                  </Button>
                </div>

                <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Eye size={14} />
                    {mockProject.viewCount.toLocaleString("pt-BR")} visualizações
                  </div>
                  <div className="flex items-center gap-1">
                    <ShoppingCart size={14} />
                    {mockProject.totalSales} vendas
                  </div>
                </div>

                <Separator className="mb-4" />

                {/* What's included */}
                <div className="mb-4">
                  <p className="text-xs font-semibold text-muted-foreground mb-2">O QUE ESTÁ INCLUÍDO</p>
                  <ul className="flex flex-col gap-1.5">
                    {["Planta baixa completa", "Fachadas (frontal e lateral)", "Cortes técnicos", "Visualizações 3D", "Arquivos PDF + DWG", "Suporte por 30 dias"].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-foreground/80">
                        <div className="w-4 h-4 rounded-full brand-gradient flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-[8px]">✓</span>
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Copyright agreement */}
                {!hasPurchased && (
                  <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg mb-4">
                    <Checkbox
                      id="copyright"
                      checked={copyrightAgreed}
                      onCheckedChange={(v) => setCopyrightAgreed(v as boolean)}
                      className="mt-0.5"
                    />
                    <label htmlFor="copyright" className="text-xs text-amber-800 leading-relaxed cursor-pointer">
                      Declaro que li e aceito os <strong>Termos de Direitos Autorais</strong>. Este projeto é para uso pessoal e não pode ser revendido ou redistribuído.
                    </label>
                  </div>
                )}

                {hasPurchased ? (
                  <Button className="w-full brand-gradient text-white border-0 hover:opacity-90 gap-2">
                    <Download size={16} /> Baixar Arquivos
                  </Button>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Button
                      className="w-full brand-gradient text-white border-0 hover:opacity-90 gap-2"
                      onClick={handleBuy}
                      disabled={!copyrightAgreed}
                    >
                      <ShoppingCart size={16} /> Comprar Agora
                    </Button>
                    <p className="text-[10px] text-center text-muted-foreground">
                      Pagamento seguro via Pix ou Cartão · Arquivos liberados imediatamente
                    </p>
                  </div>
                )}
              </Card>

              {/* Professional card */}
              <Card className="p-4 border border-border">
                <p className="text-xs font-semibold text-muted-foreground mb-3">PROFISSIONAL RESPONSÁVEL</p>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full brand-gradient flex items-center justify-center text-white font-black text-lg">
                    {mockProject.professional.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <p className="font-bold text-sm text-foreground">{mockProject.professional.name}</p>
                      {mockProject.professional.verificationStatus === "approved" && (
                        <BadgeCheck size={14} className="text-primary" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {mockProject.professional.registrationType} {mockProject.professional.registrationNumber} — {mockProject.professional.registrationUF}
                    </p>
                    <StarRating rating={parseFloat(mockProject.professional.averageRating)} size="sm" showValue totalReviews={mockProject.professional.totalReviews} />
                  </div>
                </div>
                <p className="text-xs text-foreground/70 leading-relaxed mb-3">{mockProject.professional.bio}</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 text-xs" asChild>
                    <Link href={`/profissionais/${mockProject.professional.id}`}>Ver Portfólio</Link>
                  </Button>
                  <Button size="sm" className="flex-1 text-xs brand-gradient text-white border-0">
                    <MessageSquare size={12} className="mr-1" /> Contatar
                  </Button>
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
