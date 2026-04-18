import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { Layout } from "@/components/atdb/Layout";
import { EquipmentCard } from "@/components/atdb/EquipmentCard";
import { CATEGORIES, getCategoryFleet, type EquipmentCategory } from "@/lib/atdb-data";

const validCategories = Object.keys(CATEGORIES) as EquipmentCategory[];

export const Route = createFileRoute("/equipment/$category")({
  beforeLoad: ({ params }) => {
    if (!validCategories.includes(params.category as EquipmentCategory)) {
      throw notFound();
    }
  },
  head: ({ params }) => {
    const cat = CATEGORIES[params.category as EquipmentCategory];
    if (!cat) return { meta: [{ title: "Equipment — ATDB" }] };
    return {
      meta: [
        { title: `${cat.label} — ATDB Trade International` },
        { name: "description", content: `${cat.label} for rent in Bangladesh. ${cat.tagline}. Inspection-certified, instant WhatsApp quotation.` },
        { property: "og:title", content: `${cat.label} — ATDB Trade International` },
        { property: "og:description", content: `${cat.tagline}. Get a WhatsApp quote in minutes.` },
        { property: "og:image", content: cat.image },
        { name: "twitter:image", content: cat.image },
      ],
    };
  },
  notFoundComponent: () => (
    <Layout>
      <div className="container-page py-32 text-center">
        <h1 className="font-display text-3xl font-bold text-iron">Category not found</h1>
        <Link to="/equipment" className="mt-4 inline-block text-safety hover:underline">Back to Equipment</Link>
      </div>
    </Layout>
  ),
  component: CategoryPage,
});

function CategoryPage() {
  const { category } = Route.useParams();
  const cat = CATEGORIES[category as EquipmentCategory];
  const items = getCategoryFleet(category as EquipmentCategory);

  return (
    <Layout>
      <section className="relative isolate overflow-hidden bg-iron-deep py-20 text-white md:py-24">
        <img src={cat.image} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-25" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-iron-deep/70 to-iron-deep" />
        <div className="container-page">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-xs text-white/65">
            <Link to="/" className="hover:text-safety">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link to="/equipment" className="hover:text-safety">Equipment</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-white">{cat.label}</span>
          </nav>
          <p className="eyebrow mt-4 !text-bronze-glow">{cat.label_bn}</p>
          <h1 className="mt-2 font-display text-4xl font-bold text-white md:text-5xl">{cat.label}</h1>
          <p className="mt-3 max-w-2xl text-white/75">{items.length} {`units available`} · {cat.tagline}</p>
        </div>
      </section>

      <section className="bg-muted/40 py-16 md:py-20">
        <div className="container-page grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((eq) => (
            <EquipmentCard key={eq.id} eq={eq} />
          ))}
        </div>
      </section>
    </Layout>
  );
}
