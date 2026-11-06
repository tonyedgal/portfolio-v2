"use client";

import {
  BookOpen,
  BriefcaseBusiness,
  FolderGit2,
  type LucideIcon,
  PenLine,
  Presentation,
  Settings2,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotionConfig } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useId, useRef, useState } from "react";

import {
  navigationTypes,
  portfolioSections,
  sectionForPath,
} from "@/lib/portfolio-sections";
import { SettingsNav, segmentClasses } from "@/components/SettingsNav";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/global-tooltip";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { useNavStyle } from "@/lib/preferences";
import { cn } from "@/lib/utils";
import spaceman from "../../public/Spaceman.webp";

const icons: Record<string, LucideIcon> = {
  "/projects": FolderGit2,
  "/experience": BriefcaseBusiness,
  "/keynotes": Presentation,
  "/blog": PenLine,
  "/story": BookOpen,
};

// the avatar is the home link, so the tabs start after it
const tabSections = portfolioSections.filter(({ path }) => path !== "/");

// a click during a running slide would otherwise wait for it, so fast clicks replay late
function skipRunningTransition() {
  document.activeViewTransition?.skipTransition();
}

function Hint({
  label,
  disabled,
  children,
}: {
  label: string;
  disabled?: boolean;
  children: React.ReactElement;
}) {
  return (
    <Tooltip side="top" sideOffset={12}>
      <TooltipTrigger>{children}</TooltipTrigger>
      <TooltipContent>{disabled ? null : label}</TooltipContent>
    </Tooltip>
  );
}

function HomeLink({ pathname, hint }: { pathname: string; hint: boolean }) {
  return (
    <Hint label="Home" disabled={!hint}>
      <Link
        href="/"
        transitionTypes={navigationTypes(pathname, "/")}
        onClick={skipRunningTransition}
        aria-label="Tony Edgal — Home"
        aria-current={pathname === "/" ? "page" : undefined}
        className="shrink-0 rounded-full px-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        <Image
          src={spaceman}
          alt=""
          height={32}
          width={32}
          className="size-8 max-w-none rounded-full"
        />
      </Link>
    </Hint>
  );
}

function ClassicTabs({ pathname }: { pathname: string }) {
  const activePath = sectionForPath(pathname).path;
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const reduceMotion = useReducedMotionConfig();

  return (
    <div className="flex min-w-0 items-center" onMouseLeave={() => setHoveredPath(null)}>
      {tabSections.map((item) => {
        const active = activePath === item.path;

        return (
          <Link
            key={item.path}
            href={`${item.path}#content`}
            transitionTypes={navigationTypes(pathname, item.path)}
            onClick={skipRunningTransition}
            aria-current={active ? "page" : undefined}
            className={`relative isolate flex min-w-0 items-center justify-center whitespace-nowrap rounded-none px-2 py-3 transition-transform duration-100 ease-out active:scale-[0.97] text-[0.6875rem] leading-[14px] text-muted-foreground no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:before:w-3 sm:before:shrink sm:before:content-[''] sm:after:w-3 sm:after:shrink sm:after:content-[''] sm:text-xs ${
              active ? "font-semibold" : ""
            }`}
            onPointerEnter={(event) => {
              // touch fires a pointerenter on tap that never leaves, so the pill would stick
              if (event.pointerType === "mouse") setHoveredPath(item.path);
            }}
            onFocus={() => setHoveredPath(item.path)}
            onBlur={() => setHoveredPath(null)}
          >
            {item.path === (hoveredPath ?? activePath) && (
              <motion.span
                className="absolute inset-0 -z-10 bg-muted mix-blend-difference motion-reduce:transition-none"
                layoutId="navbar"
                aria-hidden="true"
                transition={{
                  bounce: 0,
                  duration: reduceMotion ? 0 : 0.3,
                }}
              />
            )}
            {item.name}
            {active && (
              <motion.span
                className="absolute right-0 bottom-[-6px] left-0 flex w-full items-center justify-center px-2"
                layoutId="navbar-active"
                aria-hidden="true"
                transition={{ duration: reduceMotion ? 0 : 0.3 }}
              >
                <span className="h-1 w-full rounded-full bg-accent" />
              </motion.span>
            )}
          </Link>
        );
      })}
    </div>
  );
}

const tabTransition = { type: "spring", bounce: 0, duration: 0.5 } as const;

