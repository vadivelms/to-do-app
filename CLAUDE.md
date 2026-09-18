# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # start Vite dev server
npm run build     # tsc -b type-check, then vite build
npm run preview   # preview the production build
npm test          # run all tests once (vitest run)
npm run lint      # oxlint
```

Run a single test file: `npx vitest run src/__tests__/sort.test.ts`
Run tests matching a name: `npx vitest run -t "toggles completion"`
Watch mode: `npx vitest` (no `run` arg)

## Architecture

Single-user todo app, frontend-only — there is no backend or API. All persistence goes through `localStorage` via `src/utils/storage.ts` (`loadTasks`/`saveTasks`, JSON-serialized array of `Task`).

State flow: `src/hooks/useTasks.ts` is the single source of truth for task data. It loads from storage once on mount, exposes `addTask` / `updateTask` / `deleteTask` / `toggleComplete`, and an effect writes the full array back to `localStorage` on every change. `App.tsx` is the only consumer of this hook — filtering (status/priority/tag) and sorting (`src/utils/sort.ts`: `sortTasks`, `isOverdue`) are computed derived state in `App.tsx` via `useMemo`, not stored.

Component split under `src/components/`: `TaskForm` (shared between add and edit — `TaskItem` renders it inline in place of the row when editing), `TaskList`/`TaskItem` (rendering + per-row actions), `FilterBar` (status/priority/tag/sort controls). Each component pairs with a co-located `*.module.css` (CSS Modules, no global styles beyond `src/index.css` which defines the color/theme CSS variables used across modules, e.g. `--accent`, `--panel-bg`, `--border`).

`src/types.ts` defines the `Task` and `TaskInput` shapes used throughout — `TaskInput` is what forms produce/consume; `Task` adds `id`, `completed`, `createdAt`.

Tests live in `src/__tests__/` (not co-located with source) and cover the two logic-heavy modules: `useTasks` (via `@testing-library/react`'s `renderHook`, clearing `localStorage` in `beforeEach`) and `sort.ts`. Component rendering itself is not currently tested.
