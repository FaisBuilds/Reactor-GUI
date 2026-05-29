"use client";

import { memo } from "react";
import { ChatInput } from "@/components/assistant/chat-input";
import { MessageOutput } from "@/components/assistant/message-output";
import type { ChatMessage } from "@/types";

interface AiAssistantProps {
  messages: ChatMessage[];
  onSend: (text: string) => void;
  onCloseMessage: (id: string) => void;
  textboxShadow: string;
  inputGlow: boolean;
  onInputFocusChange: (focused: boolean) => void;
  onTyping: (typing: boolean) => void;
}

function AiAssistantComponent({
  messages,
  onSend,
  onCloseMessage,
  textboxShadow,
  inputGlow,
  onInputFocusChange,
  onTyping,
}: AiAssistantProps) {
  return (
    <section
      className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] left-1/2 z-30 w-[min(94vw,700px)] -translate-x-1/2 px-2"
      aria-label="AI assistant"
    >
      <MessageOutput messages={messages} onClose={onCloseMessage} />
      <ChatInput
        onSend={onSend}
        textboxShadow={textboxShadow}
        showGlow={inputGlow}
        onFocusChange={onInputFocusChange}
        onTyping={onTyping}
      />
    </section>
  );
}

export const AiAssistant = memo(AiAssistantComponent);
