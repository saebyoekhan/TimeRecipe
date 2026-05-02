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
    <nav className="flex justify-center gap-2 pb-6 pt-3 px-6">
      {tabs.map((tab) => {
        const active = pathname === tab.path;
        return (
          <button
            key={tab.path}
            onClick={() => router.push(tab.path)}
            className={`flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-sm font-bold transition-all
              ${active
                ? 'bg-point text-white pixel-shadow'
                : 'bg-wood/15 text-brown-light hover:bg-wood/25'
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
