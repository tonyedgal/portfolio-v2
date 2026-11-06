import { ContentWrapper } from "@/components/PortfolioLayout";
import { ExpandableGallery, type GalleryItem } from "@/components/ui/expandable-gallery";

export function StoryChapter({
  number,
  title,
  photos,
}: {
  number: string;
  title: string;
  photos: GalleryItem[];
}) {
  return (
    <section
      aria-label={`Chapter ${number}`}
      className="border-y border-border py-16 sm:py-24"
    >
      <ContentWrapper>
        <ExpandableGallery
          items={photos}
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
