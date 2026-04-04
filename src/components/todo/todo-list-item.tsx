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
    <li className="rounded-[28px] border border-white/10 bg-white/[0.045] p-4 shadow-[0_18px_48px_rgba(0,0,0,0.22)] transition hover:-translate-y-0.5 hover:bg-white/[0.06] hover:shadow-[0_22px_56px_rgba(0,0,0,0.3)]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <button
            type="button"
            aria-label={
              todo.completed
                ? `${todo.title} 항목을 미완료로 변경`
                : `${todo.title} 항목을 완료로 변경`
            }
            aria-pressed={todo.completed}
            onClick={() => onToggleTodo(todo.id)}
            className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition ${
              todo.completed
                ? "border-emerald-400 bg-emerald-400 text-slate-950 shadow-[0_8px_20px_rgba(16,185,129,0.25)]"
                : "border-white/18 bg-white/[0.04] text-transparent hover:border-sky-300/70"
            }`}
          >
            <span className="text-xs font-bold">✓</span>
          </button>

          <div>
            <p
              className={`text-base font-semibold leading-7 ${
                todo.completed ? "text-slate-500 line-through" : "text-white"
              }`}
            >
              {todo.title}
            </p>
            <p className="mt-1 text-sm text-slate-400">
              {todo.completed ? "완료된 항목" : "지금 바로 진행할 수 있는 항목"}
            </p>
          </div>
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
            className="min-h-10 rounded-full border border-white/10 px-3 py-2 text-sm font-medium text-slate-300 transition hover:border-rose-400/30 hover:bg-rose-400/10 hover:text-rose-200"
          >
            삭제
          </button>
        </div>
      </div>
    </li>
  );
}
