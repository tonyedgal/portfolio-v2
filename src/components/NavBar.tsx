"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import {
  navigationTypes,
  portfolioSections,
  sectionForPath,
} from "@/lib/portfolio-sections";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

export default function NavBar() {
  const pathname = usePathname();
  const activePath = sectionForPath(pathname).path;
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();

  return (
    <div className="mx-auto w-max max-w-full rounded-xs border border-border bg-transparent p-1 shadow-sm backdrop-blur-md">
      <nav
        aria-label="Main navigation"
        className="relative flex items-center justify-between"
        onMouseLeave={() => setHoveredPath(null)}
      >
        <Link
          href="/"
          transitionTypes={navigationTypes(pathname, "/")}
          aria-label="Tony Edgal — Experience"
          className="shrink-0 px-1"
        >
          <Image
            src="/Spaceman.webp"
            alt=""
            height={32}
            width={32}
            className="size-8 max-w-none rounded-full"
          />
        </Link>
        <div className="flex min-w-0 items-center">
          {portfolioSections.map((item) => {
            const active = activePath === item.path;

            return (
              <Link
                key={item.path}
                href={`${item.path}#content`}
                transitionTypes={navigationTypes(pathname, item.path)}
                aria-current={active ? "page" : undefined}
                className={`relative isolate flex min-w-0 items-center justify-center whitespace-nowrap rounded-none px-2 py-3 text-[0.6875rem] leading-[14px] text-muted-foreground no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:before:w-3 sm:before:shrink sm:before:content-[''] sm:after:w-3 sm:after:shrink sm:after:content-[''] sm:text-xs ${
                  active ? "font-semibold" : ""
                }`}
                onMouseEnter={() => setHoveredPath(item.path)}
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
                    <span className="h-[2px] w-full border border-accent bg-accent" />
                  </motion.span>
                )}
              </Link>
            );
          })}
        </div>
        <ThemeToggle />
      </nav>
    </div>
  );
}
