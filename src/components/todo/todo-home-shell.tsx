"use client";

import { useEffect, useState } from "react";
import { TodoAiSuggestionCard } from "@/components/todo/todo-ai-suggestion-card";
import { TodoFilterBar } from "@/components/todo/todo-filter-bar";
import { TodoForm } from "@/components/todo/todo-form";
import { TodoList } from "@/components/todo/todo-list";
import { sampleTodos } from "@/data/sample-todos";
import { filterTodos } from "@/lib/todo-filters";
import { getTodoRecommendations } from "@/lib/todo-recommendations";
import {
  loadStoredSuggestionsState,
  loadStoredTodos,
  saveStoredSuggestionsState,
  saveStoredTodos,
} from "@/lib/todo-storage";
import { addTodo, deleteTodo, toggleTodo } from "@/lib/todo-utils";
import type { TodoFilter } from "@/types/todo";

export function TodoHomeShell() {
  const [todos, setTodos] = useState(sampleTodos);
  const [currentFilter, setCurrentFilter] = useState<TodoFilter>("all");
  const [hasRequestedSuggestions, setHasRequestedSuggestions] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const hydrateFromStorage = window.setTimeout(() => {
      setTodos(loadStoredTodos());
      setHasRequestedSuggestions(loadStoredSuggestionsState());
      setIsHydrated(true);
    }, 0);

    return () => window.clearTimeout(hydrateFromStorage);
  }, []);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    saveStoredTodos(todos);
  }, [isHydrated, todos]);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    saveStoredSuggestionsState(hasRequestedSuggestions);
  }, [hasRequestedSuggestions, isHydrated]);

  const completedCount = todos.filter((todo) => todo.completed).length;
  const remainingCount = todos.length - completedCount;
  const filteredTodos = filterTodos(todos, currentFilter);
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
    setCurrentFilter("all");
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
    <section className="grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.92fr)] xl:gap-8">
      <div className="space-y-6">
        <section className="overflow-hidden rounded-[32px] border border-white/70 bg-white/88 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur sm:p-8">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
            <div className="max-w-2xl space-y-4">
              <span className="inline-flex w-fit rounded-full border border-teal-200/80 bg-teal-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-accent">
                Polished v1 Workspace
              </span>

              <div className="space-y-3">
                <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
                  Keep the list focused, readable, and ready to act on.
                </h1>
                <p className="max-w-xl text-base leading-7 text-muted">
                  Add tasks in seconds, filter the list without friction, and
                  use AI suggestions when you want a clearer next move. The
                  experience stays lightweight on both desktop and mobile.
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 xl:max-w-sm xl:grid-cols-1">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-3xl border border-slate-200/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(248,250,252,0.92))] p-4"
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

          <div className="mt-6 grid gap-3 rounded-[28px] border border-slate-200/80 bg-slate-50/70 p-4 sm:grid-cols-3">
            <div>
              <p className="text-sm font-semibold text-slate-950">Lightweight flow</p>
              <p className="mt-1 text-sm leading-6 text-muted">
                Fast add, toggle, delete, and filter interactions.
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-950">Safe local-first data</p>
              <p className="mt-1 text-sm leading-6 text-muted">
                Todos persist across refresh and malformed storage falls back safely.
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-950">Readable suggestions</p>
              <p className="mt-1 text-sm leading-6 text-muted">
                The AI panel now separates priorities, order, and summary more clearly.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-[32px] border border-white/70 bg-white/84 p-5 shadow-[0_20px_55px_rgba(15,23,42,0.06)] backdrop-blur sm:p-6">
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
            <TodoFilterBar
              activeCount={remainingCount}
              completedCount={completedCount}
              currentFilter={currentFilter}
              onChangeFilter={setCurrentFilter}
            />
          </div>

          <div className="mt-6">
            <TodoList
              currentFilter={currentFilter}
              todos={filteredTodos}
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
          todoCount={todos.length}
          activeCount={remainingCount}
        />

        <section className="rounded-[32px] border border-white/70 bg-white/84 p-6 shadow-[0_20px_55px_rgba(15,23,42,0.06)] backdrop-blur">
          <h2 className="text-xl font-semibold text-slate-950">
            Progress snapshot
          </h2>
          <p className="mt-2 text-sm leading-6 text-muted">
            A small summary card keeps the interface useful without adding extra
            complexity.
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
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
