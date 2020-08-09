import * as React from "react";

export function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-prose px-2 md:px-0">{children}</div>
}
