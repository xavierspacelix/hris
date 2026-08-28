# Feature: Employee Self-Service (Web)

## Purpose
Full-featured Employee Self-Service surface, delivered inside the same Next.js web app (route group `/(tenant)/me`). Employees see only their own, branch-scoped data.

## Scope (in)
Screens (reuse shared web components):
- Login + MFA (same auth as admin; role = employee).
- My Profile: view + edit permitted partial fields; photo.
- My Org & Colleagues: read-only org chart slice + colleague search.
- My Attendance: clock in/out (GPS/photo per policy), my timesheet, corrections.
- My Leave: request, view balance, history, cancel.
- My Overtime: request + approval status.
- My Payslips: view + download PDF.
- My Benefits: view + enroll + life events.
- My Goals & Reviews: view goals, submit feedback, self-review.
- My Documents: personal vault view/download.
- My Reimbursements / Loans: request + status.
- Announcements & Newsfeed (tenant-scoped).
- Helpdesk / chat hook (optional).

## Key rules
- Uses the same `packages/api` tRPC surface as admin; requests carry the employee session.
- All reads auto-scoped to the employee's tenant + branch + own record (server-enforced).
- No admin writes; request submissions flow through the same routers with employee scope.
- Notifications delivered in-app + email (no mobile push).

## Acceptance
- Employee completes clock-in, leave request, and payslip view entirely from the web app.
- Data shown is strictly the employee's own, branch-scoped.
- In-app + email notifications arrive on relevant events.
