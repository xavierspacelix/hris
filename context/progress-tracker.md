# Progress Tracker

Active phase: **Start P0 — Scaffold + Full UI (mock data)**. Design system finalized; `ui-tokens/ui-rules/ui-registry` are templates to fill from the design agent. P0 builds the monorepo + every screen (admin, manager, employee ESS) on typed mock data. Real API/DB wiring is deferred to a later **Wiring** pass after the UI is approved. Screens defined in `web-screens.md`; approach in `build-plan.md` ("UI-first, wire later").

## Phase Status

| Phase | Theme | Status | Notes |
|---|---|---|---|
| Planning | Context + design system + prototype | 🟢 done | design system from Figma; UI context regenerated |
| P0 | Scaffold + Full UI (mock) | 🟡 next | scaffold via CLI; install deps; tokens; app shell; build ALL screens on mock data (no API/DB yet) |
| P1 | People (+ ESS profile/docs) | ⚪ not started | |
| P2 | Time & Leave (+ ESS clock/leave) | ⚪ not started | |
| P3 | Compensation (+ ESS payslip/benefits) | ⚪ not started | |
| P4 | Talent (+ ESS onboarding/offboarding) | ⚪ not started | |
| P5 | Performance (+ ESS goals/review) | ⚪ not started | |
| P6 | Experience (Manager SS + Employee SS) | ⚪ not started | |
| P7 | Intelligence (project + reports + notifications) | ⚪ not started | |

Build sequence: complete all web phases in order. Employee Self-Service screens are part of the same web app (no separate mobile client). Legend: 🟢 done · 🟡 in progress · ⚪ not started.

### Notes
- No code exists yet. P0 scaffolds via CLI: `bunx create-turbo` (monorepo), `bunx create-next-app apps/web`, and empty `packages/db` / `packages/api` / `packages/ui-web` workspace packages. P0 builds UI only — screens use typed mocks.
- Real backend (`packages/api` tRPC + `packages/db` Prisma/RLS) is implemented in the **Wiring** pass after UI approval. Schema + RLS design lives in `context/features/01-database-tenant-branch-rls.md` and `context/architecture.md`.
- Employee Self-Service reuses the same components/API; it is server-scoped to the employee's own record + branch and performs no admin writes (enforced in the Wiring pass).

## Per-Feature Context

Detailed specs live in `context/features/`. Tag: **[W]** web (all roles, includes ESS surface) · **[C]** cross-cutting/shared.

- P0 (shared): `00-monorepo-scaffold.md` [C], `01-database-tenant-branch-rls.md` [C], `02-authentication.md` [C], `03-rbac.md` [C], `04-tenant-branch-setup.md` [C], `05-app-shell-audit.md` [C]
- Modules: `people.md` [W], `org-structure.md` [W], `documents.md` [W], `time-attendance.md` [W], `leave.md` [W], `benefits.md` [W], `payroll.md` [W], `recruitment.md` [W], `onboarding.md` [W], `offboarding.md` [W], `performance.md` [W], `manager-ss.md` [W], `employee-ss.md` [W], `project-module.md` [W], `reporting-analytics.md` [W], `notifications-workflow.md` [W]

## Blockers / Open Decisions

- None yet. Resolve in `library-docs.md` before adding deps.

## How To Update

After a task or phase completes: mark the checkbox, set phase status, and add a one-line note. Load `/review` before flipping a phase to complete.
