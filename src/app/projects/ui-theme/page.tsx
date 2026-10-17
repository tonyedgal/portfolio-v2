import Project from "@/content/ui-theme.mdx";
import { ContentWrapper } from "@/components/PortfolioLayout";
import { PageTransition } from "@/components/PageTransition";
import { createPageMetadata, socialCards } from "@/lib/site-metadata";

export const metadata = createPageMetadata(socialCards.uiTheme);

export default function Page() {
  return (
    <PageTransition>
      <ContentWrapper className="typography">
        <Project />
      </ContentWrapper>
    </PageTransition>
  );
}
