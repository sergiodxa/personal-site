import { ReactNode } from "react";

export function DesktopOnly({ children }: { children: ReactNode }) {
  return (
    <div className="hidden md:block">
      {children}
    </div>
  )
}

export function MobileOnly({ children }: { children: ReactNode }) {
  return (
    <div className="md:hidden">
      {children}
    </div>
  )
}
