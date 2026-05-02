'use client';

import { motion } from 'framer-motion';

export default function GoldenTimeBadge() {
  return (
    <motion.div
      className="flex flex-col items-center gap-2"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.3 }}
    >
      <motion.div
        className="text-6xl"
        animate={{ rotate: [0, -10, 10, -5, 5, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        🏆
      </motion.div>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="text-2xl font-bold text-yellow-300 text-pixel-stroke tracking-widest"
      >
        Golden Time!
      </motion.p>
    </motion.div>
  );
}
