import { Link } from "@tanstack/react-router";
import { ArrowRight, Plus, Check } from "lucide-react";
import { useState } from "react";
import type { Equipment } from "@/lib/atdb-data";
import { buildWhatsappRentLink } from "@/lib/atdb-data";
import { useI18n } from "@/lib/i18n";
import { useCart } from "@/lib/cart";

export function EquipmentCard({ eq }: { eq: Equipment }) {
  const { t, lang } = useI18n();
  const { add, items } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  const fontClass = lang === "bn" ? "font-bn" : "font-display";
  const inCart = items.some((i) => i.id === eq.id);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    add(eq);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

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
        {inCart && (
          <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-sm bg-safety px-2 py-1 font-display text-[10px] font-bold uppercase tracking-wider text-white">
            <Check className="h-3 w-3" /> {t("common.added")}
          </span>
        )}
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <p className="font-display text-[11px] font-semibold uppercase tracking-[0.18em] text-safety">{eq.id}</p>
        <Link
          to="/equipment/$category/$id"
          params={{ category: eq.category, id: eq.id }}
          className="mt-1.5 font-display text-base font-semibold text-iron transition-colors hover:text-safety md:text-lg"
        >
          {eq.name}
        </Link>
        <p className="mt-1 text-sm text-muted-foreground">
          {eq.capacity} · {eq.origin}
          {eq.year ? ` · ${eq.year}` : ""}
        </p>
        <div className="mt-auto pt-5 flex flex-col gap-2">
          <button
            onClick={handleAdd}
            className={`inline-flex items-center justify-center gap-1.5 rounded-sm bg-gradient-safety px-3 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition-all hover:-translate-y-px ${fontClass}`}
          >
            {justAdded ? <Check className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
            {justAdded ? t("common.added") : t("common.addToQuote")}
          </button>
          <div className="flex items-center gap-2">
            <a
              href={buildWhatsappRentLink(eq)}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex flex-1 items-center justify-center gap-1.5 rounded-sm border border-iron/15 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-iron transition-colors hover:border-safety hover:text-safety ${fontClass}`}
            >
              {t("common.rentNow")}
            </a>
            <Link
              to="/equipment/$category/$id"
              params={{ category: eq.category, id: eq.id }}
              className={`inline-flex items-center justify-center gap-1 rounded-sm border border-iron/15 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-iron transition-colors hover:border-iron hover:bg-iron hover:text-white ${fontClass}`}
              aria-label={`${eq.name} ${t("common.details")}`}
            >
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
