# Project Overview

## Product

HRIS is a multi-tenant Human Resource Information System. A single deployed instance serves many organizations (tenants). Inside each tenant, the organization can operate multiple branches (cabang); some roles see every branch, others see only their own. The system covers the full employee lifecycle: people data, org structure, time & attendance, leave, payroll, benefits, recruitment, onboarding, performance, offboarding, plus a Jira-like project module, and a full Employee Self-Service surface — all delivered through one responsive Next.js web app.

One client, all roles:

- **Web** (Next.js 16): HR admin, payroll admin, owner, BOD, manager self-service, and employee self-service. Employee Self-Service is a role-scoped surface (under `/(tenant)/me`) showing only the employee's own, branch-scoped data.

## Target User

- HR administrators and payroll administrators who run workforce operations for one or many branches.
- Owners and board members (BOD) who need cross-branch visibility and executive analytics.
- Managers who approve leave/timesheets and run team reviews.
- Employees who self-serve from the web app: view profile, clock in/out, request leave, view payslips, track goals.

## Platform

- Web: Next.js 16 App Router, deployed as a single multi-tenant instance. Responsive for desktop, tablet, and phone browsers.
- Database: PostgreSQL (managed, e.g. Neon/Aurora/RDS).
- Runtime: Node.js (web server, API, background workers).
- Account model: per-tenant accounts, no global consumer accounts.
- No plan tiers or billing. Every tenant gets the full feature set.
- Commit convention: Conventional Commits 1.0.0. Trunk-based Git.

## Product Principles

1. Tenant isolation is absolute. Cross-tenant reads/writes are severity-1.
2. Branch scoping is automatic. A branch-scoped user never sees another branch's data without an explicit, audited elevation.
3. Authorization is server-decided. Clients mirror permissions; they never grant them.
4. Audit everything sensitive. Employee PII, compensation, payroll, roles, and document access are logged immutably.
5. Web-first for everyone; responsive for tablet/phone browsers. Employee Self-Service is a scoped surface in the same web app, not a separate client.
6. Email is SMTP only. No third-party email SaaS.
7. Safe defaults. RLS fails closed; missing tenant/branch context returns nothing.
8. No hardcoded styling tokens. Components consume CSS variables from `ui-tokens.md`.

## Multi-Tenancy & Branch Model

- **Tenant** is the hard isolation boundary. Every row in every business table carries `tenant_id`. PostgreSQL RLS enforces it at the row level using `current_setting('app.current_tenant')`.
- **Branch** is a soft scoping dimension inside a tenant. Each employee belongs to one branch. Records carry `branch_id` where relevant.
- **Role scope** decides branch visibility:
  - `scope: 'all'` → owner, bod, hr_admin, payroll_admin. See every branch in the tenant.
  - `scope: 'branch'` → manager, employee. See only their own branch.
- The data layer applies the branch filter automatically from the requesting user's role scope and branch. Application code never hand-writes branch filters per query.

## Roles

| Role | Scope | Typical duties |
|---|---|---|
| owner | all branches | full control, settings, billing-irrelevant config |
| bod | all branches | executive cross-branch visibility, analytics |
| hr_admin | all branches | people, org, leave, recruitment, performance |
| payroll_admin | all branches | payroll runs, compensation, benefits |
| manager | own branch | team approvals, reviews, requisitions |
| employee | own branch | self-service only |

Custom tenant roles can be added later by cloning a template role and editing the permission set.

## Feature List (full, no MVP scope cut)

### A. Platform & Tenant
- Tenant onboarding (signup, create org, setup wizard)
- Tenant settings (name, logo, timezone, locale, currency, regional rules)
- Tenant registry (mapping tenant → DB/DNS; supports gradual enterprise isolation later)
- Subdomain routing per tenant (`acme.hris.app`)
- System super-admin (manages tenants, not tenant data)
- Branch management (CRUD cabang, assign employees, per-branch settings: timezone, holiday calendar, currency, leave policy)

