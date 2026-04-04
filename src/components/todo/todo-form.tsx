"use client";

import type { FormEvent } from "react";
import { useState } from "react";

type TodoFormProps = {
  onAddTodo: (title: string) => void;
};

export function TodoForm({ onAddTodo }: TodoFormProps) {
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
      className="mx-auto max-w-3xl space-y-4 px-2 py-3 text-white sm:py-6"
    >
      <div className="space-y-2 text-center">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
          새 할 일 추가
        </h2>
        <span className="inline-flex rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs text-slate-300">
          Enter로 추가
        </span>
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
