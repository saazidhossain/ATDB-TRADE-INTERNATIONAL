import { Link } from "@tanstack/react-router";
import { MapPin, Phone, Mail, Facebook, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import logo from "@/assets/brand/atdb-logo-dark.webp";
import { COMPANY, buildWhatsappGenericLink } from "@/lib/atdb-data";
import { useI18n, useFontClass } from "@/lib/i18n";

export function SiteFooter() {
  const { t, lang } = useI18n();
  const fontClass = useFontClass();

  const [year, setYear] = useState<number | null>(null);
  useEffect(() => setYear(new Date().getFullYear()), []);

  const links = [
    { to: "/equipment" as const, l: t("nav.equipment") },
    { to: "/projects" as const, l: t("nav.projects") },
    { to: "/about" as const, l: t("nav.about") },
    { to: "/contact" as const, l: t("nav.contact") },
  ];

  const officeFor = (city: string) => {
    if (city === "Dhaka") return { label: t("office.corporate"), city: t("office.dhaka"), addr: t("office.dhaka.address") };
    return { label: t("office.branch"), city: t("office.tangail"), addr: t("office.tangail.address") };
  };

  return (
    <footer className="bg-gradient-iron text-white/85">
      <div className="container-page grid grid-cols-1 gap-8 py-16 sm:grid-cols-2 md:gap-12 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <img
            src={logo}
            alt="ATDB Trade International"
            width={220}
            height={64}
            loading="lazy"
            decoding="async"
            className="h-14 w-auto object-contain mix-blend-screen"
          />
          <p className={`mt-5 max-w-xs text-sm leading-relaxed text-white/65 ${fontClass}`}>
            {t("footer.tagline")}
          </p>
          
        </div>

        <div>
          <h4 className="eyebrow !text-bronze-glow">{t("footer.explore")}</h4>
          <ul className="mt-4 space-y-2 text-sm">
            {links.map((i) => (
              <li key={i.to}>
                <Link to={i.to} className={`text-white/70 transition-colors duration-300 hover:text-white ${fontClass}`}>
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
          <ul className={`mt-4 space-y-2.5 text-sm text-white/75 ${fontClass}`}>
            <li>
              <a href={`tel:${COMPANY.phones[0].number}`} className="inline-flex items-center gap-2.5 text-white/70 transition-colors duration-300 hover:text-white">
                <Phone className="h-3.5 w-3.5 text-bronze-glow" strokeWidth={2} />
                <span>{COMPANY.phones[0].number}</span>
              </a>
            </li>
            <li>
              <a href={`mailto:${COMPANY.email}`} className="inline-flex items-center gap-2.5 break-all text-white/70 transition-colors duration-300 hover:text-white">
                <Mail className="h-3.5 w-3.5 text-bronze-glow" strokeWidth={2} />
                <span>{COMPANY.email}</span>
              </a>
            </li>
          </ul>

          <div className="mt-5 flex items-center gap-2">
            <a
              href={buildWhatsappGenericLink(undefined, lang)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className="grid h-10 w-10 place-items-center rounded-sm text-white/65 transition-all duration-300 hover:scale-110 hover:bg-white/5 hover:text-white"
            >
              <MessageCircle className="h-[18px] w-[18px]" strokeWidth={1.75} />
            </a>
            <a
              href={COMPANY.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit ATDB on Facebook"
              className="grid h-10 w-10 place-items-center rounded-sm text-white/65 transition-all duration-300 hover:scale-110 hover:bg-white/5 hover:text-white"
            >
              <Facebook className="h-[18px] w-[18px]" strokeWidth={1.75} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 pb-24 md:pb-8">
        <div className="container-page flex flex-col items-center justify-between gap-4 py-5 text-center md:flex-row md:items-center md:gap-2 md:space-y-0 md:text-left">
          <p className={fontClass}>
            <a
              href="https://behance.net/saazidhossain"
              target="_blank"
              rel="noopener noreferrer author"
              className="text-sm font-bold uppercase tracking-[0.25em] text-safety transition-colors duration-300 hover:text-white"
              title="Sazid Hossain — Architect & Designer · Behance portfolio"
            >
              {t("footer.credit")}
            </a>
          </p>
          <p className={`text-xs text-white/40 md:mr-56 lg:mr-60 ${fontClass}`}>
            © {year ?? "—"} {COMPANY.name}. {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
