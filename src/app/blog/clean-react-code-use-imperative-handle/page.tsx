import { ContentWrapper } from "@/components/PortfolioLayout";
import Article from "@/content/blog/clean-react-code-use-imperative-handle.mdx";

export const metadata = { title: "Clean React code with useImperativeHandle" };

export default function Page() {
  return (
    <ContentWrapper className="typography">
      <Article />
    </ContentWrapper>
  );
}
