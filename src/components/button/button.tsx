'use client';

import Link from 'next/link';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'default' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  href?: string;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const variantClasses: Record<string, string> = {
  primary:
    'bg-accent text-card border border-accent hover:bg-accent-hover hover:border-accent-hover',
  secondary:
    'bg-transparent text-primary border border-border hover:border-accent hover:text-accent',
  ghost:
    'bg-transparent text-secondary border border-transparent hover:text-primary',
};

const sizeClasses: Record<string, string> = {
  sm: 'px-4 py-1.5 text-xs',
  default: 'px-6 py-2.5 text-xs',
  lg: 'px-8 py-3.5 text-sm',
};

export function Button({
  variant = 'primary',
  size = 'default',
  children,
  onClick,
  disabled = false,
  href,
  className = '',
  type = 'button',
}: ButtonProps) {
  const classes = [
    'inline-flex items-center justify-center font-body uppercase tracking-[0.2em] rounded-none transition-all duration-300 ease-out',
    variantClasses[variant],
    sizeClasses[size],
    disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (href && !disabled) {
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
