# Feature: 01 Database Schema + Tenant/Branch RLS

## Purpose
Create the multi-tenant, multi-branch data foundation with database-level isolation that fails closed.

## Scope (in)
Tables:
- `tenants` (id, name, slug, logo_url, timezone, locale, currency, regional, created_at)
- `branches` (id, tenant_id, name, code, timezone, currency, holiday_calendar_id, created_at)
- `users` (id, tenant_id, email, password_hash, mfa_secret, status, created_at)
- `roles` (id, tenant_id, key, name, scope['all'|'branch'], is_template, permissions jsonb)
- `user_roles` (id, tenant_id, user_id, role_id, branch_id|null, created_at)
- `permissions` (id, resource, action) — global catalog
- `audit_logs` (id, tenant_id, actor_id, action, entity, entity_id, branch_id|null, before jsonb, after jsonb, ip, created_at)

Every business table later adds `tenant_id` (UUID, index first) and scoping-relevant tables add `branch_id`.

## RLS
- Enable RLS (`FORCE ROW LEVEL SECURITY`) on all tenant-scoped tables.
- Policy `tenant_isolation`: `tenant_id = current_setting('app.current_tenant')::uuid`.
- For branch-scoped tables, second predicate: `branch_id = current_setting('app.current_branch')::uuid OR current_setting('app.scope') = 'all'`.
- Migration role keeps `BYPASSRLS`; request-serving role does not.
- If `app.current_tenant` unset → zero rows (fail closed).

## Scoped client extension (`packages/db`)
- `withTenantScope(tenantId, branchId, scope)` injects `SET LOCAL app.current_tenant/branch/scope` per transaction and auto-adds `tenant_id` (and `branch_id` when scope='branch') to queries.
- Unscoped reads require an explicit admin role check.

## Seed
- One demo tenant `acme`, two branches `Jakarta`, `Surabaya`, six template roles with default permission sets.

## Key rules
- Never hand-write `WHERE tenant_id` in feature code; use the extension.
- Lead every hot index with `tenant_id` (then `branch_id`).

## Acceptance
- A query with no `app.current_tenant` returns 0 rows.
- A branch-scoped session cannot read another branch's rows.
- A cross-branch (scope='all') session reads all branches.
- Seed script creates demo tenant + roles successfully.
