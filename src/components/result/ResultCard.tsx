'use client';

import { motion } from 'framer-motion';
import { CookingRecord } from '@/lib/types';
import { RECIPES } from '@/lib/recipes';

interface ResultCardProps {
  record: CookingRecord;
}

function formatTime(seconds: number): string {
  const m = Math.floor(Math.abs(seconds) / 60);
  const s = Math.abs(seconds) % 60;
  return `${m}분 ${s}초`;
}

export default function ResultCard({ record }: ResultCardProps) {
  const recipe = RECIPES[record.recipeDuration];
  const isGolden = record.status === 'golden';
  const isBurned = record.status === 'burned';
  const deviationSign = record.deviationSeconds > 0 ? '+' : record.deviationSeconds < 0 ? '-' : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="w-full max-w-sm mx-auto bg-white rounded-2xl p-6 shadow-sm"
    >
      {/* 음식 아이콘 + 이름 */}
      <div className="text-center mb-4">
        <span className="text-4xl">{recipe.emoji}</span>
        <p className="mt-2 text-base font-medium text-neutral">{recipe.displayName}</p>
        <p className="text-xs text-neutral/40 mt-1">{record.taskName}</p>
      </div>

      {/* 시간 비교 */}
      <div className="grid grid-cols-3 gap-4 text-center py-4 border-y border-neutral/5">
        <div>
          <p className="text-[10px] text-neutral/40 mb-1">목표</p>
          <p className="text-sm font-medium">{formatTime(record.targetSeconds)}</p>
        </div>
        <div>
          <p className="text-[10px] text-neutral/40 mb-1">실제</p>
          <p className="text-sm font-medium">{formatTime(record.actualSeconds)}</p>
        </div>
        <div>
          <p className="text-[10px] text-neutral/40 mb-1">오차</p>
          <p className={`text-sm font-bold ${isGolden ? 'text-green-500' : isBurned ? 'text-red-400' : 'text-point'}`}>
            {deviationSign}{formatTime(record.deviationSeconds)}
          </p>
        </div>
      </div>

      {/* 상태 */}
      <div className="text-center mt-4">
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium
          ${isGolden ? 'bg-green-50 text-green-600'
            : isBurned ? 'bg-red-50 text-red-500'
            : 'bg-orange-50 text-point'
          }`}
        >
          {isGolden ? '완벽한 타이밍' : isBurned ? '타버렸어요' : '아쉬워요'}
        </span>
      </div>
    </motion.div>
  );
}
