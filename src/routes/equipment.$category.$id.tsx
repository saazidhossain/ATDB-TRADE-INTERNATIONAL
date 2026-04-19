import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ShieldCheck, BadgeCheck, Phone, MapPin, Calendar, Plus, Check } from "lucide-react";
import { Layout } from "@/components/atdb/Layout";
import { EquipmentCard, equipmentGridVariants } from "@/components/atdb/EquipmentCard";
import { SpecGroupsAccordion } from "@/components/atdb/SpecGroups";
import { ReviewsSection, SAMPLE_REVIEWS, reviewAggregate } from "@/components/atdb/Reviews";
import {
  CATEGORIES,
  FLEET,
  getEquipmentById,
  buildWhatsappRentLink,
  COMPANY,
  type EquipmentCategory,
} from "@/lib/atdb-data";
import { useI18n } from "@/lib/i18n";
import { useCart } from "@/lib/cart";
import detailHero from "@/assets/eq-detail-crane.webp";
import detailCabin from "@/assets/eq-detail-cabin.webp";
import detailFleet from "@/assets/eq-detail-fleet.webp";

const validCategories = Object.keys(CATEGORIES) as EquipmentCategory[];

export const Route = createFileRoute("/equipment/$category/$id")({
  beforeLoad: ({ params }) => {
    if (!validCategories.includes(params.category as EquipmentCategory)) throw notFound();
    const eq = getEquipmentById(params.id);
    if (!eq || eq.category !== params.category) throw notFound();
  },
  head: ({ params }) => {
    const eq = getEquipmentById(params.id);
    if (!eq) return { meta: [{ title: "Equipment — ATDB" }] };
    const productLd = {
      "@context": "https://schema.org",
      "@type": "Product",
      "@id": `#product-${eq.id}`,
      name: eq.name,
      sku: eq.id,
      mpn: eq.model,
      brand: { "@type": "Brand", name: eq.brand },
      manufacturer: { "@type": "Organization", name: eq.brand },
      category: CATEGORIES[eq.category].label,
      image: [eq.image],
      description: `${eq.brand} ${eq.model} (${eq.capacity}) — inspection-certified heavy equipment for rent in Bangladesh. Operator included, mobilisation arranged on request.`,
      countryOfOrigin: eq.origin,
      ...(eq.year ? { releaseDate: String(eq.year) } : {}),
      offers: {
        "@type": "Offer",
        availability: "https://schema.org/InStock",
        priceCurrency: "BDT",
        price: "0",
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: "BDT",
          description: "Daily / project-based rental. Quotation on request via WhatsApp.",
        },
        areaServed: { "@type": "Country", name: "Bangladesh" },
        seller: {
          "@type": "Organization",
          name: COMPANY.name,
          telephone: COMPANY.phones[0].number,
          email: COMPANY.email,
        },
        url: `/equipment/${eq.category}/${eq.id}`,
      },
      additionalProperty: [
        { "@type": "PropertyValue", name: "Capacity", value: eq.capacity },
        { "@type": "PropertyValue", name: "Origin", value: eq.origin },
        ...(eq.year ? [{ "@type": "PropertyValue", name: "Year", value: String(eq.year) }] : []),
        { "@type": "PropertyValue", name: "Inspection", value: "City Inspection Services CIS/077/2018" },
      ],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: reviewAggregate.rating.toFixed(1),
        reviewCount: reviewAggregate.count,
        bestRating: "5",
        worstRating: "1",
      },
      review: SAMPLE_REVIEWS.map((r) => ({
        "@type": "Review",
        reviewRating: { "@type": "Rating", ratingValue: String(r.rating), bestRating: "5" },
        author: { "@type": "Person", name: r.author },
        datePublished: r.date,
        reviewBody: r.content,
      })),
    };
    return {
      meta: [
        { title: `${eq.name} (${eq.id}) — ATDB Trade International` },
        { name: "description", content: `Rent the ${eq.brand} ${eq.model} (${eq.capacity}) in Bangladesh. Inspection-certified, operator included. Get a WhatsApp quote in minutes.` },
        { property: "og:title", content: `${eq.name} — ATDB Trade International` },
        { property: "og:description", content: `${eq.brand} · ${eq.capacity} · ${eq.origin}. Inspection-certified heavy equipment for hire.` },
        { property: "og:image", content: eq.image },
        { name: "twitter:image", content: eq.image },
      ],
      scripts: [
        { type: "application/ld+json", children: JSON.stringify(productLd) },
      ],
    };
  },
  notFoundComponent: () => (
    <Layout>
      <div className="container-page py-32 text-center">
        <h1 className="font-display text-3xl font-bold text-iron">Equipment not found</h1>
        <Link to="/equipment" className="mt-4 inline-block text-safety hover:underline">
          Back to Equipment
        </Link>
      </div>
    </Layout>
  ),
  component: EquipmentDetailPage,
});

