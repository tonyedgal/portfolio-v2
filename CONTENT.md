# Editing the portfolio

Edit the MDX files in `src/content`. Standard Markdown works for headings, paragraphs, lists, links, and emphasis. Use `**important words**` for foreground emphasis inside muted body text.

- `intro.mdx`: persistent introduction.
- `home.mdx`: dated timeline of roles, projects, and writing; default route `/`.
- `experience.mdx`: work history, skills, education at `/experience`.
- `projects.mdx`: project index at `/projects`.
- `ui-theme.mdx`: current project detail at `/projects/ui-theme`.
- `spaceman-react-theme-animation.mdx` and `spaceman-skills.mdx`: project details.
- `blog.mdx`: dated blog index at `/blog`. Add article routes under `src/app/blog/<slug>/page.tsx` importing their MDX, following the existing article routes.
- `story.mdx`: photo timeline at `/story`.

Contact links live in `src/components/Intro.tsx`. The downloadable resume lives in `public/Tony-Resume-Frontend-Engineer.pdf`. Initial copy is adapted from the supplied resume; dates and metrics should be updated there and in the MDX when they change.

Project actions use `ProjectLinks` with an internal `about` URL on the index, a
`website` URL, and a GitHub `repository` in `owner/name` format. GitHub star counts
load through TanStack Query within the projects layout. Counts cache for five
minutes; failed requests show an unavailable label while keeping the link usable.

The diagonal background article uses local WebP images in
`public/blog/diagonal-background-pattern-with-tailwindcss`. Its text comes from
the supplied Markdown, and its October 18, 2025 publication date comes from DEV.

## Add a story chapter

Put optimized images in `public/story/`, import them at the top of `story.mdx`, and add one `StoryChapter` per chapter, oldest first. Each photo needs descriptive alternative text; `label` and `detail` show on the open card.

```mdx
import { StoryChapter } from "@/components/StoryChapter";
import firstDay from "../../public/story/first-day.webp";

<StoryChapter
  number="01"
  title="Your chapter title"
  photos={[
    { id: "first-day", src: firstDay, alt: "Describe what the photograph shows", label: "Your short caption", detail: "2019" },
  ]}
/>
```

## Show screenshots or portrait photos as spines

Project screenshots live in `src/lib/projects.ts`. The spines stack by default, which suits wide screenshots. Set `orientation: "horizontal"` on a project to set portrait images side by side; a horizontal spine opens on click, on keyboard focus, or when the mouse moves over it.

`SpineAccordion` also works directly in MDX, for example for portrait photos in `story.mdx`:

```mdx
import { SpineAccordion } from "@/components/ui/spine-accordion";
import portrait from "../../public/story/portrait.webp";

<SpineAccordion
  label="Your section name"
  orientation="horizontal"
  items={[
    { id: "portrait", title: "Your short caption", section: "2019", image: portrait, alt: "Describe what the photograph shows" },
  ]}
/>
```

## Add a dated timeline entry

Experience entries use `TimelineArticle`. Blog posts can use the same component so dates sit against the vertical timeline on wide screens and move above the post on smaller screens.

```mdx
import { TimelineArticle } from '@/components/TimelineArticle'

<TimelineArticle id="post-slug" date="September 14, 2026">

## Post title

Post summary or article content.

</TimelineArticle>
```

## Design

`src/app/globals.css` owns all design tokens. `src/styles/typography.css` defines Markdown reading rhythm with those tokens. The split layout and bottom navigation use Tailwind classes in the React components. Keep new colors and fonts out of content files.
