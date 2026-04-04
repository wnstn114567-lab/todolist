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
      className="rounded-[34px] border border-white/10 bg-[linear-gradient(180deg,rgba(30,36,49,0.92),rgba(16,20,29,0.94))] p-5 text-white shadow-[0_28px_100px_rgba(0,0,0,0.4)] backdrop-blur-xl sm:p-6"
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-sky-200/80">
            Quick Capture
          </p>
          <h2 className="mt-2 text-xl font-semibold">새 할 일 추가</h2>
        </div>
        <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
          자동 저장
        </div>
      </div>

      <label htmlFor="todo-title" className="mt-5 block text-sm text-slate-300">
        할 일 제목
      </label>

      <div className="mt-3 flex flex-col gap-3 sm:flex-row">
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
          추가하기
        </button>
      </div>

      <p className="mt-3 text-sm leading-6 text-slate-300">
        간단한 제목만 입력하면 됩니다. 추가, 완료 처리, 삭제, 새로고침 후 유지까지 지금 흐름 그대로 사용할 수 있습니다.
      </p>
    </form>
  );
}
