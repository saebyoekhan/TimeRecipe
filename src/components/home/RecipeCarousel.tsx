'use client';

import { useRecipe } from '@/contexts/RecipeContext';
import { RECIPE_LIST } from '@/lib/recipes';
import { RecipeDuration } from '@/lib/types';
import RecipeCard from './RecipeCard';

export default function RecipeCarousel() {
  const { recipeDuration, selectRecipe } = useRecipe();

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 -mx-2 px-2 scrollbar-hide">
      {RECIPE_LIST.map((recipe, i) => (
        <div key={recipe.duration} className="shrink-0">
          <RecipeCard
            recipe={recipe}
            index={i}
            total={RECIPE_LIST.length}
            isSelected={recipeDuration === recipe.duration}
            onSelect={() => selectRecipe(recipe.duration as RecipeDuration)}
          />
        </div>
      ))}
    </div>
  );
}
