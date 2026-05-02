'use client';

import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { useRecipe } from '@/contexts/RecipeContext';
import { RECIPE_LIST } from '@/lib/recipes';
import { saveActiveSession } from '@/lib/storage';
import TaskInput from '@/components/home/TaskInput';
import RecipeCarousel from '@/components/home/RecipeCarousel';
import PanPreview from '@/components/home/PanPreview';
import BottomDock from '@/components/shared/BottomDock';

export default function HomePage() {
  const router = useRouter();
  const { taskName, recipeDuration, recipeType } = useRecipe();
  const showRecipes = taskName.trim().length > 0;
  const showPan = showRecipes && recipeDuration !== null && recipeType !== null;

  const handleIgnite = () => {
    if (!recipeDuration || !recipeType || !taskName.trim()) return;

    const recipe = RECIPE_LIST.find((r) => r.duration === recipeDuration)!;
    saveActiveSession({
      taskName: taskName.trim(),
      recipeDuration,
      recipeType: recipe.food,
      startedAt: new Date().toISOString(),
      targetSeconds: recipeDuration * 60,
    });

    router.push('/cooking');
  };

  return (
    <main className="flex-1 flex flex-col wood-bg">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 overflow-hidden">
        {/* 헤더 */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl font-bold text-brown tracking-tight">🍳 타임레시피</h1>
          <p className="mt-1 text-sm text-brown-light/60">시간을 요리하세요</p>
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

        {/* 레시피 선택 */}
        <AnimatePresence>
          {showRecipes && (
            <motion.div
              className="w-full mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <p className="text-xs text-center text-brown-light/60 mb-3">
                🍽️ 레시피를 선택하세요
              </p>
              <RecipeCarousel />
            </motion.div>
          )}
        </AnimatePresence>

        {/* 후라이팬 + 점화 버튼 (레시피 선택 후) */}
        <AnimatePresence>
          {showPan && (
            <motion.div
              className="mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <PanPreview
                recipeType={recipeType!}
                recipeDuration={recipeDuration!}
                onIgnite={handleIgnite}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 하단 독바 */}
      <BottomDock />
    </main>
  );
}
