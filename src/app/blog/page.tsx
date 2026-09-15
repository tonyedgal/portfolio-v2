import Blog from "@/content/blog.mdx";
import { createPageMetadata, socialCards } from "@/lib/site-metadata";

export const metadata = createPageMetadata(socialCards.blog);
export default function Page() {
  return <Blog />;
}
