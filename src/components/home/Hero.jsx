import React from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { BadgeCheck, Phone, Sparkles, Truck } from "lucide-react";
import { Image } from "@/components/ui/image";
import OilDrops from "@/components/home/OilDrops";
import { posterImage } from "@/lib/images";
import { siteConfig } from "@/lib/siteConfig";

const trust = [
{ icon: BadgeCheck, label: "کیفیت تضمین‌شده" },
{ icon: Truck, label: "ارسال سریع" },
{ icon: Sparkles, label: "قیمت رقابتی" }];


export default function Hero() {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [12, -12]), {
    stiffness: 110,
    damping: 18
  });
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [-7, 7]), {
    stiffness: 110,
    damping: 18
  });

  const handlePointerMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <section
      onPointerMove={handlePointerMove}
      className="relative isolate overflow-hidden bg-primary text-primary-foreground">
      
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_18%,hsl(var(--accent)/0.32),transparent_58%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_88%,hsl(var(--secondary)/0.18),transparent_52%)]" />
      <OilDrops />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-8 lg:py-28">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-2 font-semibold text-accent text-xs">
            
            <Sparkles className="h-3.5 w-3.5" />
            تولید و پخش انواع روغن خوراکی
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="mt-6 font-heading text-3xl font-black leading-[1.6] sm:text-4xl lg:text-[2.9rem] opacity-100">
            
            کیان پخش؛ انتخاب مطمئن برای <span className="text-gold">آشپزی بهتر</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="mt-6 max-w-xl text-base leading-9 text-primary-foreground/75 sm:text-lg">
            
            کیان پخش با تجربه‌ای چندین‌ساله در پخش روغن‌های خوراکی، انواع روغن سرخ‌کردنی، آفتابگردان،
            پخت‌وپز و زیتون را با کیفیت تضمین‌شده و قیمت رقابتی به آشپزخانه‌های ایرانی می‌رساند. سفارش
            شما با بسته‌بندی مطمئن و ارسال سریع، از انبار ما به دستتان می‌رسد.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24 }}
            className="mt-9 flex flex-wrap items-center gap-3">
            
            <Link
              to="/products"
              className="inline-flex items-center justify-center rounded-full bg-accent px-7 py-3.5 text-sm font-bold text-accent-foreground shadow-liquid transition-transform hover:-translate-y-0.5">
              
              مشاهده محصولات
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-primary-foreground/25 px-7 py-3.5 text-sm font-bold text-primary-foreground transition-colors hover:border-accent hover:bg-accent/10 hover:text-accent">
              
              <Phone className="h-4 w-4" />
              تماس با ما
            </Link>
          </motion.div>

          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
            {trust.map((item) =>
            <span key={item.label} className="flex items-center gap-2 text-sm text-primary-foreground/80">
                <item.icon className="h-4 w-4 text-accent" />
                {item.label}
              </span>
            )}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{ rotateX, rotateY, transformPerspective: 1400 }}
          className="preserve-3d relative mx-auto w-full max-w-[22rem]">
          
          <div className="absolute inset-10 rounded-full bg-accent/25 blur-3xl" />

          <motion.div
            animate={{ y: [0, -16, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="relative">
            <Image
              src={posterImage}
              alt="فروش عمده روغن فرش First Golden از کیان پخش"
              fittingType="fit"
              className="h-[30rem] w-full rounded-[2rem] drop-shadow-2xl sm:h-[34rem]" />
            



            
            
          </motion.div>

          







          

          





          
        </motion.div>
      </div>

      <div className="relative h-px w-full bg-gradient-to-l from-transparent via-accent/60 to-transparent" />
    </section>);

}