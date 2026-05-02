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
      <p className="text-xs text-neutral/40 text-center">어떤 일이 있었나요?</p>

      {/* 자주 찾는 사유 */}
      <div className="flex flex-wrap justify-center gap-2">
        {COMMON_FAIL_REASONS.map((r) => (
          <button
            key={r}
            onClick={() => {
              setReason(r);
              onSave(r);
            }}
            className="text-xs px-3 py-1.5 rounded-full bg-neutral/5 text-neutral/60
                       hover:bg-point/10 hover:text-point transition-colors"
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
          className="flex-1 px-3 py-2 text-sm bg-white rounded-xl border border-neutral/10
                     focus:outline-none focus:border-point/40 transition-colors"
        />
        <button
          onClick={() => reason.trim() && onSave(reason.trim())}
          disabled={!reason.trim()}
          className="px-4 py-2 text-sm rounded-xl bg-point text-white
                     disabled:opacity-30 disabled:cursor-not-allowed transition-opacity"
        >
          저장
        </button>
      </div>
    </motion.div>
  );
}
