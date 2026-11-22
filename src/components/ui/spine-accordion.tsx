"use client";

import Image, { type StaticImageData } from "next/image";
import { useState } from "react";

import { PhotoLightbox, PhotoLightboxTrigger } from "@/components/ui/photo-lightbox";
import { cn } from "@/lib/utils";

export type SpineItem = {
  id: string;
  // what the screenshot shows, set along the spine
  title: string;
  // the part of the product it was taken from, shown at the far end of the spine
  section?: string;
  image?: StaticImageData | string;
  alt?: string;
};

export type SpineOrientation = "vertical" | "horizontal";

// portrait images set side by side; anything else, including placeholders, stacks
function orientationFor(items: SpineItem[]): SpineOrientation {
  const portrait = items.every(
    (item) => typeof item.image === "object" && item.image.height > item.image.width,
  );
  return portrait ? "horizontal" : "vertical";
}

// the shelf keeps one fixed height and the open panel takes whatever the closed spines leave,
// so switching panels never moves the content below it.
// vertical stacks wide screenshots and opens on click only, because scrolling would slide spines
// under a still cursor and open them; horizontal sets portrait images side by side and also opens
// on hover, but only when the mouse itself moves, so a scroll under a still cursor opens nothing.
// phones always stack, with thinner spines: side by side, the closed spines would leave the open
// image a sliver of the width
export function SpineAccordion({
  items,
  label,
  defaultIndex = 0,
  spine = "3.5rem",
  orientation,
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
  const horizontal = (orientation ?? orientationFor(items)) === "horizontal";

  if (items.length === 0) return null;

  // only spines with an image join the lightbox, so its indexes skip placeholders
  const photos = items.flatMap((item) =>
    item.image ? [{ src: item.image, alt: item.alt ?? item.title }] : [],
  );
  let photoIndex = -1;

  return (
    <section
      aria-label={label}
      className={cn(
        "flex w-full overflow-hidden border border-border bg-background select-none",
        "flex-col [--spine:2.75rem] sm:[--spine:var(--spine-size)]",
        horizontal ? "h-[40rem] sm:flex-row" : "h-[30rem] sm:h-[36rem]",
        className,
      )}
      style={{ "--spine-size": spine } as React.CSSProperties}
    >
      <PhotoLightbox photos={photos} label={label}>
        {items.map((item, index) => {
          const isOpen = index === open;
          if (item.image) photoIndex += 1;

          return (
            <div
              key={item.id}
              onClick={() => setOpen(index)}
              onPointerMove={(event) => {
                if (!horizontal || isOpen || event.pointerType !== "mouse") return;
                if (!window.matchMedia("(min-width: 40rem)").matches) return;
                if (event.movementX !== 0 || event.movementY !== 0) setOpen(index);
              }}
              style={{ flexBasis: isOpen ? "100%" : "var(--spine)" }}
              className={cn(
                "relative shrink border-border transition-[flex-basis] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
                isOpen ? "cursor-default" : "cursor-pointer",
                "min-h-(--spine) border-b last:border-b-0",
                horizontal && "sm:min-h-0 sm:min-w-(--spine) sm:border-r sm:border-b-0 sm:last:border-r-0",
              )}
            >
              {/* a horizontal spine turns its label to read bottom to top, like the spine of a book */}
              <button
                type="button"
                aria-expanded={isOpen}
                onFocus={() => setOpen(index)}
                className={cn(
                  "absolute flex cursor-[inherit] items-center justify-between gap-4 text-left transition-colors duration-500 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring motion-reduce:transition-none",
                  "inset-x-4 top-0 h-(--spine)",
                  horizontal &&
                    "sm:top-4 sm:right-auto sm:left-0 sm:h-[calc(100%-2rem)] sm:w-(--spine) sm:rotate-180 sm:[writing-mode:vertical-rl]",
                  isOpen ? "text-foreground" : "text-muted-foreground",
                )}
              >
                <span className="truncate font-heading text-base font-medium tracking-tight sm:text-lg">
                  {item.title}
                </span>
                {item.section ? (
                  <span className="shrink-0 text-xs text-muted-foreground">{item.section}</span>
                ) : null}
              </button>

              {/* mounted while closed so opening fades in an image that is already decoded */}
              <span
                className={cn(
                  "absolute block overflow-hidden bg-muted outline-1 -outline-offset-1 outline-black/10 transition-opacity duration-700 motion-reduce:transition-none dark:outline-white/10",
                  "inset-x-3 top-(--spine) bottom-3",
                  horizontal && "sm:top-3 sm:left-(--spine)",
                  isOpen ? "opacity-100" : "pointer-events-none opacity-0",
                )}
              >
                {item.image ? (
                  <PhotoLightboxTrigger
                    index={photoIndex}
                    label={`Open ${item.alt ?? item.title} full screen`}
                    tabIndex={isOpen ? 0 : -1}
                    className="absolute inset-0"
                  >
                    {(imageRef) => (
                      <Image
                        ref={imageRef}
                        src={item.image!}
                        alt={item.alt ?? item.title}
                        fill
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        // an image with a different shape from the panel is shown whole and centred on both axes
                        className="pointer-events-none object-contain object-center"
                      />
                    )}
                  </PhotoLightboxTrigger>
                ) : (
                  <span className="absolute inset-0 grid place-items-center text-center">
                    <span aria-hidden="true" className="absolute inset-0 overflow-hidden opacity-70">
                      <span className="grain absolute -inset-1/2 block" />
                    </span>
                    <span className="relative space-y-1 px-6">
                      <span className="block text-sm font-medium text-foreground">{item.title}</span>
                      <span className="block text-xs text-muted-foreground">Screenshot to come</span>
                    </span>
                  </span>
                )}
              </span>
            </div>
          );
        })}
      </PhotoLightbox>
    </section>
  );
}
