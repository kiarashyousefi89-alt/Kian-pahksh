import React from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Image } from "@/components/ui/image";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/format";
import { SHIPPING_NOTE } from "@/lib/siteConfig";
import usePageMeta from "@/hooks/usePageMeta";

export default function Cart() {
  usePageMeta("سبد خرید | کیان پخش", "بررسی و ویرایش سبد خرید روغن‌های خوراکی کیان پخش.");

  const { items, count, subtotal, total, setQuantity, removeItem } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 px-4 py-28 text-center">
        <span className="flex h-20 w-20 items-center justify-center rounded-3xl bg-secondary text-primary">
          <ShoppingBag className="h-9 w-9" />
        </span>
        <h1 className="font-heading text-2xl font-extrabold text-primary">سبد خرید شما خالی است</h1>
        <p className="leading-8 text-muted-foreground">
          هنوز محصولی به سبد خرید اضافه نکرده‌اید. از میان روغن‌های کیان پخش انتخاب کنید و سفارش خود را
          تکمیل کنید.
        </p>
        <Link
          to="/products"
          className="mt-2 inline-flex items-center rounded-full bg-accent px-7 py-3.5 text-sm font-bold text-accent-foreground"
        >
          مشاهده محصولات
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <h1 className="font-heading text-3xl font-extrabold text-primary sm:text-4xl">سبد خرید</h1>
      <p className="mt-3 text-muted-foreground">
        {count.toLocaleString("fa-IR")} قلم کالا در سبد خرید شما قرار دارد.
      </p>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.6fr_1fr]">
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.key}
              className="flex flex-wrap items-center gap-4 rounded-[1.75rem] border border-border/70 bg-card p-4 shadow-liquid"
            >
              <Link
                to={`/product/${item.product_id}`}
                className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-secondary/60"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  fittingType="fit"
                  className="h-20 w-20"
                />
              </Link>

              <div className="min-w-[9rem] flex-1">
                <Link
                  to={`/product/${item.product_id}`}
                  className="font-heading text-base font-bold text-primary transition-colors hover:text-accent"
                >
                  {item.name}
                </Link>
                <p className="mt-1 text-xs text-muted-foreground">حجم: {item.volume}</p>
                <p className="mt-1 text-sm font-bold text-primary">{formatPrice(item.price)}</p>
              </div>

              <div className="flex items-center gap-2 rounded-full border border-border p-1">
                <button
                  type="button"
                  onClick={() => setQuantity(item.key, item.quantity + 1)}
                  aria-label="افزودن تعداد"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-primary transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  <Plus className="h-4 w-4" />
                </button>
                <span className="w-9 text-center text-sm font-extrabold text-primary">
                  {item.quantity.toLocaleString("fa-IR")}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(item.key, item.quantity - 1)}
                  aria-label="کاهش تعداد"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-primary transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  <Minus className="h-4 w-4" />
                </button>
              </div>

              <p className="w-28 text-center font-heading text-sm font-extrabold text-primary">
                {formatPrice(item.price * item.quantity)}
              </p>

              <button
                type="button"
                onClick={() => removeItem(item.key)}
                aria-label={`حذف ${item.name}`}
                className="flex h-10 w-10 items-center justify-center rounded-full text-destructive transition-colors hover:bg-destructive/10"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>

        <aside className="h-fit rounded-[1.75rem] border border-border/70 bg-card p-6 shadow-liquid lg:sticky lg:top-28">
          <h2 className="font-heading text-lg font-bold text-primary">خلاصه سفارش</h2>

          <dl className="mt-6 space-y-4 text-sm">
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">تعداد اقلام</dt>
              <dd className="font-bold text-primary">{count.toLocaleString("fa-IR")}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">جمع اقلام</dt>
              <dd className="font-bold text-primary">{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex items-start justify-between gap-4">
              <dt className="text-muted-foreground">هزینه ارسال</dt>
              <dd className="max-w-[10rem] text-left text-xs leading-6 text-muted-foreground">
                {SHIPPING_NOTE}
              </dd>
            </div>
            <div className="flex items-center justify-between border-t border-border pt-4">
              <dt className="font-bold text-primary">مبلغ قابل پرداخت</dt>
              <dd className="font-heading text-lg font-extrabold text-primary">
                {formatPrice(total)}
              </dd>
            </div>
          </dl>

          <Link
            to="/checkout"
            className="mt-6 flex w-full items-center justify-center rounded-full bg-accent px-6 py-4 text-sm font-bold text-accent-foreground transition-transform hover:-translate-y-0.5"
          >
            ادامه فرآیند خرید
          </Link>
          <Link
            to="/products"
            className="mt-3 flex w-full items-center justify-center rounded-full border border-primary/20 px-6 py-3.5 text-sm font-bold text-primary transition-colors hover:border-accent hover:bg-accent/10"
          >
            ادامه خرید
          </Link>
        </aside>
      </div>
    </div>
  );
}