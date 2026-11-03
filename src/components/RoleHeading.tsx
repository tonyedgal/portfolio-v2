"use client";

import { LayoutGroup, motion } from "motion/react";

import TextRotate from "@/components/fancy/text/text-rotate";
import { useMotionEnabled } from "@/lib/preferences";

const spring = { type: "spring", damping: 30, stiffness: 320 } as const;

export function RoleHeading() {
  const motionEnabled = useMotionEnabled();

  return (
    <LayoutGroup>
      <motion.h2 layout className="flex flex-wrap items-baseline whitespace-pre">
        <TextRotate
          as="span"
          texts={["Frontend", "Design", "Fullstack"]}
          // a stopped rotation still reads as the first role
          auto={motionEnabled}
          // the next word rises while the last one leaves, instead of waiting for its exit to finish
          animatePresenceMode="popLayout"
          mainClassName="relative overflow-hidden"
          staggerFrom="last"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-120%" }}
          staggerDuration={0.025}
          splitLevelClassName="overflow-hidden pb-[0.15em]"
          transition={spring}
          rotationInterval={3800}
        />
        <motion.span layout transition={spring}>
          {" "}Engineer.
        </motion.span>
      </motion.h2>
    </LayoutGroup>
  );
}
