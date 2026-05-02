'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { COMMON_FAIL_REASONS } from '@/lib/constants';

interface FailReasonInputProps {
  onSave: (reason: string) => void;
}

export default function FailReasonInput({ onSave }: FailReasonInputProps) {
  const [reason, setReason] = useState('');

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="w-full max-w-sm mx-auto flex flex-col gap-3 z-10"
    >
      <p className="text-xs text-cream text-pixel-stroke text-center font-bold tracking-widest">어떤 일이 있었나요?</p>

      {/* 자주 찾는 사유 */}
      <div className="flex flex-wrap justify-center gap-2">
        {COMMON_FAIL_REASONS.map((r) => (
          <button
            key={r}
            onClick={() => {
              setReason(r);
              onSave(r);
            }}
            className="text-xs px-3 py-1.5 border-2 border-black bg-wood-dark text-cream font-bold
                       hover:bg-point hover:-translate-y-0.5 transition-transform shadow-[2px_2px_0px_rgba(0,0,0,0.8)]"
          >
            {r}
          </button>
        ))}
      </div>

      {/* 직접 입력 */}
      <div className="flex gap-2">
        <input
          type="text"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="직접 입력..."
          className="flex-1 px-3 py-2 text-sm bg-black/60 border-2 border-wood-light
                     text-cream placeholder-wood-dark focus:outline-none focus:border-point transition-colors"
        />
        <button
          onClick={() => reason.trim() && onSave(reason.trim())}
          disabled={!reason.trim()}
          className="px-4 py-2 text-sm border-2 border-black bg-point text-white font-bold
                     disabled:opacity-30 disabled:cursor-not-allowed hover:-translate-y-0.5 transition-transform shadow-[2px_2px_0px_rgba(0,0,0,0.8)]"
        >
          저장
        </button>
      </div>
    </motion.div>
  );
}
