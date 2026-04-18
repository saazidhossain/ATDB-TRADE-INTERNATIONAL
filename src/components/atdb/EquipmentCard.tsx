import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { Equipment } from "@/lib/atdb-data";
import { buildWhatsappRentLink } from "@/lib/atdb-data";
import { useI18n } from "@/lib/i18n";

export function EquipmentCard({ eq }: { eq: Equipment }) {
  const { t, lang } = useI18n();
  const fontClass = lang === "bn" ? "font-bn" : "font-display";

  return (
    <article className="group flex flex-col overflow-hidden rounded-md border border-border bg-card border-safety-top shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
      <Link
        to="/equipment/$category/$id"
        params={{ category: eq.category, id: eq.id }}
        className="relative aspect-[4/3] overflow-hidden bg-muted"
      >
        <img
          src={eq.image}
          alt={eq.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-sm bg-iron/85 px-2 py-1 font-display text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur">
          {eq.brand}
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <p className="font-display text-[11px] font-semibold uppercase tracking-[0.18em] text-safety">{eq.id}</p>
        <Link
          to="/equipment/$category/$id"
          params={{ category: eq.category, id: eq.id }}
          className="mt-1.5 font-display text-lg font-semibold text-iron transition-colors hover:text-safety"
        >
          {eq.name}
        </Link>
        <p className="mt-1 text-sm text-muted-foreground">
          {eq.capacity} · {eq.origin}
          {eq.year ? ` · ${eq.year}` : ""}
        </p>
        <div className="mt-5 flex items-center gap-2">
          <a
            href={buildWhatsappRentLink(eq)}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex flex-1 items-center justify-center gap-1.5 rounded-sm bg-gradient-safety px-3 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition-transform hover:-translate-y-px ${fontClass}`}
          >
            {t("common.rentNow")}
          </a>
          <Link
            to="/equipment/$category/$id"
            params={{ category: eq.category, id: eq.id }}
            className={`inline-flex items-center justify-center gap-1 rounded-sm border border-iron/20 px-3 py-2.5 text-xs font-semibold uppercase tracking-wider text-iron transition-colors hover:border-iron hover:bg-iron hover:text-white ${fontClass}`}
          >
            {t("common.details")} <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
