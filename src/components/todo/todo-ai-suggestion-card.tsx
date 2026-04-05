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
    title: "지금 시작",
    tone: "bg-sky-400/12 text-sky-200 ring-sky-300/20",
  },
  {
    key: "mostUrgentTask",
    title: "마감 우선",
    tone: "bg-amber-400/12 text-amber-200 ring-amber-300/20",
  },
  {
    key: "easiestQuickWin",
    title: "짧게 끝낼 일",
    tone: "bg-emerald-400/12 text-emerald-200 ring-emerald-300/20",
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
    <section className="rounded-[28px] border border-white/8 bg-white/[0.03] p-4 shadow-[0_20px_64px_rgba(0,0,0,0.22)] backdrop-blur-xl">
      <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">
            AI Assist
          </p>
          <h2 className="mt-1 text-base font-semibold text-white sm:text-lg">
            우선순위 추천
          </h2>
        </div>

        <button
          type="button"
          onClick={onSuggest}
          className="inline-flex min-h-10 items-center justify-center rounded-[18px] border border-white/10 bg-white/[0.06] px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/[0.1] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-200"
        >
          추천 보기
        </button>
      </div>

      <div className="mt-2.5 flex flex-wrap gap-2 text-xs text-slate-300">
        <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1">
          분석 {todoCount}개
        </span>
        <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1">
          진행 중 {activeCount}개
        </span>
      </div>

      {!hasRequestedSuggestions ? (
        <p className="mt-3 text-sm text-slate-400">
          필요할 때만 AI 추천을 확인하세요.
        </p>
      ) : recommendations?.emptyState ? (
        <div className="mt-3 rounded-[22px] border border-dashed border-white/14 bg-white/[0.04] p-4">
          <h3 className="text-base font-semibold text-white">
            {recommendations.emptyState.title}
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            {recommendations.emptyState.description}
          </p>
        </div>
      ) : (
        <div className="mt-3 space-y-3">
          <div className="grid gap-2 lg:grid-cols-3">
            {recommendationLabels.map((item) => {
              const recommendation = recommendations?.[item.key];

              if (!recommendation) {
                return null;
              }

              return (
                <article
                  key={item.key}
                  className="rounded-[20px] border border-white/10 bg-black/20 p-3.5"
                >
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ring-1 ${item.tone}`}
                  >
                    {item.title}
                  </span>
                  <h3 className="mt-3 text-base font-semibold text-white">
                    {recommendation.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {recommendation.reason}
                  </p>
                </article>
              );
            })}
          </div>

          <div className="rounded-[22px] border border-white/10 bg-black/20 p-4">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-sm font-semibold text-white">추천 순서</h3>
              <span className="text-xs text-slate-400">
                {recommendations?.recommendedOrder.length}단계
              </span>
            </div>

            <ol className="mt-3 space-y-2">
              {recommendations?.recommendedOrder.map((item, index) => (
                <li
                  key={item.id}
                  className="flex gap-3 rounded-[18px] border border-white/8 bg-white/[0.04] px-3.5 py-2.5"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-xs font-semibold text-slate-950">
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-white">{item.title}</p>
                    <p className="mt-1 text-sm leading-6 text-slate-400">
                      {item.reason}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <p className="mt-2.5 text-sm leading-6 text-slate-400">
              {recommendations?.summary}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
