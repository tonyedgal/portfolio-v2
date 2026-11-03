"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@space-man/react-theme-animation";

import { useMotionEnabled } from "@/lib/preferences";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { ref, toggleTheme } = useTheme();
  const motion = useMotionEnabled();

  return (
    <button
      type="button"
      ref={ref}
      onClick={(event) => {
        void toggleTheme({
          element: event.currentTarget,
          animationOff: event.detail === 0 || !motion,
        });
      }}
      className={cn("relative", className)}
    >
      <Sun className="absolute size-4 rotate-45 scale-25 opacity-0 blur-[4px] transition-[opacity,transform,filter] duration-200 ease-[cubic-bezier(0.215,0.61,0.355,1)] motion-reduce:transition-none dark:rotate-0 dark:scale-100 dark:opacity-100 dark:blur-none" />
      <Moon className="size-4 rotate-0 scale-100 opacity-100 blur-none transition-[opacity,transform,filter] duration-200 ease-[cubic-bezier(0.215,0.61,0.355,1)] motion-reduce:transition-none dark:-rotate-45 dark:scale-25 dark:opacity-0 dark:blur-[4px]" />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
