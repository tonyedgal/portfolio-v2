"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { ThemeToggle } from "@/components/theme/ThemeToggle";

const navItems = [
  { name: "Experience", path: "/" },
  { name: "Projects", path: "/projects" },
  { name: "Blog", path: "/blog" },
  { name: "Story", path: "/story" },
];

export default function NavBar() {
  const pathname = usePathname();
  const activePath = navItems.find((item) =>
    item.path === "/" ? pathname === "/" : pathname.startsWith(item.path),
  )?.path;
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();

  return (
    <div className="mx-auto w-max shrink-0 rounded-xs border border-border bg-transparent p-1 shadow-sm backdrop-blur-md">
      <nav
        aria-label="Main navigation"
        className="relative flex items-center justify-between"
        onMouseLeave={() => setHoveredPath(null)}
      >
        <Link
          href="/"
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
        <div className="flex items-center">
          {navItems.map((item) => {
            const active = activePath === item.path;

            return (
              <Link
                key={item.path}
                href={`${item.path}#content`}
                aria-current={active ? "page" : undefined}
                className={`relative isolate shrink-0 rounded-none px-2 py-3 text-[0.6875rem] leading-[14px] text-muted-foreground no-underline duration-300 ease-in-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:px-5 sm:text-xs ${
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
                      stiffness: 100,
                      damping: 10,
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
                    transition={{ duration: reduceMotion ? 0 : 0.5 }}
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
