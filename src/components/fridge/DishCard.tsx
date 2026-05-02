'use client';

import { motion } from 'framer-motion';
import { CookingRecord } from '@/lib/types';
import { RECIPES } from '@/lib/recipes';

interface DishCardProps {
  record: CookingRecord;
  index: number;
}

const statusConfig = {
  golden: { label: 'Golden', color: 'bg-green-50 text-green-600 border-green-100' },
  done:   { label: '완료', color: 'bg-orange-50 text-point border-orange-100' },
  burned: { label: '타버림', color: 'bg-red-50 text-red-500 border-red-100' },
  abandoned: { label: '방치', color: 'bg-gray-50 text-gray-400 border-gray-100' },
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
      className="bg-white rounded-2xl p-4 shadow-sm flex flex-col items-center gap-2"
    >
      <span className="text-3xl">{recipe.emoji}</span>
      <p className="text-xs font-medium text-neutral truncate w-full text-center">
        {record.taskName}
      </p>
      <span className={`text-[10px] px-2 py-0.5 rounded-full border ${status.color}`}>
        {status.label}
      </span>
      <p className="text-[10px] text-neutral/30">{dateStr} · {recipe.label}</p>
    </motion.div>
  );
}
