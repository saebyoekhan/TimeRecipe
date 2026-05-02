'use client';

import { motion } from 'framer-motion';
import { useLongPress } from '@/hooks/useLongPress';

interface IgnitionButtonProps {
  onIgnite: () => void;
}

export default function IgnitionButton({ onIgnite }: IgnitionButtonProps) {
  const { progress, isPressing, handlers } = useLongPress({
    onComplete: onIgnite,
  });

  return (
    <div className="flex flex-col items-center justify-center relative">
      <motion.div
        className="no-context-menu relative w-14 h-14 flex items-center justify-center cursor-pointer"
        initial={{ scale: 1 }}
        animate={{ 
          scale: isPressing ? 1.05 : 1,
          rotate: isPressing ? progress * 90 : 0,
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        {...handlers}
      >
        {/* 꾹 누르면 손잡이 주변에 붉은 빛이 퍼지는 효과 */}
        {isPressing && (
          <motion.div
            className="absolute inset-[-8px] rounded-full pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 0.6, repeat: Infinity }}
            style={{
              background: `radial-gradient(circle, rgba(255,107,53,${0.3 + progress * 0.5}) 0%, rgba(255,60,0,${progress * 0.3}) 60%, transparent 100%)`,
              boxShadow: `0 0 ${8 + progress * 20}px ${4 + progress * 10}px rgba(255,107,53,${0.2 + progress * 0.4})`,
            }}
          />
        )}

        {/* 프로그레스 테두리 (사각형, 손잡이에 맞춤) */}
        {isPressing && (
          <svg className="absolute inset-[-6px] w-[calc(100%+12px)] h-[calc(100%+12px)] pointer-events-none" viewBox="0 0 100 100">
            <rect
              x="5" y="5" width="90" height="90" rx="8" ry="8"
              fill="none"
              stroke={`rgba(255, ${Math.round(200 - progress * 150)}, ${Math.round(100 - progress * 100)}, ${0.6 + progress * 0.4})`}
              strokeWidth="4"
              strokeDasharray={`${360 * progress} ${360 * (1 - progress)}`}
              className="transition-all duration-75"
            />
          </svg>
        )}
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute -bottom-8 whitespace-nowrap text-xs text-cream text-pixel-stroke font-medium tracking-widest pointer-events-none"
      >
        {isPressing ? '점화 중...' : '꾹 누르세요'}
      </motion.p>
    </div>
  );
}
