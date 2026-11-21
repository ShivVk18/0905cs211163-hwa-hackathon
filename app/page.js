'use client';

import { motion } from 'motion/react';
import { Button } from '@/components/Button';

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full rounded-card bg-white p-6 shadow-card border border-peach/50"
      >
        <h1 className="text-2xl font-heading font-bold text-text mb-2">AwayStack</h1>
        <p className="text-text/70 mb-4">
          Hero section coming next.
        </p>
        <Button variant="primary" size="md">
          Shop now
        </Button>
      </motion.div>
    </main>
  );
}
