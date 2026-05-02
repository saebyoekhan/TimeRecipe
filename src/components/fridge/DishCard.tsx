'use client';

import { motion } from 'framer-motion';
import { CookingRecord } from '@/lib/types';
import { RECIPES } from '@/lib/recipes';
import PixelFood from '@/components/shared/PixelFood';

interface DishCardProps {
  record: CookingRecord;
  index: number;
}

function formatGap(seconds: number): string {
  const sign = seconds > 0 ? '+' : seconds < 0 ? '-' : '';
  const abs = Math.abs(seconds);
  const m = Math.floor(abs / 60);
  const s = abs % 60;
  if (m === 0) return `${sign}${s}초`;
  if (s === 0) return `${sign}${m}분`;
  return `${sign}${m}분${s}초`;
}

const cardStyles = {
  golden: {
    border: 'border-yellow-500/80',
    bg: 'bg-yellow-900/40',
    glow: 'shadow-[3px_3px_0px_rgba(0,0,0,0.6),inset_0_0_20px_rgba(255,200,0,0.08)]',
    hoverBorder: 'hover:border-yellow-400',
    gapColor: 'text-yellow-300',
    statusIcon: '⭐',
    dim: false,
  },
  good: {
    border: 'border-green-700/80',
    bg: 'bg-green-950/40',
    glow: 'shadow-[3px_3px_0px_rgba(0,0,0,0.6),inset_0_0_15px_rgba(0,180,80,0.06)]',
    hoverBorder: 'hover:border-green-500',
    gapColor: 'text-green-400',
    statusIcon: '✅',
    dim: false,
  },
  overcooked: {
    border: 'border-orange-800/80',
    bg: 'bg-orange-950/40',
    glow: 'shadow-[3px_3px_0px_rgba(0,0,0,0.6),inset_0_0_15px_rgba(200,100,0,0.06)]',
    hoverBorder: 'hover:border-orange-500',
    gapColor: 'text-orange-400',
    statusIcon: '⏰',
    dim: false,
  },
  undercooked: {
    border: 'border-blue-800/80',
    bg: 'bg-blue-950/40',
    glow: 'shadow-[3px_3px_0px_rgba(0,0,0,0.6),inset_0_0_15px_rgba(50,100,200,0.06)]',
    hoverBorder: 'hover:border-blue-500',
    gapColor: 'text-blue-400',
    statusIcon: '⚡',
    dim: false,
  },
  burned: {
    border: 'border-red-800/80',
    bg: 'bg-red-950/50',
    glow: 'shadow-[3px_3px_0px_rgba(0,0,0,0.6),inset_0_0_15px_rgba(200,0,0,0.1)]',
    hoverBorder: 'hover:border-red-500',
    gapColor: 'text-red-400',
    statusIcon: '🔥',
    dim: true,
  },
  abandoned: {
    border: 'border-gray-600/50',
    bg: 'bg-gray-900/60',
    glow: 'shadow-[3px_3px_0px_rgba(0,0,0,0.6)]',
    hoverBorder: 'hover:border-gray-400',
    gapColor: 'text-gray-400',
    statusIcon: '⏸️',
    dim: true,
  },
};

export default function DishCard({ record, index }: DishCardProps) {
  const recipe = RECIPES[record.recipeDuration];
  const style = cardStyles[record.status];
  const isGolden = record.status === 'golden';
  const isAbandoned = record.status === 'abandoned';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05, type: 'spring', stiffness: 300, damping: 25 }}
      className={`${style.bg} border-2 ${style.border} ${style.glow} p-3 flex flex-col items-center gap-1
                  hover:-translate-y-1 ${style.hoverBorder} hover:shadow-[5px_5px_0px_rgba(0,0,0,0.6)]
                  transition-all cursor-default relative overflow-hidden`}
    >
      {/* Golden 반짝임 */}
      {isGolden && (
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-1 right-2 text-[8px] text-yellow-300"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          >✦</motion.div>
          <motion.div
            className="absolute bottom-2 left-2 text-[6px] text-yellow-300"
            animate={{ opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.7 }}
          >✦</motion.div>
        </div>
      )}

      {/* 음식 아이콘 */}
      <div className={`py-1 ${style.dim ? 'opacity-50 grayscale-[30%]' : ''}`}>
        <PixelFood
          food={record.recipeType}
          phase={style.dim ? 1 : 3}
          size={72}
        />
      </div>

      {/* 요리명 (볼드, 메인) */}
      <p className="text-xs font-bold text-cream tracking-widest">
        {recipe.displayName}
      </p>

      {/* 뱃지 + 오차 한 줄 통합 (핵심 정보) */}
      <p className={`text-sm font-bold tracking-wider ${style.gapColor}`}>
        {style.statusIcon} {isAbandoned ? '방치' : formatGap(record.deviationSeconds)}
      </p>

      {/* 할일 + 목표시간 (서브텍스트) */}
      <p className="text-[9px] text-cream/35 truncate w-full text-center">
        {record.taskName} · {recipe.label}
      </p>
    </motion.div>
  );
}
