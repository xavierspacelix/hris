# Mobile Screens — Full List (Prototype Instruction)

All Employee Self-Service screens for the Expo mobile app. This is the authoritative screen inventory when building the mobile prototype. Build with mock data first (no backend), following `design-system.md` principles. The visual result from the user's design tool is the source of truth; `ui-tokens/rules/registry` will be regenerated from it afterward.

Conventions:
- Bottom tab bar with the primary destinations; stack navigation for detail screens.
- All data is the employee's own, branch-scoped, auto-scoped by the API.
- Push notifications via Expo; tokens registered on login.

## Auth
- `Splash` — app load + session check.
- `Login` — email + password, SSO (Google/Microsoft), forgot password.
- `Mfa` — TOTP / WebAuthn step.
- `ResetPassword` — request + set.
- `AcceptInvite` — set password after invite.

## Main Tabs
- `Home` — announcements, quick actions (clock in/out, request leave, view payslip), pending items.
- `Profile` — own profile view + edit permitted partial fields; photo; documents shortcut.
- `Time` — clock in/out button (GPS/photo per policy), today's timesheet, overtime request.
- `Leave` — balance summary, request form, history list, detail.
- `More` — menu: Payslips, Benefits, Goals, Documents, Directory, Notifications, Settings.

## Profile & Directory
- `ProfileEdit` — editable fields only (partial).
- `Documents` — personal vault list + view/download.
- `OrgChart` — read-only team/colleagues view.
- `Directory` — search colleagues.

## Time & Attendance
- `Clock` — clock in/out with status, GPS/photo capture.
- `Timesheet` — current/past periods, total hours.
- `OvertimeRequest` — form + status.

## Leave
- `LeaveBalance` — per-type balances.
- `LeaveRequest` — form (type, range, half-day, attachment, reason).
- `LeaveHistory` — list + detail + cancel.

## Payroll
- `PayslipList` — periods.
- `PayslipDetail` — breakdown + PDF download.

## Benefits
- `BenefitsSummary` — enrolled plans + dependents.
- `BenefitsEnroll` — enroll + life event change.

## Performance
- `Goals` — own goals + progress.
- `Feedback` — submit/recall feedback, view received.
- `SelfReview` — review cycle self-assessment.

## Requests
- `ReimbursementRequest` — form + status.
- `LoanRequest` — form + status.

## Notifications & Settings
- `Notifications` — in-app list, tap → deep link.
- `Settings` — push toggle, language, logout, about.

## Screen states (every screen)
Loading · Empty (with action) · Error (friendly ID) · Permission/role gate · Pull-to-refresh · Offline banner (queued actions).
