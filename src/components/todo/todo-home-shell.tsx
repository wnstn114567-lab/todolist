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
    <section className="mx-auto w-full max-w-5xl space-y-5">
      <TodoForm onAddTodo={handleAddTodo} />

      <section className="rounded-[34px] border border-white/10 bg-white/[0.05] p-5 shadow-[0_28px_100px_rgba(0,0,0,0.3)] backdrop-blur-xl sm:p-6">
        <div className="border-b border-white/8 pb-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl font-semibold text-white">할 일</h2>
                <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs text-slate-300">
                  전체 {todos.length}
                </span>
                <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs text-slate-300">
                  진행 중 {remainingCount}
                </span>
                <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs text-slate-300">
                  완료 {completedCount}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-2 w-full max-w-44 rounded-full bg-white/[0.06]">
                  <div
                    className="h-full rounded-full bg-[linear-gradient(90deg,#7dd3fc,#34d399)]"
                    style={{ width: `${completionRate}%` }}
                  />
                </div>
                <span className="text-sm text-slate-400">
                  완료율 {completionRate}%
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <TodoFilterBar
              activeCount={remainingCount}
              completedCount={completedCount}
              currentFilter={currentFilter}
              onChangeFilter={setCurrentFilter}
            />
          </div>
        </div>

        <div className="mt-4">
          <TodoList
            currentFilter={currentFilter}
            todos={filteredTodos}
            onToggleTodo={handleToggleTodo}
            onDeleteTodo={handleDeleteTodo}
          />
        </div>
      </section>

      <TodoAiSuggestionCard
        recommendations={recommendations}
        hasRequestedSuggestions={hasRequestedSuggestions}
        onSuggest={handleSuggestTodos}
        todoCount={todos.length}
        activeCount={remainingCount}
      />
    </section>
  );
}
