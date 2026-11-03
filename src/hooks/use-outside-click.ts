import { useEffect, useRef } from "react";

export function useOutsideClick(
  refs: React.RefObject<HTMLElement | null>[],
  onOutside: () => void,
  active = true,
  ignore?: string,
) {
  const latest = useRef(onOutside);
  latest.current = onOutside;

  useEffect(() => {
    if (!active) return;

    // the click that activated this can still be bubbling to the document
    const activatedAt = performance.now();

    // click, not pointerdown, so a touch that starts a scroll does not count
    const onClick = (event: MouseEvent) => {
      if (event.timeStamp <= activatedAt) return;

      const target = event.target as Element;

      if (ignore && target.closest?.(ignore)) return;
      if (refs.every((ref) => !ref.current?.contains(target))) latest.current();
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
    // the refs are stable objects, so only the active flag restarts the listener
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);
}
