import Story from "@/content/story.mdx";
import { ContentWrapper } from "@/components/PortfolioLayout";

export const metadata = { title: "Story" };
export default function Page() { return <ContentWrapper className="typography"><Story /></ContentWrapper>; }
