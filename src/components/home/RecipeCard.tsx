'use client';

import { motion } from 'framer-motion';
import { RecipeDefinition } from '@/lib/types';
import { useLongPress } from '@/hooks/useLongPress';

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

  // 부채꼴 배치 (모바일에서도 잘 보이도록 최소화)
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
        className={`relative w-24 h-32 rounded-2xl p-3 flex flex-col items-center justify-between shrink-0
                    transition-colors duration-200
                    ${isSelected
                      ? 'bg-point text-white shadow-lg shadow-point/30'
                      : 'bg-white text-neutral shadow-md shadow-neutral/5'
                    }`}
        {...(isSelected ? handlers : {})}
      >
        <span className="text-3xl mt-1">{recipe.emoji}</span>
        <div className="text-center">
          <p className="text-xs font-medium opacity-70">{recipe.displayName}</p>
          <p className="text-lg font-bold">{recipe.label}</p>
        </div>

        {/* 롱프레스 프로그레스 링 */}
        {isSelected && isPressing && (
          <svg
            className="absolute inset-0 w-full h-full -rotate-90"
            viewBox="0 0 112 144"
          >
            <rect
              x="2"
              y="2"
              width="108"
              height="140"
              rx="14"
              ry="14"
              fill="none"
              stroke="white"
              strokeWidth="3"
              strokeOpacity={0.4}
              strokeDasharray={`${(108 + 140) * 2}`}
              strokeDashoffset={`${(108 + 140) * 2 * (1 - progress)}`}
              className="transition-none"
            />
          </svg>
        )}

        {isSelected && !isPressing && (
          <p className="absolute -bottom-6 left-0 right-0 text-[10px] text-center text-neutral/40">
            꾹 눌러서 시작
          </p>
        )}
      </div>
    </motion.div>
  );
}
