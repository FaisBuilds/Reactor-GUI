# MARK 5 — Arc Reactor GUI

A premium, modernized **Arc Reactor** holographic interface — evolved from the original Jarvis desktop assistant prototype. Built for future AI integrations while preserving the interactive reactor core experience.

## Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **shadcn/ui** patterns (Button, CVA, Radix Slot)
- **Framer Motion** (reactor, sidebar, messages, particles)
- **Lucide React** icons

## Features

- Layered Arc Reactor visuals with dynamic glow filters
- Voice-style text commands:
  - `change color to blue|red|purple|orange|pink`
  - `turn off the lights`
- Reactor hides during non-command chat (original behavior)
- Persistent glow state via `localStorage`
- Slide-out sidebar (New Chat, Search, Settings, Chats)
- Auto-expanding glassmorphic chat input with color-synced glow
- Holographic grid + particle field with typing-reactive pulse
- Mobile-friendly layout and safe-area spacing

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
app/                 # Next.js routes & global styles
components/
  arc-reactor/       # Reactor visuals
  assistant/         # Chat UI
  layout/            # Background, menu
  sidebar/           # Navigation drawer
  ui/                # shadcn-style primitives
hooks/               # Glow, resize, typing pulse
lib/                 # Commands, themes, utils
types/               # Shared TypeScript types
public/              # arc.png, ring.png, centre.png
legacy/              # Original HTML/CSS/JS (reference)
```

## Legacy

The original static implementation is preserved in [`legacy/`](legacy/) for reference.

## License

Personal project — use and extend as you like.
