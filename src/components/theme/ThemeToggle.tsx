"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import type { MouseEvent } from "react";

import { Button } from "@/components/ui/button";
import {
  ThemeAnimationType,
  useThemeAnimation,
} from "@space-man/react-theme-animation";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const { ref, toggleTheme } = useThemeAnimation({
    theme: resolvedTheme === "dark" ? "dark" : "light",
    onThemeChange: setTheme,
    duration: 250,
    animationType: ThemeAnimationType.CIRCLE,
  });

  const handleToggle = (event: MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const scale = window.devicePixelRatio;

    ref.current = {
      getBoundingClientRect: () =>
        DOMRect.fromRect({
          x: rect.x * scale,
          y: rect.y * scale,
          width: rect.width * scale,
          height: rect.height * scale,
        }),
    } as HTMLButtonElement;

    const animation = toggleTheme();
    ref.current = button;
    void animation;
  };

  return (
    <Button
      variant="outline"
      size="icon"
      ref={ref}
      onClick={handleToggle}
      className="relative mx-1 shrink-0"
    >
      <Sun className="absolute h-[1.2rem] w-[1.2rem] rotate-45 scale-75 opacity-0 blur-[4px] transition-[opacity,transform,filter] duration-200 ease-[cubic-bezier(0.215,0.61,0.355,1)] motion-reduce:transition-none dark:rotate-0 dark:scale-100 dark:opacity-100 dark:blur-none" />
      <Moon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 opacity-100 blur-none transition-[opacity,transform,filter] duration-200 ease-[cubic-bezier(0.215,0.61,0.355,1)] motion-reduce:transition-none dark:-rotate-45 dark:scale-75 dark:opacity-0 dark:blur-[4px]" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
