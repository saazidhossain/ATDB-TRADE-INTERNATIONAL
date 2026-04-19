import { buildWhatsappGenericLink } from "@/lib/atdb-data";
import { useI18n } from "@/lib/i18n";
import { WhatsappButton } from "./WhatsappButton";

export function WhatsappFab() {
  const { t, lang } = useI18n();
  return (
    <WhatsappButton
      href={buildWhatsappGenericLink(undefined, lang)}
      variant="fab"
      ariaLabel="Chat on WhatsApp"
    >
      {t("whatsapp.fab")}
    </WhatsappButton>
  );
}
