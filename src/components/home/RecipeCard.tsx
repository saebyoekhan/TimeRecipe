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
  isSelected,
  onSelect,
}: RecipeCardProps) {
  return (
    <motion.div
      layoutId={`recipe-card-${recipe.food}`}
      className="cursor-pointer"
      initial={{ opacity: 0, x: 20 }}
      animate={{
        opacity: 1,
        x: 0,
        scale: isSelected ? 1.05 : 1,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 25,
        delay: index * 0.04,
      }}
      onClick={onSelect}
    >
      <div
        className={`w-20 p-2 flex flex-col items-center gap-1.5 transition-all duration-200
                    ${isSelected ? 'wood-card-active' : 'wood-card'}`}
      >
        <PixelFood food={recipe.food} phase={3} size={32} />
        <div className="text-center">
          <p className={`text-[9px] font-bold leading-tight ${isSelected ? 'text-white' : 'text-cream'}`}>
            {recipe.displayName}
          </p>
          <p className={`text-xs font-bold ${isSelected ? 'text-yellow-300' : 'text-wood-light'}`}>
            {recipe.label}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
