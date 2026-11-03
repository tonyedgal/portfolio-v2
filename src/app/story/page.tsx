import Story from "@/content/story.mdx";
import { PageTransition } from "@/components/PageTransition";
import { createPageMetadata, socialCards } from "@/lib/site-metadata";

export const metadata = createPageMetadata(socialCards.story);

export default function Page() {
  return (
    <PageTransition>
      <div className="space-y-16 sm:space-y-24">
        <Story />
      </div>
    </PageTransition>
  );
}
