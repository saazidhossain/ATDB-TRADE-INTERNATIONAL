// Generates a branded one-page PDF spec sheet for an Equipment item.
// Pure client-side jsPDF — no server roundtrip.
//
// The heavy lifting lives in ./spec-sheet/* — this file just wires the
// header / specs table / footer renderers together. Bengali support is
// lazy-loaded via ./pdf-fonts (≈280 KB code-split).

import { jsPDF } from "jspdf";
import { type Equipment } from "@/lib/atdb-data";
import type { Lang } from "@/lib/i18n";
import { ensureBengaliFont, BN_FONT } from "@/lib/pdf-fonts";
import { STRINGS_BN, STRINGS_EN } from "./spec-sheet/strings";
import { makeCtx } from "./spec-sheet/render-context";
import { renderHeader } from "./spec-sheet/header";
import { renderSpecsTable } from "./spec-sheet/specs-table";
import { renderFooter } from "./spec-sheet/footer";

type T = (k: string) => string;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function generateSpecSheet(eq: Equipment, _t: T, lang: Lang) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });

  const isBn = lang === "bn";
  if (isBn) await ensureBengaliFont(doc);

  const S = isBn ? STRINGS_BN : STRINGS_EN;
  const sansFamily = isBn ? BN_FONT : "helvetica";
  const ctx = makeCtx(doc, isBn, sansFamily, S);

  const dateStr = new Date().toLocaleDateString(isBn ? "bn-BD" : "en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const afterHeader = await renderHeader(ctx, eq, dateStr);
  renderSpecsTable(ctx, eq, afterHeader);
  renderFooter(ctx, dateStr);

  doc.save(`ATDB_${eq.id}_${eq.brand.replace(/\s+/g, "")}.pdf`);
}
