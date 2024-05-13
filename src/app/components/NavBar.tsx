"use client";

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
  let pathname = usePathname() || "/";

  return (
    <div className="border-b-4 border-stone-800 p-[0.4rem] mb-12 sticky top-4 z-[100] bg-stone-900/10 backdrop-blur-md m-4">
      <nav className="flex gap-2 relative justify-start z-[100] rounded-lg">
        {navItems.map((item, i) => {
          const active = pathname === item.path;

          return (
            <Link
              key={item.path}
              className={`mx-4 shrink py-2 rounded-md text-sm lg:text-base relative no-underline duration-300 ease-in ${
                active ? "text-zinc-100" : "text-zinc-400"
              }`}
              href={item.path}
            >
              <span>{item.name}</span>
              {active && (
                <div className=" bottom-0 left-0 right-0 flex w-full items-center justify-center">
                  <div className="h-1 w-full border border-white bg-white"></div>
                </div>
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
