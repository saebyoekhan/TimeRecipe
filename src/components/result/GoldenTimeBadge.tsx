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
        animate={{ rotate: [0, -10, 10, -5, 5, 0] }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        ⭐
      </motion.div>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="text-xl font-bold text-point-dark"
      >
        Golden Time!
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-sm text-brown-light/60"
      >
        완벽한 타이밍이에요
      </motion.p>
    </motion.div>
  );
}
