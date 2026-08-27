# Feature: People / Employee Management

## Purpose
Single source of truth for every employee's personal, employment, and compensation data.

## Scope (in)
Tables: `employees` (tenant_id, branch_id, user_id|null, personal, contact, emergency, identity numbers, tax, bank, employment status/type/join date/probation/contract end/grade/level, job info, created_at) plus related: `employee_addresses`, `employee_emergency`, `employee_identities`, `employee_bank`, `employee_compensation_history`, `employee_job_history`, `employee_custom_fields`.

## Scope (out)
- Payroll computation (see payroll feature).
- Time/attendance (see time-attendance feature).

## Key rules
- Every employee row carries `tenant_id` + `branch_id`; auto-scoped via extension.
- PII writes are audit-logged.
- Soft deactivate/terminate only; never hard-delete employee rows (anonymize on offboarding if required by law).
- Custom fields defined per tenant; stored as jsonb or EAV.

## Acceptance
- HR admin lists, searches, filters, and edits employees.
- Bulk CSV/Excel import creates tenant-scoped employees.
- Employee (mobile) views own profile and edits permitted partial fields.
- Cross-branch role sees all branches; branch-scoped sees only own.
