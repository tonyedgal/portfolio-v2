"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";

import { BounceWrapper } from "@/components/ui/bounce-wrapper";
import { timelinePhotos, type TimelinePhoto, type TimelinePhotoSet } from "@/lib/timeline-photos";

// the stage keeps its height before the cards arrive, so nothing below it moves when they pop in; its left
// padding undoes the bleed, so the start-aligned fan lines up with the text above it
const stageClasses = "relative h-64 pl-4 sm:h-72 sm:pl-8 md:pl-10 lg:pl-0";

// below lg the cards run to the right edge and stop just short of the timeline line on the left, and the clip
// stops the drifting row from widening the page; wider screens show the fan without a clip, which would cut the open carousel at the column edge
function Bleed({ children }: { children: React.ReactNode }) {
  return <div className="mt-8 -mr-6 -ml-4 max-lg:overflow-x-clip sm:-mr-10 sm:-ml-8 md:-mr-12 md:-ml-10 lg:mx-0">{children}</div>;
}

export function TimelinePhotos({ set, href, linkLabel }: { set: TimelinePhotoSet; href: string; linkLabel: string }) {
  const photos = timelinePhotos[set];
  const [seen, setSeen] = useState(false);

  const watch = useCallback((stage: HTMLDivElement | null) => {
    if (!stage) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        setSeen(true);
      },
      { threshold: 0.35 },
    );

    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  if (!seen) {
    return (
      <Bleed>
        <div ref={watch} aria-hidden="true" className={stageClasses} />
      </Bleed>
    );
  }

  return (
    <Bleed>
      <BounceWrapper
        className={stageClasses}
        itemSize={208}
        align="start"
        minItemSize={132}
        entranceDelay={0.05}
        stagger={0.08}
        labels={photos.map((photo) => photo.alt)}
        openAttribute="data-cards-open"
        renderCaption={() => (
          <>
            <div className="flex items-center gap-2">
              <Link
                href={href}
                // the caption renders inside the prose, whose link colour and underline would win otherwise
                className="inline-flex h-9 items-center rounded-full bg-foreground px-4 text-xs font-medium text-background! no-underline! transition-[opacity,scale] duration-150 ease-out hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring active:scale-[0.96]"
              >
                {linkLabel}
              </Link>
              <button
                type="button"
                data-bounce-close
                className="inline-flex h-9 cursor-pointer items-center rounded-full border border-border px-4 text-xs font-medium text-foreground transition-[background-color,scale] duration-150 ease-out hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring active:scale-[0.96]"
              >
                Back
              </button>
            </div>
          </>
        )}
      >
        {photos.map((photo) => (
          <PhotoCard key={photo.alt} photo={photo} />
        ))}
      </BounceWrapper>
    </Bleed>
  );
}

function PhotoCard({ photo }: { photo: TimelinePhoto }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-muted shadow-md">
      {!loaded && <span aria-hidden="true" className="shimmer absolute inset-0" />}
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes="520px"
        draggable={false}
        onLoad={() => setLoaded(true)}
        data-loaded={loaded || undefined}
        className="pointer-events-none object-cover opacity-0 transition-opacity duration-500 ease-out select-none data-loaded:opacity-100"
      />
    </div>
  );
}
