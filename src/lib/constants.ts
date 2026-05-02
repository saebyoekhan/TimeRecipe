export const COLORS = {
  base: '#F9F8F6',
  point: '#FF6B35',
  neutral: '#2D2D2D',
} as const;

export const GOLDEN_TIME_THRESHOLD = {
  default: 120, // ±2분 (초)
  short: 60,    // ±1분 (5분 레시피용)
} as const;

export const BURN_TIMEOUT = 600; // 10분 (초) - 목표 초과 후 방치 시간

export const LONG_PRESS_DURATION = 2000; // 2초 (ms)

export const MIN_DURATION = 1;   // 최소 1분
export const MAX_DURATION = 120; // 최대 120분

export const STORAGE_KEYS = {
  history: 'timerecipe_history',
  active: 'timerecipe_active',
} as const;

export const COMMON_FAIL_REASONS = [
  '급한 연락이 와서',
  '예상보다 오래 걸림',
  '다른 일이 끼어듦',
  '집중력이 흐트러짐',
  '일찍 끝남',
] as const;
