import { useId } from "react";

import Intro from "@/components/Intro";
import NavBar from "@/components/NavBar";
import { FlickeringGrid } from "@/components/ui/FlickeringGrid";
import { cn } from "@/lib/utils";

function Timeline() {
  const id = useId();

  return (
    <div className="pointer-events-none absolute inset-0 z-30 overflow-hidden lg:right-[calc(max(2rem,50%-38rem)+40rem)] lg:min-w-lg lg:overflow-visible">
      <svg
        className="absolute top-0 left-[max(0px,calc(50%-18.125rem))] h-full w-1.5 lg:left-full lg:ml-1 xl:right-1 xl:left-auto xl:ml-0"
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

function FixedSidebar() {
  return (
    <div className="relative min-h-svh flex-none overflow-hidden px-6 lg:pointer-events-none lg:fixed lg:inset-0 lg:z-40 lg:flex lg:min-h-0 lg:px-0">
      <div className="relative flex min-h-svh w-full lg:min-h-0 lg:pointer-events-auto lg:mr-[calc(max(2rem,50%-38rem)+40rem)] lg:min-w-lg lg:overflow-x-visible lg:overflow-y-auto lg:pl-[max(4rem,calc(50%-38rem))]">
        <div className="relative mx-auto max-w-lg lg:mx-0 lg:flex lg:w-96 lg:max-w-none lg:flex-col lg:before:flex-1 lg:before:pt-6">
          <FlickeringGrid
            aria-hidden="true"
            className="absolute inset-0 overflow-hidden mask-x-from-75% mask-b-to-96%"
          />
          <div className="relative z-10 pt-12 pb-24 sm:pt-20 sm:pb-28 lg:py-20">
            <Intro />
          </div>
          <div className="absolute inset-x-0 bottom-4 z-10 flex justify-center lg:static lg:flex lg:flex-1 lg:items-end lg:justify-start lg:pb-6">
            <NavBar />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ContentWrapper({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:flex lg:px-8">
      <div className="lg:ml-96 lg:flex lg:w-full lg:justify-end lg:pl-32">
        <div
          className={cn(
            "mx-auto max-w-lg lg:mx-0 lg:w-0 lg:max-w-xl lg:flex-auto",
            className,
          )}
          {...props}
        />
      </div>
    </div>
  );
}

export function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <FixedSidebar />
      <div className="relative flex-auto">
        <Timeline />
        <main id="content" tabIndex={-1} className="space-y-20 pt-6 pb-20 focus:outline-none sm:space-y-32 sm:pt-10 sm:pb-32 lg:py-20 xl:py-32">
          {children}
        </main>
      </div>
    </>
  );
}
