import { ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/cart";

export function CartButton({ className = "" }: { className?: string }) {
  const { open, count } = useCart();
  return (
    <button
      onClick={open}
      aria-label={`Open quotation cart${count ? ` (${count})` : ""}`}
      className={`relative inline-flex h-9 items-center gap-1.5 rounded-sm border border-iron/15 px-2.5 text-iron transition-colors hover:border-safety hover:text-safety ${className}`}
    >
      <ShoppingCart className="h-4 w-4" />
      {count > 0 && (
        <span
          aria-hidden="true"
          className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-safety px-1 font-display text-[10px] font-bold text-white shadow-sm"
        >
          {count > 99 ? "99+" : count}
        </span>
      )}
    </button>
  );
}
