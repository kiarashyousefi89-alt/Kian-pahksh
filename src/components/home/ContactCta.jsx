import React from "react";
import { Link } from "react-router-dom";
import { Phone } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";

export default function ContactCta() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-primary px-6 py-14 text-primary-foreground shadow-liquid sm:px-12">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_88%_12%,hsl(var(--accent)/0.3),transparent_55%)]" />
        <div className="relative grid items-center gap-8 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <h2 className="font-heading text-2xl font-extrabold leading-[1.7] sm:text-3xl">
              سفارش عمده یا مشاوره خرید روغن؟
            </h2>
            <p className="mt-4 max-w-2xl leading-9 text-primary-foreground/75">
              کارشناسان کیان پخش برای انتخاب روغن مناسب، هماهنگی ارسال عمده و صدور فاکتور در کنار شما
              هستند. کافیست شماره تماس خود را در فرم تماس ثبت کنید.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-full bg-accent px-7 py-3.5 text-sm font-bold text-accent-foreground transition-transform hover:-translate-y-0.5"
            >
              تماس با ما
            </Link>
            <a
              href={siteConfig.contact.phoneHref}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-primary-foreground/25 px-7 py-3.5 text-sm font-bold transition-colors hover:border-accent hover:text-accent"
            >
              <Phone className="h-4 w-4" />
              <span dir="ltr">{siteConfig.contact.phone}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}