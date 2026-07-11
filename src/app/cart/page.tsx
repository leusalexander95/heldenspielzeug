"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useLang } from "@/context/LanguageContext";
import { getProduct, formatPrice } from "@/data/products";
import ProductImage from "@/components/ProductImage";

export default function CartPage() {
  const { items, setQty, remove } = useCart();
  const { t, locale } = useLang();

  const rows = items.map((i) => ({ item: i, product: getProduct(i.slug)! })).filter((r) => r.product);
  const total = rows.reduce((sum, r) => sum + r.product.price * r.item.qty, 0);

  if (rows.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <div className="text-6xl">🛒</div>
        <h1 className="mt-4 font-display text-3xl font-extrabold text-forest">{t.cart.title}</h1>
        <p className="mt-3 text-brown/70">{t.cart.empty}</p>
        <Link href="/products" className="mt-6 inline-block rounded-full bg-mint-dark px-7 py-3 font-bold text-white transition hover:bg-forest">
          {t.cart.continue}
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="font-display text-4xl font-extrabold text-forest">{t.cart.title}</h1>
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
        <div className="space-y-4">
          {rows.map(({ item, product }) => (
            <div key={item.slug} className="flex items-center gap-4 rounded-2xl bg-white/70 p-4">
              <ProductImage product={product} className="h-24 w-24 shrink-0" rounded="rounded-xl" />
              <div className="flex-1">
                <Link href={`/products/${product.slug}`} className="font-display font-bold text-brown hover:text-mint-dark">
                  {product.name}
                </Link>
                <p className="text-sm text-brown/60">{formatPrice(product.price, locale)}</p>
                <button onClick={() => remove(item.slug)} className="mt-1 text-xs text-orange hover:underline">
                  {t.cart.remove}
                </button>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setQty(item.slug, item.qty - 1)} className="h-8 w-8 rounded-full bg-cream-dark font-bold text-brown">−</button>
                <span className="w-6 text-center font-bold text-brown">{item.qty}</span>
                <button onClick={() => setQty(item.slug, item.qty + 1)} className="h-8 w-8 rounded-full bg-cream-dark font-bold text-brown">+</button>
              </div>
              <div className="w-24 text-right font-display font-extrabold text-forest">
                {formatPrice(product.price * item.qty, locale)}
              </div>
            </div>
          ))}
        </div>

        <div className="h-fit rounded-3xl bg-white/70 p-6">
          <div className="flex justify-between text-brown">
            <span>{t.cart.total}</span>
            <span className="font-display text-xl font-extrabold text-forest">{formatPrice(total, locale)}</span>
          </div>
          <Link href="/checkout" className="mt-6 block rounded-full bg-mint-dark px-6 py-3.5 text-center font-bold text-white transition hover:bg-forest">
            {t.cart.checkout}
          </Link>
          <Link href="/products" className="mt-3 block text-center text-sm text-brown/70 hover:text-mint-dark">
            {t.cart.continue}
          </Link>
        </div>
      </div>
    </div>
  );
}
