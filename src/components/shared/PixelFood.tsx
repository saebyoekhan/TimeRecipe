'use client';

interface PixelFoodProps {
  food: string;
  phase: 1 | 2 | 3;
  size?: number;
}

// 픽셀아트 스타일 음식 SVG (레퍼런스의 도트 감성)
export default function PixelFood({ food, phase, size = 80 }: PixelFoodProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" style={{ imageRendering: 'pixelated' }}>
      {renderFood(food, phase)}
    </svg>
  );
}

function renderFood(food: string, phase: 1 | 2 | 3) {
  switch (food) {
    case 'egg': return <EggPixel phase={phase} />;
    case 'toast': return <ToastPixel phase={phase} />;
    case 'pancake': return <PancakePixel phase={phase} />;
    case 'pasta': return <PastaPixel phase={phase} />;
    case 'stew': return <StewPixel phase={phase} />;
    case 'roast': return <RoastPixel phase={phase} />;
    default: return <EggPixel phase={phase} />;
  }
}

// 픽셀 블록 헬퍼
function P({ x, y, c }: { x: number; y: number; c: string }) {
  return <rect x={x} y={y} width={1} height={1} fill={c} />;
}

function Row({ y, startX, colors }: { y: number; startX: number; colors: string[] }) {
  return (
    <>
      {colors.map((c, i) => c !== '' ? <P key={i} x={startX + i} y={y} c={c} /> : null)}
    </>
  );
}

