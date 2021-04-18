import { ReactNode } from "react";

export function Container({ children }: { children: ReactNode }) {
  return <div className="mx-auto max-w-screen-lg px-4 xl:px-0">{children}</div>;
}
