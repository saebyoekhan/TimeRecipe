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
      className="flex flex-col items-center gap-6 py-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      {/* 후라이팬 + 음식 */}
      <div className="relative">
        {/* 팬 SVG */}
        <svg width="200" height="170" viewBox="0 0 200 170" style={{ imageRendering: 'pixelated' }}>
          {/* 팬 손잡이 */}
          <rect x="155" y="70" width="42" height="14" rx="4" fill="#5D4037" />
          <rect x="155" y="73" width="42" height="8" rx="3" fill="#6D4C41" />
          {/* 팬 몸체 */}
          <ellipse cx="88" cy="90" rx="78" ry="60" fill="#616161" />
          <ellipse cx="88" cy="88" rx="74" ry="56" fill="#757575" />
          {/* 팬 안쪽 */}
          <ellipse cx="88" cy="85" rx="65" ry="48" fill="#424242" />
          <ellipse cx="88" cy="83" rx="61" ry="44" fill="#333333" />
          {/* 기름 반사 */}
          <ellipse cx="78" cy="77" rx="22" ry="12" fill="#3E3E3E" opacity="0.5" />
        </svg>

        {/* 음식 (팬 위) */}
        <motion.div
          className="absolute top-1/2 left-[44%] -translate-x-1/2 -translate-y-[55%]"
          initial={{ scale: 0, y: -30 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 15, delay: 0.15 }}
        >
          <PixelFood food={recipeType} phase={1} size={100} />
        </motion.div>
      </div>

      {/* 점화 버튼 */}
      <IgnitionButton onIgnite={onIgnite} />
    </motion.div>
  );
}
