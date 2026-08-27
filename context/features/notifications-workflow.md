# Feature: Notifications & Workflow Automation

## Purpose
Deliver event-based notifications and let tenants automate routine processes.

## Notifications
- `notifications` (tenant_id, user_id, type, payload jsonb, read_at|null).
- Dispatcher service sends: in-app, email via nodemailer (SMTP), push via Expo.
- Event emitters call dispatcher on leave/approval/payroll/onboarding/document-expiry.
- Configurable templates; daily/weekly digest option.

## Workflow Automation
- `workflow_rules` (tenant_id, name, enabled, trigger, condition jsonb, action jsonb).
- Rule builder UI (trigger → condition → action).
- Examples: probation ended → notify manager; leave approved → update timesheet; new hire → create onboarding instance.
- Outbound webhook action to external systems.

## Key rules
- Email strictly SMTP; no external email SaaS.
- Workflows run with tenant context; actions respect RBAC.
- Failed notifications/webhooks retried with backoff, logged.

## Acceptance
- Leave request sends in-app + email + push to approver.
- A workflow rule auto-creates onboarding on hire.
- Webhook fires to external URL on trigger.
