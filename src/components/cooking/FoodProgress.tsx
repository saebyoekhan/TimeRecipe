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
    <div className="flex flex-col items-center relative">
      {/* 픽셀 연기 효과 (조리 중에는 항상 표시) - 위치를 음식(팬) 영역 안으로 조정 */}
      <div className="absolute inset-0 top-[-20px] pointer-events-none flex justify-center items-center gap-6 z-20">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-5 h-5 bg-white/70 rounded-sm"
            animate={{
              y: [0, -30, -60],
              x: [0, i % 2 === 0 ? 15 : -15, i % 2 === 0 ? 30 : -30],
              opacity: [0, 0.8, 0],
              scale: [1, 1.5, 2],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.6,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${recipeType}-${phase}`}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="mb-6 relative z-10"
        >
          {/* 음식 픽셀 사이즈를 대폭 키워 프라이팬에 맞춤 */}
          <PixelFood food={recipeType} phase={phase} size={250} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
