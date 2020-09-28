import * as React from "react";

export function Header({ children }: { children: React.ReactNode }) {
  return <header className="bg-white">{children}</header>
}
