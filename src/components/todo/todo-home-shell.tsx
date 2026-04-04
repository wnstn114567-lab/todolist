import { sampleTodos } from "@/data/sample-todos";
import type { TodoItem, TodoPriority, TodoStatus } from "@/types/todo";

const statusLabels = {
  todo: "To do",
  "in-progress": "In progress",
  done: "Done",
} satisfies Record<TodoStatus, string>;

const statusDotStyles = {
  todo: "bg-slate-300",
  "in-progress": "bg-amber-500",
  done: "bg-emerald-500",
} satisfies Record<TodoStatus, string>;

const priorityBadgeStyles = {
  low: "bg-slate-100 text-slate-600 ring-slate-200",
  medium: "bg-amber-50 text-amber-700 ring-amber-200",
  high: "bg-rose-50 text-rose-700 ring-rose-200",
} satisfies Record<TodoPriority, string>;

export function TodoHomeShell() {
  const activeTodos = sampleTodos.filter((todo) => todo.status !== "done");
  const upcomingTodos = sampleTodos.filter((todo) => todo.status === "todo");
  const completedTodos = sampleTodos.filter((todo) => todo.status === "done");
  const inProgressCount = sampleTodos.filter(
    (todo) => todo.status === "in-progress",
  ).length;
  const completionRate = Math.round(
    (completedTodos.length / sampleTodos.length) * 100,
  );

  const stats = [
    {
      label: "Tasks loaded",
      value: String(sampleTodos.length),
      detail: "Static sample data for the homepage shell.",
    },
    {
      label: "In progress",
      value: String(inProgressCount),
      detail: "The work currently demanding attention.",
    },
    {
      label: "Complete",
      value: `${completionRate}%`,
      detail: "A quick read on momentum across the list.",
    },
  ];

  return (
    <section className="grid gap-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.95fr)]">
      <div className="space-y-6">
        <section className="rounded-[32px] border border-slate-200/80 bg-white/85 p-8 shadow-[0_24px_60px_rgba(15,23,42,0.08)] backdrop-blur">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
            <div className="max-w-2xl space-y-4">
              <span className="inline-flex w-fit rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-accent">
                Todo App v1
              </span>

              <div className="space-y-3">
                <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                  Keep the first version calm, clear, and easy to extend.
                </h1>
                <p className="max-w-xl text-base leading-7 text-muted">
                  This foundation replaces the starter template with a focused
                  todo shell so the next iteration can add real behavior instead
                  of project cleanup.
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 xl:max-w-sm xl:grid-cols-1">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-3xl border border-slate-200/80 bg-slate-50/80 p-4"
                >
                  <p className="text-sm text-slate-500">{stat.label}</p>
                  <p className="mt-2 text-3xl font-semibold text-slate-950">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    {stat.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-[32px] border border-slate-200/80 bg-white/80 p-6 shadow-[0_20px_55px_rgba(15,23,42,0.06)] backdrop-blur">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-accent">Today</p>
              <h2 className="mt-1 text-2xl font-semibold text-slate-950">
                Current focus
              </h2>
            </div>

            <p className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-600">
              {activeTodos.length} active tasks
            </p>
          </div>

          <ul className="mt-6 space-y-3">
            {activeTodos.map((todo) => (
              <TodoListItem key={todo.id} todo={todo} />
            ))}
          </ul>
        </section>
      </div>

      <aside className="space-y-6">
        <section className="rounded-[32px] border border-slate-900/10 bg-slate-950 p-6 text-slate-50 shadow-[0_28px_60px_rgba(15,23,42,0.16)]">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl font-semibold">Quick add</h2>
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">
              UI shell
            </span>
          </div>

          <p className="mt-3 text-sm leading-6 text-slate-300">
            This card is ready to become the first interactive feature when you
            want to add client state or server actions.
          </p>

          <div className="mt-5 rounded-[28px] border border-white/10 bg-white/5 p-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Task title
              </p>
              <div className="mt-3 rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-slate-400">
                Add a task title, due date, and priority...
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-2 text-xs text-slate-400">
                <span className="rounded-full border border-white/10 px-3 py-1">
                  High priority
                </span>
                <span className="rounded-full border border-white/10 px-3 py-1">
                  Today
                </span>
              </div>

              <button
                type="button"
                disabled
                className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900 opacity-80"
              >
                Create
              </button>
            </div>
          </div>
        </section>

        <section className="rounded-[32px] border border-slate-200/80 bg-white/85 p-6 shadow-[0_20px_55px_rgba(15,23,42,0.06)] backdrop-blur">
          <h2 className="text-xl font-semibold text-slate-950">Upcoming</h2>
          <p className="mt-2 text-sm leading-6 text-muted">
            Placeholder tasks to show how the right rail can carry lighter work.
          </p>

          <ul className="mt-5 space-y-3">
            {upcomingTodos.map((todo) => (
              <li
                key={todo.id}
                className="rounded-3xl border border-slate-200/80 bg-slate-50/80 p-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-base font-semibold text-slate-900">
                      {todo.title}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-muted">
                      {todo.note}
                    </p>
                  </div>

                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-500 ring-1 ring-slate-200">
                    {todo.dueLabel}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-[32px] border border-slate-200/80 bg-white/80 p-6 shadow-[0_20px_55px_rgba(15,23,42,0.06)] backdrop-blur">
          <h2 className="text-xl font-semibold text-slate-950">
            Ready for next steps
          </h2>

          <ul className="mt-4 space-y-3 text-sm leading-6 text-muted">
            <li className="rounded-2xl bg-slate-50 p-4">
              Turn the quick-add shell into a real form.
            </li>
            <li className="rounded-2xl bg-slate-50 p-4">
              Replace sample data with persistent state.
            </li>
            <li className="rounded-2xl bg-slate-50 p-4">
              Add filters, completion actions, and tests.
            </li>
          </ul>

          <div className="mt-5 rounded-3xl border border-emerald-200 bg-emerald-50 p-4">
            <p className="text-sm font-semibold text-emerald-800">
              Completed foundation task
            </p>
            <p className="mt-1 text-sm leading-6 text-emerald-700">
              {completedTodos.length} setup task
              {completedTodos.length === 1 ? "" : "s"} already marked done in
              the sample list.
            </p>
          </div>
        </section>
      </aside>
    </section>
  );
}

type TodoListItemProps = {
  todo: TodoItem;
};

function TodoListItem({ todo }: TodoListItemProps) {
  return (
    <li className="rounded-[28px] border border-slate-200/80 bg-slate-50/80 p-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span
              aria-hidden="true"
              className={`h-2.5 w-2.5 rounded-full ${statusDotStyles[todo.status]}`}
            />

            <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 ring-1 ring-slate-200">
              {statusLabels[todo.status]}
            </span>

            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ring-1 ${priorityBadgeStyles[todo.priority]}`}
            >
              {todo.priority} priority
            </span>
          </div>

          <h3 className="text-lg font-semibold text-slate-950">{todo.title}</h3>
          <p className="max-w-xl text-sm leading-6 text-muted">{todo.note}</p>
        </div>

        <div className="rounded-2xl bg-white px-4 py-3 text-sm text-slate-600 shadow-inner ring-1 ring-slate-200/70 sm:min-w-28 sm:text-right">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
            Due
          </p>
          <p className="mt-1 font-semibold text-slate-900">{todo.dueLabel}</p>
        </div>
      </div>
    </li>
  );
}
