import * as React from "react";

export function DesktopOnly({ children }: { children: React.ReactNode }) {
  return (
    <div className="hidden md:block">
      {children}
    </div>
  )
}

export function MobileOnly({ children }: { children: React.ReactNode }) {
  return (
    <div className="md:hidden">
      {children}
    </div>
  )
}
