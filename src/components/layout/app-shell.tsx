import type { ReactNode } from "react";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0))]" />
      <div className="pointer-events-none absolute left-[-8rem] top-12 h-64 w-64 rounded-full bg-sky-300/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-3rem] right-[-6rem] h-72 w-72 rounded-full bg-emerald-300/10 blur-3xl" />

      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
        <header className="relative z-10 mb-3 flex flex-col gap-2 rounded-[26px] border border-white/10 bg-white/[0.045] px-4 py-2.5 shadow-[0_20px_70px_rgba(0,0,0,0.32)] backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.07] text-sm font-semibold text-white">
              ✓
            </div>
            <div>
              <p className="text-sm font-semibold text-white sm:text-base">집중 할 일</p>
              <p className="text-xs text-slate-400">바로 추가하고 바로 정리하세요</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 text-xs text-slate-300">
            <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1">
              로컬 저장
            </span>
            <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1">
              AI 보조
            </span>
          </div>
        </header>

        <main className="relative z-10 flex-1 pb-5">{children}</main>
      </div>
    </div>
  );
}
