# Portfolio theme and tab transition repair

Verified locally on 2026-10-17. The final requirement is instant route palettes,
animated tab content, and the circle animation on the light/dark button.

## Rules and project facts

AGENTS.md contains behavioural rules adapted from Car Platform, including the
updated numbered comment section. CLAUDE.md contains portfolio facts, content
constraints, layout, theme requirements, commands, and reference boundaries.
The historical DPR/ref workaround is no longer required by either guide.

## Final implementation

| Before | After |
| --- | --- |
| A route effect invoked animated palette factories and caused flushSync errors | The pathname directly selects a data-portfolio-theme attribute; CSS selects the palette at render |
| Independent next-themes and animation hooks wrote conflicting mode classes | The package's standard Next provider owns mode and the button consumes its context |
| Projects selected Caffeine; Experience never restored default | One section map defines default, Claude, Mono, and Mocha, including descendant routes |
| The circle button had no ref or origin | The ordinary public ref is attached; the click supplies the real element without DPR scaling |
| Body font variables overrode palette roles | next/font asset variables live on html; shared CSS owns font roles |
| Mocha substituted Noto Sans and Claude fonts were not loaded | Mocha uses DM Sans; Claude loads Oxanium and Merriweather; Mono uses Geist Mono |
| Global colour transitions animated every element | Route colours appear instantly; no palette factory, pending palette state, or navigation interception remains |
| Unrequested sidebar sizing, overflow, and tab padding changes altered the deployed layout | Those changes were reverted; original desktop centering and tab padding are preserved |
| Duplicate direct Motion dependency and mixed spring settings | Navbar uses motion/react; the redundant direct framer-motion dependency is removed; highlight timings match |
| Placeholder build-policy strings failed pnpm dependency checks | Explicit false values preserve disabled dependency scripts; dependency verification completes |

The package still uses its internal effects to manage external browser state.
There is no application useEffect/useLayoutEffect, lifecycle workaround,
callback-ref palette mutation, or render-time state setter in this theme and
navigation implementation. Existing unrelated canvas effects were not changed.

## API clarification

Version 3.0.0 has no public createThemeToggle export. Its palette factory is
createColorThemeToggle. The installed declarations and runtime were checked.

The factory has no public route-commit callback for combining a Next.js route
change with its document-level reveal. This no longer constrains the final
implementation: the user requested instant route colours, so route palettes
are declarative CSS and do not call the animation factory. The standard package
provider still supplies the mode button's circle animation and pre-hydration
script. No custom theme script or context is required.

Official package references:
- https://github.com/tonyedgal/spaceman-react-theme-animation/blob/main/packages/react-theme-animation/README.md
- https://github.com/tonyedgal/spaceman-react-theme-animation/blob/main/packages/react-theme-animation/docs/nextjs-setup.md

## Verification

- Production build: passed with TypeScript and all 26 static outputs. After
  replacing the placeholder policy values, the dependency check also completed.
- TypeScript: passed independently.
- Whitespace check: passed.
- In-app Chromium browser: all section palettes and fonts, direct loads,
  /projects/ui-theme, /blog/closures-in-javascript, browser back/forward,
  Experience restoration, light/dark preservation, and rapid tab navigation.
- Actual route animation keyframes: directional content fades/slides. No palette
  circle is started by tab navigation.
- Actual mode-button keyframes: circle origin 388.93px, 752px matches the centre
  of the measured button (x 370.9296875, y 734, size 36x36). The same CSS-pixel
  origin is used at DPR 1, 2, and 3. No DPR calculation exists in app code.
- Reduced motion: generated view-transition animation durations are zero.
  Keyboard activation works. Browser console contains no runtime errors in the
  final checks.
- The earlier responsive checks did not establish layout parity with deployment.
  A later matched comparison at 1577x1271 found an unintended 168px introduction
  offset and a 96px reduction in navbar width. The sidebar sizing/overflow changes
  and reduced tab padding were reverted before this checkpoint. Font sizes were
  unchanged: 32px heading, 14px body, and 12px desktop tabs at that viewport.
- Body and theme-button colour transition durations are zero. Icon and tab
  motion retain their explicit transitions and reduced-motion handling.
- Temporary browser probes and emulation overrides were removed by reload/reset.

These are local Chromium results. They do not establish physical-device,
Safari/Firefox, hosted CI, or Cloudflare deployment verification. Full-document
mode circles use native snapshot behaviour, which can temporarily prevent mouse
hit testing during the reveal; no click-replay workaround was introduced.

## Scope

No content, metrics, photos, metadata, or deployment was changed by the theme
repair. Existing dependency upgrades and release-script work are part of the
checkpoint batch. Commits remain local; no push or deployment is authorized. The existing pnpm lint
script still points to next lint, which Next.js 16 does not provide; this task
does not claim lint passed.

## Repeatable browser checks

1. Open / in light mode. Visit Projects, Blog, Story, and Experience. Confirm
   Claude/Oxanium, Mono/Geist Mono, Mocha/DM Sans, and default/Noto Sans.
2. Repeat in dark mode. Use back, forward, reload, and the two detail URLs.
   Confirm the palette follows the route and the chosen mode stays selected.
3. Switch tabs quickly. Confirm the last selected tab and palette agree. The
   page content slides; the palette appears without a reveal or interpolation.
4. Click the mode button at DPR 1, 2, and 3. Inspect the circle's CSS-pixel
   origin against the button rectangle. Repeat with keyboard activation and
   reduced motion; both must work without the circle animation.
5. Inspect 320/390px mobile, 768px tablet, and 1280px desktop layouts in both
   modes. Confirm the avatar and all navigation controls remain reachable.
