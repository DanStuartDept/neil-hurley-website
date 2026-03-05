'use client';

import Link from 'next/link';

/**
 * Props for the Button component.
 */
interface ButtonProps {
  /** Visual style variant. */
  variant?: 'primary' | 'secondary' | 'ghost';
  /** Size preset controlling padding and font size. */
  size?: 'sm' | 'default' | 'lg';
  /** Button content. */
  children: React.ReactNode;
  /** Click handler. */
  onClick?: () => void;
  /** Whether the button is disabled. */
  disabled?: boolean;
  /** If provided, renders as a Next.js Link instead of a button. */
  href?: string;
  /** Additional CSS classes. */
  className?: string;
  /** HTML button type attribute. */
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

/**
 * A polymorphic button that renders as a link when `href` is provided.
 *
 * @example
 * <Button variant="primary" size="default">Click me</Button>
 */
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
    'inline-flex items-center justify-center font-body uppercase tracking-[0.2em] rounded-none transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
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
