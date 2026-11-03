import Intro from "@/components/Intro";
import NavBar from "@/components/NavBar";
import { PortfolioShell } from "@/components/layout/PortfolioShell";
import { SidebarProvider } from "@/components/layout/SidebarProvider";
import { cn } from "@/lib/utils";

export function ContentWrapper({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className="px-6 sm:px-10 md:px-12 lg:pr-12 lg:pl-14 xl:pl-48 2xl:pr-16">
      <div className={cn(className)} {...props} />
    </div>
  );
}

export function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <PortfolioShell intro={<Intro />} nav={<NavBar />}>
        <main
          id="content"
          tabIndex={-1}
          className="min-h-svh space-y-20 pt-6 pb-[calc(var(--mobile-nav-height)+2rem)] focus:outline-none sm:space-y-32 sm:pt-10 lg:min-h-0 lg:pt-20 lg:pb-36 xl:pt-32 xl:pb-40"
        >
          {children}
        </main>
      </PortfolioShell>
    </SidebarProvider>
  );
}
