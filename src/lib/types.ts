export type RecipeDuration = 5 | 10 | 15 | 30 | 60 | 120;

export type CookingStatus = 'golden' | 'good' | 'overcooked' | 'undercooked' | 'burned' | 'abandoned';

export interface CookingRecord {
  id: string;
  taskName: string;
  recipeDuration: RecipeDuration;
  recipeType: string;
  startedAt: string;
  endedAt: string;
  targetSeconds: number;
  actualSeconds: number;
  deviationSeconds: number;
  status: CookingStatus;
  failReason?: string;
}

export interface ActiveSession {
  taskName: string;
  recipeDuration: RecipeDuration;
  recipeType: string;
  startedAt: string;
  targetSeconds: number;
}

export interface RecipeDefinition {
  duration: RecipeDuration;
  label: string;
  food: string;
  displayName: string;
  emoji: string;
}
