// ATDB bilingual i18n — English + Bengali.
// Persists choice in localStorage. Wraps app via <I18nProvider>.

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "bn";

const STORAGE_KEY = "atdb_lang";

type Dict = Record<string, { en: string; bn: string }>;

export const TRANSLATIONS: Dict = {
  // Nav
  "nav.home": { en: "Home", bn: "হোম" },
  "nav.equipment": { en: "Equipment", bn: "ইকুইপমেন্ট" },
  "nav.projects": { en: "Projects", bn: "প্রজেক্ট" },
  "nav.about": { en: "About", bn: "পরিচিতি" },
  "nav.contact": { en: "Contact", bn: "যোগাযোগ" },
  "nav.getQuote": { en: "Get Quote", bn: "কোটেশন নিন" },
  "nav.whatsappQuote": { en: "Get WhatsApp Quote", bn: "হোয়াটসঅ্যাপে কোটেশন" },

  // Common
  "common.rentNow": { en: "Rent Now", bn: "ভাড়া নিন" },
  "common.details": { en: "Details", bn: "বিস্তারিত" },
  "common.viewAll": { en: "View all", bn: "সব দেখুন" },
  "common.explore": { en: "Explore", bn: "দেখুন" },
  "common.exploreCategory": { en: "Explore Category", bn: "ক্যাটেগরি দেখুন" },
  "common.openWhatsapp": { en: "Open WhatsApp", bn: "হোয়াটসঅ্যাপ খুলুন" },
  "common.units": { en: "units", bn: "ইউনিট" },
  "common.unitsAvailable": { en: "units available", bn: "ইউনিট রেডি" },
  "common.backTo": { en: "Back to", bn: "ফিরে যান" },
  "whatsapp.fab": { en: "WhatsApp Quote", bn: "হোয়াটসঅ্যাপ কোটেশন" },

  // Home — Hero
  "home.eyebrow": { en: "Since 2000 · Dhaka & Tangail, Bangladesh", bn: "২০০০ সাল থেকে · ঢাকা ও টাঙ্গাইল, বাংলাদেশ" },
  "home.hero.title.a": { en: "Bangladesh's premier", bn: "বাংলাদেশের সেরা" },
  "home.hero.title.b": { en: "heavy equipment", bn: "হেভি ইকুইপমেন্ট" },
  "home.hero.title.c": { en: "rental partner.", bn: "রেন্টাল পার্টনার।" },
  "home.hero.sub": { en: "Cranes · Road Rollers · Excavators · Support Equipment. A certified, government-compliant fleet ready for your next project.", bn: "ক্রেন · রোড রোলার · এক্সক্যাভেটর · সাপোর্ট ইকুইপমেন্ট। সরকার অনুমোদিত, ইন্সপেকশন-সার্টিফাইড ফ্লিট — আপনার পরবর্তী প্রজেক্টের জন্য প্রস্তুত।" },
  "home.hero.cta.browse": { en: "Browse Equipment", bn: "ইকুইপমেন্ট দেখুন" },
  "home.hero.cta.whatsapp": { en: "WhatsApp a Quote", bn: "হোয়াটসঅ্যাপে কোটেশন" },

  // Trust bar
  "stats.years": { en: "Years Experience", bn: "বছরের অভিজ্ঞতা" },
  "stats.equipment": { en: "Equipment Units", bn: "ইকুইপমেন্ট ইউনিট" },
  "stats.staff": { en: "Skilled Staff", bn: "দক্ষ কর্মী" },
  "stats.offices": { en: "Office Locations", bn: "অফিস" },

  // Categories section
  "home.cat.eyebrow": { en: "Our Equipment", bn: "আমাদের ইকুইপমেন্ট" },
  "home.cat.title": { en: "A complete fleet for every job site.", bn: "প্রতিটি প্রজেক্টের জন্য সম্পূর্ণ ফ্লিট।" },

  // Featured
  "home.featured.eyebrow": { en: "Featured Equipment", bn: "ফিচার্ড ইকুইপমেন্ট" },
  "home.featured.title": { en: "Flagship machines from our certified fleet.", bn: "আমাদের সার্টিফাইড ফ্লিটের ফ্ল্যাগশিপ মেশিন।" },

  // Why ATDB
  "home.why.eyebrow": { en: "Why ATDB", bn: "কেন ATDB" },
  "home.why.title": { en: "A partner contractors return to, project after project.", bn: "যে পার্টনারের কাছে কন্ট্রাক্টররা বারবার ফিরে আসে।" },
  "home.why.body": { en: "We've spent 25+ years earning the trust of Bangladesh's largest road, bridge, pharma and industrial developers — through certified equipment, disciplined operations, and zero-friction WhatsApp service.", bn: "২৫+ বছর ধরে বাংলাদেশের শীর্ষ রোড, ব্রিজ, ফার্মা ও ইন্ডাস্ট্রিয়াল ডেভেলপারদের আস্থা অর্জন — সার্টিফাইড ইকুইপমেন্ট, ডিসিপ্লিনড অপারেশন ও দ্রুত হোয়াটসঅ্যাপ সার্ভিসের মাধ্যমে।" },

  "pillar.fleet.t": { en: "Reliable Fleet", bn: "নির্ভরযোগ্য ফ্লিট" },
  "pillar.fleet.d": { en: "26 years of mission-critical maintenance and operator training keep every unit job-ready.", bn: "২৬ বছরের মেইনটেন্যান্স ও অপারেটর ট্রেনিং — প্রতিটি ইউনিট সবসময় জব-রেডি।" },
  "pillar.safety.t": { en: "Safety First", bn: "সেফটি ফার্স্ট" },
  "pillar.safety.d": { en: "City Inspection Services certified equipment. ISO-aligned operating protocols on every site.", bn: "City Inspection Services সার্টিফাইড। প্রতিটি সাইটে ISO-সমন্বিত প্রটোকল।" },
  "pillar.whatsapp.t": { en: "Instant WhatsApp Service", bn: "ইন্সট্যান্ট হোয়াটসঅ্যাপ সার্ভিস" },
  "pillar.whatsapp.d": { en: "Direct line to leadership. Quotations and confirmations in minutes, not days.", bn: "নেতৃত্বের সাথে সরাসরি লাইন। কোটেশন ও কনফার্মেশন মিনিটে।" },
  "pillar.pricing.t": { en: "Transparent Pricing", bn: "স্বচ্ছ মূল্য" },
  "pillar.pricing.d": { en: "Simple per-day & per-project rates. No hidden mobilisation or fuel surprises.", bn: "সহজ পার-ডে ও পার-প্রজেক্ট রেট। কোনো হিডেন চার্জ নেই।" },

  "home.projects.eyebrow": { en: "Project Highlights", bn: "প্রজেক্ট হাইলাইটস" },
  "home.projects.title": { en: "Powering Bangladesh's biggest builds.", bn: "বাংলাদেশের সবচেয়ে বড় নির্মাণে শক্তি যোগাচ্ছি।" },
  "home.projects.viewAll": { en: "View all projects", bn: "সব প্রজেক্ট দেখুন" },

  "home.cta.title": { en: "Ready to mobilise? Get a quote in minutes.", bn: "মোবিলাইজ করতে প্রস্তুত? মিনিটে কোটেশন নিন।" },
  "home.cta.body": { en: "Tell us your equipment, location and dates on WhatsApp — we'll respond with availability and pricing.", bn: "হোয়াটসঅ্যাপে আমাদের ইকুইপমেন্ট, লোকেশন ও তারিখ জানান — আমরা অ্যাভেইলেবিলিটি ও প্রাইস জানিয়ে দেব।" },
  "home.cta.button": { en: "Start on WhatsApp", bn: "হোয়াটসঅ্যাপে শুরু করুন" },

  // Equipment index
  "eq.eyebrow": { en: "Equipment", bn: "ইকুইপমেন্ট" },
  "eq.title": { en: "A certified fleet of 28 machines, ready to mobilise.", bn: "২৮টি সার্টিফাইড মেশিনের ফ্লিট — মোবিলাইজেশনের জন্য প্রস্তুত।" },
  "eq.sub": { en: "From 120-tonne mobile cranes to road rollers, excavators and on-site support equipment — every unit is inspection-certified and operator-supported.", bn: "১২০ টন মোবাইল ক্রেন থেকে রোড রোলার, এক্সক্যাভেটর ও অন-সাইট সাপোর্ট ইকুইপমেন্ট — প্রতিটি ইউনিট ইন্সপেকশন-সার্টিফাইড।" },

  // Detail page
  "detail.specs": { en: "Full Specifications", bn: "সম্পূর্ণ স্পেসিফিকেশন" },
  "detail.spec.id": { en: "Asset ID", bn: "অ্যাসেট আইডি" },
  "detail.spec.brand": { en: "Brand", bn: "ব্র্যান্ড" },
  "detail.spec.model": { en: "Model", bn: "মডেল" },
  "detail.spec.capacity": { en: "Capacity", bn: "ক্যাপাসিটি" },
  "detail.spec.origin": { en: "Country of Origin", bn: "উৎপত্তি দেশ" },
  "detail.spec.year": { en: "Year of Manufacture", bn: "নির্মাণ সাল" },
  "detail.spec.category": { en: "Category", bn: "ক্যাটেগরি" },
  "detail.spec.operator": { en: "Operator", bn: "অপারেটর" },
  "detail.spec.operator.v": { en: "Certified operator included", bn: "সার্টিফাইড অপারেটর সহ" },
  "detail.spec.transport": { en: "Transport", bn: "পরিবহন" },
  "detail.spec.transport.v": { en: "Mobilisation arranged on request", bn: "অনুরোধে মোবিলাইজেশন" },
  "detail.gallery": { en: "Gallery", bn: "গ্যালারি" },
  "detail.certified": { en: "Inspection Certified", bn: "ইন্সপেকশন সার্টিফাইড" },
  "detail.certified.body": { en: "City Inspection Services CIS/077/2018 — full statutory compliance for tendered works.", bn: "City Inspection Services CIS/077/2018 — টেন্ডার ওয়ার্কসের জন্য সম্পূর্ণ সম্মতি।" },
  "detail.cta.title": { en: "Ready to deploy this unit?", bn: "এই ইউনিট ডেপ্লয় করতে প্রস্তুত?" },
  "detail.cta.body": { en: "Send us your project location and rental dates on WhatsApp — we'll confirm availability and pricing.", bn: "হোয়াটসঅ্যাপে প্রজেক্ট লোকেশন ও তারিখ পাঠান — অ্যাভেইলেবিলিটি ও প্রাইস কনফার্ম করব।" },
  "detail.cta.button": { en: "Rent Now on WhatsApp", bn: "হোয়াটসঅ্যাপে ভাড়া নিন" },
  "detail.related": { en: "Related Equipment", bn: "সম্পর্কিত ইকুইপমেন্ট" },
  "detail.notFound": { en: "Equipment not found", bn: "ইকুইপমেন্ট পাওয়া যায়নি" },

  // Footer
  "footer.explore": { en: "Explore", bn: "অন্বেষণ" },
  "footer.offices": { en: "Offices", bn: "অফিস" },
  "footer.contact": { en: "Contact", bn: "যোগাযোগ" },
  "footer.tagline": { en: "Bangladesh's premier heavy equipment rental partner. Since 2000.", bn: "বাংলাদেশের সেরা হেভি ইকুইপমেন্ট রেন্টাল পার্টনার। ২০০০ সাল থেকে।" },
  "footer.rights": { en: "All rights reserved.", bn: "সর্বস্বত্ব সংরক্ষিত।" },

  // Cart
  "common.addToQuote": { en: "Add to quote", bn: "কোটেশনে যোগ করুন" },
  "common.added": { en: "Added", bn: "যোগ হয়েছে" },
  "cart.title": { en: "Quotation Cart", bn: "কোটেশন কার্ট" },
  "cart.empty.t": { en: "Your quotation cart is empty.", bn: "আপনার কার্ট খালি।" },
  "cart.empty.d": { en: "Add equipment from the fleet pages to build a single consolidated WhatsApp quotation.", bn: "ফ্লিট পেজ থেকে ইকুইপমেন্ট যোগ করে একসাথে হোয়াটসঅ্যাপে কোটেশন পাঠান।" },
  "cart.project": { en: "Project Details", bn: "প্রজেক্ট ডিটেইলস" },
  "cart.location": { en: "Location", bn: "লোকেশন" },
  "cart.start": { en: "Start", bn: "শুরু" },
  "cart.end": { en: "End", bn: "শেষ" },
  "cart.notes": { en: "Notes", bn: "নোট" },
  "cart.notes.ph": { en: "Site access, lift duration, special requirements…", bn: "সাইট অ্যাক্সেস, কাজের সময়, বিশেষ প্রয়োজন…" },
  "cart.send": { en: "Send Quote on WhatsApp", bn: "হোয়াটসঅ্যাপে কোটেশন পাঠান" },
  "cart.clear": { en: "Clear cart", bn: "কার্ট খালি করুন" },

  // Contact form
  "contact.eyebrow": { en: "Quote Request", bn: "কোটেশন রিকোয়েস্ট" },
  "contact.title": { en: "Tell us about your project.", bn: "আপনার প্রজেক্ট সম্পর্কে জানান।" },
  "contact.sub": { en: "Send a detailed enquiry — our team will respond with a written quotation, usually within the hour during business days.", bn: "বিস্তারিত পাঠান — আমরা সাধারণত একই কর্মদিবসে লিখিত কোটেশন পাঠিয়ে দিই।" },
  "contact.name": { en: "Full name", bn: "পুরো নাম" },
  "contact.email": { en: "Email", bn: "ইমেইল" },
  "contact.phone": { en: "Phone (optional)", bn: "ফোন (ঐচ্ছিক)" },
  "contact.company": { en: "Company (optional)", bn: "কোম্পানি (ঐচ্ছিক)" },
  "contact.location": { en: "Project location", bn: "প্রজেক্ট লোকেশন" },
  "contact.equipment": { en: "Equipment of interest (optional)", bn: "যে ইকুইপমেন্ট প্রয়োজন (ঐচ্ছিক)" },
  "contact.message": { en: "Message", bn: "মেসেজ" },
  "contact.message.ph": { en: "Tell us about timelines, lift weights, site access — anything that helps us quote accurately.", bn: "টাইমলাইন, ওজন, সাইট অ্যাক্সেস — যা কোটেশন তৈরিতে সাহায্য করবে।" },
  "contact.submit": { en: "Send Enquiry", bn: "এনকোয়ারি পাঠান" },
  "contact.submitting": { en: "Sending…", bn: "পাঠানো হচ্ছে…" },
  "contact.success.t": { en: "Enquiry received — thank you!", bn: "এনকোয়ারি পেয়েছি — ধন্যবাদ!" },
  "contact.success.d": { en: "Our team will reach out shortly with a written quotation.", bn: "আমাদের টিম শীঘ্রই লিখিত কোটেশন পাঠাবে।" },
  "contact.error": { en: "We couldn't send your enquiry. Please try again or message us on WhatsApp.", bn: "এনকোয়ারি পাঠানো যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন বা হোয়াটসঅ্যাপে জানান।" },
  "contact.rate": { en: "Too many requests — please try again in a minute.", bn: "অনেক রিকোয়েস্ট — এক মিনিট পর আবার চেষ্টা করুন।" },
};

interface I18nCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: keyof typeof TRANSLATIONS) => string;
}

const Ctx = createContext<I18nCtx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "en" || saved === "bn") setLangState(saved);
    } catch {
      /* ignore */
    }
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
    if (typeof document !== "undefined") {
      document.documentElement.lang = l;
    }
  };

  const t = (key: keyof typeof TRANSLATIONS) => {
    const entry = TRANSLATIONS[key];
    if (!entry) return String(key);
    return entry[lang] ?? entry.en;
  };

  return <Ctx.Provider value={{ lang, setLang, t }}>{children}</Ctx.Provider>;
}

export function useI18n() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useI18n must be used inside <I18nProvider>");
  return v;
}
