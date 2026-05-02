'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { RECIPES } from '@/lib/recipes';
import { RecipeDuration } from '@/lib/types';

interface FoodProgressProps {
  recipeDuration: RecipeDuration;
  recipeType: string;
  phase: 1 | 2 | 3;
}

const phaseLabels = {
  1: '조리 시작',
  2: '익는 중...',
  3: '완성!',
};

const phaseEmojis: Record<string, Record<1 | 2 | 3, string>> = {
  egg:     { 1: '🥚', 2: '🍳', 3: '🍳' },
  toast:   { 1: '🍞', 2: '🍞', 3: '🥪' },
  pancake: { 1: '🥣', 2: '🥞', 3: '🥞' },
  pasta:   { 1: '🍝', 2: '🍝', 3: '🍝' },
  stew:    { 1: '🥘', 2: '🍲', 3: '🍲' },
  roast:   { 1: '🥩', 2: '🍖', 3: '🍖' },
};

export default function FoodProgress({ recipeDuration, recipeType, phase }: FoodProgressProps) {
  const recipe = RECIPES[recipeDuration];
  const emoji = phaseEmojis[recipeType]?.[phase] ?? recipe.emoji;

  return (
    <div className="flex flex-col items-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={`${recipeType}-${phase}`}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="text-8xl mb-4"
        >
          {emoji}
        </motion.div>
      </AnimatePresence>
      <motion.p
        key={phaseLabels[phase]}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-sm text-neutral/50"
      >
        {recipe.displayName} · {phaseLabels[phase]}
      </motion.p>
    </div>
  );
}
