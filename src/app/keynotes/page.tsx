import Keynotes from "@/content/keynotes.mdx";
import { PageTransition } from "@/components/PageTransition";
import { createPageMetadata, socialCards } from "@/lib/site-metadata";

export const metadata = createPageMetadata(socialCards.keynotes);

export default function Page() {
  return (
    <PageTransition>
      <Keynotes />
    </PageTransition>
  );
}
