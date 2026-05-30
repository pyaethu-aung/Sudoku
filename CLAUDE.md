# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Monorepo layout

Turborepo + pnpm workspaces. Two apps consume two shared packages:

```
apps/
  web/      React 18 + Vite + Tailwind CSS
  mobile/   Expo (React Native 0.74)
packages/
  core/     @sudoku/core — pure TS business logic (solve, validate, generate)
  ui/       @sudoku/ui   — shared React component library (peer dep on React)
```

Both apps declare `@sudoku/core` as a workspace dependency. `@sudoku/ui` is available but not yet consumed. Package entry points export directly from `src/index.ts` (no build step for packages — bundler resolves TS source).

## Commands

Run from the repo root unless noted.

| Task | Command |
|------|---------|
| Dev (all) | `pnpm dev` |
| Dev (web only) | `pnpm --filter @sudoku/web dev` |
| Dev (mobile) | `pnpm --filter @sudoku/mobile dev` (runs `expo start`) |
| Build all | `pnpm build` |
| Lint all | `pnpm lint` |
| Test all | `pnpm test` |
| Test (core only) | `pnpm --filter @sudoku/core test` |
| Run a single test file | `cd packages/core && pnpm exec vitest run src/path/to/file.test.ts` |
| Run tests in watch mode | `cd packages/core && pnpm exec vitest` |
| Format | `pnpm format` |

Tests live only in `packages/core` (Vitest). The `packages/ui` package has no test runner configured yet.

## Key conventions

- **ESM everywhere**: all packages use `"type": "module"`.
- **TypeScript strict**: base config at `tsconfig.base.json` with `strict: true`, `noEmit: true`, `moduleResolution: bundler`.
- **Prettier**: single quotes, trailing commas, semicolons, 2-space indent, 100-char print width.
- **ESLint**: `@typescript-eslint/recommended` + `prettier` (no custom rules yet).
- **Turbo task graph**: `build` depends on `^build` (packages build before apps); `test` and `lint` are independent.

## Current state

All core logic (`solve`, `validate`, `generate` in `packages/core/src/index.ts`) is stubbed — they throw `Error('Not implemented')`. Both apps render a placeholder heading. The mobile build step is a no-op (`echo` command); actual mobile builds go through EAS.
