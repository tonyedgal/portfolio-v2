"use client";

import { useTheme } from "@space-man/react-theme-animation";
import { Toaster, toast } from "@yusufceng1z/ding-react";
import { useEffect, useSyncExternalStore } from "react";

import { setSoundEnabled } from "@/lib/preferences";
import { playSwitch } from "@/lib/sounds";

const followUpMs = 4000;
// the toast takes only an image url, so the settings icon travels as an inline svg
const settingsIcon = `data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="-6 -6 36 36" fill="none" stroke="#8a8a8a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 17H5"/><path d="M19 7h-9"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/></svg>',
)}`;

const followUp = (title: string) => ({
  type: "info" as const,
  title,
  description: "Change it anytime with the settings button in the navbar.",
  image: settingsIcon,
  duration: followUpMs,
});

// browsers block sound on every new page load until a click, and a scroll never counts, so each full
// load asks again; route changes keep this module alive, so they do not
let asked = false;

// the toast takes its position as a prop, so the breakpoint is read here; lg matches the navbar's own switch
const wideQuery = "(min-width: 64rem)";
const subscribe = (onChange: () => void) => {
  const query = window.matchMedia(wideQuery);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};
const isWide = () => window.matchMedia(wideQuery).matches;

export function SoundPrompt() {
  const wide = useSyncExternalStore(subscribe, isWide, () => true);
  // follow the theme chosen on the site, which can differ from the system setting
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (asked) return;
    asked = true;

    toast.info("Turn on sound?", {
      description: "Small clicks as you scroll.",
      action: {
        label: "Enable",
        onClick: () => {
          setSoundEnabled(true);
          playSwitch(true);
          return followUp("Sound is on");
        },
      },
      secondary: {
        label: "Disable",
        onClick: () => {
          setSoundEnabled(false);
          return followUp("Sound is off");
        },
      },
    });
  }, []);

  return <Toaster position={wide ? "top-center" : "bottom-center"} theme={resolvedTheme} />;
}
