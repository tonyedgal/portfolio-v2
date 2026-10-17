# Projects and article patch verification

Verified locally on 2026-10-17 on feat/projects-and-tailwind-article, from main
at 62a944f. This change adds a patch changeset without manually changing the
package version.

## Content and sources

- Added Spaceman Skills from https://github.com/spacemansh/spaceman-skills.
- All three project index entries have Read about, Visit website, and GitHub
  actions. The React package uses https://spaceman-rta-vite.netlify.app/ and
  Skills uses https://www.skills.sh/spacemansh/spaceman-skills (HTTP 200 verified).
- Added internal detail pages for both Spaceman projects. UI-Theme retains its
  existing detail page and uses the shared external actions.
- Imported the supplied Diagonal Background Pattern with TailwindCSS Markdown.
  Kept its article text and code examples. Added the title, publication credit,
  back link, and local image imports. The DEV publication date is October 18,
  2025: https://dev.to/tonyedgal/diagonal-background-pattern-with-tailwindcss-4i5k.

## Article images

Downloaded the two AWS URLs from the article. Converted without resizing using
WebP quality 85. The source URLs are not used by the rendered article.

| AWS filename | Local filename | Dimensions | Source bytes | WebP bytes |
| --- | --- | --- | ---: | ---: |
| fdf0shi45rcax0kg5ljz.png | tailwind-website.webp | 924 × 748 | 223514 | 56032 |
| a60ov6wcau5eb7pukuje.png | profile-card.webp | 726 × 652 | 58390 | 16834 |

Both files are under public/blog/diagonal-background-pattern-with-tailwindcss.
Static next/image imports reserve their intrinsic aspect ratios.

## Runtime checks

Local Chromium, desktop at 1280px and mobile at 390px:

- The project index renders three complete action groups. Read about opens each
  corresponding detail route, and the return link works.
- Actual GitHub requests render counts beside the GitHub text, followed by the
  external arrow. Observed counts were 26, 55 and 1; these are live values, not
  fixtures or hard-coded content.
- Counts remain available when moving between the project index and detail pages.
  The shared projects layout owns the QueryClient. Query keys include the repo;
  staleTime is five minutes, and automatic retries are disabled.
- Blocking GitHub API requests produces [stars unavailable] while preserving each
  repository link. Restoring requests and reloading restores the actual counts.
  The blocks were removed after verification.
- The Blog index links to the new article with its published date. The article
  renders its text, both images, both code blocks, and DEV source link.
- Both images finished loading from local next/image URLs. At mobile width their
  rendered widths are 327px. The document has no horizontal overflow; code blocks
  scroll within their 309px containers.
- At the article end, the last link ends at y 740.51px and the bottom navbar
  wrapper starts at y 776px: approximately 35.5px of reading clearance.
- Light and dark themes were inspected. No new scroll or theme effects were added.

## Static checks

- pnpm build:worker passes, including production compilation, TypeScript and all
  31 static outputs.
- pnpm exec tsc --noEmit --incremental false passes. The incremental invocation
  initially retained an obsolete generated layout constraint; a fresh check is
  the reported result.
- Next.js get_compilation_issues returns an empty issues array.
- pnpm changeset status reports a patch for portfolio-v2. The --since form does
  not see the new untracked changeset until the work is staged/committed.
- git diff --check passes.

Physical devices, Safari, Firefox and a deployed preview were not checked.
