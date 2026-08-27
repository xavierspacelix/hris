# Feature: 04 Tenant & Branch Setup + Onboarding

## Purpose
Let a tenant configure itself and its branches, and onboard the first admin.

## Scope (in)
- Tenant settings page: name, logo, timezone, locale, currency, regional rules.
- Branch CRUD: name, code, timezone, currency, holiday calendar, assigned employees.
- Onboarding wizard: create org → add first branch → invite first HR admin (sets owner role).
- Subdomain claim on tenant creation (slug uniqueness).

## Key rules
- Tenant settings editable by owner/bod/hr_admin.
- Branch assignment is the source of `user.branch_id` for branch-scoped roles.
- No plan/tier logic.

## Acceptance
- New tenant completes wizard, has ≥1 branch, first admin can log in.
- Branch list shows assigned employee counts.
- Editing tenant settings persists and affects date/currency formatting.
