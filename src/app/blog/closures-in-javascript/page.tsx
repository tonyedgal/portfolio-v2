import { ContentWrapper } from "@/components/PortfolioLayout";
import { PageTransition } from "@/components/PageTransition";
import Article from "@/content/blog/closures-in-javascript.mdx";
import { createPageMetadata, socialCards } from "@/lib/site-metadata";

export const metadata = createPageMetadata(socialCards.closures);

export default function Page() {
  return (
    <PageTransition>
      <ContentWrapper className="typography">
        <Article />
      </ContentWrapper>
    </PageTransition>
  );
}
