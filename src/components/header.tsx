import * as React from "react";

export function Header({ children }: { children: React.ReactNode }) {
  return <header className="bg-gray-900 pb-8">{children}</header>
}