### B. Authentication & RBAC
- Email/password login + reset password
- SSO OIDC/SAML (Google, Microsoft Entra, Okta) per tenant
- MFA (TOTP, WebAuthn)
- User invitation by email with role assignment
- Member management & role assignment within tenant
- Role templates (owner, bod, hr_admin, payroll_admin, manager, employee) + custom roles
- Permission matrix per module
- SCIM directory sync (enterprise)
- Session & device management, force logout
- Audit of all role/permission changes

### C. People / Employee Management
- Employee profile (personal, contact, emergency, identity numbers, tax, bank)
- Employment details (status, type, join date, probation, contract end, grade, level)
- Job info (position, department, manager, location/branch, payroll group)
- Compensation & salary history
- Career/position history within company
- Multiple addresses
- Photo & identity documents
- Custom fields per tenant
- Bulk import/export (CSV/Excel)
- Soft deactivate / terminate
- Search, advanced filter, saved views

### D. Org Structure
- Department / division / business unit hierarchy
- Position / job title catalog
- Cost center & profit center
- Reporting line (incl. matrix manager)
- Interactive org chart
- Headcount plan vs actual
- Grade ladder & position hierarchy
- Location / site / remote

### E. Documents & Storage
- Employee document vault (contracts, certificates, IDs)
- Category & expiry tracking (visa, certificate) with alerts
- Document templates (letters, contracts)
- Generate documents from templates (offer letter, payslip, certificate)
- e-Signature (internal or provider)
- Versioning & per-document access control
- Document access audit

### F. Time & Attendance
- Clock in/out (web; GPS/photo verification per policy)
- Timesheet (manual + auto from attendance)
- Shift scheduling (rotation, shift swap)
- Overtime request & approval
- Work schedule & working calendar
- Geofencing / photo verification
- Timesheet correction & approval
- Daily/monthly attendance & overtime summaries
- Optional biometric/API integration

### G. Leave / Time-off
- Leave type config per country/tenant
- Accrual policy (prorata, carry-over, cap, probation)
- Real-time leave balance per employee
- Leave request with attachment
- Multi-level approval workflow
- Cancel / modify leave
- Holiday calendar per location
- Team overlap / conflict detection
- Comp-off, unpaid, half-day
- Export & payroll integration

### H. Payroll
- Payroll group & period (monthly/weekly)
- Components: earnings, deductions, taxes
- Tax engine (country-specific, e.g. PPh21 + BPJS for Indonesia; extensible)
- Payslip generation & distribution (web)
- Pay run lifecycle: draft → review → approve → lock
- Bonus, THR, severance
- Reimbursement & loan (salary deduction)
- Multi-currency per location
- Year-end tax forms
- Payroll reconciliation & journal to accounting
- Unlock / rollback pay run
- Historical payslips & PDF download

### I. Benefits
- Benefit plans (health, pension, insurance, transport, meal)
- Enrollment period & life events
- Employee election & dependents
- Cost split (company/employee)
- Provider integration (optional)
- Per-employee benefit summary
- Qualifying life event workflow

### J. Recruitment / ATS
- Job requisition with approval
- Job posting (internal + external board)
- Per-tenant career page
- Applicant tracking (pipeline stages)
- Resume parse & optional AI screening
- Interview scheduling + panel
- Scorecard & evaluation
- Offer management (generate, approve, e-sign)
- Candidate portal
- Requisition → hire → onboarding handoff
- Talent pool / pipeline

### K. Onboarding
- Onboarding checklist template per dept/position
- Task assignment to HR, manager, IT, employee
- Probation tracking & review reminder
- Welcome & digital document sign
- Equipment & access provisioning hook
- Onboarding progress tracking

### L. Performance
- Goal setting (cascading org → team → individual)
- Review cycle (annual/quarter/360)
- Self/peer/manager/upward review
- Competency framework
- Continuous feedback (kudos, 1:1 notes)
- Calibration session
- Nine-box / talent review
- Development plan & IDP
- Performance dashboard

### M. Offboarding
- Resignation / termination workflow
- Exit interview & survey
- Offboarding checklist (IT, finance, HR)
- Revoke access & equipment return
- Final settlement via payroll
- Rehire flag & alumni

