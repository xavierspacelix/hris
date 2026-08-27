# Feature: 02 Authentication (Better Auth)

## Purpose
Authenticate users, resolve their tenant and role scope, and protect all routes.

## Scope (in)
- Better Auth email/password + reset password.
- MFA: TOTP (and WebAuthn hook).
- SSO OIDC/SAML adapters (Google, Microsoft Entra, Okta) — config per tenant, off by default.
- Session → middleware resolves `(tenantId, userId, roleKey, scope, branchId)` from subdomain + session.
- Login, reset-password, accept-invitation pages (web). Mobile uses bearer token from same auth.

## Tenant resolution
- Host `acme.hris.app` → tenant `acme`. Fallback: session claim.
- Unknown tenant subdomain → 404/redirect to signup.

## Key rules
- Authorization is server-side only; clients mirror permissions.
- SSO group→role mapping is per-tenant and just-in-time; SCIM optional later.
- MFA enforced when tenant policy requires it.

## Acceptance
- User logs in, lands on role-appropriate home.
- Session carries correct tenant/branch/scope.
- Protected routes reject unauthenticated and wrong-tenant access.
- Reset password flow sends SMTP email.
