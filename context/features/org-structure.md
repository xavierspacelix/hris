# Feature: Org Structure

## Purpose
Model the organization as departments, positions, cost centers, and reporting lines, and visualize it.

## Scope (in)
Tables: `departments` (tenant_id, parent_id|null, name, code, cost_center_id, head_id), `positions` (tenant_id, title, grade, level, department_id), `cost_centers` (tenant_id, code, name), `reporting_lines` (tenant_id, employee_id, manager_id, matrix_manager_id|null), `headcount_plans` (tenant_id, branch_id, department_id, planned, period).

## Scope (out)
- Employee PII (see people feature).

## Key rules
- Department tree is recursive via `parent_id`; cycles rejected.
- Org chart renders from `reporting_lines` + `departments`.
- Headcount plan vs actual computed against `employees`.

## Acceptance
- Admin builds department hierarchy and assigns heads.
- Org chart renders interactive tree.
- Headcount dashboard shows plan vs actual per department/branch.
