'use client';

import { useRecipe } from '@/contexts/RecipeContext';

export default function TaskInput() {
  const { taskName, setTaskName } = useRecipe();

  return (
    <div className="w-full max-w-sm mx-auto">
      <label className="block text-xs font-bold text-brown-light mb-2 tracking-wide uppercase">
        📋 주문서
      </label>
      <div className="paper-input p-2 relative">
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="오늘 할 일을 적어주세요..."
          className="w-full px-3 py-2 bg-transparent border-none
                     text-black text-lg placeholder:text-black/30
                     focus:outline-none"
          autoFocus
        />
      </div>
    </div>
  );
}
