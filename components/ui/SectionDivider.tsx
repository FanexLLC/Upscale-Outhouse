import React from "react";

interface SectionDividerProps {
  className?: string;
  variant?: "line" | "flourish";
}

export default function SectionDivider({
  className = "",
  variant = "line",
}: SectionDividerProps) {
  if (variant === "flourish") {
    return (
      <div
        className={`flex items-center justify-center gap-4 my-lg ${className}`}
        role="separator"
      >
        <span
          className="h-px flex-1 max-w-[120px]"
          style={{ background: "var(--gradient-gold)" }}
        />
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-gold-primary"
          aria-hidden="true"
        >
          <path
            d="M12 2L14.09 8.26L20.18 8.64L15.54 12.74L17.09 18.82L12 15.4L6.91 18.82L8.46 12.74L3.82 8.64L9.91 8.26L12 2Z"
            fill="currentColor"
            opacity="0.6"
          />
        </svg>
        <span
          className="h-px flex-1 max-w-[120px]"
          style={{ background: "var(--gradient-gold)" }}
        />
      </div>
    );
  }

  return (
    <div
      className={`h-px w-full my-lg ${className}`}
      style={{ background: "var(--gradient-gold)" }}
      role="separator"
    />
  );
}
