// Renders the polished header band (brand bar, sheet title, asset reference)
// plus the hero image with a refined frame and an "at-a-glance" KPI strip.
// Returns the Y cursor where the next section should start drawing.

import type { jsPDF } from "jspdf";
import { COMPANY, type Equipment } from "@/lib/atdb-data";
import brandLogo from "@/assets/brand/atdb-logo-light.webp";
import {
  ascii,
  BORDER,
  BORDER_SOFT,
  IRON,
  IRON_SOFT,
  MARGIN,
  MUTED,
  MUTED_SOFT,
  SAFETY,
  SURFACE,
  loadImageAsDataUrl,
} from "./tokens";
import type { Strings } from "./strings";

export async function renderHeader(
  doc: jsPDF,
  eq: Equipment,
  S: Strings,
  dateStr: string,
): Promise<number> {
  const pageW = doc.internal.pageSize.getWidth();

  // ── Top brand band ────────────────────────────────────────────
  const bandH = 72;
  doc.setFillColor(...IRON);
  doc.rect(0, 0, pageW, bandH, "F");
  doc.setFillColor(...IRON_SOFT);
  doc.rect(0, bandH - 16, pageW, 16, "F");
  doc.setFillColor(...SAFETY);
  doc.rect(0, bandH, pageW, 3, "F");

  // Brand mark — actual ATDB logo on a safety-orange chip with subtle white inner border
  const chipS = 38;
  const chipX = MARGIN;
  const chipY = 20 - (chipS - 32) / 2;
  doc.setFillColor(...SAFETY);
  doc.roundedRect(chipX, chipY, chipS, chipS, 5, 5, "F");
  doc.setDrawColor(255, 255, 255);
  doc.setLineWidth(0.6);
  doc.roundedRect(chipX + 1.25, chipY + 1.25, chipS - 2.5, chipS - 2.5, 4, 4, "S");
  doc.setLineWidth(0.2);
  const logo = await loadImageAsDataUrl(brandLogo);
  if (logo) {
    const pad = 6;
    const maxW = chipS - pad * 2;
    const maxH = chipS - pad * 2;
    const ratio = logo.w / logo.h;
    let lw = maxW;
    let lh = lw / ratio;
    if (lh > maxH) {
      lh = maxH;
      lw = lh * ratio;
    }
    const lx = chipX + (chipS - lw) / 2;
    const ly = chipY + (chipS - lh) / 2;
    doc.addImage(logo.data, "PNG", lx, ly, lw, lh);
  } else {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(15);
    doc.setTextColor(...IRON);
    doc.text("A", chipX + chipS / 2, chipY + chipS / 2 + 5.5, { align: "center" });
  }

  // Wordmark
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text(ascii(COMPANY.name), chipX + chipS + 12, chipY + 13);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(200, 204, 212);
  const subtitleText = ascii(S.subtitle);
  doc.text(subtitleText, chipX + chipS + 12, chipY + 26);

  // Thin safety-orange divider under the wordmark — width tracks the subtitle text
  const dividerW = doc.getTextWidth(subtitleText);
  doc.setFillColor(...SAFETY);
  doc.rect(chipX + chipS + 12, chipY + 30, dividerW, 1, "F");

  // Right-aligned reference block
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(180, 184, 192);
  doc.text(S.ref.toUpperCase(), pageW - MARGIN, chipY + 6, { align: "right" });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(...SAFETY);
  doc.text(eq.id, pageW - MARGIN, chipY + 20, { align: "right" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(180, 184, 192);
  doc.text(`${S.generated} ${dateStr}`, pageW - MARGIN, chipY + 32, { align: "right" });

  let cursorY = bandH + 20;

  // ── Hero image with framed border ─────────────────────────────
  const img = await loadImageAsDataUrl(eq.image);
  if (img) {
    const boxW = pageW - MARGIN * 2;
    const boxH = 168;
    doc.setFillColor(...SURFACE);
    doc.setDrawColor(...BORDER);
    doc.roundedRect(MARGIN, cursorY, boxW, boxH, 6, 6, "FD");

    const ratio = img.w / img.h;
    let drawW = boxW - 16;
    let drawH = drawW / ratio;
    if (drawH > boxH - 16) {
      drawH = boxH - 16;
      drawW = drawH * ratio;
    }
    const dx = MARGIN + (boxW - drawW) / 2;
    const dy = cursorY + (boxH - drawH) / 2;
    doc.addImage(img.data, "JPEG", dx, dy, drawW, drawH);

    // Asset id micro-tag in the corner of the hero
    const tagW = doc.getTextWidth(eq.id) + 18;
    doc.setFillColor(...IRON);
    doc.roundedRect(MARGIN + 10, cursorY + 10, tagW, 17, 3, 3, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(...SAFETY);
    doc.text(eq.id, MARGIN + 10 + tagW / 2, cursorY + 21.5, { align: "center" });

    cursorY += boxH + 18;
  }

  // ── Title block ───────────────────────────────────────────────
  doc.setTextColor(...IRON);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text(ascii(eq.name), MARGIN, cursorY);
  cursorY += 6;

  // Accent underline
  doc.setFillColor(...SAFETY);
  doc.rect(MARGIN, cursorY, 32, 2.5, "F");
  cursorY += 16;

  // ── At-a-glance KPI strip (3 chips) ───────────────────────────
  const kpis: [string, string][] = [
    [S.capacity, eq.capacity],
    [S.brand, eq.brand],
    [eq.year ? S.year : S.origin, eq.year ? String(eq.year) : eq.origin],
  ];
  const stripW = pageW - MARGIN * 2;
  const gap = 8;
  const chipW = (stripW - gap * (kpis.length - 1)) / kpis.length;
  const chipH = 38;
  kpis.forEach(([label, value], i) => {
    const x = MARGIN + i * (chipW + gap);
    doc.setFillColor(...SURFACE);
    doc.setDrawColor(...BORDER_SOFT);
    doc.roundedRect(x, cursorY, chipW, chipH, 5, 5, "FD");
    doc.setFillColor(...SAFETY);
    doc.rect(x, cursorY, 2.5, chipH, "F");
    doc.setFont("helvetica", "normal");
    doc.setFontSize(6.8);
    doc.setTextColor(...MUTED_SOFT);
    doc.text(ascii(label.toUpperCase()), x + 12, cursorY + 13);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(...IRON);
    doc.text(ascii(value), x + 12, cursorY + 27);
  });
  cursorY += chipH + 16;

  return cursorY;
}
