# Build Plan

Phased build. Each phase produces visible, testable functionality before the next begins. No invisible backend-only phases.

---

## Phase 0 — Foundation

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

### 02 Authentication (Better Auth)
- Better Auth with email/password, MFA (TOTP), SSO OIDC/SAML hooks.
- Tenant resolution from subdomain/session in middleware.
- Session → `(tenantId, userId, role, scope, branchId)`.
- Login, reset password, invitation accept pages (web).

### 03 RBAC + member management
- Role templates seeded; permission matrix evaluation in `packages/api`.
- Invite user, assign role, member list (web settings).
- Permission bitmap sent to clients for UI gating (mirror only).
- Audit log writes on role/permission changes.

### 04 Tenant & branch setup
- Tenant settings page (name, logo, timezone, locale, currency, regional).
- Branch CRUD + assign employees + per-branch settings.
- Tenant onboarding wizard (create org → add branch → invite first HR admin).

### 05 App shell + audit log
- Web layout: sidebar nav by role, topbar with tenant/branch switcher (cross-branch roles only).
- Audit log viewer (read-only, tenant-scoped).
- Mobile app shell (Expo): auth stack + bottom tabs scaffold.

### Phase 0 exit
- A new tenant can sign up, create branches, invite users, log in with correct role scope, and see tenant-isolated, branch-scoped data. Audit log records auth/role events.

---

## Phase 1 — People

### 10 Employee data
- `employees` table + related (addresses, emergency contacts, identity, bank, employment, job info, compensation history, custom fields).
- Employee list, profile view/edit (web). Search, filter, saved views. Bulk import/export.
- Mobile: view own profile (partial edit).

### 11 Org structure
- `departments`, `positions`, `cost_centers`, `reporting_lines`.
- Org chart (web, interactive). Headcount plan vs actual.

### 12 Documents
- `documents` + object storage broker. Vault per employee, categories, expiry alerts. Templates + generate-from-template. Access audit.

---

## Phase 2 — Time & Leave

### 20 Attendance
- `attendance` (clock in/out), `timesheets`, `shifts`, `work_schedules`.
- Web + mobile clock in/out (mobile GPS/photo). Timesheet correction & approval. Shift scheduling + swap.

### 21 Leave
- `leave_types`, `leave_policies`, `leave_balances`, `leave_requests`, `holiday_calendars`.
- Accrual engine. Request + multi-level approval. Conflict detection. Mobile request + balance + history.

---

## Phase 3 — Compensation

### 30 Benefits
- `benefit_plans`, `benefit_enrollments`, life-event workflow, per-employee summary.

### 31 Payroll
- `payroll_groups`, `payroll_periods`, `payroll_runs`, `payslips`, components, tax engine (country-extensible), reimbursement/loan.
- Pay run lifecycle draft→review→approve→lock. Payslip PDF. Web + mobile view/download. Reconciliation journal out.

---

## Phase 4 — Talent

### 40 Recruitment / ATS
- `requisitions`, `job_posts`, `applicants`, `pipeline_stages`, `interviews`, `offers`, career page, candidate portal.

### 41 Onboarding
- `onboarding_templates`, `onboarding_tasks`, probation tracking.

### 42 Offboarding
- Resignation/termination workflow, exit interview, checklist, final settlement hook, rehire flag.

---

## Phase 5 — Performance

### 50 Goals & reviews
- `goals`, `review_cycles`, `reviews`, `competencies`, `feedback`, calibration, nine-box, IDP.

---

## Phase 6 — Experience

### 60 Manager Self-Service (web)
- Team directory, approvals, attendance view, reviews, requisitions, team analytics, delegation.

### 61 Employee Self-Service (mobile, full)
- All section N features: profile, org chart, clock in/out, leave, overtime, payslip, benefits, goals, documents, reimbursement/loan, directory, announcements, helpdesk hook.

---

## Phase 7 — Intelligence

### 70 Project module (web, Jira-like)
- `projects`, `issues`, `sprints`, `issue_comments`, `project_members`, board, backlog, roadmap, reports, notifications.

### 71 Reporting & analytics
- Headcount, turnover, diversity, absence, leave liability, compensation cost, pipeline, performance distribution. Custom report builder. Executive dashboard.

### 72 Notifications & workflow
- SMTP + push dispatcher, templates, digest. Rule builder (trigger→condition→action), outbound webhooks.

---

## Phase Count

| Phase | Theme | Features |
|---|---|---|
| P0 | Foundation | 6 |
| P1 | People | 3 |
| P2 | Time & Leave | 2 |
| P3 | Compensation | 2 |
| P4 | Talent | 3 |
| P5 | Performance | 1 |
| P6 | Experience | 2 |
| P7 | Intelligence | 3 |

Full feature coverage = sections A–T in `project-overview.md`.
