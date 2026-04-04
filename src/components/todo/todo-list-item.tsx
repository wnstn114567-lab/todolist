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
    <li className="rounded-[22px] border border-white/10 bg-white/[0.045] p-3.5 shadow-[0_16px_42px_rgba(0,0,0,0.22)] transition hover:bg-white/[0.06] hover:shadow-[0_20px_50px_rgba(0,0,0,0.28)]">
      <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            aria-label={
              todo.completed
                ? `${todo.title} 항목을 미완료로 변경`
                : `${todo.title} 항목을 완료로 변경`
            }
            aria-pressed={todo.completed}
            onClick={() => onToggleTodo(todo.id)}
            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-bold transition ${
              todo.completed
                ? "border-emerald-400 bg-emerald-400 text-slate-950 shadow-[0_8px_20px_rgba(16,185,129,0.25)]"
                : "border-white/18 bg-white/[0.04] text-transparent hover:border-sky-300/70"
            }`}
          >
            ✓
          </button>

          <p
            className={`min-w-0 text-base font-semibold leading-6 break-words ${
              todo.completed ? "text-slate-500 line-through" : "text-white"
            }`}
          >
            {todo.title}
          </p>
        </div>

        <div className="flex items-center gap-2 sm:justify-end">
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              todo.completed
                ? "bg-emerald-400/12 text-emerald-300 ring-1 ring-emerald-400/20"
                : "bg-white/[0.06] text-slate-300 ring-1 ring-white/10"
            }`}
          >
            {todo.completed ? "완료" : "진행 중"}
          </span>
          <button
            type="button"
            onClick={() => onDeleteTodo(todo.id)}
            className="min-h-9 rounded-full border border-white/10 px-3 py-2 text-sm font-medium text-slate-300 transition hover:border-rose-400/30 hover:bg-rose-400/10 hover:text-rose-200"
          >
            삭제
          </button>
        </div>
      </div>
    </li>
  );
}
