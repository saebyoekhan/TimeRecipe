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
    <div className="flex flex-col items-center gap-2">
      <motion.div
        className="no-context-menu relative"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.3 }}
        {...handlers}
      >
        {/* 가스 스토브 다이얼 */}
        <div className={`w-20 h-20 rounded-full flex items-center justify-center cursor-pointer
                        transition-all duration-200 relative
                        ${isPressing
                          ? 'bg-gradient-to-br from-red-400 to-red-600 shadow-lg shadow-red-400/40'
                          : 'bg-gradient-to-br from-neutral/70 to-neutral/90 shadow-lg shadow-neutral/30'
                        }`}
        >
          {/* 다이얼 표시 */}
          <div className="w-14 h-14 rounded-full bg-neutral/20 flex items-center justify-center">
            <motion.div
              animate={{ rotate: isPressing ? 90 : 0 }}
              transition={{ duration: 0.3 }}
              className="w-1.5 h-7 bg-white/80 rounded-full origin-bottom"
              style={{ transformOrigin: '50% 80%' }}
            />
          </div>

          {/* 프로그레스 링 */}
          {isPressing && (
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 80 80">
              <circle
                cx="40" cy="40" r="37"
                fill="none"
                stroke="white"
                strokeWidth="3"
                strokeOpacity={0.5}
                strokeDasharray={`${2 * Math.PI * 37}`}
                strokeDashoffset={`${2 * Math.PI * 37 * (1 - progress)}`}
                strokeLinecap="round"
              />
            </svg>
          )}
        </div>

        {/* 불꽃 이펙트 */}
        {isPressing && (
          <motion.div
            className="absolute -top-3 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: [0.5, 1, 0.5], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 0.4, repeat: Infinity }}
          >
            🔥
          </motion.div>
        )}
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-[11px] text-brown-light/50 font-medium"
      >
        {isPressing ? '점화 중...' : '꾹 눌러서 점화'}
      </motion.p>
    </div>
  );
}
