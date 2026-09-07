"use client";

import { track } from "./gtm";
import type { CSSProperties, MouseEvent } from "react";

export function TrackLink({
  event,
  params,
  children,
  style,
  className,
  href,
  onClick,
}: {
  event: string;
  params?: Record<string, unknown>;
  children: React.ReactNode;
  style?: CSSProperties;
  className?: string;
  href: string;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
}) {
  return (
    <a
      href={href}
      style={style}
      className={className}
      onClick={() => track(event, params)}
    >
      {children}
    </a>
  );
}
