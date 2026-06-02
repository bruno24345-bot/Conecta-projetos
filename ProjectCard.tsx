import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { BadgeCheck, Eye, MapPin, ShoppingCart, Zap, ShieldCheck } from "lucide-react";
import { Link } from "wouter";
import { StarRating } from "./StarRating";

export interface ProjectCardData {
  id: number;
  title: string;
  thumbnailUrl?: string | null;
  price: string | number;
  category: string;
  architecturalStyle?: string | null;
  areaM2?: string | number | null;
  averageRating: string | number;
  totalReviews: number;
  totalSales: number;
  viewCount: number;
  isPremiumFeatured: boolean;
  professional?: {
    name?: string | null;
    verificationStatus?: string;
    averageRating?: string | number;
  };
}

const categoryLabels: Record<string, string> = {
  residential: "Residencial",
  commercial: "Comercial",
  industrial: "Industrial",
  interior_design: "Design de Interiores",
  landscape: "Paisagismo",
  urban_planning: "Urbanismo",
  renovation: "Reforma",
  other: "Outro",
};

interface ProjectCardProps {
  project: ProjectCardData;
  className?: string;
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  const price = typeof project.price === "string" ? parseFloat(project.price) : project.price;
  const rating = typeof project.averageRating === "string" ? parseFloat(project.averageRating) : project.averageRating;
  const area = project.areaM2 ? (typeof project.areaM2 === "string" ? parseFloat(project.areaM2) : project.areaM2) : null;

  return (
    <Card
      className={cn(
        "group overflow-hidden border-border/60 bg-background hover:shadow-2xl transition-all duration-500 cursor-pointer p-0 rounded-[2rem]",
        project.isPremiumFeatured && "ring-2 ring-primary/20",
        className
      )}
    >
      <Link href={`/projetos/${project.id}`}>
        {/* Thumbnail Imersiva */}
        <div className="relative aspect-[16/10] overflow-hidden bg-muted">
          {project.thumbnailUrl ? (
            <img
              src={project.thumbnailUrl}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full brand-gradient flex items-center justify-center relative">
               <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                     <Eye size={24} />
                  </div>
               </div>
               <div className="text-white/20 text-6xl font-black tracking-tighter group-hover:scale-90 transition-transform duration-500">PRODIN</div>
            </div>
          )}

          {/* Badges de Auditoria */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {project.isPremiumFeatured && (
              <Badge className="bg-primary text-white border-0 font-black text-[10px] tracking-widest px-3 py-1 shadow-lg">⭐ DESTAQUE</Badge>
            )}
            <Badge className="bg-black/40 backdrop-blur-md text-white border-0 font-black text-[10px] tracking-widest px-3 py-1">
               {categoryLabels[project.category] ?? project.category}
            </Badge>
          </div>

          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
             <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md text-white text-[10px] font-black px-3 py-1.5 rounded-full">
                <Eye size={12} className="text-primary" />
                {project.viewCount.toLocaleString("pt-BR")}
             </div>
             {area && (
                <div className="flex items-center gap-1.5 bg-white/90 text-black text-[10px] font-black px-3 py-1.5 rounded-full shadow-lg">
                   <MapPin size={12} className="text-primary" />
                   {area.toLocaleString("pt-BR")} m²
                </div>
             )}
          </div>
        </div>

        {/* Content */}
        <div className="p-8 space-y-4">
          <div className="space-y-2">
             <h3 className="font-black text-xl text-foreground line-clamp-2 leading-tight group-hover:text-primary transition-colors tracking-tight">
               {project.title}
             </h3>
             {project.professional && (
                <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
                  {project.professional.verificationStatus === "approved" && (
                    <ShieldCheck size={14} className="text-primary" />
                  )}
                  <span className="truncate uppercase tracking-widest">{project.professional.name ?? "Profissional"}</span>
                </div>
             )}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border/40">
            <div>
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Investimento</p>
              <p className="text-2xl font-black text-foreground">
                {price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
              </p>
            </div>
            <Button
              size="icon"
              className="w-14 h-14 brand-gradient text-white border-0 rounded-2xl shadow-xl hover:scale-110 transition-transform"
              onClick={(e) => e.preventDefault()}
            >
              <ShoppingCart size={20} />
            </Button>
          </div>
        </div>
      </Link>
    </Card>
  );
}
