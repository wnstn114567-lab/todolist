import { getFilterLabel } from "@/lib/todo-filters";
import type { TodoFilter } from "@/types/todo";

type TodoEmptyStateProps = {
  currentFilter: TodoFilter;
};

export function TodoEmptyState({ currentFilter }: TodoEmptyStateProps) {
  const isAllFilter = currentFilter === "all";

  return (
    <div className="rounded-[30px] border border-dashed border-slate-300 bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(248,250,252,0.88))] p-8 text-center shadow-[0_18px_45px_rgba(15,23,42,0.05)]">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent-soft text-lg font-semibold text-accent">
        {isAllFilter ? "+" : getFilterLabel(currentFilter).slice(0, 1).toUpperCase()}
      </div>
      <h3 className="mt-4 text-xl font-semibold text-slate-950">
        {isAllFilter ? "No todos yet" : `No ${getFilterLabel(currentFilter)} todos`}
      </h3>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted">
        {isAllFilter
          ? "Add your first task to turn this clean slate into a focused plan for the day."
          : `Switch filters or update a task to see ${getFilterLabel(currentFilter)} items here.`}
      </p>
    </div>
  );
}
