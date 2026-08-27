# HRIS Mobile ESS — OpenDesign Prototype Prompt

Build a complete high-fidelity mobile prototype for the Employee Self-Service experience of the HRIS platform.

This is the authoritative screen inventory and design instruction for the Expo mobile app.

Build with realistic mock data first. Do not connect a backend yet.

Follow `design-system.md` principles, but treat the approved visual result from the design tool as the visual source of truth. `ui-tokens`, rules, registry, and implementation-level design tokens will be regenerated from the approved design afterward.

The mobile app is for employees performing frequent personal HR tasks.

It must feel intentionally designed for mobile Employee Self-Service, not like the web HRIS dashboard reduced to phone width.

---

# 1. Product Context

Primary users are employees accessing their own HR information and completing personal workflows such as:

* clock in / clock out;
* checking attendance;
* requesting leave;
* viewing payslips;
* submitting reimbursement or loan requests;
* reviewing benefits;
* updating permitted profile information;
* checking goals and performance;
* reading announcements and notifications.

Design for short, frequent sessions.

Optimize for:

* speed;
* clarity;
* trust;
* one-handed use;
* low cognitive load;
* predictable navigation;
* clear state feedback;
* intermittent connectivity.

All employee data is automatically scoped to the authenticated employee and their branch.

Do not expose administrative branch controls.

---

# 2. Mobile Design Direction

The app should feel:

* professional;
* calm;
* dependable;
* approachable;
* precise;
* modern without being trendy;
* personal without becoming playful.

Prioritize:

1. task clarity;
2. state visibility;
3. typography;
4. spacing;
5. touch ergonomics;
6. hierarchy;
7. accessibility.

Use mobile-native interaction patterns.

Do not reproduce desktop layouts literally.

The application should feel appropriate for daily HR tasks involving sensitive information such as attendance, salary, benefits, identity, and performance.

---

# 3. Anti-AI-Slop Rules

Avoid generic AI-generated mobile dashboard aesthetics.

Do not default to:

* giant gradient headers;
* decorative blobs;
* glassmorphism;
* glowing effects;
* excessive pastel surfaces;
* every section inside a rounded card;
* excessive border radius;
* colorful icon-tile grids;
* icons inside arbitrary colored rounded squares;
* large greeting heroes;
* excessive KPI cards;
* decorative charts;
* arbitrary carousels;
* oversized avatars;
* excessive shadows;
* gradient buttons;
* floating action buttons without a functional reason;
* banking or fintech-style dashboards;
* decorative illustrations that do not improve understanding.

Do not blindly imitate fintech, banking, fitness, or Dribbble-style mobile apps.

Use:

* typography;
* alignment;
* spacing;
* hierarchy;
* subtle surface contrast;
* meaningful status treatment;

before adding decoration.

Every prominent element must have a functional reason to be prominent.

Restraint should not result in a bland interface. Create character through excellent typography, spacing, iconography, states, interaction, and domain-specific details.

---

# 4. Navigation & Mobile Ergonomics

Use a bottom tab bar for the primary destinations:

* Home;
* Time;
* Leave;
* Profile;
* More.

Use stack navigation for detail screens and workflows.

`More` contains secondary destinations such as:

* Payslips;
* Benefits;
* Goals;
* Documents;
* Directory;
* Notifications;
* Requests;
* Settings.

Avoid turning `More` into a noisy grid of colorful icons.

Prefer clear grouped navigation.

Design for:

* thumb reach;
* safe areas;
* mobile keyboards;
* readable type;
* practical touch targets;
* Android/iOS navigation expectations.

Do not shrink desktop tables or admin forms into mobile screens.

Rethink each task for mobile.

---

# 5. Home Experience

`Home` is a personal operational home, not a management dashboard.

It should answer:

* What do I need to do now?
* Am I clocked in?
* What requires my attention?
* Did anything important change?
* What frequent action can I start quickly?

