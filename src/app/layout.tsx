import "./globals.css";
import type { Metadata } from "next";
import { Manrope, Noto_Sans, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { PortfolioLayout } from "@/components/PortfolioLayout";
import { cn } from "@/lib/utils";
import { siteUrl } from "@/lib/site-metadata";

const manropeHeading = Manrope({
  subsets: ["latin"],
  variable: "--font-heading",
});

const notoSans = Noto_Sans({ subsets: ["latin"], variable: "--font-sans" });

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
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
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body
        data-scroll-behavior="smooth"
        className={cn(
          "flex min-h-full flex-col scroll-smooth bg-background antialiased text-foreground",
          fontMono.variable,
          "font-sans",
          notoSans.variable,
          manropeHeading.variable,
          "selection:bg-accent selection:text-accent-foreground",
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
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
