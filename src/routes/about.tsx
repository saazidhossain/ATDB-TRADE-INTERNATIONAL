import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/atdb/Layout";
import { COMPANY } from "@/lib/atdb-data";
import { ShieldCheck, FileCheck, Building2, Leaf } from "lucide-react";
import { useI18n, useFontClass } from "@/lib/i18n";
import aboutOg from "@/assets/brand/atdb-hero-monument.webp";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About ATDB — 26 Years of Heavy Equipment Excellence in Bangladesh" },
      { name: "description", content: "Founded in 2000, ATDB Trade International is a 1st Class government-approved contractor and heavy equipment supplier with offices in Dhaka and Tangail." },
      { property: "og:title", content: "About ATDB Trade International" },
      { property: "og:description", content: "26 years building Bangladesh — certified fleet, 25 staff, 2 offices, government-compliant." },
      { property: "og:image", content: aboutOg },
      { name: "twitter:image", content: aboutOg },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { t, lang } = useI18n();
  const fontClass = useFontClass();
  const fontClassEyebrow = useFontClass({ eyebrow: true });

  const VALUES = [
    { icon: ShieldCheck, t: t("about.value.safety.t"), d: t("about.value.safety.d") },
    { icon: FileCheck, t: t("about.value.compliance.t"), d: t("about.value.compliance.d") },
    { icon: Building2, t: t("about.value.reliability.t"), d: t("about.value.reliability.d") },
    { icon: Leaf, t: t("about.value.responsibility.t"), d: t("about.value.responsibility.d") },
  ];

  const CREDENTIALS: Array<[string, string]> = [
    [t("about.cred.inspection"), t("spec.val.cis")],
    [t("about.cred.class"), t("about.cred.classV")],
  ];

  return (
    <Layout>
      <section className="bg-iron-deep py-24 text-white">
        <div className="container-page">
          <p className={`eyebrow !text-bronze-glow ${fontClassEyebrow}`}>{t("about.eyebrow")}</p>
          <h1 className={`mt-2 max-w-3xl text-4xl font-bold text-white md:text-5xl ${fontClass}`}>
            {t("about.title")}
          </h1>
          <p className={`mt-5 max-w-2xl text-lg text-white/80 ${fontClass}`}>
            {t("about.lede")}
          </p>
        </div>
      </section>

      <section className="bg-background py-20">
        <div className="container-page grid gap-12 lg:grid-cols-2">
          <div>
            <p className={`eyebrow ${fontClassEyebrow}`}>{t("about.leadership")}</p>
            <h2 className={`mt-2 text-3xl font-bold text-iron ${fontClass}`}>{t("about.leadership.title")}</h2>
            <div className="mt-8 space-y-6">
              <div className="rounded-md border border-border glass-card p-6 shadow-card border-safety-top">
                <p className={`text-xs uppercase tracking-[0.18em] text-muted-foreground ${fontClass}`}>{t("about.role.proprietor")}</p>
                <p className="mt-1 font-display text-xl font-semibold text-iron">{COMPANY.proprietor}</p>
              </div>
              <div className="rounded-md border border-border glass-card p-6 shadow-card border-safety-top">
                <p className={`text-xs uppercase tracking-[0.18em] text-muted-foreground ${fontClass}`}>{t("about.role.ceo")}</p>
                <p className="mt-1 font-display text-xl font-semibold text-iron">{COMPANY.ceo}</p>
              </div>
            </div>
          </div>
          <div>
            <p className={`eyebrow ${fontClassEyebrow}`}>{t("about.credentials")}</p>
            <h2 className={`mt-2 text-3xl font-bold text-iron ${fontClass}`}>{t("about.credentials.title")}</h2>
            <dl className="mt-8 divide-y divide-border rounded-md border border-border glass-card shadow-card">
              {CREDENTIALS.map(([k, v]) => (
                <div key={k} className="flex items-start justify-between gap-6 px-6 py-4">
                  <dt className={`text-sm font-medium text-muted-foreground ${fontClass}`}>{k}</dt>
                  <dd className={`text-right text-sm font-semibold text-iron ${fontClass}`}>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="bg-muted/40 py-20">
        <div className="container-page">
          <p className={`eyebrow ${fontClassEyebrow}`}>{t("about.values")}</p>
          <h2 className={`mt-2 max-w-2xl text-3xl font-bold text-iron md:text-4xl ${fontClass}`}>
            {t("about.values.title")}
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v) => (
              <div
                key={v.t}
                className="group relative overflow-hidden rounded-md border border-border glass-card p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-safety/40 hover:shadow-cta"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute -inset-px rounded-md opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-70"
                  style={{
                    background:
                      "conic-gradient(from 180deg at 50% 50%, rgba(245,124,0,0.45), rgba(212,162,77,0.35), rgba(245,124,0,0.45))",
                  }}
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
                />
                <div className="relative grid h-11 w-11 place-items-center overflow-hidden rounded-sm border border-iron/15 bg-white/40 backdrop-blur-md backdrop-saturate-150 transition-colors group-hover:border-safety/50">
                  <span
                    className="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-[hsl(24,94%,53%)] to-[hsl(20,90%,42%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.28),0_2px_8px_rgba(245,124,0,0.45)] ring-1 ring-white/30 transition-transform duration-300 group-hover:rotate-[10deg]"
                  >
                    <v.icon className="h-4 w-4 text-white" strokeWidth={2.2} />
                  </span>
                </div>
                <h3 className={`relative mt-4 text-lg font-semibold text-iron transition-colors group-hover:text-safety ${fontClass}`}>{v.t}</h3>
                <p className={`relative mt-2 text-sm text-muted-foreground ${fontClass}`}>{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
