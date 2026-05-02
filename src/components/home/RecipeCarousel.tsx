'use client';

import { useRouter } from 'next/navigation';
import { useRecipe } from '@/contexts/RecipeContext';
import { RECIPE_LIST } from '@/lib/recipes';
import { RecipeDuration } from '@/lib/types';
import { saveActiveSession } from '@/lib/storage';
import RecipeCard from './RecipeCard';

export default function RecipeCarousel() {
  const router = useRouter();
  const { taskName, recipeDuration, selectRecipe } = useRecipe();

  const handleLongPressComplete = () => {
    if (!recipeDuration || !taskName.trim()) return;

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
    <div className="flex items-end justify-start gap-3 pt-4 pb-10 px-4 overflow-x-auto">
      {RECIPE_LIST.map((recipe, i) => (
        <RecipeCard
          key={recipe.duration}
          recipe={recipe}
          index={i}
          total={RECIPE_LIST.length}
          isSelected={recipeDuration === recipe.duration}
          onSelect={() => selectRecipe(recipe.duration as RecipeDuration)}
          onLongPressComplete={handleLongPressComplete}
        />
      ))}
    </div>
  );
}
