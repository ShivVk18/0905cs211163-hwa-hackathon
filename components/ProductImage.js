import { motion } from 'motion/react';

export function ProductImage({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false,
  animate = true,
}) {
  return (
    <motion.div
      initial={animate ? { opacity: 0, scale: 0.95 } : undefined}
      animate={animate ? { opacity: 1, scale: 1 } : undefined}
      transition={{ duration: 0.5 }}
      className={`overflow-hidden rounded-card bg-white shadow-card border border-peach/40 ${className}`}
    >
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        className="block w-full h-full object-cover transition-transform duration-500 hover:scale-105 group-hover:scale-105"
      />
    </motion.div>
  );
}
