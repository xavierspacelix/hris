# PRD — HRIS (Multi-Tenant Human Resource Information System)

| Field | Value |
|---|---|
| Product | HRIS |
| Status | Draft (context phase) |
| Last updated | 2026-08-28 |
| Owner | Product / Engineering |
| Source docs | `project-overview.md`, `architecture.md`, `build-plan.md`, `design-system.md`, `web-screens.md`, `features/*` |

---

## 1. Overview

HRIS is a multi-tenant, web-based Human Resource Information System delivered as a single Next.js 16 application. One deployed instance serves many organizations (tenants); inside each tenant an organization can operate multiple branches (cabang) with role-based branch scoping. The product covers the full employee lifecycle — people, org structure, time & attendance, leave, payroll, benefits, recruitment, onboarding, performance, offboarding — plus a Jira-like project module and a full Employee Self-Service (ESS) surface, all within the same responsive web app.

Employee Self-Service is **not a separate app or client**. It is a role-scoped surface (`/(tenant)/me`) inside the web app, server-enforced to show only the employee's own, branch-scoped data.

## 2. Goals

1. Give HR/payroll/manager/BOD users one operational console for the full employee lifecycle with hard tenant isolation.
2. Give employees a self-service surface for personal HR tasks (profile, attendance, leave, payslips, goals) without exposing admin controls.
3. Guarantee tenant and branch data isolation by design (RLS fails closed; branch filter automatic).
4. Keep all sensitive writes auditable and authorization server-decided.
5. Ship a clean, dense, enterprise SaaS dashboard UI consistent across every module.

## 3. Non-Goals (Out of Scope)

- Billing, plan tiers, or subscription management. Every tenant gets the full feature set.
- External email SaaS — SMTP only.
- Native desktop or mobile apps — web only, responsive for tablet/phone browsers.
- Third-party payroll provider auto-submission (journal out, not submission).
- Arbitrary per-tenant UI theming beyond tenant name/logo/locale.

## 4. Target Users & Roles

| Role | Scope | Primary duties |
|---|---|---|
| owner | all branches | full control, settings |
| bod | all branches | executive cross-branch visibility, analytics |
| hr_admin | all branches | people, org, leave, recruitment, performance |
| payroll_admin | all branches | payroll runs, compensation, benefits |
| manager | own branch | team approvals, reviews, requisitions |
| employee | own branch | self-service only (ESS) |

Personas: HR Administrator, Payroll Administrator, Manager, Employee, Owner/BOD.

## 5. Scope (Functional)

Full feature set, no MVP cut (sections A–T in `project-overview.md`):

- **Platform & Tenant**: onboarding, settings, subdomain routing, branch management, system super-admin.
- **Auth & RBAC**: email/password + MFA + SSO (OIDC/SAML), invitations, role templates + custom roles, permission matrix, SCIM, session/device management, audit.
- **People**: employee profiles, employment/job/compensation history, custom fields, bulk import/export, search/saved views, soft deactivate.
- **Org Structure**: departments, positions, cost centers, reporting lines, interactive org chart, headcount plan vs actual.
- **Documents**: employee vault, categories/expiry alerts, templates, generate-from-template, e-sign, access audit.
- **Time & Attendance**: clock in/out (GPS/photo), timesheets, shift scheduling/swap, overtime, geofencing, corrections/approval.
- **Leave**: types/policies, accrual engine, balances, multi-level approval, conflict detection, holiday calendars.
- **Payroll**: groups/periods, components, tax engine (country-extensible, e.g. PPh21+BPJS), pay-run lifecycle, payslip PDF, reimbursement/loan, reconciliation journal.
- **Benefits**: plans, enrollment, life events, cost split, per-employee summary.
- **Recruitment (ATS)**: requisitions, postings, career page, pipeline, interviews, offers, candidate portal, hire→onboarding handoff.
- **Onboarding / Offboarding**: checklists, probation, exit interview, access revocation, final settlement hook, rehire flag.
- **Performance**: goals, review cycles (360), competencies, feedback, calibration, nine-box, IDP.
- **Employee Self-Service (web)**: profile, org/colleagues, attendance, leave, overtime, payslips, benefits, goals/reviews, documents, reimbursements, directory, announcements, helpdesk.
- **Manager Self-Service**: team directory, approvals, attendance view, reviews, requisitions, team analytics, delegation.
- **Project Module (Jira-like)**: projects, issues (Epic/Story/Task/Bug), board/backlog/roadmap, sprints, comments/@mention, time tracking, reports, notifications.
- **Reporting & Analytics**: headcount, turnover, diversity, absence, leave liability, compensation cost, pipeline, performance distribution, custom report builder, executive dashboard.
- **Audit & Compliance**: immutable audit log, retention, consent/privacy tools, compliance reports, access log.
- **Notifications**: in-app + email (SMTP), templates, digests.
- **Workflow Automation**: rule builder (trigger→condition→action), webhooks, dynamic approval routing.

