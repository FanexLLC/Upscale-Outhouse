import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({
  children,
  className = "",
  hover = true,
  ...rest
}: CardProps) {
  return (
    <div
      className={[
        "bg-bg-secondary rounded-card p-xl",
        "border border-[rgba(201,168,76,0.15)]",
        "shadow-card",
        "transition-all duration-300 ease-out",
        hover && "hover:border-[rgba(201,168,76,0.4)] hover:shadow-card-hover",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {children}
    </div>
  );
}
