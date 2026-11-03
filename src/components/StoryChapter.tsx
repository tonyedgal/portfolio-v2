import { ContentWrapper } from "@/components/PortfolioLayout";
import { SectionBackdrop } from "@/components/SectionBackdrop";
import { ExpandableGallery, type GalleryItem } from "@/components/ui/expandable-gallery";

const placeholderCount = 6;

export function StoryChapter({
  number,
  title,
  photos,
}: {
  number: string;
  title: string;
  photos?: GalleryItem[];
}) {
  // labelled frames hold the layout until the photographs arrive
  const items =
    photos ??
    Array.from({ length: placeholderCount }, (_, index) => ({
      id: `${number}-${index}`,
      alt: "Photo to come",
      label: "Photo to come",
      detail: `Chapter ${number}`,
    }));

  return (
    <section
      aria-label={`Chapter ${number}`}
      className="relative isolate overflow-hidden border-y border-border py-16 sm:py-24"
    >
      <SectionBackdrop className="-z-10 mask-y-from-85%" />
      <ContentWrapper>
        <ExpandableGallery
          items={items}
          title={
            <>
              <span className="mb-2 block font-mono text-xs font-normal tracking-normal text-muted-foreground tabular-nums">
                Chapter {number}
              </span>
              {title}
            </>
          }
          action="Open the photos"
        />
      </ContentWrapper>
    </section>
  );
}
