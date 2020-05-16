import { useSSRLayoutEffect } from "hooks/use-ssr-layout-effect";

export function useLockBodyScroll(active: boolean = false): void {
  useSSRLayoutEffect(() => {
    if (!active) return;
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";
    return (): void => {
      document.body.style.overflow = originalStyle;
    };
  }, [active]);
}
