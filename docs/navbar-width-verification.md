# Navbar width verification

Verified 2026-10-17 in local Chromium.

## Reproduction

At 1024x880 on /blog, Mono navigation required 448.40625px inside a
384px sidebar column. The navbar used w-max and shrink-0. Its fixed tab
padding could not yield space. The sidebar scroll container had clientWidth
497px and scrollWidth 512px, producing the horizontal scrollbar in the supplied
screenshot.

## Fix

Bound the navbar with max-w-full. Allow the tab group and links to shrink.
Keep 8px base padding and use shrinkable flex gutters for the additional
12px on each side at sm and above. Those gutters retain the original natural
spacing when room permits. Labels stay on one line. The avatar and theme
control retain their sizes. No font-size reduction, overflow clipping, JavaScript
measurement, or special 1024–1033px breakpoint is used.

Desktop navigation now fits its 384px column. This intentionally replaces the
old overflow into the sidebar gutter at wider desktop sizes too. The sidebar,
intro and content-column geometry are unchanged.

## Checks

- Mono at widths 360, 390, 768, 1023, 1024, 1033, 1100, 1280 and 1577px:
  no horizontal overflow in navigation or the sidebar scroll container.
- Mono at 1024 and 1033px: navbar width 384px, left 64px, right 448px.
- All four route themes at 1024px: navbar width 384px; sidebar horizontal
  overflow zero.
- Inspected Mono in light and dark mode. Theme control remains usable.
- No application console errors observed.

Repeat by opening /blog at each width, selecting all tabs, and checking that
sidebar.scrollWidth equals sidebar.clientWidth and the navigation remains
within its parent column. Production build is the static validation gate.
Physical-device, Safari and Firefox behaviour was not verified.
