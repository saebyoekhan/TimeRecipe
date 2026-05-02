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
        {/* 누르기 전: 깜빡이는 가이드 링 */}
        {!isPressing && (
          <motion.div
            className="absolute inset-[-6px] rounded-full border-2 border-point/60 pointer-events-none"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.6, 0, 0.6],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        )}

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
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute -bottom-10 whitespace-nowrap text-sm text-cream text-pixel-stroke font-bold tracking-widest pointer-events-none"
      >
        {isPressing ? '🔥 점화 중...' : '👇 꾹 누르세요'}
      </motion.p>
    </div>
  );
}
