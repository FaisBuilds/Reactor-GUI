"use client";

import { motion } from "framer-motion";
import { memo } from "react";
import type { GlowTheme } from "@/types";

interface HolographicBackgroundProps {
  theme: GlowTheme;
  pulse: number;
  isOff: boolean;
}

function HolographicBackgroundComponent({
  theme,
  pulse,
  isOff,
}: HolographicBackgroundProps) {
  const intensity = isOff ? 0.15 : 0.35 + (pulse % 20) / 80;

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-black" />
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background: `radial-gradient(ellipse 80% 50% at 50% 45%, ${theme.particle} 0%, transparent 70%)`,
          opacity: intensity,
        }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[48px_48px] mask-[radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />
      {Array.from({ length: 24 }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute h-1 w-1 rounded-full"
          style={{
            left: `${(i * 17) % 100}%`,
            top: `${(i * 23) % 100}%`,
            backgroundColor: theme.particle,
            boxShadow: `0 0 8px ${theme.accent}`,
          }}
          animate={{
            opacity: [0.1, 0.6, 0.1],
            scale: [0.8, 1.2, 0.8],
            y: [0, -12 - (i % 5) * 4, 0],
          }}
          transition={{
            duration: 4 + (i % 5),
            repeat: Infinity,
            delay: i * 0.15,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export const HolographicBackground = memo(HolographicBackgroundComponent);
