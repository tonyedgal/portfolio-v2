import Experience from "@/content/experience.mdx";
import { PageTransition } from "@/components/PageTransition";
import { createPageMetadata, socialCards } from "@/lib/site-metadata";

export const metadata = createPageMetadata(socialCards.experience);

export default function Home() {
  return (
    <PageTransition>
      <Experience />
    </PageTransition>
  );
}
