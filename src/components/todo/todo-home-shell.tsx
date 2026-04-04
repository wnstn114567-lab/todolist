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
      label: "전체 할 일",
      value: String(todos.length),
      detail: "지금 목록에 담긴 모든 항목입니다.",
    },
    {
      label: "남은 작업",
      value: String(remainingCount),
      detail: "아직 처리하지 않은 항목 수입니다.",
    },
    {
      label: "완료율",
      value: `${completionRate}%`,
      detail: "현재 진행 정도를 한눈에 보여줍니다.",
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
    <section className="grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(340px,0.9fr)] xl:gap-8">
      <div className="space-y-6">
        <section className="overflow-hidden rounded-[34px] border border-white/10 bg-white/[0.045] p-6 shadow-[0_32px_120px_rgba(0,0,0,0.36)] backdrop-blur-xl sm:p-8">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
            <div className="max-w-2xl space-y-4">
              <span className="inline-flex w-fit rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">
                Calm Student Planner
              </span>

              <div className="space-y-3">
                <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-[3.4rem] lg:leading-[1.08]">
                  복잡한 하루를
                  <br className="hidden sm:block" /> 더 차분하게 정리하세요.
                </h1>
                <p className="max-w-xl text-base leading-7 text-slate-300">
                  빠르게 할 일을 추가하고, 필요한 보기만 골라 확인하고, AI 추천으로 다음 순서를 정리해 보세요.
                  데스크톱과 모바일 모두에서 가볍고 또렷하게 사용할 수 있습니다.
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 xl:max-w-sm xl:grid-cols-1">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-[28px] border border-white/10 bg-white/[0.05] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
                >
                  <p className="text-sm text-slate-400">{stat.label}</p>
                  <p className="mt-2 text-3xl font-semibold text-white">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {stat.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-7 grid gap-3 rounded-[30px] border border-white/10 bg-black/20 p-4 sm:grid-cols-3">
            <div>
              <p className="text-sm font-semibold text-white">빠른 정리 흐름</p>
              <p className="mt-1 text-sm leading-6 text-slate-400">
                추가, 완료, 삭제, 필터 전환이 자연스럽게 이어집니다.
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-white">안정적인 로컬 저장</p>
              <p className="mt-1 text-sm leading-6 text-slate-400">
                새로고침 뒤에도 유지되고, 저장 데이터가 깨져도 안전하게 동작합니다.
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-white">또렷한 추천 구조</p>
              <p className="mt-1 text-sm leading-6 text-slate-400">
                우선순위, 추천 순서, 요약이 분리되어 더 읽기 쉬워졌습니다.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-[34px] border border-white/10 bg-white/[0.04] p-5 shadow-[0_24px_90px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-accent">할 일 목록</p>
              <h2 className="mt-1 text-2xl font-semibold text-white">
                지금 해야 할 일
              </h2>
            </div>

            <p className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-slate-300">
              진행 중 {remainingCount}개
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

        <section className="rounded-[34px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_24px_90px_rgba(0,0,0,0.28)] backdrop-blur-xl">
          <h2 className="text-xl font-semibold text-white">진행 현황</h2>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            너무 복잡하지 않게, 지금 상태를 바로 파악할 수 있도록 정리했습니다.
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
            <div className="rounded-[28px] border border-white/10 bg-white/[0.05] p-4">
              <p className="text-sm text-slate-400">완료한 할 일</p>
              <p className="mt-2 text-3xl font-semibold text-white">
                {completedCount}
              </p>
            </div>
            <div className="rounded-[28px] border border-white/10 bg-white/[0.05] p-4">
              <p className="text-sm text-slate-400">전체 완료율</p>
              <p className="mt-2 text-3xl font-semibold text-white">
                {completionRate}%
              </p>
            </div>
          </div>
        </section>
      </aside>
    </section>
  );
}
