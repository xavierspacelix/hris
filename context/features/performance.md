# Feature: Performance

## Purpose
Set goals, run review cycles, gather continuous feedback, and calibrate talent.

## Scope (in)
Tables: `goals` (tenant_id, employee_id, parent_goal_id|null, title, description, due, status, progress), `review_cycles` (tenant_id, name, type[annual/quarter/360], start, end, status), `reviews` (tenant_id, cycle_id, employee_id, reviewer_id, relation[self/peer/manager/upward], scores jsonb, comment, status), `competencies` (tenant_id, name, description), `feedback` (tenant_id, from_id, to_id, type[kudos/note], body, visibility), `calibration_sessions` (tenant_id, cycle_id, status), `talent_reviews` (tenant_id, employee_id, nine_box, notes), `development_plans` (tenant_id, employee_id, items jsonb).

## Key rules
- Goals cascade (org→team→individual) via `parent_goal_id`.
- Review cycles support 360 relations; manager submits evaluation.
- Calibration session adjusts scores before finalize.
- Continuous feedback separate from formal reviews.

## Acceptance
- Admin launches a review cycle; managers and peers submit reviews.
- Calibration session adjusts ratings.
- Employee sees own goals and feedback; submits self-review.
- Talent review nine-box rendered for HR/admin.
