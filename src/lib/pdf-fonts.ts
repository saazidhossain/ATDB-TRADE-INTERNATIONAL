// Lazy-loads Noto Sans Bengali into a jsPDF instance so Bengali strings
// render properly. Helvetica (the default) only supports WinAnsi/Latin and
// will produce tofu/garbled glyphs for Bengali — embedding Noto fixes that.
//
// The base64 fonts are code-split: only fetched when a BN PDF is requested.

import type { jsPDF } from "jspdf";

let registered: WeakSet<jsPDF> | null = null;

export const BN_FONT = "NotoSansBengali";

export async function ensureBengaliFont(doc: jsPDF) {
  registered ??= new WeakSet();
  if (registered.has(doc)) return;

  const [{ NotoSansBengali_Regular_b64 }, { NotoSansBengali_Bold_b64 }] = await Promise.all([
    import("@/assets/fonts/NotoSansBengali-Regular.b64"),
    import("@/assets/fonts/NotoSansBengali-Bold.b64"),
  ]);

  doc.addFileToVFS("NotoSansBengali-Regular.ttf", NotoSansBengali_Regular_b64);
  doc.addFont("NotoSansBengali-Regular.ttf", BN_FONT, "normal");
  doc.addFileToVFS("NotoSansBengali-Bold.ttf", NotoSansBengali_Bold_b64);
  doc.addFont("NotoSansBengali-Bold.ttf", BN_FONT, "bold");

  registered.add(doc);
}
