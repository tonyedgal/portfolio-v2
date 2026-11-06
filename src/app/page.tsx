import Home from "@/content/home.mdx";
import { PageTransition } from "@/components/PageTransition";
import { createPageMetadata, socialCards } from "@/lib/site-metadata";

export const metadata = createPageMetadata(socialCards.home);

export default function Page() {
  return (
    <PageTransition>
      <Home />
    </PageTransition>
  );
}
