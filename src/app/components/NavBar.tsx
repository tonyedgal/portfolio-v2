"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

const navItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Projects", path: "/projects" },
  { name: "Contact", path: "/contact" },
];

export default function NavBar() {
  let pathName = usePathname() || "/";

  const [hoveredPath, setHoveredPath] = useState<string | null>(pathName);

  return (
    <div className="border rounded-xs shadow-sm flex border-border w-fit mx-auto p-1 mb-12 sticky top-4 z-100 bg-transparent backdrop-blur-md m-4">
      <nav className="flex relative justify-between z-100 rounded-lg mx-auto">
        {navItems.map((item, i) => {
          const active = pathName === item.path;

          return (
            <Link
              key={item.path}
              className={`px-5 shrink py-3 text-muted-foreground rounded-none leading-[14px] text-sm lg:text-base relative no-underline duration-300 ease-in ${
                active ? "font-medium" : ""
              }`}
              href={item.path}
              data-active={active}
              onMouseOver={() => setHoveredPath(item.path)}
              onMouseLeave={() => setHoveredPath(pathName)}
            >
              <span>{item.name}</span>
              {item.path === hoveredPath && (
                <motion.div
                  className="absolute bottom-0 left-0 h-full bg-muted  mix-blend-difference rounded-none -z-10"
                  layoutId="navbar"
                  aria-hidden="true"
                  style={{
                    width: "100%",
                  }}
                  transition={{
                    // type: "spring",
                    bounce: 0,
                    stiffness: 100,
                    damping: 10,
                    duration: 0.3,
                  }}
                />
              )}
              {active && (
                <motion.div
                  className="absolute bottom-[-6px] rounded-full left-0 right-0 px-2 flex w-full items-center justify-center"
                  transition={{ duration: 0.5 }}
                  layoutId="pill"
                >
                  <div className="h-[4px] w-full border rounded-full border-border bg-border"></div>
                </motion.div>
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
