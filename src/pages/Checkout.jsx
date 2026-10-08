import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, Loader2, ShieldCheck, ShoppingBag } from "lucide-react";
import { Image } from "@/components/ui/image";
import { base44 } from "@/api/base44Client";
import { useCart } from "@/context/CartContext";
import { formatPrice, toEnglishDigits } from "@/lib/format";
import { SHIPPING_NOTE } from "@/lib/siteConfig";
import usePageMeta from "@/hooks/usePageMeta";
import { cn } from "@/lib/utils";

const emptyForm = {
  customer_name: "",
  phone: "",
  city: "",
  address: "",
  postal_code: "",
  note: "",
};

const fieldClass =
  "mt-2 w-full rounded-2xl border border-border bg-background px-4 py-3.5 text-sm outline-none transition-colors focus:border-accent";

export default function Checkout() {
  usePageMeta("تکمیل خرید | کیان پخش", "ثبت سفارش انواع روغن خوراکی کیان پخش با ارسال سریع.");

  const { items, count, subtotal, total, clearCart } = useCart();
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [orderCode, setOrderCode] = useState(null);

  const update = (field) => (event) =>
    setForm((previous) => ({ ...previous, [field]: event.target.value }));

  const validate = () => {
    const next = {};
    if (!form.customer_name.trim()) next.customer_name = "نام و نام خانوادگی را وارد کنید.";

    const phone = toEnglishDigits(form.phone).replace(/\D/g, "");
    if (phone.length === 0) next.phone = "شماره تماس را وارد کنید.";
    else if (!/^09\d{9}$/.test(phone)) next.phone = "شماره موبایل معتبر وارد کنید. نمونه: ۰۹۱۲۳۴۵۶۷۸۹";

    if (!form.city.trim()) next.city = "شهر را وارد کنید.";
    if (form.address.trim().length < 10) next.address = "نشانی کامل پستی را وارد کنید.";

    const postal = toEnglishDigits(form.postal_code).replace(/\D/g, "");
    if (postal.length > 0 && postal.length !== 10) next.postal_code = "کد پستی باید ۱۰ رقم باشد.";

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    const order = await base44.entities.Order.create({
      customer_name: form.customer_name.trim(),
      phone: toEnglishDigits(form.phone).trim(),
      city: form.city.trim(),
      address: form.address.trim(),
      postal_code: toEnglishDigits(form.postal_code).trim(),
      note: form.note.trim(),
      items: items.map((item) => ({
        product_id: item.product_id,
        name: item.name,
        volume: item.volume,
        price: item.price,
        quantity: item.quantity,
      })),
      total,
      status: "pending",
    });

    setOrderCode(String(order.id).slice(-6));
    clearCart();
    setSubmitting(false);
  };

  if (orderCode) {
    return (
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-5 px-4 py-24 text-center">
        <span className="flex h-20 w-20 items-center justify-center rounded-3xl bg-secondary text-primary">
          <CheckCircle2 className="h-10 w-10" />
        </span>
        <h1 className="font-heading text-2xl font-extrabold text-primary">سفارش شما ثبت شد</h1>
        <p className="leading-8 text-muted-foreground">
          کد پیگیری سفارش شما{" "}
          <span className="font-bold text-primary" dir="ltr">
            {orderCode}
          </span>{" "}
          است. کارشناسان کیان پخش برای تأیید سفارش، اعلام هزینه ارسال و هماهنگی پرداخت با شما تماس
          می‌گیرند.
        </p>
        <div className="mt-2 flex flex-wrap justify-center gap-3">
          <Link
            to="/products"
            className="inline-flex items-center rounded-full bg-accent px-6 py-3.5 text-sm font-bold text-accent-foreground"
          >
            ادامه خرید
          </Link>
          <Link
            to="/"
            className="inline-flex items-center rounded-full border border-primary/20 px-6 py-3.5 text-sm font-bold text-primary"
          >
            بازگشت به صفحه اصلی
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 px-4 py-28 text-center">
        <span className="flex h-20 w-20 items-center justify-center rounded-3xl bg-secondary text-primary">
          <ShoppingBag className="h-9 w-9" />
        </span>
        <h1 className="font-heading text-2xl font-extrabold text-primary">
          برای تکمیل خرید ابتدا محصولی را انتخاب کنید
        </h1>
        <p className="leading-8 text-muted-foreground">سبد خرید شما خالی است.</p>
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
      <h1 className="font-heading text-3xl font-extrabold text-primary sm:text-4xl">تکمیل خرید</h1>
      <p className="mt-3 leading-8 text-muted-foreground">
        اطلاعات تحویل سفارش را وارد کنید. کارشناسان ما پس از ثبت سفارش برای تأیید و هماهنگی ارسال با
        شما تماس می‌گیرند.
      </p>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.5fr_1fr]">
        <form onSubmit={handleSubmit} className="rounded-[2rem] border border-border/70 bg-card p-6 shadow-liquid sm:p-8">
          <h2 className="font-heading text-lg font-bold text-primary">اطلاعات گیرنده</h2>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="customer_name" className="text-sm font-bold text-primary">
                نام و نام خانوادگی
              </label>
              <input
                id="customer_name"
                value={form.customer_name}
                onChange={update("customer_name")}
                className={cn(fieldClass, errors.customer_name && "border-destructive")}
                placeholder="مثال: علی محمدی"
              />
              {errors.customer_name && (
                <p className="mt-2 text-xs text-destructive">{errors.customer_name}</p>
              )}
            </div>

            <div>
              <label htmlFor="phone" className="text-sm font-bold text-primary">
                شماره تماس
              </label>
              <input
                id="phone"
                value={form.phone}
                onChange={update("phone")}
                dir="ltr"
                className={cn(fieldClass, "text-right", errors.phone && "border-destructive")}
                placeholder="09123456789"
              />
              {errors.phone && <p className="mt-2 text-xs text-destructive">{errors.phone}</p>}
            </div>

            <div>
              <label htmlFor="city" className="text-sm font-bold text-primary">
                شهر
              </label>
              <input
                id="city"
                value={form.city}
                onChange={update("city")}
                className={cn(fieldClass, errors.city && "border-destructive")}
                placeholder="مثال: تهران"
              />
              {errors.city && <p className="mt-2 text-xs text-destructive">{errors.city}</p>}
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="address" className="text-sm font-bold text-primary">
                نشانی کامل پستی
              </label>
              <textarea
                id="address"
                value={form.address}
                onChange={update("address")}
                rows={3}
                className={cn(fieldClass, "resize-none", errors.address && "border-destructive")}
                placeholder="خیابان، کوچه، پلاک، واحد"
              />
              {errors.address && <p className="mt-2 text-xs text-destructive">{errors.address}</p>}
            </div>

            <div>
              <label htmlFor="postal_code" className="text-sm font-bold text-primary">
                کد پستی (اختیاری)
              </label>
              <input
                id="postal_code"
                value={form.postal_code}
                onChange={update("postal_code")}
                dir="ltr"
                className={cn(fieldClass, "text-right", errors.postal_code && "border-destructive")}
                placeholder="1234567890"
              />
              {errors.postal_code && (
                <p className="mt-2 text-xs text-destructive">{errors.postal_code}</p>
              )}
            </div>

            <div>
              <label htmlFor="note" className="text-sm font-bold text-primary">
                توضیحات سفارش (اختیاری)
              </label>
              <input
                id="note"
                value={form.note}
                onChange={update("note")}
                className={fieldClass}
                placeholder="مثال: تماس قبل از ارسال"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-accent px-7 py-4 text-sm font-bold text-accent-foreground transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
            ثبت نهایی سفارش
          </button>

          <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-accent" />
            اطلاعات شما فقط برای پردازش و ارسال سفارش استفاده می‌شود.
          </p>
        </form>

        <aside className="h-fit rounded-[2rem] border border-border/70 bg-card p-6 shadow-liquid lg:sticky lg:top-28">
          <h2 className="font-heading text-lg font-bold text-primary">خلاصه سفارش</h2>

          <ul className="mt-5 space-y-4">
            {items.map((item) => (
              <li key={item.key} className="flex items-center gap-3">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-secondary/60">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fittingType="fit"
                    className="h-12 w-12"
                  />
                </span>
                <span className="flex-1 text-sm">
                  <span className="block font-bold text-primary">{item.name}</span>
                  <span className="block text-xs text-muted-foreground">
                    {item.volume} × {item.quantity.toLocaleString("fa-IR")}
                  </span>
                </span>
                <span className="text-sm font-bold text-primary">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </li>
            ))}
          </ul>

          <dl className="mt-6 space-y-4 border-t border-border pt-5 text-sm">
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
            to="/cart"
            className="mt-6 flex w-full items-center justify-center rounded-full border border-primary/20 px-6 py-3.5 text-sm font-bold text-primary transition-colors hover:border-accent hover:bg-accent/10"
          >
            ویرایش سبد خرید
          </Link>
        </aside>
      </div>
    </div>
  );
}