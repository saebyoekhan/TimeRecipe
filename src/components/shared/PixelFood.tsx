'use client';

interface PixelFoodProps {
  food: string;
  phase: 1 | 2 | 3;
  size?: number;
}

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
    case 'bacon': return <BaconPixel phase={phase} />;
    case 'pancake': return <PancakePixel phase={phase} />;
    case 'sausage': return <SausagePixel phase={phase} />;
    case 'salmon': return <SalmonPixel phase={phase} />;
    case 'steak': return <SteakPixel phase={phase} />;
    default: return <EggPixel phase={phase} />;
  }
}

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

// === 계란 후라이 (5m) ===
function EggPixel({ phase }: { phase: 1 | 2 | 3 }) {
  if (phase === 1) {
    const sh = '#D4A574';
    const wh = '#FFF5E6';
    return (
      <g>
        <Row y={10} startX={12} colors={[sh, sh, sh, sh, sh, sh, sh, sh]} />
        <Row y={11} startX={11} colors={[sh, wh, wh, wh, wh, wh, wh, wh, wh, sh]} />
        <Row y={12} startX={11} colors={[sh, wh, wh, wh, wh, wh, wh, wh, wh, sh]} />
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
  const wh = '#FFFFFF';
  const yk = phase === 2 ? '#FFD54F' : '#FF8F00';
  const ykd = phase === 2 ? '#FFC107' : '#FF6F00';
  const bg = '#FFF8E1';
  const edge = phase === 2 ? wh : '#E6D5A8';
  return (
    <g>
      <Row y={7}  startX={10} colors={[edge, edge, edge, edge, edge, edge, edge, edge, edge, edge, edge, edge]} />
      <Row y={8}  startX={9}  colors={[edge, wh, wh, wh, wh, wh, wh, wh, wh, wh, wh, wh, wh, edge]} />
      <Row y={9}  startX={8}  colors={[edge, wh, bg, bg, bg, bg, bg, bg, bg, bg, bg, bg, wh, wh, edge]} />
      <Row y={10} startX={7}  colors={[edge, wh, bg, bg, bg, bg, bg, bg, bg, bg, bg, bg, bg, wh, wh, edge]} />
      <Row y={11} startX={7}  colors={[edge, wh, bg, bg, bg, bg, bg, bg, bg, bg, bg, bg, bg, wh, wh, edge]} />
      <Row y={12} startX={7}  colors={[edge, wh, bg, bg, bg, yk, yk, yk, yk, bg, bg, bg, bg, wh, wh, edge]} />
      <Row y={13} startX={7}  colors={[edge, wh, bg, bg, yk, ykd, ykd, ykd, yk, yk, bg, bg, bg, wh, wh, edge]} />
      <Row y={14} startX={7}  colors={[edge, wh, bg, bg, yk, ykd, wh, ykd, yk, yk, bg, bg, bg, wh, wh, edge]} />
      <Row y={15} startX={7}  colors={[edge, wh, bg, bg, yk, ykd, ykd, ykd, yk, yk, bg, bg, bg, wh, wh, edge]} />
      <Row y={16} startX={7}  colors={[edge, wh, bg, bg, bg, yk, yk, yk, yk, bg, bg, bg, bg, wh, wh, edge]} />
      <Row y={17} startX={7}  colors={[edge, wh, bg, bg, bg, bg, bg, bg, bg, bg, bg, bg, bg, wh, wh, edge]} />
      <Row y={18} startX={7}  colors={[edge, wh, bg, bg, bg, bg, bg, bg, bg, bg, bg, bg, bg, wh, wh, edge]} />
      <Row y={19} startX={8}  colors={[edge, wh, wh, bg, bg, bg, bg, bg, bg, bg, bg, wh, wh, wh, edge]} />
      <Row y={20} startX={9}  colors={[edge, wh, wh, wh, wh, wh, wh, wh, wh, wh, wh, wh, wh, edge]} />
      <Row y={21} startX={10} colors={[edge, edge, edge, edge, edge, edge, edge, edge, edge, edge, edge, edge]} />
    </g>
  );
}

// === 베이컨 (10m) ===
function BaconPixel({ phase }: { phase: 1 | 2 | 3 }) {
  const meat = phase === 1 ? '#EF9A9A' : phase === 2 ? '#E57373' : '#D32F2F';
  const fat = phase === 1 ? '#FFEBEE' : phase === 2 ? '#FFCDD2' : '#FF8A80';
  const edge = phase === 1 ? '#E57373' : phase === 2 ? '#D32F2F' : '#B71C1C';
  return (
    <g transform="rotate(-15, 16, 16)">
      <Row y={10} startX={8} colors={[edge, edge, edge, edge, edge, edge, edge, edge, edge, edge, edge, edge, edge, edge, edge]} />
      <Row y={11} startX={7} colors={[edge, meat, meat, fat, fat, meat, meat, meat, fat, fat, meat, meat, meat, fat, meat, edge]} />
      <Row y={12} startX={7} colors={[edge, meat, meat, meat, fat, meat, meat, meat, meat, fat, meat, meat, meat, meat, fat, edge]} />
      <Row y={13} startX={7} colors={[edge, fat, meat, meat, meat, fat, meat, meat, meat, meat, fat, meat, meat, meat, meat, edge]} />
      <Row y={14} startX={8} colors={[edge, edge, edge, edge, edge, edge, edge, edge, edge, edge, edge, edge, edge, edge, edge]} />
      
      <Row y={17} startX={9} colors={[edge, edge, edge, edge, edge, edge, edge, edge, edge, edge, edge, edge, edge, edge, edge]} />
      <Row y={18} startX={8} colors={[edge, meat, meat, fat, fat, meat, meat, meat, fat, fat, meat, meat, meat, fat, meat, edge]} />
      <Row y={19} startX={8} colors={[edge, meat, meat, meat, fat, meat, meat, meat, meat, fat, meat, meat, meat, meat, fat, edge]} />
      <Row y={20} startX={8} colors={[edge, fat, meat, meat, meat, fat, meat, meat, meat, meat, fat, meat, meat, meat, meat, edge]} />
      <Row y={21} startX={9} colors={[edge, edge, edge, edge, edge, edge, edge, edge, edge, edge, edge, edge, edge, edge, edge]} />
    </g>
  );
}

// === 팬케이크 (15m) ===
function PancakePixel({ phase }: { phase: 1 | 2 | 3 }) {
  const batter = phase === 1 ? '#FFF3E0' : phase === 2 ? '#FFCC80' : '#D4A054';
  const edge = phase === 1 ? '#E0C9A6' : phase === 2 ? '#C68B4E' : '#8B5E2B';
  const syrup = '#A0522D';
  return (
    <g>
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
          <Row y={9}  startX={13} colors={[syrup, syrup, syrup, syrup, syrup, syrup]} />
          <Row y={10} startX={12} colors={[syrup, '', '', '', '', '', '', syrup]} />
          <Row y={11} startX={11} colors={[syrup, '', '', '', '', '', '', '', '', syrup]} />
          <Row y={8}  startX={14} colors={['#FFF9C4', '#FFF9C4', '#FFF176', '#FFF176']} />
          <Row y={9}  startX={14} colors={['#FFF176', '#FFEE58', '#FFEE58', '#FFF176']} />
        </>
      )}
    </g>
  );
}

