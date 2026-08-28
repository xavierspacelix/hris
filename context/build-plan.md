# Build Plan

Phased build. Each phase produces visible, testable functionality before the next begins. No invisible backend-only phases. All work ships in the single Next.js web app; Employee Self-Service is a role-scoped surface inside the same app.

Track legend: **[C]** shared/backend · **[W]** Web (all roles — admin / payroll / manager / BOD / employee ESS).

## Build Approach — UI-first, wire later

The build starts with **scaffold + the full UI on mock data**, then wires real backend afterward:

1. **P0 — Scaffold + Full UI**: create the monorepo (`apps/web`, `packages/db`, `packages/api`, `packages/ui-web`) via CLI, install deps, apply design tokens, build the app shell, and implement **every screen for all roles** (admin, manager, employee ESS) using typed mock fixtures. The UI is reviewable end-to-end before any backend exists.
2. **Wiring Pass (post-UI)**: only after the UI is approved, implement `packages/api` (tRPC routers + Zod + RBAC) and `packages/db` (Prisma schema + tenant/branch RLS + scoped client), then swap each screen's mock data source for the real API. Mock fixture shapes are defined to match the feature specs so the swap is mechanical.

During the UI phase no `packages/api`/`packages/db` logic is written — screens import from a `mocks/` module only. This keeps the prototype independent of backend and lets design review happen early.

---

## Phase 0 — Foundation (shared) [C]

### 00 Monorepo scaffold
- bun workspace: `apps/web`, `packages/db`, `packages/api`, `packages/ui-web`.
- Shared TypeScript config, eslint, prettier, conventional commits hook.
- CI skeleton (typecheck + lint).

### 01 Database schema + tenant/branch RLS
- Prisma schema: `tenants`, `branches`, `users`, `user_roles`, `roles`, `role_permissions`, `permissions`, `audit_logs`.
- `tenant_id` on every business table; `branch_id` on scoping-relevant tables.
- Migration that enables RLS and creates `tenant_isolation` (and branch) policies with `SET LOCAL app.current_tenant`.
- `packages/db` client extension `withTenantScope(tenantId, branchId, scope)` enforcing filters automatically.
- Seed script: one demo tenant with two branches and the six template roles.

### 02 Authentication (Better Auth) [C]
- Better Auth with email/password, MFA (TOTP), SSO OIDC/SAML hooks.
- Tenant resolution from subdomain/session in middleware.
- Session → `(tenantId, userId, role, scope, branchId)`.
- Login, reset password, invitation accept pages (web).

### 03 RBAC + member management [C]
- Role templates seeded; permission matrix evaluation in `packages/api`.
- Invite user, assign role, member list (web settings).
- Permission bitmap sent to clients for UI gating (mirror only).
- Audit log writes on role/permission changes.

### 04 Tenant & branch setup [C]
- Tenant settings page (name, logo, timezone, locale, currency, regional).
- Branch CRUD + assign employees + per-branch settings.
- Tenant onboarding wizard (create org → add branch → invite first HR admin).

### 05 App shell + audit log [C]
- Web layout: role-based sidebar nav, topbar with tenant/branch switcher (cross-branch roles only).
- Employee Self-Service entry (`/(tenant)/me`) routed from the same shell, scoped to the employee's own record.
- Audit log viewer (read-only, tenant-scoped).

### Phase 0 exit
- A new tenant can sign up, create branches, invite users, log in with correct role scope, and see tenant-isolated, branch-scoped data. Audit log records auth/role events.

---

## Web Phases [W]

Every web phase builds both the administrative/managerial screens and the corresponding Employee Self-Service screens (under `/(tenant)/me`) where the feature applies to employees.

### P1 People
- **10 Employee data** — `employees` + related (addresses, emergency contacts, identity, bank, employment, job info, compensation history, custom fields). Employee list, profile view/edit. Search, filter, saved views. Bulk import/export.
- **11 Org structure** — `departments`, `positions`, `cost_centers`, `reporting_lines`. Org chart (interactive). Headcount plan vs actual.
- **12 Documents** — `documents` + object storage broker. Vault per employee, categories, expiry alerts. Templates + generate-from-template. Access audit.
- **ESS (P1)** — employee views/edits own profile (partial fields); employee personal document vault (view/download).

