"use client";

import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import Image from "next/image";
import { useId } from "react";

import { SectionBackdrop } from "@/components/SectionBackdrop";
import { sidebarMs, useSidebar } from "@/components/layout/SidebarProvider";
import spaceman from "../../../public/Spaceman.webp";

function Timeline() {
  const id = useId();

  return (
    <div className="pointer-events-none absolute inset-0 z-30 overflow-hidden">
      <svg
        className="absolute top-0 left-0 h-full w-1.5"
        aria-hidden="true"
      >
        <defs>
          <pattern id={id} width="6" height="8" patternUnits="userSpaceOnUse">
            <path d="M0 0H6M0 8H6" className="stroke-border" fill="none" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${id})`} />
      </svg>
    </div>
  );
}

export function PortfolioShell({
  intro,
  nav,
  children,
}: {
  intro: React.ReactNode;
  nav: React.ReactNode;
  children: React.ReactNode;
}) {
  const { collapsed, toggle } = useSidebar();

  return (
    <div
      data-sidebar={collapsed ? "collapsed" : "expanded"}
      style={{ "--sidebar-ms": `${sidebarMs}ms` } as React.CSSProperties}
      className="group/shell relative flex-auto [--ease-drawer:cubic-bezier(0.32,0.72,0,1)] [--rail-w:4rem] [--sidebar-w:clamp(28rem,42vw,46rem)] [--nav-x:calc(var(--sidebar-w)/2)] [--nav-max:calc(var(--sidebar-w)_-_1rem)] data-[sidebar=collapsed]:[--sidebar-w:var(--rail-w)] data-[sidebar=collapsed]:[--nav-x:calc(var(--rail-w)_+_(100vw_-_var(--rail-w))_/_2)] data-[sidebar=collapsed]:[--nav-max:calc(100vw_-_var(--rail-w)_-_2rem)] lg:grid lg:grid-cols-[var(--sidebar-w)_minmax(0,1fr)] lg:transition-[grid-template-columns] lg:duration-(--sidebar-ms) lg:ease-(--ease-drawer)"
    >
      <aside
        aria-label="Introduction"
        className="relative max-lg:border-b max-lg:border-border max-[30rem]:min-h-svh lg:sticky lg:top-0 lg:h-dvh lg:overflow-hidden"
      >
        <div className="relative h-full transition-[opacity,visibility] duration-200 ease-out lg:w-[clamp(28rem,42vw,46rem)] lg:overflow-y-auto lg:overscroll-contain lg:group-data-[sidebar=collapsed]/shell:invisible lg:group-data-[sidebar=collapsed]/shell:opacity-0 lg:group-data-[sidebar=collapsed]/shell:duration-150">
          <SectionBackdrop className="bottom-auto h-1/4 mask-b-from-30%" />
          <div className="relative z-10 px-6 pt-12 pb-24 sm:px-10 sm:pt-16 sm:pb-16 md:px-12 lg:flex lg:min-h-full lg:flex-col lg:px-12 lg:pt-20 lg:pb-32 xl:px-16">
            <div className="max-w-xl lg:my-auto lg:max-w-md">{intro}</div>
          </div>
        </div>
        <div className="invisible absolute inset-y-0 left-0 hidden w-(--rail-w) justify-center pt-6 opacity-0 transition-[opacity,visibility] duration-150 lg:flex lg:group-data-[sidebar=collapsed]/shell:visible lg:group-data-[sidebar=collapsed]/shell:opacity-100 lg:group-data-[sidebar=collapsed]/shell:delay-150 lg:group-data-[sidebar=collapsed]/shell:duration-200">
          <button
            type="button"
            onClick={toggle}
            aria-label="Show introduction"
            className="size-10 cursor-pointer rounded-full transition-[scale,opacity] duration-150 ease-out hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring active:scale-[0.96]"
          >
            <Image src={spaceman} alt="" width={40} height={40} className="size-10 rounded-full" />
          </button>
        </div>
      </aside>
      <div className="relative min-w-0">
        <Timeline />
        <button
          type="button"
          onClick={toggle}
          aria-label={collapsed ? "Show introduction" : "Hide introduction"}
          className="absolute top-4 left-4 z-40 hidden size-9 cursor-pointer place-items-center rounded-md text-muted-foreground transition-[color,background-color,scale] duration-150 ease-out hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring active:scale-[0.96] lg:grid"
        >
          {collapsed ? (
            <PanelLeftOpen aria-hidden="true" className="size-[18px]" strokeWidth={1.75} />
          ) : (
            <PanelLeftClose aria-hidden="true" className="size-[18px]" strokeWidth={1.75} />
          )}
        </button>
        {children}
      </div>
      <div data-floating-nav className="z-50 flex justify-center [view-transition-name:site-nav] max-lg:fixed max-lg:inset-x-0 max-lg:bottom-0 max-lg:h-(--mobile-nav-height) max-lg:items-center max-lg:bg-background/95 max-lg:pb-[env(safe-area-inset-bottom)] max-lg:backdrop-blur-md lg:fixed lg:bottom-6 lg:left-(--nav-x) lg:w-max lg:max-w-(--nav-max) lg:-translate-x-1/2 lg:transition-[left] lg:duration-(--sidebar-ms) lg:ease-(--ease-drawer)">
        {nav}
      </div>
    </div>
  );
}
