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
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* 음식 (배경의 프라이팬 중앙) */}
      <motion.div
        className="absolute z-10 pointer-events-auto"
        style={{ top: '53%', left: '50%', x: '-50%', y: '-50%' }}
        initial={{ scale: 0, y: -50, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <PixelFood food={recipeType} phase={1} size={160} />
      </motion.div>

      {/* 점화 버튼 (가스레인지 가운데 손잡이) */}
      <motion.div
        className="absolute z-20 pointer-events-auto"
        style={{ top: '76%', left: '50%', x: '-50%', y: '-50%' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <IgnitionButton onIgnite={onIgnite} />
      </motion.div>
    </div>
  );
}
