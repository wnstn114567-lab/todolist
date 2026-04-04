"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import type { TodoRecommendation } from "@/lib/todo-recommendations";

type TodoFormProps = {
  onAddTodo: (title: string) => void;
  importantTask: TodoRecommendation | null;
};

export function TodoForm({ onAddTodo, importantTask }: TodoFormProps) {
  const [title, setTitle] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      return;
    }

    onAddTodo(trimmedTitle);
    setTitle("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-4xl space-y-4 px-2 py-3 text-white sm:py-6"
    >
      <div className="flex flex-col gap-3 sm:gap-4 lg:grid lg:grid-cols-[1fr_auto] lg:items-start">
        <div className="space-y-2 text-center lg:col-start-1 lg:row-start-1 lg:justify-self-center">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
          새 할 일 추가
        </h2>
        <span className="inline-flex rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs text-slate-300">
          Enter로 추가
        </span>
        </div>

        <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-3 text-left shadow-[0_16px_40px_rgba(0,0,0,0.22)] lg:w-72 lg:justify-self-end">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-semibold tracking-[0.18em] text-sky-200/85 uppercase">
              중요일정
            </p>
            <span className="rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-1 text-[11px] text-slate-300">
              AI
            </span>
          </div>

          {importantTask ? (
            <>
              <p className="mt-3 text-sm font-semibold leading-6 text-white">
                {importantTask.title}
              </p>
              <p className="mt-1 text-xs leading-5 text-slate-400">
                {importantTask.reason}
              </p>
            </>
          ) : (
            <>
              <p className="mt-3 text-sm font-semibold leading-6 text-white">
                아직 추천할 일정이 없어요
              </p>
              <p className="mt-1 text-xs leading-5 text-slate-400">
                할 일을 추가하면 가장 먼저 볼 항목을 보여드릴게요.
              </p>
            </>
          )}
        </div>
      </div>

      <label htmlFor="todo-title" className="sr-only">
        할 일 제목
      </label>

      <div className="rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(30,36,49,0.92),rgba(16,20,29,0.94))] p-2 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <input
            id="todo-title"
            name="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="예: 발표 자료 마무리하기"
            className="min-h-14 flex-1 rounded-[24px] border border-transparent bg-white/[0.04] px-5 py-3 text-base text-white outline-none transition placeholder:text-slate-500 focus:border-sky-300/70 focus:bg-white/[0.08]"
          />
          <button
            type="submit"
            className="min-h-14 rounded-[24px] bg-[linear-gradient(180deg,#dbeafe,#93c5fd)] px-6 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300 sm:min-w-28"
          >
            추가
          </button>
        </div>
      </div>
    </form>
  );
}
