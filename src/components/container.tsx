import * as React from "react";

export function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-screen-lg px-4 lg:px-0">{children}</div>
}
