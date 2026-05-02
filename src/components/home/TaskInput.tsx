'use client';

import { useRecipe } from '@/contexts/RecipeContext';

export default function TaskInput() {
  const { taskName, setTaskName } = useRecipe();

  return (
    <div className="w-full max-w-sm mx-auto">
      <label className="block text-xs font-medium text-neutral/50 mb-2 tracking-wide">
        주문서
      </label>
      <input
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder="오늘 할 일을 적어주세요"
        className="w-full px-4 py-3 bg-white rounded-2xl border border-neutral/10
                   text-neutral text-base placeholder:text-neutral/30
                   focus:outline-none focus:border-point/40 focus:ring-2 focus:ring-point/10
                   transition-all duration-200"
        autoFocus
      />
    </div>
  );
}