Potential content:

* current attendance status;
* today's shift;
* relevant announcements;
* pending employee actions;
* leave status;
* newly available payslip;
* quick actions.

Do not automatically create four equal metric cards.

Do not display all available HR information simply because it exists.

Prioritize relevance.

Quick actions may include:

* Clock In / Clock Out;
* Request Leave;
* View Payslip;
* Submit Reimbursement.

Keep the number of quick actions limited and context-aware.

---

# 6. Attendance, GPS & Offline Reliability

Attendance is one of the highest-frequency workflows and must be extremely clear.

The employee should immediately understand:

* whether they are clocked in;
* when they clocked in;
* current shift;
* whether GPS verification is required;
* whether photo evidence is required;
* whether the action is processing;
* whether attendance was successfully recorded.

Do not show Clock In and Clock Out as equal actions simultaneously.

The primary attendance action must reflect the current state.

When GPS or camera permission is required, explain why in employee-friendly language.

Example:

> Your company requires location verification when recording attendance.

Support relevant states:

* permission required;
* permission denied;
* acquiring location;
* outside allowed area;
* photo required;
* submitting;
* success;
* failure.

Never imply successful attendance before the server confirms it.

If offline actions may be queued, distinguish:

* queued;
* synchronizing;
* successfully recorded.

Use wording such as:

> Waiting to sync

rather than falsely showing:

> Clocked in successfully.

Strong confirmation is important, but avoid gamification or excessive celebratory animation.

---

# 7. Forms & Sensitive Actions

Keep forms focused and mobile-friendly.

Use:

* logical grouping;
* appropriate keyboard types;
* date pickers;
* selectors;
* camera/file attachment;
* contextual helper text.

Avoid both extremes:

* an endless desktop-style form;
* unnecessary multi-step flows for simple tasks.

Preserve entered data when recoverable errors occur.

Clearly distinguish:

* editable information;
* HR-managed information;
* read-only information.

Sensitive actions such as:

* cancelling leave;
* recalling feedback;
* changing important personal information;
* logout;

should show meaningful consequences when confirmation is necessary.

Avoid generic:

> Are you sure?

when a more specific explanation is possible.

---

# 8. Data, Privacy & Status

Use realistic, internally consistent mock data.

Avoid:

* John Doe;
* Jane Smith;
* Lorem Ipsum;
* generic perfect round numbers.

Where appropriate, use realistic Indonesian examples such as:

* Aulia Rahman Pratama;
* Siti Nur Aisyah;
* Nadya Putri Maharani;
* Rizky Aditya Saputra;
* Bandung;
* Jakarta;
* Bekasi;
* Surabaya.

Use realistic attendance, leave, payroll, and request states.

Examples:

* 07:58 clock-in;
* 08:17 late arrival;
* missing clock-out;
* approved correction;
* Annual Leave — 7.5 days available;
* pending leave;
* rejected reimbursement.

Keep employee identity and relationships consistent across screens.

Treat sensitive information carefully.

Avoid unnecessarily exposing:

* salary;
* bank details;
* personal identification data;
* private performance feedback;

on highly visible screens.

Use plain status language such as:

* Pending;
* Approved;
* Rejected;
* Cancelled;
* Processing;
* Paid;
* Submitted.

Do not rely on color alone.

---

# 9. Mobile States

Design states appropriate to each screen rather than mechanically applying every state everywhere.

Consider where relevant:

* initial loading;
* refreshing;
* empty;
* no results;
* error;
* permission required;
* permission denied;
* offline;
* cached;
* queued;
* synchronizing;
* processing;
* success;
* read-only.

Use pull-to-refresh naturally on list/feed screens such as:

* Home;
* Notifications;
* Leave History;
* Timesheet;
* Payslip List.

Keep already-loaded content visible when only part of a screen is refreshing.

Avoid full-screen loading indicators for small updates.

Errors should explain:

