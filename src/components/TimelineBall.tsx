"use client";

import { useCallback } from "react";

// an entry counts as in view once its marker crosses this share of the viewport height
const readingLine = 0.5;
const topGap = 24;

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

// a dot on the timeline line that glides to the entry being read
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

      // a long entry pushes its marker off the top, so the ball waits at the top edge until the entry ends
      const box = marker.getBoundingClientRect();
      const entry = marker.closest("article")?.getBoundingClientRect();
      const markerY = box.top + box.height / 2;
      const viewY = entry ? Math.min(Math.max(markerY, topGap), entry.bottom - topGap) : markerY;
      const y = viewY - column.getBoundingClientRect().top;
      ball.style.transform = `translate(-50%, -50%) translateY(${y}px)`;

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
      className="pointer-events-none absolute top-0 left-[3px] z-[31] size-3 rounded-full bg-primary opacity-0 ring-4 ring-background data-ready:opacity-100 data-ready:transition-[transform,opacity] data-ready:duration-700 data-ready:ease-[cubic-bezier(0.34,1.3,0.64,1)] motion-reduce:transition-none"
    />
  );
}
