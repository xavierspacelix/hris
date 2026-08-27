# ADR 0001: Version PostgreSQL RLS SQL With Prisma Migrations

## Status

Accepted 2026-08-28.

## Context

Prisma 6 models tables and indexes but does not model PostgreSQL `ENABLE ROW LEVEL SECURITY`, `FORCE ROW LEVEL SECURITY`, or tenant/branch policies. HRIS requires database-enforced, fail-closed tenant isolation.

## Decision

Keep Prisma schema and generated migration SQL as primary schema source. Store reviewed PostgreSQL RLS DDL in `packages/db/prisma/rls.sql`. Copy that DDL into each applicable generated migration when tenant-scoped tables change, then apply migration through Prisma.

RLS policies must read transaction-local settings using `current_setting(..., true)`. Missing tenant context evaluates to no rows. Request database role must not have `BYPASSRLS`.

## Consequences

- RLS changes receive code review with schema migrations.
- `rls.sql` remains recreate/reference source.
- Local Docker PostgreSQL validates migrations and isolation tests before deployment.
