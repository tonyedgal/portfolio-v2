# Portfolio repository guide

Behavioural and project-specific guidelines for coding agents working in
`portfolio-v2`.

**Tradeoff:** These guidelines bias toward preserving the portfolio's content,
layout, and visual identity over quickly introducing a new pattern. For trivial
tasks, use judgment.

## 1. Think before coding

**Ask; do not assume. Do not hide confusion. Surface tradeoffs.**

Before implementing:

- State material assumptions explicitly.
- If intent, architecture, content ownership, or scope is unclear, ask before
  writing code.
- If multiple reasonable interpretations exist, present them instead of choosing
  silently.
- When running unattended, use the safest reasonable interpretation, proceed only
  when the choice is reversible and within scope, and record the assumption.
- If a simpler approach exists, say so.
- Push back when a requested implementation creates avoidable accessibility,
  performance, content-integrity, or maintenance risk.
- Flag uncertainty explicitly. Confidence without evidence is not certainty.
- When useful, run a small, localized, low-risk experiment and report the
  hypothesis and result before committing to a larger direction.
- Suggest durable improvements when they materially outperform a tactical change,
  but do not implement expanded scope without authorization.

## 2. Simplicity first

**Use the minimum design that fully solves the problem.**

- Do not add features beyond the request.
- Do not create abstractions for a single use unless they enforce a real
  boundary.
- Do not add speculative flexibility or configuration.
- Do not add handling for impossible states.
- Prefer content in MDX, layout in React components, and visual styling in
  Tailwind utilities or the existing typography stylesheet.
- If an implementation is substantially larger than the problem requires,
  simplify it.

Ask: "Would a senior engineer consider this unnecessarily complicated?" If yes,
revise it.

## 3. Surgical changes

**Touch only what the task requires. Clean up only what your changes make
obsolete.**

- Do not reformat or refactor unrelated areas.
- Match existing repository style and patterns (see sections 6–8).
- Preserve user work and unrelated uncommitted or staged changes.
- Remove imports, variables, functions, and files made unused by your own
  changes.
- Do not remove pre-existing dead code unless asked.
- Surface unrelated bugs and design smells as separate follow-up work; do not
  silently fix them.

Every changed line should trace to the requested outcome or a necessary
supporting invariant.

## 4. Goal-driven execution

**Define success, implement, verify, and loop until the evidence matches the
goal.**

Translate requests into verifiable outcomes:

- "Fix the bug" means reproduce it, fix the cause, and verify the regression.
- "Refactor" means preserve observable behaviour and verify before and after.
- "Add a page" means it is reachable from the intended route, renders real MDX
  content, and works at mobile and desktop widths.
- "Change the layout" means verify the fixed desktop sidebar and the mobile
  document flow, including the bottom navigation.
- "Change the theme control" means verify both themes, the transition origin,
  reduced motion, and keyboard access.
- "Add content" means use supplied evidence and preserve dates, employers,
  project status, links, and metrics accurately.

For multi-step work, state a short plan:

```text
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Do not call visual work complete from static review when the running page can be
checked.

## 5. Product and content context

This is Tony Edgal's personal portfolio for hiring managers and engineering
leads. Experience is the default route; Projects, Blog, and Story are separate
routes. The persistent introduction contains identity, contact, social, and
résumé links.

Content rules:

- `PRODUCT.md` defines the audience, purpose, navigation, and design constraints.
- `CONTENT.md` is the editing guide for portfolio copy and MDX patterns.
- Resume-derived claims must remain faithful to
  `public/Tony-Resume-Fullstack.pdf`. Do not invent employers, dates, outcomes,
  availability, projects, metrics, articles, or photographs.
- Story photographs and their captions must come from the user. Store optimized
  assets under `public/story/` and render them with `StoryPhoto`.
- Preserve the supplied spelling and punctuation in names, titles, company
  names, links, and dates unless the user asks for an editorial change.

## 6. Architecture and routes

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

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## 7. Design system and responsive layout

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
- Below `lg`, the introduction is centered in normal flow and the navbar sits at
  the bottom of its `100svh` section, immediately above the MDX content.
- The navbar is centered relative to the fixed sidebar, not the viewport.
- Keep the spaceman avatar visible in the mobile navbar.
- Preserve keyboard focus states, the skip link, semantic landmarks, descriptive
  image alternatives, and reduced-motion behaviour.

Use Tailwind utilities for component layout and one-off styling. Add rules to
`typography.css` only when they apply to generated prose elements that cannot be
styled directly in MDX.

## 8. MDX and timeline conventions

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

## 9. Theme animation

The navbar theme button uses `next-themes` and
`@space-man/react-theme-animation`. The current `handleToggle` implementation in
`src/components/theme/ThemeToggle.tsx` snapshots the clicked button's rectangle,
applies `window.devicePixelRatio` for the animation library, starts the theme
transition, and restores the real element ref. This is a deliberate local
compatibility path; do not replace it with a direct `toggleTheme()` call unless
the animation origin has been verified in the user's external browser.

The sun and moon use a 200 ms blur/fade icon transition. The circular page
transition uses 250 ms. Preserve `motion-reduce:transition-none` on the icons.

## 10. Commands and verification

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
