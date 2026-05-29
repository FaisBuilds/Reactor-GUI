"use client";

import { useCallback, useEffect, useState } from "react";
import { getGlowTheme, STORAGE_KEY } from "@/lib/glow-colors";
import type { GlowColor, StoredGlowState } from "@/types";

function readStoredState(): StoredGlowState | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(STORAGE_KEY);
  if (
    raw === "off" ||
    raw === "default" ||
    raw === "blue" ||
    raw === "red" ||
    raw === "purple" ||
    raw === "orange" ||
    raw === "pink"
  ) {
    return raw;
  }
  return null;
}

export function useGlowColor() {
  const [isOff, setIsOff] = useState(false);
  const [activeColor, setActiveColor] = useState<GlowColor>("default");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = readStoredState();
    if (stored === "off") {
      setIsOff(true);
    } else if (stored) {
      setActiveColor(stored);
    }
    setHydrated(true);
  }, []);

  const setColor = useCallback((color: GlowColor) => {
    setIsOff(false);
    setActiveColor(color);
    localStorage.setItem(STORAGE_KEY, color);
  }, []);

  const turnOff = useCallback(() => {
    setIsOff(true);
    localStorage.setItem(STORAGE_KEY, "off");
  }, []);

  const restoreFromStorage = useCallback(() => {
    const stored = readStoredState();
    if (stored === "off") {
      setIsOff(true);
    } else if (stored) {
      setIsOff(false);
      setActiveColor(stored);
    } else {
      setIsOff(false);
      setActiveColor("default");
    }
  }, []);

  const theme = getGlowTheme(activeColor);

  const ringFilter = isOff ? "none" : theme.ringFilter;
  const centreFilter = isOff ? "none" : theme.centreFilter;

  const textboxShadow = isOff ? "none" : theme.textboxShadow;

  return {
    hydrated,
    isOff,
    activeColor,
    theme,
    ringFilter,
    centreFilter,
    textboxShadow,
    setColor,
    turnOff,
    restoreFromStorage,
  };
}
