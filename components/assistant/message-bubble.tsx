"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";
import { memo } from "react";
import { Button } from "@/components/ui/button";
import type { ChatMessage } from "@/types";

interface MessageBubbleProps {
  message: ChatMessage;
  onClose: (id: string) => void;
}

function MessageBubbleComponent({ message, onClose }: MessageBubbleProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      className="group relative flex items-start justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-100 shadow-[0_0_20px_rgba(0,0,0,0.35)] backdrop-blur-md"
    >
      <p className="flex-1 break-words leading-relaxed">{message.text}</p>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-7 w-7 shrink-0 text-zinc-500 opacity-70 hover:text-white group-hover:opacity-100"
        onClick={() => onClose(message.id)}
        aria-label="Remove message"
      >
        <X className="h-4 w-4" />
      </Button>
    </motion.div>
  );
}

export const MessageBubble = memo(MessageBubbleComponent);
