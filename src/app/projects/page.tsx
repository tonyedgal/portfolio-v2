import Projects from "@/content/projects.mdx";
import { ContentWrapper } from "@/components/PortfolioLayout";
import { createPageMetadata, socialCards } from "@/lib/site-metadata";

export const metadata = createPageMetadata(socialCards.projects);
export default function Page() { return <ContentWrapper className="typography"><Projects /></ContentWrapper>; }
