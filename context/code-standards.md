# Code Standards

## Language

- TypeScript strict mode everywhere (`strict: true`, `noUncheckedIndexedAccess`).
- No `any` in shipped code; prefer `unknown` with narrowing.
- Server code is plain TypeScript/Node; no React imports in `packages/api` or `packages/db`.

## Formatting & Lint

- Prettier with project config; single quotes, trailing commas, 2-space indent.
- ESLint with `typescript-eslint` + `next` config for web.
- Maximum line length 100; files under 400 lines where practical (split by responsibility).
- Run `turbo run lint` and `turbo run typecheck` before marking any phase complete.

## Naming

- `PascalCase` for types/components, `camelCase` for variables/functions, `UPPER_SNAKE` for env/constants.
- DB tables: `snake_case`, plural (`employees`, `leave_requests`). Columns: `snake_case`.
- tRPC routers: `camelCase` namespaced by domain (`people.get`, `leave.request`).

## Layering

- `packages/db`: schema, migrations, RLS, scoped client extension. No HTTP, no UI.
- `packages/api`: tRPC routers, Zod schemas, service-layer authorization. No React, no DB schema.
- `apps/web`: pages + components. Data only via `packages/api`. No raw Prisma calls.

Enforcement rule: components never query the database directly; API never returns cross-tenant/branch data.

## Multi-Tenancy & Branch

- Every new business table MUST include `tenant_id` (UUID, indexed first) and, when scoping-relevant, `branch_id`.
- Use the scoped Prisma client exclusively. Do not write manual `WHERE tenant_id =` except inside `packages/db` extension code.
- Branch filter is automatic from session scope. Never hand-add branch predicates in feature code.

## Authorization

- Every mutation router calls `requirePermission(ctx, resource, action)` before business logic.
- Permission bitmap returned to clients is for UI gating only and is not trusted server-side.

## Audit Logging

- Wrap sensitive writes with `audit(ctx, { action, entity, entityId, before, after })`.
- Sensitive = PII, compensation, payroll run, role/permission change, document access.

## Errors & Validation

- All inputs validated with Zod at the API boundary.
- Use `TRPCError` with precise codes; never leak internal SQL/RLS errors to clients.
- Log server errors with `tenantId` context, never with secrets.

## Commits

- Conventional Commits 1.0.0: `feat(p0):`, `fix(payroll):`, `docs(context):`, etc.
- One logical change per commit. Migration + schema together.

## Testing

- Unit tests for scoping/RLS logic and payroll/tax math.
- Integration test: a cross-tenant query MUST return zero rows.
- A cross-branch query for a branch-scoped user MUST return zero rows for other branches.
