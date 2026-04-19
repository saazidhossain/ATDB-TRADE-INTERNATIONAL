// Renders the dark header band (company name, sheet title, asset id, date)
// plus the hero image and equipment title block.
// Returns the Y cursor where the next section should start drawing.

import { COMPANY, type Equipment } from "@/lib/atdb-data";
import { ascii, IRON, MARGIN, SAFETY, loadImageAsDataUrl } from "./tokens";
import type { RenderCtx } from "./render-context";

export async function renderHeader(ctx: RenderCtx, eq: Equipment, dateStr: string): Promise<number> {
  const { doc, pageW, isBn, S, setFont, text } = ctx;

  // ── Top band ──────────────────────────────────────────────────
  doc.setFillColor(...IRON);
  doc.rect(0, 0, pageW, 72, "F");
  doc.setFillColor(...SAFETY);
  doc.rect(0, 72, pageW, 3, "F");

  // Company name — Latin, always Helvetica for crisp rendering
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.text(ascii(COMPANY.name), MARGIN, 34);

  setFont("normal");
  doc.setFontSize(9);
  doc.setTextColor(200, 204, 212);
  text(S.title, MARGIN, 52);

  // Asset id (Latin) — Helvetica
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(...SAFETY);
  doc.text(eq.id, pageW - MARGIN, 34, { align: "right" });

  doc.setTextColor(200, 204, 212);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  if (isBn) setFont("normal");
  text(dateStr, pageW - MARGIN, 52, { align: "right" });

  // ── Hero image ────────────────────────────────────────────────
  let cursorY = 100;
  const img = await loadImageAsDataUrl(eq.image);
  if (img) {
    const boxW = pageW - MARGIN * 2;
    const boxH = 220;
    const ratio = img.w / img.h;
    let drawW = boxW;
    let drawH = drawW / ratio;
    if (drawH > boxH) {
      drawH = boxH;
      drawW = drawH * ratio;
    }
    const dx = MARGIN + (boxW - drawW) / 2;
    doc.setFillColor(245, 246, 248);
    doc.rect(MARGIN, cursorY, boxW, boxH, "F");
    doc.addImage(img.data, "JPEG", dx, cursorY + (boxH - drawH) / 2, drawW, drawH);
    cursorY += boxH + 22;
  }

  // ── Title block ───────────────────────────────────────────────
  doc.setTextColor(...IRON);
  setFont("bold");
  doc.setFontSize(20);
  text(eq.name, MARGIN, cursorY);
  cursorY += 18;

  setFont("normal");
  doc.setFontSize(10);
  doc.setTextColor(120, 124, 132);
  const sublineParts = [eq.brand, eq.capacity, eq.origin];
  if (eq.year) sublineParts.push(String(eq.year));
  text(sublineParts.join("  ·  "), MARGIN, cursorY);
  cursorY += 24;

  return cursorY;
}
