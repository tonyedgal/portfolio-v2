import type { StaticImageData } from "next/image";

import diagonalProfileCard from "../../public/blog/diagonal-background-pattern-with-tailwindcss/profile-card.webp";
import diagonalTailwindWebsite from "../../public/blog/diagonal-background-pattern-with-tailwindcss/tailwind-website.webp";
import rigrSnow from "../../public/experience/rigr/2024-01-15.webp";
import rigrTeam from "../../public/experience/rigr/2024-01-16.webp";
import rigrPortrait from "../../public/experience/rigr/2025-03-14-portrait.webp";
import aiOne4935 from "../../public/keynotes/ai-conference-benin-1/img-4935.webp";
import aiOne4937 from "../../public/keynotes/ai-conference-benin-1/img-4937.webp";
import aiOne4941 from "../../public/keynotes/ai-conference-benin-1/img-4941.webp";
import aiTwo152316 from "../../public/keynotes/ai-conference-benin-2/img-152316.webp";
import aiTwo152403 from "../../public/keynotes/ai-conference-benin-2/img-152403.webp";
import aiTwo152605 from "../../public/keynotes/ai-conference-benin-2/img-152605.webp";
import devfest5298 from "../../public/keynotes/devfest-benin/img-5298.webp";
import devfest5304 from "../../public/keynotes/devfest-benin/img-5304.webp";
import devfest5324 from "../../public/keynotes/devfest-benin/img-5324.webp";
import react4311 from "../../public/keynotes/modern-react/img-4311.webp";
import react4317 from "../../public/keynotes/modern-react/img-4317.webp";
import react4327 from "../../public/keynotes/modern-react/img-4327.webp";
import osca4582 from "../../public/keynotes/oscafest/img-4582.webp";
import osca4584 from "../../public/keynotes/oscafest/img-4584.webp";
import osca4585 from "../../public/keynotes/oscafest/img-4585.webp";
import sailsCover from "../../public/keynotes/sailsconf-2026/cover.webp";
import sailsLinks from "../../public/keynotes/sailsconf-2026/links.webp";
import skillsListing from "../../public/projects/spaceman-skills/listing-desktop.webp";
import uiThemeHome from "../../public/projects/ui-theme/home-desktop.webp";
import uiThemeToggle from "../../public/projects/ui-theme/theme-toggle-desktop.webp";

export type TimelinePhoto = { src: StaticImageData; alt: string };

// up to three photos per home timeline entry, keyed by the entry's id
export const timelinePhotos = {
  "open-source": [
    { src: uiThemeHome, alt: "UI-Theme home page: the library for theming the web" },
    { src: uiThemeToggle, alt: "UI-Theme theme toggle component page with a live preview" },
    { src: skillsListing, alt: "Spaceman Skills on skills.sh, listing its five skills" },
  ],
  "sailsconf-2026": [
    { src: sailsCover, alt: "Title slide: Building E2E Systems with AI, lessons on system design from a frontend engineer, SailsConf 2026, Tony Edgal" },
    { src: sailsLinks, alt: "Links slide: Get the skills. Say hello. github.com/spacemansh/spaceman-skills, skills.sh/spacemansh/spaceman-skills, and tony.spaceman.sh" },
  ],
  "ai-conference-benin-city-2": [
    { src: aiTwo152316, alt: "Panelists seated on stage at AI Conference Benin City 2.0, one speaking into a microphone" },
    { src: aiTwo152403, alt: "Two panelists seated on stage under green light, listening" },
    { src: aiTwo152605, alt: "A panelist speaking into a microphone on stage under purple light" },
  ],
  "devfest-benin": [
    { src: devfest5298, alt: "Tony Edgal speaking into a microphone at DevFest Benin" },
    { src: devfest5304, alt: "Tony Edgal speaking on stage in front of the DevFest Benin backdrop" },
    { src: devfest5324, alt: "Tony Edgal on the DevFest Benin stage, seen from the floor" },
  ],
  "diagonal-background-pattern-with-tailwindcss": [
    { src: diagonalTailwindWebsite, alt: "Music card on a dark diagonal striped background" },
    { src: diagonalProfileCard, alt: "Profile card with diagonal stripes across its header" },
  ],
  "ai-conference-benin-city-1": [
    { src: aiOne4935, alt: "Tony Edgal speaking on stage in front of the AI Conference Benin 1.0 screen" },
    { src: aiOne4937, alt: "Tony Edgal presenting a slide about context windows and tokens" },
    { src: aiOne4941, alt: "Tony Edgal standing in front of the conference sponsor wall" },
  ],
  oscafest: [
    { src: osca4582, alt: "Tony Edgal at the podium with the theme demo on the large screens" },
    { src: osca4584, alt: "The theme demo in its dark theme on the large screen behind the podium" },
    { src: osca4585, alt: "Tony Edgal presenting the demo app with the theme control on screen" },
  ],
  "modern-react": [
    { src: react4311, alt: "Tony Edgal writing on a whiteboard, with a laptop showing code in the foreground" },
    { src: react4317, alt: "Tony Edgal drawing a diagram on the whiteboard" },
    { src: react4327, alt: "Tony Edgal at a whiteboard headed 'Modern React in the age of AI'" },
  ],
  "rigr-ai": [
    { src: rigrTeam, alt: "Tony Edgal in a suit and flat cap, standing between two colleagues in suits against a white wall" },
    { src: rigrSnow, alt: "Tony Edgal and two colleagues taking a selfie on a snowy street at night" },
    { src: rigrPortrait, alt: "An illustrated portrait of Tony Edgal with glasses, over drawings of circuits, a bicycle, music notes and a game controller" },
  ],
} satisfies Record<string, TimelinePhoto[]>;

export type TimelinePhotoSet = keyof typeof timelinePhotos;
