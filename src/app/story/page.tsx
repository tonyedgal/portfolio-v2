import Story from "@/content/story.mdx";
import { ContentWrapper } from "@/components/PortfolioLayout";
import { createPageMetadata, socialCards } from "@/lib/site-metadata";

export const metadata = createPageMetadata(socialCards.story);
export default function Page() { return <ContentWrapper className="typography"><Story /></ContentWrapper>; }
