"use client";

import { usePathname } from "next/navigation";
import { createContext, use, useCallback, useState } from "react";

export const sidebarMs = 360;

type SidebarContextValue = {
  collapsed: boolean;
  toggle: () => void;
  focus: () => Promise<void>;
  release: () => void;
};

const SidebarContext = createContext<SidebarContextValue | null>(null);

// articles and project details read better with the whole width
const isDetailRoute = (pathname: string) =>
  /^\/(blog|projects)\/[^/]+/.test(pathname);

const wideScreen = () => window.matchMedia("(min-width: 64rem)").matches;

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // both choices belong to the page they were made on and reset on navigation
  const [manual, setManual] = useState<{ path: string; collapsed: boolean } | null>(null);
  const [focusPath, setFocusPath] = useState<string | null>(null);

  const automatic = focusPath === pathname || isDetailRoute(pathname);
  const collapsed = manual?.path === pathname ? manual.collapsed : automatic;

  const toggle = useCallback(() => {
    setManual({ path: pathname, collapsed: !collapsed });
  }, [collapsed, pathname]);

  const focus = useCallback(() => {
    setFocusPath(pathname);

    const instant =
      collapsed ||
      !wideScreen() ||
      document.documentElement.dataset.motion === "reduced" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // content inside a resizing column cannot measure its final layout, so wait for the room
    return new Promise<void>((resolve) =>
      window.setTimeout(resolve, instant ? 0 : sidebarMs),
    );
  }, [collapsed, pathname]);

  const release = useCallback(() => setFocusPath(null), []);

  return (
    <SidebarContext value={{ collapsed, toggle, focus, release }}>
      {children}
    </SidebarContext>
  );
}

export function useSidebar() {
  const context = use(SidebarContext);

  if (!context) throw new Error("useSidebar needs a SidebarProvider");

  return context;
}
