import { useState, useEffect, useCallback, useRef } from 'react';

interface UseTimerOptions {
  startedAt: string;
  targetSeconds: number;
  onBurn: () => void;
}

export function useTimer({ startedAt, targetSeconds, onBurn }: UseTimerOptions) {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const burnCalledRef = useRef(false);

  const progressPercent = Math.min((elapsedSeconds / targetSeconds) * 100, 100);
  const phase = progressPercent < 50 ? 1 : progressPercent < 100 ? 2 : 3;
  const isOvertime = elapsedSeconds > targetSeconds;

  useEffect(() => {
    if (!isRunning) return;

    const startTime = new Date(startedAt).getTime();

    const tick = () => {
      const now = Date.now();
      const elapsed = Math.floor((now - startTime) / 1000);
      setElapsedSeconds(elapsed);

      // 방치 처리: 목표 시간 + 10분 경과
      if (elapsed > targetSeconds + 600 && !burnCalledRef.current) {
        burnCalledRef.current = true;
        onBurn();
      }
    };

    tick(); // 즉시 1회 실행
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [isRunning, startedAt, targetSeconds, onBurn]);

  const stop = useCallback(() => {
    setIsRunning(false);
  }, []);

  return {
    elapsedSeconds,
    isRunning,
    progressPercent,
    phase: phase as 1 | 2 | 3,
    isOvertime,
    stop,
  };
}
