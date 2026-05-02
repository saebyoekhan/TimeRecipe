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
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.2 }}
      className="w-full max-w-sm mx-auto bg-black/90 border-4 border-wood-dark p-6 shadow-[8px_8px_0px_rgba(0,0,0,0.8)]"
    >
      {/* 타이틀 (클리어 여부) */}
      <div className="text-center mb-6">
        <h2 className={`text-2xl font-bold tracking-widest text-pixel-stroke
          ${isGolden ? 'text-yellow-400' : isBurned ? 'text-danger' : 'text-wood-light'}`}>
          {isGolden ? 'LEVEL CLEAR!' : isBurned ? 'GAME OVER...' : 'STAGE COMPLETE'}
        </h2>
      </div>

      {/* 음식 아이콘 + 이름 */}
      <div className="text-center mb-6">
        <div className="flex justify-center mb-3">
          <PixelFood food={record.recipeType} phase={isBurned ? 1 : 3} size={80} />
        </div>
        <p className="text-lg font-bold text-cream tracking-widest">{recipe.displayName}</p>
        <p className="text-sm text-wood-light mt-1">{record.taskName}</p>
      </div>

      {/* 시간 비교 */}
      <div className="grid grid-cols-3 gap-2 text-center py-4 border-y-4 border-wood-dark bg-black/50">
        <div>
          <p className="text-xs text-wood-light mb-1">TARGET</p>
          <p className="text-sm font-bold text-cream tracking-widest">{formatTime(record.targetSeconds)}</p>
        </div>
        <div>
          <p className="text-xs text-wood-light mb-1">ACTUAL</p>
          <p className="text-sm font-bold text-cream tracking-widest">{formatTime(record.actualSeconds)}</p>
        </div>
        <div>
          <p className="text-xs text-wood-light mb-1">DIFF</p>
          <p className={`text-sm font-bold tracking-widest ${isGolden ? 'text-success' : isBurned ? 'text-danger' : 'text-point'}`}>
            {deviationSign}{formatTime(record.deviationSeconds)}
          </p>
        </div>
      </div>

      {/* 상태 메세지 */}
      <div className="text-center mt-6">
        <span className={`inline-block px-4 py-2 text-sm font-bold border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,0.8)]
          ${isGolden ? 'bg-success text-white'
            : isBurned ? 'bg-danger text-white'
            : 'bg-point text-white'
          }`}
        >
          {isGolden ? '⭐ 완벽한 타이밍' : isBurned ? '🔥 너무 오래 걸렸어요' : '💨 아슬아슬했어요'}
        </span>
      </div>
    </motion.div>
  );
}
