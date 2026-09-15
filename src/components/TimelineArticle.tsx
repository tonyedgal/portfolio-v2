"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

import { ContentWrapper } from "@/components/PortfolioLayout";

function ArticleHeader({ id, date }: { id: string; date: string }) {
  return (
    <header className="relative mb-10 xl:mb-0">
      <div className="pointer-events-none absolute top-0 left-[max(-0.5rem,calc(50%-18.625rem))] z-40 flex h-4 items-center justify-end gap-x-2 lg:right-[calc(max(2rem,50%-38rem)+40rem)] lg:left-0 lg:min-w-lg xl:h-8">
        <Link href={`#${id}`} className="hidden xl:pointer-events-auto xl:block xl:text-xs/4 xl:font-medium xl:text-muted-foreground">
          {date}
        </Link>
        <div className="h-px w-3.5 bg-border lg:-mr-3.5 xl:mr-0" />
      </div>
      <ContentWrapper>
        <Link href={`#${id}`} className="text-xs/4 font-medium text-muted-foreground xl:hidden">
          {date}
        </Link>
      </ContentWrapper>
    </header>
  );
}

export function TimelineArticle({ id, date, children }: { id: string; date: string; children: React.ReactNode }) {
  const heightRef = useRef<HTMLDivElement>(null);
  const [heightAdjustment, setHeightAdjustment] = useState(0);

  useEffect(() => {
    if (!heightRef.current) return;

    const observer = new ResizeObserver(() => {
      if (!heightRef.current) return;
      const { height } = heightRef.current.getBoundingClientRect();
      setHeightAdjustment(8 * Math.ceil(height / 8) - height);
    });

    observer.observe(heightRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <article id={id} className="scroll-mt-16" style={{ paddingBottom: `${heightAdjustment}px` }}>
      <div ref={heightRef}>
        <ArticleHeader id={id} date={date} />
        <ContentWrapper className="typography">{children}</ContentWrapper>
      </div>
    </article>
  );
}
