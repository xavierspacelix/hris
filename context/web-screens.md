# HRIS Admin Dashboard — Full OpenDesign Prototype Prompt

Build a complete high-fidelity **mobile-first HRIS Admin Dashboard and Management Console** for HR administrators, payroll administrators, managers, business owners, and executives.

This is the primary operational dashboard for managing:

* employees;
* organizational structure;
* attendance;
* timesheets;
* leave;
* payroll;
* benefits;
* recruitment;
* onboarding;
* offboarding;
* performance;
* projects;
* reporting;
* workflows;
* organization settings.

Use this document as the authoritative screen and workflow specification.

Build with realistic mock data first. Do not connect a backend yet.

Follow the principles in `design-system.md`, but treat the approved visual result produced by the design tool as the visual source of truth. `ui-tokens`, rules, registry, and implementation-level design tokens will be regenerated from the approved visual result afterward.

The product is fundamentally a **desktop operational dashboard**, not a marketing website, employee mobile experience, or collection of disconnected CRUD pages.

The objective is to create a coherent, production-grade enterprise dashboard that supports users who may spend several hours per day managing employees, reviewing exceptions, processing approvals, reconciling payroll, and analyzing organizational data.

The result should feel like a mature business application intentionally designed around HR operations.

---

# 1. Dashboard Product Context

This product is the administrative and management dashboard of a multi-tenant HRIS platform.

Primary users include:

* HR administrators;
* payroll administrators;
* managers;
* business owners;
* BOD / executives.

Employees use the Employee Self-Service surface within this same web app (scoped to their own data).

This dashboard should therefore prioritize **administrative and managerial workflows**, not employee self-service.

Users frequently perform tasks such as:

* finding employees;
* comparing records;
* reviewing attendance exceptions;
* approving requests;
* processing payroll;
* correcting data;
* monitoring onboarding;
* reviewing recruitment pipelines;
* analyzing organizational metrics;
* configuring policies;
* managing permissions.

Design primarily for desktop and laptop environments.

Assume typical working widths such as:

* 1280px;
* 1440px;
* 1600px;
* larger enterprise monitors.

Responsive behavior should still be sensible, but do not compromise desktop information density merely to make every administrative workflow comfortable on a small phone.

The dashboard should optimize for:

* operational clarity;
* information density;
* fast scanning;
* comparison;
* bulk operations;
* exception detection;
* auditability;
* predictable navigation;
* low cognitive overhead.

---

# 2. Dashboard Design Direction

The dashboard should feel:

* professional;
* calm;
* precise;
* mature;
* trustworthy;
* data-oriented;
* operational;
* contemporary without being trendy.

It should support long work sessions without becoming visually exhausting.

Prefer:

* strong information hierarchy;
* compact but readable layouts;
* excellent tables;
* useful filters;
* clear status treatment;
* meaningful grouping;
* stable navigation;
* contextual actions.

Avoid designing the dashboard like:

* a marketing SaaS website;
* a fintech consumer app;
* a mobile application enlarged to desktop size;
* a portfolio piece designed primarily for screenshots;
* a generic Tailwind admin template;
* a collection of oversized cards.

The dashboard should feel intentionally designed for professionals managing real HR operations.

---

# 3. Dashboard Composition Principles

Do not interpret "dashboard" as:

> KPI cards + chart grid.

The product as a whole is an administrative dashboard, but individual screens should use the interaction pattern most appropriate to their workflow.

For example:

* People → data directory / workspace;
* Attendance → operational exception table;
* Payroll → financial reconciliation workspace;
* Leave → request and approval workspace;
* Recruitment → pipeline;
* Performance → review and calibration workspace;
* Reports → analytical dashboard;
* Settings → configuration interface.

Maintain a shared dashboard shell while allowing module-specific layouts.

Use:

> consistent application chrome + domain-appropriate workspaces.

Do not use:

> identical dashboard template on every route.

---

# 4. Dashboard Shell

Establish a coherent global shell for the web application.

It should provide:

* primary navigation;
* current module context;
* tenant context;
* branch scope where applicable;
* user/account access;
* notifications where relevant;
* global or contextual search where justified.

The shell should remain visually stable while users move between modules.

Avoid excessive vertical chrome that reduces usable workspace.

The main content area should prioritize operational information.

