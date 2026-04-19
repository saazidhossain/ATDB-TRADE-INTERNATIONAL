import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/atdb/Layout";
import { COMPANY } from "@/lib/atdb-data";
import { ShieldCheck, FileCheck, Building2, Leaf } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About ATDB — 26 Years of Heavy Equipment Excellence in Bangladesh" },
      { name: "description", content: "Founded in 2000, ATDB Trade International is a 1st Class government-approved contractor and heavy equipment supplier with offices in Dhaka and Tangail." },
      { property: "og:title", content: "About ATDB Trade International" },
      { property: "og:description", content: "26 years building Bangladesh — certified fleet, 25 staff, 2 offices, government-compliant." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { t, lang } = useI18n();
  const fontClass = lang === "bn" ? "font-bn" : "font-display";

  const VALUES = [
    { icon: ShieldCheck, t: t("about.value.safety.t"), d: t("about.value.safety.d") },
    { icon: FileCheck, t: t("about.value.compliance.t"), d: t("about.value.compliance.d") },
    { icon: Building2, t: t("about.value.reliability.t"), d: t("about.value.reliability.d") },
    { icon: Leaf, t: t("about.value.responsibility.t"), d: t("about.value.responsibility.d") },
  ];

  const CREDENTIALS: Array<[string, string]> = [
    [t("about.cred.tin"), COMPANY.tin],
    [t("about.cred.vat"), COMPANY.vat],
    [t("about.cred.inspection"), t("spec.val.cis")],
    [t("about.cred.class"), t("about.cred.classV")],
  ];

  return (
    <Layout>
      <section className="bg-iron-deep py-24 text-white">
        <div className="container-page">
          <p className={`eyebrow !text-bronze-glow ${lang === "bn" ? "font-bn" : ""}`}>{t("about.eyebrow")}</p>
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
            <p className={`eyebrow ${lang === "bn" ? "font-bn" : ""}`}>{t("about.leadership")}</p>
            <h2 className={`mt-2 text-3xl font-bold text-iron ${fontClass}`}>{t("about.leadership.title")}</h2>
            <div className="mt-8 space-y-6">
              <div className="rounded-md border border-border bg-card p-6 shadow-card border-safety-top">
                <p className={`text-xs uppercase tracking-[0.18em] text-muted-foreground ${fontClass}`}>{t("about.role.proprietor")}</p>
                <p className="mt-1 font-display text-xl font-semibold text-iron">{COMPANY.proprietor}</p>
              </div>
              <div className="rounded-md border border-border bg-card p-6 shadow-card border-safety-top">
                <p className={`text-xs uppercase tracking-[0.18em] text-muted-foreground ${fontClass}`}>{t("about.role.ceo")}</p>
                <p className="mt-1 font-display text-xl font-semibold text-iron">{COMPANY.ceo}</p>
              </div>
            </div>
          </div>
          <div>
            <p className={`eyebrow ${lang === "bn" ? "font-bn" : ""}`}>{t("about.credentials")}</p>
            <h2 className={`mt-2 text-3xl font-bold text-iron ${fontClass}`}>{t("about.credentials.title")}</h2>
            <dl className="mt-8 divide-y divide-border rounded-md border border-border bg-card shadow-card">
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
          <p className={`eyebrow ${lang === "bn" ? "font-bn" : ""}`}>{t("about.values")}</p>
          <h2 className={`mt-2 max-w-2xl text-3xl font-bold text-iron md:text-4xl ${fontClass}`}>
            {t("about.values.title")}
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v) => (
              <div key={v.t} className="rounded-md border border-border bg-card p-6 shadow-card">
                <div className="grid h-11 w-11 place-items-center rounded-sm bg-gradient-iron text-white">
                  <v.icon className="h-5 w-5" />
                </div>
                <h3 className={`mt-4 text-lg font-semibold text-iron ${fontClass}`}>{v.t}</h3>
                <p className={`mt-2 text-sm text-muted-foreground ${fontClass}`}>{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
