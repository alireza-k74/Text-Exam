# Test Exam

Lightweight, production-ready Next.js frontend foundation for **pixel-perfect Figma implementation**. UI-only — no backend, auth, or API layer.

## Stack

| Area | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router) + React 19 + TypeScript (strict) |
| Package manager | **Yarn** (always) |
| Styling | Tailwind CSS v4 + CSS design tokens |
| Components | shadcn/ui (Base UI primitives) + Lucide |
| Animation | Motion for React (respects `prefers-reduced-motion`) |
| Forms (ready) | React Hook Form + Zod + `@hookform/resolvers` |
| Unit tests | Vitest + React Testing Library |
| E2E / visual | Playwright (Chromium + multi-viewport) |
| Quality | ESLint (Next) + Prettier |

## Project conventions

1. **Responsive everywhere** — every screen/component must be aligned and usable from 320px to 1920px.
2. **Imports use `~/`** — never deep `../../` paths (`~/` → `src/`).
3. **Barrel exports** — each folder exposes an `index.ts` / `index.tsx`; import from the folder.
4. **Yarn only** — do not use pnpm/npm for this repo.
5. **Scripts** — use the npm scripts listed below via `yarn <script>`.

```tsx
// ✅
import { Button, Card } from "~/components/ui";
import { HomePreview } from "~/features/home";

// ❌
import { Button } from "../../components/ui/button";
```

## Architecture

```
src/
  app/                 # Next.js App Router (layout, page, globals)
  components/
    ui/                # shadcn primitives (+ index.ts barrel)
    layout/            # shell, providers, header
    shared/            # cross-feature shared UI
  features/
    home/              # feature module (replace with Figma feature)
  screens/             # screen-level compositions (barrel-ready)
  hooks/               # shared hooks
  lib/                 # utils, constants
  styles/tokens.css    # centralized design tokens
  types/
public/
  fonts/ images/ icons/
tests/
  unit/ e2e/ helpers/
.cursor/rules/         # Cursor AI project rules
```

## Install

Requires **Node.js 20.9+** (LTS) and **Yarn**.

```bash
yarn install
yarn playwright install chromium
```

## Commands

```bash
yarn dev              # local development
yarn build            # production build
yarn start            # serve production build
yarn lint             # ESLint
yarn lint:fix        # ESLint autofix
yarn typecheck        # TypeScript
yarn format           # Prettier write
yarn format:check     # Prettier check
yarn test             # Vitest unit tests
yarn test:watch       # Vitest watch
yarn test:e2e         # Playwright
yarn test:e2e:ui      # Playwright UI mode
yarn test:e2e:report  # open HTML report
yarn prepare:e2e      # build + install Chromium
yarn check            # typecheck + lint + format + unit
yarn verify           # check + build + e2e
yarn clean            # remove .next / reports
```

## Design tokens

All visual primitives live in `src/styles/tokens.css` and are mapped into Tailwind via `@theme inline` in `src/app/globals.css`.

When implementing Figma:

1. Replace semantic tokens (`--background`, `--primary`, `--radius`, typography, spacing…).
2. Add Figma-specific primitives as needed (arbitrary values are fine).
3. Prefer semantic classes (`bg-background`, `text-muted-foreground`) over raw colors.
4. Light + dark token sets exist architecturally; no theme switcher is included.

## Adding shadcn components

```bash
yarn dlx shadcn@latest add <component>
```

Then re-export the new component from `src/components/ui/index.ts`.

## Responsive testing

Playwright projects cover the assessment viewport matrix. Helpers live in `tests/helpers/visual.ts`.

## RTL / LTR

- Default direction is LTR (`DEFAULT_DIR` in `~/lib`).
- Prefer logical properties (`ps`/`pe`, `ms`/`me`, `start`/`end`).

## Notes

- This starter page is disposable. Replace `src/features/home` (or add screens under `src/screens`) with the assessment design.
- No Redux, Zustand, TanStack Query, or Axios — not needed for UI-only work.