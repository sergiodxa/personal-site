import * as React from "react";
import clsx, { ClassValue } from "clsx";

export type CardProps = {
  children: React.ReactNode;
  className?: ClassValue;
};

export function Card({ children, className }: CardProps) {
  return (
    <section
      className={clsx(
        "border border-gray-200 shadow-lg rounded-lg p-4",
        className
      )}
    >
      {children}
    </section>
  );
}
