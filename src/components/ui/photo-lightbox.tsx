"use client";

import * as Lightbox from "@ramka/react/lightbox";
import { ChevronLeft, ChevronRight, GalleryHorizontal, RectangleHorizontal, X } from "lucide-react";
import type { StaticImageData } from "next/image";
import { useState } from "react";

import { cn } from "@/lib/utils";

export type LightboxPhoto = {
  src: StaticImageData | string;
  alt: string;
  // required for a string src; a static import already carries them
  width?: number;
  height?: number;
  caption?: React.ReactNode;
};

const control =
  "grid size-10 place-items-center rounded-full bg-white/10 text-white backdrop-blur transition-[background-color,opacity,scale] duration-150 hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-white active:scale-[0.96] disabled:pointer-events-none disabled:opacity-0";

// peek sizes each photo as a card with its neighbours in view; theater gives one photo the full width
export type LightboxLayout = "peek" | "theater";

const layoutKey = "photo-lightbox-layout";

function storedLayout(): LightboxLayout {
  try {
    return window.localStorage.getItem(layoutKey) === "theater" ? "theater" : "peek";
  } catch {
    return "peek";
  }
}

// the widest card that fits both the track's width and its height at this photo's shape
const cardWidth = (ratio: number) =>
  `min(calc(100cqw - 2 * var(--lb-inset-inline)), calc((100cqh - 2 * var(--lb-inset-block)) * ${ratio}))`;

function source(photo: LightboxPhoto) {
  if (typeof photo.src === "string") {
    return { url: photo.src, width: photo.width ?? 1600, height: photo.height ?? 1200 };
  }
  return { url: photo.src.src, width: photo.src.width, height: photo.src.height };
}

