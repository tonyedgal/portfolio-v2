import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { GitHubRepositoryLink } from "@/components/GitHubRepositoryLink";

export function ProjectLinks({ about, website, repository }: {
  about?: string;
  website: string;
  repository: string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground [&>a]:inline-flex [&>a]:min-h-11 [&>a]:items-center [&>a]:gap-2 [&>a]:text-inherit [&>a]:no-underline [&>a:hover]:text-foreground [&>a:focus-visible]:outline-2 [&>a:focus-visible]:outline-offset-4 [&>a:focus-visible]:outline-ring">
      {about ? <Link href={about}>Read about</Link> : null}
      <a href={website}>
        Visit website <ArrowUpRight size={15} aria-hidden="true" />
      </a>
      <GitHubRepositoryLink repository={repository} />
    </div>
  );
}
