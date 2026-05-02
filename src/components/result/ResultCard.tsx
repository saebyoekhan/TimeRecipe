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

const cardConfig = {
  golden: {
    title: '⭐ PERFECT CLEAR! ⭐',
    titleColor: 'text-yellow-300',
    border: 'border-yellow-500',
    bg: 'bg-gradient-to-b from-yellow-950/90 to-black/90',
    glow: 'shadow-[8px_8px_0px_rgba(0,0,0,0.8),0_0_40px_rgba(255,200,0,0.15)]',
    divider: 'border-yellow-700/50',
    diffColor: 'text-yellow-300',
    badgeClass: 'bg-yellow-600 text-white',
    badgeText: '⭐ 완벽한 타이밍!',
  },
  done: {
    title: 'STAGE COMPLETE',
    titleColor: 'text-wood-light',
    border: 'border-wood-dark',
    bg: 'bg-black/90',
    glow: 'shadow-[8px_8px_0px_rgba(0,0,0,0.8)]',
    divider: 'border-wood-dark',
    diffColor: 'text-point',
    badgeClass: 'bg-point text-white',
    badgeText: '',
  },
  burned: {
    title: '🔥 BURNED... 🔥',
    titleColor: 'text-red-400',
    border: 'border-red-800',
    bg: 'bg-gradient-to-b from-red-950/90 to-black/90',
    glow: 'shadow-[8px_8px_0px_rgba(0,0,0,0.8),0_0_30px_rgba(200,0,0,0.12)]',
    divider: 'border-red-900/50',
    diffColor: 'text-red-400',
    badgeClass: 'bg-danger text-white',
    badgeText: '🔥 너무 오래 걸렸어요',
  },
  abandoned: {
    title: '⏸️ ABANDONED',
    titleColor: 'text-gray-400',
    border: 'border-gray-600',
    bg: 'bg-gradient-to-b from-gray-900/90 to-black/90',
    glow: 'shadow-[8px_8px_0px_rgba(0,0,0,0.8)]',
    divider: 'border-gray-700/50',
    diffColor: 'text-gray-400',
    badgeClass: 'bg-gray-600 text-gray-200',
    badgeText: '⏸️ 방치됨',
  },
};

export default function ResultCard({ record }: ResultCardProps) {
  const recipe = RECIPES[record.recipeDuration];
  const isGolden = record.status === 'golden';
  const isBurned = record.status === 'burned' || record.status === 'abandoned';
  const config = cardConfig[record.status];
  const deviationSign = record.deviationSeconds > 0 ? '+' : record.deviationSeconds < 0 ? '-' : '';

  // done 상태 뱃지 텍스트 동적 결정
  const badgeText = config.badgeText || (
    record.deviationSeconds < 0 ? '⏱️ 일찍 끝냈어요' : '💨 조금 더 걸렸어요'
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.2 }}
      className={`w-full max-w-sm mx-auto ${config.bg} border-4 ${config.border} p-6 ${config.glow} relative overflow-hidden`}
    >
      {/* Golden 반짝임 */}
      {isGolden && (
        <div className="absolute inset-0 pointer-events-none">
          {[
            { top: '8%', left: '10%', size: 10, delay: 0 },
            { top: '15%', right: '12%', size: 8, delay: 0.5 },
            { top: '50%', left: '8%', size: 6, delay: 1.0 },
            { top: '45%', right: '10%', size: 10, delay: 1.5 },
          ].map((s, i) => (
            <motion.div
              key={i}
              className="absolute text-yellow-300"
              style={{ top: s.top, left: 'left' in s ? s.left : undefined, right: 'right' in s ? s.right : undefined, fontSize: s.size }}
              animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 2, repeat: Infinity, delay: s.delay }}
            >
              ✦
            </motion.div>
          ))}
        </div>
      )}

      {/* 타이틀 */}
      <div className="text-center mb-6">
        <h2 className={`text-2xl font-bold tracking-widest text-pixel-stroke ${config.titleColor}`}>
          {config.title}
        </h2>
      </div>

      {/* 음식 아이콘 + 이름 */}
      <div className={`text-center mb-6 ${isBurned ? 'opacity-60' : ''}`}>
        <div className="flex justify-center mb-3">
          <PixelFood food={record.recipeType} phase={isBurned ? 1 : 3} size={80} />
        </div>
        <p className="text-lg font-bold text-cream tracking-widest">{recipe.displayName}</p>
        <p className="text-sm text-wood-light mt-1">&quot;{record.taskName}&quot;</p>
      </div>

      {/* 시간 비교 */}
      <div className={`grid grid-cols-3 gap-2 text-center py-4 border-y-4 ${config.divider} bg-black/40`}>
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
          <p className={`text-sm font-bold tracking-widest ${config.diffColor}`}>
            {deviationSign}{formatTime(record.deviationSeconds)}
          </p>
        </div>
      </div>

      {/* 상태 메세지 */}
      <div className="text-center mt-6">
        <span className={`inline-block px-4 py-2 text-sm font-bold border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,0.8)] ${config.badgeClass}`}>
          {badgeText}
        </span>
      </div>
    </motion.div>
  );
}
