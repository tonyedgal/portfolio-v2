"use client";

import { NotchToaster, toast } from "notch-toast";
import { useEffect } from "react";

import { setSoundEnabled } from "@/lib/preferences";
import { playSwitch } from "@/lib/sounds";

const askId = "sound-ask";
const askMs = 8000;
const noticeMs = 8000;

const soundOff = () => document.documentElement.dataset.sound === "off";

// the notch has room for one button, so the way to turn sound off travels with the notice itself
function showSoundOn() {
  toast.success("Sound is on", {
    duration: noticeMs,
    action: {
      label: "Turn off",
      onClick: () => {
        playSwitch(false);
        setSoundEnabled(false);
        toast.info("Sound is off. Turn it on in settings", { duration: noticeMs });
      },
    },
  });
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

export function SoundPrompt() {
  useEffect(() => {
    if (!asked) {
      asked = true;
      toast.info("Turn on sound?", {
        id: askId,
        duration: askMs,
        dismissible: true,
        action: { label: "Enable", onClick: turnOn },
      });
    }
    if (answered) return;

    // the first tap, click, or key press is the gesture that lets the browser play sound, so unless
    // the visitor turned sound off before, it switches sound on and says how to turn it off
    // a mouse press grants that permission on pointerdown, a finger only on pointerup
    const events = ["pointerdown", "pointerup", "keydown"] as const;
    const stop = () => events.forEach((type) => window.removeEventListener(type, onGesture, true));
    function onGesture(event: Event) {
      if (answered) return stop();
      if (navigator.userActivation && !navigator.userActivation.isActive) return;
      // using the notch itself, or Escape to close it, answers the question rather than starting sound
      if (event instanceof KeyboardEvent && event.key === "Escape") return;
      if (event.target instanceof Element && event.target.closest(".nt-root")) return;

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

  // top centre on every width keeps the notch clear of the navbar, which sits at the bottom on phones
  return <NotchToaster position="top-center" mode="attached" />;
}
