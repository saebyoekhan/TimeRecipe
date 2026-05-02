'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { useRecipe } from '@/contexts/RecipeContext';
import { RECIPE_LIST } from '@/lib/recipes';
import { saveActiveSession } from '@/lib/storage';
import TaskInput from '@/components/home/TaskInput';
import RecipeCarousel from '@/components/home/RecipeCarousel';
import PanPreview from '@/components/home/PanPreview';
import BottomDock from '@/components/shared/BottomDock';
import IntroModal from '@/components/shared/IntroModal';

export default function HomePage() {
  const [showIntro, setShowIntro] = useState(false);
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
    <main className="flex-1 flex flex-col pixel-bg">
      {/* 스크롤 가능한 컨텐츠 영역 */}
      <div className="flex-1 overflow-y-auto">
        {/* 상단 패널 */}
        <div className="p-4 pt-6 pb-5 bg-black/50 border-b-4 border-wood-dark">
          {/* 헤더 */}
          <div className="text-center mb-4">
            <h1 className="text-2xl font-bold text-cream tracking-widest text-pixel-stroke">타임레시피</h1>
            <p className="mt-1 text-xs text-wood-light text-pixel-stroke">시간을 요리하세요</p>
            <button
              onClick={() => setShowIntro(true)}
              className="mt-2 text-[10px] px-3 py-1 bg-wood-dark/80 text-cream/80 font-bold tracking-widest
                         border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,0.6)]
                         hover:bg-wood hover:text-cream transition-colors"
            >
              ❓ 이게 뭐야?
            </button>
          </div>

          {/* 주문서 입력 */}
          <TaskInput />

          {/* 레시피 선택 */}
          <AnimatePresence>
            {showRecipes && (
              <motion.div
                className="w-full mt-4"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <RecipeCarousel />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 후라이팬 + 점화 버튼 */}
        <AnimatePresence>
          {showPan && (
            <PanPreview
              recipeType={recipeType!}
              recipeDuration={recipeDuration!}
              onIgnite={handleIgnite}
            />
          )}
        </AnimatePresence>
      </div>

      {/* 하단 독바 (항상 하단 고정) */}
      <BottomDock />

      {/* 소개 모달 */}
      <AnimatePresence>
        {showIntro && <IntroModal onClose={() => setShowIntro(false)} />}
      </AnimatePresence>
    </main>
  );
}
