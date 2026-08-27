# Feature: Documents & Storage

## Purpose
Secure employee and tenant document vault with expiry tracking, templates, and access audit.

## Scope (in)
- `documents` (tenant_id, branch_id|null, owner_employee_id|null, category, name, storage_key, mime, size, expires_at|null, created_by, created_at).
- Storage broker to S3-compatible bucket, path `tenantId/...`.
- Categories + expiry alerts (visa, certificate).
- Document templates + render-from-template (offer letter, payslip, certificate).
- e-Signature hook (internal or provider).
- Per-document access control + access audit.

## Key rules
- No public URLs for PII; all access brokered through API with tenant/branch scope.
- Document access (view/download) is audit-logged.
- Expiry alert emitted via notification service.

## Acceptance
- HR uploads contract to employee vault; employee sees it on mobile.
- Expiring document raises alert before expiry.
- Generate offer letter from template with employee data.
- All accesses appear in audit log.
