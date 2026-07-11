"use client";

import { useEffect, useRef, useState } from "react";
import type { Product } from "@/data/products";
import { getCategory, productImage } from "@/data/products";

/**
 * Shows the real product photo from /public/products/<slug>.jpg when available,
 * otherwise a styled placeholder. Drop real photos into public/products to replace.
 */
export default function ProductImage({
  product,
  className = "",
  rounded = "rounded-2xl",
}: {
  product: Product;
  className?: string;
  rounded?: string;
}) {
  const [error, setError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const cat = getCategory(product.category);
  const src = productImage(product.slug);

  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) setError(true);
  }, []);

  if (error) {
    return (
      <div
        className={`relative flex items-center justify-center overflow-hidden ${rounded} ${className}`}
        style={{ backgroundColor: "var(--cream-dark)" }}
      >
        <div
          className="absolute inset-0"
          style={{ background: `radial-gradient(130% 130% at 30% 20%, ${cat.color}55, transparent 62%)` }}
        />
        <div className="relative flex flex-col items-center gap-3 p-6 text-center">
          <span
            className="flex h-20 w-20 items-center justify-center rounded-full text-4xl shadow-md"
            style={{ backgroundColor: cat.color, color: "#fff" }}
          >
            {cat.icon}
          </span>
          <span className="font-display text-sm font-bold text-brown">{product.name}</span>
        </div>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={imgRef}
      src={src}
      alt={product.name}
      loading="lazy"
      onError={() => setError(true)}
      className={`bg-white object-cover ${rounded} ${className}`}
    />
  );
}
