# Progress Tracker

Active phase: **Prototype complete — UI context finalized**. Design system derived from the Figma HRDashboard kit; `ui-tokens.md`, `ui-rules.md`, `ui-registry.md` regenerated from it. Ready to start P0 (scaffold via CLI), then build screens per `web-screens.md` / `mobile-screens.md` using the design system.

## Phase Status

| Phase | Theme | Status | Notes |
|---|---|---|---|
| Planning | Context + design system + prototype | 🟢 done | design system from Figma; UI context regenerated |
| P0 | Foundation | 🟡 next | scaffold via CLI, then schema+RLS, auth, RBAC, tenant/branch, shell, audit |
| P1 | People | ⚪ not started | |
| P2 | Time & Leave | ⚪ not started | |
| P3 | Compensation | ⚪ not started | |
| P4 | Talent | ⚪ not started | |
| P5 | Performance | ⚪ not started | |
| P6 | Experience | ⚪ not started | |
| P7 | Intelligence | ⚪ not started | |

### Notes
- No code exists yet. When build begins, scaffold via CLI: `bunx create-turbo` (monorepo), `bunx create-next-app apps/web`, `bunx create-expo-app apps/mobile`, then `packages/db`/`packages/api` as workspace packages.
- Database schema + RLS design is specified in `context/features/01-database-tenant-branch-rls.md` and the foundation tables in `context/architecture.md`; implementation happens in P0.

## Per-Feature Context

Detailed specs live in `context/features/`:
- P0: `00-monorepo-scaffold.md`, `01-database-tenant-branch-rls.md`, `02-authentication.md`, `03-rbac.md`, `04-tenant-branch-setup.md`, `05-app-shell-audit.md`
- Modules: `people.md`, `org-structure.md`, `documents.md`, `time-attendance.md`, `leave.md`, `benefits.md`, `payroll.md`, `recruitment.md`, `onboarding.md`, `offboarding.md`, `performance.md`, `manager-ss.md`, `employee-ss-mobile.md`, `project-module.md`, `reporting-analytics.md`, `notifications-workflow.md`

## Blockers / Open Decisions

- None yet. Resolve in `library-docs.md` before adding deps.

## How To Update

After a task or phase completes: mark the checkbox, set phase status, and add a one-line note. Load `/review` before flipping a phase to complete.
