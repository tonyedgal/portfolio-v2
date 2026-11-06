"use client";

import Image, { type StaticImageData } from "next/image";
import { useState } from "react";

import { cn } from "@/lib/utils";

export type SpineItem = {
  id: string;
  // what the screenshot shows, set along the spine
  title: string;
  // the part of the product it was taken from
  section: string;
  image?: StaticImageData | string;
  alt?: string;
};

export type SpineOrientation = "vertical" | "horizontal";

// the shelf keeps one fixed height and the open panel takes whatever the closed spines leave,
// so switching panels never moves the content below it.
// vertical stacks wide screenshots and opens on click only, because scrolling would slide spines
// under a still cursor and open them; horizontal sets portrait images side by side and also opens
// on hover, but only when the mouse itself moves, so a scroll under a still cursor opens nothing
export function SpineAccordion({
  items,
  label,
  defaultIndex = 0,
  spine = "3.5rem",
  orientation = "vertical",
  className,
}: {
  items: SpineItem[];
  label: string;
  defaultIndex?: number;
  spine?: string;
  orientation?: SpineOrientation;
  className?: string;
}) {
  const [open, setOpen] = useState(defaultIndex);
  const horizontal = orientation === "horizontal";

  if (items.length === 0) return null;

  return (
    <section
      aria-label={label}
      className={cn(
        "flex w-full overflow-hidden border border-border bg-background select-none",
        horizontal ? "h-[32rem] flex-row sm:h-[40rem]" : "h-[30rem] flex-col sm:h-[36rem]",
        className,
      )}
      style={{ "--spine": spine } as React.CSSProperties}
    >
      {items.map((item, index) => {
        const isOpen = index === open;

        return (
          <button
            key={item.id}
            type="button"
            aria-expanded={isOpen}
            onClick={() => setOpen(index)}
            onFocus={() => setOpen(index)}
            onPointerMove={(event) => {
              if (!horizontal || isOpen || event.pointerType !== "mouse") return;
              if (event.movementX !== 0 || event.movementY !== 0) setOpen(index);
            }}
            style={{ flexBasis: isOpen ? "100%" : "var(--spine)" }}
            className={cn(
              "relative shrink cursor-pointer border-border text-left transition-[flex-basis] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring motion-reduce:transition-none",
              horizontal
                ? "min-w-(--spine) border-r last:border-r-0"
                : "min-h-(--spine) border-b last:border-b-0",
            )}
          >
            {/* a horizontal spine turns its label to read bottom to top, like the spine of a book */}
            <span
              className={cn(
                "absolute flex items-center justify-between gap-4 transition-colors duration-500 motion-reduce:transition-none",
                horizontal
                  ? "top-4 left-0 h-[calc(100%-2rem)] w-(--spine) rotate-180 [writing-mode:vertical-rl]"
                  : "inset-x-4 top-0 h-(--spine)",
                isOpen ? "text-foreground" : "text-muted-foreground",
              )}
            >
              <span className="flex min-h-0 min-w-0 items-baseline gap-3">
                <span className="font-mono text-[0.6875rem] tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="truncate font-heading text-base font-medium tracking-tight sm:text-lg">
                  {item.title}
                </span>
              </span>
              <span className="shrink-0 text-xs text-muted-foreground">{item.section}</span>
            </span>

            {/* mounted while closed so opening fades in an image that is already decoded */}
            <span
              className={cn(
                "absolute block overflow-hidden bg-muted outline-1 -outline-offset-1 outline-black/10 transition-opacity duration-700 motion-reduce:transition-none dark:outline-white/10",
                horizontal ? "inset-y-3 right-3 left-(--spine)" : "inset-x-3 top-(--spine) bottom-3",
                isOpen ? "opacity-100" : "opacity-0",
              )}
            >
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.alt ?? item.title}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  // an image with a different shape from the panel is shown whole and centred on both axes
                  className="pointer-events-none object-contain object-center"
                />
              ) : (
                <span className="absolute inset-0 grid place-items-center text-center">
                  <span aria-hidden="true" className="absolute inset-0 overflow-hidden opacity-70">
                    <span className="grain absolute -inset-1/2 block" />
                  </span>
                  <span className="relative space-y-1 px-6">
                    <span className="block text-sm font-medium text-foreground">{item.title}</span>
                    <span className="block text-xs text-muted-foreground">
                      Screenshot of {item.section.toLowerCase()} to come
                    </span>
                  </span>
                </span>
              )}
            </span>
          </button>
        );
      })}
    </section>
  );
}
