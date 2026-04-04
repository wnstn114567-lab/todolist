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
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Completed", value: "completed" },
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
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      <div className="inline-flex w-full flex-wrap gap-2 rounded-2xl border border-slate-200/80 bg-slate-50/85 p-1.5 lg:w-auto">
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
                  ? "bg-slate-950 text-white shadow-[0_12px_30px_rgba(15,23,42,0.18)]"
                  : "text-slate-600 hover:bg-white hover:text-slate-950"
              }`}
            >
              <span>{option.label}</span>
              <span
                className={`rounded-full px-2 py-0.5 text-xs ${
                  isActive
                    ? "bg-white/15 text-white"
                    : "bg-white text-slate-500 ring-1 ring-slate-200"
                }`}
              >
                {countByFilter[option.value]}
              </span>
            </button>
          );
        })}
      </div>

      <p className="text-sm leading-6 text-muted">
        Switch between everything on the list, what is still in motion, and
        what is already done.
      </p>
    </div>
  );
}
