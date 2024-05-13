import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "./components/NavBar";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-gradient-to-tr overflow-x-hidden min-w-screen from-zinc-950 via-stone-900 to-neutral-950 flex min-h-screen flex-col items-center justify-between`}
      >
        <main className="p-4 py-24 gap-6 w-full lg:w-[55%]">
          <section className="flex w-full gap-4 justify-start mb-6 p-2">
            <Image
              src={"/Spaceman.jpg"}
              alt="Portrait"
              height={"96"}
              width={"96"}
              className="rounded-full shadow-lg"
            />
            <div className="flex flex-col gap-2 justify-center">
              <h2 className="font-medium text-[2rem] mb-0 text-zinc-100">
                SpaceMan
              </h2>
            </div>
          </section>
          <NavBar />
          {children}
        </main>
      </body>
    </html>
  );
}
