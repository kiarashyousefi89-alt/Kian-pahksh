import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Check, Eye, ShoppingCart } from "lucide-react";
import { Image } from "@/components/ui/image";
import { useCart } from "@/context/CartContext";
import { STOCK_LABELS, formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";

const stockStyles = {
  in_stock: "bg-secondary text-secondary-foreground",
  low_stock: "bg-accent/25 text-primary",
  out_of_stock: "bg-muted text-muted-foreground",
};

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [9, -9]), {
    stiffness: 130,
    damping: 18,
  });
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [-6, 6]), {
    stiffness: 130,
    damping: 18,
  });

  const outOfStock = product.stock_status === "out_of_stock";

  const handleMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  const handleAdd = () => {
    if (outOfStock) return;
    addItem(product);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1800);
  };

  return (
    <motion.article
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 1100 }}
      className="group flex h-full flex-col rounded-[1.75rem] border border-border/70 bg-card p-5 shadow-liquid"
    >
      <Link
        to={`/product/${product.id}`}
        className="relative mb-5 flex h-56 items-center justify-center overflow-hidden rounded-[1.4rem] bg-gradient-to-b from-secondary/80 to-background"
      >
        <span className="absolute bottom-5 h-7 w-32 rounded-full bg-primary/15 blur-xl" />
        <Image
          src={product.image}
          alt={product.name}
          fittingType="fit"
          className="relative h-44 w-44 drop-shadow-xl transition-transform duration-500 group-hover:scale-105"
        />
        <span
          className={cn(
            "absolute right-4 top-4 rounded-full px-3 py-1 text-[0.7rem] font-bold",
            stockStyles[product.stock_status] ?? stockStyles.in_stock
          )}
        >
          {STOCK_LABELS[product.stock_status] ?? STOCK_LABELS.in_stock}
        </span>
      </Link>

      <div className="flex flex-1 flex-col">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-heading text-lg font-bold text-primary">{product.name}</h3>
        </Link>
        <p className="mt-2 line-clamp-2 text-sm leading-7 text-muted-foreground">
          {product.description}
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <span className="rounded-full bg-muted px-3 py-1">{product.volume}</span>
          {product.category && (
            <span className="rounded-full border border-border px-3 py-1">{product.category}</span>
          )}
        </div>

        <p className="mt-4 font-heading text-lg font-extrabold text-primary">
          {formatPrice(product.price)}
        </p>

        <div className="mt-5 flex gap-2">
          <button
            type="button"
            onClick={handleAdd}
            disabled={outOfStock}
            className={cn(
              "flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-bold transition-all",
              outOfStock
                ? "cursor-not-allowed bg-muted text-muted-foreground"
                : justAdded
                  ? "bg-primary text-primary-foreground"
                  : "bg-accent text-accent-foreground hover:-translate-y-0.5 hover:shadow-lg"
            )}
          >
            {justAdded ? <Check className="h-4 w-4" /> : <ShoppingCart className="h-4 w-4" />}
            {justAdded ? "اضافه شد" : "افزودن به سبد"}
          </button>
          <Link
            to={`/product/${product.id}`}
            className="flex items-center justify-center gap-2 rounded-full border border-primary/20 px-4 py-3 text-sm font-bold text-primary transition-colors hover:border-accent hover:bg-accent/10"
          >
            <Eye className="h-4 w-4" />
            جزئیات
          </Link>
        </div>
      </div>
    </motion.article>
  );
}