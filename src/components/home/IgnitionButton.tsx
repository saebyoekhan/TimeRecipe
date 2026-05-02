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
    <div className="flex flex-col items-center gap-3">
      <motion.div
        className="no-context-menu relative"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.3 }}
        {...handlers}
      >
        {/* 픽셀아트 느낌의 레트로 버튼 */}
        <div className={`w-24 h-16 flex items-center justify-center cursor-pointer border-4 border-black
                        transition-all duration-75 relative bg-point text-white text-lg font-bold
                        ${isPressing
                          ? 'shadow-[2px_2px_0px_rgba(0,0,0,0.8)] translate-y-[2px] translate-x-[2px] bg-point-dark'
                          : 'shadow-[4px_4px_0px_rgba(0,0,0,0.8)]'
                        }`}
        >
          <div className="flex items-center gap-2">
            <span>{isPressing ? '🔥' : '🔥'}</span>
            <span className="text-pixel-stroke tracking-widest">IGNITE</span>
          </div>
          
          {/* 프로그레스 바 (버튼 테두리 대신 내부 게이지로) */}
          {isPressing && (
            <div className="absolute bottom-0 left-0 h-1.5 bg-yellow-400 border-t-2 border-black" 
                 style={{ width: `${progress * 100}%` }} />
          )}
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-xs text-cream text-pixel-stroke font-medium tracking-widest"
      >
        {isPressing ? '점화 중...' : '꾹 눌러서 점화'}
      </motion.p>
    </div>
  );
}
