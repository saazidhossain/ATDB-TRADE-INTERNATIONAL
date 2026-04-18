import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { Equipment } from "@/lib/atdb-data";
import { buildWhatsappRentLink } from "@/lib/atdb-data";

export function EquipmentCard({ eq }: { eq: Equipment }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-md border border-border bg-card border-safety-top shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={eq.image}
          alt={eq.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-sm bg-iron/85 px-2 py-1 font-display text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur">
          {eq.brand}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="font-display text-[11px] font-semibold uppercase tracking-[0.18em] text-safety">{eq.id}</p>
        <h3 className="mt-1.5 font-display text-lg font-semibold text-iron">{eq.name}</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          {eq.capacity} · {eq.origin}
          {eq.year ? ` · ${eq.year}` : ""}
        </p>
        <div className="mt-5 flex items-center gap-2">
          <a
            href={buildWhatsappRentLink(eq)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-sm bg-gradient-safety px-3 py-2.5 font-display text-xs font-semibold uppercase tracking-wider text-white transition-transform hover:-translate-y-px"
          >
            Rent Now
          </a>
          <Link
            to="/equipment/$category"
            params={{ category: eq.category }}
            className="inline-flex items-center justify-center gap-1 rounded-sm border border-iron/20 px-3 py-2.5 font-display text-xs font-semibold uppercase tracking-wider text-iron transition-colors hover:border-iron hover:bg-iron hover:text-white"
          >
            Details <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
