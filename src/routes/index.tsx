import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, Zap, Wrench, BadgeCheck } from "lucide-react";
import { Layout } from "@/components/atdb/Layout";
import { EquipmentCard } from "@/components/atdb/EquipmentCard";
import {
  CATEGORIES,
  COMPANY,
  FEATURED,
  buildWhatsappGenericLink,
} from "@/lib/atdb-data";
import { useI18n } from "@/lib/i18n";
import heroImg from "@/assets/brand/atdb-hero-monument.webp";
import projectRoad from "@/assets/project-road.webp";
import projectBridge from "@/assets/project-bridge.webp";
import projectPharma from "@/assets/project-pharma.webp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ATDB Trade International — Heavy Equipment Rental in Bangladesh" },
      {
        name: "description",
        content:
          "Bangladesh's premier heavy equipment rental partner since 2000. Cranes, road rollers, excavators, and support equipment. Instant WhatsApp quotation.",
      },
      { property: "og:title", content: "ATDB Trade International — Heavy Equipment Rental" },
      {
        property: "og:description",
        content:
          "26 years of certified fleet operations across Bangladesh. Liebherr, Kato, Sakai, CAT, Komatsu, JCB, CASE.",
      },
      { property: "og:image", content: heroImg },
      { name: "twitter:image", content: heroImg },
    ],
  }),
  component: Index,
});

const PROJECTS = [
  { img: projectRoad, label: "RTIP-2 · Ghatail, Tangail" },
  { img: projectBridge, label: "Jamuna Bridge Approach" },
  { img: projectPharma, label: "Pharma Ashia · Centeon Pharma" },
];

