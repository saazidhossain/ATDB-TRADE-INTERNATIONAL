import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/atdb/Layout";
import { COMPANY } from "@/lib/atdb-data";
import { ShieldCheck, FileCheck, Building2, Leaf } from "lucide-react";

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

const VALUES = [
  { icon: ShieldCheck, t: "Safety First", d: "City Inspection Services certified equipment. Operator training and PPE compliance on every site." },
  { icon: FileCheck, t: "Compliance", d: "TIN, VAT, Trade License and 1st Class Contractor status — full documentation for public-works tenders." },
  { icon: Building2, t: "Reliability", d: "26 years of uninterrupted operations across roads, bridges, pharma and industrial projects." },
  { icon: Leaf, t: "Responsibility", d: "Environmental and safety policies aligned with national and donor-agency standards." },
];

function AboutPage() {
  return (
    <Layout>
      <section className="bg-iron-deep py-24 text-white">
        <div className="container-page">
          <p className="eyebrow !text-bronze-glow">About ATDB</p>
          <h1 className="mt-2 max-w-3xl font-display text-4xl font-bold text-white md:text-5xl">
            Built in {COMPANY.founded}. Trusted by Bangladesh's biggest builders.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/80">
            M/S ATDB Trade International is a 1st Class Contractor and Heavy Equipment Service Provider headquartered in Dhaka with a branch in Tangail. {COMPANY.yearsOperating}+ years of certified fleet operations, {COMPANY.staff} permanent staff, and a portfolio that spans national infrastructure, pharma and industrial development.
          </p>
        </div>
      </section>

      <section className="bg-background py-20">
        <div className="container-page grid gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Leadership</p>
            <h2 className="mt-2 font-display text-3xl font-bold text-iron">A family-owned operation, professionally run.</h2>
            <div className="mt-8 space-y-6">
              <div className="rounded-md border border-border bg-card p-6 shadow-card border-safety-top">
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Proprietor</p>
                <p className="mt-1 font-display text-xl font-semibold text-iron">{COMPANY.proprietor}</p>
              </div>
              <div className="rounded-md border border-border bg-card p-6 shadow-card border-safety-top">
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Chief Executive Officer</p>
                <p className="mt-1 font-display text-xl font-semibold text-iron">{COMPANY.ceo}</p>
              </div>
            </div>
          </div>
          <div>
            <p className="eyebrow">Credentials</p>
            <h2 className="mt-2 font-display text-3xl font-bold text-iron">Certified, compliant, audit-ready.</h2>
            <dl className="mt-8 divide-y divide-border rounded-md border border-border bg-card shadow-card">
              {[
                ["TIN", COMPANY.tin],
                ["VAT", COMPANY.vat],
                ["Bank", COMPANY.bank],
                ["Inspection", "City Inspection Services CIS/077/2018"],
                ["Class", "1st Class Contractor & Supplier"],
              ].map(([k, v]) => (
                <div key={k} className="flex items-start justify-between gap-6 px-6 py-4">
                  <dt className="font-display text-sm font-medium text-muted-foreground">{k}</dt>
                  <dd className="text-right font-display text-sm font-semibold text-iron">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="bg-muted/40 py-20">
        <div className="container-page">
          <p className="eyebrow">Our Values</p>
          <h2 className="mt-2 max-w-2xl font-display text-3xl font-bold text-iron md:text-4xl">
            How we earn the call-back, every project.
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v) => (
              <div key={v.t} className="rounded-md border border-border bg-card p-6 shadow-card">
                <div className="grid h-11 w-11 place-items-center rounded-sm bg-gradient-iron text-white">
                  <v.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-iron">{v.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
