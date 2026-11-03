"use client";

import { FlickeringGrid } from "@/components/ui/FlickeringGrid";
import { useBackdrop, useMotionEnabled } from "@/lib/preferences";
import { cn } from "@/lib/utils";

export function SectionBackdrop({ className }: { className?: string }) {
  const backdrop = useBackdrop();
  const motion = useMotionEnabled();

  if (backdrop === "none") return null;

  return (
    <FlickeringGrid
      aria-hidden="true"
      paused={!motion}
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    />
  );
}
