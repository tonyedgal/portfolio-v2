"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@space-man/react-theme-animation";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { ref, toggleTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      ref={ref}
      onClick={(event) => {
        void toggleTheme({
          element: event.currentTarget,
          animationOff: event.detail === 0,
        });
      }}
      className="relative mx-1 shrink-0 transition-none"
    >
      <Sun className="absolute h-[1.2rem] w-[1.2rem] rotate-45 scale-75 opacity-0 blur-[4px] transition-[opacity,transform,filter] duration-200 ease-[cubic-bezier(0.215,0.61,0.355,1)] motion-reduce:transition-none dark:rotate-0 dark:scale-100 dark:opacity-100 dark:blur-none" />
      <Moon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 opacity-100 blur-none transition-[opacity,transform,filter] duration-200 ease-[cubic-bezier(0.215,0.61,0.355,1)] motion-reduce:transition-none dark:-rotate-45 dark:scale-75 dark:opacity-0 dark:blur-[4px]" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
