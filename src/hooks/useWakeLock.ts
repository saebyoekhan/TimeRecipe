import { useEffect, useRef } from 'react';

export function useWakeLock(active: boolean) {
  const wakeLockRef = useRef<WakeLockSentinel | null>(null);

  useEffect(() => {
    if (!active) {
      wakeLockRef.current?.release();
      wakeLockRef.current = null;
      return;
    }

    const request = async () => {
      try {
        if ('wakeLock' in navigator) {
          wakeLockRef.current = await navigator.wakeLock.request('screen');
        }
      } catch {
        // WakeLock not supported or denied
      }
    };

    request();

    // 탭 복귀 시 재요청
    const handleVisibility = () => {
      if (document.visibilityState === 'visible' && active) {
        request();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      wakeLockRef.current?.release();
      wakeLockRef.current = null;
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [active]);
}
