import type { Metadata } from "next";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://tony.spaceman.sh");

export const siteHostname = new URL(siteUrl).hostname.replace(/^www\./, "");

export type SocialCard = {
  path: string;
  label: string;
  title: string;
  description: string;
  date?: string;
};

export const socialCards = {
  experience: {
    path: "/",
    label: "Portfolio",
    title: "Frontend Engineer",
    description:
      "Design and engineering for web and desktop products across AI, security, ecommerce, and EdTech.",
  },
  projects: {
    path: "/projects",
    label: "Projects",
    title: "Open-source work",
    description:
      "Theme systems, interface tools, and experiments built to make software easier to use.",
  },
  uiTheme: {
    path: "/projects/ui-theme",
    label: "Project",
    title: "UI-Theme",
    description:
      "A framework-agnostic theming library for applications with multiple themes.",
  },
  blog: {
    path: "/blog",
    label: "Blog",
    title: "Notes on software",
    description:
      "Writing about JavaScript, React, and the patterns that make software easier to understand.",
  },
  spacemanSkills: {
    path: "/projects/spaceman-skills",
    label: "Project",
    title: "Spaceman Skills",
    description: "Small, composable skills for coding agents and repeatable development workflows.",
  },
  spacemanTheme: {
    path: "/projects/spaceman-react-theme-animation",
    label: "Project",
    title: "Spaceman React Theme Animation",
    description: "Animated theme transitions for React applications.",
  },
  diagonalPattern: {
    path: "/blog/diagonal-background-pattern-with-tailwindcss",
    label: "Article",
    title: "Diagonal Background Pattern with TailwindCSS",
    description: "Build a diagonal background pattern with Tailwind CSS and a repeating linear gradient.",
    date: "October 18, 2025",
  },
  imperativeHandle: {
    path: "/blog/clean-react-code-use-imperative-handle",
    label: "Article",
    title: "Clean React code with useImperativeHandle",
    description:
      "Expose focused imperative methods while keeping state and behavior close to where they belong.",
    date: "March 28, 2025",
  },
  closures: {
    path: "/blog/closures-in-javascript",
    label: "Article",
    title: "Closures in JavaScript",
    description:
      "Functions, lexical scope, memory, and how closures remember the environment where they were created.",
    date: "July 2, 2021",
  },
  story: {
    path: "/story",
    label: "Story",
    title: "Along the way",
    description:
      "A photo timeline of the people, places, and moments behind the work.",
  },
} satisfies Record<string, SocialCard>;

export function createPageMetadata(card: SocialCard): Metadata {
  return {
    title: card.label === "Portfolio" ? undefined : card.title,
    description: card.description,
    alternates: { canonical: card.path },
    openGraph: {
      title: card.title,
      description: card.description,
      url: card.path,
      siteName: "Tony Edgal",
      locale: "en_US",
      type: card.label === "Article" ? "article" : "website",
    },
    twitter: {
      card: "summary_large_image",
      title: card.title,
      description: card.description,
    },
  };
}
