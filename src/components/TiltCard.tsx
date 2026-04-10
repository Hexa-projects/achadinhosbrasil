import { type ReactNode } from "react";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
}

const TiltCard = ({ children, className = "" }: TiltCardProps) => (
  <div className={`bg-card rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow duration-300 ${className}`}>
    {children}
  </div>
);

export default TiltCard;
