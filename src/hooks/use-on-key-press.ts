import { useCallback, useEffect } from "react";

export function useOnKeyPress(
  key: string,
  handler: (event: KeyboardEvent) => void
): void {
  const listener = useCallback((event) => event.key === key && handler(event), [
    key,
    handler,
  ]);

  useEffect(() => {
    document.addEventListener("keydown", listener);
    return (): void => {
      document.removeEventListener("keydown", listener);
    };
  }, [listener]);
}
