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
      className={`px-8 py-3 rounded-xl text-white font-bold text-base pixel-shadow
                  ${isOvertime
                    ? 'bg-danger'
                    : 'bg-point'
                  }`}
    >
      {isOvertime ? '🔥 꺼내기' : '🍽️ 완성'}
    </motion.button>
  );
}
