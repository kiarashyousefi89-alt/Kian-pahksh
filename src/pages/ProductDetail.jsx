import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingCart,
  Truck,
} from "lucide-react";
import { Image } from "@/components/ui/image";
import { base44 } from "@/api/base44Client";
import { useCart } from "@/context/CartContext";
import { STOCK_LABELS, formatPrice } from "@/lib/format";
import usePageMeta from "@/hooks/usePageMeta";
import { cn } from "@/lib/utils";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sizeIndex, setSizeIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setSizeIndex(0);
    setQuantity(1);
    base44.entities.Product.get(id)
      .then((record) => active && setProduct(record))
      .catch(() => active && setProduct(null))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [id]);

  usePageMeta(
    product ? `${product.name} | خرید آنلاین از کیان پخش` : "جزئیات محصول | کیان پخش",
    product?.description
  );

  if (loading) {
    return (
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="h-[26rem] animate-pulse rounded-[2rem] bg-card" />
        <div className="space-y-4">
          <div className="h-8 w-2/3 animate-pulse rounded-full bg-card" />
          <div className="h-24 animate-pulse rounded-3xl bg-card" />
          <div className="h-14 w-1/2 animate-pulse rounded-full bg-card" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 px-4 py-28 text-center">
        <h1 className="font-heading text-2xl font-extrabold text-primary">محصول یافت نشد</h1>
        <p className="text-muted-foreground">
          ممکن است این محصول حذف شده باشد یا نشانی صفحه تغییر کرده باشد.
        </p>
        <Link
          to="/products"
          className="mt-2 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-bold text-accent-foreground"
        >
          بازگشت به محصولات
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  const sizes = product.sizes?.length
    ? product.sizes
    : [{ volume: product.volume, price: product.price }];
  const activeSize = sizes[Math.min(sizeIndex, sizes.length - 1)];
  const outOfStock = product.stock_status === "out_of_stock";

  const handleAdd = () => {
    if (outOfStock) return;
    for (let index = 0; index < quantity; index += 1) addItem(product, activeSize);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };

  const handleBuyNow = () => {
    if (outOfStock) return;
    for (let index = 0; index < quantity; index += 1) addItem(product, activeSize);
    navigate("/checkout");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <nav className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-primary">
          خانه
        </Link>
        <span>/</span>
        <Link to="/products" className="hover:text-primary">
          محصولات
        </Link>
        <span>/</span>
        <span className="text-primary">{product.name}</span>
      </nav>

      <div className="mt-8 grid gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55 }}
          className="relative flex h-[22rem] items-center justify-center overflow-hidden rounded-[2rem] bg-gradient-to-b from-secondary/70 to-background shadow-liquid sm:h-[30rem]"
        >
          <div className="absolute inset-16 rounded-full bg-accent/20 blur-3xl" />
          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            <Image
              src={product.image}
              alt={product.name}
              fittingType="fit"
              className="h-[16rem] w-[13rem] drop-shadow-2xl sm:h-[22rem] sm:w-[18rem]"
            />
          </motion.div>
          <span className="absolute right-6 top-6 rounded-full bg-card/90 px-4 py-1.5 text-xs font-bold text-primary shadow">
            {STOCK_LABELS[product.stock_status] ?? STOCK_LABELS.in_stock}
          </span>
        </motion.div>

        <div>
          <span className="text-sm font-bold text-accent">
            {product.category ? `روغن ${product.category}` : "روغن خوراکی"}
          </span>
          <h1 className="mt-3 font-heading text-3xl font-extrabold leading-[1.6] text-primary sm:text-4xl">
            {product.name}
          </h1>

          <p className="mt-5 font-heading text-2xl font-extrabold text-primary">
            {formatPrice(activeSize.price)}
          </p>

          <p className="mt-6 leading-9 text-muted-foreground">{product.description}</p>

          {product.features?.length > 0 && (
            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {product.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm text-foreground/80">
                  <ShieldCheck className="mt-1 h-4 w-4 shrink-0 text-accent" />
                  {feature}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-8">
            <p className="text-sm font-bold text-primary">حجم بسته‌بندی</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {sizes.map((size, index) => (
                <button
                  key={size.volume}
                  type="button"
                  onClick={() => setSizeIndex(index)}
                  className={cn(
                    "rounded-2xl border px-5 py-3 text-sm font-bold transition-colors",
                    index === sizeIndex
                      ? "border-accent bg-accent/15 text-primary"
                      : "border-border bg-card text-muted-foreground hover:border-accent/60"
                  )}
                >
                  {size.volume}
                  <span className="mt-1 block text-xs font-medium text-muted-foreground">
                    {formatPrice(size.price)}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-3 rounded-full border border-border bg-card p-1.5">
              <button
                type="button"
                onClick={() => setQuantity((value) => value + 1)}
                aria-label="افزودن تعداد"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-primary transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <Plus className="h-4 w-4" />
              </button>
              <span className="w-10 text-center font-heading text-base font-extrabold text-primary">
                {quantity.toLocaleString("fa-IR")}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                aria-label="کاهش تعداد"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-primary transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <Minus className="h-4 w-4" />
              </button>
            </div>

            <p className="text-sm text-muted-foreground">
              جمع این سفارش:{" "}
              <span className="font-bold text-primary">
                {formatPrice(activeSize.price * quantity)}
              </span>
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={handleAdd}
              disabled={outOfStock}
              className={cn(
                "flex flex-1 items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-bold transition-all",
                outOfStock
                  ? "cursor-not-allowed bg-muted text-muted-foreground"
                  : added
                    ? "bg-primary text-primary-foreground"
                    : "bg-accent text-accent-foreground hover:-translate-y-0.5 hover:shadow-lg"
              )}
            >
              {added ? <Check className="h-4 w-4" /> : <ShoppingCart className="h-4 w-4" />}
              {added ? "به سبد خرید اضافه شد" : "افزودن به سبد خرید"}
            </button>
            <button
              type="button"
              onClick={handleBuyNow}
              disabled={outOfStock}
              className={cn(
                "flex flex-1 items-center justify-center rounded-full border px-7 py-4 text-sm font-bold transition-colors",
                outOfStock
                  ? "cursor-not-allowed border-border text-muted-foreground"
                  : "border-primary bg-primary text-primary-foreground hover:bg-primary/90"
              )}
            >
              خرید سریع
            </button>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-accent" />
              ارسال سریع به سراسر ایران
            </span>
            <span className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-accent" />
              ضمانت اصالت و کیفیت محصول
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}