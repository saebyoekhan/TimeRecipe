'use client';

import { motion } from 'framer-motion';
import { CookingRecord } from '@/lib/types';
import DishCard from './DishCard';

interface FridgeGridProps {
  records: CookingRecord[];
}

export default function FridgeGrid({ records }: FridgeGridProps) {
  if (records.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex-1 flex flex-col items-center justify-center text-center"
      >
        <span className="text-5xl mb-4">🧊</span>
        <p className="text-sm text-cream/60 font-bold tracking-widest">냉장고가 비어있어요</p>
        <p className="text-xs text-cream/30 mt-1">요리를 시작해 보세요!</p>
      </motion.div>
    );
  }

  // 3열 그리드에서 빈 슬롯 계산 (최소 6칸)
  const minSlots = Math.max(6, records.length);
  const emptySlots = minSlots - records.length;

  return (
    <div className="grid grid-cols-3 gap-3">
      {records.map((record, i) => (
        <DishCard key={record.id} record={record} index={i} />
      ))}
      {/* 빈 슬롯 플레이스홀더 */}
      {Array.from({ length: emptySlots }).map((_, i) => (
        <motion.div
          key={`empty-${i}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: (records.length + i) * 0.05 }}
          className="border-2 border-dashed border-cream/15 p-3 flex flex-col items-center justify-center gap-2 min-h-[120px]"
        >
          <span className="text-2xl opacity-20">🍽️</span>
          <p className="text-[10px] text-cream/20 font-bold tracking-widest">빈 칸</p>
        </motion.div>
      ))}
    </div>
  );
}
