import { ContentWrapper } from "@/components/PortfolioLayout";
import Article from "@/content/blog/closures-in-javascript.mdx";

export const metadata = { title: "Closures in JavaScript" };

export default function Page() {
  return (
    <ContentWrapper className="typography">
      <Article />
    </ContentWrapper>
  );
}
