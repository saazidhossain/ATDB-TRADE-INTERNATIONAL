import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/atdb/Layout";
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
  { img: projectRoad, title: "RTIP-2 Road Project", location: "Ghatail, Tangail", scope: "Road compaction & asphalt works — multi-month roller deployment." },
  { img: projectBridge, title: "Jamuna Multipurpose Bridge", location: "Tangail / Sirajganj", scope: "Heavy crane deployment for steel girder placement and approach works." },
  { img: projectPharma, title: "Pharma Ashia Facility", location: "Dhaka", scope: "Site preparation, foundation excavation, and structural support equipment." },
  { img: projectPharma, title: "Centeon Pharma Plant", location: "Dhaka", scope: "Earthworks and material handling across the build-out phase." },
  { img: projectRoad, title: "BRT Airport–Gazipur", location: "Dhaka–Gazipur Corridor", scope: "Compaction fleet for elevated corridor pavement works." },
  { img: projectBridge, title: "NASSA Group Industrial Build", location: "Dhaka", scope: "Crane and excavator support for industrial expansion." },
];

function ProjectsPage() {
  return (
    <Layout>
      <section className="bg-iron-deep py-24 text-white">
        <div className="container-page">
          <p className="eyebrow !text-bronze-glow">Project Portfolio</p>
          <h1 className="mt-2 max-w-3xl font-display text-4xl font-bold text-white md:text-5xl">
            Powering national infrastructure & industrial development.
          </h1>
          <p className="mt-4 max-w-2xl text-white/75">
            From flagship national bridges to multi-month road compaction and pharma site builds — selected engagements from our 26-year track record.
          </p>
        </div>
      </section>

      <section className="bg-background py-20">
        <div className="container-page grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p) => (
            <article key={p.title} className="group overflow-hidden rounded-md border border-border bg-card shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={p.img} alt={p.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-6">
                <p className="text-xs uppercase tracking-[0.18em] text-safety">{p.location}</p>
                <h2 className="mt-1.5 font-display text-lg font-semibold text-iron">{p.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{p.scope}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}
