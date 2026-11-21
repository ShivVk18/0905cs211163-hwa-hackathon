import { motion } from 'motion/react';

export function SectionHeading({
  title,
  subtitle,
  className = '',
  align = 'center',
}) {
  const textAlign = align === 'left' ? 'text-left' : 'text-center';

  return (
    <section className={`mb-12 ${textAlign} ${className}`}>
      {subtitle && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 rounded-full bg-peach px-3 py-1 text-xs font-medium text-dark-teal mb-3"
        >
          {subtitle}
        </motion.div>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="text-4xl md:text-5xl font-heading font-bold text-text tracking-tight leading-tight"
      >
        {title}
      </motion.h2>
    </section>
  );
}
