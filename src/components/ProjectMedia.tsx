import { ExpandableGallery } from "@/components/ui/expandable-gallery";
import { SpineAccordion } from "@/components/ui/spine-accordion";
import { projectMedia } from "@/lib/projects";

export function ProjectScreens({ slug, name }: { slug: string; name: string }) {
  const media = projectMedia[slug];

  if (!media) return null;

  return (
    <SpineAccordion
      label={`${name} screenshots`}
      items={media.screenshots}
      orientation={media.orientation}
      className="my-8"
    />
  );
}

// renders nothing until the project has extra screenshots
export function ProjectGallery({ slug, name }: { slug: string; name: string }) {
  const gallery = projectMedia[slug]?.gallery ?? [];

  return (
    <ExpandableGallery
      items={gallery}
      title={`More from ${name}`}
      action="Open the screenshots"
      className="mt-16"
    />
  );
}
