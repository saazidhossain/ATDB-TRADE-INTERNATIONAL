// Renders the zebra-striped specs table (key/value rows) for an Equipment item.
// Returns the Y cursor at the bottom of the table.

import { CATEGORIES, type Equipment } from "@/lib/atdb-data";
import { BORDER, IRON, MARGIN, MUTED, ZEBRA } from "./tokens";
import type { RenderCtx } from "./render-context";

export function renderSpecsTable(ctx: RenderCtx, eq: Equipment, startY: number): number {
  const { doc, pageW, isBn, S, setFont, text } = ctx;

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
    text(r[1], valueX, y);
  });

  const tableBottom = startY + rows.length * rowH - 14;
  doc.line(MARGIN, tableBottom, MARGIN + tableW, tableBottom);
  return tableBottom + 24;
}
