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
    <main className="flex-1 flex flex-col items-center justify-between py-12 px-6 relative overflow-hidden counter-bg">
      {/* 배경은 counter-bg 클래스의 이미지로 처리됨 */}

      {/* 할일 이름 */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="z-10 wood-card px-5 py-2"
      >
        <p className="text-sm font-medium text-brown text-center">
          {session.taskName}
        </p>
      </motion.div>

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
      <div className="flex flex-col items-center gap-5 z-10">
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