function EquipmentDetailPage() {
  const { category, id } = Route.useParams();
  const { t, lang } = useI18n();
  const eq = getEquipmentById(id)!;
  const cat = CATEGORIES[category as EquipmentCategory];
  const related = FLEET.filter((f) => f.category === eq.category && f.id !== eq.id).slice(0, 3);
  const gallery = [eq.image, detailHero, detailCabin, detailFleet];

  const fontClass = lang === "bn" ? "font-bn" : "font-display";
  const whatsappUrl = buildWhatsappRentLink(eq, lang);
  const { add, items } = useCart();
  const inCart = items.some((i) => i.id === eq.id);

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="border-b border-border bg-muted/30">
        <nav aria-label="Breadcrumb" className="container-page flex items-center gap-1 py-3 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-safety">{t("nav.home")}</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to="/equipment" className="hover:text-safety">{t("nav.equipment")}</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to="/equipment/$category" params={{ category: cat.slug }} className="hover:text-safety">
            {t(`cat.${cat.slug}.label` as Parameters<typeof t>[0])}
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="truncate text-iron">{eq.name}</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="bg-background py-10 md:py-14">
        <div className="container-page grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          {/* Gallery */}
          <Gallery images={gallery} alt={eq.name} certifiedLabel={t("detail.certified")} />

          {/* Info */}
          <div>
            <p className="font-display text-[11px] font-semibold uppercase tracking-[0.18em] text-safety">{eq.id}</p>
            <h1 className={`mt-2 text-3xl font-bold text-iron md:text-4xl ${fontClass}`}>{eq.name}</h1>
            <p className="mt-2 text-sm text-muted-foreground">{eq.brand} · {eq.capacity} · {eq.origin}{eq.year ? ` · ${eq.year}` : ""}</p>

            <div className="mt-6 inline-flex items-center gap-2 rounded-sm border border-success/30 bg-success/10 px-3 py-2 text-success">
              <BadgeCheck className="h-4 w-4" />
              <span className={`text-xs font-semibold uppercase tracking-wider ${fontClass}`}>{t("detail.certified")}</span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">{t("detail.certified.body")}</p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <Highlight icon={ShieldCheck} title={t("detail.spec.operator")} value={t("detail.spec.operator.v")} />
              <Highlight icon={MapPin} title={t("detail.spec.transport")} value={t("detail.spec.transport.v")} />
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-7 inline-flex w-full items-center justify-center gap-2 rounded-sm bg-whatsapp px-7 py-4 text-sm font-semibold uppercase tracking-wider text-white shadow-cta transition-transform hover:-translate-y-px ${fontClass}`}
            >
              <WhatsappIcon /> {t("detail.cta.button")}
            </a>
            <button
              type="button"
              onClick={() => add(eq)}
              className={`mt-3 inline-flex w-full items-center justify-center gap-2 rounded-sm border-2 px-7 py-3.5 text-sm font-semibold uppercase tracking-wider transition-colors ${
                inCart
                  ? "border-success bg-success/10 text-success"
                  : "border-safety bg-safety/5 text-safety hover:bg-safety hover:text-white"
              } ${fontClass}`}
            >
              {inCart ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
              {inCart ? t("common.added") : t("common.addToQuote")}
            </button>
            <a
              href={`tel:${COMPANY.phones[0].number}`}
              className={`mt-3 inline-flex w-full items-center justify-center gap-2 rounded-sm border-2 border-iron/15 px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-iron transition-colors hover:border-iron hover:bg-iron hover:text-white ${fontClass}`}
            >
              <Phone className="h-4 w-4" /> {COMPANY.phones[0].number}
            </a>
          </div>
        </div>
      </section>

      {/* Specs — collapsible groups */}
      <section className="bg-muted/40 py-16 md:py-20">
        <div className="container-page">
          <p className="eyebrow">{t("detail.specs")}</p>
          <h2 className={`mt-2 text-3xl font-bold text-iron md:text-4xl ${fontClass}`}>{eq.name}</h2>
          <SpecGroupsAccordion eq={eq} />
        </div>
      </section>

      {/* Reviews */}
      <ReviewsSection />

      {/* Sticky CTA */}
      <section className="bg-gradient-safety py-14 text-white">
        <div className="container-page flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
          <div className="flex items-start gap-4">
            <Calendar className="mt-1 h-6 w-6" />
            <div>
              <h2 className={`text-2xl font-bold text-white md:text-3xl ${fontClass}`}>{t("detail.cta.title")}</h2>
              <p className="mt-1 max-w-xl text-sm text-white/90">{t("detail.cta.body")}</p>
            </div>
          </div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 rounded-sm bg-iron-deep px-6 py-3.5 text-sm font-semibold uppercase tracking-wider text-white transition-transform hover:-translate-y-px ${fontClass}`}
          >
            <WhatsappIcon /> {t("detail.cta.button")}
          </a>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="bg-background py-16 md:py-20">
          <div className="container-page">
            <p className="eyebrow">{t("detail.related")}</p>
            <h2 className={`mt-2 text-2xl font-bold text-iron md:text-3xl ${fontClass}`}>{t(`cat.${cat.slug}.label` as Parameters<typeof t>[0])}</h2>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={equipmentGridVariants}
              className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {related.map((r) => (
                <EquipmentCard key={r.id} eq={r} />
              ))}
            </motion.div>
          </div>
        </section>
      )}
    </Layout>
  );
}