// === 계란 후라이 ===
function EggPixel({ phase }: { phase: 1 | 2 | 3 }) {
  if (phase === 1) {
    // 생달걀
    const sh = '#D4A574';
    const wh = '#FFF5E6';
    const hl = '#FFFFFF';
    return (
      <g>
        <Row y={10} startX={12} colors={[sh, sh, sh, sh, sh, sh, sh, sh]} />
        <Row y={11} startX={11} colors={[sh, wh, wh, wh, wh, wh, wh, wh, wh, sh]} />
        <Row y={12} startX={11} colors={[sh, wh, wh, hl, wh, wh, wh, wh, wh, sh]} />
        <Row y={13} startX={11} colors={[sh, wh, wh, wh, wh, wh, wh, wh, wh, sh]} />
        <Row y={14} startX={11} colors={[sh, wh, wh, wh, wh, wh, wh, wh, wh, sh]} />
        <Row y={15} startX={11} colors={[sh, wh, wh, wh, wh, wh, wh, wh, wh, sh]} />
        <Row y={16} startX={11} colors={[sh, wh, wh, wh, wh, wh, wh, wh, wh, sh]} />
        <Row y={17} startX={11} colors={[sh, wh, wh, wh, wh, wh, wh, wh, wh, sh]} />
        <Row y={18} startX={11} colors={[sh, wh, wh, wh, wh, wh, wh, wh, wh, sh]} />
        <Row y={19} startX={12} colors={[sh, sh, sh, sh, sh, sh, sh, sh]} />
      </g>
    );
  }
  if (phase === 2) {
    // 반숙
    const wh = '#FFFFFF';
    const yk = '#FFD54F';
    const ykd = '#FFC107';
    const bg = '#FFF8E1';
    return (
      <g>
        <Row y={8}  startX={10} colors={[wh, wh, wh, wh, wh, wh, wh, wh, wh, wh, wh, wh]} />
        <Row y={9}  startX={9}  colors={[wh, bg, bg, bg, bg, bg, bg, bg, bg, bg, bg, bg, wh]} />
        <Row y={10} startX={8}  colors={[wh, bg, bg, bg, bg, bg, bg, bg, bg, bg, bg, bg, bg, wh]} />
        <Row y={11} startX={8}  colors={[wh, bg, bg, bg, bg, bg, bg, bg, bg, bg, bg, bg, bg, wh]} />
        <Row y={12} startX={8}  colors={[wh, bg, bg, bg, yk, yk, yk, yk, bg, bg, bg, bg, bg, wh]} />
        <Row y={13} startX={8}  colors={[wh, bg, bg, yk, ykd, ykd, ykd, ykd, yk, bg, bg, bg, bg, wh]} />
        <Row y={14} startX={8}  colors={[wh, bg, bg, yk, ykd, '#FFF', ykd, ykd, yk, bg, bg, bg, bg, wh]} />
        <Row y={15} startX={8}  colors={[wh, bg, bg, yk, ykd, ykd, ykd, ykd, yk, bg, bg, bg, bg, wh]} />
        <Row y={16} startX={8}  colors={[wh, bg, bg, bg, yk, yk, yk, yk, bg, bg, bg, bg, bg, wh]} />
        <Row y={17} startX={8}  colors={[wh, bg, bg, bg, bg, bg, bg, bg, bg, bg, bg, bg, bg, wh]} />
        <Row y={18} startX={8}  colors={[wh, bg, bg, bg, bg, bg, bg, bg, bg, bg, bg, bg, bg, wh]} />
        <Row y={19} startX={9}  colors={[wh, bg, bg, bg, bg, bg, bg, bg, bg, bg, bg, bg, wh]} />
        <Row y={20} startX={10} colors={[wh, wh, wh, wh, wh, wh, wh, wh, wh, wh, wh, wh]} />
      </g>
    );
  }
  // 완성 (완숙)
  const wh = '#FFFFFF';
  const yk = '#FF8F00';
  const bg = '#FFF8E1';
  const edge = '#E6D5A8';
  return (
    <g>
      <Row y={7}  startX={10} colors={[edge, edge, edge, edge, edge, edge, edge, edge, edge, edge, edge, edge]} />
      <Row y={8}  startX={9}  colors={[edge, wh, wh, wh, wh, wh, wh, wh, wh, wh, wh, wh, wh, edge]} />
      <Row y={9}  startX={8}  colors={[edge, wh, bg, bg, bg, bg, bg, bg, bg, bg, bg, bg, wh, wh, edge]} />
      <Row y={10} startX={7}  colors={[edge, wh, bg, bg, bg, bg, bg, bg, bg, bg, bg, bg, bg, wh, wh, edge]} />
      <Row y={11} startX={7}  colors={[edge, wh, bg, bg, bg, bg, bg, bg, bg, bg, bg, bg, bg, wh, wh, edge]} />
      <Row y={12} startX={7}  colors={[edge, wh, bg, bg, bg, yk, yk, yk, yk, bg, bg, bg, bg, wh, wh, edge]} />
      <Row y={13} startX={7}  colors={[edge, wh, bg, bg, yk, yk, yk, yk, yk, yk, bg, bg, bg, wh, wh, edge]} />
      <Row y={14} startX={7}  colors={[edge, wh, bg, bg, yk, yk, '#FFB74D', yk, yk, yk, bg, bg, bg, wh, wh, edge]} />
      <Row y={15} startX={7}  colors={[edge, wh, bg, bg, yk, yk, yk, yk, yk, yk, bg, bg, bg, wh, wh, edge]} />
      <Row y={16} startX={7}  colors={[edge, wh, bg, bg, bg, yk, yk, yk, yk, bg, bg, bg, bg, wh, wh, edge]} />
      <Row y={17} startX={7}  colors={[edge, wh, bg, bg, bg, bg, bg, bg, bg, bg, bg, bg, bg, wh, wh, edge]} />
      <Row y={18} startX={7}  colors={[edge, wh, bg, bg, bg, bg, bg, bg, bg, bg, bg, bg, bg, wh, wh, edge]} />
      <Row y={19} startX={8}  colors={[edge, wh, wh, bg, bg, bg, bg, bg, bg, bg, bg, wh, wh, wh, edge]} />
      <Row y={20} startX={9}  colors={[edge, wh, wh, wh, wh, wh, wh, wh, wh, wh, wh, wh, wh, edge]} />
      <Row y={21} startX={10} colors={[edge, edge, edge, edge, edge, edge, edge, edge, edge, edge, edge, edge]} />
    </g>
  );
}

