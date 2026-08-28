# Feature: 00 Monorepo Scaffold

## Purpose
Establish the workspace so web and shared packages build and typecheck together with one command set.

## Scope (in)
- bun workspace with `apps/web`, `packages/db`, `packages/api`, `packages/ui-web`.
- Shared `tsconfig.base.json`, root `eslint`, `prettier`, `commitlint` (Conventional Commits).
- CI skeleton running `turbo run typecheck` and `turbo run lint`.

## Scope (out)
- No feature code yet. No deployments.

## Layout
```
apps/web        Next.js 16 App Router (all roles incl. Employee Self-Service)
packages/db     Prisma + RLS + scoped client
packages/api    tRPC routers + Zod
packages/ui-web shadcn primitives + tokens
```

## Key rules
- Packages import via workspace protocol (`"@hris/db": "workspace:*"`).
- No circular deps: `db` <- `api` <- `web`. `ui-web` depends on nothing internal.
- TypeScript strict in every package.

## Acceptance
- `bun install` succeeds from root.
- `bun --filter web dev`, `bun --filter api ...` all resolve.
- `turbo run typecheck` and `turbo run lint` pass on an empty scaffold.
