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
    <div className="flex flex-col items-center justify-center">
      <motion.div
        className="no-context-menu relative w-16 h-16 rounded-full flex items-center justify-center cursor-pointer"
        initial={{ scale: 1 }}
        animate={{ scale: isPressing ? 1.1 : 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        {...handlers}
      >
        {/* 눌렀을 때만 나타나는 게이지/효과 */}
        {isPressing && (
          <>
            <div className="absolute inset-0 rounded-full bg-point-dark/40 animate-pulse" />
            <svg className="absolute inset-[-10px] w-[calc(100%+20px)] h-[calc(100%+20px)] -rotate-90 pointer-events-none" viewBox="0 0 100 100">
              <circle
                cx="50" cy="50" r="46"
                fill="none"
                stroke="#FF6F00"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 46}`}
                strokeDashoffset={`${2 * Math.PI * 46 * (1 - progress)}`}
                className="transition-all duration-75"
              />
            </svg>
            <span className="absolute -top-10 text-2xl animate-bounce">🔥</span>
          </>
        )}
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute -bottom-8 whitespace-nowrap text-xs text-cream text-pixel-stroke font-medium tracking-widest pointer-events-none"
      >
        {isPressing ? '점화 중...' : '손잡이를 꾹 누르세요'}
      </motion.p>
    </div>
  );
}
