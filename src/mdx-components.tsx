import type { MDXComponents } from "mdx/types";
import Link from "next/link";

const components: MDXComponents = {
  a: ({ href, ...props }) => <Link href={href ?? "#"} {...props} />,
  pre: (props) => (
    <div className="rounded-[calc(var(--radius)+0.5rem)] border border-border bg-background p-2 [&>pre]:!m-0">
      <pre {...props} />
    </div>
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
