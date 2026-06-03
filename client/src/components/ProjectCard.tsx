import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { BadgeCheck, Eye, MapPin, ShoppingCart } from "lucide-react";
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
  isAd?: boolean;
}

export function ProjectCard({ project, className, isAd = false }: ProjectCardProps) {
  const price = typeof project.price === "string" ? parseFloat(project.price) : project.price;
  const rating = typeof project.averageRating === "string" ? parseFloat(project.averageRating) : project.averageRating;
  const area = project.areaM2 ? (typeof project.areaM2 === "string" ? parseFloat(project.areaM2) : project.areaM2) : null;

  return (
    <Card
      className={cn(
        "group overflow-hidden border border-border/60 bg-card card-hover cursor-pointer p-0",
        project.isPremiumFeatured && "ring-2 ring-[oklch(0.78_0.16_75)]/40",
        className
      )}
    >
      <Link href={`/projetos/${project.id}`}>
        {/* Thumbnail */}
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          {project.thumbnailUrl ? (
            <img
              src={project.thumbnailUrl}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full brand-gradient flex items-center justify-center">
              <div className="text-white/40 text-5xl font-black">CP</div>
            </div>
          )}

          {/* Badges overlay */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {project.isPremiumFeatured && (
              <span className="premium-badge">⭐ Destaque</span>
            )}
            {isAd && (
              <span className="bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded">Patrocinado</span>
            )}
          </div>

          {/* View count */}
          <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-black/50 text-white text-xs px-2 py-0.5 rounded-full">
            <Eye size={10} />
            {project.viewCount.toLocaleString("pt-BR")}
          </div>
        </div>

        {/* Content */}
        <div className="p-3 flex flex-col gap-2">
          {/* Category + Style */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4">
              {categoryLabels[project.category] ?? project.category}
            </Badge>
            {project.architecturalStyle && (
              <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4">
                {project.architecturalStyle}
              </Badge>
            )}
            {area && (
              <span className="text-[10px] text-muted-foreground flex items-center gap-0.5">
                <MapPin size={9} />
                {area.toLocaleString("pt-BR")} m²
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-semibold text-sm text-foreground line-clamp-2 leading-snug group-hover:text-primary transition-colors">
            {project.title}
          </h3>

          {/* Professional */}
          {project.professional && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              {project.professional.verificationStatus === "approved" && (
                <BadgeCheck size={12} className="text-primary flex-shrink-0" />
              )}
              <span className="truncate">{project.professional.name ?? "Profissional"}</span>
            </div>
          )}

          {/* Rating */}
          <StarRating
            rating={rating}
            size="sm"
            showValue
            totalReviews={project.totalReviews}
          />

          {/* Price + CTA */}
          <div className="flex items-center justify-between mt-1">
            <div>
              <span className="text-lg font-black text-foreground">
                {price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
              </span>
              {project.totalSales > 0 && (
                <p className="text-[10px] text-muted-foreground">{project.totalSales} vendas</p>
              )}
            </div>
            <Button
              size="sm"
              className="brand-gradient text-white border-0 text-xs h-7 px-3 gap-1 hover:opacity-90"
              onClick={(e) => e.preventDefault()}
            >
              <ShoppingCart size={12} />
              Comprar
            </Button>
          </div>
        </div>
      </Link>
    </Card>
  );
}
