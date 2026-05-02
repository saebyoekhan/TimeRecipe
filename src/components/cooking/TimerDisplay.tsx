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
        className="text-xs px-4 py-1.5 rounded-full bg-neutral/5 text-neutral/40
                   hover:bg-neutral/10 transition-colors"
      >
        {visible ? '시간 숨기기' : '시간 보기'}
      </button>

      {/* 타이머 숫자 */}
      <motion.div
        animate={{
          opacity: visible ? 1 : 0,
          filter: visible ? 'blur(0px)' : 'blur(8px)',
        }}
        transition={{ duration: 0.4 }}
        className="font-mono text-4xl font-light tracking-wider"
      >
        <span className={isOvertime ? 'text-red-400' : 'text-neutral/70'}>
          {isOvertime ? '+' : ''}{formatTime(isOvertime ? elapsedSeconds - targetSeconds : remaining)}
        </span>
      </motion.div>
    </div>
  );
}
