import React from "react";
import { Image } from "@/components/ui/image";
import { logoImage } from "@/lib/images";
import { cn } from "@/lib/utils";

export default function BrandMark({ tone = "dark", compact = false }) {
  const isLight = tone === "light";

  return (
    <span className="flex items-center gap-3">
      <Image
        src={logoImage}
        alt="لوگوی کیان پخش"
        fittingType="fill"
        className="h-12 w-12 shrink-0 rounded-full shadow-liquid ring-1 ring-accent/50"
      />
      <span className="leading-tight">
        <span
          className={cn(
            "block font-heading text-lg font-extrabold",
            isLight ? "text-primary-foreground" : "text-primary"
          )}
        >
          کیان پخش
        </span>
        {!compact && (
          <span className="block text-[0.62rem] font-semibold tracking-[0.32em] text-accent">
            KIAN PAKHSH
          </span>
        )}
      </span>
    </span>
  );
}