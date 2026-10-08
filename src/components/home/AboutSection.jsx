import React from "react";
import { motion } from "framer-motion";
import { Award, CheckCircle2, Handshake, Sparkles } from "lucide-react";
import { Image } from "@/components/ui/image";
import { aboutImage } from "@/lib/images";

const pillars = [
{
  icon: Award,
  title: "کیفیت و استاندارد",
  text: "رعایت استانداردهای بهداشتی و کنترل کیفیت در تمام مراحل تولید و بسته‌بندی."
},
{
  icon: Handshake,
  title: "پخش مطمئن",
  text: "زنجیره توزیع منظم و به‌موقع برای فروشگاه‌ها، رستوران‌ها و مصرف‌کنندگان."
},
{
  icon: Sparkles,
  title: "قیمت رقابتی",
  text: "خرید مستقیم و حذف واسطه‌ها برای ارائه بهترین قیمت به مشتریان."
},
{
  icon: CheckCircle2,
  title: "رضایت مشتری",
  text: "پشتیبانی پاسخگو و پیگیری سفارش تا رسیدن بار به دست مشتری."
}];


export default function AboutSection() {
  return (
    <section id="about" className="mx-auto max-w-7xl scroll-mt-28 px-4 py-20 sm:px-6 lg:px-8">
      <div className="grid items-center gap-14 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}>
          
          <span className="text-sm font-bold text-accent">درباره ما</span>
          <h2 className="mt-3 font-heading text-3xl font-extrabold leading-[1.6] text-primary sm:text-4xl">
            کیان پخش؛ همراه مطمئن آشپزخانه‌های ایرانی
          </h2>
          <p className="mt-6 text-lg leading-9 text-muted-foreground">
            کیان پخش فعالیت خود را با هدف عرضه روغن‌های خوراکی باکیفیت و قیمت منصفانه آغاز کرد. امروز
            با شبکه‌ای از تولیدکنندگان معتبر و انبارهای مجهز، انواع روغن سرخ‌کردنی، آفتابگردان،
            پخت‌وپز، زیتون و کنجد را در بسته‌بندی‌های مختلف به مشتریان خانگی، فروشگاه‌ها و مجموعه‌های
            پذیرایی می‌رسانیم.
          </p>
          <p className="mt-4 leading-9 text-muted-foreground">
            تمرکز ما بر سه اصل روشن است: کیفیت قابل اعتماد، ارسال سریع و قیمت رقابتی. تمام محصولات با
            رعایت استانداردهای غذایی و بسته‌بندی مقاوم عرضه می‌شوند تا تجربه‌ای بدون ریسک برای مشتریان
            فراهم شود.
          </p>

          <div className="mt-9 grid gap-5 sm:grid-cols-2">
            {pillars.map((pillar) =>
            <div key={pillar.title} className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-secondary text-primary">
                  <pillar.icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-heading text-sm font-bold text-primary">{pillar.title}</h3>
                  <p className="mt-1 text-sm leading-7 text-muted-foreground">{pillar.text}</p>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="relative">
          
          



          
          
          




          
        </motion.div>
      </div>
    </section>);

}