import type { TodoItem } from "@/types/todo";

type TodoListItemProps = {
  todo: TodoItem;
  onToggleTodo: (id: string) => void;
  onDeleteTodo: (id: string) => void;
};

export function TodoListItem({
  todo,
  onToggleTodo,
  onDeleteTodo,
}: TodoListItemProps) {
  return (
    <li className="rounded-[28px] border border-slate-200/80 bg-white/90 p-4 shadow-[0_16px_40px_rgba(15,23,42,0.05)]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <button
            type="button"
            aria-label={
              todo.completed
                ? `Mark ${todo.title} as incomplete`
                : `Mark ${todo.title} as complete`
            }
            aria-pressed={todo.completed}
            onClick={() => onToggleTodo(todo.id)}
            className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition ${
              todo.completed
                ? "border-emerald-500 bg-emerald-500 text-white"
                : "border-slate-300 bg-white text-transparent hover:border-accent"
            }`}
          >
            <span className="text-sm font-bold">✓</span>
          </button>

          <div>
            <p
              className={`text-base font-semibold ${
                todo.completed ? "text-slate-400 line-through" : "text-slate-950"
              }`}
            >
              {todo.title}
            </p>
            <p className="mt-1 text-sm text-muted">
              {todo.completed ? "Completed" : "Ready to tackle"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:justify-end">
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              todo.completed
                ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                : "bg-slate-100 text-slate-600 ring-1 ring-slate-200"
            }`}
          >
            {todo.completed ? "Done" : "Active"}
          </span>
          <button
            type="button"
            onClick={() => onDeleteTodo(todo.id)}
            className="rounded-full border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700"
          >
            Delete
          </button>
        </div>
      </div>
    </li>
  );
}
