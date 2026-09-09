"use client";

import { track } from "./gtm";
import type { CSSProperties, MouseEvent, ReactNode } from "react";

export function TrackLink({
  event,
  params,
  children,
  style,
  className,
  href,
  onClick,
  "aria-label": ariaLabel,
}: {
  event: string;
  params?: Record<string, unknown>;
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
  href: string;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
  "aria-label"?: string;
}) {
  return (
    <a
      href={href}
      style={style}
      className={className}
      aria-label={ariaLabel}
      onClick={(e) => {
        track(event, params);
        onClick?.(e);
      }}
    >
      {children}
    </a>
  );
}
