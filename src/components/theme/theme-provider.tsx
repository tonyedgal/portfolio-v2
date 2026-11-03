"use client";

import { ThemeProvider as SpacemanThemeProvider } from "@space-man/react-theme-animation";
import { usePathname } from "next/navigation";

import { colorThemes } from "@/lib/color-themes";
import { sectionForPath } from "@/lib/portfolio-sections";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const palette = sectionForPath(usePathname()).palette;

  return (
    <SpacemanThemeProvider
      defaultTheme="dark"
      colorThemes={colorThemes}
      defaultColorTheme="default"
      duration={250}
    >
      <div className="contents" data-portfolio-theme={palette}>
        {children}
      </div>
    </SpacemanThemeProvider>
  );
}
