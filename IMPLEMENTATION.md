# Implementation

## Architecture

- `src/app/layout.tsx` sets metadata, fonts, and the shared shell wrapper.
- `src/app/page.tsx` mounts the todo homepage shell.
- `src/components/layout/app-shell.tsx` provides the shared page chrome.
- `src/components/todo/todo-home-shell.tsx` renders the hero, quick-add shell, and task sections.
- `src/data/sample-todos.ts` holds static sample todo data for the initial UI.
- `src/types/todo.ts` defines the small shared todo domain types.

## Decisions

- Keep the first pass server-rendered and static so the baseline stays easy to read.
- Use only framework-provided tooling: Next.js, TypeScript, ESLint, and Tailwind CSS.
- Keep folders shallow so future CRUD work has an obvious place to live.

## Styling

Tailwind CSS v4 is configured through `src/app/globals.css` with:

- `@import "tailwindcss";`
- design tokens defined via `@theme inline`
- project-wide background, typography, and surface styles

## Expected Next Steps

1. Turn the quick-add panel into a real form.
2. Replace sample data with client state or a backend.
3. Add filtering, sorting, and completion actions.
4. Add tests once behavior becomes interactive.
