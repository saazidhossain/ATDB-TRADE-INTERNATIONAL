import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/atdb/Layout";
import { useI18n } from "@/lib/i18n";
import projectRoad from "@/assets/project-road.webp";
import projectBridge from "@/assets/project-bridge.webp";
import projectPharma from "@/assets/project-pharma.webp";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — ATDB Trade International" },
      { name: "description", content: "ATDB's project portfolio: RTIP-2 Ghatail, Jamuna Bridge, BRT Airport-Gazipur, Pharma Ashia, Centeon Pharma, SMC ORS, NASSA Group." },
      { property: "og:image", content: projectBridge },
    ],
  }),
  component: ProjectsPage,
});

const PROJECTS = [
  { img: projectRoad, t: "project.rtip.t", l: "project.rtip.l", s: "project.rtip.s" },
  { img: projectBridge, t: "project.jamuna.t", l: "project.jamuna.l", s: "project.jamuna.s" },
  { img: projectPharma, t: "project.pharmaA.t", l: "project.pharmaA.l", s: "project.pharmaA.s" },
  { img: projectPharma, t: "project.centeon.t", l: "project.centeon.l", s: "project.centeon.s" },
  { img: projectRoad, t: "project.brt.t", l: "project.brt.l", s: "project.brt.s" },
  { img: projectBridge, t: "project.nassa.t", l: "project.nassa.l", s: "project.nassa.s" },
] as const;

function ProjectsPage() {
  const { t, lang } = useI18n();
  const fontClass = lang === "bn" ? "font-bn" : "font-display";

  return (
    <Layout>
      <section className="bg-iron-deep py-24 text-white">
        <div className="container-page">
          <p className={`eyebrow !text-bronze-glow ${lang === "bn" ? "font-bn" : ""}`}>{t("projects.eyebrow")}</p>
          <h1 className={`mt-2 max-w-3xl text-4xl font-bold text-white md:text-5xl ${fontClass}`}>
            {t("projects.title")}
          </h1>
          <p className={`mt-4 max-w-2xl text-white/75 ${fontClass}`}>
            {t("projects.lede")}
          </p>
        </div>
      </section>

      <section className="bg-background py-20">
        <div className="container-page grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p) => (
            <article key={p.t} className="group overflow-hidden rounded-md border border-border bg-card shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={p.img} alt={t(p.t)} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-6">
                <p className={`text-xs uppercase tracking-[0.18em] text-safety ${fontClass}`}>{t(p.l)}</p>
                <h2 className={`mt-1.5 text-lg font-semibold text-iron ${fontClass}`}>{t(p.t)}</h2>
                <p className={`mt-2 text-sm text-muted-foreground ${fontClass}`}>{t(p.s)}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}
