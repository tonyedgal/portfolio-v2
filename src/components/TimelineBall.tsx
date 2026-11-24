"use client";

import { useCallback } from "react";

// an entry counts as in view once its marker crosses this share of the viewport height
const readingLine = 0.5;
const topGap = 24;
const dateGap = 10;

function activeMarker(markers: HTMLElement[]) {
  const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
  const line = atBottom ? window.innerHeight : window.innerHeight * readingLine;
  let pick = markers[0];

  for (const marker of markers) {
    if (marker.getBoundingClientRect().top > line) break;
    pick = marker;
  }

  return pick;
}

// a dot beside the date that glides to the entry being read
export function TimelineBall() {
  const track = useCallback((ball: HTMLSpanElement | null) => {
    if (!ball) return;

    let frame = 0;

    const place = () => {
      frame = 0;
      const column = ball.offsetParent;
      const markers = [...document.querySelectorAll<HTMLElement>("#content [data-timeline-marker]")];
      const marker = activeMarker(markers);
      if (!column || !marker) return;

      // only one of the two date links shows at a time: beside the line from xl, above the entry below it
      const date = [...(marker.closest("article")?.querySelectorAll<HTMLElement>("[data-timeline-date]") ?? [])].find(
        (link) => link.getClientRects().length > 0,
      );
      if (!date) return;

      // the link box spans the gutter's full width, so the ball follows the end of the text's last line instead
      const text = document.createRange();
      text.selectNodeContents(date);
      const lines = text.getClientRects();
      const box = lines[lines.length - 1] ?? date.getBoundingClientRect();

      // a long entry pushes its date off the top, so the ball waits at the top edge until the entry ends
      const entry = marker.closest("article")?.getBoundingClientRect();
      const dateY = box.top + box.height / 2;
      const viewY = entry ? Math.min(Math.max(dateY, topGap), entry.bottom - topGap) : dateY;
      const origin = column.getBoundingClientRect();
      ball.style.transform = `translate(${box.right + dateGap - origin.left}px, ${viewY - origin.top}px) translateY(-50%)`;

      // the first placement lands without a glide from the top of the page
      if (!ball.dataset.ready) requestAnimationFrame(() => (ball.dataset.ready = "true"));
    };

    const queue = () => {
      if (!frame) frame = requestAnimationFrame(place);
    };

    const resize = new ResizeObserver(queue);
    const content = document.getElementById("content");
    if (content) resize.observe(content);
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    queue();

    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", queue);
    };
  }, []);

  return (
    <span
      ref={track}
      aria-hidden="true"
      className="pointer-events-none absolute top-0 left-0 z-35 size-2.5 rounded-full bg-primary opacity-0 data-ready:opacity-100 data-ready:transition-[transform,opacity] data-ready:duration-700 data-ready:ease-[cubic-bezier(0.34,1.3,0.64,1)] motion-reduce:transition-none"
    />
  );
}
