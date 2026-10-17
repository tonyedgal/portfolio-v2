export const portfolioSections = [
  { name: "Experience", path: "/", palette: "default" },
  { name: "Projects", path: "/projects", palette: "claude" },
  { name: "Blog", path: "/blog", palette: "mono" },
  { name: "Story", path: "/story", palette: "mocha" },
] as const;

export type PortfolioSection = (typeof portfolioSections)[number];

export function sectionForPath(pathname: string): PortfolioSection {
  return (
    portfolioSections.find(
      ({ path }) => pathname === path || pathname.startsWith(`${path}/`),
    ) ?? portfolioSections[0]
  );
}

export function navigationTypes(from: string, to: string) {
  const fromIndex = portfolioSections.indexOf(sectionForPath(from));
  const toIndex = portfolioSections.indexOf(sectionForPath(to));

  return fromIndex === toIndex
    ? undefined
    : [toIndex > fromIndex ? "nav-forward" : "nav-back"];
}
