"use client";

import { useSyncExternalStore } from "react";

export const backdrops = ["grid", "none"] as const;

export type Backdrop = (typeof backdrops)[number];

const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}

function save(key: string, value: string) {
  try {
    localStorage.setItem(`portfolio-${key}`, value);
  } catch {}

  listeners.forEach((listener) => listener());
}

const motionSnapshot = () => document.documentElement.dataset.motion !== "reduced";

export function useMotionEnabled() {
  return useSyncExternalStore(subscribe, motionSnapshot, () => true);
}

export function setMotionEnabled(enabled: boolean) {
  const root = document.documentElement;

  if (enabled) delete root.dataset.motion;
  else root.dataset.motion = "reduced";
  save("motion", enabled ? "full" : "reduced");
}

const backdropSnapshot = (): Backdrop =>
  document.documentElement.dataset.backdrop === "none" ? "none" : "grid";

export function useBackdrop() {
  return useSyncExternalStore(subscribe, backdropSnapshot, () => "grid" as Backdrop);
}

export function setBackdrop(backdrop: Backdrop) {
  document.documentElement.dataset.backdrop = backdrop;
  save("backdrop", backdrop);
}

export const navStyles = ["tabs", "classic"] as const;

export type NavStyle = (typeof navStyles)[number];

const navStyleSnapshot = (): NavStyle =>
  document.documentElement.dataset.nav === "classic" ? "classic" : "tabs";

export function useNavStyle() {
  return useSyncExternalStore(subscribe, navStyleSnapshot, () => "tabs" as NavStyle);
}

export function setNavStyle(style: NavStyle) {
  document.documentElement.dataset.nav = style;
  save("nav", style);
}

// how notifications look: the notch attached to the top edge, or the earlier floating card
export const toastStyles = ["notch", "card"] as const;

export type ToastStyle = (typeof toastStyles)[number];

let toastStyleCache: ToastStyle | undefined;

// read from storage on demand rather than before paint, because nothing shows until the first toast
export function readToastStyle(): ToastStyle {
  if (toastStyleCache) return toastStyleCache;
  try {
    toastStyleCache = localStorage.getItem("portfolio-toast") === "card" ? "card" : "notch";
  } catch {
    toastStyleCache = "notch";
  }
  return toastStyleCache;
}

// null on the server and during hydration, so a toaster mounts only once the saved choice is known
export function useToastStyle() {
  return useSyncExternalStore(subscribe, readToastStyle, () => null);
}

export function setToastStyle(style: ToastStyle) {
  toastStyleCache = style;
  save("toast", style);
}

const soundSnapshot = () => document.documentElement.dataset.sound !== "off";

export function useSoundEnabled() {
  return useSyncExternalStore(subscribe, soundSnapshot, () => true);
}

export function setSoundEnabled(enabled: boolean) {
  const root = document.documentElement;

  if (enabled) delete root.dataset.sound;
  else root.dataset.sound = "off";
  save("sound", enabled ? "on" : "off");
}
