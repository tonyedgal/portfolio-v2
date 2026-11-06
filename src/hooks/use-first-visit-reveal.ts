import { useEffect, useRef } from "react";

const seenKey = "portfolio-settings-seen";
const openDelayMs = 1000;
const showForMs = 3000;
// a hash link or restored scroll position can move the page a little after load
const closeAfterScrollPx = 40;

// opens the settings bar once on a first visit, so visitors learn where the off switches are.
// it closes by itself unless the visitor starts to use it; call the returned function to cancel
export function useFirstVisitReveal(
  panel: React.RefObject<HTMLElement | null>,
  setOpen: (open: boolean) => void,
) {
  const cancel = useRef(() => {});

  useEffect(() => {
    try {
      if (localStorage.getItem(seenKey)) return;
    } catch {
      // without storage the flag cannot be saved, and the bar would open on every visit
      return;
    }

    let closeTimer = 0;
    let startY = 0;
    const element = panel.current;

    const stop = () => {
      window.clearTimeout(closeTimer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKeyDown);
      element?.removeEventListener("pointerenter", stop);
      element?.removeEventListener("focusin", stop);
    };
    const close = () => {
      stop();
      setOpen(false);
    };
    function onScroll() {
      if (Math.abs(window.scrollY - startY) > closeAfterScrollPx) close();
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") close();
    }

    const openTimer = window.setTimeout(() => {
      try {
        localStorage.setItem(seenKey, "1");
      } catch {}
      setOpen(true);
      startY = window.scrollY;
      closeTimer = window.setTimeout(close, showForMs);
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("keydown", onKeyDown);
      // a visitor who points at or tabs into the bar keeps it open until they close it
      element?.addEventListener("pointerenter", stop);
      element?.addEventListener("focusin", stop);
    }, openDelayMs);

    cancel.current = () => {
      window.clearTimeout(openTimer);
      stop();
    };

    return cancel.current;
    // the ref and setter are stable, so this runs once per page load
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return () => cancel.current();
}
