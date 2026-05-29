import type { GlowColor, GlowTheme } from "@/types";

const dropShadow = (hex: string) =>
  `drop-shadow(0 0 0.5rem ${hex}) drop-shadow(0 0 2rem ${hex}) drop-shadow(0 0 4rem ${hex})`;

export const GLOW_THEMES: Record<GlowColor, GlowTheme> = {
  default: {
    id: "default",
    label: "Default",
    ringFilter: dropShadow("#000080"),
    centreFilter: dropShadow("#000080"),
    textboxShadow: "0 0 15px rgba(0, 0, 128, 0.7)",
    accent: "#4d6bff",
    particle: "rgba(77, 107, 255, 0.6)",
  },
  blue: {
    id: "blue",
    label: "Blue",
    ringFilter: dropShadow("#008CFF"),
    centreFilter: dropShadow("#008CFF"),
    textboxShadow: "0 0 15px rgba(0, 140, 255, 0.7)",
    accent: "#008CFF",
    particle: "rgba(0, 140, 255, 0.55)",
  },
  red: {
    id: "red",
    label: "Red",
    ringFilter: dropShadow("#FF0000"),
    centreFilter: dropShadow("#FF0000"),
    textboxShadow: "0 0 15px rgba(255, 0, 0, 0.7)",
    accent: "#FF0000",
    particle: "rgba(255, 0, 0, 0.55)",
  },
  purple: {
    id: "purple",
    label: "Purple",
    ringFilter: dropShadow("#800080"),
    centreFilter: dropShadow("#800080"),
    textboxShadow: "0 0 15px rgba(128, 0, 128, 0.7)",
    accent: "#b366ff",
    particle: "rgba(128, 0, 128, 0.55)",
  },
  orange: {
    id: "orange",
    label: "Orange",
    ringFilter: dropShadow("#FFA500"),
    centreFilter: dropShadow("#FFA500"),
    textboxShadow: "0 0 15px rgba(255, 165, 0, 0.7)",
    accent: "#FFA500",
    particle: "rgba(255, 165, 0, 0.55)",
  },
  pink: {
    id: "pink",
    label: "Pink",
    ringFilter: dropShadow("#FF1493"),
    centreFilter: dropShadow("#FF1493"),
    textboxShadow: "0 0 15px rgba(255, 105, 180, 0.7)",
    accent: "#FF1493",
    particle: "rgba(255, 105, 180, 0.55)",
  },
};

export const STORAGE_KEY = "lastColor";

export function getGlowTheme(color: GlowColor): GlowTheme {
  return GLOW_THEMES[color];
}
