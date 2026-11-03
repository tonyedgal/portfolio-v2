"use client";

import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

import { useSidebar } from "@/components/layout/SidebarProvider";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { cn } from "@/lib/utils";

export type GalleryItem = {
  id: string;
  alt: string;
  src?: StaticImageData | string;
  label?: string;
  detail?: string;
  href?: string;
};

// the first three cards fan out like prints dropped on a desk;
// offsets are percentages of the card so the fan fits a 320px column
const fan = [
  { rotate: -12, x: -38, y: 4, zIndex: 10 },
  { rotate: -3, x: -4, y: -6, zIndex: 20 },
  { rotate: 10, x: 31, y: 2, zIndex: 30 },
];

// fewer cards would sit off-centre in the three-card fan
const fanFor = (count: number) =>
  count === 1
    ? [{ rotate: 0, x: 0, y: 0, zIndex: 10 }]
    : count === 2
      ? [
          { rotate: -6, x: -18, y: 2, zIndex: 10 },
          { rotate: 6, x: 18, y: -2, zIndex: 20 },
        ]
      : fan;

const spring = { type: "spring", stiffness: 160, damping: 18, mass: 1 } as const;

const releaseDelayMs = 320;

function CardFace({ item, index, expanded }: { item: GalleryItem; index: number; expanded: boolean }) {
  if (item.src) {
    return (
      <Image
        src={item.src}
        alt={item.alt}
        fill
        className="pointer-events-none object-cover select-none"
        sizes={expanded ? "(max-width: 1024px) 50vw, 33vw" : "240px"}
      />
    );
  }

  return (
    <div className="absolute inset-0 flex flex-col justify-between bg-muted p-4 text-left sm:p-5">
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden opacity-70">
        <div className="grain absolute -inset-1/2" />
      </div>
      <span className="relative font-mono text-[0.6875rem] text-muted-foreground tabular-nums">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="relative">
        <span className="line-clamp-3 font-heading text-base leading-tight font-semibold text-balance text-foreground sm:text-lg">
          {item.label ?? item.alt}
        </span>
        {item.detail && (
          <span className="mt-1 block truncate text-xs text-muted-foreground">{item.detail}</span>
        )}
      </span>
    </div>
  );
}

