import type { GlowColor } from "@/types";

export type CommandResult =
  | { type: "set-color"; color: GlowColor }
  | { type: "turn-off" }
  | { type: "none" };

const COLOR_PHRASES: { phrase: string; color: GlowColor }[] = [
  { phrase: "change color to blue", color: "blue" },
  { phrase: "change color to red", color: "red" },
  { phrase: "change color to purple", color: "purple" },
  { phrase: "change color to orange", color: "orange" },
  { phrase: "change color to pink", color: "pink" },
];

export function parseCommand(message: string): CommandResult {
  const normalized = message.trim().toLowerCase();

  for (const { phrase, color } of COLOR_PHRASES) {
    if (normalized.includes(phrase)) {
      return { type: "set-color", color };
    }
  }

  if (normalized.includes("turn off the lights")) {
    return { type: "turn-off" };
  }

  return { type: "none" };
}

export const VOICE_COMMAND_HINTS = [
  "change color to blue",
  "change color to red",
  "change color to purple",
  "change color to orange",
  "change color to pink",
  "turn off the lights",
] as const;
