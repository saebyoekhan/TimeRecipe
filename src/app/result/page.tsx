'use client';

import { Suspense, useEffect, useState, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { getHistory } from '@/lib/storage';
import { CookingRecord } from '@/lib/types';
import ResultCard from '@/components/result/ResultCard';
import GoldenTimeBadge from '@/components/result/GoldenTimeBadge';
import FailReasonInput from '@/components/result/FailReasonInput';

export default function ResultPage() {
  return (
    <Suspense fallback={null}>
      <ResultContent />
    </Suspense>
  );
}

function ResultContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [record, setRecord] = useState<CookingRecord | null>(null);
  const [reasonSaved, setReasonSaved] = useState(false);

  useEffect(() => {
    const id = searchParams.get('id');
    if (!id) {
      router.replace('/');
      return;
    }
    const history = getHistory();
    const found = history.find((r) => r.id === id);
    if (!found) {
      router.replace('/');
      return;
    }
    setRecord(found);
    if (found.failReason) setReasonSaved(true);
  }, [searchParams, router]);

  const handleSaveReason = useCallback(
    (reason: string) => {
      if (!record) return;
      const history = getHistory();
      const idx = history.findIndex((r) => r.id === record.id);
      if (idx !== -1) {
        history[idx].failReason = reason;
        localStorage.setItem('timerecipe_history', JSON.stringify(history));
        setRecord({ ...record, failReason: reason });
        setReasonSaved(true);
      }
    },
    [record],
  );

  if (!record) return null;

  const isGolden = record.status === 'golden';
  const needsReason = !isGolden && !reasonSaved;

    <main className="flex-1 flex flex-col items-center justify-between py-12 px-6 relative pixel-bg">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-0" />
      
      {/* 축하 or 결과 */}
      <div className="z-10 flex-1 flex flex-col items-center justify-center gap-8 w-full">
        {isGolden && <GoldenTimeBadge />}
        <ResultCard record={record} />
        {needsReason && <FailReasonInput onSave={handleSaveReason} />}
      </div>

      {/* 하단 네비게이션 */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="flex gap-3 mt-8 z-10"
      >
        <button
          onClick={() => router.push('/')}
          className="px-6 py-2.5 bg-point text-white text-sm font-bold border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8)] tracking-widest hover:-translate-y-1 hover:shadow-[6px_6px_0px_rgba(0,0,0,0.8)] transition-all"
        >
          🍳 다시 요리하기
        </button>
        <button
          onClick={() => router.push('/fridge')}
          className="px-6 py-2.5 bg-wood text-cream text-sm font-bold border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8)] tracking-widest hover:-translate-y-1 hover:shadow-[6px_6px_0px_rgba(0,0,0,0.8)] transition-all"
        >
          🧊 냉장고 열기
        </button>
      </motion.div>
    </main>
  );
}
