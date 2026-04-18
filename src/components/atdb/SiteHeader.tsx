import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import logo from "@/assets/logo-atdb.png";
import { COMPANY, buildWhatsappGenericLink } from "@/lib/atdb-data";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/equipment", label: "Equipment" },
  { to: "/projects", label: "Projects" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container-page flex h-16 items-center justify-between gap-4 md:h-20">
        <Link to="/" className="flex items-center gap-3" aria-label="ATDB home">
          <img src={logo} alt="ATDB Trade International" className="h-10 w-10 rounded-full object-cover ring-2 ring-bronze/40 md:h-12 md:w-12" />
          <div className="hidden flex-col leading-tight sm:flex">
            <span className="font-display text-sm font-bold tracking-wide text-iron">ATDB</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Trade International</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="font-display text-sm font-medium text-iron/80 transition-colors hover:text-safety"
              activeProps={{ className: "text-safety" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${COMPANY.phones[0].number}`}
            className="hidden items-center gap-2 rounded-sm border border-iron/15 px-3 py-2 font-display text-xs font-semibold text-iron transition-colors hover:border-safety hover:text-safety lg:inline-flex"
          >
            <Phone className="h-3.5 w-3.5" />
            {COMPANY.phones[0].number}
          </a>
          <a
            href={buildWhatsappGenericLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-sm bg-gradient-safety px-4 py-2.5 font-display text-sm font-semibold text-white shadow-cta transition-transform hover:-translate-y-px md:inline-flex"
          >
            Get Quote
          </a>
          <button
            className="grid h-10 w-10 place-items-center rounded-sm border border-border md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="container-page flex flex-col py-4" aria-label="Mobile">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="border-b border-border/60 py-3 font-display text-sm font-medium text-iron"
                activeProps={{ className: "text-safety" }}
              >
                {n.label}
              </Link>
            ))}
            <a
              href={buildWhatsappGenericLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex justify-center rounded-sm bg-gradient-safety px-4 py-3 font-display text-sm font-semibold text-white"
            >
              Get WhatsApp Quote
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
