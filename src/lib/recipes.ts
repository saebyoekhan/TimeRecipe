import { RecipeDefinition, RecipeDuration } from './types';

export const RECIPES: Record<RecipeDuration, RecipeDefinition> = {
  5:   { duration: 5,   label: '5분',   food: 'egg',     displayName: '계란후라이', emoji: '🍳' },
  10:  { duration: 10,  label: '10분',  food: 'toast',   displayName: '토스트',     emoji: '🍞' },
  15:  { duration: 15,  label: '15분',  food: 'pancake', displayName: '팬케이크',   emoji: '🥞' },
  30:  { duration: 30,  label: '30분',  food: 'pasta',   displayName: '파스타',     emoji: '🍝' },
  60:  { duration: 60,  label: '60분',  food: 'stew',    displayName: '스튜',       emoji: '🍲' },
  120: { duration: 120, label: '120분', food: 'roast',   displayName: '로스트',     emoji: '🥩' },
};

export const RECIPE_LIST = Object.values(RECIPES);
