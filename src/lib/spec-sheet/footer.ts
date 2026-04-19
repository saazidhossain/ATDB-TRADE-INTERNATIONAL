// Renders the service-highlights row + branded contact card + page footer.

import type { jsPDF } from "jspdf";
import { COMPANY, PRIMARY_WHATSAPP } from "@/lib/atdb-data";
import {
  ascii,
  BORDER,
  BORDER_SOFT,
  IRON,
  MARGIN,
  MUTED,
  MUTED_SOFT,
  SAFETY,
  SURFACE,
} from "./tokens";
import type { Strings } from "./strings";

export function renderFooter(doc: jsPDF, S: Strings, dateStr: string, afterTableY: number) {
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();

  // ── Service highlights (3 chips) ──────────────────────────────
  const highlightsY = afterTableY + 4;
  const highlights: [string, string][] = [
    [S.hAvailability, S.hAvailabilityV],
    [S.hMobilisation, S.hMobilisationV],
    [S.hCompliance, S.hComplianceV],
  ];
  const stripW = pageW - MARGIN * 2;
  const gap = 8;
  const chipW = (stripW - gap * (highlights.length - 1)) / highlights.length;
  const chipH = 50;

  highlights.forEach(([label, value], i) => {
    const x = MARGIN + i * (chipW + gap);
    doc.setFillColor(...SURFACE);
    doc.setDrawColor(...BORDER_SOFT);
    doc.roundedRect(x, highlightsY, chipW, chipH, 5, 5, "FD");
    // Top accent rule
    doc.setFillColor(...SAFETY);
    doc.rect(x + 10, highlightsY + 8, 16, 2, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(...IRON);
    doc.text(ascii(label.toUpperCase()), x + 10, highlightsY + 22);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(...MUTED);
    const lines = doc.splitTextToSize(ascii(value), chipW - 20);
    doc.text(lines, x + 10, highlightsY + 36);
  });

  // ── Contact card ──────────────────────────────────────────────
  const cardH = 96;
  const cardY = pageH - MARGIN - cardH - 22;
  doc.setFillColor(...IRON);
  doc.roundedRect(MARGIN, cardY, pageW - MARGIN * 2, cardH, 6, 6, "F");

  // Safety accent column
  doc.setFillColor(...SAFETY);
  doc.rect(MARGIN, cardY, 4, cardH, "F");

  // Heading
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(255, 255, 255);
  doc.text(ascii(S.contact), MARGIN + 18, cardY + 22);

  // Tagline
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(200, 204, 212);
  doc.text(ascii(COMPANY.tagline), MARGIN + 18, cardY + 36);

  // Two-column contact details
  const phones = COMPANY.phones.map((p) => p.number).join("  ·  ");
  const colLY = cardY + 56;
  const colRX = MARGIN + (pageW - MARGIN * 2) / 2 + 4;

  const drawDetail = (label: string, value: string, x: number, y: number) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7);
    doc.setTextColor(...MUTED_SOFT);
    doc.text(ascii(label.toUpperCase()), x, y);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(255, 255, 255);
    doc.text(ascii(value), x, y + 12);
  };

  drawDetail(S.phoneL, phones, MARGIN + 18, colLY);
  drawDetail(S.emailL, COMPANY.email, MARGIN + 18, colLY + 26);

  if (PRIMARY_WHATSAPP) {
    drawDetail(S.whatsappL, `+${PRIMARY_WHATSAPP}`, colRX, colLY);
  }
  drawDetail(S.webL, "atdbtrade.com", colRX, colLY + 26);

  // ── Page footer (disclaimer + meta) ───────────────────────────
  doc.setDrawColor(...BORDER);
  doc.setLineWidth(0.4);
  doc.line(MARGIN, pageH - MARGIN - 4, pageW - MARGIN, pageH - MARGIN - 4);

  doc.setFont("helvetica", "italic");
  doc.setFontSize(7);
  doc.setTextColor(...MUTED);
  const disclaimerLines = doc.splitTextToSize(ascii(S.disclaimer), pageW - MARGIN * 2 - 180);
  doc.text(disclaimerLines, MARGIN, pageH - MARGIN + 8);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(...MUTED);
  doc.text(
    ascii(`${S.generated} ${dateStr}  ·  ${COMPANY.name}`),
    pageW - MARGIN,
    pageH - MARGIN + 8,
    { align: "right" },
  );
}
