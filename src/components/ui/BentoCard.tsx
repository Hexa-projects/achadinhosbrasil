import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BentoCardProps {
  title?: string;
  description?: string;
  icon?: ReactNode;
  className?: string;
  children?: ReactNode;
}

export const BentoCard = ({ title, description, icon, className, children }: BentoCardProps) => (
  <div
    className={cn(
      "relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-7 md:p-8 backdrop-blur-md transition-all duration-500 hover:bg-white/[0.06] hover:border-white/20 hover:-translate-y-1 group",
      className,
    )}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    <div className="relative z-10 h-full flex flex-col">
      {icon && (
        <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.06] text-primary shadow-[0_0_20px_-3px_hsl(239_84%_67%/0.5)] group-hover:scale-110 group-hover:text-violet-300 transition-all duration-500 self-start">
          {icon}
        </div>
      )}
      {title && (
        <h3 className="mb-2 text-xl md:text-2xl font-bold tracking-tight text-white">{title}</h3>
      )}
      {description && (
        <p className="text-slate-400 leading-relaxed font-light text-sm md:text-base">{description}</p>
      )}
      {children}
    </div>
  </div>
);
