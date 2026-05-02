'use client';

import { usePathname, useRouter } from 'next/navigation';

const tabs = [
  { path: '/', label: '요리', icon: '🍳' },
  { path: '/fridge', label: '냉장고', icon: '🧊' },
];

export default function BottomDock() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <nav className="flex justify-center gap-3 pb-6 pt-3 px-6">
      {tabs.map((tab) => {
        const active = pathname === tab.path;
        return (
          <button
            key={tab.path}
            onClick={() => router.push(tab.path)}
            className={`flex items-center gap-1.5 px-6 py-2.5 text-sm font-bold tracking-widest transition-all
              border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,0.8)]
              hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_rgba(0,0,0,0.8)]
              active:translate-y-0.5 active:shadow-[1px_1px_0px_rgba(0,0,0,0.8)]
              ${active
                ? 'bg-point text-white border-point'
                : 'bg-wood-dark text-cream hover:bg-wood'
              }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
