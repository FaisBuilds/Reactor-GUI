"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MessageSquarePlus, Search, Settings } from "lucide-react";
import { memo } from "react";
import { cn } from "@/lib/utils";

interface AppSidebarProps {
  open: boolean;
  onNavigate?: () => void;
}

const links = [
  { icon: MessageSquarePlus, label: "New Chat", href: "#" },
  { icon: Search, label: "Search Chat", href: "#" },
  { icon: Settings, label: "Settings", href: "#" },
] as const;

function AppSidebarComponent({ open, onNavigate }: AppSidebarProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-40 md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onNavigate}
          aria-hidden
        />
      )}
    </AnimatePresence>
  );
}

function AppSidebarPanel({ open, onNavigate }: AppSidebarProps) {
  return (
    <motion.aside
      className={cn(
        "fixed top-0 z-50 flex h-screen w-[min(85vw,250px)] flex-col gap-4",
        "border-r border-white/10 bg-zinc-950/80 px-0 py-5 backdrop-blur-xl",
        "shadow-[inset_-1px_0_0_rgba(0,200,255,0.08),4px_0_40px_rgba(0,0,0,0.5)]",
      )}
      initial={false}
      animate={{ x: open ? 0 : -280 }}
      transition={{ type: "spring", stiffness: 320, damping: 32 }}
      aria-label="Navigation sidebar"
    >
      <nav className="flex flex-col gap-1 px-2 pt-8">
        {links.map(({ icon: Icon, label, href }) => (
          <a
            key={label}
            href={href}
            onClick={onNavigate}
            className={cn(
              "flex w-full items-center gap-2.5 rounded-md px-2 py-2.5 text-left text-[15px] text-zinc-300",
              "transition-colors hover:bg-cyan-500/15 hover:text-white",
            )}
          >
            <span className="flex h-8 w-8 min-w-8 items-center justify-center text-zinc-100">
              <Icon className="h-5 w-5" strokeWidth={1.75} />
            </span>
            {label}
          </a>
        ))}
      </nav>
      <p className="mt-2 px-5 text-[11px] font-medium uppercase tracking-widest text-zinc-500">
        Chats
      </p>
    </motion.aside>
  );
}

function AppSidebarCombined(props: AppSidebarProps) {
  return (
    <>
      <AppSidebarComponent {...props} />
      <AppSidebarPanel {...props} />
    </>
  );
}

export const AppSidebar = memo(AppSidebarCombined);
