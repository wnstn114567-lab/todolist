import type { ReactNode } from "react";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[linear-gradient(180deg,rgba(255,255,255,0.72),rgba(255,255,255,0))]" />

      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-6 sm:px-8 lg:px-10">
        <header className="relative z-10 mb-8 flex items-center justify-between gap-4 rounded-full border border-white/70 bg-white/75 px-5 py-3 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">
              Todo App
            </p>
            <p className="mt-1 text-sm text-slate-600">
              Simple foundation for a focused v1.
            </p>
          </div>

          <div className="rounded-full bg-accent-soft px-4 py-2 text-sm font-medium text-accent">
            Next.js + Tailwind CSS
          </div>
        </header>

        <main className="relative z-10 flex-1">{children}</main>

        <footer className="relative z-10 mt-8 border-t border-slate-200/80 pt-4 text-sm text-slate-500">
          Clean starter shell, ready for real todo features.
        </footer>
      </div>
    </div>
  );
}
