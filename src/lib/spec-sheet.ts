// Generates a branded one-page PDF spec sheet for an Equipment item.
// Pure client-side jsPDF — no server roundtrip.
//
// NOTE: jsPDF's default Helvetica only supports Latin/WinAnsi. Bengali script
// renders as garbled glyphs (tofu) without an embedded font. To keep the PDF
// always-readable we render it in English regardless of UI language. The
// download CTA in the UI can stay localised, but the document content is EN.

import { jsPDF } from "jspdf";
import { COMPANY, PRIMARY_WHATSAPP, type Equipment, CATEGORIES } from "@/lib/atdb-data";
import type { Lang } from "@/lib/i18n";

// Brand tokens (mirror src/styles.css safety/iron values)
const SAFETY: [number, number, number] = [255, 153, 0]; // hi-vis orange
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

// Strip any non-WinAnsi characters so they never render as tofu in jsPDF.
// We replace common typographic punctuation with plain ASCII and drop
// anything outside the safe range as a last resort.
function ascii(s: string): string {
  return s
    .replace(/[\u2018\u2019\u201A\u201B]/g, "'")
    .replace(/[\u201C\u201D\u201E\u201F]/g, '"')
    .replace(/[\u2013\u2014]/g, "-")
    .replace(/\u2026/g, "...")
    .replace(/\u00B7/g, "·") // keep middle dot — supported in WinAnsi
    .replace(/[^\x09\x0A\x0D\x20-\x7E\u00A0-\u00FF]/g, "");
}

type T = (k: string) => string;

// We accept `t` and `lang` for API symmetry, but ignore them for content.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function generateSpecSheet(eq: Equipment, _t: T, _lang: Lang) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 40;

  // ── Header band ────────────────────────────────────────────────
  doc.setFillColor(...IRON);
  doc.rect(0, 0, pageW, 72, "F");
  doc.setFillColor(...SAFETY);
  doc.rect(0, 72, pageW, 3, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.text(ascii(COMPANY.name), margin, 34);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(200, 204, 212);
  doc.text("Equipment Specification Sheet", margin, 52);

  // Right side — asset id + date
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(...SAFETY);
  doc.text(eq.id, pageW - margin, 34, { align: "right" });
  doc.setTextColor(200, 204, 212);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  const dateStr = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  doc.text(dateStr, pageW - margin, 52, { align: "right" });

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
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text(ascii(eq.name), margin, cursorY);
  cursorY += 18;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(...MUTED);
  const sublineParts = [eq.brand, eq.capacity, eq.origin];
  if (eq.year) sublineParts.push(String(eq.year));
  doc.text(ascii(sublineParts.join("  ·  ")), margin, cursorY);
  cursorY += 24;

  // ── Specs table ────────────────────────────────────────────────
  const rows: [string, string][] = [
    ["Asset ID", eq.id],
    ["Category", CATEGORIES[eq.category].label],
    ["Brand", eq.brand],
    ["Model", eq.model],
    ["Capacity", eq.capacity],
    ["Country of Origin", eq.origin],
    ...((eq.year ? [["Year of Manufacture", String(eq.year)]] : []) as [string, string][]),
    ...((eq.fuel ? [["Fuel", eq.fuel]] : []) as [string, string][]),
    ...((eq.quantity ? [["In Fleet", `${String(eq.quantity).padStart(2, "0")} unit(s)`]] : []) as [string, string][]),
    ["Operator", "Certified operator included"],
    ["Inspection", "City Inspection Services CIS/077/2018"],
  ];

  const rowH = 22;
  const tableW = pageW - margin * 2;
  const labelX = margin + 14;
  const valueX = margin + tableW * 0.42;

  // Top border
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
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...MUTED);
    doc.text(ascii(r[0].toUpperCase()), labelX, y);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...IRON);
    doc.text(ascii(r[1]), valueX, y);
  });
  const tableBottom = cursorY + rows.length * rowH - 14;
  doc.line(margin, tableBottom, margin + tableW, tableBottom);
  cursorY = tableBottom + 24;

  // ── Footer / contact card ──────────────────────────────────────
  const footerH = 96;
  const footerY = pageH - margin - footerH;
  doc.setDrawColor(...BORDER);
  doc.setFillColor(252, 252, 253);
  doc.roundedRect(margin, footerY, pageW - margin * 2, footerH, 6, 6, "FD");
  doc.setFillColor(...SAFETY);
  doc.rect(margin, footerY, 3, footerH, "F");

  doc.setTextColor(...IRON);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("Contact ATDB Trade International", margin + 18, footerY + 22);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...MUTED);
  const phones = COMPANY.phones.map((p) => p.number).join("  ·  ");
  const lines: string[] = [
    `Phone     ${phones}`,
    `Email     ${COMPANY.email}`,
  ];
  if (PRIMARY_WHATSAPP) lines.push(`WhatsApp  +${PRIMARY_WHATSAPP}`);
  lines.push(""); // gap
  lines.push("Specifications are indicative. Inspection-certified, operator included, mobilisation on request.");
  lines.forEach((line, i) => {
    doc.text(ascii(line), margin + 18, footerY + 40 + i * 12);
  });

  // Page footer label
  doc.setFontSize(7.5);
  doc.setTextColor(...MUTED);
  doc.text(`Generated ${dateStr}  ·  ${COMPANY.name}`, pageW - margin, pageH - 16, {
    align: "right",
  });

  doc.save(`ATDB_${eq.id}_${eq.brand.replace(/\s+/g, "")}.pdf`);
}
