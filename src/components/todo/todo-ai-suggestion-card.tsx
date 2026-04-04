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
    title: "지금 시작 추천",
    tone: "bg-sky-400/12 text-sky-200 ring-sky-300/20",
  },
  {
    key: "mostUrgentTask",
    title: "가장 시급함",
    tone: "bg-amber-400/12 text-amber-200 ring-amber-300/20",
  },
  {
    key: "easiestQuickWin",
    title: "빠른 성취",
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
    <section className="overflow-hidden rounded-[34px] border border-white/10 bg-[linear-gradient(180deg,rgba(20,27,39,0.92),rgba(12,16,24,0.94))] p-6 shadow-[0_30px_110px_rgba(0,0,0,0.36)] backdrop-blur-xl">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-accent">AI 추천</p>
          <h2 className="mt-1 text-2xl font-semibold text-white">
            다음 우선순위 정리
          </h2>
          <p className="mt-2 max-w-md text-sm leading-6 text-slate-400">
            현재 목록을 바탕으로 우선순위, 빠른 시작점, 추천 순서를 깔끔하게 정리해 줍니다.
          </p>
        </div>

        <button
          type="button"
          onClick={onSuggest}
          className="inline-flex min-h-11 items-center justify-center rounded-[20px] bg-[linear-gradient(180deg,#e2e8f0,#cbd5e1)] px-4 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-200"
        >
          AI 추천 받기
        </button>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <div className="rounded-[28px] border border-white/10 bg-white/[0.05] p-4">
          <p className="text-sm text-slate-400">분석한 항목</p>
          <p className="mt-2 text-2xl font-semibold text-white">{todoCount}</p>
        </div>
        <div className="rounded-[28px] border border-white/10 bg-white/[0.05] p-4">
          <p className="text-sm text-slate-400">추천 대상</p>
          <p className="mt-2 text-2xl font-semibold text-white">{activeCount}</p>
        </div>
      </div>

      {!hasRequestedSuggestions ? (
        <div className="mt-6 rounded-[28px] border border-dashed border-white/14 bg-white/[0.04] p-5">
          <p className="text-sm font-medium text-slate-200">
            AI 추천을 실행하면 지금 목록에서 어디부터 시작하면 좋을지 바로 확인할 수 있습니다.
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            시급해 보이는 표현, 빠르게 끝낼 수 있는 항목, 아직 남아 있는 작업을 기준으로 짧고 읽기 쉽게 정리합니다.
          </p>
        </div>
      ) : recommendations?.emptyState ? (
        <div className="mt-6 rounded-[28px] border border-dashed border-white/14 bg-white/[0.04] p-5">
          <h3 className="text-lg font-semibold text-white">
            {recommendations.emptyState.title}
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            {recommendations.emptyState.description}
          </p>
        </div>
      ) : (
        <div className="mt-6 space-y-5">
          <div className="rounded-[28px] border border-white/10 bg-white/[0.05] p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold text-white">
                  우선순위 요약
                </h3>
                <p className="mt-1 text-sm leading-6 text-slate-400">
                  세 가지 관점으로 지금 시작하기 좋은 방향을 정리했습니다.
                </p>
              </div>
              <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent">
                최신 분석
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
                    className="rounded-[24px] border border-white/10 bg-black/20 p-4"
                  >
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ring-1 ${item.tone}`}
                    >
                      {item.title}
                    </span>
                    <h3 className="mt-3 text-lg font-semibold text-white">
                      {recommendation.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      {recommendation.reason}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/[0.05] p-5">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-lg font-semibold text-white">추천 순서</h3>
              <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent">
                집중 흐름
              </span>
            </div>

            <ol className="mt-4 space-y-3">
              {recommendations?.recommendedOrder.map((item, index) => (
                <li
                  key={item.id}
                  className="flex gap-3 rounded-[22px] border border-white/8 bg-black/20 px-4 py-3"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-sm font-semibold text-slate-950">
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

            <p className="mt-4 rounded-[22px] border border-white/8 bg-black/20 px-4 py-3 text-sm leading-6 text-slate-400">
              {recommendations?.summary}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
