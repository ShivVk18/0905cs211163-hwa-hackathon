'use client';

import { motion } from 'motion/react';

export function AnnouncementBar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="bg-dark-teal px-4 py-2.5 text-center text-white"
    >
      <p className="text-[11px] leading-5 font-body sm:text-xs md:text-sm">
        <span className="whitespace-nowrap">Free delivery across India</span>
        <span className="mx-1.5 text-white/45" aria-hidden="true">
          ·
        </span>
        <span className="whitespace-nowrap">Cash on delivery</span>
        <span className="mx-1.5 text-white/45" aria-hidden="true">
          ·
        </span>
        <span className="whitespace-nowrap">30-day returns</span>
      </p>
    </motion.div>
  );
}

export default AnnouncementBar;
