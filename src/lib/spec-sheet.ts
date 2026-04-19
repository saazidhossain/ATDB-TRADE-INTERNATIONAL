// Generates a branded one-page PDF spec sheet for an Equipment item.
// Pure client-side jsPDF — no server roundtrip.
//
// Bengali support: when lang === "bn" we lazily embed Noto Sans Bengali
// (≈280 KB total, code-split). For English we keep Helvetica which is
// already inside jsPDF — zero extra bytes.

import { jsPDF } from "jspdf";
import { COMPANY, PRIMARY_WHATSAPP, type Equipment, CATEGORIES } from "@/lib/atdb-data";
import type { Lang } from "@/lib/i18n";
import { ensureBengaliFont, BN_FONT } from "@/lib/pdf-fonts";

// Brand tokens (mirror src/styles.css safety/iron values)
const SAFETY: [number, number, number] = [255, 153, 0];
const IRON: [number, number, number] = [38, 42, 50];
const MUTED: [number, number, number] = [120, 124, 132];
const BORDER: [number, number, number] = [220, 222, 226];
const ZEBRA: [number, number, number] = [248, 249, 251];

async function loadImageAsDataUrl(src: string): Promise<{ data: string; w: number; h: number } | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext("2d");
        if (!ctx) return resolve(null);
        ctx.drawImage(img, 0, 0);
        resolve({ data: canvas.toDataURL("image/jpeg", 0.85), w: img.naturalWidth, h: img.naturalHeight });
      } catch {
        resolve(null);
      }
    };
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

// Sanitise punctuation that Helvetica's WinAnsi encoding doesn't ship.
// (Noto handles everything, so this is a no-op when bn font is active.)
function ascii(s: string): string {
  return s
    .replace(/[\u2018\u2019\u201A\u201B]/g, "'")
    .replace(/[\u201C\u201D\u201E\u201F]/g, '"')
    .replace(/[\u2013\u2014]/g, "-")
    .replace(/\u2026/g, "...")
    .replace(/[^\x09\x0A\x0D\x20-\x7E\u00A0-\u00FF]/g, "");
}

type T = (k: string) => string;

interface Strings {
  title: string;
  contact: string;
  phoneL: string;
  emailL: string;
  whatsappL: string;
  disclaimer: string;
  generated: string;
  category: string;
  brand: string;
  model: string;
  capacity: string;
  origin: string;
  year: string;
  fuel: string;
  fleet: string;
  operator: string;
  operatorVal: string;
  inspection: string;
  inspectionVal: string;
  assetId: string;
  unitSuffix: string;
}

const STRINGS_EN: Strings = {
  title: "Equipment Specification Sheet",
  contact: "Contact ATDB Trade International",
  phoneL: "Phone",
  emailL: "Email",
  whatsappL: "WhatsApp",
  disclaimer: "Specifications are indicative. Inspection-certified, operator included, mobilisation on request.",
  generated: "Generated",
  category: "Category",
  brand: "Brand",
  model: "Model",
  capacity: "Capacity",
  origin: "Country of Origin",
  year: "Year of Manufacture",
  fuel: "Fuel",
  fleet: "In Fleet",
  operator: "Operator",
  operatorVal: "Certified operator included",
  inspection: "Inspection",
  inspectionVal: "City Inspection Services CIS/077/2018",
  assetId: "Asset ID",
  unitSuffix: "unit(s)",
};

