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
      className="w-full max-w-sm mx-auto flex flex-col gap-3"
    >
      <p className="text-xs text-brown-light/60 text-center font-medium">어떤 일이 있었나요?</p>

      {/* 자주 찾는 사유 */}
      <div className="flex flex-wrap justify-center gap-2">
        {COMMON_FAIL_REASONS.map((r) => (
          <button
            key={r}
            onClick={() => {
              setReason(r);
              onSave(r);
            }}
            className="text-xs px-3 py-1.5 rounded-lg bg-wood/15 text-brown-light font-medium
                       hover:bg-point/20 hover:text-point-dark transition-colors"
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
          className="flex-1 px-3 py-2 text-sm bg-cream rounded-lg border-2 border-wood/20
                     text-brown focus:outline-none focus:border-point/50 transition-colors"
        />
        <button
          onClick={() => reason.trim() && onSave(reason.trim())}
          disabled={!reason.trim()}
          className="px-4 py-2 text-sm rounded-lg bg-point text-white font-bold
                     disabled:opacity-30 disabled:cursor-not-allowed transition-opacity pixel-shadow"
        >
          저장
        </button>
      </div>
    </motion.div>
  );
}
