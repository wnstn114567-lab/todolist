export function TodoEmptyState() {
  return (
    <div className="rounded-[30px] border border-dashed border-slate-300 bg-white/80 p-8 text-center shadow-[0_18px_45px_rgba(15,23,42,0.05)]">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent-soft text-2xl">
        +
      </div>
      <h3 className="mt-4 text-xl font-semibold text-slate-950">No todos yet</h3>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted">
        Add your first task to turn this clean slate into a focused plan for
        the day.
      </p>
    </div>
  );
}
