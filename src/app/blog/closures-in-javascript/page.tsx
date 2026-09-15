import { ContentWrapper } from "@/components/PortfolioLayout";
import Article from "@/content/blog/closures-in-javascript.mdx";
import { createPageMetadata, socialCards } from "@/lib/site-metadata";

export const metadata = createPageMetadata(socialCards.closures);

export default function Page() {
  return (
    <ContentWrapper className="typography">
      <Article />
    </ContentWrapper>
  );
}
