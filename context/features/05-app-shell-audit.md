# Feature: 05 App Shell + Audit Log Viewer

## Purpose
Provide the navigable frame for the web app (all roles) plus a read-only audit viewer. Employee Self-Service shares this shell under `/(tenant)/me`.

## Scope (in)
- Web shell: role-based sidebar nav, topbar with tenant name and branch switcher (cross-branch roles only).
- Route groups under `/(tenant)/*`; redirect unauthenticated to login.
- Employee Self-Service entry (`/(tenant)/me`) rendered from the same shell, server-scoped to the employee's own record.
- Audit log viewer: filter by action/entity/date, tenant-scoped, read-only.

## Key rules
- Branch switcher only visible to scope='all' roles; branch-scoped users see their fixed branch.
- Audit viewer never exposes secrets; before/after diffs mask PII fields.

## Acceptance
- Logged-in user sees only nav items their role permits.
- Cross-branch user can switch branch and see data update.
- Audit viewer lists auth/role events from P0.
- Employee Self-Service entry renders the same shell with employee-scoped data.
