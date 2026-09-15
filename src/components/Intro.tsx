import Image from "next/image";
import { ArrowUpRight, FileText, Mail } from "lucide-react";

import {
  GitHubIcon,
  LinkedInIcon,
  TwitterIcon,
} from "@/components/icons/SocialIcons";
import IntroContent from "@/content/intro.mdx";

export default function Intro() {
  return (
    <section aria-label="About Tony">
        <Image
          src="/Spaceman.webp"
          alt="Spaceman, Tony’s avatar"
          width={64}
          height={64}
          priority
          className="h-12 w-12 rounded-full sm:h-16 sm:w-16"
        />
        <div className="typography intro-copy mt-8">
          <IntroContent />
        </div>
        <a
          href="mailto:tonyedgal@gmail.com"
          className="mt-8 inline-flex min-h-11 items-center gap-2 text-sm font-medium underline decoration-border underline-offset-4 hover:decoration-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
        >
          <Mail size={16} aria-hidden="true" /> Get in touch <ArrowUpRight size={15} aria-hidden="true" />
        </a>
        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm [color:color-mix(in_oklch,var(--muted-foreground)_88%,var(--foreground))]">
          <a href="https://github.com/tonyedgal" className="inline-flex min-h-11 items-center gap-2 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
            <GitHubIcon className="size-4" /> GitHub
          </a>
          <a href="https://www.linkedin.com/in/anthony-edgal-8ba13715b/" className="inline-flex min-h-11 items-center gap-2 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
            <LinkedInIcon className="size-4" /> LinkedIn
          </a>
          <a href="https://x.com/TonyEdgal" className="inline-flex min-h-11 items-center gap-2 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
            <TwitterIcon className="size-4" /> Twitter
          </a>
          <a href="/Tony-Resume-Fullstack.pdf" className="inline-flex min-h-11 items-center gap-2 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
            <FileText className="size-4" aria-hidden="true" /> Résumé <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </div>
    </section>
  );
}
