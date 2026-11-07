"use client";

import {
  Activity,
  Grid3x3,
  PanelBottom,
  RectangleEllipsis,
  Volume2,
  VolumeOff,
} from "lucide-react";
import { useState } from "react";

import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { ColorThemePicker } from "@/components/ui/color-theme-picker";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/global-tooltip";
import {
  setBackdrop,
  setMotionEnabled,
  setNavStyle,
  setSoundEnabled,
  useBackdrop,
  useMotionEnabled,
  useNavStyle,
  useSoundEnabled,
} from "@/lib/preferences";
import { playSelect, playSwitch } from "@/lib/sounds";

export const segmentClasses =
  "inline-flex h-9 min-w-9 shrink-0 cursor-pointer items-center justify-center rounded-none px-3 text-xs font-medium whitespace-nowrap text-muted-foreground transition-[color,background-color,scale] duration-150 ease-out not-data-active:hover:bg-muted not-data-active:hover:text-foreground data-active:bg-foreground data-active:text-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring active:scale-[0.96]";

// icon toggles light up in the accent colour while their setting is on
const iconToggleClasses =
  "relative grid size-8 shrink-0 cursor-pointer place-items-center rounded-md text-muted-foreground transition-[color,background-color,scale] duration-150 ease-out hover:bg-muted aria-pressed:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring active:scale-[0.96]";

function Divider() {
  return <span aria-hidden="true" className="mx-0.5 h-4 w-px bg-border" />;
}

// the wrapper takes the pointer and focus events, so any control can carry a hint
function Hint({ label, children }: { label: React.ReactNode; children: React.ReactNode }) {
  return (
    <Tooltip side="top" sideOffset={12}>
      <TooltipTrigger>
        <span className="inline-flex">{children}</span>
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
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
  const navStyle = useNavStyle();
  const sound = useSoundEnabled();
  const [pickerOpen, setPickerOpen] = useState(false);
  const grid = backdrop === "grid";
  const tabs = navStyle === "tabs";

  return (
    // the clip stops at the navbar's top edge, so the bar rises out of the navbar
    <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 [clip-path:inset(-100vmax_-100vmax_0_-100vmax)]">
      <div
        id={id}
        ref={ref}
        role="toolbar"
        aria-label="Display settings"
        data-open={open}
        // on a first visit the page marks the root before paint, so the bar shows before this code runs
        inert={!open}
        className="pointer-events-auto mb-2 flex w-max origin-bottom items-center gap-1 rounded-full border border-border bg-background p-1 shadow-sm transition-[opacity,scale,translate,visibility] duration-[260ms] ease-(--ease-drawer) data-[open=false]:invisible data-[open=false]:translate-y-[calc(100%+0.5rem)] data-[open=false]:scale-[0.96] data-[open=false]:opacity-0 data-[open=false]:duration-[180ms] data-[open=false]:ease-(--ease-sp-out) motion-reduce:translate-y-0 motion-reduce:scale-100 in-data-reveal:visible! in-data-reveal:translate-y-0! in-data-reveal:scale-100! in-data-reveal:opacity-100! [--ease-drawer:cubic-bezier(0.32,0.72,0,1)]"
      >
        <Hint label={<><span className="dark:hidden">Switch to dark mode</span><span className="hidden dark:inline">Switch to light mode</span></>}>
          {/* light is the "on" side, so going dark plays the off sound */}
          <span
            className="inline-flex"
            onClickCapture={() => playSwitch(document.documentElement.classList.contains("dark"))}
          >
            <ThemeToggle className="grid size-8 shrink-0 cursor-pointer place-items-center rounded-full bg-muted text-muted-foreground transition-[color,scale] duration-150 ease-out hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring active:scale-[0.96]" />
          </span>
        </Hint>
        <Divider />
        <Hint label={grid ? "Hide background grid" : "Show background grid"}>
          <button
            type="button"
            aria-label="Background grid"
            aria-pressed={grid}
            onClick={() => {
              playSwitch(!grid);
              setBackdrop(grid ? "none" : "grid");
            }}
            className={iconToggleClasses}
          >
            <Grid3x3 aria-hidden="true" className="size-[15px]" />
          </button>
        </Hint>
        <Hint label={motion ? "Turn off animation" : "Turn on animation"}>
          <button
            type="button"
            aria-label="Animation"
            aria-pressed={motion}
            onClick={() => {
              playSwitch(!motion);
              setMotionEnabled(!motion);
            }}
            className={iconToggleClasses}
          >
            <Activity aria-hidden="true" className="size-[15px]" />
          </button>
        </Hint>
        <Hint label={sound ? "Turn off sound" : "Turn on sound"}>
          <button
            type="button"
            aria-label="Sound"
            aria-pressed={sound}
            onClick={() => {
              // the off click plays before the setting mutes it, and the on click after it unmutes
              if (sound) playSwitch(false);
              setSoundEnabled(!sound);
              if (!sound) playSwitch(true);
            }}
            className={iconToggleClasses}
          >
            {sound ? (
              <Volume2 aria-hidden="true" className="size-[15px]" />
            ) : (
              <VolumeOff aria-hidden="true" className="size-[15px]" />
            )}
          </button>
        </Hint>
        <Hint label={tabs ? "Switch to text tabs" : "Switch to icon tabs"}>
          <button
            type="button"
            aria-label={tabs ? "Navbar style: icon tabs" : "Navbar style: text tabs"}
            onClick={() => {
              playSelect();
              setNavStyle(tabs ? "classic" : "tabs");
            }}
            className={iconToggleClasses}
          >
            {tabs ? (
              <RectangleEllipsis aria-hidden="true" className="size-[15px]" />
            ) : (
              <PanelBottom aria-hidden="true" className="size-[15px]" />
            )}
          </button>
        </Hint>
        <Divider />
        {/* the swatch row opens where the hint would sit, so the hint steps aside while it shows */}
        <Hint label={pickerOpen ? null : "Accent colour"}>
          <ColorThemePicker onOpenChange={setPickerOpen} />
        </Hint>
      </div>
    </div>
  );
}
