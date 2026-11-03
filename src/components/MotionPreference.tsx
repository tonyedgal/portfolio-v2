"use client";

import { MotionConfig } from "motion/react";

import { useMotionEnabled } from "@/lib/preferences";

export function MotionPreference({ children }: { children: React.ReactNode }) {
  const motion = useMotionEnabled();

  return <MotionConfig reducedMotion={motion ? "user" : "always"}>{children}</MotionConfig>;
}
