import { useAuth } from "@/_core/hooks/useAuth";

/**
 * AdSenseBlock — exibe anúncios Google AdSense apenas para usuários sem assinatura Premium ativa.
 * Para usuários com accountType === "premium", o componente retorna null (sem anúncios).
 *
 * Uso:
 *   <AdSenseBlock slot="in-feed" />
 *   <AdSenseBlock slot="sidebar" className="sticky top-20" />
 */
type AdSenseSlot = "in-feed" | "in-article" | "sidebar";

interface AdSenseBlockProps {
  slot: AdSenseSlot;
  className?: string;
}

const slotConfig: Record<AdSenseSlot, { label: string; minHeight: string; dataAdSlot: string }> = {
  "in-feed": { label: "Anúncio", minHeight: "120px", dataAdSlot: "1234567890" },
  "in-article": { label: "Anúncio", minHeight: "90px", dataAdSlot: "0987654321" },
  "sidebar": { label: "Anúncio", minHeight: "250px", dataAdSlot: "1122334455" },
};

export function AdSenseBlock({ slot, className = "" }: AdSenseBlockProps) {
  const { user } = useAuth();

  // Anúncios completamente desativados para assinantes Premium
  if (user?.accountType === "premium") return null;

  const config = slotConfig[slot];

  return (
    <div
      className={`adsense-block bg-muted/30 border border-dashed border-border rounded-lg flex items-center justify-center text-xs text-muted-foreground ${className}`}
      style={{ minHeight: config.minHeight }}
      aria-label="Espaço publicitário"
    >
      {/* Em produção: substituir pelo script ins.adsbygoogle */}
      {/* <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
        data-ad-slot={config.dataAdSlot}
        data-ad-format={slot === "sidebar" ? "auto" : "fluid"}
        data-full-width-responsive="true"
      /> */}
      <span className="opacity-40">{config.label}</span>
    </div>
  );
}
