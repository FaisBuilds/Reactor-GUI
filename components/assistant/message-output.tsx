"use client";

import { AnimatePresence } from "framer-motion";
import { memo, useEffect, useRef } from "react";
import { MessageBubble } from "@/components/assistant/message-bubble";
import type { ChatMessage } from "@/types";

interface MessageOutputProps {
  messages: ChatMessage[];
  onClose: (id: string) => void;
}

function MessageOutputComponent({ messages, onClose }: MessageOutputProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages]);

  if (messages.length === 0) return null;

  return (
    <div
      ref={containerRef}
      className="mb-3 max-h-[min(40vh,300px)] w-full overflow-y-auto px-1 scrollbar-thin"
    >
      <AnimatePresence mode="popLayout">
        <div className="flex flex-col gap-2">
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} onClose={onClose} />
          ))}
        </div>
      </AnimatePresence>
    </div>
  );
}

export const MessageOutput = memo(MessageOutputComponent);
