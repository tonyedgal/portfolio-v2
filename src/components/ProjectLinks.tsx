import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { GitHubRepositoryLink } from "@/components/GitHubRepositoryLink";

export function ProjectLinks({ about, name, website, repository }: {
  about?: string;
  name?: string;
  website: string;
  repository: string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground [&>a]:inline-flex [&>a]:min-h-11 [&>a]:items-center [&>a]:gap-2 [&>a]:text-inherit [&>a]:no-underline [&>a:hover]:text-foreground [&>a:focus-visible]:outline-2 [&>a:focus-visible]:outline-offset-4 [&>a:focus-visible]:outline-ring">
      {about ? (
        <Link
          href={about}
          className="group/cta mr-1 bg-foreground px-5 font-medium text-background! transition-[opacity,scale] duration-150 ease-out hover:opacity-90 active:scale-[0.96]"
        >
          Explore {name ?? "the project"}
          <ArrowRight
            aria-hidden="true"
            className="size-4 transition-transform duration-150 ease-out group-hover/cta:translate-x-0.5"
            strokeWidth={1.75}
          />
        </Link>
      ) : null}
      <a href={website}>
        Visit website <ArrowUpRight size={15} aria-hidden="true" />
      </a>
      <GitHubRepositoryLink repository={repository} />
    </div>
  );
}
