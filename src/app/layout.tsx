import "./globals.css";
import type { Metadata } from "next";
import {
  DM_Sans,
  Geist_Mono,
  Manrope,
  Merriweather,
  Noto_Sans,
  Oxanium,
} from "next/font/google";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { PortfolioLayout } from "@/components/PortfolioLayout";
import { cn } from "@/lib/utils";
import { siteUrl } from "@/lib/site-metadata";

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--type-geist-mono",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--type-manrope",
  display: "swap",
});

const notoSans = Noto_Sans({
  subsets: ["latin"],
  variable: "--type-noto-sans",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--type-dm-sans",
  display: "swap",
});

const oxanium = Oxanium({
  subsets: ["latin"],
  variable: "--type-oxanium",
  display: "swap",
});

const merriweather = Merriweather({
  subsets: ["latin"],
  variable: "--type-merriweather",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Experience · Tony Edgal", template: "%s · Tony Edgal" },
  description:
    "Tony Edgal is a Frontend, Design, and Fullstack Engineer building web and desktop applications with TypeScript, React, and Next.js.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        geistMono.variable,
        manrope.variable,
        notoSans.variable,
        dmSans.variable,
        oxanium.variable,
        merriweather.variable,
      )}
      suppressHydrationWarning
    >
      <body
        data-scroll-behavior="smooth"
        className={cn(
          "flex min-h-full flex-col scroll-smooth bg-background antialiased text-foreground",
          "font-sans",
          "selection:bg-accent selection:text-accent-foreground",
        )}
      >
        <ThemeProvider>
          <a
            className="fixed top-4 left-4 z-100 -translate-y-[200%] bg-background px-4 py-3 text-foreground focus:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
            href="#content"
          >
            Skip to content
          </a>
          <PortfolioLayout>{children}</PortfolioLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
