import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Phone, ShoppingCart, X } from "lucide-react";
import BrandMark from "@/components/layout/BrandMark";
import { useCart } from "@/context/CartContext";
import { siteConfig } from "@/lib/siteConfig";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const { pathname } = useLocation();
  const { count } = useCart();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-accent/25 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link to="/" aria-label="کیان پخش">
          <BrandMark />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {siteConfig.navLinks.map((link) => {
            const active = link.to === pathname;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                  active ? "text-primary" : "text-foreground/70 hover:text-primary"
                )}
              >
                {link.label}
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-accent"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/cart"
            aria-label="سبد خرید"
            className="relative flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-primary transition-colors hover:border-accent hover:bg-accent/10"
          >
            <ShoppingCart className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[0.65rem] font-extrabold text-accent-foreground">
                {count.toLocaleString("fa-IR")}
              </span>
            )}
          </Link>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "بستن منو" : "باز کردن منو"}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-primary transition-colors hover:border-accent lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-accent/20 bg-background/95 lg:hidden"
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6">
              {siteConfig.navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="rounded-2xl px-4 py-3 text-sm font-semibold text-foreground/80 transition-colors hover:bg-secondary hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
              <a
                href={siteConfig.contact.phoneHref}
                className="mt-2 flex items-center gap-2 rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground"
              >
                <Phone className="h-4 w-4" />
                <span dir="ltr">{siteConfig.contact.phone}</span>
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}