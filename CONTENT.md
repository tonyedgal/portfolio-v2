# Editing the portfolio

Edit the MDX files in `src/content`. Standard Markdown works for headings, paragraphs, lists, links, and emphasis. Use `**important words**` for foreground emphasis inside muted body text.

- `intro.mdx`: persistent introduction.
- `experience.mdx`: work history, skills, education; default route `/`.
- `projects.mdx`: project index at `/projects`.
- `ui-theme.mdx`: current project detail at `/projects/ui-theme`.
- `blog.mdx`: blog index at `/blog`. Replace the empty state when a real article is ready. Add article routes under `src/app/blog/<slug>/page.tsx` importing their MDX, following the UI-Theme route example.
- `story.mdx`: photo timeline at `/story`.

Contact links live in `src/components/Intro.tsx`. The downloadable resume lives in `public/Tony-Resume-Frontend-Engineer.pdf`. Initial copy is adapted from the supplied resume; dates and metrics should be updated there and in the MDX when they change.

## Add a story photo

Put optimized images in `public/story/`, import the shared component at the top of `story.mdx`, and add entries from oldest to newest. Use the actual image dimensions and descriptive alternative text. Remove the empty-state heading and paragraph when the first photo is added.

```mdx
import { StoryPhoto } from '@/components/StoryPhoto'

<StoryPhoto
  src="/story/your-photo.webp"
  alt="Describe what the photograph shows"
  year="Year of the photograph"
  caption="Your short story about this moment."
  width={1200}
  height={800}
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
