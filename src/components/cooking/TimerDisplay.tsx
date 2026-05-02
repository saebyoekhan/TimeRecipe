'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface TimerDisplayProps {
  elapsedSeconds: number;
  targetSeconds: number;
  isOvertime: boolean;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

export default function TimerDisplay({ elapsedSeconds, targetSeconds, isOvertime }: TimerDisplayProps) {
  const [visible, setVisible] = useState(false);
  const remaining = Math.max(targetSeconds - elapsedSeconds, 0);

  return (
    <div className="flex flex-col items-center gap-3">
      {/* 토글 버튼 */}
      <button
        onClick={() => setVisible(!visible)}
        className="text-xs px-4 py-1.5 rounded-lg bg-wood/20 text-brown-light font-medium
                   hover:bg-wood/30 transition-colors pixel-shadow"
      >
        {visible ? '⏱️ 시간 숨기기' : '⏱️ 시간 보기'}
      </button>

      {/* 타이머 숫자 (나무 프레임) */}
      <motion.div
        animate={{
          opacity: visible ? 1 : 0,
          filter: visible ? 'blur(0px)' : 'blur(8px)',
        }}
        transition={{ duration: 0.4 }}
        className="wood-card px-6 py-2"
      >
        <span className={`font-mono text-3xl font-bold tracking-wider
          ${isOvertime ? 'text-danger' : 'text-brown'}`}
        >
          {isOvertime ? '+' : ''}{formatTime(isOvertime ? elapsedSeconds - targetSeconds : remaining)}
        </span>
      </motion.div>
    </div>
  );
}