// wraps any set of triggers; each PhotoLightboxTrigger opens the viewer at its index
export function PhotoLightbox({
  photos,
  label,
  children,
  onOpenChange,
  onOpenChangeComplete,
}: {
  photos: LightboxPhoto[];
  label: string;
  children: React.ReactNode;
  onOpenChange?: (open: boolean) => void;
  // runs once the open or close motion has settled
  onOpenChangeComplete?: (open: boolean) => void;
}) {
  const [layout, setLayout] = useState<LightboxLayout>(() =>
    typeof window === "undefined" ? "peek" : storedLayout(),
  );
  const peek = layout === "peek";
  const ratios = photos.map((photo) => {
    const { width, height } = source(photo);
    return width / height;
  });

  const toggleLayout = () => {
    const next = peek ? "theater" : "peek";
    setLayout(next);
    try {
      window.localStorage.setItem(layoutKey, next);
    } catch {}
  };

  return (
    <Lightbox.Root loop onOpenChange={onOpenChange} onOpenChangeComplete={onOpenChangeComplete}>
      {children}
      <Lightbox.Portal>
        <Lightbox.Backdrop data-photo-lightbox="" className="fixed inset-0 z-[1000] bg-black/90 opacity-[calc(1-var(--lightbox-pull-progress,0))] backdrop-blur-sm" />
        <Lightbox.Content
          aria-label={label}
          data-photo-lightbox=""
          className="fixed inset-0 z-[1000] flex flex-col text-white outline-none"
        >
          <div className="flex items-center justify-between gap-4 px-4 pt-[max(1rem,env(safe-area-inset-top))] sm:px-6">
            <Lightbox.Counter className="font-mono text-xs text-white/70 tabular-nums" />
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-pressed={peek}
                aria-label={peek ? "Switch to theater layout" : "Switch to peek layout"}
                onClick={toggleLayout}
                className={cn(control, "max-md:hidden")}
              >
                {peek ? (
                  <GalleryHorizontal aria-hidden="true" className="size-4.5" />
                ) : (
                  <RectangleHorizontal aria-hidden="true" className="size-4.5" />
                )}
              </button>
              <Lightbox.Close aria-label="Close photos" className={control}>
                <X aria-hidden="true" className="size-5" />
              </Lightbox.Close>
            </div>
          </div>

          {/* remounted on a layout change so the track snaps to the active photo again */}
          <Lightbox.Slides
            key={layout}
            aria-label={label}
            aria-roledescription="carousel"
            style={
              {
                "--lb-snug-width-start": cardWidth(ratios[0] ?? 1),
                "--lb-snug-width-end": cardWidth(ratios.at(-1) ?? 1),
              } as React.CSSProperties
            }
            className={cn(
              "flex min-h-0 flex-1 [container-type:size] [scrollbar-width:none] [--lb-inset-block:1rem] [--lb-inset-inline:2rem] [&::-webkit-scrollbar]:hidden",
              peek &&
                // spacers centre the first and last cards under scroll snap
                "[--lb-gap:1.25rem] md:gap-(--lb-gap) md:before:flex-[0_0_calc((100cqw-var(--lb-snug-width-start))/2-var(--lb-gap))] md:after:flex-[0_0_calc((100cqw-var(--lb-snug-width-end))/2-var(--lb-gap))]",
            )}
          >
            {photos.map((photo, index) => {
              const { url, width, height } = source(photo);

              return (
                <Lightbox.Slide
                  key={url}
                  style={{ "--lb-snug-width": cardWidth(ratios[index]) } as React.CSSProperties}
                  className={cn(
                    "grid min-w-full flex-[0_0_100%] place-items-center p-4",
                    peek
                      ? "md:w-(--lb-snug-width) md:min-w-0 md:flex-[0_0_auto] md:px-0 md:py-(--lb-inset-block)"
                      : "sm:p-10",
                  )}
                >
                  <Lightbox.Item
                    index={index}
                    caption={photo.caption}
                    aria-roledescription="slide"
                    aria-label={`${index + 1} of ${photos.length}`}
                    // neighbours fade as a photo is pulled to close or zoomed
                    className={cn(
                      "size-full",
                      peek &&
                        "md:transition-opacity md:duration-(--lightbox-pull-snap-duration,500ms) md:not-data-active:opacity-[calc(1-max(var(--lightbox-pull-progress,0),var(--lightbox-zoom-progress,0))*0.85)]",
                    )}
                  >
                    <Lightbox.Zoom className="size-full">
                      <Lightbox.Media width={width} height={height} className="overflow-hidden rounded-lg">
                        <img src={url} alt={photo.alt} width={width} height={height} draggable={false} className="object-contain" />
                      </Lightbox.Media>
                    </Lightbox.Zoom>
                  </Lightbox.Item>
                </Lightbox.Slide>
              );
            })}
          </Lightbox.Slides>

          <div className="flex items-center justify-between gap-4 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-6">
            <Lightbox.Previous aria-label="Previous photo" className={cn(control, "max-sm:hidden")}>
              <ChevronLeft aria-hidden="true" className="size-5" />
            </Lightbox.Previous>
            <Lightbox.Caption className="min-w-0 flex-1 truncate text-center text-sm text-white/80" />
            <Lightbox.Next aria-label="Next photo" className={cn(control, "max-sm:hidden")}>
              <ChevronRight aria-hidden="true" className="size-5" />
            </Lightbox.Next>
          </div>
        </Lightbox.Content>
      </Lightbox.Portal>
    </Lightbox.Root>
  );
}

// a zoom-in cursor says the photo opens larger
export function PhotoLightboxTrigger({
  index,
  className,
  children,
  label,
  tabIndex,
}: {
  index: number;
  className?: string;
  label?: string;
  tabIndex?: number;
  children: (imageRef: (node: HTMLImageElement | null) => void) => React.ReactNode;
}) {
  return (
    <Lightbox.Trigger
      index={index}
      aria-label={label}
      tabIndex={tabIndex}
      className={cn(
        "block cursor-zoom-in focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring",
        className,
      )}
    >
      {({ imageRef }) => children(imageRef)}
    </Lightbox.Trigger>
  );
}
