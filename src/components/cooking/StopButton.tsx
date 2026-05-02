'use client';

import { motion } from 'framer-motion';

interface StopButtonProps {
  onStop: () => void;
  isOvertime: boolean;
}

export default function StopButton({ onStop, isOvertime }: StopButtonProps) {
  return (
    <motion.button
      onClick={onStop}
      whileTap={{ scale: 0.95 }}
      className={`px-8 py-3 rounded-full text-white font-medium text-base
                  shadow-lg transition-colors
                  ${isOvertime
                    ? 'bg-red-400 shadow-red-400/30'
                    : 'bg-point shadow-point/30'
                  }`}
    >
      {isOvertime ? '꺼내기' : '완성'}
    </motion.button>
  );
}
