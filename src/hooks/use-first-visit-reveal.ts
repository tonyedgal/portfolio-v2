import { useEffect, useRef } from "react";

const seenKey = "portfolio-settings-seen";
// counted from the start of the page load, because the bar already shows from the first paint
const showUntilMs = 5000;
// a slow load leaves this much time after the page starts to respond
const minShowAfterReadyMs = 2500;
// a hash link or restored scroll position can move the page a little after load
const closeAfterScrollPx = 40;

// on a first visit the pre-paint script marks the root with data-reveal, which shows the settings bar
// before this code loads. this hook takes it over, records the visit, and closes the bar by itself unless
// the visitor starts to use it. call the returned function to cancel
export function useFirstVisitReveal(
  panel: React.RefObject<HTMLElement | null>,
  open: boolean,
  setOpen: (open: boolean) => void,
) {
  const cancel = useRef(() => {});

  useEffect(() => {
    const root = document.documentElement;
    if (!("reveal" in root.dataset)) return;

    try {
      localStorage.setItem(seenKey, "1");
    } catch {}

    const element = panel.current;
    const startY = window.scrollY;
    let closeTimer = 0;

    // a page opened in a background tab waits until the visitor looks at it
    const startTimer = () => {
      if (document.hidden) return;
      document.removeEventListener("visibilitychange", startTimer);
      const showFor = Math.max(showUntilMs - performance.now(), minShowAfterReadyMs);
      closeTimer = window.setTimeout(close, showFor);
    };

    const stop = () => {
      window.clearTimeout(closeTimer);
      document.removeEventListener("visibilitychange", startTimer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKeyDown);
      element?.removeEventListener("pointerenter", stop);
      element?.removeEventListener("focusin", stop);
      delete root.dataset.reveal;
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

    setOpen(true);
    document.addEventListener("visibilitychange", startTimer);
    startTimer();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKeyDown);
    // a visitor who points at or tabs into the bar keeps it open until they close it
    element?.addEventListener("pointerenter", stop);
    element?.addEventListener("focusin", stop);

    cancel.current = stop;
    return stop;
    // the ref and setter are stable, so this runs once per page load
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // once the bar's own state is open the mark is not needed, so a close from anywhere else, such as an
  // outside click, hides the bar at once and ends the reveal
  const wasOpen = useRef(false);
  useEffect(() => {
    if (open) delete document.documentElement.dataset.reveal;
    else if (wasOpen.current) cancel.current();
    wasOpen.current = open;
  }, [open]);

  return () => cancel.current();
}
