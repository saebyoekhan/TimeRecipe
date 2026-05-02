'use client';

import { useRecipe } from '@/contexts/RecipeContext';

export default function TaskInput() {
  const { taskName, setTaskName } = useRecipe();

  return (
    <div className="w-full max-w-sm mx-auto">
      <label className="block text-xs font-bold text-brown-light mb-2 tracking-wide uppercase">
        📋 주문서
      </label>
      <div className="wood-card p-1">
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="오늘 할 일을 적어주세요"
          className="w-full px-4 py-3 bg-cream rounded-lg border-none
                     text-neutral text-base placeholder:text-brown-light/40
                     focus:outline-none
                     transition-all duration-200"
          autoFocus
        />
      </div>
    </div>
  );
}
