"use client";

import { useCallback, useEffect, type RefObject } from "react";

const MAX_HEIGHT = 200;
const MIN_HEIGHT = 30;

export function useAutoResize(
  ref: RefObject<HTMLElement | null>,
  value: string,
) {
  const adjust = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    const next = Math.min(Math.max(el.scrollHeight, MIN_HEIGHT), MAX_HEIGHT);
    el.style.height = `${next}px`;
    el.style.overflowY = el.scrollHeight > MAX_HEIGHT ? "auto" : "hidden";
  }, [ref]);

  useEffect(() => {
    adjust();
  }, [value, adjust]);

  return adjust;
}
