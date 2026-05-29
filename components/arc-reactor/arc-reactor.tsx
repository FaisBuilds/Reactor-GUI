"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { memo } from "react";
import { cn } from "@/lib/utils";

interface ArcReactorProps {
  visible: boolean;
  ringFilter: string;
  centreFilter: string;
  accentColor: string;
  pulse: number;
}

function ArcReactorComponent({
  visible,
  ringFilter,
  centreFilter,
  accentColor,
  pulse,
}: ArcReactorProps) {
  const breathe = 1 + (pulse % 30) / 300;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={cn(
            "pointer-events-none absolute left-1/2 top-[42%] z-10 w-[min(92vw,500px)] -translate-x-1/2 -translate-y-1/2",
            "aspect-[5/3] sm:top-[40%] md:top-[38%]",
          )}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="relative h-full w-full"
            animate={{ scale: breathe }}
            transition={{ duration: 0.2, ease: "linear" }}
          >
            <div
              className="absolute inset-[-15%] rounded-full blur-3xl"
              style={{
                background: `radial-gradient(circle, ${accentColor}33 0%, transparent 65%)`,
              }}
            />
            <Image
              src="/arc.png"
              alt="Arc reactor base"
              fill
              priority
              className="object-contain select-none"
              draggable={false}
            />
            <Image
              src="/ring.png"
              alt="Arc reactor ring"
              fill
              priority
              className="object-contain select-none transition-[filter] duration-500"
              style={{ filter: ringFilter }}
              draggable={false}
            />
            <Image
              src="/centre.png"
              alt="Arc reactor core"
              fill
              priority
              className="object-contain select-none transition-[filter] duration-500"
              style={{ filter: centreFilter }}
              draggable={false}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export const ArcReactor = memo(ArcReactorComponent);
