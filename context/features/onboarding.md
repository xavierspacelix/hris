# Feature: Onboarding

## Purpose
Guide a new hire from acceptance to productive start with tracked tasks.

## Scope (in)
Tables: `onboarding_templates` (tenant_id, department_id|null, position_id|null, name), `onboarding_tasks` (template_id, assignee_role[hr/manager/it/employee], title, description, due_offset_days), `onboarding_instances` (tenant_id, employee_id, template_id, start_date, status), `onboarding_task_status` (instance_id, task_id, assignee_id, status, completed_at|null).

## Key rules
- Template chosen by department/position; tasks assigned to HR, manager, IT, employee.
- Probation end tracked; reminder sent near probation review.
- Welcome documents signed digitally; equipment/access provisioning via hook.

## Acceptance
- New hire gets checklist; each task shows owner and status.
- Manager/HR/IT complete their tasks; employee completes theirs.
- Probation reminder fires before review date.
