# Progress Tracker

Active phase: **P0 Foundation — in progress**. Web P0 shell, settings, audit workspace, RBAC service layer, and CI are implemented. Mobile remains excluded from this work. Build order: **P0 shared → full Web Dashboard (P-W1…P-W7) → Mobile ESS last (P-M1…P-M7)**.

## Phase Status

### Foundation (shared backend + both client shells)

| Phase | Theme | Status | Notes |
|---|---|---|---|
| Planning | Context + design system + prototype | 🟢 done | design system from Figma; UI context regenerated |
| P0 | Foundation | 🟡 in progress | DB/RLS/auth scaffold exists; web shell/settings/audit and API RBAC service added. tRPC install remains blocked by Bun workspace resolution; mobile excluded by current scope. |

### Module Delivery — split by client surface

Build sequence: complete all **Web Dashboard** phases first, then **Mobile ESS** phases last. Legend: 🟢 done · 🟡 in progress · ⚪ not started. Web = dashboard (admin/payroll/manager), Mobile = ESS (employee).

| Domain | Phase | Web Dashboard | Mobile ESS | Notes |
|---|---|---|---|---|
| People | P1 | ⚪ | ⚪ | web: employee/admin CRUD, org; mobile: my profile, my docs |
| Time & Attendance | P2a | ⚪ | ⚪ | web: attendance rules, timesheets, corrections; mobile: clock-in/out, my timesheet |
| Leave | P2b | ⚪ | ⚪ | web: leave admin + approvals; mobile: request leave, balances |
| Compensation & Benefits | P3 | ⚪ | ⚪ | web: payroll run, benefits admin; mobile: payslips, benefit view (employee scope only) |
| Talent (Recruit/Onboard/Offboard) | P4 | ⚪ | ⚪ | web: hiring pipeline, onboarding/offboarding workflows; mobile: onboarding tasks, candidate-free |
| Performance | P5 | ⚪ | ⚪ | web: reviews, goals admin; mobile: my goals, submit self-review |
| Experience (Manager SS / Docs / Projects) | P6 | ⚪ | ⚪ | web: manager dashboard, documents, Jira-like project module; mobile: team view, project tasks, docs |
| Intelligence (Reporting / Notifications) | P7 | ⚪ | ⚪ | web: analytics dashboards; mobile: push/notification inbox |

### Notes
- No code exists yet. When build begins, scaffold via CLI: `bunx create-turbo` (monorepo), `bunx create-next-app apps/web`, `bunx create-expo-app apps/mobile`, then `packages/db`/`packages/api` as workspace packages.
- Database schema + RLS design is specified in `context/features/01-database-tenant-branch-rls.md` and the foundation tables in `context/architecture.md`; implementation happens in P0 (shared).
- Web Dashboard and Mobile ESS share `packages/db` + `packages/api`; they differ only in client (Next.js vs Expo) and RBAC scope (all-branch roles vs employee branch scope).
- Mobile ESS never performs admin writes; it mirrors permissions decided server-side.

## Per-Feature Context

Detailed specs live in `context/features/`. Tag: **[W]** web dashboard · **[M]** mobile ESS · **[C]** cross-cutting/shared.

- P0 (shared): `00-monorepo-scaffold.md` [C], `01-database-tenant-branch-rls.md` [C], `02-authentication.md` [C], `03-rbac.md` [C], `04-tenant-branch-setup.md` [C], `05-app-shell-audit.md` [C]
- Modules: `people.md` [W], `org-structure.md` [W], `documents.md` [C], `time-attendance.md` [W], `leave.md` [W], `benefits.md` [W], `payroll.md` [W], `recruitment.md` [W], `onboarding.md` [W], `offboarding.md` [W], `performance.md` [W], `manager-ss.md` [W], `employee-ss-mobile.md` [M], `project-module.md` [W], `reporting-analytics.md` [W], `notifications-workflow.md` [C]
- Mobile ESS mirror specs (employee scope): `employee-ss-mobile.md` [M]; manager self-service on mobile reuses `manager-ss.md` semantics but is an [M] client.

## Blockers / Open Decisions

- None yet. Resolve in `library-docs.md` before adding deps.

## How To Update

After a task or phase completes: mark the checkbox, set phase status, and add a one-line note. Load `/review` before flipping a phase to complete.
