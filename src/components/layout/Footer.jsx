import React from "react";
import { Link } from "react-router-dom";
import { Clock, Instagram, Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import BrandMark from "@/components/layout/BrandMark";
import { siteConfig } from "@/lib/siteConfig";

const socialIcons = {
  instagram: Instagram,
  telegram: Send,
  whatsapp: MessageCircle,
};

export default function Footer() {
  const year = new Intl.DateTimeFormat("fa-IR", { year: "numeric" }).format(new Date());

  return (
    <footer className="relative mt-24 overflow-hidden bg-primary text-primary-foreground">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_0%,hsl(var(--accent)/0.22),transparent_55%)]" />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-1">
          <BrandMark tone="light" />
          <p className="mt-5 text-sm leading-8 text-primary-foreground/70">
            کیان پخش، عرضه‌کننده انواع روغن خوراکی، سرخ‌کردنی و پخت‌وپز با کیفیت تضمین‌شده، قیمت
            رقابتی و ارسال مطمئن به سراسر ایران.
          </p>
          <div className="mt-6 flex gap-3">
            {siteConfig.socials.map((social) => {
              const Icon = socialIcons[social.key];
              return (
                <a
                  key={social.key}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.name}
                  className="flex h-10 w-10 items-center justify-center rounded-2xl border border-primary-foreground/20 text-primary-foreground/80 transition-colors hover:border-accent hover:bg-accent hover:text-accent-foreground"
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </div>

        <div>
          <h3 className="font-heading text-base font-bold">دسترسی سریع</h3>
          <ul className="mt-5 space-y-3 text-sm text-primary-foreground/70">
            {siteConfig.navLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="transition-colors hover:text-accent">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/cart" className="transition-colors hover:text-accent">
                سبد خرید
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-base font-bold">دسته‌بندی محصولات</h3>
          <ul className="mt-5 space-y-3 text-sm text-primary-foreground/70">
            {siteConfig.categories.map((category) => (
              <li key={category}>
                <Link
                  to={`/products?category=${encodeURIComponent(category)}`}
                  className="transition-colors hover:text-accent"
                >
                  روغن {category}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-base font-bold">اطلاعات تماس</h3>
          <ul className="mt-5 space-y-4 text-sm text-primary-foreground/70">
            <li className="flex items-start gap-3">
              <Phone className="mt-1 h-4 w-4 shrink-0 text-accent" />
              <a href={siteConfig.contact.phoneHref} dir="ltr" className="hover:text-accent">
                {siteConfig.contact.phone}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MessageCircle className="mt-1 h-4 w-4 shrink-0 text-accent" />
              <a
                href={siteConfig.contact.whatsappHref}
                target="_blank"
                rel="noreferrer"
                dir="ltr"
                className="hover:text-accent"
              >
                {siteConfig.contact.whatsapp}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="mt-1 h-4 w-4 shrink-0 text-accent" />
              <a href={siteConfig.contact.emailHref} dir="ltr" className="hover:text-accent">
                {siteConfig.contact.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-1 h-4 w-4 shrink-0 text-accent" />
              <span>{siteConfig.contact.address}</span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="mt-1 h-4 w-4 shrink-0 text-accent" />
              <span className="space-y-1">
                {siteConfig.contact.hours.map((row) => (
                  <span key={row.days} className="block">
                    {row.days}: {row.time}
                  </span>
                ))}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-primary-foreground/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-primary-foreground/60 sm:flex-row sm:px-6 lg:px-8">
          <p>© {year} کیان پخش — تمامی حقوق محفوظ است.</p>
          <p>فروش و پخش انواع روغن خوراکی و سرخ‌کردنی در سراسر ایران</p>
        </div>
      </div>
    </footer>
  );
}