'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useRecipe } from '@/contexts/RecipeContext';
import TaskInput from '@/components/home/TaskInput';
import RecipeCarousel from '@/components/home/RecipeCarousel';

export default function HomePage() {
  const { taskName } = useRecipe();
  const showRecipes = taskName.trim().length > 0;

  return (
    <main className="flex-1 flex flex-col items-center justify-center px-6 py-12 overflow-hidden">
      {/* 헤더 */}
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold text-neutral tracking-tight">타임레시피</h1>
        <p className="mt-1 text-sm text-neutral/40">시간을 요리하세요</p>
      </motion.div>

      {/* 주문서 입력 */}
      <motion.div
        className="w-full"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <TaskInput />
      </motion.div>

      {/* 레시피 선택 (할 일 입력 후 표시) */}
      <AnimatePresence>
        {showRecipes && (
          <motion.div
            className="w-full mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <p className="text-xs text-center text-neutral/40 mb-4">
              레시피를 선택하세요
            </p>
            <RecipeCarousel />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
