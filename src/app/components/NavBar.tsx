"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const navItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Projects", path: "/projects" },
  { name: "Contact", path: "/contact" },
];

export default function NavBar() {
  let pathname = usePathname() || "/";

  return (
    <div className="border border-stone-800/90 p-[0.4rem] rounded-lg mb-12 sticky top-4 z-[100] bg-stone-900/10 backdrop-blur-md m-4">
      <nav className="flex gap-2 relative justify-start z-[100] rounded-lg">
        {navItems.map((item, i) => {
          const active = pathname === item.path;

          return (
            <Link
              key={item.path}
              className={`px-4 py-2 rounded-md text-sm lg:text-base relative no-underline duration-300 ease-in ${
                active ? "text-zinc-100" : "text-zinc-400"
              }`}
              href={item.path}
            >
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