* what failed;
* whether user input was preserved;
* whether retry is possible.

Avoid using only:

> Something went wrong.

---

# 10. Auth

## `Splash`

App initialization and session check.

Keep it brief and functional.

Do not add unnecessary branding animation.

## `Login`

Include:

* email;
* password;
* Google SSO;
* Microsoft SSO;
* forgot password.

Support loading, invalid credentials, and network failure.

## `Mfa`

Support:

* TOTP;
* WebAuthn where supported.

Make the verification method and next action obvious.

## `ResetPassword`

Support:

* request reset;
* set new password;
* expired/invalid request;
* success.

## `AcceptInvite`

Support:

* invited employee;
* organization context;
* password setup;
* invitation acceptance.

---

# 11. Main Tabs

## `Home`

Personal employee home.

Include selectively:

* attendance status;
* today's shift;
* announcements;
* pending items;
* contextual quick actions;
* leave or payroll updates.

## `Profile`

Own employee profile.

Include:

* photo;
* name;
* employee ID;
* position;
* department;
* branch;
* manager;
* employment summary;
* documents shortcut.

Only permitted fields should appear editable.

## `Time`

Attendance workspace.

Include:

* Clock In / Clock Out;
* status;
* today's timesheet;
* shift context;
* overtime entry.

## `Leave`

Personal leave workspace.

Include:

* relevant leave balance;
* request action;
* current/recent requests;
* upcoming approved leave.

## `More`

Secondary destinations:

* Payslips;
* Benefits;
* Goals;
* Feedback;
* Documents;
* Directory;
* Notifications;
* Reimbursements;
* Loans;
* Settings.

---

# 12. Profile & Directory

## `ProfileEdit`

Allow only permitted employee-editable fields.

Do not make HR-controlled values such as salary, role, grade, branch, or employment status appear editable unless explicitly supported.

## `Documents`

Personal document vault.

Support:

* list;
* category;
* date;
* view;
* download where permitted.

Prefer a clear list over oversized document cards.

## `OrgChart`

Read-only team structure.

Do not recreate a huge desktop org chart.

Focus on useful mobile relationships:

* employee;
* manager;
* team;
* nearby organizational context.

## `Directory`

Search colleagues.

Show appropriate information such as:

* name;
* position;
* department;
* branch.

Do not expose unnecessary personal data.

---

# 13. Time & Attendance

## `Clock`

Include:

* current attendance state;
* shift;
* GPS state;
* photo capture if required;
* submission state;
* success/error feedback.

## `Timesheet`

Support:

* current period;
* previous periods;
* total hours;
* daily records;
* exceptions.

Use mobile-friendly chronological grouping.

## `OvertimeRequest`

Include:

* date;
* time;
* duration;
* reason;
* attachment where required;
* request status.

---

# 14. Leave

## `LeaveBalance`

Show balances by type.

Prioritize:

* available;
* used;
* pending;
* expiry where relevant.

Avoid one giant decorative card per leave type.

## `LeaveRequest`

Include:

* leave type;
* date/range;
* half-day;
* attachment;
* reason;
* calculated duration;
* remaining balance.

Show conflicts and invalid selections before submission where possible.

## `LeaveHistory`

Show:

* type;
* date;
* duration;
* status;
* detail.

Allow cancellation only when policy permits.

---

# 15. Payroll

## `PayslipList`

Show payroll periods clearly.

Include:

* period;
* issue date;
* status.

Avoid exposing salary values unnecessarily in the list.

## `PayslipDetail`

Include:

* base salary;
* earnings;
* allowances;
* overtime where relevant;
* deductions;
* tax;
* benefit contributions;
* gross;
* net pay;
* PDF download.

Use clear grouping and strong numeric alignment.

Do not turn each payroll component into a colorful card.

Treat salary as private information.

---

# 16. Benefits

## `BenefitsSummary`

Show:

