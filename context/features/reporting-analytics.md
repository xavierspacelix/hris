# Feature: Reporting & Analytics

## Purpose
Give HR, executives, and managers data-driven workforce insight.

## Scope (in)
Report domains: headcount & movement, turnover/attrition, diversity & inclusion, absence & attendance rate, leave liability (accrual), compensation & cost, headcount plan vs actual, recruitment pipeline & time-to-hire, performance distribution.
- Custom report builder (pick domain, dimensions, filters) + saved reports.
- Scheduled report export (CSV/PDF) via notification service.
- Executive dashboard (cross-branch for scope='all' roles).

## Key rules
- All metrics computed from tenant-scoped (and branch-scoped) data only.
- Executive dashboard respects role scope (cross-branch vs single branch).
- No raw PII in aggregate exports unless permitted by role.

## Acceptance
- HR views headcount and turnover dashboards.
- BOD sees consolidated cross-branch executive dashboard.
- Manager sees team-only metrics.
- Custom report saves and exports.
