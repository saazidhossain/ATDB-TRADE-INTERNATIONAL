// Renders the contact card + page footer at the bottom of the spec sheet.

import { COMPANY, PRIMARY_WHATSAPP } from "@/lib/atdb-data";
import { ascii, BORDER, IRON, MARGIN, MUTED, SAFETY } from "./tokens";
import type { RenderCtx } from "./render-context";

export function renderFooter(ctx: RenderCtx, dateStr: string) {
  const { doc, pageW, pageH, S, setFont, text } = ctx;

  const footerH = 102;
  const footerY = pageH - MARGIN - footerH;

  doc.setDrawColor(...BORDER);
  doc.setFillColor(252, 252, 253);
  doc.roundedRect(MARGIN, footerY, pageW - MARGIN * 2, footerH, 6, 6, "FD");
  doc.setFillColor(...SAFETY);
  doc.rect(MARGIN, footerY, 3, footerH, "F");

  doc.setTextColor(...IRON);
  setFont("bold");
  doc.setFontSize(11);
  text(S.contact, MARGIN + 18, footerY + 22);

  setFont("normal");
  doc.setFontSize(9);
  doc.setTextColor(...MUTED);
  const phones = COMPANY.phones.map((p) => p.number).join("  ·  ");

  // Mixed lines: BN label + Latin value. Render label in sansFamily, value in
  // helvetica by drawing them as two segments to keep numerals crisp.
  const drawLabeled = (label: string, value: string, y: number) => {
    setFont("bold");
    doc.setTextColor(...IRON);
    text(label, MARGIN + 18, y);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...MUTED);
    doc.text(ascii(value), MARGIN + 90, y);
  };

  drawLabeled(S.phoneL, phones, footerY + 42);
  drawLabeled(S.emailL, COMPANY.email, footerY + 56);
  if (PRIMARY_WHATSAPP) drawLabeled(S.whatsappL, `+${PRIMARY_WHATSAPP}`, footerY + 70);

  setFont("normal");
  doc.setTextColor(...MUTED);
  doc.setFontSize(8);
  text(S.disclaimer, MARGIN + 18, footerY + 90);

  // Page footer label
  doc.setFontSize(7.5);
  doc.setTextColor(...MUTED);
  text(`${S.generated} ${dateStr}  ·  ${COMPANY.name}`, pageW - MARGIN, pageH - 16, {
    align: "right",
  });
}
