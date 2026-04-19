import { motion } from "framer-motion";
import { Facebook, ExternalLink } from "lucide-react";
import { COMPANY } from "@/lib/atdb-data";
import { useI18n, useFontClass } from "@/lib/i18n";

/**
 * Live Facebook Page Plugin (timeline tab) styled for the ATDB
 * iron + bronze palette. Renders inside a glassmorphic frame on a
 * gradient-iron backdrop with bronze halo + film grain.
 *
 * The iframe loads the official Facebook plugin endpoint; if Facebook
 * blocks rendering (unsupported share URL, ad-blocker, etc.) the
 * styled fallback CTA below remains visible.
 */
export function FacebookFeed() {
  const { t, lang } = useI18n();
  const fontClass = useFontClass();

  // The Facebook Page Plugin accepts any public Page URL. We use the
  // share link supplied by the brand; if Facebook refuses to render it,
  // the fallback CTA covers the gap.
  const pageUrl = encodeURIComponent(COMPANY.facebook);
  const pluginSrc = `https://www.facebook.com/plugins/page.php?href=${pageUrl}&tabs=timeline&width=500&height=620&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId`;

  return (
    <section className="relative isolate overflow-hidden bg-gradient-iron py-16 text-white md:py-20">
      {/* bronze radial glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(60% 50% at 75% 30%, color-mix(in oklab, var(--bronze-glow) 22%, transparent) 0%, transparent 70%)",
        }}
      />
      {/* engineering grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
        }}
      />

      <div className="container-page relative grid gap-10 lg:grid-cols-[1fr_540px]">
        {/* Heading + CTA */}
        <div>
          <p className="eyebrow !text-bronze-glow">{t("fb.eyebrow")}</p>
          <h2 className={`mt-2 text-3xl font-bold text-white md:text-4xl ${fontClass}`}>
            {t("fb.title")}
          </h2>
          <p className={`mt-4 max-w-xl text-base leading-relaxed text-white/75 ${fontClass}`}>
            {t("fb.body")}
          </p>

          <motion.a
            href={COMPANY.facebook}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 280, damping: 22 }}
            className={`group relative mt-7 inline-flex items-center gap-3 overflow-hidden rounded-sm border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-semibold uppercase tracking-wider text-white backdrop-blur-md backdrop-saturate-150 shadow-[0_4px_24px_-6px_rgba(0,0,0,0.45)] transition-colors hover:border-[#1877F2]/60 hover:bg-white/15 ${fontClass}`}
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
            />
            <span className="relative grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-[#1877F2] to-[#0c5dc7] shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] ring-1 ring-white/25">
              <Facebook className="h-3.5 w-3.5 fill-white text-white" strokeWidth={0} />
            </span>
            <span className="relative">{t("fb.cta")}</span>
            <ExternalLink className="relative h-3.5 w-3.5 opacity-70 transition-transform group-hover:translate-x-0.5" />
          </motion.a>

          <ul className={`mt-8 grid max-w-md gap-2 text-sm text-white/70 ${fontClass}`}>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-bronze-glow" />
              {t("fb.bullet.1")}
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-bronze-glow" />
              {t("fb.bullet.2")}
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-bronze-glow" />
              {t("fb.bullet.3")}
            </li>
          </ul>
        </div>

        {/* Glassmorphic iframe frame */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative mx-auto w-full max-w-[540px]"
        >
          {/* halo */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-4 rounded-2xl opacity-60 blur-2xl"
            style={{
              background:
                "conic-gradient(from 200deg at 50% 50%, rgba(24,119,242,0.35), rgba(245,124,0,0.3), rgba(24,119,242,0.35))",
            }}
          />
          <div className="relative overflow-hidden rounded-md border border-white/15 bg-white/5 p-2 backdrop-blur-md backdrop-saturate-150 shadow-[0_18px_48px_-18px_rgba(0,0,0,0.55)]">
            {/* header bar */}
            <div className="flex items-center justify-between gap-3 px-3 py-2.5">
              <div className="flex items-center gap-2.5">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-[#1877F2] to-[#0c5dc7] ring-1 ring-white/20">
                  <Facebook className="h-3.5 w-3.5 fill-white text-white" strokeWidth={0} />
                </span>
                <div>
                  <p className={`text-xs font-bold text-white ${fontClass}`}>{COMPANY.short}</p>
                  <p className="text-[10px] uppercase tracking-[0.16em] text-bronze-glow">
                    {t("fb.live")}
                  </p>
                </div>
              </div>
              <span className="inline-flex h-2 w-2 items-center">
                <span className="relative inline-flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-safety opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-safety" />
                </span>
              </span>
            </div>

            {/* iframe — bg gives a clean white surface for FB's default theme */}
            <div className="relative overflow-hidden rounded-sm bg-white">
              <iframe
                title="ATDB Trade International — Facebook timeline"
                src={pluginSrc}
                width="500"
                height="620"
                style={{ border: 0, overflow: "hidden" }}
                scrolling="no"
                frameBorder={0}
                allowFullScreen
                loading="lazy"
                allow="encrypted-media"
                className="block w-full"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
