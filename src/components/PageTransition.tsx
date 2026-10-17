import { ViewTransition } from "react";

const navigationSlide = {
  "nav-forward": "nav-forward",
  "nav-back": "nav-back",
  default: "none",
};

export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition default="none" enter={navigationSlide} exit={navigationSlide}>
      {children}
    </ViewTransition>
  );
}
