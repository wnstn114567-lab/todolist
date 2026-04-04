"use client";

import { useState } from "react";
import { TodoAiSuggestionCard } from "@/components/todo/todo-ai-suggestion-card";
import { TodoForm } from "@/components/todo/todo-form";
import { TodoList } from "@/components/todo/todo-list";
import { sampleTodos } from "@/data/sample-todos";
import { getTodoRecommendations } from "@/lib/todo-recommendations";
import { addTodo, deleteTodo, toggleTodo } from "@/lib/todo-utils";

export function TodoHomeShell() {
  const [todos, setTodos] = useState(sampleTodos);
  const [hasRequestedSuggestions, setHasRequestedSuggestions] = useState(false);

  const completedCount = todos.filter((todo) => todo.completed).length;
  const remainingCount = todos.length - completedCount;
  const completionRate =
    todos.length === 0 ? 0 : Math.round((completedCount / todos.length) * 100);
  const recommendations = hasRequestedSuggestions
    ? getTodoRecommendations(todos)
    : null;

  const stats = [
    {
      label: "Total todos",
      value: String(todos.length),
      detail: "Everything currently on your list.",
    },
    {
      label: "Remaining",
      value: String(remainingCount),
      detail: "Open items still waiting for attention.",
    },
    {
      label: "Completed",
      value: `${completionRate}%`,
      detail: "A quick read on progress across the list.",
    },
  ];

  function handleAddTodo(title: string) {
    setTodos((currentTodos) => addTodo(currentTodos, title));
  }

  function handleToggleTodo(id: string) {
    setTodos((currentTodos) => toggleTodo(currentTodos, id));
  }

  function handleDeleteTodo(id: string) {
    setTodos((currentTodos) => deleteTodo(currentTodos, id));
  }

  function handleSuggestTodos() {
    setHasRequestedSuggestions(true);
  }

  return (
    <section className="grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.9fr)]">
      <div className="space-y-6">
        <section className="rounded-[32px] border border-slate-200/80 bg-white/85 p-8 shadow-[0_24px_60px_rgba(15,23,42,0.08)] backdrop-blur">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
            <div className="max-w-2xl space-y-4">
              <span className="inline-flex w-fit rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-accent">
                Focused Todo App
              </span>

              <div className="space-y-3">
                <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                  Plan the day with a calm, modern todo flow.
                </h1>
                <p className="max-w-xl text-base leading-7 text-muted">
                  Add tasks quickly, mark them complete when you finish, and
                  remove anything that no longer matters. The UI stays simple so
                  the code can too.
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
              <p className="text-sm font-semibold text-accent">Your list</p>
              <h2 className="mt-1 text-2xl font-semibold text-slate-950">
                Current todos
              </h2>
            </div>

            <p className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-600">
              {remainingCount} active {remainingCount === 1 ? "task" : "tasks"}
            </p>
          </div>

          <div className="mt-6">
            <TodoList
              todos={todos}
              onToggleTodo={handleToggleTodo}
              onDeleteTodo={handleDeleteTodo}
            />
          </div>
        </section>
      </div>

      <aside className="space-y-6">
        <TodoForm onAddTodo={handleAddTodo} />

        <TodoAiSuggestionCard
          recommendations={recommendations}
          hasRequestedSuggestions={hasRequestedSuggestions}
          onSuggest={handleSuggestTodos}
        />

        <section className="rounded-[32px] border border-slate-200/80 bg-white/80 p-6 shadow-[0_20px_55px_rgba(15,23,42,0.06)] backdrop-blur">
          <h2 className="text-xl font-semibold text-slate-950">
            Progress snapshot
          </h2>
          <p className="mt-2 text-sm leading-6 text-muted">
            A small summary card keeps the interface useful without adding extra
            complexity.
          </p>

          <div className="mt-5 grid gap-3">
            <div className="rounded-3xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Completed todos</p>
              <p className="mt-2 text-3xl font-semibold text-slate-950">
                {completedCount}
              </p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Completion rate</p>
              <p className="mt-2 text-3xl font-semibold text-slate-950">
                {completionRate}%
              </p>
            </div>
          </div>
        </section>
      </aside>
    </section>
  );
}
