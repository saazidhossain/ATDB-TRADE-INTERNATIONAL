import { motion } from "framer-motion";
import { Phone, Mail, Facebook } from "lucide-react";
import type { ReactNode } from "react";

export type Accent = "safety" | "bronze" | "whatsapp" | "facebook";

const ACCENT_MAP: Record<Accent, { orb: string; ring: string; halo: string }> = {
  safety: {
    orb: "bg-gradient-to-br from-[hsl(24,94%,53%)] to-[hsl(20,90%,42%)]",
    ring: "hover:border-safety/60",
    halo:
      "conic-gradient(from 180deg at 50% 50%, rgba(245,124,0,0.55), rgba(212,162,77,0.4), rgba(245,124,0,0.55))",
  },
  bronze: {
    orb: "bg-gradient-to-br from-[hsl(36,55%,57%)] to-[hsl(28,40%,30%)]",
    ring: "hover:border-bronze-glow/60",
    halo:
      "conic-gradient(from 180deg at 50% 50%, rgba(212,162,77,0.6), rgba(245,124,0,0.4), rgba(212,162,77,0.6))",
  },
  whatsapp: {
    orb: "bg-gradient-to-br from-[#25D366] to-[#0e8a3e]",
    ring: "hover:border-[#25D366]/60",
    halo:
      "conic-gradient(from 180deg at 50% 50%, rgba(37,211,102,0.55), rgba(245,124,0,0.4), rgba(37,211,102,0.55))",
  },
  facebook: {
    orb: "bg-gradient-to-br from-[#1877F2] to-[#0c5dc7]",
    ring: "hover:border-[#1877F2]/60",
    halo:
      "conic-gradient(from 180deg at 50% 50%, rgba(24,119,242,0.55), rgba(245,124,0,0.4), rgba(24,119,242,0.55))",
  },
};

export function ChannelIcon({
  href,
  ariaLabel,
  accent,
  external,
  children,
}: {
  href: string;
  ariaLabel: string;
  accent: Accent;
  external?: boolean;
  children: ReactNode;
}) {
  const a = ACCENT_MAP[accent];
  return (
    <motion.a
      href={href}
      aria-label={ariaLabel}
      title={ariaLabel}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      whileHover={{ y: -2, scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      transition={{ type: "spring", stiffness: 320, damping: 20 }}
      className={`group relative grid h-10 w-10 place-items-center overflow-hidden rounded-sm border border-white/15 bg-white/5 backdrop-blur-md backdrop-saturate-150 transition-colors ${a.ring} hover:bg-white/10`}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-sm opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: a.halo }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
      />
      <span
        className={`relative grid h-7 w-7 place-items-center rounded-full ${a.orb} shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] ring-1 ring-white/25 transition-transform duration-300 group-hover:rotate-[10deg]`}
      >
        {children}
      </span>
    </motion.a>
  );
}

export function PhoneGlyph() {
  return <Phone className="h-3.5 w-3.5 text-white" strokeWidth={2.4} />;
}
export function MailGlyph() {
  return <Mail className="h-3.5 w-3.5 text-white" strokeWidth={2.4} />;
}
export function FbGlyph() {
  return <Facebook className="h-3.5 w-3.5 fill-white text-white" strokeWidth={0} />;
}
export function WaGlyphSm() {
  return (
    <svg viewBox="0 0 32 32" className="h-3.5 w-3.5 fill-white" aria-hidden="true">
      <path d="M19.11 17.32c-.27-.13-1.59-.78-1.84-.87-.25-.09-.43-.13-.61.13-.18.27-.7.87-.85 1.05-.16.18-.31.2-.58.07-.27-.13-1.13-.42-2.16-1.34-.8-.71-1.34-1.6-1.49-1.86-.16-.27-.02-.41.12-.55.12-.12.27-.31.4-.46.13-.16.18-.27.27-.45.09-.18.04-.34-.02-.47-.07-.13-.61-1.46-.83-2-.22-.53-.45-.46-.62-.47l-.53-.01a1.02 1.02 0 0 0-.74.34c-.25.27-.96.94-.96 2.29 0 1.35.99 2.66 1.13 2.84.13.18 1.95 2.98 4.72 4.18.66.28 1.18.45 1.58.58.66.21 1.27.18 1.74.11.53-.08 1.59-.65 1.81-1.27.22-.62.22-1.16.16-1.27-.07-.11-.25-.18-.52-.31zM16.06 5.33c-5.91 0-10.71 4.8-10.71 10.7 0 1.89.5 3.74 1.45 5.36L5 27l5.78-1.51a10.7 10.7 0 0 0 5.28 1.36h.01c5.9 0 10.7-4.8 10.7-10.71 0-2.86-1.11-5.55-3.13-7.57a10.65 10.65 0 0 0-7.58-3.24z" />
    </svg>
  );
}
