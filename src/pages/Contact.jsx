import React, { useState } from "react";
import { CheckCircle2, Clock, Loader2, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { siteConfig } from "@/lib/siteConfig";
import { toEnglishDigits } from "@/lib/format";
import usePageMeta from "@/hooks/usePageMeta";
import { cn } from "@/lib/utils";

const emptyForm = { name: "", phone: "", email: "", subject: "", message: "" };

const fieldClass =
  "mt-2 w-full rounded-2xl border border-border bg-background px-4 py-3.5 text-sm outline-none transition-colors focus:border-accent";

export default function Contact() {
  usePageMeta(
    "تماس با ما | کیان پخش",
    "راه‌های ارتباط با کیان پخش برای سفارش عمده روغن، مشاوره خرید و پیگیری سفارش‌ها."
  );

  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const update = (field) => (event) =>
    setForm((previous) => ({ ...previous, [field]: event.target.value }));

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "نام خود را وارد کنید.";
    const phone = toEnglishDigits(form.phone).replace(/\D/g, "");
    if (phone.length === 0) next.phone = "شماره تماس را وارد کنید.";
    else if (!/^0\d{9,10}$/.test(phone)) next.phone = "شماره تماس معتبر وارد کنید.";
    if (form.message.trim().length < 10) next.message = "متن پیام را کامل‌تر بنویسید.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    setSending(true);
    await base44.entities.ContactMessage.create({
      name: form.name.trim(),
      phone: toEnglishDigits(form.phone).trim(),
      email: form.email.trim(),
      subject: form.subject.trim(),
      message: form.message.trim(),
    });
    setForm(emptyForm);
    setSent(true);
    setSending(false);
  };

  const cards = [
    { icon: Phone, label: "تلفن تماس", value: siteConfig.contact.phone, href: siteConfig.contact.phoneHref, ltr: true },
    { icon: MessageCircle, label: "واتس‌اپ", value: siteConfig.contact.whatsapp, href: siteConfig.contact.whatsappHref, ltr: true },
    { icon: Mail, label: "ایمیل", value: siteConfig.contact.email, href: siteConfig.contact.emailHref, ltr: true },
    { icon: MapPin, label: "نشانی", value: siteConfig.contact.address, hint: siteConfig.contact.addressHint },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <header className="rounded-[2rem] border border-border/70 bg-secondary/40 px-6 py-10 sm:px-10">
        <span className="text-sm font-bold text-accent">ارتباط با کیان پخش</span>
        <h1 className="mt-3 font-heading text-3xl font-extrabold text-primary sm:text-4xl">
          تماس با ما
        </h1>
        <p className="mt-4 max-w-3xl leading-9 text-muted-foreground">
          برای سفارش عمده، استعلام قیمت روغن‌ها یا مشاوره خرید، فرم زیر را تکمیل کنید یا از راه‌های
          ارتباطی تماس بگیرید. کارشناسان ما در ساعات کاری پاسخگوی شما هستند.
        </p>
      </header>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <section className="rounded-[2rem] border border-border/70 bg-card p-6 shadow-liquid sm:p-8">
          {sent ? (
            <div className="flex flex-col items-center gap-4 py-14 text-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-3xl bg-secondary text-primary">
                <CheckCircle2 className="h-8 w-8" />
              </span>
              <h2 className="font-heading text-xl font-extrabold text-primary">
                پیام شما ثبت شد
              </h2>
              <p className="leading-8 text-muted-foreground">
                از تماس شما سپاسگزاریم. کارشناسان کیان پخش در اولین فرصت با شما تماس می‌گیرند.
              </p>
              <button
                type="button"
                onClick={() => setSent(false)}
                className="mt-2 rounded-full border border-primary/20 px-6 py-3 text-sm font-bold text-primary transition-colors hover:border-accent hover:bg-accent/10"
              >
                ارسال پیام جدید
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <h2 className="font-heading text-lg font-bold text-primary">فرم تماس</h2>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="text-sm font-bold text-primary">
                    نام و نام خانوادگی
                  </label>
                  <input
                    id="name"
                    value={form.name}
                    onChange={update("name")}
                    className={cn(fieldClass, errors.name && "border-destructive")}
                    placeholder="مثال: زهرا رضایی"
                  />
                  {errors.name && <p className="mt-2 text-xs text-destructive">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="contact_phone" className="text-sm font-bold text-primary">
                    شماره تماس
                  </label>
                  <input
                    id="contact_phone"
                    value={form.phone}
                    onChange={update("phone")}
                    dir="ltr"
                    className={cn(fieldClass, "text-right", errors.phone && "border-destructive")}
                    placeholder="09123456789"
                  />
                  {errors.phone && <p className="mt-2 text-xs text-destructive">{errors.phone}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="text-sm font-bold text-primary">
                    ایمیل (اختیاری)
                  </label>
                  <input
                    id="email"
                    value={form.email}
                    onChange={update("email")}
                    dir="ltr"
                    className={cn(fieldClass, "text-right")}
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="text-sm font-bold text-primary">
                    موضوع (اختیاری)
                  </label>
                  <input
                    id="subject"
                    value={form.subject}
                    onChange={update("subject")}
                    className={fieldClass}
                    placeholder="مثال: سفارش عمده روغن سرخ‌کردنی"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="message" className="text-sm font-bold text-primary">
                    متن پیام
                  </label>
                  <textarea
                    id="message"
                    value={form.message}
                    onChange={update("message")}
                    rows={5}
                    className={cn(fieldClass, "resize-none", errors.message && "border-destructive")}
                    placeholder="مقدار مورد نیاز، شهر و توضیحات خود را بنویسید."
                  />
                  {errors.message && (
                    <p className="mt-2 text-xs text-destructive">{errors.message}</p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={sending}
                className="mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-accent px-7 py-4 text-sm font-bold text-accent-foreground transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {sending && <Loader2 className="h-4 w-4 animate-spin" />}
                ارسال پیام
              </button>
            </form>
          )}
        </section>

        <aside className="space-y-4">
          {cards.map((card) => (
            <div
              key={card.label}
              className="flex items-start gap-4 rounded-[1.5rem] border border-border/70 bg-card p-5 shadow-liquid"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-secondary text-primary">
                <card.icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs text-muted-foreground">{card.label}</p>
                {card.href ? (
                  <a
                    href={card.href}
                    dir={card.ltr ? "ltr" : undefined}
                    className="mt-1 block text-sm font-bold text-primary transition-colors hover:text-accent"
                  >
                    {card.value}
                  </a>
                ) : (
                  <p className="mt-1 text-sm font-bold text-primary">{card.value}</p>
                )}
                {card.hint && <p className="mt-1 text-xs text-muted-foreground">{card.hint}</p>}
              </div>
            </div>
          ))}

          <div className="rounded-[1.5rem] border border-accent/30 bg-accent/10 p-5">
            <p className="flex items-center gap-2 font-heading text-sm font-bold text-primary">
              <Clock className="h-4 w-4 text-accent" />
              ساعات کاری
            </p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {siteConfig.contact.hours.map((row) => (
                <li key={row.days} className="flex items-center justify-between">
                  <span>{row.days}</span>
                  <span className="font-bold text-primary">{row.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}