const STRINGS_BN: Strings = {
  title: "ইকুইপমেন্ট স্পেসিফিকেশন শিট",
  contact: "যোগাযোগ — ATDB Trade International",
  phoneL: "ফোন",
  emailL: "ইমেইল",
  whatsappL: "হোয়াটসঅ্যাপ",
  disclaimer: "স্পেসিফিকেশন নির্দেশক। ইন্সপেকশন-সার্টিফাইড, অপারেটর সহ, অনুরোধে মোবিলাইজেশন।",
  generated: "তৈরি",
  category: "ক্যাটাগরি",
  brand: "ব্র্যান্ড",
  model: "মডেল",
  capacity: "ক্যাপাসিটি",
  origin: "উৎপত্তি দেশ",
  year: "নির্মাণ বছর",
  fuel: "জ্বালানি",
  fleet: "ফ্লিটে",
  operator: "অপারেটর",
  operatorVal: "সার্টিফাইড অপারেটর সহ",
  inspection: "ইন্সপেকশন",
  inspectionVal: "City Inspection Services CIS/077/2018",
  assetId: "অ্যাসেট আইডি",
  unitSuffix: "ইউনিট",
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function generateSpecSheet(eq: Equipment, _t: T, lang: Lang) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 40;

  const isBn = lang === "bn";
  if (isBn) await ensureBengaliFont(doc);

  const S = isBn ? STRINGS_BN : STRINGS_EN;
  const sansFamily = isBn ? BN_FONT : "helvetica";

  // Helper: set font (style: 'normal' | 'bold'), with fallback to helvetica for ASCII-only strings.
  const setFont = (style: "normal" | "bold") => doc.setFont(sansFamily, style);
  const text = (str: string, x: number, y: number, opts?: { align?: "left" | "right" | "center" }) => {
    doc.text(isBn ? str : ascii(str), x, y, opts);
  };

  // ── Header band ────────────────────────────────────────────────
  doc.setFillColor(...IRON);
  doc.rect(0, 0, pageW, 72, "F");
  doc.setFillColor(...SAFETY);
  doc.rect(0, 72, pageW, 3, "F");

  doc.setTextColor(255, 255, 255);
  setFont("bold");
  doc.setFontSize(15);
  // Company name is Latin — use helvetica for crisp rendering even in BN mode.
  doc.setFont("helvetica", "bold");
  doc.text(ascii(COMPANY.name), margin, 34);

  setFont("normal");
  doc.setFontSize(9);
  doc.setTextColor(200, 204, 212);
  text(S.title, margin, 52);

  // Asset id (Latin) + date — helvetica for both
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(...SAFETY);
  doc.text(eq.id, pageW - margin, 34, { align: "right" });
  doc.setTextColor(200, 204, 212);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  const dateStr = new Date().toLocaleDateString(isBn ? "bn-BD" : "en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  // Bengali date contains BN script — use sansFamily.
  if (isBn) setFont("normal");
  text(dateStr, pageW - margin, 52, { align: "right" });

  // ── Hero image ─────────────────────────────────────────────────
  let cursorY = 100;
  const img = await loadImageAsDataUrl(eq.image);
  if (img) {
    const boxW = pageW - margin * 2;
    const boxH = 220;
    const ratio = img.w / img.h;
    let drawW = boxW;
    let drawH = drawW / ratio;
    if (drawH > boxH) {
      drawH = boxH;
      drawW = drawH * ratio;
    }
    const dx = margin + (boxW - drawW) / 2;
    doc.setFillColor(245, 246, 248);
    doc.rect(margin, cursorY, boxW, boxH, "F");
    doc.addImage(img.data, "JPEG", dx, cursorY + (boxH - drawH) / 2, drawW, drawH);
    cursorY += boxH + 22;
  }

  // ── Title block ────────────────────────────────────────────────
  doc.setTextColor(...IRON);
  setFont("bold");
  doc.setFontSize(20);
  text(eq.name, margin, cursorY);
  cursorY += 18;
  setFont("normal");
  doc.setFontSize(10);
  doc.setTextColor(...MUTED);
  const sublineParts = [eq.brand, eq.capacity, eq.origin];
  if (eq.year) sublineParts.push(String(eq.year));
  text(sublineParts.join("  ·  "), margin, cursorY);
  cursorY += 24;

  // ── Specs table ────────────────────────────────────────────────
  const rows: [string, string][] = [
    [S.assetId, eq.id],
    [S.category, CATEGORIES[eq.category].label],
    [S.brand, eq.brand],
    [S.model, eq.model],
    [S.capacity, eq.capacity],
    [S.origin, eq.origin],
    ...((eq.year ? [[S.year, String(eq.year)]] : []) as [string, string][]),
    ...((eq.fuel ? [[S.fuel, eq.fuel]] : []) as [string, string][]),
    ...((eq.quantity
      ? [[S.fleet, `${String(eq.quantity).padStart(2, "0")} ${S.unitSuffix}`]]
      : []) as [string, string][]),
    [S.operator, S.operatorVal],
    [S.inspection, S.inspectionVal],
  ];

  const rowH = 22;
  const tableW = pageW - margin * 2;
  const labelX = margin + 14;
  const valueX = margin + tableW * 0.42;

  doc.setDrawColor(...BORDER);
  doc.setLineWidth(0.5);
  doc.line(margin, cursorY - 14, margin + tableW, cursorY - 14);

  doc.setFontSize(9);
  rows.forEach((r, i) => {
    const y = cursorY + i * rowH;
    if (i % 2 === 0) {
      doc.setFillColor(...ZEBRA);
      doc.rect(margin, y - 14, tableW, rowH, "F");
    }
    setFont("bold");
    doc.setTextColor(...MUTED);
    // Bengali script doesn't have an "uppercase" — only uppercase Latin labels.
    const labelOut = isBn ? r[0] : r[0].toUpperCase();
    text(labelOut, labelX, y);
    setFont("normal");
    doc.setTextColor(...IRON);
    text(r[1], valueX, y);
  });
  const tableBottom = cursorY + rows.length * rowH - 14;
  doc.line(margin, tableBottom, margin + tableW, tableBottom);
  cursorY = tableBottom + 24;

  // ── Footer / contact card ──────────────────────────────────────
  const footerH = 102;
  const footerY = pageH - margin - footerH;
  doc.setDrawColor(...BORDER);
  doc.setFillColor(252, 252, 253);
  doc.roundedRect(margin, footerY, pageW - margin * 2, footerH, 6, 6, "FD");
  doc.setFillColor(...SAFETY);
  doc.rect(margin, footerY, 3, footerH, "F");

  doc.setTextColor(...IRON);
  setFont("bold");
  doc.setFontSize(11);
  text(S.contact, margin + 18, footerY + 22);

  setFont("normal");
  doc.setFontSize(9);
  doc.setTextColor(...MUTED);
  const phones = COMPANY.phones.map((p) => p.number).join("  ·  ");
  // Mixed lines: BN label + Latin value. Render label in sansFamily, value in helvetica
  // by drawing them as two segments to keep numerals crisp.
  const drawLabeled = (label: string, value: string, y: number) => {
    setFont("bold");
    doc.setTextColor(...IRON);
    text(label, margin + 18, y);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...MUTED);
    doc.text(ascii(value), margin + 90, y);
  };

  drawLabeled(S.phoneL, phones, footerY + 42);
  drawLabeled(S.emailL, COMPANY.email, footerY + 56);
  if (PRIMARY_WHATSAPP) drawLabeled(S.whatsappL, `+${PRIMARY_WHATSAPP}`, footerY + 70);

  setFont("normal");
  doc.setTextColor(...MUTED);
  doc.setFontSize(8);
  text(S.disclaimer, margin + 18, footerY + 90);

  // Page footer label
  doc.setFontSize(7.5);
  doc.setTextColor(...MUTED);
  text(`${S.generated} ${dateStr}  ·  ${COMPANY.name}`, pageW - margin, pageH - 16, {
    align: "right",
  });

  doc.save(`ATDB_${eq.id}_${eq.brand.replace(/\s+/g, "")}.pdf`);
}
