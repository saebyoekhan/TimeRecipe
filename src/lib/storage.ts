import { STORAGE_KEYS } from './constants';
import { ActiveSession, CookingRecord } from './types';

function getItem<T>(key: string): T | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function setItem<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(value));
}

function removeItem(key: string): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(key);
}

// History
export function getHistory(): CookingRecord[] {
  return getItem<CookingRecord[]>(STORAGE_KEYS.history) ?? [];
}

export function addRecord(record: CookingRecord): void {
  const history = getHistory();
  history.unshift(record);
  setItem(STORAGE_KEYS.history, history);
}

export function clearHistory(): void {
  removeItem(STORAGE_KEYS.history);
}

// Active Session
export function getActiveSession(): ActiveSession | null {
  return getItem<ActiveSession>(STORAGE_KEYS.active);
}

export function saveActiveSession(session: ActiveSession): void {
  setItem(STORAGE_KEYS.active, session);
}

export function clearActiveSession(): void {
  removeItem(STORAGE_KEYS.active);
}
