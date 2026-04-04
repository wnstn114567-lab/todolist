"use client";

import type { TodoRecommendations } from "@/lib/todo-recommendations";

type TodoAiSuggestionCardProps = {
  recommendations: TodoRecommendations | null;
  hasRequestedSuggestions: boolean;
  onSuggest: () => void;
  todoCount: number;
  activeCount: number;
};

const recommendationLabels = [
  {
    key: "bestTaskFirst",
    title: "Start here",
    tone: "bg-teal-50 text-teal-800 ring-teal-100",
  },
  {
    key: "mostUrgentTask",
    title: "Most urgent",
    tone: "bg-amber-50 text-amber-800 ring-amber-100",
  },
  {
    key: "easiestQuickWin",
    title: "Quick win",
    tone: "bg-sky-50 text-sky-800 ring-sky-100",
  },
] as const;

export function TodoAiSuggestionCard({
  recommendations,
  hasRequestedSuggestions,
  onSuggest,
  todoCount,
  activeCount,
}: TodoAiSuggestionCardProps) {
  return (
    <section className="overflow-hidden rounded-[32px] border border-white/70 bg-white/88 p-6 shadow-[0_20px_55px_rgba(15,23,42,0.06)] backdrop-blur">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-accent">AI planner</p>
          <h2 className="mt-1 text-2xl font-semibold text-slate-950">
            Smart suggestions
          </h2>
          <p className="mt-2 max-w-md text-sm leading-6 text-muted">
            A lightweight heuristic pass helps turn the current list into a
            clearer next move.
          </p>
        </div>

        <button
          type="button"
          onClick={onSuggest}
          className="inline-flex min-h-11 items-center justify-center rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-950"
        >
          AI Suggest
        </button>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <div className="rounded-3xl border border-slate-200/80 bg-slate-50/80 p-4">
          <p className="text-sm text-slate-500">Tasks analyzed</p>
          <p className="mt-2 text-2xl font-semibold text-slate-950">
            {todoCount}
          </p>
        </div>
        <div className="rounded-3xl border border-slate-200/80 bg-slate-50/80 p-4">
          <p className="text-sm text-slate-500">Active candidates</p>
          <p className="mt-2 text-2xl font-semibold text-slate-950">
            {activeCount}
          </p>
        </div>
      </div>

      {!hasRequestedSuggestions ? (
        <div className="mt-6 rounded-3xl border border-dashed border-slate-300 bg-[linear-gradient(180deg,rgba(248,250,252,0.85),rgba(255,255,255,0.95))] p-5">
          <p className="text-sm font-medium text-slate-700">
            Run AI Suggest to pick a smart starting point from your current
            todos.
          </p>
          <p className="mt-2 text-sm leading-6 text-muted">
            It looks for urgency words, quick-win hints, and unfinished tasks,
            then keeps the explanation short.
          </p>
        </div>
      ) : recommendations?.emptyState ? (
        <div className="mt-6 rounded-3xl border border-dashed border-slate-300 bg-[linear-gradient(180deg,rgba(248,250,252,0.85),rgba(255,255,255,0.95))] p-5">
          <h3 className="text-lg font-semibold text-slate-950">
            {recommendations.emptyState.title}
          </h3>
          <p className="mt-2 text-sm leading-6 text-muted">
            {recommendations.emptyState.description}
          </p>
        </div>
      ) : (
        <div className="mt-6 space-y-5">
          <div className="rounded-[28px] border border-slate-200/80 bg-[linear-gradient(180deg,rgba(248,250,252,0.92),rgba(255,255,255,0.98))] p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold text-slate-950">
                  Priority breakdown
                </h3>
                <p className="mt-1 text-sm leading-6 text-muted">
                  Three quick reads help you decide where to start.
                </p>
              </div>
              <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent">
                Refreshed
              </span>
            </div>

            <div className="mt-4 grid gap-3">
            {recommendationLabels.map((item) => {
              const recommendation = recommendations?.[item.key];

              if (!recommendation) {
                return null;
              }

              return (
                <article
                  key={item.key}
                  className="rounded-3xl border border-slate-200/80 bg-white/90 p-4"
                >
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ring-1 ${item.tone}`}
                  >
                    {item.title}
                  </span>
                  <h3 className="mt-3 text-lg font-semibold text-slate-950">
                    {recommendation.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    {recommendation.reason}
                  </p>
                </article>
              );
            })}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200/80 bg-white p-5">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-lg font-semibold text-slate-950">
                Recommended order
              </h3>
              <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent">
                Top flow
              </span>
            </div>

            <ol className="mt-4 space-y-3">
              {recommendations?.recommendedOrder.map((item, index) => (
                <li
                  key={item.id}
                  className="flex gap-3 rounded-2xl bg-slate-50 px-4 py-3"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-sm font-semibold text-slate-950 ring-1 ring-slate-200">
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-slate-950">{item.title}</p>
                    <p className="mt-1 text-sm leading-6 text-muted">
                      {item.reason}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <p className="mt-4 text-sm leading-6 text-muted">
              {recommendations?.summary}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