function Index() {
  const { t, lang } = useI18n();
  const fontClass = lang === "bn" ? "font-bn" : "font-display";

  const PILLARS = [
    { icon: ShieldCheck, title: t("pillar.fleet.t"), desc: t("pillar.fleet.d") },
    { icon: BadgeCheck, title: t("pillar.safety.t"), desc: t("pillar.safety.d") },
    { icon: Zap, title: t("pillar.whatsapp.t"), desc: t("pillar.whatsapp.d") },
    { icon: Wrench, title: t("pillar.pricing.t"), desc: t("pillar.pricing.d") },
  ];

  return (
    <Layout>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-iron-deep text-white">
        <img
          src={heroImg}
          alt="Liebherr LTM mobile crane on a Bangladesh construction site at dawn"
          width={1920}
          height={1280}
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-65"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,oklch(0.18_0.018_240/0.55)_0%,oklch(0.18_0.018_240/0.92)_100%)]" />
        <div className="container-page flex min-h-[88vh] flex-col justify-end pb-20 pt-32 md:min-h-[92vh] md:pb-28">
          <p className={`eyebrow !text-bronze-glow ${lang === "bn" ? "font-bn" : ""}`}>{t("home.eyebrow")}</p>
          <h1 className={`mt-4 max-w-4xl text-4xl font-bold leading-[1.05] text-balance text-white md:text-6xl lg:text-7xl ${fontClass}`}>
            {t("home.hero.title.a")} <span className="text-safety">{t("home.hero.title.b")}</span> {t("home.hero.title.c")}
          </h1>
          <p className={`mt-6 max-w-xl text-base leading-relaxed text-white/80 md:text-lg ${fontClass}`}>
            {t("home.hero.sub")}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/equipment"
              className={`inline-flex items-center gap-2 rounded-sm bg-gradient-safety px-7 py-4 text-sm font-semibold uppercase tracking-wider text-white shadow-cta transition-transform hover:-translate-y-px ${fontClass}`}
            >
              {t("home.hero.cta.browse")} <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={buildWhatsappGenericLink()}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 rounded-sm border-2 border-white/80 px-7 py-4 text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-white hover:text-iron ${fontClass}`}
            >
              {t("home.hero.cta.whatsapp")}
            </a>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="bg-iron text-white">
        <div className="container-page grid grid-cols-2 gap-y-8 py-10 md:grid-cols-4">
          {[
            { n: `${COMPANY.yearsOperating}+`, l: t("stats.years") },
            { n: "30+", l: t("stats.equipment") },
            { n: `${COMPANY.staff}`, l: t("stats.staff") },
            { n: "2", l: t("stats.offices") },
          ].map((s) => (
            <div key={s.l} className="border-l-2 border-bronze pl-5">
              <p className="font-display text-4xl font-bold text-white md:text-5xl">{s.n}</p>
              <p className={`mt-1 text-xs font-medium uppercase tracking-[0.18em] text-white/70 ${fontClass}`}>{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="bg-background py-20 md:py-28">
        <div className="container-page">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className={`eyebrow ${lang === "bn" ? "font-bn" : ""}`}>{t("home.cat.eyebrow")}</p>
              <h2 className={`mt-2 text-3xl font-bold text-iron md:text-4xl ${fontClass}`}>
                {t("home.cat.title")}
              </h2>
            </div>
            <Link to="/equipment" className={`hidden items-center gap-1 text-sm font-semibold text-safety hover:text-safety-deep md:inline-flex ${fontClass}`}>
              {t("common.viewAll")} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {Object.values(CATEGORIES).map((c) => (
              <Link
                key={c.slug}
                to="/equipment/$category"
                params={{ category: c.slug }}
                className="group relative isolate flex aspect-[3/4] flex-col justify-end overflow-hidden rounded-md border-safety-top shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover"
              >
                <img src={c.image} alt={c.label} loading="lazy" className="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-iron-deep via-iron-deep/70 to-transparent" />
                <div className="p-6 text-white">
                  <p className="font-bn text-sm text-bronze-glow">{c.label_bn}</p>
                  <h3 className="mt-1 font-display text-xl font-bold text-white">{c.label}</h3>
                  <p className="mt-1 text-xs text-white/75">{c.tagline}</p>
                  <span className={`mt-4 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-safety transition-transform group-hover:translate-x-1 ${fontClass}`}>
                    {t("common.explore")} <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="bg-muted/40 py-20 md:py-28">
        <div className="container-page">
          <p className={`eyebrow ${lang === "bn" ? "font-bn" : ""}`}>{t("home.featured.eyebrow")}</p>
          <h2 className={`mt-2 max-w-2xl text-3xl font-bold text-iron md:text-4xl ${fontClass}`}>
            {t("home.featured.title")}
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURED.map((eq) => (
              <EquipmentCard key={eq.id} eq={eq} />
            ))}
          </div>
        </div>
      </section>

      {/* WHY ATDB */}
      <section className="bg-background py-20 md:py-28">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
            <div>
              <p className={`eyebrow ${lang === "bn" ? "font-bn" : ""}`}>{t("home.why.eyebrow")}</p>
              <h2 className={`mt-2 text-3xl font-bold text-iron md:text-4xl ${fontClass}`}>
                {t("home.why.title")}
              </h2>
              <p className={`mt-4 text-base text-muted-foreground ${fontClass}`}>
                {t("home.why.body")}
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {PILLARS.map((p) => (
                <div key={p.title} className="rounded-md border border-border bg-card p-6 shadow-card">
                  <div className="grid h-11 w-11 place-items-center rounded-sm bg-gradient-safety text-white">
                    <p.icon className="h-5 w-5" />
                  </div>
                  <h3 className={`mt-4 text-lg font-semibold text-iron ${fontClass}`}>{p.title}</h3>
                  <p className={`mt-2 text-sm leading-relaxed text-muted-foreground ${fontClass}`}>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS STRIP */}
      <section className="bg-iron-deep py-20 text-white md:py-28">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className={`eyebrow !text-bronze-glow ${lang === "bn" ? "font-bn" : ""}`}>{t("home.projects.eyebrow")}</p>
              <h2 className={`mt-2 text-3xl font-bold text-white md:text-4xl ${fontClass}`}>
                {t("home.projects.title")}
              </h2>
            </div>
            <Link to="/projects" className={`inline-flex items-center gap-1 text-sm font-semibold text-safety hover:text-bronze-glow ${fontClass}`}>
              {t("home.projects.viewAll")} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {PROJECTS.map((p) => (
              <figure key={p.label} className="group relative aspect-[4/5] overflow-hidden rounded-md">
                <img src={p.img} alt={p.label} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-iron-deep/95 via-iron-deep/30 to-transparent" />
                <figcaption className="absolute bottom-0 left-0 right-0 p-5 font-display text-sm font-semibold text-white">
                  {p.label}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-safety py-16 text-white">
        <div className="container-page flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className={`text-3xl font-bold text-white md:text-4xl ${fontClass}`}>
              {t("home.cta.title")}
            </h2>
            <p className={`mt-2 max-w-xl text-white/90 ${fontClass}`}>
              {t("home.cta.body")}
            </p>
          </div>
          <a
            href={buildWhatsappGenericLink()}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 rounded-sm bg-iron-deep px-7 py-4 text-sm font-semibold uppercase tracking-wider text-white transition-transform hover:-translate-y-px ${fontClass}`}
          >
            {t("home.cta.button")} <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </Layout>
  );
}
