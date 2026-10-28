# Portfolio

**Read [AGENTS.md](AGENTS.md) first.** It holds the rules for coding, testing,
human communication, comments, and commits. This file describes the project.

## Product and content context

This is Tony Edgal's personal portfolio for hiring managers and engineering
leads. Experience is the default route; Projects, Blog, and Story are separate
routes. The persistent introduction contains identity, contact, social, and
résumé links.

Content rules:

- `PRODUCT.md` defines the audience, purpose, navigation, and design constraints.
- `CONTENT.md` is the editing guide for portfolio copy and MDX patterns.
- Resume-derived claims must remain faithful to
  `public/Tony-Resume-Frontend-Engineer.pdf`. Do not invent employers, dates, outcomes,
  availability, projects, metrics, articles, or photographs.
- Story photographs and their captions must come from the user. Store optimized
  assets under `public/story/` and render them with `StoryPhoto`.
- Preserve the supplied spelling and punctuation in names, titles, company
  names, links, and dates unless the user asks for an editorial change.

## Architecture and routes

Next.js 16 + React 19 + TypeScript App Router application with MDX and Tailwind
CSS 4.

```text
src/app/                         Route entry points and global metadata
src/content/                     Editable portfolio and article MDX
src/components/PortfolioLayout  Responsive split shell and vertical timeline
src/components/Intro            Persistent identity and contact content
src/components/NavBar           Route navigation, avatar, and theme control
src/components/TimelineArticle  Dated timeline entries
src/mdx-components.tsx          Shared rendering for MDX elements
src/app/globals.css             Design-system tokens and Tailwind theme mapping
src/styles/typography.css       Shared MDX reading styles
public/                         Static images and downloadable résumé
```

- The root route `/` renders Experience.
- `/projects`, `/blog`, and `/story` render their matching index MDX files.
- Detail routes import their own MDX, such as `/projects/ui-theme` and
  `/blog/<slug>`.
- Add a navigation item only when the user wants a new top-level destination.
- Keep page metadata meaningful when adding a route.

## Design system and responsive layout

`src/app/globals.css` is the source of truth for color, type, radius, shadow,
tracking, and pattern tokens. Preserve those tokens and consume their Tailwind
utilities (`bg-background`, `text-foreground`, `text-muted-foreground`,
`border-border`, and related utilities). Do not introduce standalone page-level
stylesheets or hard-coded replacement palettes.

`src/styles/typography.css` is the intentional exception for element styling
inside rendered Markdown. It provides reading rhythm for headings, lists,
tables, links, code, and emphasis. In muted body copy, Markdown `**strong**`
uses the foreground token to emphasize important phrases.

The responsive layout uses a split sidebar and content structure:

- At `lg` and above, `FixedSidebar` is fixed on the left, content occupies the
  right column, and timeline dates sit beside the dividing line.
- Below `lg`, the navbar stays fixed at the bottom while the introduction and
  MDX content scroll. Reserve `--mobile-nav-height` plus reading space below the
  content so final lines and links can scroll clear of the navbar. Include the
  bottom safe area. Short sections retain at least one viewport of height.
  Mobile anchors scroll smoothly unless reduced motion is requested. Desktop
  intro spacing and sidebar centering must stay unchanged.
- The navbar is centered relative to the fixed sidebar, not the viewport.
  Bound its width to the available column. Tab gutters shrink with flexbox
  when theme fonts need more room; preserve readable labels and fixed controls.
- Keep the spaceman avatar visible in the mobile navbar.
- Preserve keyboard focus states, the skip link, semantic landmarks, descriptive
  image alternatives, and reduced-motion behaviour.

Use Tailwind utilities for component layout and one-off styling. Add rules to
`typography.css` only when they apply to generated prose elements that cannot be
styled directly in MDX.

## MDX and timeline conventions

- General portfolio copy belongs in `src/content/*.mdx`; blog articles belong in
  `src/content/blog/*.mdx`.
- Route files should stay thin: import the MDX and render it, adding
  `ContentWrapper` and `typography` where the MDX does not provide them.
- Use standard Markdown for prose and fenced code blocks for examples.
- Shared MDX element behaviour belongs in `src/mdx-components.tsx`. Code blocks
  use the shared bordered outer gutter and the inner scrollable `pre`; do not
  restyle individual articles.
- Use `TimelineArticle` for dated index or experience entries. Its `date` prop is
  rendered against the left timeline on wide screens and above the entry on
  smaller screens.
- Keep timeline IDs stable, unique, URL-safe, and aligned with article slugs when
  applicable.
- Follow `CONTENT.md` for story photos and new timeline entries.

## Theme animation

The installed dependency is `@space-man/react-theme-animation` version 3.0.0.
Read its installed API and official documentation before changing transitions.
The former DPR/ref override is obsolete guidance; do not treat it as a required
compatibility path. Verify the circle origin through the supported element ref
or explicit-origin API.

The requested route palettes are Experience `/` → `default`, Projects
`/projects` and descendants → `claude`, Blog `/blog` and descendants → `mono`,
and Story `/story` → `mocha`. Light/dark mode is a separate choice.

`src/lib/portfolio-sections.ts` defines section paths and palettes. The local
provider renders `data-portfolio-theme` from the pathname. Global CSS selects
the palette with `:root:has(...)`, so colours update with the route render.
Route palettes change instantly. Only the tab content slides. Do not restore
route effects, copied palette state, global colour transitions, or intercepted
navigation for this purpose. The package's standard provider owns light/dark
mode and the theme button's circle animation.

Load the relevant fonts with `next/font` in `src/app/layout.tsx`. Declare theme
font roles inline in the shared CSS, following the supplied framework example.
Use distinct font asset variables so layout declarations cannot override theme
roles. Preserve reduced-motion support and keyboard access.

## Commands and verification

Use pnpm; `pnpm-lock.yaml` is the lockfile.

```bash
pnpm install        # install dependencies
pnpm dev            # run the Next.js development server
pnpm build          # production build plus TypeScript validation
pnpm start          # serve the production build
```

`pnpm lint` currently points to `next lint`, which Next.js 16 no longer provides.
Do not report it as a passing check or silently replace the script while doing an
unrelated task. Use `pnpm build` as the required repository check until linting
is configured explicitly.

For visual changes, inspect the running app at mobile and desktop widths in both
light and dark themes. Exercise the actual interaction when changing navigation,
scrolling, code blocks, or theme animation. Summarize the checks run and any
environment limitation in the final report.

## Reference boundaries

The Car Platform guides supply behavioural principles only. Do not copy their
vehicle architecture, deployment assumptions, or verification claims here. The
Spaceman package and framework examples are read-only references for this task.
Changes to guide files do not install hooks or establish passing CI.

## Analytics and search metadata

`src/instrumentation-client.ts` initializes PostHog once. Tracking runs only in
production on `tony.spaceman.sh`, using shared PostHog project `321708`.
Filter reports by `$host` to view each site separately. History changes capture
pageviews across all routes, including browser back/forward navigation.
`src/components/posthog-provider.tsx` exposes that same client to React.
Do not initialize a second client or add manual pageview captures. Local and
Worker preview hosts do not initialize PostHog.

`src/lib/site-metadata.ts` defines each published page's path and social metadata.
The sitemap uses those paths. Keep this list aligned with published routes.
The root layout supplies Person and WebSite structured data from existing
profile links. Google chooses whether to show sitelinks.
