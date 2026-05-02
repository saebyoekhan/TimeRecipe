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
      className="wood-card p-3 flex flex-col items-center gap-1.5"
    >
      <PixelFood
        food={record.recipeType}
        phase={record.status === 'burned' ? 1 : 3}
        size={40}
      />
      <p className="text-[10px] font-bold text-brown truncate w-full text-center">
        {record.taskName}
      </p>
      <span className={`text-[9px] px-2 py-0.5 rounded font-bold ${status.color}`}>
        {status.label}
      </span>
      <p className="text-[9px] text-brown-light/40">{dateStr} · {recipe.label}</p>
    </motion.div>
  );
}
