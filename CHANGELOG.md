# portfolio-v2

## 0.4.0

### Minor Changes

- 0da6bed: Give the Experience section its own perpetuity palette: teal colours, sharp corners, and monospace type in light and dark mode.

## 0.3.0

### Minor Changes

- fb78746: Ask visitors to turn on sound with a toast on each full page load. On phones and tablets the toast sits above the bottom navbar, and it follows the site's light or dark theme.

### Patch Changes

- 2ed78c1: Show the settings bar from the first paint on a first visit, start its timer only when the tab is visible, and unlock sound on the first tap, click, or key press.
- b9f71ce: Stop opening the settings bar by itself on a first visit. The sound toast now points visitors to the settings button.

## 0.2.0

### Minor Changes

- 7035b29: On a first visit, the settings bar opens for a few seconds so visitors can see the theme, grid, animation, sound, and navbar controls. It closes by itself, or sooner on a scroll, Escape, or a click outside it, and stays open while the visitor uses it. It does not open by itself again.
- b07ddae: Home is now the default route, with a dated timeline of roles, projects, and writing; Experience moves to `/experience` and a new Keynotes page lists talks, panels, and mentorship sessions. The navbar can switch between text tabs and icon tabs with tooltips, and its active indicator no longer jumps when you return to a page. Scrolling plays a soft ratchet that follows scroll speed, the settings toggles and choices have their own sounds, and a new button in the settings bar mutes them. Project screenshots can sit in a horizontal spine for portrait images, and images that do not fill a spine are shown whole and centred.
- 8a78f01: Rebuild the layout around a collapsible introduction sidebar with full-width content. A settings bar above the navbar controls light and dark mode, the background grid, motion, and the accent colour. The intro heading rotates through roles, story chapters open into photo stacks, and each project shows its screenshots in a spine accordion with a button to its project page. Timeline dates no longer collide with entry content on wide screens, and the stacked layout between phone and desktop widths now shares one left edge.

## 0.1.8

### Patch Changes

- 55a1f9d: Keep the mobile navbar above page transitions, and make tab navigation respond at once. A new tab click skips the running slide, the hover pill no longer sticks after a tap, and touch input has no tap flash, double-tap delay, or text selection on controls. Safe-area padding now applies on phones with a home indicator or notch.

## 0.1.7

### Patch Changes

- 621f749: Improve PageSpeed results. Restore the home page title, load the first company logo early at its intended size, cache optimized images, defer the intro grid animation and PostHog until the page is idle, skip preloading fonts for other themes, and send HSTS, frame, and opener security headers.

## 0.1.6

### Patch Changes

- 5f590dc: Add production-only PostHog analytics and improve search metadata with canonical URLs, a sitemap, crawl rules, and structured data.

## 0.1.5

### Patch Changes

- d54b994: Add Spaceman Skills and consistent project links with live GitHub star counts. Import the diagonal Tailwind background article with local WebP images.

## 0.1.4

### Patch Changes

- edeca35: Add route palettes and fonts, directional tab transitions, and corrected circle origins for the theme button. Update project dependencies and Changesets release-tag detection.
  
  Keep mobile navigation fixed at the bottom with safe-area spacing and smooth section scrolling that respects reduced motion. Allow tab spacing to shrink within the sidebar so Mono navigation does not overflow.

## 0.1.3

### Patch Changes

- 6ba3bea: Simplify the Experience page with company logos, a top-level tools section, and concise product lists.

## 0.1.2

### Patch Changes

- 38ee07f: Run the project deployment script after a release tag is created.

## 0.1.1

### Patch Changes

- ac42ce5: Refresh the portfolio experience, add spaceman icons, and introduce the masked intro grid.
- 520cd93: Add route-specific social previews and automated Cloudflare Worker releases.