// === 토스트 ===
function ToastPixel({ phase }: { phase: 1 | 2 | 3 }) {
  const crust = phase === 1 ? '#D4A574' : phase === 2 ? '#C68B4E' : '#8B5E2B';
  const bread = phase === 1 ? '#FFF3E0' : phase === 2 ? '#FFE0B2' : '#FFCC80';
  const top = phase === 3 ? '#FFB74D' : bread;
  return (
    <g>
      <Row y={8}  startX={10} colors={[crust, crust, crust, crust, crust, crust, crust, crust, crust, crust, crust, crust]} />
      <Row y={9}  startX={9}  colors={[crust, top, top, top, top, top, top, top, top, top, top, top, top, crust]} />
      <Row y={10} startX={9}  colors={[crust, bread, bread, bread, bread, bread, bread, bread, bread, bread, bread, bread, bread, crust]} />
      <Row y={11} startX={9}  colors={[crust, bread, bread, bread, bread, bread, bread, bread, bread, bread, bread, bread, bread, crust]} />
      <Row y={12} startX={9}  colors={[crust, bread, bread, bread, bread, bread, bread, bread, bread, bread, bread, bread, bread, crust]} />
      <Row y={13} startX={9}  colors={[crust, bread, bread, bread, bread, bread, bread, bread, bread, bread, bread, bread, bread, crust]} />
      <Row y={14} startX={9}  colors={[crust, bread, bread, bread, bread, bread, bread, bread, bread, bread, bread, bread, bread, crust]} />
      <Row y={15} startX={9}  colors={[crust, bread, bread, bread, bread, bread, bread, bread, bread, bread, bread, bread, bread, crust]} />
      <Row y={16} startX={9}  colors={[crust, bread, bread, bread, bread, bread, bread, bread, bread, bread, bread, bread, bread, crust]} />
      <Row y={17} startX={9}  colors={[crust, bread, bread, bread, bread, bread, bread, bread, bread, bread, bread, bread, bread, crust]} />
      <Row y={18} startX={9}  colors={[crust, bread, bread, bread, bread, bread, bread, bread, bread, bread, bread, bread, bread, crust]} />
      <Row y={19} startX={9}  colors={[crust, bread, bread, bread, bread, bread, bread, bread, bread, bread, bread, bread, bread, crust]} />
      <Row y={20} startX={9}  colors={[crust, bread, bread, bread, bread, bread, bread, bread, bread, bread, bread, bread, bread, crust]} />
      <Row y={21} startX={10} colors={[crust, crust, crust, crust, crust, crust, crust, crust, crust, crust, crust, crust]} />
      {phase === 3 && (
        <>
          {/* 버터 */}
          <Row y={12} startX={12} colors={['#FFF9C4', '#FFF9C4', '#FFF9C4', '#FFF9C4', '#FFF9C4', '#FFF9C4']} />
          <Row y={13} startX={12} colors={['#FFF176', '#FFF176', '#FFF176', '#FFF176', '#FFF176', '#FFF176']} />
          <Row y={14} startX={12} colors={['#FFF176', '#FFEE58', '#FFEE58', '#FFEE58', '#FFF176', '#FFF176']} />
          <Row y={15} startX={12} colors={['#FFF9C4', '#FFF9C4', '#FFF9C4', '#FFF9C4', '#FFF9C4', '#FFF9C4']} />
        </>
      )}
    </g>
  );
}

