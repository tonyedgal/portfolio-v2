# CLAUDE.md

@AGENTS.md

`AGENTS.md` is the canonical project guide. Follow it in full for every coding
session in this repository.

## Non-negotiables, restated

These are the constraints that are easy to break and expensive to discover
late.

- **Content is evidence-based.** Do not invent employers, dates, metrics,
  projects, articles, availability, or story photographs.
- **`src/app/globals.css` owns the design tokens.** Use the mapped Tailwind
  utilities and preserve the existing palette, type, radius, and spacing system.
- **Component styling uses Tailwind.** Reserve `src/styles/typography.css` for
  generated Markdown element styling.
- **Preserve the responsive shell.** The sidebar is fixed on
  large screens; on mobile the intro is centered and its bottom navbar remains
  above the MDX content.
- **The navbar is centered within the sidebar**, not across the whole viewport.
- **The spaceman avatar stays visible on mobile.**
- **MDX remains the content source.** Keep route files thin and shared prose
  behaviour in `src/mdx-components.tsx`.
- **Preserve unrelated staged and uncommitted work.** This repository may contain
  user changes from an active design iteration.
- **Keep the DPR-aware `handleToggle` path** until the theme-animation origin is
  verified in the user's external browser without it.

## Fast orientation

- Next.js 16 + React 19 + TypeScript App Router; MDX for content; Tailwind CSS 4
  for component styling; `next-themes` for theme state.
- Routes: Experience `/`, Projects `/projects`, Blog `/blog`, Story `/story`.
- Layout: `src/components/PortfolioLayout.tsx`; navigation:
  `src/components/NavBar.tsx`; content: `src/content/`.
- Tokens: `src/app/globals.css`; prose styling:
  `src/styles/typography.css`; MDX element mapping:
  `src/mdx-components.tsx`.
- Read `PRODUCT.md` for product constraints and `CONTENT.md` before editing or
  adding portfolio content.
- Required check: `pnpm build`. For visual work, also inspect mobile and desktop
  in both themes and exercise the changed interaction.
