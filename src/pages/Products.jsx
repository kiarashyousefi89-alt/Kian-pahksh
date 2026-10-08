import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PackageSearch } from "lucide-react";
import { base44 } from "@/api/base44Client";
import ProductCard from "@/components/product/ProductCard";
import usePageMeta from "@/hooks/usePageMeta";
import { cn } from "@/lib/utils";

export default function Products() {
  usePageMeta(
    "محصولات | خرید روغن خوراکی کیان پخش",
    "خرید آنلاین انواع روغن سرخ‌کردنی، آفتابگردان، پخت‌وپز، زیتون و کنجد کیان پخش با قیمت رقابتی و ارسال سریع."
  );

  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category") || "all";
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    base44.entities.Product.list({ distinct: "category" })
      .then((result) => active && setCategories(result.items ?? []))
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    let active = true;
    setLoading(true);
    const query = category === "all" ? {} : { category };
    base44.entities.Product.filter(query, { sort: "sort_order", limit: 50 })
      .then((page) => {
        if (!active) return;
        setProducts(page.items ?? []);
        setLoading(false);
      })
      .catch(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [category]);

  const selectCategory = (value) =>
    setSearchParams(value === "all" ? {} : { category: value }, { replace: true });

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <header className="rounded-[2rem] border border-border/70 bg-secondary/40 px-6 py-10 sm:px-10">
        <span className="text-sm font-bold text-accent">فروشگاه</span>
        <h1 className="mt-3 font-heading text-3xl font-extrabold text-primary sm:text-4xl">
          محصولات کیان پخش
        </h1>
        <p className="mt-4 max-w-3xl leading-9 text-muted-foreground">
          انواع روغن خوراکی و سرخ‌کردنی در بسته‌بندی‌های ۵۰۰ میلی‌لیتر تا ۹ لیتر، مناسب مصارف خانگی،
          فروشگاه‌ها و مجموعه‌های پذیرایی. برای انتخاب حجم و ثبت سفارش، روی هر محصول کلیک کنید.
        </p>
      </header>

      <div className="no-scrollbar mt-8 flex gap-2 overflow-x-auto pb-2">
        <button
          type="button"
          onClick={() => selectCategory("all")}
          className={cn(
            "shrink-0 rounded-full px-5 py-2.5 text-sm font-bold transition-colors",
            category === "all"
              ? "bg-primary text-primary-foreground"
              : "border border-border bg-card text-muted-foreground hover:border-accent hover:text-primary"
          )}
        >
          همه محصولات
        </button>
        {categories.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => selectCategory(item)}
            className={cn(
              "shrink-0 rounded-full px-5 py-2.5 text-sm font-bold transition-colors",
              category === item
                ? "bg-primary text-primary-foreground"
                : "border border-border bg-card text-muted-foreground hover:border-accent hover:text-primary"
            )}
          >
            روغن {item}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-[30rem] animate-pulse rounded-[1.75rem] border border-border/60 bg-card"
            />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="mt-16 flex flex-col items-center gap-4 rounded-[2rem] border border-dashed border-border bg-card py-20 text-center">
          <PackageSearch className="h-10 w-10 text-muted-foreground" />
          <p className="font-heading text-lg font-bold text-primary">
            محصولی در این دسته‌بندی پیدا نشد
          </p>
          <p className="text-sm text-muted-foreground">
            دسته‌بندی دیگری را انتخاب کنید یا همه محصولات را ببینید.
          </p>
        </div>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}