* enrolled plans;
* coverage;
* dependents;
* status.

Avoid marketing-style benefit cards.

## `BenefitsEnroll`

Support:

* eligible plans;
* enrollment;
* dependents;
* life-event changes;
* effective dates.

Make consequences and eligibility clear.

---

# 17. Performance

## `Goals`

Show:

* employee goals;
* progress;
* period;
* status.

Avoid gamification.

## `Feedback`

Support:

* submit feedback;
* recall where allowed;
* view received feedback.

Clearly differentiate privacy/visibility where relevant.

## `SelfReview`

Support:

* review questions;
* ratings;
* written responses;
* progress;
* draft saving;
* submission.

Use sections when the review is long.

---

# 18. Requests

## `ReimbursementRequest`

Include:

* expense type;
* amount;
* date;
* receipt;
* description;
* submission;
* status.

Support camera/file upload with clear upload state.

## `LoanRequest`

Include:

* loan type;
* requested amount;
* relevant terms;
* reason;
* status.

Do not design employee loans like consumer loan advertisements.

---

# 19. Notifications & Settings

## `Notifications`

Support:

* title;
* concise message;
* timestamp;
* read/unread state;
* deep link to relevant screen.

Notifications should correspond to meaningful HR events.

Examples:

* leave approved;
* payslip available;
* reimbursement status changed;
* attendance correction required;
* review cycle opened.

## `Settings`

Include:

* push notification preference;
* language;
* logout;
* about.

Use familiar mobile settings patterns.

---

# 20. Prototype Flows

The prototype should demonstrate meaningful end-to-end workflows, not only isolated screenshots.

At minimum include:

### Attendance

`Home → Clock → GPS/photo → submit → success`

### Leave

`Leave → balance → request → validation → submit → history/detail`

### Payroll

`More/Home → PayslipList → PayslipDetail → PDF`

### Reimbursement

`More → ReimbursementRequest → receipt → submit → status`

### Performance

`Goals / SelfReview → detail → draft → submit`

### Notifications

`Notification → deep link → relevant detail`

---

# 21. Design Review Before Completion

Before finalizing a screen, ask:

1. Does this feel like a native employee app rather than a desktop HRIS squeezed onto mobile?
2. Could this screen belong to a generic fintech or banking app if the labels changed?
3. Is the primary task immediately obvious?
4. Can frequent tasks be completed quickly and comfortably?
5. Are cards used only when they improve grouping?
6. Are there unnecessary colorful icon tiles or decorative surfaces?
7. Is current state always clear?
8. For attendance, is server-confirmed success unmistakable?
9. Are offline and queued states truthful?
10. Are permission requests explained clearly?
11. Is sensitive information shown only where necessary?
12. Is navigation limited to genuinely important destinations?
13. Are forms optimized for mobile input?
14. Are touch targets and typography practical?
15. Could spacing, alignment, typography, or dividers replace an unnecessary card?
16. Is any element present only to make the design look more premium?
17. Does realistic mock data expose actual usability problems?
18. Would the screen remain comfortable after months of daily use?
19. Does every important action clearly communicate processing, success, failure, or queued state?
20. If the result looks AI-generated, identify the generic pattern causing it and redesign that part.

---

# 22. Final Quality Bar

The final prototype should feel like a credible production Employee Self-Service application.

It should communicate:

* trust;
* speed;
* clarity;
* maturity;
* personal relevance;
* operational reliability.

It should not feel like:

* a shrunk desktop dashboard;
* a fintech clone;
* a generic mobile dashboard;
* a Dribbble concept;
* a component showcase;
* an AI-generated template.

Frequent workflows should be extremely efficient.

Sensitive workflows should feel safe.

Attendance and offline states should be unambiguous.

Every prominent element should support an employee task.

The final result should feel designed by someone who understands mobile ergonomics, attendance workflows, payroll privacy, Employee Self-Service, and real-world HR operations.
