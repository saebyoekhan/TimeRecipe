import { useCallback, useRef, useState } from 'react';
import { LONG_PRESS_DURATION } from '@/lib/constants';

interface UseLongPressOptions {
  duration?: number;
  onComplete: () => void;
}

export function useLongPress({ duration = LONG_PRESS_DURATION, onComplete }: UseLongPressOptions) {
  const [progress, setProgress] = useState(0);
  const [isPressing, setIsPressing] = useState(false);
  const startTimeRef = useRef<number>(0);
  const rafRef = useRef<number>(0);

  const animate = useCallback(() => {
    const elapsed = Date.now() - startTimeRef.current;
    const pct = Math.min(elapsed / duration, 1);
    setProgress(pct);

    if (pct >= 1) {
      setIsPressing(false);
      onComplete();
      return;
    }

    rafRef.current = requestAnimationFrame(animate);
  }, [duration, onComplete]);

  const start = useCallback(() => {
    startTimeRef.current = Date.now();
    setIsPressing(true);
    setProgress(0);
    rafRef.current = requestAnimationFrame(animate);
  }, [animate]);

  const cancel = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    setIsPressing(false);
    setProgress(0);
  }, []);

  const handlers = {
    onPointerDown: start,
    onPointerUp: cancel,
    onPointerLeave: cancel,
    onContextMenu: (e: React.MouseEvent) => e.preventDefault(),
  };

  return { progress, isPressing, handlers };
}
