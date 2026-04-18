import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin } from "lucide-react";
import logo from "@/assets/logo-atdb.png";
import { COMPANY } from "@/lib/atdb-data";

export function SiteFooter() {
  return (
    <footer className="bg-gradient-iron text-white/85">
      <div className="container-page grid gap-12 py-16 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="flex items-center gap-3">
            <img src={logo} alt="" className="h-12 w-12 rounded-full ring-2 ring-bronze/50" />
            <div>
              <p className="font-display text-base font-bold text-white">ATDB</p>
              <p className="text-[11px] uppercase tracking-[0.2em] text-bronze-glow">Trade International</p>
            </div>
          </div>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/65">
            Bangladesh's premier heavy equipment rental partner. Since {COMPANY.founded}.
          </p>
          <p className="mt-4 text-xs text-white/50">TIN {COMPANY.tin} · VAT {COMPANY.vat}</p>
        </div>

        <div>
          <h4 className="eyebrow !text-bronze-glow">Explore</h4>
          <ul className="mt-4 space-y-2 text-sm">
            {[
              { to: "/equipment", l: "Equipment" },
              { to: "/projects", l: "Projects" },
              { to: "/about", l: "About" },
              { to: "/contact", l: "Contact" },
            ].map((i) => (
              <li key={i.to}>
                <Link to={i.to} className="text-white/75 transition-colors hover:text-safety">
                  {i.l}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="eyebrow !text-bronze-glow">Offices</h4>
          <ul className="mt-4 space-y-4 text-sm text-white/75">
            {COMPANY.offices.map((o) => (
              <li key={o.city} className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-bronze-glow" />
                <div>
                  <p className="font-display text-sm font-semibold text-white">{o.label}</p>
                  <p className="text-xs leading-relaxed">{o.address}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="eyebrow !text-bronze-glow">Contact</h4>
          <ul className="mt-4 space-y-3 text-sm text-white/75">
            {COMPANY.phones.map((p) => (
              <li key={p.number}>
                <a href={`tel:${p.number}`} className="flex items-center gap-2 hover:text-safety">
                  <Phone className="h-4 w-4 text-bronze-glow" /> {p.number}
                  <span className="text-xs text-white/45">· {p.label}</span>
                </a>
              </li>
            ))}
            <li>
              <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-2 hover:text-safety">
                <Mail className="h-4 w-4 text-bronze-glow" /> {COMPANY.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-start justify-between gap-2 py-5 text-xs text-white/50 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} {COMPANY.name}. All rights reserved.</p>
          <p>Bank: {COMPANY.bank}</p>
        </div>
      </div>
    </footer>
  );
}
