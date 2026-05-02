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
      {/* 픽셀 연기 효과 (익는 중, 혹은 완료 시) */}
      {phase >= 2 && (
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-full h-32 pointer-events-none flex justify-center gap-6">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-4 h-4 bg-white/60 rounded-full blur-sm"
              animate={{
                y: [0, -40, -80],
                x: [0, i % 2 === 0 ? 20 : -20, i % 2 === 0 ? 40 : -40],
                opacity: [0, 0.6, 0],
                scale: [1, 2, 3],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: i * 0.8,
                ease: 'easeOut',
              }}
            />
          ))}
        </div>
      )}

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

      {/* 상태 라벨 (레트로 게임 대화창 느낌) */}
      <motion.div
        key={phaseLabels[phase]}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-5 py-2 bg-black/80 border-4 border-wood-dark shadow-[4px_4px_0px_rgba(0,0,0,0.6)] relative z-20"
      >
        <p className="text-base font-bold text-cream tracking-widest text-pixel-stroke">
          {recipe.displayName} · {phaseLabels[phase]}
        </p>
      </motion.div>
    </div>
  );
}
