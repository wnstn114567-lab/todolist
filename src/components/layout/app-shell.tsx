import type { ReactNode } from "react";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[linear-gradient(180deg,rgba(255,255,255,0.72),rgba(255,255,255,0))]" />
      <div className="pointer-events-none absolute left-[-8rem] top-20 h-64 w-64 rounded-full bg-teal-200/35 blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 right-[-7rem] h-72 w-72 rounded-full bg-sky-200/30 blur-3xl" />

      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-4 sm:px-8 sm:py-6 lg:px-10">
        <header className="relative z-10 mb-6 flex flex-col gap-4 rounded-[28px] border border-white/70 bg-white/78 px-5 py-4 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">
              Todo App
            </p>
            <p className="mt-1 text-sm text-slate-600">
              Clean local-first task tracking for a focused v1.
            </p>
          </div>

          <div className="rounded-full bg-accent-soft px-4 py-2 text-sm font-medium text-accent">
            Next.js + Tailwind CSS
          </div>
        </header>

        <main className="relative z-10 flex-1">{children}</main>

        <footer className="relative z-10 mt-8 border-t border-slate-200/80 pt-4 text-sm text-slate-500">
          Core todo flows are built to stay readable and easy to extend.
        </footer>
      </div>
    </div>
  );
}
