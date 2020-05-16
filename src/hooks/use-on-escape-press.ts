import { useOnKeyPress } from "hooks/use-on-key-press";

export function useOnEscapePress(
  handler: (event: KeyboardEvent) => void,
): void {
  useOnKeyPress("Escape", handler);
}
