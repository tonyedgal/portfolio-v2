import Project from "@/content/spaceman-react-theme-animation.mdx";
import { ContentWrapper } from "@/components/PortfolioLayout";
import { PageTransition } from "@/components/PageTransition";
import { createPageMetadata, socialCards } from "@/lib/site-metadata";

export const metadata = createPageMetadata(socialCards.spacemanTheme);

export default function Page() {
  return (
    <PageTransition>
      <ContentWrapper className="typography">
        <Project />
      </ContentWrapper>
    </PageTransition>
  );
}
