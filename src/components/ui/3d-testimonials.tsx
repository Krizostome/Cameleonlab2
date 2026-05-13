"use client";

import React from "react";

interface MarqueeProps {
  vertical?: boolean;
  reverse?: boolean;
  pauseOnHover?: boolean;
  repeat?: number;
  className?: string;
  duration?: number;
  children?: React.ReactNode;
}

export default function Marquee({
  vertical = false,
  reverse = false,
  pauseOnHover = false,
  repeat = 2,
  className,
  duration = 30,
  children,
}: MarqueeProps) {
  const animationClass = vertical
    ? reverse
      ? "animate-marquee-vertical-reverse"
      : "animate-marquee-vertical"
    : reverse
      ? "animate-marquee-single-reverse"
      : "animate-marquee-single";

  return (
    <div
      className={[
        "flex overflow-hidden",
        vertical ? "flex-col" : "flex-row",
        pauseOnHover ? "marquee-pause-on-hover" : "",
        className || "",
      ].join(" ")}
      style={{ "--duration": `${duration}s` } as React.CSSProperties}
    >
      <div
        className={[
          "marquee-track flex shrink-0",
          vertical ? "flex-col" : "flex-row",
          animationClass,
        ].join(" ")}
      >
        {Array.from({ length: repeat }).map((_, i) => (
          <div
            key={i}
            className={
              vertical
                ? "flex flex-col gap-3 md:gap-4"
                : "flex flex-row"
            }
          >
            {children}
          </div>
        ))}
      </div>
    </div>
  );
}
