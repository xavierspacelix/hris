# Feature: Offboarding

## Purpose
Run resignation/termination with exit process and final settlement.

## Scope (in)
Tables: `offboarding_instances` (tenant_id, employee_id, type[resign/terminate], reason, last_day, status), `offboarding_tasks` (instance_id, assignee_role, title, status), `exit_interviews` (instance_id, responses jsonb), `exit_surveys` (instance_id, responses jsonb).

## Key rules
- Triggers checklist for IT (revoke access, return equipment), finance, HR.
- Final settlement computed via payroll (see payroll feature).
- Employee soft-terminated in `people`; rehire flag set; PII optionally anonymized per retention policy.
- All steps audit-logged.

## Acceptance
- Offboarding started; tasks routed to IT/finance/HR.
- Exit interview collected.
- Final settlement generated via payroll; access revoked.
- Employee marked terminated, rehire flag set.
