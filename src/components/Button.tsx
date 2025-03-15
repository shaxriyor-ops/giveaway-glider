
import React from 'react';
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  className,
  variant = 'primary',
  size = 'md',
  children,
  icon,
  iconPosition = 'left',
  loading = false,
  ...props 
}) => {
  const sizeClasses = {
    sm: 'text-xs px-3 py-1.5 rounded-lg',
    md: 'text-sm px-4 py-2 rounded-xl',
    lg: 'text-base px-6 py-3 rounded-xl'
  };

  const variantClasses = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90 border-transparent shadow-md',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/90 border-transparent',
    outline: 'bg-transparent border-border hover:bg-secondary text-foreground',
    ghost: 'bg-transparent hover:bg-secondary text-foreground border-transparent'
  };

  return (
    <button
      className={cn(
        "font-medium inline-flex items-center justify-center transition-all duration-200 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/50 disabled:opacity-60 disabled:pointer-events-none",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent" />
      ) : icon && iconPosition === 'left' ? (
        <span className="mr-2">{icon}</span>
      ) : null}
      
      {children}
      
      {!loading && icon && iconPosition === 'right' ? (
        <span className="ml-2">{icon}</span>
      ) : null}
    </button>
  );
};

export default Button;
