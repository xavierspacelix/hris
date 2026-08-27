# Feature: Project Module (Web, Jira-like)

## Purpose
Track internal projects and work with a Jira-style board inside the HRIS web app.

## Scope (in)
Tables: `projects` (tenant_id, branch_id|null, key, name, description, lead_id), `project_members` (tenant_id, project_id, employee_id, role[lead/member/viewer]), `issues` (tenant_id, project_id, type[epic/story/task/bug/subtask], parent_id|null, title, description, assignee_id|null, reporter_id, priority, status, labels jsonb, sprint_id|null, estimate, due_date|null, component|null), `sprints` (tenant_id, project_id, name, start, end, status[planned/active/closed]), `issue_comments` (tenant_id, issue_id, author_id, body, created_at), `issue_watchers` (tenant_id, issue_id, employee_id), `issue_history` (tenant_id, issue_id, field, from, to, actor_id, at).

## Board & workflow
- Kanban board derived from `issues.status`; drag-and-drop updates status via API.
- Backlog vs active sprint; sprint planning moves issues into active sprint.
- Roadmap view timelines epics.
- Time tracking on issues logs to `timesheet_entries` (links to attendance/payroll).

## Key rules
- Assignee/reporter reference `employees` within tenant.
- All project tables tenant-scoped; branch-scoped projects add `branch_id`.
- Notifications on assign/comment via notification service.

## Acceptance
- User creates project, adds members, creates epics/stories/bugs.
- Drag issue across board columns; status persists.
- Sprint planning moves issues; burndown report renders.
- Comment + @mention notifies watchers.
