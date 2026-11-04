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

export function Mark5Shell() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const glow = useGlowColor();
  const pulse = useTypingPulse(isTyping || inputFocused);

  const inputGlow = inputFocused && !glow.isOff;

  const handleSend = useCallback(
    (raw: string) => {
      const command = parseCommand(raw);

      if (command.type === "set-color") {
        glow.setColor(command.color);
      } else if (command.type === "turn-off") {
        glow.turnOff();
      }
    },
    [glow],
  );

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((o) => !o);
  }, []);

  const closeSidebar = useCallback(() => {
    setSidebarOpen(false);
  }, []);

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
      <AppSidebar
          open={sidebarOpen}
          onNavigate={closeSidebar}
          onCommand={handleSend}
        />

      <ArcReactor
        visible={glow.hydrated}
        ringFilter={glow.ringFilter}
        centreFilter={glow.centreFilter}
        accentColor={accentColor}
        pulse={pulse}
      />

     

      <AiAssistant
        onSend={handleSend}
        textboxShadow={glow.textboxShadow}
        inputGlow={inputGlow}
        onInputFocusChange={setInputFocused}
        onTyping={setIsTyping}
      />
    </main>
  );
}