Do not create oversized header regions that push actual data below the fold.

For data-heavy screens, maximize useful vertical space.

---

# 5. Information Density

This is a professional desktop dashboard.

Information density should be higher than in the Employee Self-Service surface.

Dense does not mean cramped.

Use:

* compact rows;
* disciplined spacing;
* clear typography;
* alignment;
* hierarchy;
* progressive disclosure;

to fit meaningful information without overwhelming the user.

Avoid excessive padding that allows only a few records to fit on a normal laptop display.

A payroll administrator should be able to compare many employees without scrolling through giant rows.

An HR administrator should be able to scan meaningful portions of an employee directory at once.

---

# 6. Dashboard Metrics

Metrics should exist because they support decisions.

Do not automatically create a row of four KPI cards on every dashboard-like screen.

A metric may instead appear as:

* compact summary;
* comparison strip;
* table aggregate;
* inline value;
* trend;
* exception counter;
* chart;
* dedicated KPI surface.

Choose based on context.

The primary `/dashboard` route may contain important organizational metrics, but it should also surface:

* exceptions;
* approvals;
* tasks;
* operational changes;
* relevant announcements.

The home dashboard should help users understand:

> What requires my attention?

not merely:

> What numbers can we display?

---

# 7. Desktop-First Tables

Tables are a core interaction pattern throughout the dashboard.

Treat them as carefully designed product surfaces.

Where relevant, support:

* sticky headers;
* sorting;
* filters;
* search;
* saved views;
* configurable columns;
* row selection;
* bulk operations;
* pagination;
* compact density;
* contextual actions;
* pinned identifiers.

Avoid converting structured enterprise records into grids of cards merely to make the interface look more visual.

Use tables particularly for:

* employees;
* attendance;
* timesheets;
* leave requests;
* payroll;
* reimbursements;
* audit logs;
* benefits enrollments;
* report results.

---

# 8. Workspaces, Not Pages

For complex workflows, think in terms of **workspaces**, not isolated screens.

A workspace may combine:

* list;
* filters;
* summary;
* detail;
* contextual actions;

without forcing unnecessary navigation.

Consider:

* split views;
* side panels;
* drawers;
* contextual detail panes;

when they preserve useful context.

Examples:

An HR administrator reviewing an employee may benefit from keeping the employee directory context visible.

A payroll administrator investigating a discrepancy may benefit from opening employee/component details without leaving the pay-run workspace.

Do not overuse drawers or split panes simply because they are available.

Use them when they reduce context switching.

---

# 9. Employee Self-Service (Web)

Employee Self-Service is a role-scoped surface inside the same web app (route group `/(tenant)/me`). It reuses the dashboard shell, tokens, and components. Density and interaction patterns match the admin dashboard, but the data is automatically scoped to the employee's own record and branch. Employees never see administrative controls or other employees' data.

Primary users: employees performing personal HR tasks. Sessions are short and frequent (clock in, request leave, check payslip), but the surface is still a web dashboard — not a separate mobile app.

### ESS screens (build within the phase that introduces the feature)

- **Home (`/me`)** — personal summary: upcoming/absence, pending approvals on my requests, my attendance today, announcements.
- **My Profile** — view + edit permitted partial fields; photo.
- **My Org & Colleagues** — read-only org chart slice + colleague search.
- **My Attendance** — clock in/out (GPS/photo per policy), my timesheet, corrections.
- **My Leave** — request, balances, history, cancel.
- **My Overtime** — request + status.
- **My Payslips** — list, view, PDF download.
- **My Benefits** — summary + enrollment + life events.
- **My Goals & Reviews** — goals, submit self-review, feedback/IDP.
- **My Documents** — personal vault view/download.
- **My Reimbursements / Loans** — request + status.
- **Announcements & Newsfeed** — tenant-scoped.
- **Helpdesk** — optional chat hook.

### ESS rules

- All reads auto-scoped to the employee's tenant + branch + own record (server-enforced).
- No admin writes; request submissions flow through the same API routers with employee scope.
- Reuse `PageHeader`, `Card`, `DataTable`, `Modal`, `StatusChip`, `Avatar` from the shared registry — do not fork mobile-specific components.
- Responsive: the same components adapt to phone/tablet browsers; no separate layout system.
