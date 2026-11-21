'use client';

import { motion } from 'motion/react';

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-slate-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full rounded-xl bg-white p-6 shadow-lg border border-slate-200"
      >
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Welcome</h1>
        <p className="text-slate-600 mb-4">
          Homepage running with Next.js, Tailwind CSS v4 and Motion.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-blue-600 text-white font-medium shadow hover:bg-blue-700 transition-colors"
        >
          Get Started
        </motion.button>
      </motion.div>
    </main>
  );
}
