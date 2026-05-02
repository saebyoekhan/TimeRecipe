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
    <div className="flex flex-col items-center gap-3 w-full">
      {/* 토글 버튼 */}
      <button
        onClick={() => setVisible(!visible)}
        className="text-xs px-4 py-2 border-2 border-wood-dark bg-wood text-cream font-bold tracking-widest
                   hover:bg-wood-light transition-colors shadow-[2px_2px_0px_rgba(0,0,0,0.6)]"
      >
        {visible ? '⏱️ 시간 숨기기' : '⏱️ 시간 보기'}
      </button>

      {/* 타이머 숫자 (아케이드 전광판 스타일) */}
      <motion.div
        animate={{
          opacity: visible ? 1 : 0,
          y: visible ? 0 : 10,
          scale: visible ? 1 : 0.9,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="bg-black/90 px-8 py-3 border-4 border-wood-dark shadow-[6px_6px_0px_rgba(0,0,0,0.8)]"
      >
        <span className={`text-5xl font-bold tracking-widest text-pixel-stroke
          ${isOvertime ? 'text-danger' : 'text-yellow-400'}`}
        >
          {isOvertime ? '+' : ''}{formatTime(isOvertime ? elapsedSeconds - targetSeconds : remaining)}
        </span>
      </motion.div>
    </div>
  );
}
