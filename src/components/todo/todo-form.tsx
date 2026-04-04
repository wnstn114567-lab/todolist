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
      className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(30,36,49,0.92),rgba(16,20,29,0.94))] p-4 text-white shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-5"
    >
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-base font-semibold">새 할 일</h2>
        <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs text-slate-300">
          Enter로 추가
        </span>
      </div>

      <label htmlFor="todo-title" className="sr-only">
        할 일 제목
      </label>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <input
          id="todo-title"
          name="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="예: 발표 자료 마무리하기"
          className="min-h-13 flex-1 rounded-[22px] border border-white/10 bg-white/[0.07] px-4 py-3 text-base text-white outline-none transition placeholder:text-slate-500 focus:border-sky-300/70 focus:bg-white/[0.1]"
        />
        <button
          type="submit"
          className="min-h-13 rounded-[22px] bg-[linear-gradient(180deg,#dbeafe,#93c5fd)] px-5 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
        >
          추가
        </button>
      </div>
    </form>
  );
}
