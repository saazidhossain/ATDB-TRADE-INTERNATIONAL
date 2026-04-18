import { buildWhatsappGenericLink } from "@/lib/atdb-data";
import { useI18n } from "@/lib/i18n";

export function WhatsappFab() {
  const { t, lang } = useI18n();
  return (
    <a
      href={buildWhatsappGenericLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className={`fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-whatsapp px-4 py-3 text-sm font-semibold text-white shadow-[0_12px_32px_rgba(37,211,102,0.45)] transition-transform hover:scale-105 md:bottom-8 md:right-8 ${lang === "bn" ? "font-bn" : "font-display"}`}
    >
      <svg viewBox="0 0 32 32" className="h-5 w-5 fill-white" aria-hidden="true">
        <path d="M19.11 17.32c-.27-.13-1.59-.78-1.84-.87-.25-.09-.43-.13-.61.13-.18.27-.7.87-.85 1.05-.16.18-.31.2-.58.07-.27-.13-1.13-.42-2.16-1.34-.8-.71-1.34-1.6-1.49-1.86-.16-.27-.02-.41.12-.55.12-.12.27-.31.4-.46.13-.16.18-.27.27-.45.09-.18.04-.34-.02-.47-.07-.13-.61-1.46-.83-2-.22-.53-.45-.46-.62-.47l-.53-.01a1.02 1.02 0 0 0-.74.34c-.25.27-.96.94-.96 2.29 0 1.35.99 2.66 1.13 2.84.13.18 1.95 2.98 4.72 4.18.66.28 1.18.45 1.58.58.66.21 1.27.18 1.74.11.53-.08 1.59-.65 1.81-1.27.22-.62.22-1.16.16-1.27-.07-.11-.25-.18-.52-.31zM16.06 5.33c-5.91 0-10.71 4.8-10.71 10.7 0 1.89.5 3.74 1.45 5.36L5 27l5.78-1.51a10.7 10.7 0 0 0 5.28 1.36h.01c5.9 0 10.7-4.8 10.7-10.71 0-2.86-1.11-5.55-3.13-7.57a10.65 10.65 0 0 0-7.58-3.24z" />
      </svg>
      <span className="hidden sm:inline">{t("whatsapp.fab")}</span>
    </a>
  );
}
