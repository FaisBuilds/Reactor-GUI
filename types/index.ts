export type GlowColor =
  | "default"
  | "blue"
  | "red"
  | "purple"
  | "orange"
  | "pink";

export type StoredGlowState = GlowColor | "off";

export interface ChatMessage {
  id: string;
  text: string;
  timestamp: number;
}

export interface GlowTheme {
  id: GlowColor;
  label: string;
  ringFilter: string;
  centreFilter: string;
  textboxShadow: string;
  accent: string;
  particle: string;
}
