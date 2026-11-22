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
  `min(calc(100cqw - 2 * var(--lb-inset-inline)), calc((100cqh - var(--lb-inset-block) - var(--lb-inset-bottom)) * ${ratio}))`;

// fades the thumbnails out at both ends of the strip
const stripMask =
  "[--lb-strip-mask:linear-gradient(to_right,transparent_0,rgb(0_0_0/0.5)_20px,#000_40px,#000_calc(100%-40px),rgb(0_0_0/0.5)_calc(100%-20px),transparent_100%)] [mask-image:var(--lb-strip-mask)]";

// pulling to close or zooming hides the strip so it does not cover the photo
const chromeHide =
  "transition-[opacity,visibility] duration-200 group-data-pulling/lb:invisible group-data-pulling/lb:opacity-0 group-data-pull-dismissing/lb:invisible group-data-pull-dismissing/lb:opacity-0 group-data-zoomed/lb:invisible group-data-zoomed/lb:opacity-0";

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
  const strip = photos.length > 1;
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
          className="group/lb fixed inset-0 z-[1000] flex flex-col text-white outline-none"
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
              "flex min-h-0 flex-1 [container-type:size] [scrollbar-width:none] [--lb-inset-block:1rem] [--lb-inset-bottom:var(--lb-inset-block)] [--lb-inset-inline:2rem] [&::-webkit-scrollbar]:hidden",
              // room under the photos for the thumbnail strip
              strip && "md:[--lb-inset-bottom:6rem]",
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
                      ? "md:w-(--lb-snug-width) md:min-w-0 md:flex-[0_0_auto] md:px-0 md:pt-(--lb-inset-block) md:pb-(--lb-inset-bottom)"
                      : "sm:p-10 md:pb-(--lb-inset-bottom)",
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

            {/* docked inside the track so a wheel or trackpad swipe over the thumbnails scrolls
                the photos; sticky keeps it in place, and order-first with the negative end margin
                gives it no width, so the snap points do not move */}
            {strip ? (
              <div
                className={cn(
                  "pointer-events-none sticky inset-x-0 z-[2] order-first w-[100cqw] flex-none self-end px-3 pb-3 me-[calc(-100cqw-var(--lb-gap,0px))] max-md:hidden",
                  chromeHide,
                )}
              >
                <Lightbox.ThumbnailStrip
                  className={cn(
                    "pointer-events-auto w-full min-w-0 py-[0.3125rem] [--lb-thumb-size:3.5rem]",
                    stripMask,
                  )}
                >
                  <Lightbox.ThumbnailStripTrack aria-label={`${label} thumbnails`} className="flex w-max items-center gap-2">
                    {photos.map((photo, index) => (
                      <Lightbox.Thumbnail
                        key={source(photo).url}
                        index={index}
                        className="relative block size-(--lb-thumb-size) shrink-0 cursor-pointer overflow-hidden rounded-[0.5rem] opacity-60 transition-opacity duration-150 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white data-active:opacity-100"
                      >
                        <img src={source(photo).url} alt={photo.alt} draggable={false} className="block size-full object-cover" />
                      </Lightbox.Thumbnail>
                    ))}
                  </Lightbox.ThumbnailStripTrack>
                  {/* a fixed ring on the midline; the active thumbnail scrolls under it */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute top-1/2 left-1/2 size-[calc(var(--lb-thumb-size)+10px)] -translate-x-1/2 -translate-y-1/2 rounded-[calc(0.5rem+3px)] border-2 border-white"
                  />
                </Lightbox.ThumbnailStrip>
              </div>
            ) : null}
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
