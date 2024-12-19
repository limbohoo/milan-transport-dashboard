import * as React from "react";

interface CardProps {
  className?: string;
  children?: React.ReactNode;
}

export function Card({ className = "", children }: CardProps) {
  return (
    <div
      className={`rounded-lg border bg-white shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}