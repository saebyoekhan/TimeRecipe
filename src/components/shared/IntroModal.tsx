'use client';

import { motion } from 'framer-motion';

interface IntroModalProps {
  onClose: () => void;
}

// 픽셀 메모지 프레임 (종이 텍스처 + 테이프)
export default function IntroModal({ onClose }: IntroModalProps) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* 배경 딤 */}
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />

      {/* 메모지 본체 */}
      <motion.div
        className="relative w-full max-w-sm"
        initial={{ scale: 0.8, rotate: -2, y: 30 }}
        animate={{ scale: 1, rotate: 0, y: 0 }}
        exit={{ scale: 0.8, rotate: 2, y: 30 }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      >
        {/* 테이프 (상단) */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
          <svg width="80" height="24" viewBox="0 0 80 24" style={{ imageRendering: 'pixelated' }}>
            <rect x="0" y="4" width="80" height="16" fill="#FFE082" opacity="0.7" />
            <rect x="0" y="4" width="80" height="2" fill="#FFF9C4" opacity="0.5" />
            <rect x="0" y="18" width="80" height="2" fill="#FFB74D" opacity="0.3" />
            {/* 테이프 찢어진 가장자리 */}
            <rect x="0" y="4" width="4" height="4" fill="#FFE082" opacity="0.4" />
            <rect x="76" y="16" width="4" height="4" fill="#FFE082" opacity="0.4" />
          </svg>
        </div>

        {/* 메모지 종이 */}
        <div className="relative bg-[#FFF9C4] border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,0.8)] p-6 pt-8"
          style={{ transform: 'rotate(-0.5deg)' }}
        >
          {/* 줄무늬 (노트 라인) */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="w-full h-px bg-blue-200/40"
                style={{ marginTop: i === 0 ? '60px' : '22px' }}
              />
            ))}
            {/* 왼쪽 빨간 세로줄 */}
            <div className="absolute top-0 bottom-0 left-8 w-px bg-red-300/50" />
          </div>

          {/* 콘텐츠 */}
          <div className="relative z-10">
            {/* 타이틀 */}
            <h2 className="text-xl font-bold text-[#3E2723] text-center mb-1 tracking-wider">
              📋 타임레시피란?
            </h2>
            <p className="text-xs text-[#795548] text-center mb-5">
              시간 감각을 훈련하는 요리 타이머
            </p>

            {/* 핵심 설명 */}
            <div className="bg-[#FFF3E0]/60 border-2 border-[#D7CCC8] p-3 mb-5">
              <p className="text-xs text-[#4E342E] leading-relaxed text-center">
                예상한 시간과 실제 시간의 차이를 측정해,<br />
                당신의 <span className="font-bold text-[#D35400]">시간 감각</span>을 훈련하는 타이머입니다.
              </p>
            </div>

            {/* 3단계 사용법 */}
            <div className="flex flex-col gap-4 mb-5">
              {/* Step 1 */}
              <div className="flex gap-3 items-start">
                <div className="w-10 h-10 bg-[#D35400] border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,0.8)] flex items-center justify-center shrink-0">
                  <span className="text-white font-bold text-sm">1</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-[#3E2723]">📋 할 일을 적으세요</p>
                  <p className="text-[11px] text-[#795548] leading-relaxed mt-0.5">
                    작업을 주문서에 적고,<br/>걸릴 것 같은 시간의 레시피를 선택하세요.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-3 items-start">
                <div className="w-10 h-10 bg-[#D35400] border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,0.8)] flex items-center justify-center shrink-0">
                  <span className="text-white font-bold text-sm">2</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-[#3E2723]">🍳 요리에 집중하세요</p>
                  <p className="text-[11px] text-[#795548] leading-relaxed mt-0.5">
                    숫자 타이머는 숨겨져 있어요.<br/>감각에 집중하며 작업하세요.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-3 items-start">
                <div className="w-10 h-10 bg-[#D35400] border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,0.8)] flex items-center justify-center shrink-0">
                  <span className="text-white font-bold text-sm">3</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-[#3E2723]">⭐ 결과를 확인하세요</p>
                  <p className="text-[11px] text-[#795548] leading-relaxed mt-0.5">
                    목표 시간 <span className="font-bold">±2분</span> 이내면 Golden Time!<br/>
                    오차를 줄여가며 시간 감각을 키워보세요.
                  </p>
                </div>
              </div>
            </div>

            {/* 마무리 문구 */}
            <div className="text-center mb-4 border-t-2 border-dashed border-[#D7CCC8] pt-4">
              <p className="text-xs text-[#795548] italic leading-relaxed">
                매일 조금씩, 정확해지는 나만의 시간 감각.<br />
                오늘도 한 접시 요리해 볼까요? 🍽️
              </p>
            </div>

            {/* 닫기 버튼 */}
            <button
              onClick={onClose}
              className="w-full py-3 bg-[#D35400] text-white font-bold text-sm tracking-widest
                         border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8)]
                         hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_rgba(0,0,0,0.8)]
                         active:translate-y-1 active:shadow-[2px_2px_0px_rgba(0,0,0,0.8)]
                         transition-all"
            >
              🍳 요리 시작하기
            </button>
          </div>

          {/* 메모지 접힌 모서리 */}
          <div className="absolute bottom-0 right-0 w-6 h-6 overflow-hidden">
            <div className="absolute bottom-0 right-0 w-0 h-0 border-l-[24px] border-t-[24px] border-l-transparent border-t-[#F5E6B8]" />
            <div className="absolute bottom-0 right-0 w-0 h-0 border-l-[24px] border-t-[24px] border-l-[#E8D5A0] border-t-transparent" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
