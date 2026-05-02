'use client';

import { ReactNode } from 'react';
import { RecipeProvider } from '@/contexts/RecipeContext';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <RecipeProvider>
      {children}
    </RecipeProvider>
  );
}
