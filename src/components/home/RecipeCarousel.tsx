'use client';

import { useRecipe } from '@/contexts/RecipeContext';
import { RECIPE_LIST } from '@/lib/recipes';
import { RecipeDuration } from '@/lib/types';
import RecipeCard from './RecipeCard';

export default function RecipeCarousel() {
  const { recipeDuration, selectRecipe } = useRecipe();

  return (
    <div className="flex items-end justify-start gap-3 pt-4 pb-4 px-4 overflow-x-auto">
      {RECIPE_LIST.map((recipe, i) => (
        <RecipeCard
          key={recipe.duration}
          recipe={recipe}
          index={i}
          total={RECIPE_LIST.length}
          isSelected={recipeDuration === recipe.duration}
          onSelect={() => selectRecipe(recipe.duration as RecipeDuration)}
        />
      ))}
    </div>
  );
}
