"use client";

import { useCallback, useMemo, useState } from "react";
import { ArcReactor } from "@/components/arc-reactor/arc-reactor";
import { AiAssistant } from "@/components/assistant/ai-assistant";
import { HolographicBackground } from "@/components/layout/holographic-background";
import { MenuToggle } from "@/components/layout/menu-toggle";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { useGlowColor } from "@/hooks/use-glow-color";
import { useTypingPulse } from "@/hooks/use-typing-pulse";
import { parseCommand } from "@/lib/commands";
import type { ChatMessage } from "@/types";

function createMessage(text: string): ChatMessage {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    text,
    timestamp: Date.now(),
  };
}

export function Mark5Shell() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [reactorVisible, setReactorVisible] = useState(true);
  const [inputFocused, setInputFocused] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const glow = useGlowColor();
  const pulse = useTypingPulse(isTyping || inputFocused);

  const inputGlow = inputFocused && !glow.isOff;

  const handleSend = useCallback(
    (raw: string) => {
      const displayText = raw.trim();
      const command = parseCommand(displayText);

      setMessages((prev) => [...prev, createMessage(displayText)]);

      if (command.type === "set-color") {
        glow.setColor(command.color);
        setReactorVisible(true);
      } else if (command.type === "turn-off") {
        glow.turnOff();
        setReactorVisible(true);
      } else {
        setReactorVisible(false);
      }
    },
    [glow],
  );

  const handleCloseMessage = useCallback(
    (id: string) => {
      setMessages((prev) => {
        const next = prev.filter((m) => m.id !== id);
        if (next.length === 0) {
          setReactorVisible(true);
          glow.restoreFromStorage();
        }
        return next;
      });
    },
    [glow],
  );

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((o) => !o);
  }, []);

  const closeSidebar = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  const showReactor = reactorVisible && glow.hydrated;

  const accentColor = useMemo(
    () => (glow.isOff ? "#333" : glow.theme.accent),
    [glow.isOff, glow.theme.accent],
  );

  return (
    <main className="relative min-h-dvh w-full overflow-hidden">
      <HolographicBackground
        theme={glow.theme}
        pulse={pulse}
        isOff={glow.isOff}
      />

      <MenuToggle onClick={toggleSidebar} />
      <AppSidebar open={sidebarOpen} onNavigate={closeSidebar} />

      <ArcReactor
        visible={showReactor}
        ringFilter={glow.ringFilter}
        centreFilter={glow.centreFilter}
        accentColor={accentColor}
        pulse={pulse}
      />

      <header className="pointer-events-none fixed left-0 right-0 top-6 z-20 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.35em] text-cyan-400/70">
          Stark Industries
        </p>
        <h1 className="mt-1 bg-linear-to-r from-cyan-200 via-white to-orange-200 bg-clip-text text-2xl font-semibold tracking-widest text-transparent sm:text-3xl">
          MARK 5
        </h1>
      </header>

      <AiAssistant
        messages={messages}
        onSend={handleSend}
        onCloseMessage={handleCloseMessage}
        textboxShadow={glow.textboxShadow}
        inputGlow={inputGlow}
        onInputFocusChange={setInputFocused}
        onTyping={setIsTyping}
      />
    </main>
  );
}
