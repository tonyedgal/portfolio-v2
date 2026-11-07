"use client";

import { scroll001Sound } from "@/lib/scroll-001";
import { select008Sound } from "@/lib/select-008";
import { decodeAudioData, getAudioContext, playSound } from "@/lib/sound-engine";
import { switchOffSound } from "@/lib/switch-off";
import { switchOnSound } from "@/lib/switch-on";

const soundOn = () =>
  typeof document !== "undefined" && document.documentElement.dataset.sound !== "off";

export function playSwitch(on: boolean) {
  if (!soundOn()) return;
  playSound((on ? switchOnSound : switchOffSound).dataUri, { volume: 0.4 }).catch(() => {});
}

// for choices between options, where on and off do not apply
export function playSelect() {
  if (!soundOn()) return;
  playSound(select008Sound.dataUri, { volume: 0.4 }).catch(() => {});
}

// the sample is a ratchet with one click about every 50ms, so at rate 1 it clicks 20 times a second;
// the side rule has a tick every 8px, so 160px/s of scroll passes one tick per click
const tickSpacing = 8;
const clicksPerSecond = 20;
const volume = 0.12;

// one looping source for the whole page; scroll speed sets its rate and a short fade starts and stops it
export function startScrollSound() {
  let source: AudioBufferSourceNode | null = null;
  let gain: GainNode | null = null;
  let lastY = window.scrollY;
  let lastTime = performance.now();
  let stopTimer = 0;

  async function ensureSource() {
    const ctx = getAudioContext();
    // a wheel is not a user gesture, so the context stays silent until the first click or key press
    if (ctx.state === "suspended") await ctx.resume().catch(() => {});
    if (ctx.state !== "running" || source) return;

    const buffer = await decodeAudioData(scroll001Sound.dataUri);
    if (source) return;
    gain = ctx.createGain();
    gain.gain.value = 0;
    gain.connect(ctx.destination);
    source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;
    source.connect(gain);
    source.start();
  }

  function onScroll() {
    const now = performance.now();
    const elapsed = Math.max(now - lastTime, 1);
    const speed = (Math.abs(window.scrollY - lastY) / elapsed) * 1000;
    lastY = window.scrollY;
    lastTime = now;

    if (!soundOn() || speed === 0) return;
    void ensureSource();
    if (!source || !gain) return;

    const ctx = getAudioContext();
    const rate = Math.min(Math.max(speed / (tickSpacing * clicksPerSecond), 0.5), 3);
    source.playbackRate.setTargetAtTime(rate, ctx.currentTime, 0.03);
    gain.gain.setTargetAtTime(volume, ctx.currentTime, 0.02);

    window.clearTimeout(stopTimer);
    stopTimer = window.setTimeout(() => {
      gain?.gain.setTargetAtTime(0, getAudioContext().currentTime, 0.04);
    }, 90);
  }

  // browsers start audio only from inside a tap, click, or key press; a scroll never counts. Safari also
  // forgets the permission once the handler ends, so the context is started here, not on the next scroll
  const unlockEvents = ["pointerdown", "keydown", "touchend"] as const;
  function unlock() {
    // the end of a swipe is not a tap, so the browser would refuse it anyway
    if (navigator.userActivation && !navigator.userActivation.isActive) return;
    const ctx = getAudioContext();
    if (ctx.state === "running") return removeUnlock();
    ctx.resume().then(removeUnlock, () => {});
    // iOS Safari stays silent until a source starts inside the gesture, so play one silent sample
    const silent = ctx.createBufferSource();
    silent.buffer = ctx.createBuffer(1, 1, ctx.sampleRate);
    silent.connect(ctx.destination);
    silent.start();
  }
  function removeUnlock() {
    unlockEvents.forEach((type) => window.removeEventListener(type, unlock, true));
  }
  unlockEvents.forEach((type) => window.addEventListener(type, unlock, { capture: true, passive: true }));

  window.addEventListener("scroll", onScroll, { passive: true });

  return () => {
    removeUnlock();
    window.removeEventListener("scroll", onScroll);
    window.clearTimeout(stopTimer);
    source?.stop();
    source?.disconnect();
    gain?.disconnect();
  };
}
