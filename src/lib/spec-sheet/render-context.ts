// Shared render context passed between header/table/footer renderers.
// Bundles the jsPDF instance with derived helpers + already-resolved strings
// so each section file stays narrow.

import type { jsPDF } from "jspdf";
import { ascii } from "./tokens";
import type { Strings } from "./strings";

export interface RenderCtx {
  doc: jsPDF;
  pageW: number;
  pageH: number;
  isBn: boolean;
  sansFamily: string;
  S: Strings;
  /** Switch the active font (BN-aware). */
  setFont: (style: "normal" | "bold") => void;
  /** Draw text, ASCII-sanitising for Latin runs only. */
  text: (
    str: string,
    x: number,
    y: number,
    opts?: { align?: "left" | "right" | "center" },
  ) => void;
}

export function makeCtx(
  doc: jsPDF,
  isBn: boolean,
  sansFamily: string,
  S: Strings,
): RenderCtx {
  const setFont = (style: "normal" | "bold") => doc.setFont(sansFamily, style);
  const text: RenderCtx["text"] = (str, x, y, opts) => {
    doc.text(isBn ? str : ascii(str), x, y, opts);
  };
  return {
    doc,
    pageW: doc.internal.pageSize.getWidth(),
    pageH: doc.internal.pageSize.getHeight(),
    isBn,
    sansFamily,
    S,
    setFont,
    text,
  };
}
