"use client";

import { Plus, Send } from "lucide-react";
import {
  memo,
  useCallback,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { Button } from "@/components/ui/button";
import { useAutoResize } from "@/hooks/use-auto-resize";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSend: (text: string) => void;
  textboxShadow: string;
  showGlow: boolean;
  onFocusChange?: (focused: boolean) => void;
  onTyping?: (typing: boolean) => void;
}

function ChatInputComponent({
  onSend,
  textboxShadow,
  showGlow,
  onFocusChange,
  onTyping,
}: ChatInputProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const isEmpty = value.trim() === "";

  useAutoResize(editorRef, value);

  const handleInput = useCallback(() => {
    const text = editorRef.current?.textContent ?? "";
    setValue(text);
    onTyping?.(text.length > 0);
  }, [onTyping]);

  const clear = useCallback(() => {
    if (editorRef.current) {
      editorRef.current.textContent = "";
      editorRef.current.style.height = "30px";
    }
    setValue("");
    onTyping?.(false);
  }, [onTyping]);

  const submit = useCallback(() => {
    const text = value.trim();
    if (!text) return;
    onSend(text);
    clear();
  }, [value, onSend, clear]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        submit();
      }
    },
    [submit],
  );

  const borderColor = "rgba(82,82,91,0.8)";

  const focusGlow = textboxShadow;
  const idleGlow = showGlow ? textboxShadow : "none";

  const boxShadow = focused ? focusGlow : idleGlow;

  return (
    <div className="relative flex w-full items-end">
      <Button
        type="button"
        variant="icon"
        className="absolute left-1.5 top-1/2 z-10 -translate-y-1/2 text-zinc-400"
        aria-label="Add attachment"
      >
        <Plus className="h-5 w-5" />
      </Button>

      <div
        ref={editorRef}
        role="textbox"
        contentEditable
        suppressContentEditableWarning
        data-placeholder="Type something..."
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        onFocus={() => {
          setFocused(true);
          onFocusChange?.(true);
        }}
        onBlur={() => {
          setFocused(false);
          onFocusChange?.(false);
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={cn(
          "chat-editor relative z-[1] min-h-[30px] w-full max-h-[200px] overflow-x-hidden rounded-[30px]",
          "border-2 bg-zinc-800/60 py-[18px] pl-11 pr-14 text-left text-lg leading-snug text-white",
          "outline-none backdrop-blur-xl transition-[box-shadow,border-color] duration-300",
          isEmpty && "is-empty",
        )}
        style={{
          borderColor,
          boxShadow,
        }}
      />

      <Button
        type="button"
        variant="icon"
        className="absolute right-1.5 top-1/2 z-10 -translate-y-1/2"
        onClick={submit}
        disabled={isEmpty}
        aria-label="Send message"
      >
        <Send className="h-5 w-5" />
      </Button>
    </div>
  );
}

export const ChatInput = memo(ChatInputComponent);