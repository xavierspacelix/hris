# Feature: Payroll

## Purpose
Run accurate, audited payroll with country-extensible tax and locked payslips.

## Scope (in)
Tables: `payroll_groups` (tenant_id, name, currency, period_type), `payroll_periods` (tenant_id, group_id, start, end, status), `payroll_runs` (tenant_id, period_id, status[draft/review/approved/locked], created_by, approved_by|null, run_at), `payslips` (tenant_id, run_id, employee_id, gross, deductions jsonb, net, tax_jsonb, currency, pdf_key|null, status), `payroll_components` (catalog of earnings/deductions), `reimbursements` (tenant_id, employee_id, amount, status, salary_deduction), `loans` (tenant_id, employee_id, principal, paid, schedule jsonb).

## Tax engine
- Country-specific adapter (Indonesia: PPh21 + BPJS). Pluggable per tenant regional.
- Computes earnings + deductions + tax → net. Stores full breakdown in `tax_jsonb`.

## Key rules
- Pay run lifecycle: draft → review → approve → lock. Unlock only by authorized role with audit.
- Payslip PDF generated and stored (S3), viewable web + mobile.
- Reimbursements/loans apply as deductions per schedule.
- Reconciliation journal exported (CSV/JSON) out to accounting; no auto-submission.
- All payroll writes audit-logged at severity high.

## Acceptance
- Admin creates group/period, runs payroll, reviews, approves, locks.
- Payslips generated per employee; locked run cannot be edited.
- Employee views/downloads payslip on mobile.
- Cross-tenant/cross-branch leakage impossible (scoped client).
