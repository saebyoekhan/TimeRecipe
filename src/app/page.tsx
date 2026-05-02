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
    <main className="flex-1 flex flex-col pixel-bg relative">
      {/* 반투명 패널 (상단 UI용) */}
      <div className="absolute top-0 left-0 right-0 p-6 bg-black/50 z-10 border-b-4 border-wood-dark">
        {/* 헤더 */}
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-cream tracking-widest text-pixel-stroke">타임레시피</h1>
          <p className="mt-2 text-sm text-wood-light text-pixel-stroke">시간을 요리하세요</p>
        </motion.div>

        {/* 주문서 입력 */}
        <motion.div className="w-full">
          <TaskInput />
        </motion.div>

        {/* 레시피 선택 */}
        <AnimatePresence>
          {showRecipes && (
            <motion.div
              className="w-full mt-6"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <RecipeCarousel />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 후라이팬 + 점화 버튼 (화면 중앙~하단) */}
      <AnimatePresence>
        {showPan && (
          <PanPreview
            recipeType={recipeType!}
            recipeDuration={recipeDuration!}
            onIgnite={handleIgnite}
          />
        )}
      </AnimatePresence>

      <div className="z-20 mt-auto">
        <BottomDock />
      </div>
    </main>
  );
}
