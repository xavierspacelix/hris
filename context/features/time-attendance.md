# Feature: Time & Attendance

## Purpose
Capture work time via clock in/out, timesheets, shifts, and overtime with approvals.

## Scope (in)
Tables: `attendance` (tenant_id, branch_id, employee_id, clock_in, clock_out, lat, lng, photo_url|null, method), `timesheets` (tenant_id, branch_id, employee_id, period, total_hours, status), `timesheet_entries` (tenant_id, employee_id, date, hours, project_id|null, issue_id|null, note), `shifts` (tenant_id, branch_id, name, start, end, pattern), `shift_assignments` (tenant_id, employee_id, shift_id, date), `work_schedules` (tenant_id, branch_id, pattern), `overtime_requests` (tenant_id, employee_id, date, hours, reason, status).

## Scope (out)
- Leave balances (see leave feature); payroll computation (see payroll feature).

## Key rules
- Mobile clock in/out records GPS/photo when tenant policy requires.
- Timesheets auto-aggregate from attendance + entries; corrections need approval.
- Overtime request → approval → timesheet.
- Shift swap respects branch scope.

## Acceptance
- Employee clocks in/out from mobile; entry scoped to branch.
- Manager approves timesheet correction and overtime.
- Timesheet total feeds payroll.
