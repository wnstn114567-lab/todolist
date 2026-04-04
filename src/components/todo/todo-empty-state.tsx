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
    <div className="rounded-[26px] border border-dashed border-white/14 bg-white/[0.04] p-6 text-center shadow-[0_18px_45px_rgba(0,0,0,0.22)]">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft text-base font-semibold text-accent">
        {isAllFilter ? "+" : initial}
      </div>
      <h3 className="mt-3 text-lg font-semibold text-white">
        {isAllFilter ? "할 일이 없습니다" : `${filterLabel} 항목이 없습니다`}
      </h3>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-400">
        {isAllFilter
          ? "위 입력창에서 바로 추가해보세요."
          : "다른 필터를 선택해보세요."}
      </p>
    </div>
  );
}
