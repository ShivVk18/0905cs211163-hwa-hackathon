'use client';

import { motion } from 'motion/react';

export const buttonVariants = {
  primary: {
    base: 'bg-teal text-white shadow-soft hover:bg-dark-teal transition-colors duration-200',
    shadow: 'shadow-soft hover:shadow-card transition-shadow duration-200',
  },
  secondary: {
    base: 'bg-white text-teal border border-teal hover:bg-peach transition-colors duration-200',
    shadow: 'shadow-soft hover:shadow-card transition-shadow duration-200',
  },
  outline: {
    base: 'bg-transparent text-teal border border-teal hover:bg-teal hover:text-white transition-colors duration-200',
    shadow: 'none',
  },
  ghost: {
    base: 'bg-transparent text-text hover:bg-peach transition-colors duration-200',
    shadow: 'none',
  },
  coral: {
    base: 'bg-coral text-white shadow-soft hover:bg-dark-teal transition-colors duration-200',
    shadow: 'shadow-soft hover:shadow-card transition-shadow duration-200',
  },
};

const sizeStyles = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-base',
  lg: 'px-7 py-3 text-lg',
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? motion.span : motion.button;
  const styles = buttonVariants[variant];

  return (
    <Comp
      asChild={asChild}
      whileHover={!disabled ? { scale: 1.02 } : undefined}
      whileTap={!disabled ? { scale: 0.98 } : undefined}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-button font-medium transition-all duration-200 ${styles?.base ?? ''} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </Comp>
  );
}
