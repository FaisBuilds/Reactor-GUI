"use client";

import { useEffect, useState } from "react";

/** Subtle reactive pulse while the user types (sound-reactive feel without audio). */
export function useTypingPulse(isTyping: boolean, debounceMs = 120) {
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    if (!isTyping) {
      setPulse(0);
      return;
    }

    const id = window.setInterval(() => {
      setPulse((p) => (p + 1) % 100);
    }, debounceMs);

    return () => window.clearInterval(id);
  }, [isTyping, debounceMs]);

  return pulse;
}
