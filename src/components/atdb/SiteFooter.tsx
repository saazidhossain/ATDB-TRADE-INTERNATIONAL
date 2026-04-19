import { Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import logo from "@/assets/brand/atdb-logo-dark.webp";
import { COMPANY, buildWhatsappGenericLink } from "@/lib/atdb-data";
import { useI18n } from "@/lib/i18n";
import { FacebookLink } from "./FacebookLink";
import { WhatsappButton } from "./WhatsappButton";
import { ContactChannelButton } from "./ContactChannelButton";

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
          {/* Unified social/contact channel stack — all four channels equal */}
          <ul className="mt-4 space-y-2.5">
            {COMPANY.phones.map((p) => (
              <li key={p.number}>
                <ContactChannelButton
                  channel="phone"
                  href={`tel:${p.number}`}
                  variant="footer"
                  sublabel={p.label === "Proprietor" ? t("phone.proprietor") : t("phone.ceo")}
                >
                  {p.number}
                </ContactChannelButton>
              </li>
            ))}
            <li>
              <ContactChannelButton
                channel="email"
                href={`mailto:${COMPANY.email}`}
                variant="footer"
              >
                {COMPANY.email}
              </ContactChannelButton>
            </li>
            <li>
              <WhatsappButton
                href={buildWhatsappGenericLink(undefined, lang)}
                variant="ctaDark"
                fullWidth
                className="!py-2.5 !text-xs !normal-case !tracking-normal"
              >
                {t("nav.whatsappQuote")}
              </WhatsappButton>
            </li>
            <li>
              <FacebookLink variant="footer" className="w-full justify-start" />
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-start justify-between gap-3 py-5 text-xs text-white/50 md:flex-row md:items-center">
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
          <p className={fontClass}>{t("footer.bank")}: {COMPANY.bank}</p>
        </div>
      </div>
    </footer>
  );
}
