# Architecture

## Stack

| Layer | Technology | Responsibility |
|---|---|---|
| Web | Next.js 16 (App Router) + TypeScript strict | HR admin / payroll / manager UI, server components, API routes |
| Mobile | Expo React Native + TypeScript | Employee Self-Service |
| API | tRPC (or Next route handlers) + Zod | Shared contract between web, mobile, server |
| DB | PostgreSQL | Single shared database, shared schema, `tenant_id` + `branch_id` |
| ORM | Prisma | Migrations, tenant/branch client extension, RLS context |
| Auth | Better Auth | Email/password, SSO OIDC/SAML, MFA, org/tenant membership |
| UI (web) | Tailwind CSS + shadcn/ui | Web components, CSS-variable tokens |
| UI (mobile) | React Native + Tamagui/NativeBase or custom | Mobile components |
| Jobs | BullMQ + Redis | Async payroll, notifications, imports |
| Realtime | Expo push + web sockets (optional) | Notifications |
| Email | nodemailer (SMTP) | Transactional email only |
| Charts | Recharts (web) | Analytics |
| Storage | S3-compatible object storage | Documents, payslips, attachments |

Exact third-party package versions must be recorded in `library-docs.md` before use.

## Repository Shape

```text
/
├── apps/
│   ├── web/                 → Next.js 16 (App Router)
│   │   ├── app/
│   │   │   ├── (auth)/
│   │   │   ├── (tenant)/
│   │   │   │   ├── dashboard/
│   │   │   │   ├── people/
│   │   │   │   ├── org/
│   │   │   │   ├── time/
│   │   │   │   ├── leave/
│   │   │   │   ├── payroll/
│   │   │   │   ├── benefits/
│   │   │   │   ├── recruitment/
│   │   │   │   ├── onboarding/
│   │   │   │   ├── performance/
│   │   │   │   ├── projects/
│   │   │   │   ├── reports/
│   │   │   │   └── settings/
│   │   │   └── api/
│   │   ├── components/
│   │   └── lib/
│   └── mobile/              → Expo app (Employee Self-Service)
│       ├── app/             → screens (file-based or stack)
│       ├── components/
│       └── lib/
├── packages/
│   ├── db/                  → Prisma schema, migrations, RLS, client extension
│   ├── api/                 → tRPC routers, Zod schemas, shared types
│   └── ui-web/              → shared shadcn primitives + tokens
├── context/                 → planning docs
└── AGENTS.md
```

## Multi-Tenant Data Isolation

Model: **pool** — one PostgreSQL database, one schema, every business row carries `tenant_id`. Branch is a second dimension via `branch_id`.

### PostgreSQL RLS (last line of defense)

Enable RLS on every tenant-scoped table. Policy:

```sql
ALTER TABLE employees ENABLE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON employees
  USING (tenant_id = current_setting('app.current_tenant')::uuid);
```

- Context is set per transaction with `SET LOCAL app.current_tenant = :tenantId` so pooled connections cannot leak one tenant into another request.
- For branch-scoped roles, a second policy restricts `branch_id` unless the role scope is `all`.
- RLS `FORCE` is enabled so table owners cannot bypass it. The migration role keeps `BYPASSRLS`; request-serving roles do not.
- If `app.current_tenant` is unset, policies fail closed (no rows).

### Application-layer scoping (defense in depth)

The Prisma client extension injects `tenant_id` (and, when applicable, `branch_id`) into every query automatically based on the resolved session. Repositories never build unscoped queries; an unscoped read requires an explicit admin role.

```typescript
// packages/db — scoped client
const scoped = prisma.$extends(withTenantScope(session.tenantId, session.branchId, session.scope));
```

Every hot query leads its index with `tenant_id` (and `branch_id` where relevant).

## Branch Scoping

- `branches` table belongs to a tenant.
- Every scoping-relevant record (employees, attendance, leave, payroll, projects, etc.) has `branch_id`.
- Session carries `scope`: `'all'` or `'branch'` and the user's `branch_id`.
- The client extension appends `branch_id = session.branchId` only when `scope === 'branch'`. Cross-branch roles get no branch predicate.
- UI hides branch switchers for branch-scoped users; cross-branch users get a branch filter control defaulting to "All branches".

## RBAC

- Roles are tenant-scoped records: `owner`, `bod`, `hr_admin`, `payroll_admin`, `manager`, `employee` (template roles) plus custom roles cloned from templates.
- Each role maps to a permission set (resource → action). Resolution: `user_role → role_permissions → permission`.
- Authorization is enforced in the API/service layer (`packages/api`), never in the client. Clients receive a permission bitmap to mirror UI gating only.
- Permission cache key includes `(tenantId, userId)`; revocations are picked up on next session refresh.
- Audit log records every role/permission mutation.

## Auth Flow (Better Auth)

- Login returns a session. A middleware resolves `(tenantId, userId, role, scope, branchId)` from the session and the `Host` subdomain.
- SSO (OIDC/SAML) maps IdP groups to tenant roles per tenant (just-in-time at login, continuously via SCIM).
- MFA enforced per tenant policy.
- Protected web routes under `/(tenant)/*`; mobile uses a bearer token from the same auth.

## Project Module (Jira-like, web)

- `projects`, `issues`, `sprints`, `issue_comments`, `issue_watchers`, `project_members` tables, all tenant-scoped (and branch-scoped where the project belongs to a branch).
- Issues reference `employees` as assignee/reporter (FK within tenant).
- Board state is derived from `issues.status`; drag-and-drop updates status via API.
- Time tracking on issues logs to `timesheet_entries` so it rolls into attendance/payroll.
- Notifications fire on assign/comment via the shared notification service.

## Data Flow

### UI mutation (web)
```
User action → tRPC mutation → service layer (RBAC check) → Prisma scoped client → DB
```

### Mobile mutation
```
Expo screen → tRPC client (bearer) → same service layer → scoped client → DB
```

### Async job
```
Trigger (e.g. payroll run) → enqueue BullMQ → worker sets tenant/branch context → job runs → audit log
```
Jobs carry `tenantId`/`branchId` in their payload; the worker re-establishes DB context before any query.

## Email (SMTP)

`nodemailer` with SMTP transport from env (`SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`). No external email SaaS. Templates rendered server-side; never include secrets.

## Notifications

- `notifications` table (in-app, tenant-scoped).
- Dispatcher service sends email (SMTP) and, for mobile, Expo push tokens stored per employee.
- Event emitters call the dispatcher; templates are tenant-configurable.

## Object Storage

- Documents, payslips, attachments stored in S3-compatible bucket, path-prefixed by `tenantId/`.
- Access is brokered through the API; never expose direct public URLs for PII.

## Invariants

- Every business table has `tenant_id`. Every scoping-relevant table also has `branch_id`.
- RLS is enabled and fails closed. Application scoping is automatic via the client extension.
- Authorization is server-side. Clients mirror, never decide.
- Audit log is mandatory for PII, compensation, payroll, role/permission, and document access writes.
- Secrets stay in env/secret storage; never in logs, bundles, or commits.
- No hardcoded colors or raw Tailwind palette classes.
- All migrations and the Prisma schema are versioned together.

## Failure & Recovery

- Prisma migrations run transactionally; never hand-edit migration SQL without an ADR.
- Background jobs are idempotent and carry tenant context.
- Repairs probe first, mutate second, verify.
- Cross-tenant or cross-branch leakage is a severity-1 incident; stop and load `/recover`.
