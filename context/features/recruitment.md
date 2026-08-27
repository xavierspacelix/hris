# Feature: Recruitment / ATS

## Purpose
Manage requisitions, postings, applicants, interviews, and offers through hire.

## Scope (in)
Tables: `requisitions` (tenant_id, branch_id, position_id, count, status, approved_by|null), `job_posts` (tenant_id, requisition_id, title, description, internal, external, status), `applicants` (tenant_id, post_id, name, email, resume_key, stage, source), `pipeline_stages` (tenant_id, name, order), `interviews` (tenant_id, applicant_id, panel jsonb, scheduled_at, status), `scorecards` (tenant_id, interview_id, evaluator_id, scores jsonb, note), `offers` (tenant_id, applicant_id, content_jsonb, status, signed_key|null).

## Scope (out)
- Onboarding after hire (see onboarding feature).

## Key rules
- Requisition needs approval before posting.
- Applicant stage transitions follow `pipeline_stages` order.
- Offer generate → approve → e-sign → handoff to onboarding.
- Candidate portal + per-tenant career page.

## Acceptance
- HR creates requisition, gets approval, posts job.
- Applicants move through pipeline; interviews scheduled with scorecards.
- Offer generated, signed, and converted to a new employee record.
