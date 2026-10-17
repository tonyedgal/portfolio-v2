"use client";

import { useQuery } from "@tanstack/react-query";
import { ArrowUpRight } from "lucide-react";

import { GitHubIcon } from "@/components/icons/SocialIcons";

export function GitHubRepositoryLink({ repository }: { repository: string }) {
  const { data, isPending } = useQuery({
    queryKey: ["github-stars", repository],
    queryFn: async ({ signal }) => {
      const response = await fetch(`https://api.github.com/repos/${repository}`, {
        signal,
        headers: { Accept: "application/vnd.github+json" },
      });
      if (!response.ok) throw new Error("GitHub stars are unavailable");
      const result: { stargazers_count?: unknown } = await response.json();
      if (typeof result.stargazers_count !== "number" || !Number.isSafeInteger(result.stargazers_count) || result.stargazers_count < 0) {
        throw new Error("GitHub returned an invalid star count");
      }
      return result.stargazers_count;
    },
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  return (
    <a href={`https://github.com/${repository}`} title={repository}>
      <GitHubIcon className="size-4 shrink-0" />
      GitHub
      <span className="whitespace-nowrap tabular-nums">
        [{data !== undefined ? `${data.toLocaleString("en-US")} ${data === 1 ? "star" : "stars"}` : isPending ? "loading stars" : "stars unavailable"}]
      </span>
      <ArrowUpRight size={15} className="shrink-0" aria-hidden="true" />
    </a>
  );
}
