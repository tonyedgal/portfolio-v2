"use client";

import { useEffect } from "react";

import { startScrollSound } from "@/lib/sounds";

export function ScrollSound() {
  useEffect(() => startScrollSound(), []);

  return null;
}
