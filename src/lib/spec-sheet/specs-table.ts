// Renders the zebra-striped specs table (key/value rows) for an Equipment item.
// Returns the Y cursor at the bottom of the table.

import { CATEGORIES, type Equipment } from "@/lib/atdb-data";
import { ascii, BORDER, IRON, MARGIN, MUTED, ZEBRA } from "./tokens";
import type { RenderCtx } from "./render-context";

// True when the string contains zero non-Latin script. We render those
// values via Helvetica even in BN mode, because the embedded Noto Sans
// Bengali subset doesn't ship Latin glyphs in the WinAnsi range —
// without this fallback Latin values like "ATDB-CR-002" would print blank.
const isLatinOnly = (s: string) => !/[^\x00-\x7F\u00A0-\u00FF]/.test(s);

// Latin → Bengali digit conversion (০-৯). Used so mixed-script values like
// "01 ইউনিট" become "০১ ইউনিট" — single script renders cleanly via Noto.
const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
const toBnDigits = (s: string, on: boolean) =>
  on ? s.replace(/\d/g, (d) => BN_DIGITS[Number(d)]) : s;

export function renderSpecsTable(ctx: RenderCtx, eq: Equipment, startY: number): number {
  const { doc, pageW, isBn, sansFamily, S, setFont, text } = ctx;

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
      ? [
          [
            S.fleet,
            `${toBnDigits(String(eq.quantity).padStart(2, "0"), isBn)} ${S.unitSuffix}`,
          ],
        ]
      : []) as [string, string][]),
    [S.operator, S.operatorVal],
    [S.inspection, S.inspectionVal],
  ];

  const rowH = 22;
  const tableW = pageW - MARGIN * 2;
  const labelX = MARGIN + 14;
  const valueX = MARGIN + tableW * 0.42;

  doc.setDrawColor(...BORDER);
  doc.setLineWidth(0.5);
  doc.line(MARGIN, startY - 14, MARGIN + tableW, startY - 14);

  doc.setFontSize(9);
  rows.forEach((r, i) => {
    const y = startY + i * rowH;
    if (i % 2 === 0) {
      doc.setFillColor(...ZEBRA);
      doc.rect(MARGIN, y - 14, tableW, rowH, "F");
    }
    setFont("bold");
    doc.setTextColor(...MUTED);
    // Bengali script has no uppercase — only uppercase Latin labels.
    const labelOut = isBn ? r[0] : r[0].toUpperCase();
    text(labelOut, labelX, y);
    setFont("normal");
    doc.setTextColor(...IRON);
    // BN mode: switch Latin-only values back to Helvetica so they actually render.
    if (isBn && isLatinOnly(r[1])) {
      doc.setFont("helvetica", "normal");
      doc.text(ascii(r[1]), valueX, y);
      // Restore BN font for the next iteration's label.
      setFont("normal");
    } else {
      text(r[1], valueX, y);
    }
  });

  const tableBottom = startY + rows.length * rowH - 14;
  doc.line(MARGIN, tableBottom, MARGIN + tableW, tableBottom);
  return tableBottom + 24;
}
