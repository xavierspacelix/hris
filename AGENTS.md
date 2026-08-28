# HRIS Agent Guide

HRIS is a multi-tenant Human Resource Information System. It is a full-stack TypeScript product: a Next.js 16 web app serving HR admins, payroll admins, managers, BOD, owners, and employees (Employee Self-Service). A shared Prisma/PostgreSQL core and a shared API package back the app. It is not a single-page demo; it is a product with hard tenant isolation, branch scoping, RBAC, payroll, recruitment, performance, and a Jira-like project module. Employee Self-Service is a role-scoped surface inside the same web app (not a separate client).

## Repository Layout

Monorepo at `/mnt/d/Source/hris`:

```text
/
├── apps/
│   └── web/         → Next.js 16 (App Router, all roles incl. Employee Self-Service)
├── packages/
│   ├── db/         → Prisma schema, migrations, tenant RLS, client extension
│   ├── api/        → shared API contracts (tRPC routers + zod schemas)
│   └── ui-web/     → shared web UI primitives (shadcn-based)
├── context/        → planning docs (this set)
└── AGENTS.md
```

## Development Command Environment

- Repository lives at `/mnt/d/Source/hris` (Windows) and is reachable through WSL at the same path.
- Node, Bun, and the React/Next toolchains run in WSL; use **Bun** for all installs and scripts.
- Prefer `bun` for installs, `turbo` for task orchestration (`build`, `lint`, `typecheck`, `dev`). Verify the executable and version before relying on it.
- Database work uses Prisma CLI via `bunx prisma`; never hand-edit migration SQL unless an ADR says so.

Example:

```bash
powershell.exe -NoProfile -Command 'cd D:\Source\hris; bun --filter web dev'
```

## Read Before Implementation

Read in this exact order:

1. `context/project-overview.md`
2. `context/architecture.md`
3. `context/code-standards.md`
4. `context/library-docs.md`
5. `context/build-plan.md`
6. `context/versioning.md`
7. `context/progress-tracker.md`

For web UI work (prototype & implementation), read before editing:

1. `context/design-system.md` (principles only — the UI token/rule/registry files are regenerated from the approved prototype, do not read them as source of truth yet)
2. `context/web-screens.md` (full screen list + build instruction; includes admin, manager, and Employee Self-Service screens)
3. `context/prototype-instructions.md`

Do not read every feature spec by default. Confirm the active phase in `context/progress-tracker.md`, then read only the docs needed for that phase.

## Feature Workflow

1. Confirm active phase in `context/progress-tracker.md`.
2. Read the relevant architecture sections and `packages/db` schema.
3. Load `/architect` before changing cross-cutting architecture (tenancy, RBAC, payroll engine, project module).
4. Verify current library docs before adding a dependency.
5. Implement only in-scope behavior for the active phase.
6. Run typecheck, lint, and relevant tests.
7. Load `/review` before marking a phase complete.
8. Update `context/progress-tracker.md` after status changes.
9. Update `context/ui-registry.md` after reusable web UI additions, using `/imprint`.

## Invariants

- Multi-tenant isolation is non-negotiable. Every query is scoped to `tenant_id`. PostgreSQL RLS is the last line of defense and must fail closed.
- Branch scoping is enforced by the data layer. Roles with `scope: 'all'` (owner, bod, hr_admin, payroll_admin) see every branch; `scope: 'branch'` (manager, employee) see only their branch. The branch filter is applied automatically by the tenant/branch client extension, never by hand per query.
- Authentication and authorization live on the server. The web client only mirrors permissions; it never decides access. Employee Self-Service is a server-scoped surface — employees see only their own, branch-scoped data.
- Audit logging is mandatory for sensitive writes: employee records, compensation, payroll runs, role/permission changes, document access.
- No hardcoded hex colors or raw Tailwind palette classes in components. Use CSS variables from `ui-tokens.md`.
- Every commit message follows Conventional Commits 1.0.0.
- Trunk-based development; `main` is the single releasable branch. Short-lived feature branches, PR required before merge.
- No cross-tenant data leakage, ever. One missed `tenant_id` filter is a severity-1 bug.
- Secrets never enter logs, client bundles, or commits. Use environment variables and secret storage only.
- Email uses SMTP (nodemailer). No external email SaaS.
- Employee Self-Service and all admin/managerial work happen in the same web app; there is no native mobile app. The web app is responsive for tablet/phone browsers.

## Scaffold Rules

Never hand-write project or config files. Every `package.json`, `tsconfig.json`, `next.config.*`, `tailwind.config.*`, `turbo.json`, and lockfiles are produced by the official CLI, never by you.

Setup commands (run from repo root):

- Monorepo + turbo: `bunx create-turbo@latest` (or `bunx turbo init`) — generates root config and workspace wiring automatically.
- Web app: `bunx create-next-app@latest apps/web --ts --app --tailwind --eslint --src-dir --import-alias "@/*"` (adjust flags to current Next 16 prompts).
- Shared package: `bunx create-turbo@latest` sub-package, or `bun init` only for a tiny internal lib.

Rules:

- After generation, only edit the generated files to fit HRIS; do not recreate config files by hand.
- Generated files (`.next`, `node_modules`, `dist`, build output, lockfiles) are git-ignored.
- If a config file already exists because a CLI created it, edit it — do not delete and rewrite it manually.

## Dependency Rules

Before adding any third-party package:

1. Load the matching skill when available.
2. Read current official documentation for the exact version.
3. Read `context/library-docs.md`.
4. Confirm the existing stack is insufficient.
5. Record the approved dependency and constraints in `library-docs.md`.

Do not rely on training knowledge for Better Auth, Prisma, Next.js 16, tRPC, or PostgreSQL RLS when current docs are available.

## Git Rules

- Trunk-based development; `main` is long-lived and releasable.
- Short-lived branches named by phase/feature (e.g. `p0-foundation`, `p2-leave`).
- Never commit or push directly to `main`; open a PR.
- Conventional Commits for every commit; one logical change per commit.
- Do not commit generated credentials, private keys, `.env`, or local database files.
- Migration SQL and Prisma schema are versioned together.

## Failure And Recovery

- After one failed corrective attempt for the same root problem, stop and load `/recover`.
- Never use destructive Git or filesystem commands to recover unrelated work.
- Preserve tenant data by default.
- Repairs probe first, mutate second, verify postconditions.

## Available Skills

- `/architect`: before any complex feature, architecture change, or scope change.
- `/imprint`: after adding any reusable web UI component.
- `/review`: before marking a phase complete or when implementation may have drifted.
- `/recover`: after one failed corrective attempt for the same root problem.
- `/remember save` / `/remember restore`: for multi-session work.
