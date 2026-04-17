import { forwardRef, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ShimmerButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  size?: "default" | "lg";
}

export const ShimmerButton = forwardRef<HTMLButtonElement, ShimmerButtonProps>(
  ({ children, className, size = "default", ...props }, ref) => {
    const heightClass = size === "lg" ? "h-14" : "h-12";
    return (
      <button
        ref={ref}
        className={cn(
          "relative inline-flex overflow-hidden rounded-full p-[1.5px] focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background scale-100 hover:scale-[1.03] active:scale-[0.98] transition-transform duration-300 shadow-[0_0_40px_-10px_hsl(239_84%_67%/0.6)] disabled:opacity-70 disabled:hover:scale-100",
          heightClass,
          className,
        )}
        {...props}
      >
        <span className="absolute inset-[-1000%] animate-[spin-slow_2.5s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#A5B4FC_0%,#6366F1_25%,#A78BFA_50%,#6366F1_75%,#A5B4FC_100%)]" />
        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-zinc-950 px-7 text-sm sm:text-base font-semibold text-white backdrop-blur-3xl">
          {children}
        </span>
      </button>
    );
  },
);
ShimmerButton.displayName = "ShimmerButton";
