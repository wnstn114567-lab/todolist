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
      className="rounded-[30px] border border-slate-900/10 bg-slate-950 p-5 text-white shadow-[0_24px_60px_rgba(15,23,42,0.16)]"
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-200/80">
            Quick add
          </p>
          <h2 className="mt-2 text-xl font-semibold">Create a new task</h2>
        </div>
        <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
          Local state
        </div>
      </div>

      <label htmlFor="todo-title" className="mt-5 block text-sm text-slate-300">
        Task title
      </label>

      <div className="mt-3 flex flex-col gap-3 sm:flex-row">
        <input
          id="todo-title"
          name="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Add a task to keep momentum moving"
          className="min-h-13 flex-1 rounded-2xl border border-white/10 bg-white/8 px-4 py-3 text-base text-white outline-none transition placeholder:text-slate-400 focus:border-teal-300/70 focus:bg-white/10"
        />
        <button
          type="submit"
          className="min-h-13 rounded-2xl bg-teal-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-teal-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-300"
        >
          Add todo
        </button>
      </div>

      <p className="mt-3 text-sm leading-6 text-slate-300">
        Keep it simple: title only for v1, with fast add, toggle, and delete
        actions.
      </p>
    </form>
  );
}
