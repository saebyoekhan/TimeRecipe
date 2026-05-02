'use client';

import { motion } from 'framer-motion';
import { CookingRecord } from '@/lib/types';
import { RECIPES } from '@/lib/recipes';
import PixelFood from '@/components/shared/PixelFood';

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
      className="w-full max-w-sm mx-auto wood-card p-5"
    >
      {/* 음식 아이콘 + 이름 */}
      <div className="text-center mb-4">
        <div className="flex justify-center">
          <PixelFood food={record.recipeType} phase={isBurned ? 1 : 3} size={64} />
        </div>
        <p className="mt-2 text-base font-bold text-brown">{recipe.displayName}</p>
        <p className="text-xs text-brown-light/60 mt-1">{record.taskName}</p>
      </div>

      {/* 시간 비교 */}
      <div className="grid grid-cols-3 gap-4 text-center py-4 border-y-2 border-wood/20">
        <div>
          <p className="text-[10px] text-brown-light/50 mb-1">목표</p>
          <p className="text-sm font-bold text-brown">{formatTime(record.targetSeconds)}</p>
        </div>
        <div>
          <p className="text-[10px] text-brown-light/50 mb-1">실제</p>
          <p className="text-sm font-bold text-brown">{formatTime(record.actualSeconds)}</p>
        </div>
        <div>
          <p className="text-[10px] text-brown-light/50 mb-1">오차</p>
          <p className={`text-sm font-bold ${isGolden ? 'text-success' : isBurned ? 'text-danger' : 'text-point'}`}>
            {deviationSign}{formatTime(record.deviationSeconds)}
          </p>
        </div>
      </div>

      {/* 상태 */}
      <div className="text-center mt-4">
        <span className={`inline-block px-4 py-1.5 rounded-lg text-xs font-bold pixel-shadow
          ${isGolden ? 'bg-success text-white'
            : isBurned ? 'bg-danger text-white'
            : 'bg-point text-white'
          }`}
        >
          {isGolden ? '⭐ 완벽한 타이밍' : isBurned ? '🔥 타버렸어요' : '💨 아쉬워요'}
        </span>
      </div>
    </motion.div>
  );
}