export function ExpandableGallery({
  items,
  title,
  action,
  className,
}: {
  items: GalleryItem[];
  title: React.ReactNode;
  action: string;
  className?: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const [opening, setOpening] = useState(false);
  const layoutGroupId = useId();
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLButtonElement>(null);
  const { focus, release } = useSidebar();

  const open = async () => {
    if (expanded || opening) return;
    setOpening(true);
    await focus();
    setOpening(false);
    setExpanded(true);
    bringIntoView();
  };

  // the grid grows past the fold, so bring its top row and the back button into view
  const bringIntoView = () => {
    const smooth = document.documentElement.dataset.motion !== "reduced" &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    requestAnimationFrame(() =>
      sectionRef.current?.scrollIntoView({ block: "start", behavior: smooth ? "smooth" : "instant" }),
    );
  };

  const close = () => {
    if (!expanded) return;

    // hold the expanded height so a short page does not clamp the scroll and jump
    const section = sectionRef.current;

    if (section) {
      section.style.minHeight = `${section.offsetHeight}px`;
      window.setTimeout(() => section.style.removeProperty("min-height"), 700);
    }

    setExpanded(false);
    bringIntoView();
    // the cards settle back into the stack before the sidebar returns
    window.setTimeout(release, releaseDelayMs);
  };

  // the floating navbar sits over the grid, so using it never closes the gallery
  useOutsideClick([containerRef, backRef], close, expanded, "[data-floating-nav]");

  const poses = fanFor(items.length);

  useEffect(() => {
    if (!expanded) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  });

  if (items.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      className={cn("relative flex w-full scroll-mt-6 flex-col items-center", className)}
    >
      <LayoutGroup id={layoutGroupId}>
        <div className="flex h-11 w-full items-center">
          <AnimatePresence initial={false}>
            {expanded && (
              <motion.button
                ref={(node) => {
                  backRef.current = node;
                  node?.focus({ preventScroll: true });
                }}
                key="back"
                type="button"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8, transition: { duration: 0.15 } }}
                transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                onClick={close}
                className="group/back inline-flex min-h-11 cursor-pointer items-center gap-2 pr-2 text-sm text-muted-foreground transition-colors duration-150 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                <span className="grid size-8 place-items-center bg-muted text-foreground transition-[background-color,scale] duration-150 group-hover/back:bg-accent group-active/back:scale-[0.96]">
                  <ArrowLeft aria-hidden="true" className="size-4" strokeWidth={1.75} />
                </span>
                Back
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        <motion.div
          ref={containerRef}
          layout
          transition={spring}
          className={cn(
            "relative w-full",
            expanded
              ? "grid grid-cols-2 gap-4 sm:gap-6 xl:grid-cols-3"
              : "flex flex-col items-center",
          )}
        >
          <div
            className={cn(
              expanded
                ? "contents"
                : "relative mb-6 flex h-72 w-full items-center justify-center sm:h-96",
            )}
          >
            {items.map((item, index) => {
              const stacked = index < poses.length;

              if (!stacked && !expanded) return null;

              const pose = poses[index] ?? { rotate: 0, x: 0, y: 0, zIndex: index };
              const face = <CardFace item={item} index={index} expanded={expanded} />;
              const cardClasses = cn(
                "overflow-hidden bg-muted outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10",
                expanded
                  ? "relative aspect-square rounded-2xl border-4 border-background shadow-md"
                  : "absolute size-40 cursor-pointer rounded-3xl border-[6px] border-background shadow-[0_20px_50px_rgb(0_0_0/0.15)] sm:size-56",
              );

              return (
                <motion.div
                  key={item.id}
                  layoutId={`card-${item.id}`}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    rotate: expanded ? 0 : pose.rotate,
                    x: expanded ? "0%" : `${pose.x}%`,
                    y: expanded ? "0%" : `${pose.y}%`,
                    zIndex: expanded ? 10 : pose.zIndex,
                  }}
                  // cards that join the grid fade in one after another
                  transition={{
                    ...spring,
                    opacity: { duration: 0.2, delay: stacked ? 0 : (index - poses.length) * 0.05 },
                  }}
                  whileHover={
                    expanded
                      ? { scale: 1.02 }
                      : {
                          scale: 1.05,
                          y: `${pose.y - 6}%`,
                          rotate: pose.rotate * 0.8,
                          zIndex: 50,
                          transition: { type: "spring", stiffness: 400, damping: 25 },
                        }
                  }
                  whileTap={expanded ? undefined : { scale: 0.97 }}
                  className={cardClasses}
                  onClick={expanded ? undefined : open}
                  aria-hidden={expanded ? undefined : true}
                >
                  {expanded && item.href ? (
                    <Link
                      href={item.href}
                      className="absolute inset-0 focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-ring"
                    >
                      {face}
                      <ArrowUpRight
                        aria-hidden="true"
                        className="absolute top-4 right-4 size-4 text-muted-foreground"
                        strokeWidth={1.75}
                      />
                    </Link>
                  ) : (
                    face
                  )}
                </motion.div>
              );
            })}
          </div>

          <AnimatePresence initial={false}>
            {!expanded && (
              <motion.div
                key="stack-copy"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.12 } }}
                className="max-w-xl space-y-6 text-center"
              >
                <div className="font-heading text-xl leading-snug font-medium tracking-tight text-balance text-foreground/90 sm:text-2xl">
                  {title}
                </div>
                <button
                  type="button"
                  onClick={open}
                  aria-busy={opening || undefined}
                  className="group/open inline-flex min-h-11 cursor-pointer items-center gap-2 bg-foreground px-6 text-sm font-medium text-background transition-[opacity,scale] duration-150 ease-out hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring active:scale-[0.96]"
                >
                  {action}
                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 transition-transform duration-150 ease-out group-hover/open:translate-x-0.5"
                    strokeWidth={1.75}
                  />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>
    </section>
  );
}

export default ExpandableGallery;
