import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "full" | "icon" | "text";
  className?: string;
  light?: boolean;
}

const sizes = {
  sm: { icon: 28, text: "text-lg" },
  md: { icon: 36, text: "text-xl" },
  lg: { icon: 48, text: "text-2xl" },
  xl: { icon: 64, text: "text-3xl" },
};

export function Logo({ size = "md", variant = "full", className, light = false }: LogoProps) {
  const s = sizes[size];
  const textColor = light ? "text-white" : "brand-gradient-text";

  const IconSVG = () => (
    <svg
      width={s.icon}
      height={s.icon}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0"
    >
      <defs>
        <linearGradient id="logoGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0066CC" />
          <stop offset="100%" stopColor="#00C8FF" />
        </linearGradient>
        <linearGradient id="logoGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0088EE" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#00DDFF" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id="logoGrad3" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0044AA" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#0099DD" stopOpacity="0.8" />
        </linearGradient>
      </defs>

      {/* Network connection lines */}
      <line x1="32" y1="8" x2="8" y2="28" stroke="url(#logoGrad1)" strokeWidth="1" strokeOpacity="0.4" />
      <line x1="32" y1="8" x2="56" y2="28" stroke="url(#logoGrad1)" strokeWidth="1" strokeOpacity="0.4" />
      <line x1="8" y1="28" x2="32" y2="48" stroke="url(#logoGrad1)" strokeWidth="1" strokeOpacity="0.3" />
      <line x1="56" y1="28" x2="32" y2="48" stroke="url(#logoGrad1)" strokeWidth="1" strokeOpacity="0.3" />
      <line x1="8" y1="28" x2="56" y2="28" stroke="url(#logoGrad1)" strokeWidth="1" strokeOpacity="0.25" />

      {/* Network nodes */}
      <circle cx="8" cy="28" r="2.5" fill="url(#logoGrad1)" fillOpacity="0.6" />
      <circle cx="56" cy="28" r="2.5" fill="url(#logoGrad1)" fillOpacity="0.6" />
      <circle cx="32" cy="48" r="2.5" fill="url(#logoGrad1)" fillOpacity="0.5" />

      {/* 3D Hexagon/Cube — top face */}
      <polygon
        points="32,10 50,20 50,40 32,50 14,40 14,20"
        fill="none"
        stroke="url(#logoGrad1)"
        strokeWidth="1.5"
        strokeOpacity="0.3"
      />

      {/* Cube top face */}
      <polygon
        points="32,12 46,20 32,28 18,20"
        fill="url(#logoGrad2)"
        fillOpacity="0.85"
      />
      {/* Cube left face */}
      <polygon
        points="18,20 32,28 32,44 18,36"
        fill="url(#logoGrad3)"
        fillOpacity="0.9"
      />
      {/* Cube right face */}
      <polygon
        points="46,20 32,28 32,44 46,36"
        fill="url(#logoGrad1)"
        fillOpacity="0.75"
      />

      {/* Inner lines for 3D depth */}
      <line x1="32" y1="28" x2="32" y2="44" stroke="white" strokeWidth="0.8" strokeOpacity="0.3" />
      <line x1="18" y1="20" x2="46" y2="20" stroke="white" strokeWidth="0.8" strokeOpacity="0.2" />

      {/* Arrow pointing up-right */}
      <path
        d="M38 14 L50 14 L50 26"
        stroke="url(#logoGrad1)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M38 14 L50 14"
        stroke="#00C8FF"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M44 8 L52 16"
        stroke="#00C8FF"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Arrow head */}
      <path
        d="M50 8 L58 8 L58 16"
        stroke="url(#logoGrad1)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        strokeOpacity="0.8"
      />
    </svg>
  );

  if (variant === "icon") {
    return (
      <div className={cn("flex items-center", className)}>
        <IconSVG />
      </div>
    );
  }

  if (variant === "text") {
    return (
      <div className={cn("flex items-center", className)}>
        <span className={cn("font-black tracking-tight", s.text, light ? "text-white" : "brand-gradient-text")}>
          Conecta<span className={light ? "text-cyan-300" : ""}>Projetos</span>
        </span>
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <IconSVG />
      <div className="flex flex-col leading-none">
        <span className={cn("font-black tracking-tight", s.text, light ? "text-white" : "brand-gradient-text")}>
          Conecta
        </span>
        <span className={cn("font-black tracking-tight", s.text, light ? "text-cyan-300" : "text-[oklch(0.72_0.18_210)]")}>
          Projetos
        </span>
      </div>
    </div>
  );
}

export default Logo;
