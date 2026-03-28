import React from "react";

interface GoldShimmerProps {
  width?: string | number;
  height?: string | number;
  className?: string;
  rounded?: boolean;
}

export default function GoldShimmer({
  width = "100%",
  height = "20px",
  className = "",
  rounded = false,
}: GoldShimmerProps) {
  return (
    <div
      className={`gold-shimmer-bg ${rounded ? "rounded-full" : "rounded-card"} ${className}`}
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
        opacity: 0.15,
      }}
      aria-hidden="true"
    />
  );
}
