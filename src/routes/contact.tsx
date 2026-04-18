import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/atdb/Layout";
import { Phone, Mail, MapPin } from "lucide-react";
import { COMPANY, buildWhatsappGenericLink } from "@/lib/atdb-data";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact ATDB Trade International — WhatsApp, Phone & Office Locations" },
      { name: "description", content: "Reach ATDB Trade International for heavy equipment rental quotations. WhatsApp +8801712106242. Offices in Dhaka and Tangail." },
      { property: "og:title", content: "Contact ATDB Trade International" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <Layout>
      <section className="bg-iron-deep py-24 text-white">
        <div className="container-page">
          <p className="eyebrow !text-bronze-glow">Contact</p>
          <h1 className="mt-2 max-w-3xl font-display text-4xl font-bold text-white md:text-5xl">
            Get a quotation in minutes — straight on WhatsApp.
          </h1>
          <p className="mt-4 max-w-2xl text-white/75">
            Tell us your equipment, location and dates. Our team responds with availability and pricing — usually within the hour during business days.
          </p>
          <a
            href={buildWhatsappGenericLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-sm bg-whatsapp px-7 py-4 font-display text-sm font-semibold uppercase tracking-wider text-white shadow-cta transition-transform hover:-translate-y-px"
          >
            Open WhatsApp
          </a>
        </div>
      </section>

      <section className="bg-background py-20">
        <div className="container-page grid gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Direct Lines</p>
            <h2 className="mt-2 font-display text-2xl font-bold text-iron md:text-3xl">Speak to leadership.</h2>
            <ul className="mt-6 space-y-3">
              {COMPANY.phones.map((p) => (
                <li key={p.number}>
                  <a href={`tel:${p.number}`} className="flex items-center justify-between rounded-md border border-border bg-card px-5 py-4 shadow-card transition-colors hover:border-safety">
                    <div className="flex items-center gap-3">
                      <div className="grid h-10 w-10 place-items-center rounded-sm bg-gradient-safety text-white">
                        <Phone className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-display text-sm font-semibold text-iron">{p.number}</p>
                        <p className="text-xs text-muted-foreground">{p.label}</p>
                      </div>
                    </div>
                    <span className="font-display text-xs font-semibold uppercase tracking-wider text-safety">Call</span>
                  </a>
                </li>
              ))}
              <li>
                <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-3 rounded-md border border-border bg-card px-5 py-4 shadow-card transition-colors hover:border-safety">
                  <div className="grid h-10 w-10 place-items-center rounded-sm bg-gradient-iron text-white">
                    <Mail className="h-4 w-4" />
                  </div>
                  <p className="font-display text-sm font-semibold text-iron">{COMPANY.email}</p>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="eyebrow">Offices</p>
            <h2 className="mt-2 font-display text-2xl font-bold text-iron md:text-3xl">Dhaka & Tangail.</h2>
            <ul className="mt-6 space-y-4">
              {COMPANY.offices.map((o) => (
                <li key={o.city} className="rounded-md border border-border bg-card p-6 shadow-card border-safety-top">
                  <div className="flex items-start gap-3">
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-sm bg-gradient-iron text-white">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-safety">{o.label}</p>
                      <p className="mt-1 font-display text-lg font-semibold text-iron">{o.city}</p>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{o.address}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs text-muted-foreground">
              TIN {COMPANY.tin} · VAT {COMPANY.vat}
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
