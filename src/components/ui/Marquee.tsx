import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: ReactNode;
  className?: string;
  pauseOnHover?: boolean;
}

/**
 * Infinite horizontal marquee. Children are duplicated for seamless looping.
 */
export const Marquee = ({ children, className, pauseOnHover = true }: MarqueeProps) => (
  <div className={cn("group relative flex w-full overflow-hidden", className)}>
    <div
      className={cn(
        "flex shrink-0 items-center gap-8 pr-8 animate-marquee",
        pauseOnHover && "group-hover:[animation-play-state:paused]",
      )}
    >
      {children}
    </div>
    <div
      aria-hidden
      className={cn(
        "flex shrink-0 items-center gap-8 pr-8 animate-marquee",
        pauseOnHover && "group-hover:[animation-play-state:paused]",
      )}
    >
      {children}
    </div>
  </div>
);
