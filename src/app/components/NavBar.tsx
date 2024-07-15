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
    <div className="border rounded-md flex border-[#C9D3C3] w-fit mx-auto p-1 mb-12 sticky top-4 z-[100] bg-transparent backdrop-blur-md m-4">
      <nav className="flex gap-2 relative justify-between z-[100] rounded-lg mx-auto">
        {navItems.map((item, i) => {
          const active = pathName === item.path;

          return (
            <Link
              key={item.path}
              className={`px-3 shrink py-2 rounded-md leading-[14px] text-white text-sm lg:text-base relative no-underline duration-300 ease-in ${
                active ? "text-zinc-100 font-bold" : "font-extralight"
              }`}
              href={item.path}
              data-active={active}
              onMouseOver={() => setHoveredPath(item.path)}
              onMouseLeave={() => setHoveredPath(pathName)}
            >
              <span>{item.name}</span>
              {item.path === hoveredPath && (
                <motion.div
                  className="absolute bottom-0 left-0 h-full bg-[#677727]  mix-blend-difference rounded-sm -z-10"
                  layoutId="navbar"
                  aria-hidden="true"
                  style={{
                    width: "100%",
                  }}
                  transition={{
                    // type: "spring",
                    bounce: 0,
                    stiffness: 130,
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
                  <div className="h-[4px] w-full border rounded-full border-white bg-white"></div>
                </motion.div>
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
