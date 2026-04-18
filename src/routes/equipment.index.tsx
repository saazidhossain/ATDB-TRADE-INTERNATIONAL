import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Layout } from "@/components/atdb/Layout";
import { CATEGORIES, FLEET } from "@/lib/atdb-data";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/equipment/")({
  head: () => ({
    meta: [
      { title: "Equipment Fleet — ATDB Trade International" },
      {
        name: "description",
        content: "Browse ATDB's complete heavy equipment fleet: 7 mobile cranes, 9 road rollers, 6 excavators, plus support equipment. Liebherr, Kato, Sakai, CAT, Komatsu, JCB, CASE.",
      },
      { property: "og:title", content: "Equipment Fleet — ATDB Trade International" },
      { property: "og:description", content: "30+ certified heavy machines across cranes, rollers, excavators and support equipment." },
    ],
  }),
  component: EquipmentIndex,
});

function EquipmentIndex() {
  const { t, lang } = useI18n();
  const fontClass = lang === "bn" ? "font-bn" : "font-display";
  return (
    <Layout>
      <section className="bg-iron-deep py-20 text-white">
        <div className="container-page">
          <p className={`eyebrow !text-bronze-glow ${lang === "bn" ? "font-bn" : ""}`}>{t("eq.eyebrow")}</p>
          <h1 className={`mt-2 max-w-3xl text-4xl font-bold text-white md:text-5xl ${fontClass}`}>
            {t("eq.title")}
          </h1>
          <p className={`mt-4 max-w-2xl text-white/80 ${fontClass}`}>
            {t("eq.sub")}
          </p>
        </div>
      </section>

      <section className="bg-background py-20">
        <div className="container-page grid gap-8 md:grid-cols-2">
          {Object.values(CATEGORIES).map((c) => {
            const count = FLEET.filter((f) => f.category === c.slug).length;
            return (
              <Link
                key={c.slug}
                to="/equipment/$category"
                params={{ category: c.slug }}
                className="group relative isolate flex aspect-[16/10] flex-col justify-end overflow-hidden rounded-md border-safety-top shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover"
              >
                <img src={c.image} alt={c.label} loading="lazy" className="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-iron-deep via-iron-deep/70 to-transparent" />
                <div className="p-6 text-white md:p-8">
                  <p className="font-bn text-sm text-bronze-glow">{c.label_bn}</p>
                  <h2 className="mt-1 font-display text-2xl font-bold text-white md:text-3xl">{c.label}</h2>
                  <p className="mt-1 text-sm text-white/80">{count} {t("common.units")} · {c.tagline}</p>
                  <span className={`mt-4 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-safety ${fontClass}`}>
                    {t("common.exploreCategory")} <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </Layout>
  );
}
