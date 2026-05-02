'use client';

import { useRecipe } from '@/contexts/RecipeContext';
import { RECIPE_LIST } from '@/lib/recipes';
import { RecipeDuration } from '@/lib/types';
import RecipeCard from './RecipeCard';

export default function RecipeCarousel() {
  const { recipeDuration, selectRecipe } = useRecipe();

  return (
    <div className="grid grid-cols-3 gap-2">
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
