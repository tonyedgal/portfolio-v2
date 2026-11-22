import { ExpandableGallery } from "@/components/ui/expandable-gallery";
import { SpineAccordion } from "@/components/ui/spine-accordion";
import { projectMedia } from "@/lib/projects";

// phones get the portrait captures side by side, wider screens the landscape captures stacked
export function ProjectScreens({ slug, name }: { slug: string; name: string }) {
  const media = projectMedia[slug];

  if (!media) return null;

  const items = (kind: "desktop" | "mobile") =>
    media.screenshots.map(({ desktop, mobile, ...shot }) => ({
      ...shot,
      image: kind === "desktop" ? desktop : mobile,
    }));

  return (
    <>
      <SpineAccordion
        label={`${name} screenshots`}
        items={items("mobile")}
        className="my-8 lg:hidden"
      />
      <SpineAccordion
        label={`${name} screenshots`}
        items={items("desktop")}
        className="my-8 hidden lg:flex"
      />
    </>
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
