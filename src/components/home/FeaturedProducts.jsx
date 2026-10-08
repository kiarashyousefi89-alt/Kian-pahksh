import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { base44 } from "@/api/base44Client";
import ProductCard from "@/components/product/ProductCard";

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    base44.entities.Product.filter(
      { stock_status: { $ne: "out_of_stock" } },
      { sort: "sort_order", limit: 4 }
    )
      .then((page) => {
        if (!active) return;
        setProducts(page.items ?? []);
        setLoading(false);
      })
      .catch(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="text-sm font-bold text-accent">فروشگاه کیان پخش</span>
          <h2 className="mt-3 font-heading text-3xl font-extrabold text-primary sm:text-4xl">
            پرفروش‌ترین روغن‌های کیان پخش
          </h2>
          <p className="mt-4 max-w-2xl leading-8 text-muted-foreground">
            روغن‌های خوراکی با پایداری حرارتی بالا، شفافیت کامل و بسته‌بندی استاندارد؛ مناسب مصرف
            روزانه خانوار، رستوران‌ها و فروشگاه‌ها.
          </p>
        </div>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 rounded-full border border-primary/20 px-5 py-3 text-sm font-bold text-primary transition-colors hover:border-accent hover:bg-accent/10"
        >
          مشاهده همه محصولات
          <ArrowLeft className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {loading
          ? Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-[30rem] animate-pulse rounded-[1.75rem] border border-border/60 bg-card"
              />
            ))
          : products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
      </div>
    </section>
  );
}