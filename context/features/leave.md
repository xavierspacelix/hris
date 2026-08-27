# Feature: Leave / Time-off

## Purpose
Configure leave policies, track balances, and run request/approval workflows.

## Scope (in)
Tables: `leave_types` (tenant_id, name, paid, code), `leave_policies` (tenant_id, branch_id|null, leave_type_id, accrual_rate, cap, carry_over, prorata, probation_gates), `leave_balances` (tenant_id, employee_id, leave_type_id, balance, accrued, used, as_of), `leave_requests` (tenant_id, employee_id, leave_type_id, start, end, half_day, attachment, reason, status, approver_id|null), `holiday_calendars` (tenant_id, branch_id|null, name), `holiday_calendar_days` (calendar_id, date, name).

## Scope (out)
- Attendance (see time-attendance); payroll (see payroll feature).

## Key rules
- Balance is real-time, recomputed from policy + accruals.
- Multi-level approval when policy defines it; manager (branch-scoped) approves team only.
- Conflict detection warns on overlapping team leave.
- Approved leave decrements balance and can feed timesheet/calendar.

## Acceptance
- Employee requests leave; balance shows correctly.
- Manager approves; balance updates; audit logged.
- Holiday calendar per branch respected in accruals.
- Cross-branch admin sees all branches' requests.
