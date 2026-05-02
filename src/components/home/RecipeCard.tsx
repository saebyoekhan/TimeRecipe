'use client';

import { motion } from 'framer-motion';
import { RecipeDefinition } from '@/lib/types';
import PixelFood from '@/components/shared/PixelFood';

interface RecipeCardProps {
  recipe: RecipeDefinition;
  index: number;
  total: number;
  isSelected: boolean;
  onSelect: () => void;
}

export default function RecipeCard({
  recipe,
  index,
  total,
  isSelected,
  onSelect,
}: RecipeCardProps) {
  return (
    <motion.div
      layoutId={`recipe-card-${recipe.food}`}
      className="cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: isSelected ? 1.05 : 1,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 25,
        delay: index * 0.06,
      }}
      onClick={onSelect}
    >
      <div
        className={`relative w-full p-3 flex flex-col items-center justify-between gap-2
                    transition-all duration-200
                    ${isSelected
                      ? 'wood-card-active'
                      : 'wood-card'
                    }`}
      >
        <div className="mt-1">
          <PixelFood food={recipe.food} phase={3} size={40} />
        </div>
        <div className="text-center">
          <p className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-cream'}`}>
            {recipe.displayName}
          </p>
          <p className={`text-sm font-bold mt-0.5 ${isSelected ? 'text-yellow-300' : 'text-wood-light'}`}>
            {recipe.label}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
