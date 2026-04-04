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

      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-4 sm:px-6 sm:py-5 lg:px-8">
        <header className="relative z-10 mb-4 flex flex-col gap-3 rounded-[28px] border border-white/10 bg-white/[0.045] px-4 py-3 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.07] text-sm font-semibold text-white">
              ✓
            </div>
            <div>
              <p className="text-base font-semibold text-white">집중 할 일</p>
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

        <main className="relative z-10 flex-1 pb-8">{children}</main>
      </div>
    </div>
  );
}
