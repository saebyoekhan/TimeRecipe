'use client';

import { createContext, useCallback, useContext, useState, ReactNode } from 'react';
import { RecipeDuration } from '@/lib/types';
import { RECIPES } from '@/lib/recipes';

interface RecipeState {
  taskName: string;
  recipeDuration: RecipeDuration | null;
  recipeType: string | null;
}

interface RecipeContextValue extends RecipeState {
  setTaskName: (name: string) => void;
  selectRecipe: (duration: RecipeDuration) => void;
  clear: () => void;
}

const initialState: RecipeState = {
  taskName: '',
  recipeDuration: null,
  recipeType: null,
};

const RecipeContext = createContext<RecipeContextValue | null>(null);

export function RecipeProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<RecipeState>(initialState);

  const setTaskName = useCallback((name: string) => {
    setState((prev) => ({ ...prev, taskName: name }));
  }, []);

  const selectRecipe = useCallback((duration: RecipeDuration) => {
    const recipe = RECIPES[duration];
    setState((prev) => ({
      ...prev,
      recipeDuration: duration,
      recipeType: recipe.food,
    }));
  }, []);

  const clear = useCallback(() => {
    setState(initialState);
  }, []);

  return (
    <RecipeContext.Provider value={{ ...state, setTaskName, selectRecipe, clear }}>
      {children}
    </RecipeContext.Provider>
  );
}

export function useRecipe() {
  const ctx = useContext(RecipeContext);
  if (!ctx) throw new Error('useRecipe must be used within RecipeProvider');
  return ctx;
}
