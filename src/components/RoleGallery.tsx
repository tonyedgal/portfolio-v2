"use client";

import Image, { type StaticImageData } from "next/image";

import { PhotoLightbox, PhotoLightboxTrigger } from "@/components/ui/photo-lightbox";

export type RolePhoto = { src: StaticImageData; alt: string };

// a row of photos under a role; tapping one opens them all in the lightbox
export function RoleGallery({ title, photos }: { title: string; photos: RolePhoto[] }) {
  if (photos.length === 0) return null;

  return (
    <PhotoLightbox photos={photos} label={`${title} photos`}>
      <div className="mt-8 grid max-w-md grid-cols-3 gap-3">
        {photos.map((photo, index) => (
          <PhotoLightboxTrigger
            key={photo.src.src}
            index={index}
            label={`Open ${photo.alt} full screen`}
            className="group relative aspect-[4/5] overflow-hidden rounded-lg border border-border bg-muted transition-transform duration-200 ease-(--ease-sp-out) hover:-translate-y-0.5 active:scale-[0.98] motion-reduce:transition-none"
          >
            {(imageRef) => (
              <Image
                ref={imageRef}
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 640px) 150px, 33vw"
                placeholder="blur"
                className="pointer-events-none rounded-none! object-cover transition-transform duration-500 ease-(--ease-sp-out) group-hover:scale-[1.03] motion-reduce:transition-none"
              />
            )}
          </PhotoLightboxTrigger>
        ))}
      </div>
    </PhotoLightbox>
  );
}
