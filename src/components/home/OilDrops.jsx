import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const drops = [
  { left: "8%", top: "18%", size: 26, drift: 10, duration: 7 },
  { left: "18%", top: "68%", size: 14, drift: -12, duration: 9, delay: 0.6 },
  { left: "31%", top: "34%", size: 10, drift: 8, duration: 6.5, delay: 1.2 },
  { left: "46%", top: "12%", size: 18, drift: -9, duration: 8, delay: 0.3 },
  { left: "58%", top: "74%", size: 12, drift: 14, duration: 7.5, delay: 1.6 },
  { left: "70%", top: "26%", size: 22, drift: -7, duration: 9.5, delay: 0.9 },
  { left: "82%", top: "60%", size: 16, drift: 11, duration: 6.8, delay: 2 },
  { left: "92%", top: "22%", size: 9, drift: -13, duration: 8.4, delay: 1.1 },
];

export default function OilDrops({ className, tone = "gold" }) {
  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {drops.map((drop, index) => (
        <motion.span
          key={index}
          className={cn(
            "absolute rounded-full",
            tone === "gold"
              ? "bg-gradient-to-br from-accent to-accent/20 shadow-[0_0_24px_hsl(var(--accent)/0.55)]"
              : "bg-gradient-to-br from-primary to-primary/30 shadow-[0_0_20px_hsl(var(--primary)/0.4)]"
          )}
          style={{
            left: drop.left,
            top: drop.top,
            width: drop.size,
            height: drop.size,
            opacity: 0.75,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, drop.drift, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: drop.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: drop.delay ?? 0,
          }}
        />
      ))}
    </div>
  );
}