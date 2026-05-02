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
      whileTap={{ scale: 0.95, y: 4, x: 4, boxShadow: '0px 0px 0px rgba(0,0,0,0.8)' }}
      className={`px-8 py-3 text-white font-bold text-lg tracking-widest border-4 border-black
                  shadow-[4px_4px_0px_rgba(0,0,0,0.8)] transition-colors
                  ${isOvertime
                    ? 'bg-danger'
                    : 'bg-point'
                  }`}
    >
      {isOvertime ? '🔥 꺼내기' : '🍽️ 서빙하기'}
    </motion.button>
  );
}
