# Mobile navigation verification

Verified locally on 2026-10-17 on feat/route-themes-mobile-navigation,
based on main at 94c534e. The preceding work is saved in four local commits.

## Required behaviour

The latest user instruction replaces the proposed top anchor: keep mobile
navigation fixed at the bottom throughout scrolling. Reserve enough space for
the end of blog posts to remain readable. Preserve desktop layout and tab sizes.
Route palettes appear instantly. No application effects or scroll handlers.

## Change

- Below lg, the existing single navbar has a fixed bottom wrapper.
- Its height is 4.25rem plus env(safe-area-inset-bottom).
- Main content reserves that height plus 2rem of reading space below content.
- Short sections have a minimum viewport height so the content anchor can reach
  the top consistently.
- Mobile viewport scrolling is smooth only when motion is allowed. Desktop
  scrolling remains unchanged.

The supplied recording showed navigation scrolling away with the introduction.
The original short Story page landed with navbar y 402px and heading y 485px
at 360x800. With the bottom bar, selecting Blog lands its heading at y 24px.

## Browser evidence

Local in-app Chromium:

- At 360x800, navigation stays at y 747px while scrolling. Its fixed wrapper
  covers y 732–800px.
- At the end of /blog/clean-react-code-use-imperative-handle, the final Back to
  blog link ends at y 696.34px, leaving 35.66px before the fixed wrapper.
- At 390x844, the same article ends at y 740.5px; the wrapper starts at y 776px,
  leaving 35.5px. Navigation stays at y 791px.
- Selecting Story at 390x844 lands its heading at y 24px with navigation still
  at y 791px. Light and dark article views retain the bottom bar.
- Normal mobile scroll behaviour computes to smooth. Reduced motion computes to
  auto. The earlier smooth-scroll check recorded intermediate scroll positions.
- Before the subsequent navbar containment fix, at 1577x1271 desktop measurements matched deployment: intro heading
  y 415.90625px, navbar y 1204px and width 418.8046875px, heading size 32px,
  and tab padding 12px 20px.

TypeScript passes. Production build and whitespace checks are recorded in the
completion report. Physical-device safe areas, Safari and Firefox were not
verified. The safe-area allowance is implemented in CSS.

Next.js emits its development notice about smooth viewport scrolling. The
installed version supports opting out of smooth route scrolling using
 data-scroll-behavior="smooth" on html. That opt-out is intentionally absent
because smooth mobile scrolling is requested.

## Repeat

1. At 360x800 and 390x844, select each tab and scroll without returning to the intro.
2. Open a long blog post and scroll to its final link. Confirm clearance above
   the bottom bar.
3. Select Story, then test history, light/dark, and reduced motion.
4. At desktop width, compare intro position, navbar width and tab spacing.
