'use client';

import { motion } from 'motion/react';

export function PawCertifiedSeal({ className = '' }) {
  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      <div className="relative w-24 h-24 rounded-full border-4 border-teal bg-white flex items-center justify-center shadow-[0_4px_12px_rgba(16,59,56,0.15)]">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-20 h-20 rounded-full border-2 border-teal/30 bg-teal/5 flex items-center justify-center"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-teal">
            <path d="M12 18c-3 0-4-2-4-4s1-4 4-4 4 2 4 4-1 4-4 4Z" />
            <path d="M7 12c-1 0-2-1-2-2s1-2 2-2 2 1 2 2-1 2-2 2Z" />
            <path d="M17 12c-1 0-2-1-2-2s1-2 2-2 2 1 2 2-1 2-2 2Z" />
            <path d="M9 6c-1 0-2-1-2-2s1-2 2-2 2 1 2 2-1 2-2 2Z" />
            <path d="M15 6c-1 0-2-1-2-2s1-2 2-2 2 1 2 2-1 2-2 2Z" />
          </svg>
        </motion.div>
      </div>
      <p className="text-[10px] font-bold text-dark-teal tracking-wider uppercase">PAW CERTIFIED</p>
      <p className="text-[9px] font-medium text-dark-teal/70 tracking-wider uppercase">Approved with love for happier paws.</p>
    </div>
  );
}