function Gallery({ images, alt, certifiedLabel }: { images: string[]; alt: string; certifiedLabel: string }) {
  const [active, setActive] = useState(0);
  return (
    <div>
      <div className="group relative aspect-[4/3] overflow-hidden rounded-md border border-border bg-muted shadow-card">
        <AnimatePresence mode="wait">
          <motion.img
            key={images[active]}
            src={images[active]}
            alt={alt}
            initial={{ opacity: 0, scale: 1.0 }}
            animate={{ opacity: 1, scale: 1.08 }}
            exit={{ opacity: 0, scale: 1.12 }}
            transition={{
              opacity: { duration: 0.5, ease: "easeOut" },
              scale: { duration: 12, ease: "linear" },
            }}
            className="absolute inset-0 h-full w-full object-cover will-change-transform"
          />
        </AnimatePresence>

        {/* Glassmorphism overlay badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.45, ease: "easeOut" }}
          className="pointer-events-none absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-3 py-1.5 backdrop-blur-md backdrop-saturate-150 shadow-[0_4px_24px_-6px_rgba(0,0,0,0.3)]"
        >
          <BadgeCheck className="h-3.5 w-3.5 text-white" />
          <span className="font-display text-[10px] font-bold uppercase tracking-[0.18em] text-white">
            {certifiedLabel}
          </span>
        </motion.div>

        {/* Glassmorphism gradient sheen — bottom */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-iron-deep/60 via-iron-deep/10 to-transparent" />
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5, ease: "easeOut" }}
          className="pointer-events-none absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3"
        >
          <span className="rounded-sm border border-white/20 bg-white/10 px-2.5 py-1 font-display text-[10px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md">
            {alt}
          </span>
          <span className="rounded-sm border border-white/20 bg-white/10 px-2.5 py-1 font-display text-[10px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md">
            {active + 1} / {images.length}
          </span>
        </motion.div>
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
        }}
        className="mt-3 grid grid-cols-4 gap-2"
      >
        {images.map((src, i) => (
          <motion.button
            key={src + i}
            type="button"
            onClick={() => setActive(i)}
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
            }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            className={`relative aspect-[4/3] overflow-hidden rounded-sm border-2 transition-colors ${
              active === i ? "border-safety shadow-[0_0_0_3px_color-mix(in_oklab,var(--safety)_20%,transparent)]" : "border-transparent hover:border-iron/30"
            }`}
            aria-label={`View image ${i + 1}`}
            aria-current={active === i}
          >
            <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}


function Highlight({ icon: Icon, title, value }: { icon: React.ComponentType<{ className?: string }>; title: string; value: string }) {
  return (
    <div className="flex items-start gap-3 rounded-md border border-border bg-card p-4">
      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-sm bg-gradient-iron text-white">
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <p className="font-display text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{title}</p>
        <p className="mt-0.5 text-sm font-medium text-iron">{value}</p>
      </div>
    </div>
  );
}

function WhatsappIcon() {
  return (
    <svg viewBox="0 0 32 32" className="h-4 w-4 fill-white" aria-hidden="true">
      <path d="M16.06 5.33c-5.91 0-10.71 4.8-10.71 10.7 0 1.89.5 3.74 1.45 5.36L5 27l5.78-1.51a10.7 10.7 0 0 0 5.28 1.36h.01c5.9 0 10.7-4.8 10.7-10.71 0-2.86-1.11-5.55-3.13-7.57a10.65 10.65 0 0 0-7.58-3.24zm5.05 14.99c-.22.62-1.28 1.19-1.81 1.27-.47.07-1.08.1-1.74-.11-.4-.13-.92-.3-1.58-.58-2.77-1.2-4.59-4-4.72-4.18-.14-.18-1.13-1.49-1.13-2.84 0-1.35.71-2.02.96-2.29.25-.27.55-.34.74-.34l.53.01c.17.01.4-.06.62.47.22.54.76 1.87.83 2 .06.13.11.29.02.47-.09.18-.14.29-.27.45-.13.15-.28.34-.4.46-.14.14-.28.28-.12.55.16.27.7 1.15 1.49 1.86 1.03.92 1.89 1.21 2.16 1.34.27.13.42.11.58-.07.15-.18.67-.78.85-1.05.18-.26.36-.22.61-.13.25.09 1.57.74 1.84.87.27.13.45.2.52.31.06.11.06.65-.16 1.27z" />
    </svg>
  );
}
