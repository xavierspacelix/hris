# Feature: Manager Self-Service (Web)

## Purpose
Give managers the tools to run their team without full HR admin access.

## Scope (in)
- Team directory & org chart (team = employees reporting to manager, branch-scoped).
- Approve leave / overtime / timesheet for team.
- Team attendance view.
- Initiate and submit performance reviews for direct reports.
- Raise requisition / hire (see recruitment feature).
- Team analytics: turnover, attrition risk, headcount.
- 1:1 notes & feedback to reports.
- Delegation: assign a substitute approver during own absence.

## Key rules
- Manager sees only their branch (scope='branch'); team = descendant reporting lines.
- Approval actions enforce permission + branch scope server-side.
- Delegation temporarily grants approval to a designated user with audit.

## Acceptance
- Manager views team, approves a leave request, sees updated balance.
- Manager submits review for a report.
- Delegation allows substitute to approve during absence.
