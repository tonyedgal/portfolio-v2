import Experience from "@/content/experience.mdx";
import { createPageMetadata, socialCards } from "@/lib/site-metadata";

export const metadata = createPageMetadata(socialCards.experience);

export default function Home() {
  return <Experience />;
}
