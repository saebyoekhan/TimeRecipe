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
  return `${sign}${m}분 ${s}초`;
}

function formatActual(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  if (s === 0) return `${m}분`;
  return `${m}분 ${s}초`;
}

const cardStyles = {
  golden: {
    border: 'border-yellow-500/80',
    bg: 'bg-yellow-900/40',
    iconBg: 'bg-yellow-950/50 border-yellow-600/40',
    glow: 'shadow-[4px_4px_0px_rgba(0,0,0,0.6),inset_0_0_20px_rgba(255,200,0,0.08)]',
    hoverBorder: 'hover:border-yellow-400',
    badge: 'bg-yellow-600 text-white',
    badgeLabel: '⭐ PERFECT',
    gapColor: 'text-yellow-400',
  },
  done: {
    border: 'border-wood-dark',
    bg: 'bg-black/70',
    iconBg: 'bg-black/40 border-wood-dark/50',
    glow: 'shadow-[4px_4px_0px_rgba(0,0,0,0.6)]',
    hoverBorder: 'hover:border-point',
    badge: 'bg-point text-white',
    badgeLabel: '✅ 완료',
    gapColor: 'text-point',
  },
  burned: {
    border: 'border-red-800/80',
    bg: 'bg-red-950/50',
    iconBg: 'bg-red-950/60 border-red-800/40',
    glow: 'shadow-[4px_4px_0px_rgba(0,0,0,0.6),inset_0_0_15px_rgba(200,0,0,0.1)]',
    hoverBorder: 'hover:border-red-500',
    badge: 'bg-danger text-white',
    badgeLabel: '🔥 타버림',
    gapColor: 'text-red-400',
  },
  abandoned: {
    border: 'border-gray-600/50',
    bg: 'bg-gray-900/60',
    iconBg: 'bg-gray-900/50 border-gray-700/40',
    glow: 'shadow-[4px_4px_0px_rgba(0,0,0,0.6)]',
    hoverBorder: 'hover:border-gray-400',
    badge: 'bg-gray-600 text-gray-300',
    badgeLabel: '⏸️ 방치',
    gapColor: 'text-gray-400',
  },
};

export default function DishCard({ record, index }: DishCardProps) {
  const recipe = RECIPES[record.recipeDuration];
  const style = cardStyles[record.status];
  const date = new Date(record.startedAt);
  const dateStr = `${date.getMonth() + 1}/${date.getDate()}`;
  const isGolden = record.status === 'golden';
  const isBurned = record.status === 'burned' || record.status === 'abandoned';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05, type: 'spring', stiffness: 300, damping: 25 }}
      className={`${style.bg} border-2 ${style.border} ${style.glow} p-3 flex flex-col items-center gap-1.5
                  hover:-translate-y-1 ${style.hoverBorder} hover:shadow-[6px_6px_0px_rgba(0,0,0,0.6)]
                  transition-all cursor-default relative overflow-hidden`}
    >
      {/* Golden 반짝임 효과 */}
      {isGolden && (
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-1 right-2 text-[8px]"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0 }}
          >✦</motion.div>
          <motion.div
            className="absolute top-3 left-2 text-[6px]"
            animate={{ opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.7 }}
          >✦</motion.div>
        </div>
      )}

      {/* 음식 아이콘 */}
      <div className={`w-full ${style.iconBg} border-2 py-2.5 flex justify-center ${isBurned ? 'opacity-60' : ''}`}>
        <PixelFood
          food={record.recipeType}
          phase={isBurned ? 1 : 3}
          size={56}
        />
      </div>

      {/* 요리명 + 목표시간 */}
      <p className="text-[10px] font-bold text-wood-light tracking-widest">
        {recipe.displayName} · {recipe.label}
      </p>

      {/* 할일 이름 */}
      <p className="text-[9px] text-cream/50 truncate w-full text-center">
        &quot;{record.taskName}&quot;
      </p>

      {/* 상태 뱃지 */}
      <span className={`text-[9px] px-2 py-0.5 border border-black font-bold shadow-[1px_1px_0px_rgba(0,0,0,1)] ${style.badge}`}>
        {style.badgeLabel}
      </span>

      {/* 시간 오차 (핵심 정보) */}
      <div className="w-full text-center">
        <p className={`text-xs font-bold tracking-wider ${style.gapColor}`}>
          {record.status === 'abandoned' ? '—' : formatGap(record.deviationSeconds)}
        </p>
        <p className="text-[8px] text-cream/30 mt-0.5">
          실제 {formatActual(record.actualSeconds)}
        </p>
      </div>

      {/* 날짜 */}
      <p className="text-[8px] text-cream/25 font-bold">{dateStr}</p>
    </motion.div>
  );
}