// === 팬케이크 ===
function PancakePixel({ phase }: { phase: 1 | 2 | 3 }) {
  const batter = phase === 1 ? '#FFF3E0' : phase === 2 ? '#FFCC80' : '#D4A054';
  const edge = phase === 1 ? '#E0C9A6' : phase === 2 ? '#C68B4E' : '#8B5E2B';
  const syrup = '#A0522D';
  return (
    <g>
      {/* 3겹 팬케이크 */}
      <Row y={10} startX={10} colors={[edge, edge, edge, edge, edge, edge, edge, edge, edge, edge, edge, edge]} />
      <Row y={11} startX={9}  colors={[edge, batter, batter, batter, batter, batter, batter, batter, batter, batter, batter, batter, batter, edge]} />
      <Row y={12} startX={9}  colors={[edge, batter, batter, batter, batter, batter, batter, batter, batter, batter, batter, batter, batter, edge]} />
      <Row y={13} startX={9}  colors={[edge, edge, edge, edge, edge, edge, edge, edge, edge, edge, edge, edge, edge, edge]} />
      <Row y={14} startX={8}  colors={[edge, batter, batter, batter, batter, batter, batter, batter, batter, batter, batter, batter, batter, batter, batter, edge]} />
      <Row y={15} startX={8}  colors={[edge, batter, batter, batter, batter, batter, batter, batter, batter, batter, batter, batter, batter, batter, batter, edge]} />
      <Row y={16} startX={8}  colors={[edge, edge, edge, edge, edge, edge, edge, edge, edge, edge, edge, edge, edge, edge, edge, edge]} />
      <Row y={17} startX={7}  colors={[edge, batter, batter, batter, batter, batter, batter, batter, batter, batter, batter, batter, batter, batter, batter, batter, batter, edge]} />
      <Row y={18} startX={7}  colors={[edge, batter, batter, batter, batter, batter, batter, batter, batter, batter, batter, batter, batter, batter, batter, batter, batter, edge]} />
      <Row y={19} startX={7}  colors={[edge, edge, edge, edge, edge, edge, edge, edge, edge, edge, edge, edge, edge, edge, edge, edge, edge, edge]} />
      {phase === 3 && (
        <>
          {/* 시럽 */}
          <Row y={9}  startX={13} colors={[syrup, syrup, syrup, syrup, syrup, syrup]} />
          <Row y={10} startX={12} colors={[syrup, '', '', '', '', '', '', syrup]} />
          <Row y={11} startX={11} colors={[syrup, '', '', '', '', '', '', '', '', syrup]} />
          {/* 버터 */}
          <Row y={8}  startX={14} colors={['#FFF9C4', '#FFF9C4', '#FFF176', '#FFF176']} />
          <Row y={9}  startX={14} colors={['#FFF176', '#FFEE58', '#FFEE58', '#FFF176']} />
        </>
      )}
    </g>
  );
}

