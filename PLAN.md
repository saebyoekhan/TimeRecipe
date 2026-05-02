# 타임레시피 (Time Recipe) 구현 계획

## Context
시간 예측력을 훈련하는 '사부작' 감성 생산성 타이머 앱. 시간을 요리 메타포로 치환하여 예측 시간 vs 실제 시간의 차이(Time Gap)를 통해 메타인지를 강화하는 것이 핵심 목표. 빈 프로젝트에서 처음부터 구축.

## 기술 스택
- **Next.js (App Router)** + TypeScript + Tailwind CSS
- **Framer Motion** (애니메이션/트랜지션)
- **React Context API** (상태관리)
- **LocalStorage** (데이터 저장, 서버 없음)
- **@ducanh2912/next-pwa** (PWA)
- **Vercel** 배포

---

## 폴더 구조

```
src/
├── app/
│   ├── layout.tsx              # 루트 레이아웃 (폰트, 프로바이더, 메타데이터)
│   ├── page.tsx                # 홈: 할일 입력 + 레시피 선택
│   ├── cooking/page.tsx        # 조리 화면 (타이머)
│   ├── result/page.tsx         # 판정 화면 (성공/실패)
│   ├── fridge/page.tsx         # 냉장고 도감
│   └── globals.css
├── components/
│   ├── home/                   # TaskInput, RecipeCarousel, RecipeCard
│   ├── cooking/                # CookingView, FoodProgress, TimerDisplay, StopButton
│   ├── result/                 # ResultCard, FailReasonInput, GoldenTimeBadge
│   ├── fridge/                 # FridgeGrid, DishCard
│   └── shared/                 # LongPressButton, PageTransition, Header
├── contexts/
│   ├── TimerContext.tsx         # 활성 타이머 상태
│   └── RecipeContext.tsx        # 선택된 할일 + 레시피
├── hooks/
│   ├── useTimer.ts             # 타이머 로직 (timestamp 기반, 드리프트 방지)
│   ├── useLongPress.ts         # 롱프레스 제스처
│   ├── useLocalStorage.ts      # localStorage 유틸
│   └── useWakeLock.ts          # 화면 꺼짐 방지
├── lib/
│   ├── types.ts                # 타입 정의
│   ├── storage.ts              # localStorage CRUD
│   ├── recipes.ts              # 레시피-음식 매핑
│   └── constants.ts            # 색상, 임계값 상수
└── public/
    ├── foods/{food}/raw.svg, half.svg, done.svg
    └── backgrounds/counter.svg, burner.svg
```

---

## 데이터 모델 (LocalStorage)

```typescript
type RecipeDuration = 5 | 10 | 15 | 30 | 60 | 120;
type CookingStatus = 'golden' | 'done' | 'burned' | 'abandoned';

interface CookingRecord {
  id: string;                     // crypto.randomUUID()
  taskName: string;
  recipeDuration: RecipeDuration;
  recipeType: string;             // "egg", "toast" 등
  startedAt: string;              // ISO timestamp
  endedAt: string;
  targetSeconds: number;
  actualSeconds: number;
  deviationSeconds: number;       // 음수 = 일찍, 양수 = 늦게
  status: CookingStatus;
  failReason?: string;
}

// 키: "timerecipe_history" (CookingRecord[])
// 키: "timerecipe_active" (ActiveSession) - 크래시 복구용
```

## 레시피-음식 매핑

| 시간 | 음식 | 표시명 |
|------|------|--------|
| 5분 | egg | 계란후라이 |
| 10분 | toast | 토스트 |
| 15분 | pancake | 팬케이크 |
| 30분 | pasta | 파스타 |
| 60분 | stew | 스튜 |
| 120분 | roast | 로스트 |

---

## 구현 단계

