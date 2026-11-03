"use client";

import { Activity, Grid3x3 } from "lucide-react";

import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { ColorThemePicker } from "@/components/ui/color-theme-picker";
import {
  setBackdrop,
  setMotionEnabled,
  useBackdrop,
  useMotionEnabled,
} from "@/lib/preferences";

export const segmentClasses =
  "inline-flex h-9 min-w-9 shrink-0 cursor-pointer items-center justify-center rounded-none px-3 text-xs font-medium whitespace-nowrap text-muted-foreground transition-[color,background-color,scale] duration-150 ease-out not-data-active:hover:bg-muted not-data-active:hover:text-foreground data-active:bg-foreground data-active:text-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring active:scale-[0.96]";

// icon toggles light up in the accent colour while their setting is on
const iconToggleClasses =
  "relative grid size-8 shrink-0 cursor-pointer place-items-center rounded-md text-muted-foreground transition-[color,background-color,scale] duration-150 ease-out hover:bg-muted aria-pressed:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring active:scale-[0.96]";

function Divider() {
  return <span aria-hidden="true" className="mx-0.5 h-4 w-px bg-border" />;
}

export function SettingsNav({
  id,
  open,
  ref,
}: {
  id: string;
  open: boolean;
  ref: React.Ref<HTMLDivElement>;
}) {
  const backdrop = useBackdrop();
  const motion = useMotionEnabled();

  const grid = backdrop === "grid";

  return (
    // the clip stops at the navbar's top edge, so the bar rises out of the navbar
    <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 [clip-path:inset(-100vmax_-100vmax_0_-100vmax)]">
      <div
        id={id}
        ref={ref}
        role="toolbar"
        aria-label="Display settings"
        data-open={open}
        inert={!open}
        className="pointer-events-auto mb-2 flex w-max origin-bottom items-center gap-1 rounded-full border border-border bg-background p-1 shadow-sm transition-[opacity,scale,translate,visibility] duration-[260ms] ease-(--ease-drawer) data-[open=false]:invisible data-[open=false]:translate-y-[calc(100%+0.5rem)] data-[open=false]:scale-[0.96] data-[open=false]:opacity-0 data-[open=false]:duration-[180ms] data-[open=false]:ease-(--ease-sp-out) motion-reduce:translate-y-0 motion-reduce:scale-100 [--ease-drawer:cubic-bezier(0.32,0.72,0,1)]"
      >
        <ThemeToggle className="grid size-8 shrink-0 cursor-pointer place-items-center rounded-full bg-muted text-muted-foreground transition-[color,scale] duration-150 ease-out hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring active:scale-[0.96]" />
        <Divider />
        <button
          type="button"
          aria-label="Background grid"
          aria-pressed={grid}
          onClick={() => setBackdrop(grid ? "none" : "grid")}
          title={grid ? "Background grid on" : "Background grid off"}
          className={iconToggleClasses}
        >
          <Grid3x3 aria-hidden="true" className="size-[15px]" />
        </button>
        <button
          type="button"
          aria-label="Animation"
          aria-pressed={motion}
          onClick={() => setMotionEnabled(!motion)}
          title={motion ? "Animation on" : "Animation off"}
          className={iconToggleClasses}
        >
          <Activity aria-hidden="true" className="size-[15px]" />
        </button>
        <Divider />
        <ColorThemePicker />
      </div>
    </div>
  );
}
