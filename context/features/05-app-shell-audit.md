# Feature: 05 App Shell + Audit Log Viewer

## Purpose
Provide the navigable frame for web and a scaffold for mobile, plus a read-only audit viewer.

## Scope (in)
- Web shell: role-based sidebar nav, topbar with tenant name and branch switcher (cross-branch roles only).
- Route groups under `/(tenant)/*`; redirect unauthenticated to login.
- Audit log viewer: filter by action/entity/date, tenant-scoped, read-only.
- Mobile shell (Expo): auth stack + bottom-tab scaffold for later ESS screens.

## Key rules
- Branch switcher only visible to scope='all' roles; branch-scoped users see their fixed branch.
- Audit viewer never exposes secrets; before/after diffs mask PII fields.

## Acceptance
- Logged-in user sees only nav items their role permits.
- Cross-branch user can switch branch and see data update.
- Audit viewer lists auth/role events from P0.
- Mobile scaffold runs in Expo with auth/tab navigation placeholders.
