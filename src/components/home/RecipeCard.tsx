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
  const centerIndex = (total - 1) / 2;
  const offset = index - centerIndex;
  const rotate = offset * 3;
  const translateY = Math.abs(offset) * 3;

  return (
    <motion.div
      layoutId={`recipe-card-${recipe.food}`}
      className="cursor-pointer"
      initial={{ opacity: 0, y: 30, rotate: 0 }}
      animate={{
        opacity: 1,
        y: -translateY,
        rotate,
        scale: isSelected ? 1.08 : 1,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 25,
        delay: index * 0.06,
      }}
      onClick={onSelect}
      style={{ originX: 0.5, originY: 1 }}
    >
      <div
        className={`relative w-24 h-32 p-3 flex flex-col items-center justify-between shrink-0
                    transition-all duration-200
                    ${isSelected
                      ? 'wood-card-active'
                      : 'wood-card'
                    }`}
      >
        <div className="mt-1">
          <PixelFood food={recipe.food} phase={3} size={48} />
        </div>
        <div className="text-center">
          <p className={`text-[10px] font-medium ${isSelected ? 'text-white/70' : 'text-brown-light'}`}>
            {recipe.displayName}
          </p>
          <p className="text-base font-bold">{recipe.label}</p>
        </div>
      </div>
    </motion.div>
  );
}