// === 소시지 (30m) ===
function SausagePixel({ phase }: { phase: 1 | 2 | 3 }) {
  const meat = phase === 1 ? '#F48FB1' : phase === 2 ? '#E53935' : '#B71C1C';
  const edge = phase === 1 ? '#D81B60' : phase === 2 ? '#C62828' : '#7F0000';
  const grill = '#3E2723';
  return (
    <g transform="rotate(25, 16, 16)">
      <Row y={12} startX={6} colors={[edge, edge, edge, edge, edge, edge, edge, edge, edge, edge, edge, edge, edge, edge, edge, edge, edge, edge]} />
      <Row y={13} startX={5} colors={[edge, meat, meat, meat, meat, meat, meat, meat, meat, meat, meat, meat, meat, meat, meat, meat, meat, meat, edge]} />
      <Row y={14} startX={5} colors={[edge, meat, meat, meat, meat, meat, meat, meat, meat, meat, meat, meat, meat, meat, meat, meat, meat, meat, edge]} />
      <Row y={15} startX={5} colors={[edge, meat, meat, meat, meat, meat, meat, meat, meat, meat, meat, meat, meat, meat, meat, meat, meat, meat, edge]} />
      <Row y={16} startX={5} colors={[edge, meat, meat, meat, meat, meat, meat, meat, meat, meat, meat, meat, meat, meat, meat, meat, meat, meat, edge]} />
      <Row y={17} startX={6} colors={[edge, edge, edge, edge, edge, edge, edge, edge, edge, edge, edge, edge, edge, edge, edge, edge, edge, edge]} />
      {phase === 3 && (
        <>
          <Row y={13} startX={9} colors={[grill, grill]} />
          <Row y={14} startX={8} colors={[grill, grill]} />
          <Row y={15} startX={7} colors={[grill, grill]} />

          <Row y={13} startX={15} colors={[grill, grill]} />
          <Row y={14} startX={14} colors={[grill, grill]} />
          <Row y={15} startX={13} colors={[grill, grill]} />

          <Row y={13} startX={21} colors={[grill, grill]} />
          <Row y={14} startX={20} colors={[grill, grill]} />
          <Row y={15} startX={19} colors={[grill, grill]} />
        </>
      )}
    </g>
  );
}

