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
        className="no-context-menu relative w-[44px] h-[44px] flex items-center justify-center cursor-pointer"
        {...handlers}
      >
        {/* 누르기 전: 깜빡이는 가이드 링 */}
        {!isPressing && (
          <motion.div
            className="absolute inset-[-8px] rounded-full border-2 border-point/60 pointer-events-none"
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        )}

        {/* 손잡이 오버레이 (배경 손잡이 위에 겹쳐서 회전) */}
        <motion.div
          className="w-[44px] h-[44px] rounded-full relative"
          animate={{
            rotate: isPressing ? progress * 90 : 0,
          }}
          transition={{ type: 'tween', ease: 'linear', duration: 0.05 }}
        >
          {/* 손잡이 본체 */}
          <div className="absolute inset-0 rounded-full bg-[#3a3a3a] border-[3px] border-[#2a2a2a] shadow-inner" />
          {/* 손잡이 위의 세로 표시선 (위치 인디케이터) */}
          <div className="absolute top-[5px] left-1/2 -translate-x-1/2 w-[6px] h-[12px] bg-[#666] rounded-sm" />
        </motion.div>

        {/* 꾹 누르면 손잡이 주변에 붉은 빛이 퍼지는 효과 */}
        {isPressing && (
          <motion.div
            className="absolute inset-[-10px] rounded-full pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            style={{
              background: `radial-gradient(circle, rgba(255,107,53,${0.2 + progress * 0.6}) 0%, transparent 70%)`,
              boxShadow: `0 0 ${10 + progress * 25}px ${5 + progress * 12}px rgba(255,80,0,${0.15 + progress * 0.4})`,
            }}
          />
        )}
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute -top-8 whitespace-nowrap text-xs text-cream text-pixel-stroke font-bold tracking-widest pointer-events-none"
      >
        {isPressing ? '🔥 점화 중...' : '👇 꾹 누르세요'}
      </motion.p>
    </div>
  );
}
