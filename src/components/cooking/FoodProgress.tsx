'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { RECIPES } from '@/lib/recipes';
import { RecipeDuration } from '@/lib/types';
import PixelFood from '@/components/shared/PixelFood';

interface FoodProgressProps {
  recipeDuration: RecipeDuration;
  recipeType: string;
  phase: 1 | 2 | 3;
}

const phaseLabels = {
  1: '재료 준비',
  2: '익는 중...',
  3: '바로완성!',
};

export default function FoodProgress({ recipeDuration, recipeType, phase }: FoodProgressProps) {
  const recipe = RECIPES[recipeDuration];

  return (
    <div className="flex flex-col items-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={`${recipeType}-${phase}`}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="mb-4"
        >
          <PixelFood food={recipeType} phase={phase} size={120} />
        </motion.div>
      </AnimatePresence>

      {/* 상태 라벨 (나무 프레임) */}
      <motion.div
        key={phaseLabels[phase]}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-4 py-1.5 bg-point rounded-lg pixel-shadow"
      >
        <p className="text-sm font-bold text-white">
          {recipe.displayName} · {phaseLabels[phase]}
        </p>
      </motion.div>
    </div>
  );
}
