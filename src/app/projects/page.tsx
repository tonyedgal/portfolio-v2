import Projects from "@/content/projects.mdx";
import { ContentWrapper } from "@/components/PortfolioLayout";
import { PageTransition } from "@/components/PageTransition";
import { createPageMetadata, socialCards } from "@/lib/site-metadata";

export const metadata = createPageMetadata(socialCards.projects);

export default function Page() {
  return (
    <PageTransition>
      <ContentWrapper className="typography">
        <Projects />
      </ContentWrapper>
    </PageTransition>
  );
}
