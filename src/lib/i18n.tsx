// ATDB bilingual i18n — English + Bengali. 100% coverage across every page.
// Persists choice in localStorage. Wraps app via <I18nProvider>.

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "bn";

const STORAGE_KEY = "atdb_lang";

type Dict = Record<string, { en: string; bn: string }>;

export const TRANSLATIONS: Dict = {
  // ─── Nav ─────────────────────────────────────────────────────────
  "nav.home": { en: "Home", bn: "হোম" },
  "nav.equipment": { en: "Equipment", bn: "ইকুইপমেন্ট" },
  "nav.projects": { en: "Projects", bn: "প্রজেক্ট" },
  "nav.about": { en: "About", bn: "পরিচিতি" },
  "nav.contact": { en: "Contact", bn: "যোগাযোগ" },
  "nav.getQuote": { en: "Get Quote", bn: "কোটেশন নিন" },
  "nav.whatsappQuote": { en: "Get WhatsApp Quote", bn: "হোয়াটসঅ্যাপে কোটেশন" },

  // ─── Common ──────────────────────────────────────────────────────
  "common.rentNow": { en: "Rent Now", bn: "ভাড়া নিন" },
  "common.details": { en: "Details", bn: "বিস্তারিত" },
  "common.viewAll": { en: "View all", bn: "সব দেখুন" },
  "common.explore": { en: "Explore", bn: "দেখুন" },
  "common.exploreCategory": { en: "Explore Category", bn: "ক্যাটেগরি দেখুন" },
  "common.openWhatsapp": { en: "Open WhatsApp", bn: "হোয়াটসঅ্যাপ খুলুন" },
  "common.units": { en: "units", bn: "ইউনিট" },
  "common.unitsAvailable": { en: "units available", bn: "ইউনিট রেডি" },
  "common.backTo": { en: "Back to", bn: "ফিরে যান" },
  "common.call": { en: "Call", bn: "কল" },
  "whatsapp.fab": { en: "WhatsApp Quote", bn: "হোয়াটসঅ্যাপ কোটেশন" },

  // ─── Home — Hero ─────────────────────────────────────────────────
  "home.eyebrow": { en: "Since 2000 · Dhaka & Tangail, Bangladesh", bn: "২০০০ সাল থেকে · ঢাকা ও টাঙ্গাইল, বাংলাদেশ" },
  "home.hero.title.a": { en: "Bangladesh's premier", bn: "বাংলাদেশের সেরা" },
  "home.hero.title.b": { en: "heavy equipment", bn: "হেভি ইকুইপমেন্ট" },
  "home.hero.title.c": { en: "rental partner.", bn: "রেন্টাল পার্টনার।" },
  "home.hero.sub": { en: "Cranes · Road Rollers · Excavators · Support Equipment. A certified, government-compliant fleet ready for your next project.", bn: "ক্রেন · রোড রোলার · এক্সক্যাভেটর · সাপোর্ট ইকুইপমেন্ট। সরকার অনুমোদিত, ইন্সপেকশন-সার্টিফাইড ফ্লিট — আপনার পরবর্তী প্রজেক্টের জন্য প্রস্তুত।" },
  "home.hero.cta.browse": { en: "Browse Equipment", bn: "ইকুইপমেন্ট দেখুন" },
  "home.hero.cta.whatsapp": { en: "WhatsApp a Quote", bn: "হোয়াটসঅ্যাপে কোটেশন" },

  "home.brands.eyebrow": { en: "Trusted brands in our fleet", bn: "আমাদের ফ্লিটের ব্র্যান্ডসমূহ" },

  // ─── Trust bar ───────────────────────────────────────────────────
  "stats.years": { en: "Years Experience", bn: "বছরের অভিজ্ঞতা" },
  "stats.equipment": { en: "Equipment Units", bn: "ইকুইপমেন্ট ইউনিট" },
  "stats.staff": { en: "Skilled Staff", bn: "দক্ষ কর্মী" },
  "stats.offices": { en: "Office Locations", bn: "অফিস" },

  // ─── Categories section ──────────────────────────────────────────
  "home.cat.eyebrow": { en: "Our Equipment", bn: "আমাদের ইকুইপমেন্ট" },
  "home.cat.title": { en: "A complete fleet for every job site.", bn: "প্রতিটি প্রজেক্টের জন্য সম্পূর্ণ ফ্লিট।" },

  // Category labels & taglines
  "cat.cranes.label": { en: "Mobile Cranes", bn: "মোবাইল ক্রেন" },
  "cat.cranes.tagline": { en: "7 units · 10T to 120T · Liebherr & Kato", bn: "৭ ইউনিট · ১০ থেকে ১২০ টন · Liebherr ও Kato" },
  "cat.rollers.label": { en: "Road Rollers", bn: "রোড রোলার" },
  "cat.rollers.tagline": { en: "9 units · 1T to 12T · Sakai, Dynapac, Bomag", bn: "৯ ইউনিট · ১ থেকে ১২ টন · Sakai, Dynapac, Bomag" },
  "cat.excavators.label": { en: "Excavators & Compactors", bn: "এক্সক্যাভেটর ও কম্প্যাক্টর" },
  "cat.excavators.tagline": { en: "3 units · CAT, Komatsu", bn: "৩ ইউনিট · CAT, Komatsu" },
  "cat.loaders.label": { en: "Loaders & Backhoes", bn: "লোডার ও ব্যাকহো" },
  "cat.loaders.tagline": { en: "3 units · CASE, XCMG, JCB", bn: "৩ ইউনিট · CASE, XCMG, JCB" },
  "cat.support.label": { en: "Support Equipment", bn: "সাপোর্ট ইকুইপমেন্ট" },
  "cat.support.tagline": { en: "Generators, compactors, cutters & TATA trucks", bn: "জেনারেটর, কম্প্যাক্টর, কাটার ও TATA ট্রাক" },

  // ─── Featured ────────────────────────────────────────────────────
  "home.featured.eyebrow": { en: "Featured Equipment", bn: "ফিচার্ড ইকুইপমেন্ট" },
  "home.featured.title": { en: "Flagship machines from our certified fleet.", bn: "আমাদের সার্টিফাইড ফ্লিটের ফ্ল্যাগশিপ মেশিন।" },

  // ─── Why ATDB ────────────────────────────────────────────────────
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

  // Project labels (home strip)
  "home.project.rtip": { en: "RTIP-2 · Ghatail, Tangail", bn: "RTIP-2 · ঘাটাইল, টাঙ্গাইল" },
  "home.project.jamuna": { en: "Jamuna Bridge Approach", bn: "যমুনা সেতু অ্যাপ্রোচ" },
  "home.project.pharma": { en: "Pharma Ashia · Centeon Pharma", bn: "ফার্মা এশিয়া · সেন্টিয়ন ফার্মা" },

  "home.cta.title": { en: "Ready to mobilise? Get a quote in minutes.", bn: "মোবিলাইজ করতে প্রস্তুত? মিনিটে কোটেশন নিন।" },
  "home.cta.body": { en: "Tell us your equipment, location and dates on WhatsApp — we'll respond with availability and pricing.", bn: "হোয়াটসঅ্যাপে আমাদের ইকুইপমেন্ট, লোকেশন ও তারিখ জানান — আমরা অ্যাভেইলেবিলিটি ও প্রাইস জানিয়ে দেব।" },
  "home.cta.button": { en: "Start on WhatsApp", bn: "হোয়াটসঅ্যাপে শুরু করুন" },

  // ─── Equipment index / category ─────────────────────────────────
  "eq.eyebrow": { en: "Equipment", bn: "ইকুইপমেন্ট" },
  "eq.title": { en: "A certified fleet of 28 machines, ready to mobilise.", bn: "২৮টি সার্টিফাইড মেশিনের ফ্লিট — মোবিলাইজেশনের জন্য প্রস্তুত।" },
  "eq.sub": { en: "From 120-tonne mobile cranes to road rollers, excavators and on-site support equipment — every unit is inspection-certified and operator-supported.", bn: "১২০ টন মোবাইল ক্রেন থেকে রোড রোলার, এক্সক্যাভেটর ও অন-সাইট সাপোর্ট ইকুইপমেন্ট — প্রতিটি ইউনিট ইন্সপেকশন-সার্টিফাইড।" },
  "eq.bc.home": { en: "Home", bn: "হোম" },
  "eq.bc.equipment": { en: "Equipment", bn: "ইকুইপমেন্ট" },
  "eq.cat.notFound": { en: "Category not found", bn: "ক্যাটেগরি পাওয়া যায়নি" },
  "eq.cat.back": { en: "Back to Equipment", bn: "ইকুইপমেন্টে ফিরুন" },

  // ─── Detail page ────────────────────────────────────────────────
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
  "detail.viewImage": { en: "View image", bn: "ছবি দেখুন" },
  "detail.certified": { en: "Inspection Certified", bn: "ইন্সপেকশন সার্টিফাইড" },
  "detail.certified.body": { en: "City Inspection Services CIS/077/2018 — full statutory compliance for tendered works.", bn: "City Inspection Services CIS/077/2018 — টেন্ডার ওয়ার্কসের জন্য সম্পূর্ণ সম্মতি।" },
  "detail.cta.title": { en: "Ready to deploy this unit?", bn: "এই ইউনিট ডেপ্লয় করতে প্রস্তুত?" },
  "detail.cta.body": { en: "Send us your project location and rental dates on WhatsApp — we'll confirm availability and pricing.", bn: "হোয়াটসঅ্যাপে প্রজেক্ট লোকেশন ও তারিখ পাঠান — অ্যাভেইলেবিলিটি ও প্রাইস কনফার্ম করব।" },
  "detail.cta.button": { en: "Rent Now on WhatsApp", bn: "হোয়াটসঅ্যাপে ভাড়া নিন" },
  "detail.related": { en: "Related Equipment", bn: "সম্পর্কিত ইকুইপমেন্ট" },
  "detail.notFound": { en: "Equipment not found", bn: "ইকুইপমেন্ট পাওয়া যায়নি" },

  // Spec groups + rows
  "specs.dimensions": { en: "Dimensions", bn: "মাত্রা" },
  "specs.performance": { en: "Performance", bn: "পারফরম্যান্স" },
  "specs.engine": { en: "Engine & Power", bn: "ইঞ্জিন ও পাওয়ার" },
  "specs.safety": { en: "Safety & Compliance", bn: "সেফটি ও কমপ্লায়েন্স" },

  "spec.row.capacity": { en: "Capacity", bn: "ক্যাপাসিটি" },
  "spec.row.config": { en: "Configuration", bn: "কনফিগারেশন" },
  "spec.row.origin": { en: "Country of Origin", bn: "উৎপত্তি দেশ" },
  "spec.row.year": { en: "Year of Manufacture", bn: "নির্মাণ সাল" },
  "spec.row.rated": { en: "Rated Capacity", bn: "রেটেড ক্যাপাসিটি" },
  "spec.row.operator": { en: "Operator", bn: "অপারেটর" },
  "spec.row.mobilisation": { en: "Mobilisation", bn: "মোবিলাইজেশন" },
  "spec.row.workMode": { en: "Working Mode", bn: "ওয়ার্কিং মোড" },
  "spec.row.fuel": { en: "Fuel Type", bn: "জ্বালানি" },
  "spec.row.brand": { en: "Brand", bn: "ব্র্যান্ড" },
  "spec.row.model": { en: "Model", bn: "মডেল" },
  "spec.row.drive": { en: "Drive", bn: "ড্রাইভ" },
  "spec.row.inspection": { en: "Inspection", bn: "ইন্সপেকশন" },
  "spec.row.class": { en: "Class", bn: "ক্লাস" },
  "spec.row.ppe": { en: "Operator PPE", bn: "অপারেটর PPE" },
  "spec.row.insurance": { en: "Insurance", bn: "ইনস্যুরেন্স" },

  // Spec values
  "spec.val.telescopic": { en: "Telescopic boom", bn: "টেলিস্কোপিক বুম" },
  "spec.val.standard": { en: "Standard chassis", bn: "স্ট্যান্ডার্ড চ্যাসিস" },
  "spec.val.operatorIncl": { en: "Certified, included", bn: "সার্টিফাইড, অন্তর্ভুক্ত" },
  "spec.val.onRequest": { en: "Arranged on request", bn: "অনুরোধে ব্যবস্থা" },
  "spec.val.vibratory": { en: "Vibratory / Static", bn: "ভাইব্রেটরি / স্ট্যাটিক" },
  "spec.val.lift": { en: "Lift & Place", bn: "লিফট ও প্লেস" },
  "spec.val.cyclic": { en: "Heavy-duty cyclic", bn: "হেভি-ডিউটি সাইক্লিক" },
  "spec.val.diesel": { en: "Diesel", bn: "ডিজেল" },
  "spec.val.allTerrain": { en: "All-terrain hydraulic", bn: "অল-টেরেইন হাইড্রোলিক" },
  "spec.val.oem": { en: "OEM standard", bn: "OEM স্ট্যান্ডার্ড" },
  "spec.val.cis": { en: "City Inspection Services CIS/077/2018", bn: "City Inspection Services CIS/077/2018" },
  "spec.val.firstClass": { en: "1st Class Contractor & Supplier", bn: "১ম শ্রেণির ঠিকাদার ও সরবরাহকারী" },
  "spec.val.ppeProvided": { en: "Provided on every site", bn: "প্রতিটি সাইটে সরবরাহ" },
  "spec.val.insOnReq": { en: "On request for tendered works", bn: "টেন্ডার ওয়ার্কে অনুরোধে" },
  "spec.val.dash": { en: "—", bn: "—" },

  // ─── Reviews ─────────────────────────────────────────────────────
  "reviews.eyebrow": { en: "Customer Reviews", bn: "কাস্টমার রিভিউ" },
  "reviews.title": { en: "Trusted by Bangladesh's biggest builders.", bn: "বাংলাদেশের শীর্ষ নির্মাতাদের আস্থা।" },
  "reviews.based": { en: "based on", bn: "মোট" },
  "reviews.count": { en: "verified projects", bn: "ভেরিফায়েড প্রজেক্ট" },

  // Review content
  "review.1.author": { en: "Engr. Rahim Chowdhury", bn: "প্রকৌশলী রহিম চৌধুরী" },
  "review.1.company": { en: "MegaBuilders Corp.", bn: "মেগাবিল্ডার্স কর্প." },
  "review.1.body": { en: "Equipment delivered on time and in pristine condition. The ATDB team supported us through the entire bridge piling phase — operator discipline was outstanding.", bn: "ইকুইপমেন্ট সময়মতো এবং পরিপূর্ণ অবস্থায় পৌঁছেছে। ব্রিজ পাইলিং পর্যায়ের পুরোটাই ATDB টিম পাশে ছিল — অপারেটরদের ডিসিপ্লিন ছিল চমৎকার।" },
  "review.2.author": { en: "Engr. Tariqul Islam", bn: "প্রকৌশলী তারিকুল ইসলাম" },
  "review.2.company": { en: "National Infrastructure Solutions", bn: "ন্যাশনাল ইনফ্রাস্ট্রাকচার সলিউশনস" },
  "review.2.body": { en: "Maintenance logs were fully up to date — our compliance audit took minutes, not days. Highest tier supplier in the country.", bn: "মেইনটেন্যান্স লগ পূর্ণাঙ্গ আপডেট — কমপ্লায়েন্স অডিটে মিনিট লেগেছে, দিন নয়। দেশের সর্বোচ্চ মানের সরবরাহকারী।" },
  "review.3.author": { en: "Sajjad Hossain", bn: "সাজ্জাদ হোসেন" },
  "review.3.company": { en: "Pinnacle Developments", bn: "পিনাকল ডেভেলপমেন্টস" },
  "review.3.body": { en: "Reliable machinery and a WhatsApp response team that handles shift changes within minutes. Will rent from ATDB again.", bn: "নির্ভরযোগ্য মেশিনারি এবং দ্রুত রেসপন্সিভ হোয়াটসঅ্যাপ টিম — শিফট পরিবর্তন মিনিটেই। আবার ATDB থেকে ভাড়া নেব।" },

  // ─── Maps ────────────────────────────────────────────────────────
  "maps.eyebrow": { en: "Find Us", bn: "আমাদের খুঁজুন" },
  "maps.title": { en: "Two offices, one team.", bn: "দুটি অফিস, এক টিম।" },
  "maps.dhaka": { en: "Dhaka HQ", bn: "ঢাকা হেডকোয়ার্টার" },
  "maps.tangail": { en: "Tangail Branch", bn: "টাঙ্গাইল শাখা" },
  "maps.directions": { en: "Get Directions", bn: "ডিরেকশন নিন" },

  // ─── Footer ──────────────────────────────────────────────────────
  "footer.explore": { en: "Explore", bn: "অন্বেষণ" },
  "footer.offices": { en: "Offices", bn: "অফিস" },
  "footer.contact": { en: "Contact", bn: "যোগাযোগ" },
  "footer.bank": { en: "Bank", bn: "ব্যাংক" },
  "footer.tagline": { en: "Bangladesh's premier heavy equipment rental partner. Since 2000.", bn: "বাংলাদেশের সেরা হেভি ইকুইপমেন্ট রেন্টাল পার্টনার। ২০০০ সাল থেকে।" },
  "footer.rights": { en: "All rights reserved.", bn: "সর্বস্বত্ব সংরক্ষিত।" },
  "footer.credit": { en: "A SAZID HOSSAIN ARCHITECTURE", bn: "একটি সাজিদ হোসেন স্থাপত্য" },

  // ─── Cart ────────────────────────────────────────────────────────
  "common.addToQuote": { en: "Add to quote", bn: "কোটেশনে যোগ করুন" },
  "common.added": { en: "Added", bn: "যোগ হয়েছে" },
  "cart.title": { en: "Quotation Cart", bn: "কোটেশন কার্ট" },
  "cart.empty.t": { en: "Your quotation cart is empty.", bn: "আপনার কার্ট খালি।" },
  "cart.empty.d": { en: "Add equipment from the fleet pages to build a single consolidated WhatsApp quotation.", bn: "ফ্লিট পেজ থেকে ইকুইপমেন্ট যোগ করে একসাথে হোয়াটসঅ্যাপে কোটেশন পাঠান।" },
  "cart.project": { en: "Project Details", bn: "প্রজেক্ট ডিটেইলস" },
  "cart.location": { en: "Location", bn: "লোকেশন" },
  "cart.location.ph": { en: "Dhaka, Tangail, Mymensingh…", bn: "ঢাকা, টাঙ্গাইল, ময়মনসিংহ…" },
  "cart.start": { en: "Start", bn: "শুরু" },
  "cart.end": { en: "End", bn: "শেষ" },
  "cart.notes": { en: "Notes", bn: "নোট" },
  "cart.notes.ph": { en: "Site access, lift duration, special requirements…", bn: "সাইট অ্যাক্সেস, কাজের সময়, বিশেষ প্রয়োজন…" },
  "cart.send": { en: "Send Quote on WhatsApp", bn: "হোয়াটসঅ্যাপে কোটেশন পাঠান" },
  "cart.clear": { en: "Clear cart", bn: "কার্ট খালি করুন" },
  "cart.remove": { en: "Remove", bn: "সরান" },
  "cart.increase": { en: "Increase", bn: "বাড়ান" },
  "cart.decrease": { en: "Decrease", bn: "কমান" },
  "cart.close": { en: "Close", bn: "বন্ধ করুন" },

  // ─── Contact form & sidebar ──────────────────────────────────────
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
  "contact.sidebar.direct": { en: "Direct Lines", bn: "সরাসরি যোগাযোগ" },
  "contact.sidebar.directTitle": { en: "Speak to leadership.", bn: "নেতৃত্বের সাথে কথা বলুন।" },
  "contact.sidebar.officesTitle": { en: "Dhaka & Tangail.", bn: "ঢাকা ও টাঙ্গাইল।" },
  "contact.equipment.opt.cat": { en: "Categories", bn: "ক্যাটেগরি" },
  "contact.equipment.opt.brand": { en: "Brands", bn: "ব্র্যান্ড" },
  "contact.equipment.opt.cranes": { en: "Mobile Cranes", bn: "মোবাইল ক্রেন" },
  "contact.equipment.opt.rollers": { en: "Road Rollers", bn: "রোড রোলার" },
  "contact.equipment.opt.excavators": { en: "Excavators", bn: "এক্সক্যাভেটর" },
  "contact.equipment.opt.loaders": { en: "Loaders & Backhoes", bn: "লোডার ও ব্যাকহো" },
  "contact.equipment.opt.support": { en: "Support Equipment", bn: "সাপোর্ট ইকুইপমেন্ট" },

  // Phone label translations
  "phone.proprietor": { en: "Proprietor", bn: "মালিক" },
  "phone.ceo": { en: "CEO", bn: "সিইও" },

  // Office labels
  "office.dhaka": { en: "Dhaka", bn: "ঢাকা" },
  "office.tangail": { en: "Tangail", bn: "টাঙ্গাইল" },
  "office.corporate": { en: "Corporate Office", bn: "কর্পোরেট অফিস" },
  "office.branch": { en: "Branch Office", bn: "শাখা অফিস" },
  "office.dhaka.address": {
    en: "House #319 (8F), Lane #8, East Kazi Para, Kafrul, Dhaka-1216",
    bn: "বাড়ি #৩১৯ (৮ম তলা), লেন #৮, পূর্ব কাজীপাড়া, কাফরুল, ঢাকা-১২১৬",
  },
  "office.tangail.address": {
    en: "House #311 (2F), Boro Kalibari Road, Tangail-1900",
    bn: "বাড়ি #৩১১ (২য় তলা), বড় কালীবাড়ি রোড, টাঙ্গাইল-১৯০০",
  },

  // ─── About page ──────────────────────────────────────────────────
  "about.eyebrow": { en: "About ATDB", bn: "ATDB সম্পর্কে" },
  "about.title": { en: "Built in 2000. Trusted by Bangladesh's biggest builders.", bn: "২০০০ সালে প্রতিষ্ঠিত। বাংলাদেশের শীর্ষ নির্মাতাদের আস্থা।" },
  "about.lede": {
    en: "M/S ATDB Trade International is a 1st Class Contractor and Heavy Equipment Service Provider headquartered in Dhaka with a branch in Tangail. 25+ years of certified fleet operations, 25 permanent staff, and a portfolio that spans national infrastructure, pharma and industrial development.",
    bn: "M/S ATDB Trade International ঢাকায় সদর দপ্তর ও টাঙ্গাইলে শাখা সহ একটি ১ম শ্রেণির ঠিকাদার ও হেভি ইকুইপমেন্ট সার্ভিস প্রোভাইডার। ২৫+ বছরের সার্টিফাইড ফ্লিট অপারেশন, ২৫ জন স্থায়ী কর্মী এবং জাতীয় অবকাঠামো, ফার্মা ও ইন্ডাস্ট্রিয়াল উন্নয়নের পোর্টফোলিও।",
  },
  "about.leadership": { en: "Leadership", bn: "নেতৃত্ব" },
  "about.leadership.title": { en: "A family-owned operation, professionally run.", bn: "পারিবারিক মালিকানা, পেশাদার পরিচালনা।" },
  "about.role.proprietor": { en: "Proprietor", bn: "মালিক" },
  "about.role.ceo": { en: "Chief Executive Officer", bn: "প্রধান নির্বাহী কর্মকর্তা" },
  "about.credentials": { en: "Credentials", bn: "ক্রেডেনশিয়াল" },
  "about.credentials.title": { en: "Certified, compliant, audit-ready.", bn: "সার্টিফাইড, কমপ্লায়েন্ট, অডিট-রেডি।" },
  "about.cred.tin": { en: "TIN", bn: "TIN" },
  "about.cred.vat": { en: "VAT", bn: "VAT" },
  "about.cred.bank": { en: "Bank", bn: "ব্যাংক" },
  "about.cred.inspection": { en: "Inspection", bn: "ইন্সপেকশন" },
  "about.cred.class": { en: "Class", bn: "শ্রেণি" },
  "about.cred.classV": { en: "1st Class Contractor & Supplier", bn: "১ম শ্রেণির ঠিকাদার ও সরবরাহকারী" },
  "about.values": { en: "Our Values", bn: "আমাদের মূল্যবোধ" },
  "about.values.title": { en: "How we earn the call-back, every project.", bn: "প্রতিটি প্রজেক্টে কেন কাস্টমাররা আবার ফেরে।" },
  "about.value.safety.t": { en: "Safety First", bn: "সেফটি ফার্স্ট" },
  "about.value.safety.d": { en: "City Inspection Services certified equipment. Operator training and PPE compliance on every site.", bn: "City Inspection Services সার্টিফাইড ইকুইপমেন্ট। প্রতিটি সাইটে অপারেটর ট্রেনিং ও PPE।" },
  "about.value.compliance.t": { en: "Compliance", bn: "কমপ্লায়েন্স" },
  "about.value.compliance.d": { en: "TIN, VAT, Trade License and 1st Class Contractor status — full documentation for public-works tenders.", bn: "TIN, VAT, ট্রেড লাইসেন্স ও ১ম শ্রেণির ঠিকাদার মর্যাদা — পাবলিক ওয়ার্কস টেন্ডারের জন্য সম্পূর্ণ ডকুমেন্টেশন।" },
  "about.value.reliability.t": { en: "Reliability", bn: "নির্ভরযোগ্যতা" },
  "about.value.reliability.d": { en: "26 years of uninterrupted operations across roads, bridges, pharma and industrial projects.", bn: "২৬ বছরের নিরবিচ্ছিন্ন অপারেশন — রোড, ব্রিজ, ফার্মা ও ইন্ডাস্ট্রিয়াল প্রজেক্টে।" },
  "about.value.responsibility.t": { en: "Responsibility", bn: "দায়িত্বশীলতা" },
  "about.value.responsibility.d": { en: "Environmental and safety policies aligned with national and donor-agency standards.", bn: "জাতীয় ও ডোনার এজেন্সির মানদণ্ডের সাথে সামঞ্জস্যপূর্ণ পরিবেশ ও সেফটি পলিসি।" },

  // ─── Projects page ───────────────────────────────────────────────
  "projects.eyebrow": { en: "Project Portfolio", bn: "প্রজেক্ট পোর্টফোলিও" },
  "projects.title": { en: "Powering national infrastructure & industrial development.", bn: "জাতীয় অবকাঠামো ও ইন্ডাস্ট্রিয়াল উন্নয়নে শক্তি যোগাচ্ছি।" },
  "projects.lede": { en: "M/S ATDB Trade International has successfully delivered a wide spectrum of heavy engineering, civil construction and infrastructure works across Bangladesh. Below is a categorised view of our major executed projects.", bn: "মেসার্স ATDB ট্রেড ইন্টারন্যাশনাল সারা বাংলাদেশে বিভিন্ন ভারী প্রকৌশল, সিভিল কন্সট্রাকশন ও অবকাঠামোগত কাজ সফলভাবে সম্পন্ন করেছে। আমাদের উল্লেখযোগ্য সম্পন্নকৃত প্রজেক্টসমূহ ক্যাটাগরি অনুযায়ী নিচে দেওয়া হলো।" },
  "projects.cta.title": { en: "Have a project in mind?", bn: "নতুন প্রজেক্ট আছে?" },
  "projects.cta.body": { en: "From mega-bridge approaches to factory drainage — talk to ATDB about your scope, timeline and equipment needs.", bn: "মেগা-ব্রিজ অ্যাপ্রোচ থেকে শুরু করে ফ্যাক্টরি ড্রেনেজ — আপনার স্কোপ, টাইমলাইন ও ইকুইপমেন্ট প্রয়োজনের কথা ATDB-কে জানান।" },

  // Project category headings
  "pcat.infra.t": { en: "Mega Infrastructure & Highway Projects", bn: "মেগা ইনফ্রাস্ট্রাকচার ও হাইওয়ে প্রজেক্ট" },
  "pcat.infra.s": { en: "National corridors, bridges and highway works.", bn: "জাতীয় করিডোর, সেতু ও হাইওয়ে কাজ।" },
  "pcat.industrial.t": { en: "Industrial & Factory Building Construction", bn: "শিল্প ও কারখানা ভবন নির্মাণ" },
  "pcat.industrial.s": { en: "Pharma plants, factory shells and supporting structures.", bn: "ফার্মা প্ল্যান্ট, ফ্যাক্টরি বিল্ডিং ও সহায়ক কাঠামো।" },
  "pcat.roads.t": { en: "Roadways & Pavement Construction", bn: "অভ্যন্তরীণ সড়ক ও পেভমেন্ট নির্মাণ" },
  "pcat.roads.s": { en: "Internal bituminous and RCC paved roads.", bn: "অভ্যন্তরীণ বিটুমিনাস ও আর.সি.সি পেভড সড়ক।" },
  "pcat.civil.t": { en: "Drainage, Reservoirs & Specialised Civil Works", bn: "ড্রেনেজ, রিজার্ভার ও বিশেষ সিভিল ওয়ার্কস" },
  "pcat.civil.s": { en: "Underground tanks, ETPs, drainage networks and retaining walls.", bn: "ভূগর্ভস্থ ট্যাংক, ETP, ড্রেনেজ নেটওয়ার্ক ও রিটেইনিং ওয়াল।" },

  // Project cards — Mega Infra
  "pj.brt.t": { en: "BRT Project (Airport → Gazipur)", bn: "বিআরটি প্রজেক্ট (এয়ারপোর্ট → গাজীপুর)" },
  "pj.brt.l": { en: "Dhaka–Gazipur Corridor", bn: "ঢাকা–গাজীপুর করিডোর" },
  "pj.brt.s": { en: "Extensive cleaning, de-watering and pavement repair works along the BRT elevated corridor.", bn: "বিআরটি এলিভেটেড করিডোরজুড়ে ব্যাপক ক্লিনিং, ডি-ওয়াটারিং এবং পেভমেন্ট মেরামত কাজ।" },
  "pj.jamuna.t": { en: "Jamuna Multipurpose Bridge — Contract 1", bn: "যমুনা বহুমুখী সেতু — কন্ট্রাক্ট ১" },
  "pj.jamuna.l": { en: "Tangail / Sirajganj", bn: "টাঙ্গাইল / সিরাজগঞ্জ" },
  "pj.jamuna.s": { en: "Critical site clearance and outstanding remedial civil works on the iconic Jamuna bridge.", bn: "যমুনা সেতুর গুরুত্বপূর্ণ সাইট ক্লিয়ারেন্স এবং অবশিষ্ট রেমিডিয়াল সিভিল ওয়ার্কস।" },
  "pj.rtip2.t": { en: "RTIP-2 Road Project", bn: "RTIP-2 রোড প্রজেক্ট" },
  "pj.rtip2.l": { en: "Ghatail, Tangail · Ch. 15+800 → 14+800", bn: "ঘাটাইল, টাঙ্গাইল · চেইনেজ ১৫+৮০০ → ১৪+৮০০" },
  "pj.rtip2.s": { en: "Roadway construction, repair and maintenance across a 1 km chainage section.", bn: "১ কি.মি. চেইনেজ অংশজুড়ে সড়ক নির্মাণ, মেরামত ও রক্ষণাবেক্ষণ কাজ।" },

  // Project cards — Industrial
  "pj.centeon.t": { en: "Centeon Pharma — 3-Storey RCC Factory", bn: "সেন্টিয়ন ফার্মা — ৩-তলা আর.সি.সি ফ্যাক্টরি" },
  "pj.centeon.l": { en: "Mowna, Sreepur, Gazipur", bn: "মাওনা, শ্রীপুর, গাজীপুর" },
  "pj.centeon.s": { en: "45,000 sq.ft 3-storey RCC factory building, utility structures and 500 m boundary wall.", bn: "৪৫,০০০ স্কয়ার ফিটের ৩-তলা আর.সি.সি ফ্যাক্টরি বিল্ডিং, ইউটিলিটি স্ট্রাকচার ও ৫০০ মি. সীমানা প্রাচীর।" },
  "pj.pharmacil.t": { en: "Pharmacil Ltd — 3-Storey Factory", bn: "ফার্মাসিল লিমিটেড — ৩-তলা ফ্যাক্টরি" },
  "pj.pharmacil.l": { en: "BSCIC, Tongi", bn: "বিসিক, টঙ্গী" },
  "pj.pharmacil.s": { en: "Construction of a 33,000 sq.ft 3-storey pharmaceutical factory building.", bn: "৩৩,০০০ স্কয়ার ফিটের ৩-তলা ফার্মাসিউটিক্যাল ফ্যাক্টরি বিল্ডিং নির্মাণ।" },
  "pj.pasite.t": { en: "Pharma Ashia Ltd — Site Development", bn: "ফার্মা এশিয়া লিমিটেড — সাইট ডেভেলপমেন্ট" },
  "pj.pasite.l": { en: "Rajendrapur, Gazipur", bn: "রাজেন্দ্রপুর, গাজীপুর" },
  "pj.pasite.s": { en: "General site development, protection-bund works and temporary site offices.", bn: "সাইট ডেভেলপমেন্ট, সাইট প্রোটেকশন বাঁধ নির্মাণ ও অস্থায়ী সাইট অফিস স্থাপন।" },

  // Project cards — Roads
  "pj.paroad.t": { en: "Pharma Ashia — Bituminous Internal Road", bn: "ফার্মা এশিয়া — বিটুমিনাস অভ্যন্তরীণ সড়ক" },
  "pj.paroad.l": { en: "Gazipur · 400 m × 6 m", bn: "গাজীপুর · ৪০০ মি. × ৬ মি." },
  "pj.paroad.s": { en: "Construction of an internal bituminous carpeting road, 400 m long × 6 m wide.", bn: "৪০০ মি. দীর্ঘ ও ৬ মি. চওড়া অভ্যন্তরীণ বিটুমিনাস কার্পেটিং সড়ক নির্মাণ।" },
  "pj.crccroad.t": { en: "Centeon Pharma — RCC Internal Road", bn: "সেন্টিয়ন ফার্মা — আর.সি.সি অভ্যন্তরীণ সড়ক" },
  "pj.crccroad.l": { en: "Gazipur · 300 m × 5.5 m", bn: "গাজীপুর · ৩০০ মি. × ৫.৫ মি." },
  "pj.crccroad.s": { en: "Construction of an internal RCC paved road, 300 m long × 5.5 m wide.", bn: "৩০০ মি. দীর্ঘ ও ৫.৫ মি. চওড়া অভ্যন্তরীণ আর.সি.সি পেভড রোড নির্মাণ।" },
  "pj.amcroad.t": { en: "AMC Knit Composite — RCC Internal Road", bn: "এএমসি নিট কম্পোজিট — আর.সি.সি অভ্যন্তরীণ সড়ক" },
  "pj.amcroad.l": { en: "Bhabanipur, Gazipur · 300 m × 5 m", bn: "ভবানীপুর, গাজীপুর · ৩০০ মি. × ৫ মি." },
  "pj.amcroad.s": { en: "Construction of an internal RCC paved road, 300 m long × 5 m wide.", bn: "৩০০ মি. দীর্ঘ ও ৫ মি. চওড়া অভ্যন্তরীণ আর.সি.সি পেভড রোড নির্মাণ।" },

  // Project cards — Civil
  "pj.smcres.t": { en: "SMC ORS — Underground RCC Reservoir", bn: "এসএমসি ওআরএস — ভূগর্ভস্থ আর.সি.সি রিজার্ভার" },
  "pj.smcres.l": { en: "Bhaluka, Mymensingh · 20 m × 10 m × 3 m", bn: "ভালুকা, ময়মনসিংহ · ২০ মি. × ১০ মি. × ৩ মি." },
  "pj.smcres.s": { en: "Construction of a raw + treated water underground RCC reservoir.", bn: "র' এবং ট্রিটেড পানির ভূগর্ভস্থ আর.সি.সি রিজার্ভার নির্মাণ।" },
  "pj.smcdr.t": { en: "SMC ORS — 900 mm RCC Drainage Network", bn: "এসএমসি ওআরএস — ৯০০ মি.মি. আর.সি.সি ড্রেনেজ নেটওয়ার্ক" },
  "pj.smcdr.l": { en: "Bhaluka, Mymensingh", bn: "ভালুকা, ময়মনসিংহ" },
  "pj.smcdr.s": { en: "Excavation and laying of 900 mm dia. RCC pipes for internal & external drainage.", bn: "অভ্যন্তরীণ ও বাহ্যিক ড্রেনেজের জন্য ৯০০ মি.মি. ব্যাসের আর.সি.সি পাইপ স্থাপন ও খনন।" },
  "pj.nassa.t": { en: "Nassa Super Garments — 800 mm RCC Drainage", bn: "নাসা সুপার গার্মেন্টস — ৮০০ মি.মি. আর.সি.সি ড্রেনেজ" },
  "pj.nassa.l": { en: "Ashulia, Savar", bn: "আশুলিয়া, সাভার" },
  "pj.nassa.s": { en: "Excavation and laying of 800 mm dia. RCC pipes for comprehensive drainage works.", bn: "ব্যাপক ড্রেনেজ কাজের জন্য ৮০০ মি.মি. ব্যাসের আর.সি.সি পাইপ স্থাপন ও খনন।" },
  "pj.cetp.t": { en: "Centeon Pharma — Effluent Treatment Plant", bn: "সেন্টিয়ন ফার্মা — এফ্লুয়েন্ট ট্রিটমেন্ট প্ল্যান্ট" },
  "pj.cetp.l": { en: "Gazipur · 12 m × 6 m", bn: "গাজীপুর · ১২ মি. × ৬ মি." },
  "pj.cetp.s": { en: "Construction of a 12 m × 6 m ETP and site-protection RCC retaining walls.", bn: "১২ মি. × ৬ মি. ETP এবং সাইট সুরক্ষার জন্য আর.সি.সি রিটেইনিং ওয়াল নির্মাণ।" },
  "pj.amcwall.t": { en: "AMC Knit Composite — RCC Retaining Walls", bn: "এএমসি নিট কম্পোজিট — আর.সি.সি রিটেইনিং ওয়াল" },
  "pj.amcwall.l": { en: "Gazipur", bn: "গাজীপুর" },
  "pj.amcwall.s": { en: "Construction of robust reinforced-concrete retaining walls.", bn: "মজবুত আর.সি.সি (রিইনফোর্সড কংক্রিট) রিটেইনিং ওয়াল নির্মাণ।" },

  // Legacy keys — kept for the home-page strip & SEO meta on existing routes
  "project.rtip.t": { en: "RTIP-2 Road Project", bn: "RTIP-2 রোড প্রজেক্ট" },
  "project.rtip.l": { en: "Ghatail, Tangail", bn: "ঘাটাইল, টাঙ্গাইল" },
  "project.rtip.s": { en: "Road compaction & asphalt works — multi-month roller deployment.", bn: "রোড কম্প্যাকশন ও অ্যাসফল্ট কাজ — বহু-মাসব্যাপী রোলার মোতায়েন।" },
  "project.jamuna.t": { en: "Jamuna Multipurpose Bridge", bn: "যমুনা বহুমুখী সেতু" },
  "project.jamuna.l": { en: "Tangail / Sirajganj", bn: "টাঙ্গাইল / সিরাজগঞ্জ" },
  "project.jamuna.s": { en: "Heavy crane deployment for steel girder placement and approach works.", bn: "স্টিল গার্ডার বসানো ও অ্যাপ্রোচ কাজে হেভি ক্রেন মোতায়েন।" },
  "project.pharmaA.t": { en: "Pharma Ashia Facility", bn: "ফার্মা এশিয়া ফ্যাসিলিটি" },
  "project.pharmaA.l": { en: "Dhaka", bn: "ঢাকা" },
  "project.pharmaA.s": { en: "Site preparation, foundation excavation, and structural support equipment.", bn: "সাইট প্রস্তুতি, ফাউন্ডেশন এক্সকাভেশন ও স্ট্রাকচারাল সাপোর্ট ইকুইপমেন্ট।" },
  "project.centeon.t": { en: "Centeon Pharma Plant", bn: "সেন্টিয়ন ফার্মা প্ল্যান্ট" },
  "project.centeon.l": { en: "Dhaka", bn: "ঢাকা" },
  "project.centeon.s": { en: "Earthworks and material handling across the build-out phase.", bn: "নির্মাণ পর্যায়জুড়ে আর্থওয়ার্ক ও মেটেরিয়াল হ্যান্ডলিং।" },
  "project.brt.t": { en: "BRT Airport–Gazipur", bn: "BRT এয়ারপোর্ট–গাজীপুর" },
  "project.brt.l": { en: "Dhaka–Gazipur Corridor", bn: "ঢাকা–গাজীপুর করিডোর" },
  "project.brt.s": { en: "Compaction fleet for elevated corridor pavement works.", bn: "এলিভেটেড করিডোর পেভমেন্ট কাজের জন্য কম্প্যাকশন ফ্লিট।" },
  "project.nassa.t": { en: "NASSA Group Industrial Build", bn: "NASSA গ্রুপ ইন্ডাস্ট্রিয়াল নির্মাণ" },
  "project.nassa.l": { en: "Dhaka", bn: "ঢাকা" },
  "project.nassa.s": { en: "Crane and excavator support for industrial expansion.", bn: "ইন্ডাস্ট্রিয়াল সম্প্রসারণে ক্রেন ও এক্সক্যাভেটর সাপোর্ট।" },
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
