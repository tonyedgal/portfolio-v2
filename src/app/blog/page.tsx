import Blog from "@/content/blog.mdx";
import { PageTransition } from "@/components/PageTransition";
import { createPageMetadata, socialCards } from "@/lib/site-metadata";

export const metadata = createPageMetadata(socialCards.blog);

export default function Page() {
  return (
    <PageTransition>
      <Blog />
    </PageTransition>
  );
}
