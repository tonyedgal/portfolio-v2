import { ContentWrapper } from "@/components/PortfolioLayout";
import Article from "@/content/blog/clean-react-code-use-imperative-handle.mdx";
import { createPageMetadata, socialCards } from "@/lib/site-metadata";

export const metadata = createPageMetadata(socialCards.imperativeHandle);

export default function Page() {
  return (
    <ContentWrapper className="typography">
      <Article />
    </ContentWrapper>
  );
}
