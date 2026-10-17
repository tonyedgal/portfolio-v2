import Story from "@/content/story.mdx";
import { ContentWrapper } from "@/components/PortfolioLayout";
import { PageTransition } from "@/components/PageTransition";
import { createPageMetadata, socialCards } from "@/lib/site-metadata";

export const metadata = createPageMetadata(socialCards.story);

export default function Page() {
  return (
    <PageTransition>
      <ContentWrapper className="typography">
        <Story />
      </ContentWrapper>
    </PageTransition>
  );
}
