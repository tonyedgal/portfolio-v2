import type { GalleryItem } from "@/components/ui/expandable-gallery";
import type { SpineItem, SpineOrientation } from "@/components/ui/spine-accordion";

export type ProjectMedia = {
  // product screenshots shown on the projects index, one spine each
  screenshots: SpineItem[];
  // "horizontal" sets portrait screenshots side by side; the default stacks wide ones
  orientation?: SpineOrientation;
  // extra screenshots shown as a card stack on the project page
  gallery: GalleryItem[];
};

// screenshots without an image render as named placeholders; add files under public/projects/<slug>/
export const projectMedia: Record<string, ProjectMedia> = {
  "ui-theme": {
    screenshots: [
      { id: "home", title: "Home page", section: "Website" },
      { id: "transition", title: "Theme transition", section: "Live demo" },
      { id: "picker", title: "Theme picker", section: "Live demo" },
      { id: "docs", title: "Getting started", section: "Documentation" },
    ],
    gallery: [],
  },
  "spaceman-react-theme-animation": {
    screenshots: [
      { id: "demo", title: "Demo app", section: "Vite example" },
      { id: "transition", title: "Circle transition", section: "Vite example" },
      { id: "colors", title: "Colour themes", section: "Vite example" },
      { id: "readme", title: "Package readme", section: "Repository" },
    ],
    gallery: [],
  },
  "spaceman-skills": {
    screenshots: [
      { id: "listing", title: "Skill listing", section: "skills.sh" },
      { id: "commit", title: "Commit workflow", section: "Terminal" },
      { id: "reply", title: "Plain-language replies", section: "Terminal" },
    ],
    gallery: [],
  },
};
