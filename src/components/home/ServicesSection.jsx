import React from "react";
import { motion } from "framer-motion";
import {
  BadgeCheck,
  Headphones,
  MapPin,
  PackageCheck,
  Store,
  Truck,
  UtensilsCrossed,
  Wallet,
} from "lucide-react";

const advantages = [
  {
    icon: BadgeCheck,
    title: "کیفیت بالا",
    text: "کنترل کیفیت در تمام مراحل تولید، بسته‌بندی و توزیع.",
  },
  {
    icon: Wallet,
    title: "قیمت مناسب",
    text: "خرید مستقیم و حذف واسطه‌ها برای قیمت رقابتی.",
  },
  {
    icon: Truck,
    title: "ارسال سریع",
    text: "ارسال به سراسر کشور و تحویل سریع در تهران.",
  },
  {
    icon: PackageCheck,
    title: "بسته‌بندی مطمئن",
    text: "بسته‌بندی مقاوم و استاندارد، بدون نشتی و آسیب.",
  },
  {
    icon: Headphones,
    title: "پشتیبانی مشتریان",
    text: "پاسخگویی کارشناسان برای انتخاب و پیگیری سفارش.",
  },
];

const services = [
  {
    icon: Store,
    title: "پخش عمده",
    text: "تأمین روغن مورد نیاز فروشگاه‌ها و سوپرمارکت‌ها با فاکتور رسمی و ارسال دوره‌ای.",
  },
  {
    icon: UtensilsCrossed,
    title: "تأمین رستوران‌ها",
    text: "تأمین روغن مخصوص سرخ‌کردن برای رستوران‌ها، فست‌فودها و مجموعه‌های پذیرایی.",
  },
  {
    icon: MapPin,
    title: "ارسال به سراسر ایران",
    text: "ارسال با پوشش سراسری و پیگیری سفارش تا لحظه تحویل بار.",
  },
];

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="relative scroll-mt-28 overflow-hidden bg-secondary/30 py-20"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,hsl(var(--accent)/0.16),transparent_55%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold text-accent">خدمات و مزیت‌ها</span>
          <h2 className="mt-3 font-heading text-3xl font-extrabold text-primary sm:text-4xl">
            چرا کیان پخش؟
          </h2>
          <p className="mt-4 leading-8 text-muted-foreground">
            از انتخاب روغن مناسب تا تحویل بار در محل شما، تمام مسیر خرید را ساده، شفاف و مطمئن
            کرده‌ایم.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {advantages.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: index * 0.07 }}
              className="group rounded-[1.5rem] border border-border/70 bg-card p-6 text-center shadow-liquid transition-transform duration-300 hover:-translate-y-1.5"
            >
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-primary to-primary/70 text-accent shadow-liquid transition-transform duration-300 group-hover:-translate-y-1">
                <item.icon className="h-7 w-7" />
              </span>
              <h3 className="mt-5 font-heading text-base font-bold text-primary">{item.title}</h3>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">{item.text}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="flex gap-5 rounded-[1.5rem] border border-accent/25 bg-background/80 p-6"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent/20 text-primary">
                <service.icon className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-heading text-base font-bold text-primary">{service.title}</h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">{service.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}