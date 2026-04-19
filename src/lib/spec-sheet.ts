// Generates a branded one-page PDF spec sheet for an Equipment item.
// Pure client-side jsPDF — no server roundtrip.

import { jsPDF } from "jspdf";
import { COMPANY, type Equipment, CATEGORIES } from "@/lib/atdb-data";
import type { Lang } from "@/lib/i18n";

// Brand tokens (mirror src/styles.css safety/iron values)
const SAFETY: [number, number, number] = [255, 153, 0]; // hi-vis orange
const IRON: [number, number, number] = [38, 42, 50];
const MUTED: [number, number, number] = [120, 124, 132];
const BORDER: [number, number, number] = [220, 222, 226];

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

type T = (k: string) => string;

export async function generateSpecSheet(eq: Equipment, t: T, lang: Lang) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 36;

  // ── Header band ────────────────────────────────────────────────
  doc.setFillColor(...IRON);
  doc.rect(0, 0, pageW, 70, "F");
  doc.setFillColor(...SAFETY);
  doc.rect(0, 70, pageW, 4, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text(COMPANY.name, margin, 32);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(220, 222, 226);
  doc.text(t("pdf.title"), margin, 50);
  // Right side — asset id
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(...SAFETY);
  doc.text(eq.id, pageW - margin, 32, { align: "right" });
  doc.setTextColor(220, 222, 226);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.text(new Date().toLocaleDateString(lang === "bn" ? "bn-BD" : "en-GB"), pageW - margin, 50, { align: "right" });

  // ── Hero image ─────────────────────────────────────────────────
  let cursorY = 100;
  const img = await loadImageAsDataUrl(eq.image);
  if (img) {
    const boxW = pageW - margin * 2;
    const boxH = 230;
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
    cursorY += boxH + 18;
  }

  // ── Title block ────────────────────────────────────────────────
  doc.setTextColor(...IRON);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  // jsPDF can't render Bengali in default fonts; fallback to brand+model for BN to keep readability
  const safeName = lang === "bn" ? `${eq.brand} ${eq.model}` : eq.name;
  doc.text(safeName, margin, cursorY);
  cursorY += 18;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(...MUTED);
  const subline = `${eq.brand} · ${eq.capacity} · ${eq.origin}${eq.year ? ` · ${eq.year}` : ""}`;
  doc.text(subline, margin, cursorY);
  cursorY += 22;

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
    ...((eq.quantity ? [["In Fleet", `${eq.quantity} unit(s)`]] : []) as [string, string][]),
    ["Operator", "Certified operator included"],
    ["Inspection", "City Inspection Services CIS/077/2018"],
  ];

  const rowH = 22;
  const colW = (pageW - margin * 2) / 2;
  doc.setFontSize(9);
  rows.forEach((r, i) => {
    const y = cursorY + i * rowH;
    if (i % 2 === 0) {
      doc.setFillColor(248, 249, 251);
      doc.rect(margin, y - 14, pageW - margin * 2, rowH, "F");
    }
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...MUTED);
    doc.text(r[0].toUpperCase(), margin + 10, y);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...IRON);
    doc.text(r[1], margin + colW, y);
  });
  cursorY += rows.length * rowH + 14;

  // ── Footer / contact card ──────────────────────────────────────
  const footerH = 92;
  const footerY = pageH - margin - footerH;
  doc.setDrawColor(...BORDER);
  doc.setFillColor(252, 252, 253);
  doc.roundedRect(margin, footerY, pageW - margin * 2, footerH, 6, 6, "FD");
  doc.setFillColor(...SAFETY);
  doc.rect(margin, footerY, 4, footerH, "F");

  doc.setTextColor(...IRON);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text(t("pdf.contact"), margin + 16, footerY + 22);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...MUTED);
  const lines: string[] = [];
  lines.push(`Phone: ${COMPANY.phones.map((p) => p.number).join(" · ")}`);
  lines.push(`Email: ${COMPANY.email}`);
  if (COMPANY.whatsapp) lines.push(`WhatsApp: +${COMPANY.whatsapp}`);
  lines.push(t("pdf.disclaimer"));
  lines.forEach((line, i) => {
    doc.text(line, margin + 16, footerY + 40 + i * 13);
  });

  // Page footer label
  doc.setFontSize(7);
  doc.setTextColor(...MUTED);
  doc.text(`${t("pdf.generated")}: ${new Date().toISOString().slice(0, 10)}`, pageW - margin, pageH - 14, {
    align: "right",
  });

  doc.save(`ATDB_${eq.id}_${eq.brand.replace(/\s+/g, "")}.pdf`);
}
