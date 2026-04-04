import type { ReactNode } from "react";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0))]" />
      <div className="pointer-events-none absolute left-[-8rem] top-16 h-72 w-72 rounded-full bg-sky-300/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-2rem] right-[-6rem] h-80 w-80 rounded-full bg-emerald-300/10 blur-3xl" />

      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
        <header className="relative z-10 mb-6 flex flex-col gap-4 rounded-[30px] border border-white/10 bg-white/[0.045] px-5 py-4 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:mb-8 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-accent">
              Focus Workspace
            </p>
            <p className="mt-1 text-sm text-slate-300">
              차분한 다크 모드로 정리하는 개인 할 일 공간
            </p>
          </div>

          <div className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm font-medium text-slate-200">
            로컬 저장 · 빠른 정리 · AI 추천
          </div>
        </header>

        <main className="relative z-10 flex-1">{children}</main>

        <footer className="relative z-10 mt-8 border-t border-white/10 pt-4 text-sm text-slate-400">
          핵심 투두 흐름은 그대로 유지하면서 더 또렷하고 편안한 사용감을 담았습니다.
        </footer>
      </div>
    </div>
  );
}