// === 연어 스테이크 (60m) ===
function SalmonPixel({ phase }: { phase: 1 | 2 | 3 }) {
  const meat = phase === 1 ? '#FF8A65' : phase === 2 ? '#FF7043' : '#F4511E';
  const line = phase === 1 ? '#FFCCBC' : phase === 2 ? '#FFAB91' : '#E64A19';
  const edge = phase === 1 ? '#E64A19' : phase === 2 ? '#D84315' : '#BF360C';
  return (
    <g>
      <Row y={10} startX={10} colors={[edge, edge, edge, edge, edge, edge, edge, edge, edge, edge]} />
      <Row y={11} startX={9}  colors={[edge, meat, meat, meat, meat, meat, meat, meat, meat, edge]} />
      <Row y={12} startX={8}  colors={[edge, meat, meat, line, meat, meat, line, meat, meat, meat, edge]} />
      <Row y={13} startX={7}  colors={[edge, meat, line, meat, meat, line, meat, meat, line, meat, meat, edge]} />
      <Row y={14} startX={7}  colors={[edge, meat, meat, meat, line, meat, meat, line, meat, meat, meat, edge]} />
      <Row y={15} startX={7}  colors={[edge, meat, meat, line, meat, meat, line, meat, meat, meat, meat, edge]} />
      <Row y={16} startX={7}  colors={[edge, meat, line, meat, meat, line, meat, meat, line, meat, meat, edge]} />
      <Row y={17} startX={8}  colors={[edge, meat, meat, meat, line, meat, meat, line, meat, meat, edge]} />
      <Row y={18} startX={9}  colors={[edge, meat, meat, meat, meat, meat, meat, meat, meat, edge]} />
      <Row y={19} startX={10} colors={[edge, edge, edge, edge, edge, edge, edge, edge, edge, edge]} />
      {phase >= 2 && (
        <>
          <Row y={12} startX={12} colors={['#FFD54F', '#FFD54F']} />
          <Row y={13} startX={11} colors={['#FFD54F', '#FFCA28']} />
          <Row y={14} startX={12} colors={['#FFD54F', '#FFCA28']} />
        </>
      )}
      {phase === 3 && (
        <Row y={11} startX={14} colors={['#81C784', '#66BB6A', '#81C784']} />
      )}
    </g>
  );
}

// === 티본 스테이크 (120m) ===
function SteakPixel({ phase }: { phase: 1 | 2 | 3 }) {
  const meat = phase === 1 ? '#E57373' : phase === 2 ? '#B71C1C' : '#5D4037';
  const edge = phase === 1 ? '#D32F2F' : phase === 2 ? '#7F0000' : '#3E2723';
  const bone = '#FFF8E1';
  return (
    <g>
      <Row y={8}  startX={12} colors={[edge, edge, edge, edge, edge, edge, edge]} />
      <Row y={9}  startX={10} colors={[edge, meat, meat, edge, bone, bone, edge, meat, edge]} />
      <Row y={10} startX={9}  colors={[edge, meat, meat, meat, edge, bone, edge, meat, meat, edge]} />
      <Row y={11} startX={8}  colors={[edge, meat, meat, meat, edge, bone, edge, meat, meat, meat, edge]} />
      <Row y={12} startX={7}  colors={[edge, meat, meat, meat, meat, edge, bone, edge, meat, meat, meat, edge]} />
      <Row y={13} startX={7}  colors={[edge, meat, meat, meat, meat, edge, bone, edge, meat, meat, meat, edge]} />
      <Row y={14} startX={7}  colors={[edge, meat, meat, meat, meat, edge, bone, edge, meat, meat, meat, edge]} />
      <Row y={15} startX={7}  colors={[edge, meat, meat, meat, edge, bone, edge, meat, meat, meat, edge]} />
      <Row y={16} startX={8}  colors={[edge, meat, meat, meat, edge, bone, edge, meat, meat, edge]} />
      <Row y={17} startX={9}  colors={[edge, meat, meat, edge, bone, bone, edge, meat, edge]} />
      <Row y={18} startX={11} colors={[edge, edge, edge, edge, edge, edge, edge]} />
      {phase === 3 && (
        <>
          <Row y={10} startX={10} colors={['#3E2723', '#3E2723']} />
          <Row y={12} startX={9} colors={['#3E2723', '#3E2723']} />
          <Row y={14} startX={10} colors={['#3E2723', '#3E2723']} />
          <Row y={11} startX={16} colors={['#3E2723', '#3E2723']} />
          <Row y={13} startX={15} colors={['#3E2723', '#3E2723']} />
          <Row y={15} startX={14} colors={['#3E2723', '#3E2723']} />
        </>
      )}
    </g>
  );
}