function ExpandableTabs({
  pathname,
  hints,
}: {
  pathname: string;
  hints: boolean;
}) {
  const activePath = sectionForPath(pathname).path;
  // padding and width are not transforms, so the motion setting has to stop them here
  const transition = useReducedMotionConfig() ? { duration: 0 } : tabTransition;

  return (
    <div className="flex min-w-0 items-center gap-1">
      {portfolioSections.map((item) => {
        const active = activePath === item.path;
        const home = item.path === "/";
        const Icon = icons[item.path];

        return (
          <Fragment key={item.path}>
            <Hint label={item.name} disabled={!hints || active}>
              <Link
                href={home ? "/" : `${item.path}#content`}
                transitionTypes={navigationTypes(pathname, item.path)}
                onClick={skipRunningTransition}
                aria-current={active ? "page" : undefined}
                aria-label={item.name}
                className={cn(
                  "relative flex h-9 shrink-0 items-center rounded-xl text-xxs font-normal no-underline transition-colors duration-200 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring",
                  active
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <motion.span
                  initial={false}
                  animate={{
                    gap: active ? "0.5rem" : "0rem",
                    paddingLeft: active ? "0.875rem" : "0.5625rem",
                    paddingRight: active ? "0.875rem" : "0.5625rem",
                  }}
                  transition={transition}
                  className="flex items-center"
                >
                  {home ? (
                    // the avatar takes the same rounded-square shape as the tabs around it
                    <Image
                      src={spaceman}
                      alt=""
                      width={20}
                      height={20}
                      className="size-5 max-w-none shrink-0 rounded-md"
                    />
                  ) : (
                    <Icon
                      aria-hidden="true"
                      className="size-4 shrink-0"
                      strokeWidth={1.75}
                    />
                  )}
                  <AnimatePresence initial={false}>
                    {active && (
                      <motion.span
                        key="label"
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: "auto", opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        transition={transition}
                        // the smallest phones keep the row on one line by showing only the icon
                        className="overflow-hidden whitespace-nowrap max-[25rem]:hidden"
                      >
                        {item.name}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.span>
              </Link>
            </Hint>
            {home && (
              <span
                aria-hidden="true"
                className="mx-1 h-5 w-px shrink-0 bg-border"
              />
            )}
          </Fragment>
        );
      })}
    </div>
  );
}

export default function NavBar() {
  const pathname = usePathname();
  const navStyle = useNavStyle();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const settingsId = useId();
  const settingsRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const tabs = navStyle === "tabs";

  useOutsideClick(
    [settingsRef, toggleRef],
    () => setSettingsOpen(false),
    settingsOpen,
  );

  return (
    <TooltipProvider>
      <div
        className={cn(
          "relative mx-auto w-max max-w-full border border-border bg-background/80 p-1 shadow-sm backdrop-blur-md",
          tabs ? "rounded-2xl p-1.5" : "rounded-xs",
        )}
        onKeyDown={(event) => {
          if (event.key !== "Escape" || !settingsOpen) return;
          setSettingsOpen(false);
          toggleRef.current?.focus();
        }}
      >
        <SettingsNav id={settingsId} open={settingsOpen} ref={settingsRef} />
        <nav
          aria-label="Main navigation"
          className={cn(
            "relative flex items-center",
            tabs ? "gap-1" : "justify-between",
          )}
        >
          {/* hints would land under the open settings bar, so they wait until it closes */}
          {tabs ? (
            <>
              <ExpandableTabs pathname={pathname} hints={!settingsOpen} />
              <span
                aria-hidden="true"
                className="mx-1 h-5 w-px shrink-0 bg-border"
              />
            </>
          ) : (
            <>
              <HomeLink pathname={pathname} hint={!settingsOpen} />
              <ClassicTabs pathname={pathname} />
            </>
          )}
          <Hint label="Display settings" disabled={settingsOpen}>
            <button
              ref={toggleRef}
              type="button"
              aria-label="Settings"
              aria-expanded={settingsOpen}
              aria-controls={settingsId}
              onClick={() => setSettingsOpen((open) => !open)}
              className={cn(
                tabs
                  ? "grid size-9 shrink-0 cursor-pointer place-items-center rounded-xl text-muted-foreground transition-[color,background-color,scale] duration-150 ease-out hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring active:scale-[0.96]"
                  : cn(segmentClasses, "mx-1 px-0"),
              )}
            >
              <Settings2
                aria-hidden="true"
                className={cn(
                  "size-4 transition-transform duration-200 ease-out",
                  settingsOpen && "rotate-90",
                )}
                strokeWidth={1.75}
              />
            </button>
          </Hint>
        </nav>
      </div>
    </TooltipProvider>
  );
}
