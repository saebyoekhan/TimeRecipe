'use client';

import { motion } from 'framer-motion';
import { CookingRecord } from '@/lib/types';
import { RECIPES } from '@/lib/recipes';
import PixelFood from '@/components/shared/PixelFood';

interface DishCardProps {
  record: CookingRecord;
  index: number;
}

const statusConfig = {
  golden:    { label: '⭐ Golden', color: 'bg-success text-white' },
  done:      { label: '완료',      color: 'bg-point text-white' },
  burned:    { label: '🔥 타버림', color: 'bg-danger text-white' },
  abandoned: { label: '방치',      color: 'bg-brown-light/30 text-brown-light' },
};

export default function DishCard({ record, index }: DishCardProps) {
  const recipe = RECIPES[record.recipeDuration];
  const status = statusConfig[record.status];
  const date = new Date(record.startedAt);
  const dateStr = `${date.getMonth() + 1}/${date.getDate()}`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05, type: 'spring', stiffness: 300, damping: 25 }}
      className="bg-[#FFF9C4] border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.6)] p-3 flex flex-col items-center gap-2 transform hover:-translate-y-1 hover:rotate-1 hover:shadow-[6px_6px_0px_rgba(0,0,0,0.6)] transition-all cursor-default"
    >
      {/* 사진 영역처럼 보이게 안쪽 박스 */}
      <div className="w-full bg-black/5 border-2 border-black/10 rounded-sm py-2 flex justify-center mb-1">
        <PixelFood
          food={record.recipeType}
          phase={record.status === 'burned' ? 1 : 3}
          size={48}
        />
      </div>
      
      <p className="text-xs font-bold text-black tracking-widest truncate w-full text-center">
        {record.taskName}
      </p>
      <span className={`text-[9px] px-2 py-0.5 border border-black font-bold shadow-[1px_1px_0px_rgba(0,0,0,1)] ${status.color}`}>
        {status.label}
      </span>
      <p className="text-[10px] text-black/60 font-bold">{dateStr} · {recipe.label}</p>
    </motion.div>
  );
}
