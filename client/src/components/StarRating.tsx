import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  maxStars?: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  totalReviews?: number;
  className?: string;
}

const sizeMap = { sm: 12, md: 16, lg: 20 };

export function StarRating({
  rating,
  maxStars = 5,
  size = "md",
  showValue = false,
  totalReviews,
  className,
}: StarRatingProps) {
  const px = sizeMap[size];
  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: maxStars }).map((_, i) => (
          <Star
            key={i}
            size={px}
            className={i < Math.round(rating) ? "star-filled fill-current" : "star-empty"}
          />
        ))}
      </div>
      {showValue && (
        <span className="text-sm font-semibold text-foreground">{rating.toFixed(1)}</span>
      )}
      {totalReviews !== undefined && (
        <span className="text-xs text-muted-foreground">({totalReviews})</span>
      )}
    </div>
  );
}
