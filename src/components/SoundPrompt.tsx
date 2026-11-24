"use client";

import { useTheme } from "@space-man/react-theme-animation";
import { Toaster as CardToaster, toast as card } from "@yusufceng1z/ding-react";
import { NotchToaster, toast as notch } from "notch-toast";
import { useEffect, useRef, useSyncExternalStore } from "react";

import { readToastStyle, setSoundEnabled, useToastStyle } from "@/lib/preferences";
import { playSwitch } from "@/lib/sounds";

const askId = "sound-ask";
const askMs = 8000;
const noticeMs = 8000;
const settingsHint = "Change it anytime with the settings button in the navbar.";
// each follow-up names what the visitor can still change from the settings bar
const soundOnHint = "Adjust the volume or turn it off anytime in settings.";
const soundOffHint = "Turn it back on anytime in settings.";
// the notch shows one line that phones cut short, so "sound is on" comes first and then the line
// slides to the settings hint
const notchSoundOnId = "sound-on";
const notchHintDelayMs = 2500;
const notchSoundHint = "Set volume or turn off in settings";
const notchSoundOff = "Sound is off. Turn it on in settings";

// the card takes only an image url, so the settings icon travels as an inline svg
const settingsIcon = `data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="-6 -6 36 36" fill="none" stroke="#8a8a8a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 17H5"/><path d="M19 7h-9"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/></svg>',
)}`;

const soundOff = () => document.documentElement.dataset.sound === "off";

// the card has room for a description, so it points at the settings button there; the notch fits
// only a title, so its follow-up says it in fewer words
const cardFollowUp = (on: boolean) => ({
  type: on ? ("success" as const) : ("info" as const),
  title: on ? "Sound is on" : "Sound is off",
  description: on ? soundOnHint : soundOffHint,
  image: settingsIcon,
  duration: noticeMs,
  action: null,
  secondary: null,
});

function turnOff() {
  playSwitch(false);
  setSoundEnabled(false);
}

// both styles say sound is on and carry the way to turn it off with the notice itself
function showSoundOn() {
  if (readToastStyle() === "card") {
    // an open card turns into the new one in place, so the ask becomes this notice
    card.success("Sound is on", {
      description: soundOnHint,
      image: settingsIcon,
      duration: noticeMs,
      action: {
        label: "Turn off",
        onClick: () => {
          turnOff();
          return cardFollowUp(false);
        },
      },
    });
    return;
  }

  notch.success("Sound is on", {
    id: notchSoundOnId,
    duration: noticeMs,
    action: {
      label: "Turn off",
      onClick: () => {
        turnOff();
        notch.info(notchSoundOff, { duration: noticeMs });
      },
    },
  });
  // an update only reaches a notch that is still open, so a closed or replaced one stays gone
  window.setTimeout(() => {
    if (soundOff()) return;
    // the hint needs the whole width, so the Turn off button gives way to it
    notch.update(notchSoundOnId, { title: notchSoundHint, duration: noticeMs, action: undefined });
  }, notchHintDelayMs);
}

// browsers block sound on every new page load until a click, and a scroll never counts, so each full
// load asks again; route changes keep this module alive, so they do not
let asked = false;
let answered = false;

function turnOn() {
  answered = true;
  setSoundEnabled(true);
  playSwitch(true);
  showSoundOn();
}

function ask() {
  if (readToastStyle() === "card") {
    card.info("Turn on sound?", {
      id: askId,
      description: "Small clicks as you scroll.",
      action: {
        label: "Enable",
        onClick: () => {
          answered = true;
          setSoundEnabled(true);
          playSwitch(true);
          return cardFollowUp(true);
        },
      },
      secondary: {
        label: "Disable",
        onClick: () => {
          answered = true;
          setSoundEnabled(false);
          return cardFollowUp(false);
        },
      },
    });
    return;
  }

  notch.info("Turn on sound?", {
    id: askId,
    duration: askMs,
    dismissible: true,
    action: { label: "Enable", onClick: turnOn },
  });
}

// shown when the visitor picks the other style, so the choice has an immediate example
function showStyle() {
  if (readToastStyle() === "card") {
    card.info("Notifications use cards", { description: settingsHint, image: settingsIcon, duration: noticeMs });
  } else {
    notch.info("Notifications use the notch", { duration: noticeMs });
  }
}

// the card takes its position as a prop, so the breakpoint is read here; lg matches the navbar's own switch
const wideQuery = "(min-width: 64rem)";
const subscribeWide = (onChange: () => void) => {
  const query = window.matchMedia(wideQuery);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};
const isWide = () => window.matchMedia(wideQuery).matches;

export function SoundPrompt() {
  const style = useToastStyle();
  const wide = useSyncExternalStore(subscribeWide, isWide, () => true);
  // the card follows the theme chosen on the site, which can differ from the system setting
  const { resolvedTheme } = useTheme();
  const shownStyle = useRef(style);

  // runs after the toaster below has mounted, since a child's effects run before its parent's
  useEffect(() => {
    if (!style) return;
    if (!asked) {
      asked = true;
      ask();
    } else if (shownStyle.current && shownStyle.current !== style) {
      showStyle();
    }
    shownStyle.current = style;
  }, [style]);

  useEffect(() => {
    if (answered) return;

    // the first tap, click, or key press is the gesture that lets the browser play sound, so unless
    // the visitor turned sound off before, it switches sound on and says how to turn it off
    // a mouse press grants that permission on pointerdown, a finger only on pointerup
    const events = ["pointerdown", "pointerup", "keydown"] as const;
    const stop = () => events.forEach((type) => window.removeEventListener(type, onGesture, true));
    function onGesture(event: Event) {
      if (answered) return stop();
      if (navigator.userActivation && !navigator.userActivation.isActive) return;
      // using the notification itself, or Escape to close it, answers the question rather than starting sound
      if (event instanceof KeyboardEvent && event.key === "Escape") return;
      if (event.target instanceof Element && event.target.closest(".nt-root, .tst-viewport")) return;

      stop();
      if (soundOff()) {
        answered = true;
        return;
      }
      turnOn();
    }
    events.forEach((type) => window.addEventListener(type, onGesture, { capture: true, passive: true }));

    return stop;
  }, []);

  if (style === "card") {
    return <CardToaster position={wide ? "top-center" : "bottom-center"} theme={resolvedTheme} />;
  }
  // top centre on every width keeps the notch clear of the navbar, which sits at the bottom on phones
  if (style === "notch") return <NotchToaster position="top-center" mode="attached" />;
  return null;
}
