import { ContentWrapper } from "@/components/PortfolioLayout";
import { PageTransition } from "@/components/PageTransition";
import Article from "@/content/blog/diagonal-background-pattern-with-tailwindcss.mdx";
import { createPageMetadata, socialCards } from "@/lib/site-metadata";

export const metadata = createPageMetadata(socialCards.diagonalPattern);

export default function Page() {
  return (
    <PageTransition>
      <ContentWrapper className="typography">
        <Article />
      </ContentWrapper>
    </PageTransition>
  );
}
