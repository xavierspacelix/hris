# Feature: Benefits

## Purpose
Administer benefit plans and employee enrollments with life-event changes.

## Scope (in)
Tables: `benefit_plans` (tenant_id, name, type[health/pension/insurance/transport/meal], cost_company, cost_employee, currency), `benefit_enrollments` (tenant_id, employee_id, plan_id, dependents jsonb, effective_from, effective_to|null, status), `life_events` (tenant_id, employee_id, type, occurred_at, processed_at|null).

## Key rules
- Enrollment period + life events (marriage, birth) trigger reassignment window.
- Cost split tracked company vs employee; rolls into payroll deduction.
- Per-employee benefit summary aggregated from enrollments.

## Acceptance
- Admin creates plans and opens enrollment.
- Employee enrolls with dependents (mobile/web).
- Life event lets employee change election mid-year.
- Summary visible to employee and payroll.
