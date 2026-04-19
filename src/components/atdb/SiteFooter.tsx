import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Facebook } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import logo from "@/assets/brand/atdb-logo-dark.webp";
import { COMPANY, buildWhatsappGenericLink } from "@/lib/atdb-data";
import { useI18n } from "@/lib/i18n";

export function SiteFooter() {
  const { t, lang } = useI18n();
  const fontClass = lang === "bn" ? "font-bn" : "font-display";

  // Render year only after hydration to avoid SSR/client mismatch.
  const [year, setYear] = useState<number | null>(null);
  useEffect(() => setYear(new Date().getFullYear()), []);

  const links = [
    { to: "/equipment" as const, l: t("nav.equipment") },
    { to: "/projects" as const, l: t("nav.projects") },
    { to: "/about" as const, l: t("nav.about") },
    { to: "/contact" as const, l: t("nav.contact") },
  ];

  // Localised office labels
  const officeFor = (city: string) => {
    if (city === "Dhaka") return { label: t("office.corporate"), city: t("office.dhaka"), addr: t("office.dhaka.address") };
    return { label: t("office.branch"), city: t("office.tangail"), addr: t("office.tangail.address") };
  };

  return (
    <footer className="bg-gradient-iron text-white/85">
      <div className="container-page grid gap-12 py-16 md:grid-cols-4">
        <div className="md:col-span-1">
          <img src={logo} alt="ATDB Trade International" width={220} height={64} className="h-14 w-auto object-contain" />
          <p className={`mt-5 max-w-xs text-sm leading-relaxed text-white/65 ${fontClass}`}>
            {t("footer.tagline")}
          </p>
          <p className="mt-4 text-xs text-white/50">TIN {COMPANY.tin} · VAT {COMPANY.vat}</p>
        </div>

        <div>
          <h4 className="eyebrow !text-bronze-glow">{t("footer.explore")}</h4>
          <ul className="mt-4 space-y-2 text-sm">
            {links.map((i) => (
              <li key={i.to}>
                <Link to={i.to} className={`text-white/75 transition-colors hover:text-safety ${fontClass}`}>
                  {i.l}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="eyebrow !text-bronze-glow">{t("footer.offices")}</h4>
          <ul className="mt-4 space-y-4 text-sm text-white/75">
            {COMPANY.offices.map((o) => {
              const loc = officeFor(o.city);
              return (
                <li key={o.city} className="flex gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-bronze-glow" />
                  <div>
                    <p className={`text-sm font-semibold text-white ${fontClass}`}>{loc.label}</p>
                    <p className={`text-xs leading-relaxed ${fontClass}`}>{loc.addr}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          <h4 className="eyebrow !text-bronze-glow">{t("footer.contact")}</h4>
          {/* Minimal: primary phone + email as plain links, channel orbs as a tight icon row */}
          <ul className={`mt-4 space-y-2 text-sm text-white/75 ${fontClass}`}>
            <li>
              <a
                href={`tel:${COMPANY.phones[0].number}`}
                className="transition-colors hover:text-safety"
              >
                {COMPANY.phones[0].number}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${COMPANY.email}`}
                className="break-all transition-colors hover:text-safety"
              >
                {COMPANY.email}
              </a>
            </li>
          </ul>

          {/* Compact channel icon row — same glass treatment as header, dark surface */}
          <div className="mt-5 flex items-center gap-2">
            <ChannelIcon
              href={`tel:${COMPANY.phones[0].number}`}
              ariaLabel={`Call ${COMPANY.phones[0].number}`}
              accent="safety"
            >
              <PhoneGlyph />
            </ChannelIcon>
            <ChannelIcon
              href={`mailto:${COMPANY.email}`}
              ariaLabel={`Email ${COMPANY.email}`}
              accent="bronze"
            >
              <MailGlyph />
            </ChannelIcon>
            <ChannelIcon
              href={buildWhatsappGenericLink(undefined, lang)}
              ariaLabel="Chat on WhatsApp"
              accent="whatsapp"
              external
            >
              <WaGlyphSm />
            </ChannelIcon>
            <ChannelIcon
              href={COMPANY.facebook}
              ariaLabel="Visit ATDB on Facebook"
              accent="facebook"
              external
            >
              <FbGlyph />
            </ChannelIcon>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-start justify-between gap-2 py-5 text-xs text-white/50 md:flex-row md:items-center">
          <p className={fontClass}>
            © {year ?? "—"} {COMPANY.name}. {t("footer.rights")}
          </p>
          <p className={fontClass}>
            <a
              href="https://behance.net/saazidhossain"
              target="_blank"
              rel="noopener noreferrer author"
              className="font-semibold tracking-[0.14em] text-bronze-glow transition-colors hover:text-safety"
              title="Sazid Hossain — Architect & Designer · Behance portfolio"
            >
              {t("footer.credit")}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

// ── Minimal channel-icon orb (footer + cross-channel use) ─────────────
type Accent = "safety" | "bronze" | "whatsapp" | "facebook";

const ACCENT_MAP: Record<Accent, { orb: string; ring: string; halo: string }> = {
  safety: {
    orb: "bg-gradient-to-br from-[hsl(24,94%,53%)] to-[hsl(20,90%,42%)]",
    ring: "hover:border-safety/60",
    halo:
      "conic-gradient(from 180deg at 50% 50%, rgba(245,124,0,0.55), rgba(212,162,77,0.4), rgba(245,124,0,0.55))",
  },
  bronze: {
    orb: "bg-gradient-to-br from-[hsl(36,55%,57%)] to-[hsl(28,40%,30%)]",
    ring: "hover:border-bronze-glow/60",
    halo:
      "conic-gradient(from 180deg at 50% 50%, rgba(212,162,77,0.6), rgba(245,124,0,0.4), rgba(212,162,77,0.6))",
  },
  whatsapp: {
    orb: "bg-gradient-to-br from-[#25D366] to-[#0e8a3e]",
    ring: "hover:border-[#25D366]/60",
    halo:
      "conic-gradient(from 180deg at 50% 50%, rgba(37,211,102,0.55), rgba(245,124,0,0.4), rgba(37,211,102,0.55))",
  },
  facebook: {
    orb: "bg-gradient-to-br from-[#1877F2] to-[#0c5dc7]",
    ring: "hover:border-[#1877F2]/60",
    halo:
      "conic-gradient(from 180deg at 50% 50%, rgba(24,119,242,0.55), rgba(245,124,0,0.4), rgba(24,119,242,0.55))",
  },
};

function ChannelIcon({
  href,
  ariaLabel,
  accent,
  external,
  children,
}: {
  href: string;
  ariaLabel: string;
  accent: Accent;
  external?: boolean;
  children: ReactNode;
}) {
  const a = ACCENT_MAP[accent];
  return (
    <motion.a
      href={href}
      aria-label={ariaLabel}
      title={ariaLabel}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      whileHover={{ y: -2, scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      transition={{ type: "spring", stiffness: 320, damping: 20 }}
      className={`group relative grid h-10 w-10 place-items-center overflow-hidden rounded-sm border border-white/15 bg-white/5 backdrop-blur-md backdrop-saturate-150 transition-colors ${a.ring} hover:bg-white/10`}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-sm opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: a.halo }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
      />
      <span
        className={`relative grid h-7 w-7 place-items-center rounded-full ${a.orb} shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] ring-1 ring-white/25 transition-transform duration-300 group-hover:rotate-[10deg]`}
      >
        {children}
      </span>
    </motion.a>
  );
}

function PhoneGlyph() {
  return <Phone className="h-3.5 w-3.5 text-white" strokeWidth={2.4} />;
}
function MailGlyph() {
  return <Mail className="h-3.5 w-3.5 text-white" strokeWidth={2.4} />;
}
function FbGlyph() {
  return <Facebook className="h-3.5 w-3.5 fill-white text-white" strokeWidth={0} />;
}
function WaGlyphSm() {
  return (
    <svg viewBox="0 0 32 32" className="h-3.5 w-3.5 fill-white" aria-hidden="true">
      <path d="M19.11 17.32c-.27-.13-1.59-.78-1.84-.87-.25-.09-.43-.13-.61.13-.18.27-.7.87-.85 1.05-.16.18-.31.2-.58.07-.27-.13-1.13-.42-2.16-1.34-.8-.71-1.34-1.6-1.49-1.86-.16-.27-.02-.41.12-.55.12-.12.27-.31.4-.46.13-.16.18-.27.27-.45.09-.18.04-.34-.02-.47-.07-.13-.61-1.46-.83-2-.22-.53-.45-.46-.62-.47l-.53-.01a1.02 1.02 0 0 0-.74.34c-.25.27-.96.94-.96 2.29 0 1.35.99 2.66 1.13 2.84.13.18 1.95 2.98 4.72 4.18.66.28 1.18.45 1.58.58.66.21 1.27.18 1.74.11.53-.08 1.59-.65 1.81-1.27.22-.62.22-1.16.16-1.27-.07-.11-.25-.18-.52-.31zM16.06 5.33c-5.91 0-10.71 4.8-10.71 10.7 0 1.89.5 3.74 1.45 5.36L5 27l5.78-1.51a10.7 10.7 0 0 0 5.28 1.36h.01c5.9 0 10.7-4.8 10.7-10.71 0-2.86-1.11-5.55-3.13-7.57a10.65 10.65 0 0 0-7.58-3.24z" />
    </svg>
  );
}
