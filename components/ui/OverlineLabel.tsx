import React from "react";

interface OverlineLabelProps {
  children: React.ReactNode;
  className?: string;
}

export default function OverlineLabel({
  children,
  className = "",
}: OverlineLabelProps) {
  return (
    <span
      className={`font-accent uppercase tracking-[0.2em] text-overline text-gold-primary ${className}`}
    >
      {children}
    </span>
  );
}