### P2 Time & Leave
- **20 Attendance** — `attendance` (clock in/out), `timesheets`, `shifts`, `work_schedules`. Web admin: attendance rules, timesheet correction & approval, shift scheduling + swap. Employee clock in/out (GPS/photo per policy) + my timesheet.
- **21 Leave** — `leave_types`, `leave_policies`, `leave_balances`, `leave_requests`, `holiday_calendars`. Accrual engine. Multi-level approval. Conflict detection. Overtime request & approval.
- **ESS (P2)** — employee clock in/out, my timesheet + corrections, leave request + balances + history, overtime request + status.

### P3 Compensation
- **30 Benefits** — `benefit_plans`, `benefit_enrollments`, life-event workflow, per-employee summary.
- **31 Payroll** — `payroll_groups`, `payroll_periods`, `payroll_runs`, `payslips`, components, tax engine (country-extensible), reimbursement/loan. Pay run lifecycle draft→review→approve→lock. Payslip PDF. Reconciliation journal out.
- **ESS (P3)** — employee payslip view/download, benefit summary + enrollment, reimbursement/loan request + status.

### P4 Talent
- **40 Recruitment / ATS** — `requisitions`, `job_posts`, `applicants`, `pipeline_stages`, `interviews`, `offers`, career page, candidate portal.
- **41 Onboarding** — `onboarding_templates`, `onboarding_tasks`, probation tracking.
- **42 Offboarding** — Resignation/termination workflow, exit interview, checklist, final settlement hook, rehire flag.
- **ESS (P4)** — employee onboarding task checklist (progress, complete assigned tasks); offboarding self-initiate / read-only exit checklist.

### P5 Performance
- **50 Goals & reviews** — `goals`, `review_cycles`, `reviews`, `competencies`, `feedback`, calibration, nine-box, IDP.
- **ESS (P5)** — employee my goals (view/update), submit self-review, view feedback/IDP.

### P6 Experience
- **60 Manager Self-Service (web)** — Team directory, approvals, attendance view, reviews, requisitions, team analytics, delegation.
- **61 Employee Self-Service (web)** — Directory & colleague search, company announcements & newsfeed, project tasks view, helpdesk hook. (Full ESS feature set consolidated here alongside Manager SS.)

### P7 Intelligence
- **70 Project module (web, Jira-like)** — `projects`, `issues`, `sprints`, `issue_comments`, `project_members`, board, backlog, roadmap, reports, notifications.
- **71 Reporting & analytics** — Headcount, turnover, diversity, absence, leave liability, compensation cost, pipeline, performance distribution. Custom report builder. Executive dashboard.
- **72 Notifications & workflow** — SMTP + in-app dispatcher, templates, digest. Rule builder (trigger→condition→action), outbound webhooks.

---

## Phase Count

| Track | Phase | Theme | Features |
|---|---|---|---|
| Shared | P0 | Scaffold + Full UI (mock data) | monorepo, shell, all screens |
| Web | P1 | People (+ ESS profile/docs) | 3 + ESS |
| Web | P2 | Time & Leave (+ ESS clock/leave) | 2 + ESS |
| Web | P3 | Compensation (+ ESS payslip/benefits) | 2 + ESS |
| Web | P4 | Talent (+ ESS onboarding/offboarding) | 3 + ESS |
| Web | P5 | Performance (+ ESS goals/review) | 1 + ESS |
| Web | P6 | Experience (Manager SS + Employee SS) | 2 |
| Web | P7 | Intelligence (project + reports + notifications) | 3 |
| Backend | Wiring | Connect `packages/api` + `packages/db` + RLS | swap mocks → real data |

Full feature coverage = sections A–T in `project-overview.md`. Web is the single client. Build P0 → P1 → … → P7 as **UI on mock data**; Employee Self-Service screens are delivered within the same phases. After the UI is approved, run the **Wiring** pass to connect real API/DB.
