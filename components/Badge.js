export function Badge({
  children,
  variant = 'teal',
  className = '',
  size = 'md',
}) {
  const variants = {
    teal: 'bg-teal text-white',
    dark: 'bg-dark-teal text-white',
    peach: 'bg-peach text-dark-teal',
    coral: 'bg-coral text-white',
    yellow: 'bg-yellow text-dark-teal',
    lavender: 'bg-lavender text-dark-teal',
    outline: 'border border-teal text-teal bg-transparent',
  };

  const sizes = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-1',
    lg: 'text-base px-3 py-1.5',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full font-medium ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </span>
  );
}
