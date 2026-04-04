import type { TodoFilter } from "@/types/todo";

type TodoFilterBarProps = {
  activeCount: number;
  completedCount: number;
  currentFilter: TodoFilter;
  onChangeFilter: (filter: TodoFilter) => void;
};

const filterOptions: Array<{
  label: string;
  value: TodoFilter;
}> = [
  { label: "전체", value: "all" },
  { label: "진행 중", value: "active" },
  { label: "완료", value: "completed" },
];

export function TodoFilterBar({
  activeCount,
  completedCount,
  currentFilter,
  onChangeFilter,
}: TodoFilterBarProps) {
  const countByFilter: Record<TodoFilter, number> = {
    all: activeCount + completedCount,
    active: activeCount,
    completed: completedCount,
  };

  return (
    <div className="flex flex-wrap gap-2">
      {filterOptions.map((option) => {
        const isActive = option.value === currentFilter;

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChangeFilter(option.value)}
            aria-pressed={isActive}
            className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition ${
              isActive
                ? "bg-white text-slate-950 shadow-[0_12px_30px_rgba(0,0,0,0.22)]"
                : "border border-white/10 bg-white/[0.04] text-slate-300 hover:bg-white/[0.07] hover:text-white"
            }`}
          >
            <span>{option.label}</span>
            <span
              className={`rounded-full px-2 py-0.5 text-xs ${
                isActive
                  ? "bg-slate-900/10 text-slate-800"
                  : "bg-white/[0.08] text-slate-300 ring-1 ring-white/8"
              }`}
            >
              {countByFilter[option.value]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
