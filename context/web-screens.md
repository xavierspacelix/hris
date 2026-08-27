# Web Screens — Full List (Prototype Instruction)

All HR/admin/payroll/manager/BOD screens for the HRIS web app. Use this as the authoritative screen inventory when building the prototype. Build with mock data first (no backend), following `design-system.md` principles. The visual result from the user's design tool is the source of truth; `ui-tokens/rules/registry` will be regenerated from it afterward.

Conventions:
- Routes are under the tenant subdomain (`acme.hris.app/(tenant)/...`).
- Cross-branch roles (owner/bod/hr_admin/payroll_admin) see a branch filter and consolidated data; branch-scoped roles (manager/employee) are locked to their branch.
- Every list screen has loading, empty, error, and filtered states.

## Auth & Onboarding
- `/(auth)/login` — email + password, SSO buttons (Google/Microsoft), forgot password.
- `/(auth)/reset-password` — request + set new password.
- `/(auth)/accept-invite` — set password + role claim after email invite.
- `/(tenant)/onboarding` — tenant setup wizard: create org → add first branch → invite first HR admin (owner).

## Dashboard
- `/(tenant)/dashboard` — role-based home: stat cards (headcount, turnover, attendance, pending approvals), quick actions, announcements, cross-branch consolidated for scope=`all`.

## People
- `/(tenant)/people` — employee list (search, filter, saved views, bulk import, branch filter for scope=`all`).
- `/(tenant)/people/[id]` — employee profile with tabs: Personal, Contact & Emergency, Identity & Bank, Employment, Job Info, Compensation History, Documents, Custom Fields. Edit mode.
- `/(tenant)/people/import` — CSV/Excel bulk import wizard.

## Org Structure
- `/(tenant)/org/departments` — department tree, edit, head assignment.
- `/(tenant)/org/positions` — position/job-title catalog, grade ladder.
- `/(tenant)/org/cost-centers` — cost/profit centers.
- `/(tenant)/org/chart` — interactive org chart.
- `/(tenant)/org/headcount` — plan vs actual per department/branch.

## Time & Attendance
- `/(tenant)/time/attendance` — clock-in/out log, GPS/photo indicators, filters.
- `/(tenant)/time/timesheets` — timesheet list + detail, correction & approval.
- `/(tenant)/time/shifts` — shift definitions, scheduling, swap.
- `/(tenant)/time/overtime` — overtime requests + approval.

## Leave
- `/(tenant)/leave/admin` — leave types, policies (accrual), balances overview.
- `/(tenant)/leave/requests` — request list + approval (multi-level), conflict warnings.
- `/(tenant)/leave/calendars` — holiday calendars per location.

## Payroll
- `/(tenant)/payroll/groups` — payroll groups & periods.
- `/(tenant)/payroll/run` — pay run lifecycle: draft → review → approve → lock; component breakdown.
- `/(tenant)/payroll/payslips` — payslip list + detail + PDF.
- `/(tenant)/payroll/reimbursements` — reimbursement & loan list + status.
- `/(tenant)/payroll/tax` — tax engine settings (country/regional).

## Benefits
- `/(tenant)/benefits/plans` — benefit plans.
- `/(tenant)/benefits/enrollments` — enrollments, life events, per-employee summary.

## Recruitment (ATS)
- `/(tenant)/recruitment/requisitions` — requisitions + approval.
- `/(tenant)/recruitment/posts` — job posts (internal/external), career page link.
- `/(tenant)/recruitment/applicants` — pipeline board by stage, applicant detail.
- `/(tenant)/recruitment/interviews` — schedule + panel + scorecards.
- `/(tenant)/recruitment/offers` — offer generate/approve/sign.

## Onboarding
- `/(tenant)/onboarding/templates` — checklist templates by dept/position.
- `/(tenant)/onboarding/instances` — per-hire task tracking, probation reminder.

## Offboarding
- `/(tenant)/offboarding/instances` — resignation/termination workflow, checklist (IT/finance/HR), exit interview.

## Performance
- `/(tenant)/performance/goals` — goals cascade (org→team→individual).
- `/(tenant)/performance/cycles` — review cycles (annual/quarter/360).
- `/(tenant)/performance/reviews` — submit/approve reviews, calibration.
- `/(tenant)/performance/feedback` — kudos/1:1 notes.
- `/(tenant)/performance/talent` — nine-box / talent review.
- `/(tenant)/performance/development` — IDP.

## Project Module (Jira-like)
- `/(tenant)/projects` — project list.
- `/(tenant)/projects/[id]/board` — kanban board (drag status).
- `/(tenant)/projects/[id]/backlog` — backlog + sprint planning.
- `/(tenant)/projects/[id]/issues/[issueId]` — issue detail (comments, watchers, time log).
- `/(tenant)/projects/[id]/roadmap` — epic timeline.
- `/(tenant)/projects/[id]/reports` — burndown, velocity.

## Reporting & Analytics
- `/(tenant)/reports` — executive dashboard (cross-branch for scope=`all`), metric tiles (headcount, turnover, diversity, absence, leave liability, comp cost, pipeline, performance).
- `/(tenant)/reports/builder` — custom report builder + saved reports + export.

## Settings
- `/(tenant)/settings/tenant` — name, logo, timezone, locale, currency, regional.
- `/(tenant)/settings/branches` — branch CRUD, assign employees, per-branch settings.
- `/(tenant)/settings/members` — invite user, assign role (+branch), member list.
- `/(tenant)/settings/audit` — audit log viewer (read-only).
- `/(tenant)/settings/notifications` — notification templates.
- `/(tenant)/settings/workflows` — rule builder (trigger→condition→action).

## Screen states (every screen)
Loading · Empty (with action) · Error (friendly ID) · Filtered/Search · Permission-denied (role gate) · Cross-branch branch picker (scope=`all` only).
