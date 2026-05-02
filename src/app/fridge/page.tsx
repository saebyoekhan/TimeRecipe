'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { getHistory } from '@/lib/storage';
import { CookingRecord } from '@/lib/types';
import FridgeGrid from '@/components/fridge/FridgeGrid';
import BottomDock from '@/components/shared/BottomDock';

export default function FridgePage() {
  const router = useRouter();
  const [records, setRecords] = useState<CookingRecord[]>([]);

  useEffect(() => {
    setRecords(getHistory());
  }, []);

  const goldenCount = records.filter((r) => r.status === 'golden').length;

  return (
    <main className="flex-1 flex flex-col relative fridge-bg">
      <div className="absolute inset-0 bg-black/40 z-0" />
      <div className="flex-1 flex flex-col py-8 px-6 relative z-10">
      {/* 헤더 */}
      <div className="flex items-center justify-center mb-6">
        <h1 className="text-xl font-bold text-cream text-pixel-stroke tracking-widest">🧊 냉장고</h1>
      </div>

      {/* 통계 */}
      {records.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black/90 border-4 border-wood-dark shadow-[6px_6px_0px_rgba(0,0,0,0.8)] flex justify-center gap-8 p-4 mb-6 text-center"
        >
          <div>
            <p className="text-2xl font-bold text-wood-light text-pixel-stroke">{records.length}</p>
            <p className="text-xs text-cream/70 font-medium tracking-widest mt-1">전체 요리</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-success text-pixel-stroke">{goldenCount}</p>
            <p className="text-xs text-cream/70 font-medium tracking-widest mt-1">⭐ Golden</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-point text-pixel-stroke">
              {records.length > 0 ? Math.round((goldenCount / records.length) * 100) : 0}%
            </p>
            <p className="text-xs text-cream/70 font-medium tracking-widest mt-1">성공률</p>
          </div>
        </motion.div>
      )}

      {/* 그리드 */}
      <FridgeGrid records={records} />
      </div>

      {/* 하단 독바 */}
      <div className="relative z-10">
        <BottomDock />
      </div>
    </main>
  );
}