// === 파스타 ===
function PastaPixel({ phase }: { phase: 1 | 2 | 3 }) {
  const bowl = '#8D6E63';
  const bowlIn = '#6D4C41';
  const noodle = phase === 1 ? '#FFF8E1' : phase === 2 ? '#FFE082' : '#FFC107';
  const sauce = phase >= 2 ? '#D32F2F' : '';
  return (
    <g>
      {/* 그릇 */}
      <Row y={10} startX={8}  colors={[bowl, bowl, bowl, bowl, bowl, bowl, bowl, bowl, bowl, bowl, bowl, bowl, bowl, bowl, bowl, bowl]} />
      <Row y={11} startX={7}  colors={[bowl, bowlIn, bowlIn, bowlIn, bowlIn, bowlIn, bowlIn, bowlIn, bowlIn, bowlIn, bowlIn, bowlIn, bowlIn, bowlIn, bowlIn, bowlIn, bowlIn, bowl]} />
      {/* 면 */}
      <Row y={12} startX={7}  colors={[bowl, noodle, noodle, noodle, noodle, noodle, noodle, noodle, noodle, noodle, noodle, noodle, noodle, noodle, noodle, noodle, noodle, bowl]} />
      <Row y={13} startX={7}  colors={[bowl, noodle, noodle, noodle, noodle, noodle, noodle, noodle, noodle, noodle, noodle, noodle, noodle, noodle, noodle, noodle, noodle, bowl]} />
      <Row y={14} startX={7}  colors={[bowl, noodle, noodle, noodle, noodle, noodle, noodle, noodle, noodle, noodle, noodle, noodle, noodle, noodle, noodle, noodle, noodle, bowl]} />
      <Row y={15} startX={7}  colors={[bowl, noodle, noodle, noodle, noodle, noodle, noodle, noodle, noodle, noodle, noodle, noodle, noodle, noodle, noodle, noodle, noodle, bowl]} />
      <Row y={16} startX={8}  colors={[bowl, noodle, noodle, noodle, noodle, noodle, noodle, noodle, noodle, noodle, noodle, noodle, noodle, noodle, noodle, bowl]} />
      <Row y={17} startX={9}  colors={[bowl, bowlIn, bowlIn, bowlIn, bowlIn, bowlIn, bowlIn, bowlIn, bowlIn, bowlIn, bowlIn, bowlIn, bowlIn, bowl]} />
      <Row y={18} startX={10} colors={[bowl, bowl, bowl, bowl, bowl, bowl, bowl, bowl, bowl, bowl, bowl, bowl]} />
      {/* 소스 */}
      {sauce && (
        <>
          <Row y={11} startX={12} colors={[sauce, sauce, sauce, sauce, sauce, sauce, sauce, sauce]} />
          <Row y={12} startX={11} colors={[sauce, sauce, '', '', '', '', '', '', '', sauce]} />
          <Row y={13} startX={13} colors={[sauce, sauce, '', '', sauce, sauce]} />
        </>
      )}
    </g>
  );
}

// === 스튜 ===
function StewPixel({ phase }: { phase: 1 | 2 | 3 }) {
  const pot = '#5D4037';
  const potIn = '#4E342E';
  const broth = phase === 1 ? '#EFEBE9' : phase === 2 ? '#D7CCC8' : '#A1887F';
  const carrot = '#FF7043';
  const potato = '#FDD835';
  const meat = '#795548';
  return (
    <g>
      {/* 냄비 */}
      <Row y={8}  startX={7}  colors={[pot, pot, pot, pot, pot, pot, pot, pot, pot, pot, pot, pot, pot, pot, pot, pot, pot, pot]} />
      <Row y={9}  startX={6}  colors={[pot, potIn, potIn, potIn, potIn, potIn, potIn, potIn, potIn, potIn, potIn, potIn, potIn, potIn, potIn, potIn, potIn, potIn, potIn, pot]} />
      {/* 스튜 내용물 */}
      <Row y={10} startX={6}  colors={[pot, broth, broth, broth, broth, broth, broth, broth, broth, broth, broth, broth, broth, broth, broth, broth, broth, broth, broth, pot]} />
      <Row y={11} startX={6}  colors={[pot, broth, broth, broth, broth, broth, broth, broth, broth, broth, broth, broth, broth, broth, broth, broth, broth, broth, broth, pot]} />
      <Row y={12} startX={6}  colors={[pot, broth, broth, broth, broth, broth, broth, broth, broth, broth, broth, broth, broth, broth, broth, broth, broth, broth, broth, pot]} />
      <Row y={13} startX={6}  colors={[pot, broth, broth, broth, broth, broth, broth, broth, broth, broth, broth, broth, broth, broth, broth, broth, broth, broth, broth, pot]} />
      <Row y={14} startX={6}  colors={[pot, broth, broth, broth, broth, broth, broth, broth, broth, broth, broth, broth, broth, broth, broth, broth, broth, broth, broth, pot]} />
      <Row y={15} startX={7}  colors={[pot, broth, broth, broth, broth, broth, broth, broth, broth, broth, broth, broth, broth, broth, broth, broth, broth, pot]} />
      <Row y={16} startX={8}  colors={[pot, potIn, potIn, potIn, potIn, potIn, potIn, potIn, potIn, potIn, potIn, potIn, potIn, potIn, potIn, pot]} />
      <Row y={17} startX={9}  colors={[pot, pot, pot, pot, pot, pot, pot, pot, pot, pot, pot, pot, pot, pot]} />
      {/* 손잡이 */}
      <Row y={12} startX={4}  colors={[pot, pot]} />
      <Row y={12} startX={26} colors={[pot, pot]} />
      {phase >= 2 && (
        <>
          {/* 재료 */}
          <Row y={11} startX={10} colors={[carrot, carrot]} />
          <Row y={12} startX={14} colors={[potato, potato, potato]} />
          <Row y={13} startX={11} colors={[meat, meat]} />
          <Row y={13} startX={17} colors={[carrot, carrot]} />
          <Row y={14} startX={13} colors={[potato, potato]} />
        </>
      )}
      {phase === 3 && (
        <>
          {/* 김 */}
          <Row y={5}  startX={11} colors={['#BCAAA4']} />
          <Row y={6}  startX={12} colors={['#BCAAA4']} />
          <Row y={4}  startX={16} colors={['#BCAAA4']} />
          <Row y={5}  startX={17} colors={['#BCAAA4']} />
          <Row y={6}  startX={16} colors={['#BCAAA4']} />
          <Row y={4}  startX={20} colors={['#BCAAA4']} />
          <Row y={5}  startX={21} colors={['#BCAAA4']} />
        </>
      )}
    </g>
  );
}

