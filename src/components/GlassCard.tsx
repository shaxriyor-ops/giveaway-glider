
import React from 'react';
import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  withHover?: boolean;
  children: React.ReactNode;
  variant?: 'default' | 'dark';
}

const GlassCard: React.FC<GlassCardProps> = ({ 
  className,
  withHover = false,
  children,
  variant = 'default',
  ...props 
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl p-6 transition-all duration-300 animate-fade-in",
        variant === 'default' ? 'glass' : 'glass-dark',
        withHover && "hover:shadow-xl hover:translate-y-[-2px]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default GlassCard;