### N. Employee Self-Service (Web, full)
- Login + MFA
- View & edit own profile (partial fields)
- Org chart & colleagues view
- Clock in/out & timesheet
- Leave request + balance + history
- Overtime request + approval status
- Payslip view & PDF download
- Benefits view & enrollment
- Goals view & feedback submission
- Personal document vault
- Reimbursement / loan request
- Directory & colleague search
- Company announcements & newsfeed
- Helpdesk / chat hook

### O. Manager Self-Service (Web)
- Team directory & org chart
- Approve leave / overtime / timesheet for team
- Team attendance view
- Initiate review & submit evaluation
- Raise requisition / hire
- Team analytics (turnover, attrition risk)
- 1:1 notes & feedback
- Delegation during absence

### P. Project Module (Web — Jira-like)
- Project/workspace: create, settings, members, project key
- Kanban board: status columns, drag-and-drop
- Issue types: Epic, Story, Task, Bug, Sub-task
- Issue: title, description, assignee (employee), reporter, priority, status, labels, sprint, estimate, due date, component
- Sprint & backlog, active sprint board, sprint planning
- Roadmap (timeline of epics)
- Comments + @mention, activity log, watchers
- Attachments, time tracking / log work (links to timesheet)
- Filters & saved search (simple JQL-like query)
- Reports: burndown, velocity, issue statistics
- Project roles: lead, member, viewer
- Notifications on assign / comment

### Q. Reporting & Analytics
- Headcount & movement (hire/termination)
- Turnover / attrition rate
- Diversity & inclusion metrics
- Absence & attendance rate
- Leave liability (accrual)
- Compensation & cost analytics
- Headcount plan vs actual
- Pipeline & time-to-hire
- Performance distribution
- Custom report builder + saved reports
- Scheduled report & export (CSV/PDF)
- Executive dashboard per tenant

### R. Audit & Compliance
- Audit log for all sensitive actions
- Immutable trail + export
- Data retention policy per tenant
- Consent & privacy tools (export, delete, anonymize)
- Compliance reports (equal pay, labor law)
- Access log & IP recording

### S. Notifications
- In-app + email (SMTP)
- Event-based: leave, approval, payroll, onboarding, document expiry
- Configurable templates
- Daily/weekly digest

### T. Workflow Automation
- Rule builder (trigger → condition → action)
- Examples: probation ended → notify manager; leave approved → update timesheet
- Outbound webhook to external systems
- Dynamic approval routing

## Web Navigation (high level)

```
/                       → Tenant signup / login
/(tenant)/dashboard     → Role-based home
/(tenant)/people        → Employees
/(tenant)/org           → Org structure
/(tenant)/time          → Attendance & timesheets
/(tenant)/leave         → Leave admin + approvals
/(tenant)/payroll       → Payroll runs & payslips
/(tenant)/benefits      → Benefits admin
/(tenant)/recruitment   → ATS
/(tenant)/onboarding    → Onboarding
/(tenant)/performance   → Performance
/(tenant)/projects      → Project module (Jira-like)
/(tenant)/reports       → Reporting & analytics
/(tenant)/settings      → Tenant, branch, RBAC, audit
/(tenant)/me            → Employee Self-Service (scoped to the employee)
```

Employee Self-Service is a scoped web surface (section N); it reuses the same shell, components, and API as the admin views.

## Out Of Scope

- Billing, plan tiers, or subscription management.
- External email SaaS (SMTP only).
- Native desktop or mobile apps (web only; responsive for tablet/phone browsers).
- Third-party payroll provider auto-submission (journal out, not submission).

## Success Criteria

- A new tenant can sign up, create branches, invite users, and manage employees within minutes.
- No cross-tenant or cross-branch read is possible through UI, API, or raw SQL path.
- HR admin completes a full payroll run and distributes locked payslips.
- An employee completes clock-in, leave request, and payslip view entirely from the web app.
- A manager runs a review cycle and approves team leave from web.
- A cross-branch role sees consolidated analytics across all branches.
- All sensitive writes appear in the immutable audit log.
