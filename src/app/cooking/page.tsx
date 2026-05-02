'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useTimer } from '@/hooks/useTimer';
import { useWakeLock } from '@/hooks/useWakeLock';
import { getActiveSession, clearActiveSession, addRecord } from '@/lib/storage';
import { ActiveSession, CookingRecord, RecipeDuration } from '@/lib/types';
import { GOLDEN_TIME_THRESHOLD } from '@/lib/constants';
import FoodProgress from '@/components/cooking/FoodProgress';
import TimerDisplay from '@/components/cooking/TimerDisplay';
import StopButton from '@/components/cooking/StopButton';

export default function CookingPage() {
  const router = useRouter();
  const [session, setSession] = useState<ActiveSession | null>(null);

  useEffect(() => {
    const active = getActiveSession();
    if (!active) {
      router.replace('/');
      return;
    }
    setSession(active);
  }, [router]);

  const handleBurn = useCallback(() => {
    if (!session) return;
    const now = new Date().toISOString();
    const actualSeconds = Math.floor((Date.now() - new Date(session.startedAt).getTime()) / 1000);
    const record: CookingRecord = {
      id: crypto.randomUUID(),
      taskName: session.taskName,
      recipeDuration: session.recipeDuration,
      recipeType: session.recipeType,
      startedAt: session.startedAt,
      endedAt: now,
      targetSeconds: session.targetSeconds,
      actualSeconds,
      deviationSeconds: actualSeconds - session.targetSeconds,
      status: 'burned',
      failReason: '방치됨',
    };
    addRecord(record);
    clearActiveSession();
    router.push(`/result?id=${record.id}`);
  }, [session, router]);

  const timer = useTimer({
    startedAt: session?.startedAt ?? new Date().toISOString(),
    targetSeconds: session?.targetSeconds ?? 300,
    onBurn: handleBurn,
  });

  useWakeLock(timer.isRunning);

  if (!session) return null;

  const handleStop = () => {
    timer.stop();
    const now = new Date().toISOString();
    const actualSeconds = timer.elapsedSeconds;
    const deviation = actualSeconds - session.targetSeconds;
    const threshold = session.recipeDuration === 5
      ? GOLDEN_TIME_THRESHOLD.short
      : GOLDEN_TIME_THRESHOLD.default;

    const status = Math.abs(deviation) <= threshold ? 'golden' : 'done';

    const record: CookingRecord = {
      id: crypto.randomUUID(),
      taskName: session.taskName,
      recipeDuration: session.recipeDuration,
      recipeType: session.recipeType,
      startedAt: session.startedAt,
      endedAt: now,
      targetSeconds: session.targetSeconds,
      actualSeconds,
      deviationSeconds: deviation,
      status,
    };

    addRecord(record);
    clearActiveSession();
    router.push(`/result?id=${record.id}`);
  };

  return (
    <main className="flex-1 flex flex-col items-center justify-between py-16 px-6 relative overflow-hidden">
      {/* 인덕션 화구 배경 */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="w-64 h-64 rounded-full border-2 border-neutral/5"
        />
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
          className="absolute w-48 h-48 rounded-full border border-neutral/5"
        />
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="absolute w-32 h-32 rounded-full border border-neutral/[0.03]"
        />
      </div>

      {/* 할일 이름 */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-sm text-neutral/40 text-center z-10"
      >
        {session.taskName}
      </motion.p>

      {/* 음식 프로그레스 */}
      <motion.div
        className="z-10"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      >
        <FoodProgress
          recipeDuration={session.recipeDuration as RecipeDuration}
          recipeType={session.recipeType}
          phase={timer.phase}
        />
      </motion.div>

      {/* 하단: 타이머 + 정지 버튼 */}
      <div className="flex flex-col items-center gap-6 z-10">
        <TimerDisplay
          elapsedSeconds={timer.elapsedSeconds}
          targetSeconds={session.targetSeconds}
          isOvertime={timer.isOvertime}
        />
        <StopButton onStop={handleStop} isOvertime={timer.isOvertime} />
      </div>
    </main>
  );
}