// === 로스트 ===
function RoastPixel({ phase }: { phase: 1 | 2 | 3 }) {
  const raw = '#FFCDD2';
  const mid = '#E57373';
  const done = '#8D6E63';
  const meat = phase === 1 ? raw : phase === 2 ? mid : done;
  const fat = phase === 1 ? '#FFF5F5' : phase === 2 ? '#FFCCBC' : '#BCAAA4';
  const edge = phase === 1 ? '#EF9A9A' : phase === 2 ? '#C62828' : '#5D4037';
  const bone = '#FFF8E1';
  return (
    <g>
      {/* 고기 덩어리 */}
      <Row y={10} startX={10} colors={[edge, edge, edge, edge, edge, edge, edge, edge, edge, edge, edge, edge]} />
      <Row y={11} startX={9}  colors={[edge, meat, meat, meat, meat, meat, meat, meat, meat, meat, meat, meat, meat, edge]} />
      <Row y={12} startX={8}  colors={[edge, meat, meat, fat, meat, meat, meat, meat, meat, fat, meat, meat, meat, meat, edge]} />
      <Row y={13} startX={8}  colors={[edge, meat, meat, meat, meat, meat, fat, meat, meat, meat, meat, meat, meat, meat, edge]} />
      <Row y={14} startX={8}  colors={[edge, meat, meat, meat, meat, meat, meat, meat, meat, meat, meat, meat, meat, meat, edge]} />
      <Row y={15} startX={8}  colors={[edge, meat, fat, meat, meat, meat, meat, meat, fat, meat, meat, meat, meat, meat, edge]} />
      <Row y={16} startX={8}  colors={[edge, meat, meat, meat, meat, meat, meat, meat, meat, meat, meat, meat, meat, meat, edge]} />
      <Row y={17} startX={9}  colors={[edge, meat, meat, meat, meat, meat, meat, meat, meat, meat, meat, meat, meat, edge]} />
      <Row y={18} startX={10} colors={[edge, edge, edge, edge, edge, edge, edge, edge, edge, edge, edge, edge]} />
      {/* 뼈 */}
      <Row y={14} startX={22} colors={[bone, bone, bone, bone]} />
      <Row y={15} startX={23} colors={[bone, bone, bone]} />
      {phase === 3 && (
        <>
          {/* 구운 자국 */}
          <Row y={12} startX={11} colors={['#4E342E', '#4E342E']} />
          <Row y={14} startX={13} colors={['#4E342E', '#4E342E']} />
          <Row y={16} startX={10} colors={['#4E342E', '#4E342E']} />
        </>
      )}
    </g>
  );
}
