'use client';

import { motion } from 'framer-motion';
import { RecipeDuration } from '@/lib/types';
import PixelFood from '@/components/shared/PixelFood';
import IgnitionButton from './IgnitionButton';

interface PanPreviewProps {
  recipeType: string;
  recipeDuration: RecipeDuration;
  onIgnite: () => void;
}

export default function PanPreview({ recipeType, onIgnite }: PanPreviewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className="flex flex-col items-center gap-5"
    >
      {/* 후라이팬 + 음식 */}
      <div className="relative">
        {/* 팬 외곽 */}
        <svg width="180" height="160" viewBox="0 0 180 160">
          {/* 팬 손잡이 */}
          <rect x="140" y="65" width="38" height="12" rx="4" fill="#5D4037" />
          <rect x="140" y="68" width="38" height="6" rx="3" fill="#6D4C41" />
          {/* 팬 몸체 */}
          <ellipse cx="80" cy="85" rx="72" ry="55" fill="#616161" />
          <ellipse cx="80" cy="83" rx="68" ry="51" fill="#757575" />
          {/* 팬 안쪽 */}
          <ellipse cx="80" cy="80" rx="60" ry="44" fill="#424242" />
          <ellipse cx="80" cy="78" rx="56" ry="40" fill="#333333" />
          {/* 기름 반사 */}
          <ellipse cx="70" cy="72" rx="20" ry="10" fill="#3E3E3E" opacity="0.5" />
        </svg>

        {/* 음식 (팬 위) */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-[55%] -translate-y-[55%]"
          initial={{ scale: 0, y: -30 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 15, delay: 0.2 }}
        >
          <PixelFood food={recipeType} phase={1} size={72} />
        </motion.div>
      </div>

      {/* 점화 버튼 */}
      <IgnitionButton onIgnite={onIgnite} />
    </motion.div>
  );
}
