'use client';

import { motion } from 'framer-motion';
import { RecipeDefinition } from '@/lib/types';
import { useLongPress } from '@/hooks/useLongPress';
import PixelFood from '@/components/shared/PixelFood';

interface RecipeCardProps {
  recipe: RecipeDefinition;
  index: number;
  total: number;
  isSelected: boolean;
  onSelect: () => void;
  onLongPressComplete: () => void;
}

export default function RecipeCard({
  recipe,
  index,
  total,
  isSelected,
  onSelect,
  onLongPressComplete,
}: RecipeCardProps) {
  const { progress, isPressing, handlers } = useLongPress({
    onComplete: onLongPressComplete,
  });

  const centerIndex = (total - 1) / 2;
  const offset = index - centerIndex;
  const rotate = offset * 3;
  const translateY = Math.abs(offset) * 3;

  return (
    <motion.div
      layoutId={`recipe-card-${recipe.food}`}
      className="no-context-menu cursor-pointer"
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
        className={`relative w-24 h-32 rounded-xl p-3 flex flex-col items-center justify-between shrink-0
                    transition-all duration-200
                    ${isSelected
                      ? 'wood-card-active text-white'
                      : 'wood-card text-neutral'
                    }`}
        {...(isSelected ? handlers : {})}
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

        {/* 롱프레스 프로그레스 */}
        {isSelected && isPressing && (
          <div className="absolute inset-0 rounded-xl overflow-hidden">
            <div
              className="absolute bottom-0 left-0 right-0 bg-white/20 transition-none"
              style={{ height: `${progress * 100}%` }}
            />
          </div>
        )}

        {isSelected && !isPressing && (
          <p className="absolute -bottom-6 left-0 right-0 text-[10px] text-center text-brown-light/60">
            꾹 눌러서 시작
          </p>
        )}
      </div>
    </motion.div>
  );
}
