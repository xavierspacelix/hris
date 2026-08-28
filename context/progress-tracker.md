# Progress Tracker

Active phase: **Prototype complete — UI context finalized**. Design system derived from the Figma HRDashboard kit; `ui-tokens.md`, `ui-rules.md`, `ui-registry.md` regenerated from it. Ready to start P0 (scaffold via CLI). Build order: **P0 shared → Web P1…P7** (single Next.js app; Employee Self-Service is a role-scoped surface inside the same app, delivered within each phase). Screens defined in `web-screens.md`.

## Phase Status

| Phase | Theme | Status | Notes |
|---|---|---|---|
| Planning | Context + design system + prototype | 🟢 done | design system from Figma; UI context regenerated |
| P0 | Foundation | 🟡 next | scaffold via CLI; schema+RLS, auth, RBAC, tenant/branch, shell (incl. ESS entry), audit |
| P1 | People (+ ESS profile/docs) | ⚪ not started | |
| P2 | Time & Leave (+ ESS clock/leave) | ⚪ not started | |
| P3 | Compensation (+ ESS payslip/benefits) | ⚪ not started | |
| P4 | Talent (+ ESS onboarding/offboarding) | ⚪ not started | |
| P5 | Performance (+ ESS goals/review) | ⚪ not started | |
| P6 | Experience (Manager SS + Employee SS) | ⚪ not started | |
| P7 | Intelligence (project + reports + notifications) | ⚪ not started | |

Build sequence: complete all web phases in order. Employee Self-Service screens are part of the same web app (no separate mobile client). Legend: 🟢 done · 🟡 in progress · ⚪ not started.

### Notes
- No code exists yet. When build begins, scaffold via CLI: `bunx create-turbo` (monorepo), `bunx create-next-app apps/web`, then `packages/db`/`packages/api` as workspace packages.
- Database schema + RLS design is specified in `context/features/01-database-tenant-branch-rls.md` and the foundation tables in `context/architecture.md`; implementation happens in P0.
- Employee Self-Service reuses `packages/db` + `packages/api`; it is server-scoped to the employee's own record + branch and performs no admin writes.

## Per-Feature Context

Detailed specs live in `context/features/`. Tag: **[W]** web (all roles, includes ESS surface) · **[C]** cross-cutting/shared.

- P0 (shared): `00-monorepo-scaffold.md` [C], `01-database-tenant-branch-rls.md` [C], `02-authentication.md` [C], `03-rbac.md` [C], `04-tenant-branch-setup.md` [C], `05-app-shell-audit.md` [C]
- Modules: `people.md` [W], `org-structure.md` [W], `documents.md` [W], `time-attendance.md` [W], `leave.md` [W], `benefits.md` [W], `payroll.md` [W], `recruitment.md` [W], `onboarding.md` [W], `offboarding.md` [W], `performance.md` [W], `manager-ss.md` [W], `employee-ss.md` [W], `project-module.md` [W], `reporting-analytics.md` [W], `notifications-workflow.md` [W]

## Blockers / Open Decisions

- None yet. Resolve in `library-docs.md` before adding deps.

## How To Update

After a task or phase completes: mark the checkbox, set phase status, and add a one-line note. Load `/review` before flipping a phase to complete.
