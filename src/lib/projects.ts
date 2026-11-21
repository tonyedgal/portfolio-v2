import type { StaticImageData } from "next/image";

import type { GalleryItem } from "@/components/ui/expandable-gallery";

import uiThemeHomeDesktop from "../../public/projects/ui-theme/home-desktop.webp";
import uiThemeHomeMobile from "../../public/projects/ui-theme/home-mobile.webp";
import uiThemeDocsDesktop from "../../public/projects/ui-theme/docs-desktop.webp";
import uiThemeDocsMobile from "../../public/projects/ui-theme/docs-mobile.webp";
import uiThemeInstallationDesktop from "../../public/projects/ui-theme/installation-desktop.webp";
import uiThemeInstallationMobile from "../../public/projects/ui-theme/installation-mobile.webp";
import uiThemeThemeToggleDesktop from "../../public/projects/ui-theme/theme-toggle-desktop.webp";
import uiThemeThemeToggleMobile from "../../public/projects/ui-theme/theme-toggle-mobile.webp";
import spacemanReactThemeAnimationLightDesktop from "../../public/projects/spaceman-react-theme-animation/light-desktop.webp";
import spacemanReactThemeAnimationLightMobile from "../../public/projects/spaceman-react-theme-animation/light-mobile.webp";
import spacemanReactThemeAnimationDarkDesktop from "../../public/projects/spaceman-react-theme-animation/dark-desktop.webp";
import spacemanReactThemeAnimationDarkMobile from "../../public/projects/spaceman-react-theme-animation/dark-mobile.webp";
import spacemanSkillsListingDesktop from "../../public/projects/spaceman-skills/listing-desktop.webp";
import spacemanSkillsListingMobile from "../../public/projects/spaceman-skills/listing-mobile.webp";
import spacemanSkillsReplyDesktop from "../../public/projects/spaceman-skills/reply-desktop.webp";
import spacemanSkillsReplyMobile from "../../public/projects/spaceman-skills/reply-mobile.webp";
import spacemanSkillsAutoCommitDesktop from "../../public/projects/spaceman-skills/auto-commit-desktop.webp";
import spacemanSkillsAutoCommitMobile from "../../public/projects/spaceman-skills/auto-commit-mobile.webp";

export type ProjectScreenshot = {
  id: string;
  title: string;
  section: string;
  // a landscape capture for wide screens and a portrait capture for phones
  desktop: StaticImageData;
  mobile: StaticImageData;
  alt: string;
};

export type ProjectMedia = {
  // product screenshots shown on the projects index, one spine each
  screenshots: ProjectScreenshot[];
  // extra screenshots shown as a card stack on the project page
  gallery: GalleryItem[];
};

export const projectMedia: Record<string, ProjectMedia> = {
  "ui-theme": {
    screenshots: [
      { id: "home", title: "Home page", section: "Website", desktop: uiThemeHomeDesktop, mobile: uiThemeHomeMobile, alt: "UI-Theme home page: the library for theming the web" },
      { id: "docs", title: "Introduction", section: "Documentation", desktop: uiThemeDocsDesktop, mobile: uiThemeDocsMobile, alt: "UI-Theme documentation introduction page" },
      { id: "installation", title: "Installation", section: "Documentation", desktop: uiThemeInstallationDesktop, mobile: uiThemeInstallationMobile, alt: "UI-Theme installation guide with install paths" },
      { id: "theme-toggle", title: "Theme toggle", section: "Components", desktop: uiThemeThemeToggleDesktop, mobile: uiThemeThemeToggleMobile, alt: "UI-Theme theme toggle component page with a live preview" },
    ],
    gallery: [],
  },
  "spaceman-react-theme-animation": {
    screenshots: [
      { id: "light", title: "Light theme", section: "Live demo", desktop: spacemanReactThemeAnimationLightDesktop, mobile: spacemanReactThemeAnimationLightMobile, alt: "Spaceman React Theme Animation demo app in its light theme" },
      { id: "dark", title: "Dark theme", section: "Live demo", desktop: spacemanReactThemeAnimationDarkDesktop, mobile: spacemanReactThemeAnimationDarkMobile, alt: "Spaceman React Theme Animation demo app in its dark theme" },
    ],
    gallery: [],
  },
  "spaceman-skills": {
    screenshots: [
      { id: "listing", title: "Skill listing", section: "skills.sh", desktop: spacemanSkillsListingDesktop, mobile: spacemanSkillsListingMobile, alt: "Spaceman Skills on skills.sh, listing its five skills" },
      { id: "reply", title: "Reply skill", section: "skills.sh", desktop: spacemanSkillsReplyDesktop, mobile: spacemanSkillsReplyMobile, alt: "The reply skill page on skills.sh" },
      { id: "auto-commit", title: "Auto-commit skill", section: "skills.sh", desktop: spacemanSkillsAutoCommitDesktop, mobile: spacemanSkillsAutoCommitMobile, alt: "The auto-commit skill page on skills.sh" },
    ],
    gallery: [],
  },
};
