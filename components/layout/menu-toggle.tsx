"use client";

import { Menu } from "lucide-react";
import { memo } from "react";
import { Button } from "@/components/ui/button";

interface MenuToggleProps {
  onClick: () => void;
}

function MenuToggleComponent({ onClick }: MenuToggleProps) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className="fixed left-4 top-4 z-[1001] h-11 w-11 border border-white/10 bg-black/40 text-white backdrop-blur-md hover:bg-white/10"
      onClick={onClick}
      aria-label="Toggle menu"
      aria-expanded={false}
    >
      <Menu className="h-6 w-6" />
    </Button>
  );
}

export const MenuToggle = memo(MenuToggleComponent);