### Phase 1: 프로젝트 초기 세팅
- `create-next-app` (TypeScript + Tailwind + App Router)
- `framer-motion`, `@ducanh2912/next-pwa` 설치
- CSS 변수 설정 (Base: #F9F8F6, Point: #FF6B35, Neutral: #2D2D2D)
- `types.ts`, `constants.ts`, `recipes.ts`, `storage.ts` 작성
- 4개 라우트 페이지 스캐폴딩
- 루트 레이아웃 (폰트: Pretendard 또는 시스템 Sans-serif)

### Phase 2: 홈 화면 - 할일 입력 + 레시피 선택
- `TaskInput` (주문서 스타일 입력 필드)
- `RecipeCard` (음식 아이콘 + 시간 라벨)
- `RecipeCarousel` (부채꼴 펼침 애니메이션)
- `RecipeContext` 연결
- `useLongPress` 훅 (2초, 원형 프로그레스)
- 롱프레스 완료 → `/cooking` 네비게이션

### Phase 3: 조리 화면 - 타이머 핵심
- `useTimer` 훅 (startedAt 타임스탬프 기반, setInterval 1초 틱)
- `TimerContext` 프로바이더
- `BurnerBackground` (인덕션 상단 뷰)
- `FoodProgress` (3단계 이미지 전환: raw → half → done, AnimatePresence)
- `TimerDisplay` (숫자 타이머, 기본 숨김, 토글로 페이드인 + blur 효과)
- `StopButton` (서빙 버튼)
- 자동 방치 처리 (목표+10분 경과 시 "타버린 요리")
- `timerecipe_active` localStorage 저장/복구
- `useWakeLock` (화면 꺼짐 방지)

### Phase 4: 판정 화면 - 결과
- 성공/실패 판정 로직 (golden: ±2분, 5분레시피는 ±1분)
- `ResultCard` (할일명, 시간, 오차 표시)
- `GoldenTimeBadge` (성공 시 축하 애니메이션)
- `FailReasonInput` (텍스트 + 자주 찾는 사유 칩 버튼)
- 기록 저장 → localStorage history, active 세션 삭제
- 네비게이션: "다시 요리하기" → `/`, "냉장고 열기" → `/fridge`

### Phase 5: 냉장고 도감
- `DishCard` (썸네일, 상태 뱃지, 요약 통계)
- `FridgeGrid` (CSS 그리드)
- 빈 상태 UI
- 정렬/필터 (날짜, 상태)

### Phase 6: 트랜지션 & 폴리시
- `layoutId` Shared Element Transition (카드 → 조리 화면 음식)
- 배경 크로스페이드 (조리대 → 화구)
- `PageTransition` 래퍼 (모든 라우트)
- 레시피 카드 스태거 애니메이션
- 햅틱 피드백 (`navigator.vibrate`)

### Phase 7: PWA + 최종
- `next-pwa` 설정, manifest.json
- iOS standalone 메타 태그
- 크래시 복구 (새로고침 시 `timerecipe_active` 감지 → 재개)
- 모바일 테스트 (Safari, Chrome)
- Vercel 배포

---

## 주요 기술 결정

- **타이머:** `setInterval` 카운터 대신 `Date.now() - startedAt` 방식 → 백그라운드 탭 스로틀링에도 정확
- **크래시 복구:** `timerecipe_active` 별도 키로 진행 중 세션 추적
- **Shared Element:** Framer Motion `layoutId`로 카드↔조리화면 전환
- **음식 이미지:** SVG (완벽 스케일링, 작은 용량, PWA 오프라인 캐시 호환). MVP에서는 CSS/이모지 대체 가능

## 주의사항
- iOS Safari: `wakeLock` 미지원 → 무음 오디오 루프 폴백
- iOS: `navigator.vibrate` 미지원
- 모바일 롱프레스: `touch-action: none` 필수 (스크롤 방지)
- Next.js App Router + AnimatePresence: 클라이언트 컴포넌트 경계 필요

---

## 검증 방법
1. `npm run dev`로 로컬 실행 후 전체 플로우 테스트 (입력 → 레시피 선택 → 롱프레스 → 조리 → 정지 → 판정 → 냉장고)
2. 5분 레시피로 ±1분 골든타임 판정 확인
3. 10분 방치 후 자동 "타버림" 처리 확인
4. 새로고침 시 크래시 복구 확인
5. 모바일 브라우저에서 PWA 설치 및 오프라인 동작 확인
6. Vercel 배포 후 실제 디바이스 테스트
