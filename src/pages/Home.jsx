import React from "react";
import Hero from "@/components/home/Hero";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import AboutSection from "@/components/home/AboutSection";
import ServicesSection from "@/components/home/ServicesSection";
import ContactCta from "@/components/home/ContactCta";
import usePageMeta from "@/hooks/usePageMeta";

export default function Home() {
  usePageMeta(
    "کیان پخش | خرید آنلاین روغن خوراکی، سرخ‌کردنی و آفتابگردان",
    "کیان پخش؛ انتخاب مطمئن برای آشپزی بهتر. خرید آنلاین انواع روغن خوراکی، سرخ‌کردنی، آفتابگردان و پخت‌وپز با کیفیت تضمین‌شده، قیمت رقابتی و ارسال سریع."
  );

  return (
    <>
      <Hero />
      <FeaturedProducts />
      <AboutSection />
      <ServicesSection />
      <ContactCta />
    </>
  );
}