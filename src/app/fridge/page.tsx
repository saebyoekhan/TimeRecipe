'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { getHistory } from '@/lib/storage';
import { CookingRecord } from '@/lib/types';
import FridgeGrid from '@/components/fridge/FridgeGrid';

export default function FridgePage() {
  const router = useRouter();
  const [records, setRecords] = useState<CookingRecord[]>([]);

  useEffect(() => {
    setRecords(getHistory());
  }, []);

  const goldenCount = records.filter((r) => r.status === 'golden').length;

  return (
    <main className="flex-1 flex flex-col py-8 px-6 wood-bg">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => router.push('/')}
          className="text-sm text-brown-light/60 hover:text-brown font-medium transition-colors"
        >
          ← 돌아가기
        </button>
        <h1 className="text-lg font-bold text-brown">🧊 냉장고</h1>
        <div className="w-16" />
      </div>

      {/* 통계 */}
      {records.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="wood-card flex justify-center gap-8 p-4 mb-6 text-center"
        >
          <div>
            <p className="text-xl font-bold text-brown">{records.length}</p>
            <p className="text-[10px] text-brown-light/50 font-medium">전체 요리</p>
          </div>
          <div>
            <p className="text-xl font-bold text-success">{goldenCount}</p>
            <p className="text-[10px] text-brown-light/50 font-medium">⭐ Golden</p>
          </div>
          <div>
            <p className="text-xl font-bold text-point">
              {records.length > 0 ? Math.round((goldenCount / records.length) * 100) : 0}%
            </p>
            <p className="text-[10px] text-brown-light/50 font-medium">성공률</p>
          </div>
        </motion.div>
      )}

      {/* 그리드 */}
      <FridgeGrid records={records} />
    </main>
  );
}
