# Build Plan

Phased build. Each phase produces visible, testable functionality before the next begins. No invisible backend-only phases.

Track legend: **[C]** shared/backend · **[W]** Web Dashboard (Next.js — HR admin / payroll admin / manager) · **[M]** Mobile ESS (Expo — employee self-service).

---

## Phase 0 — Foundation (shared) [C]

### 00 Monorepo scaffold
- bun workspace: `apps/web`, `apps/mobile`, `packages/db`, `packages/api`, `packages/ui-web`.
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
- Login, reset password, invitation accept pages (web) + mobile auth stack.

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
- Web layout: sidebar nav by role, topbar with tenant/branch switcher (cross-branch roles only).
- Audit log viewer (read-only, tenant-scoped).
- Mobile app shell (Expo): auth stack + bottom tabs scaffold.

### Phase 0 exit
- A new tenant can sign up, create branches, invite users, log in with correct role scope, and see tenant-isolated, branch-scoped data. Audit log records auth/role events. Both client shells boot.

---

## Web Dashboard Track [W]

Web phases are built for HR admin / payroll admin / manager roles (scope `all` or `branch`). Each phase assumes the P0 shell + API exist.

### P-W1 People
- **10 Employee data** — `employees` + related (addresses, emergency contacts, identity, bank, employment, job info, compensation history, custom fields). Employee list, profile view/edit. Search, filter, saved views. Bulk import/export.
- **11 Org structure** — `departments`, `positions`, `cost_centers`, `reporting_lines`. Org chart (interactive). Headcount plan vs actual.
- **12 Documents** — `documents` + object storage broker. Vault per employee, categories, expiry alerts. Templates + generate-from-template. Access audit.

### P-W2 Time & Leave
- **20 Attendance (web admin)** — `attendance` (clock in/out), `timesheets`, `shifts`, `work_schedules`. Web: attendance rules, timesheet correction & approval, shift scheduling + swap.
- **21 Leave (web admin)** — `leave_types`, `leave_policies`, `leave_balances`, `leave_requests`, `holiday_calendars`. Accrual engine. Multi-level approval. Conflict detection.

### P-W3 Compensation
- **30 Benefits** — `benefit_plans`, `benefit_enrollments`, life-event workflow, per-employee summary.
- **31 Payroll** — `payroll_groups`, `payroll_periods`, `payroll_runs`, `payslips`, components, tax engine (country-extensible), reimbursement/loan. Pay run lifecycle draft→review→approve→lock. Payslip PDF. Reconciliation journal out.

### P-W4 Talent
- **40 Recruitment / ATS** — `requisitions`, `job_posts`, `applicants`, `pipeline_stages`, `interviews`, `offers`, career page, candidate portal.
- **41 Onboarding** — `onboarding_templates`, `onboarding_tasks`, probation tracking.
- **42 Offboarding** — Resignation/termination workflow, exit interview, checklist, final settlement hook, rehire flag.

### P-W5 Performance
- **50 Goals & reviews** — `goals`, `review_cycles`, `reviews`, `competencies`, `feedback`, calibration, nine-box, IDP.

### P-W6 Experience (Manager Self-Service)
- **60 Manager Self-Service (web)** — Team directory, approvals, attendance view, reviews, requisitions, team analytics, delegation.

### P-W7 Intelligence
- **70 Project module (web, Jira-like)** — `projects`, `issues`, `sprints`, `issue_comments`, `project_members`, board, backlog, roadmap, reports, notifications.
- **71 Reporting & analytics** — Headcount, turnover, diversity, absence, leave liability, compensation cost, pipeline, performance distribution. Custom report builder. Executive dashboard.
- **72 Notifications & workflow (web admin)** — SMTP + push dispatcher, templates, digest. Rule builder (trigger→condition→action), outbound webhooks.

---

## Mobile ESS Track [M]

Mobile phases are built for the employee (scope `branch`) in Expo. Mobile **mirrors** server-decided permissions; it never performs admin writes. Each phase consumes the same `packages/api` as web.

### P-M1 People
- View/edit own profile (partial fields only). My documents (view/download, upload requested docs).

### P-M2 Time & Leave
- Clock in/out (GPS/photo capture). My timesheet view + submit corrections.
- Leave: request leave, view balances, history. (Approval happens on web.)

### P-M3 Compensation
- Payslip view/download (PDF). Benefit summary (enrolled plans, life-event triggered view only).

### P-M4 Talent
- Onboarding task checklist (progress, complete assigned tasks). Offboarding: self-initiate resignation / read-only exit checklist. (Recruitment is web-only; no candidate flow on mobile.)

### P-M5 Performance
- My goals (view/update personal goals). Submit self-review. View feedback/IDP.

### P-M6 Experience
- Team directory + approvals (manager role only). Project board/tasks (consume P-W7 project module). Announcements. Helpdesk hook.

### P-M7 Intelligence
- Notification inbox + push (consume P-W7 dispatcher). Compact analytics cards (my attendance, leave balance, payslip snapshot).

---

## Phase Count

| Track | Phase | Theme | Features |
|---|---|---|---|
| Shared | P0 | Foundation | 6 |
| Web | P-W1 | People | 3 |
| Web | P-W2 | Time & Leave | 2 |
| Web | P-W3 | Compensation | 2 |
| Web | P-W4 | Talent | 3 |
| Web | P-W5 | Performance | 1 |
| Web | P-W6 | Experience (Manager SS) | 1 |
| Web | P-W7 | Intelligence | 3 |
| Mobile | P-M1 | People | 1 |
| Mobile | P-M2 | Time & Leave | 1 |
| Mobile | P-M3 | Compensation | 1 |
| Mobile | P-M4 | Talent | 1 |
| Mobile | P-M5 | Performance | 1 |
| Mobile | P-M6 | Experience | 1 |
| Mobile | P-M7 | Intelligence | 1 |

Full feature coverage = sections A–T in `project-overview.md`. Web and Mobile tracks advance in parallel per domain once P0 is complete; both depend on the shared `packages/db` + `packages/api`.
