# HRIS — Multi-Tenant Human Resource Information System

A full-stack, multi-tenant HRIS delivered as a single Next.js web app for HR admins, payroll admins, managers, BOD/owners, and employees (Employee Self-Service). One PostgreSQL database with hard tenant isolation (RLS) and branch-level scoping inside each tenant. Responsive for tablet/phone browsers; no native mobile app.

## Status

Planning & context authoring. No application code yet. The UI prototype (mock data) is built next, and the `ui-*` context files are regenerated from the approved prototype.

## Stack (target)

- Web: Next.js 16 (App Router) + TypeScript strict (all roles, including Employee Self-Service)
- API: tRPC + Zod (shared contract)
- DB: PostgreSQL + Prisma, tenant/branch RLS
- Auth: Better Auth (email/password, SSO OIDC/SAML, MFA)
- Tooling: Bun + Turborepo
- Email: SMTP (nodemailer)

## Repository layout (planned)

```
apps/web        Next.js (all roles: admin / payroll / manager / BOD / employee ESS)
packages/db     Prisma schema, migrations, RLS, scoped client
packages/api    tRPC routers, Zod schemas, RBAC
packages/ui-web Shared web UI primitives
```

## Key model

- **Tenant** = hard isolation boundary (`tenant_id` on every row; PostgreSQL RLS fails closed).
- **Branch** = soft scope inside a tenant. Roles `owner`/`bod`/`hr_admin`/`payroll_admin` see all branches; `manager`/`employee` see only their branch.
- All users — including employees — use the same web app. Employees get the Employee Self-Service surface, scoped to their own, branch-scoped data.

## Context docs

- `AGENTS.md` — agent guide (read before any work)
- `context/project-overview.md` — product, full feature list
- `context/architecture.md` — stack, multi-tenancy, RLS, RBAC, project module
- `context/build-plan.md` — phases P0–P7
- `context/design-system.md` + `context/prototype-instructions.md` — design & prototype workflow
- `context/web-screens.md` — full screen inventory (admin + manager + Employee Self-Service)
- `context/versioning.md` — versioning
- `context/features/` — per-feature specifications

## Development

Scaffolding is CLI-driven (never hand-written config): `bunx create-turbo`, `bunx create-next-app apps/web`.

## License

Proprietary. All rights reserved.
