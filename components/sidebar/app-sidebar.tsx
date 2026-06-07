"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquarePlus,
  Search,
  Settings,
  ChevronDown,
  Zap,
  Power,
} from "lucide-react";
import { memo, useState } from "react";
import { cn } from "@/lib/utils";

interface AppSidebarProps {
  open: boolean;
  onNavigate?: () => void;
  onCommand?: (command: string) => void;
}

const links = [
  { icon: MessageSquarePlus, label: "New Chat", href: "#" },
  { icon: Search, label: "Search Chat", href: "#" },
  { icon: Settings, label: "Settings", href: "#" },
] as const;

const ARC_COMMANDS = [
  {
    label: "Blue",
    command: "change color to blue",
    color: "#38bdf8",
  },
  {
    label: "Red",
    command: "change color to red",
    color: "#f87171",
  },
  {
    label: "Purple",
    command: "change color to purple",
    color: "#a78bfa",
  },
  {
    label: "Orange",
    command: "change color to orange",
    color: "#fb923c",
  },
  {
    label: "Pink",
    command: "change color to pink",
    color: "#f472b6",
  },
  {
    label: "Lights Off",
    command: "turn off the lights",
    color: null,
  },
] as const;

function AppSidebarComponent({
  open,
  onNavigate,
}: AppSidebarProps) {
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

function AppSidebarPanel({
  open,
  onNavigate,
  onCommand,
}: AppSidebarProps) {
  const [commandsOpen, setCommandsOpen] = useState(false);

  return (
    <motion.aside
      className={cn(
        "fixed top-0 z-50 flex h-screen w-[min(85vw,250px)] flex-col gap-4",
        "border-r border-white/10 bg-zinc-950/80 px-0 py-5 backdrop-blur-xl",
        "shadow-[inset_-1px_0_0_rgba(0,200,255,0.08),4px_0_40px_rgba(0,0,0,0.5)]"
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
              "transition-colors hover:bg-cyan-500/15 hover:text-white"
            )}
          >
            <span className="flex h-8 w-8 min-w-8 items-center justify-center text-zinc-100">
              <Icon className="h-5 w-5" strokeWidth={1.75} />
            </span>
            {label}
          </a>
        ))}
      </nav>

      <div className="mx-4 h-px bg-white/10" />

      <div className="px-2">
        <button
          type="button"
          onClick={() => setCommandsOpen((v) => !v)}
          className="flex w-full items-center justify-between rounded-md px-2 py-2.5 text-left text-[11px] font-semibold uppercase tracking-widest text-zinc-500 transition-colors hover:bg-cyan-500/10 hover:text-cyan-300"
        >
          <span className="flex items-center gap-2">
            <Zap className="h-3 w-3 text-cyan-500" />
            Arc Commands
          </span>

          <motion.div
            animate={{ rotate: commandsOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="h-3.5 w-3.5" />
          </motion.div>
        </button>

        <AnimatePresence>
          {commandsOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="mt-1 flex flex-col gap-1">
                {ARC_COMMANDS.map((cmd) => (
                  <button
                    key={cmd.command}
                    type="button"
                    onClick={() => {
                      onCommand?.(cmd.command);
                      onNavigate?.();
                    }}
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-zinc-400 transition-colors hover:bg-cyan-500/10 hover:text-white"
                  >
                    {cmd.color ? (
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: cmd.color }}
                      />
                    ) : (
                      <Power className="h-3.5 w-3.5 text-red-400" />
                    )}

                    {cmd.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

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