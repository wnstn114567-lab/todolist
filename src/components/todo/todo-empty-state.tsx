import { getFilterLabel } from "@/lib/todo-filters";
import type { TodoFilter } from "@/types/todo";

type TodoEmptyStateProps = {
  currentFilter: TodoFilter;
};

export function TodoEmptyState({ currentFilter }: TodoEmptyStateProps) {
  const isAllFilter = currentFilter === "all";
  const filterLabel = getFilterLabel(currentFilter);
  const initial = filterLabel.slice(0, 1);

  return (
    <div className="rounded-[30px] border border-dashed border-white/14 bg-white/[0.04] p-8 text-center shadow-[0_18px_45px_rgba(0,0,0,0.22)]">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent-soft text-lg font-semibold text-accent">
        {isAllFilter ? "+" : initial}
      </div>
      <h3 className="mt-4 text-xl font-semibold text-white">
        {isAllFilter ? "아직 할 일이 없어요" : `${filterLabel} 항목이 없어요`}
      </h3>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-400">
        {isAllFilter
          ? "첫 할 일을 추가해서 오늘 해야 할 흐름을 차분하게 정리해 보세요."
          : "필터를 바꾸거나 할 일 상태를 업데이트하면 이 영역에 다시 표시됩니다."}
      </p>
    </div>
  );
}