## 6. Employee Self-Service (web)

ESS is delivered inside the same web app, reused components, server-scoped:

- Routes under `/(tenant)/me`; data auto-scoped to employee's tenant + branch + own record.
- No admin writes; request submissions flow through the same API routers with employee scope.
- Notifications in-app + email (no mobile push).
- Reuses `PageHeader`, `Card`, `DataTable`, `Modal`, `StatusChip`, `Avatar` from the shared UI registry.

## 7. Non-Functional Requirements

- **Tenant isolation**: `tenant_id` on every business row; PostgreSQL RLS enabled and `FORCE`d; fails closed when `app.current_tenant` unset. Severity-1 if violated.
- **Branch scoping**: automatic via client extension; never hand-written per query.
- **Authorization**: server-side only; clients receive a permission bitmap for UI gating (not trusted).
- **Audit**: mandatory for PII, compensation, payroll runs, role/permission changes, document access.
- **Security**: secrets in env/secret storage only; never in logs, bundles, commits.
- **Performance**: dense operational dashboard; tables support sorting/filter/pagination; CI runs typecheck + lint.
- **Accessibility**: state via color + label/icon/position; focus visible; form errors descriptive.
- **Responsive**: desktop-first operational density; adapts to tablet/phone browsers; touch targets ~40–44px.
- **Styling**: CSS-variable tokens only (`ui-tokens.md`); no hardcoded hex or raw Tailwind palette classes.

## 8. Architecture & Tech Stack

- **Web**: Next.js 16 (App Router) + TypeScript strict — all roles incl. ESS.
- **API**: tRPC + Zod (shared contract in `packages/api`).
- **DB**: PostgreSQL + Prisma; tenant/branch RLS; scoped client extension.
- **Auth**: Better Auth (email/password, MFA/TOTP/WebAuthn, SSO OIDC/SAML).
- **UI**: Tailwind + shadcn/ui (tokens via CSS variables), Recharts, Lucide icons.
- **Jobs**: BullMQ + Redis (payroll, notifications, imports).
- **Email**: nodemailer (SMTP).
- **Storage**: S3-compatible, path-prefixed by `tenant_id`.
- **Tooling**: Bun + Turborepo. CLI-only scaffolding (`create-turbo`, `create-next-app`). No pnpm.
- **Repo**: `apps/web`, `packages/db`, `packages/api`, `packages/ui-web`, `context/`.

## 9. Key User Flows

1. **Tenant onboarding**: signup → create org → add branch → invite first HR admin → log in with correct scope.
2. **Payroll run**: build period → draft → review → approve → lock → distribute payslips (PDF) → reconciliation journal out.
3. **Leave**: employee requests → multi-level approval (manager/HR) → balance updates → conflict detection → notification.
4. **Clock-in**: employee clock in/out (GPS/photo) → timesheet auto → correction/approval → rolls into payroll.
5. **Review cycle**: HR initiates → manager/peer/self reviews → calibration → nine-box → IDP.

## 10. Success Metrics

- New tenant onboarded and managing employees within minutes.
- Zero cross-tenant or cross-branch reads via UI/API/raw SQL.
- Full payroll run completed and locked payslips distributed.
- Employee completes clock-in, leave request, payslip view from web.
- Manager runs review cycle and approves team leave from web.
- All sensitive writes present in immutable audit log.

## 11. Delivery Milestones

Single web client; sequential phases (see `build-plan.md`):

- **P0 Foundation** [C]: monorepo, schema+RLS, auth, RBAC, tenant/branch, app shell (incl. ESS entry), audit.
- **P1 People** [W]: employees, org, documents (+ ESS profile/docs).
- **P2 Time & Leave** [W]: attendance, leave (+ ESS clock/leave).
- **P3 Compensation** [W]: benefits, payroll (+ ESS payslip/benefits).
- **P4 Talent** [W]: recruitment, onboarding, offboarding (+ ESS onboarding/offboarding).
- **P5 Performance** [W]: goals/reviews (+ ESS goals/review).
- **P6 Experience** [W]: Manager SS + Employee SS.
- **P7 Intelligence** [W]: project module, reporting/analytics, notifications/workflow.

Each phase: visible, testable UI on mock data first (prototype), then real API/DB wiring.

## 12. Assumptions & Open Questions

- No plan tiers; every tenant gets full features.
- Country-specific tax logic starts with Indonesia (PPh21 + BPJS), extensible.
- Design system finalized from Figma HRDashboard kit; UI context regenerated from approved prototype.
- Build order confirmed: P0 → Web P1…P7 (no mobile client).

## 13. References

- `project-overview.md` — product, roles, full feature list.
- `architecture.md` — stack, tenancy, RLS, RBAC, data flow.
- `build-plan.md` — phases and per-phase scope.
- `design-system.md` + `ui-*` — visual language and tokens.
- `web-screens.md` — screen inventory (admin + ESS).
- `features/*` — per-feature specifications.
- `versioning.md` — SemVer and release.
