# Feature: 03 RBAC + Member Management

## Purpose
Tenant-scoped roles and permissions, with invitation and audit.

## Scope (in)
- Six template roles seeded: owner, bod, hr_admin, payroll_admin (scope='all'); manager, employee (scope='branch').
- Permission catalog (`permissions`): resources × actions (people.read, payroll.run, leave.approve, ...).
- `roles.permissions` jsonb default set per template; custom roles clone a template then edit.
- Invite user by email → assign role (+ optional branch for branch-scoped).
- Member list + role edit (web settings).
- Permission bitmap returned to client for UI gating (mirror only).
- Audit log on every role/permission change.

## Key rules
- Server enforces via `requirePermission(ctx, resource, action)` in API layer.
- Cache key includes `(tenantId, userId)`; revocation picked up on session refresh.
- Never trust client-sent permissions.

## Acceptance
- HR admin can invite and assign roles.
- A manager cannot perform payroll.run (server rejects).
- Role change appears in audit log.
- UI hides actions the bitmap disallows.
