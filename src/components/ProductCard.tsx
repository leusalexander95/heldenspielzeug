"use client";

import Link from "next/link";
import type { Product } from "@/data/products";
import { formatPrice, shortText, ageText } from "@/data/products";
import { useLang } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import ProductImage from "./ProductImage";

export default function ProductCard({ product }: { product: Product }) {
  const { locale, t } = useLang();
  const { add } = useCart();

  return (
    <div className="group flex flex-col overflow-hidden rounded-3xl bg-white/70 p-3 transition hover:-translate-y-1 hover:bg-white hover:shadow-xl hover:shadow-mint/20">
      <Link href={`/products/${product.slug}`} className="relative block">
        <ProductImage product={product} className="aspect-square w-full" rounded="rounded-2xl" />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-bold text-brown">
          {ageText(product, locale)}
        </span>
      </Link>
      <div className="flex flex-1 flex-col px-2 pb-1 pt-4">
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-display text-sm font-bold leading-snug text-brown group-hover:text-mint-dark line-clamp-2">
            {product.name}
          </h3>
        </Link>
        <p className="mt-1 text-xs text-brown/60">{shortText(product, locale)}</p>
        <div className="mt-4 flex items-center justify-between gap-2">
          <span className="font-display text-lg font-extrabold text-forest">{formatPrice(product.price, locale)}</span>
          <button
            onClick={() => add(product.slug)}
            className="shrink-0 rounded-full bg-mint-dark px-3.5 py-2 text-xs font-bold text-white transition hover:bg-forest"
          >
            {t.product.add}
          </button>
        </div>
        <div className="mt-2 flex items-center gap-1.5 text-[10px] font-semibold text-brown/50">
          <span aria-hidden>🔒</span>
          <span>{locale === "de" ? "Sichere Bezahlung" : "Secure payment"}</span>
        </div>
      </div>
    </div>
  );
}
