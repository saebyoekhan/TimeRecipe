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
        <p className="text-sm text-brown-light/50 font-medium">냉장고가 비어있어요</p>
        <p className="text-xs text-brown-light/30 mt-1">요리를 시작해 보세요!</p>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-3">
      {records.map((record, i) => (
        <DishCard key={record.id} record={record} index={i} />
      ))}
    </div>
  );
}
