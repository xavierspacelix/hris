# Feature: Employee Self-Service (Mobile, Expo)

## Purpose
Full-featured mobile experience for employees (not a trimmed MVP).

## Scope (in)
Screens:
- Auth + MFA + push token registration.
- Profile: view + edit permitted partial fields; photo.
- Org chart & colleagues (read-only view of team/peers).
- Clock in/out + timesheet (GPS/photo per policy).
- Leave: request, view balance, history, cancel.
- Overtime: request + approval status.
- Payslip: view + download PDF.
- Benefits: view + enroll + life events.
- Performance: view goals, submit feedback, self-review.
- Documents: personal vault view/download.
- Reimbursement / loan: request + status.
- Directory: search colleagues.
- Announcements & newsfeed (tenant-scoped).
- Helpdesk / chat hook (optional).

## Key rules
- Mobile uses the same `packages/api` tRPC surface with a bearer token.
- All reads auto-scoped to the employee's tenant + branch + own record.
- Push notifications via Expo push using stored token.

## Acceptance
- Employee completes clock-in, leave request, and payslip view fully on mobile.
- Data shown is strictly the employee's own, branch-scoped.
- Push arrives on relevant events.
