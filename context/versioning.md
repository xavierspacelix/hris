# Versioning

HRIS is a single Next.js web app in one repository, one Bun workspace, and one database schema. Version it with SemVer 2.0.0. Tooling: **Bun** (package manager) + **Turborepo** (task runner). Do not use pnpm.

## Versioned artifacts

| Artifact | Version source | Notes |
|---|---|---|
| Web (`apps/web`) | `package.json` `version` | Next.js app, deployed continuously |
| API contract | `packages/api` `version` + `API_VERSION` const | tRPC has no URL version; bump on breaking router/schema change |
| Database schema | Prisma migration sequence | Migrations are the schema version; never edit after apply |

## SemVer rules

- `MAJOR.MINOR.PATCH`.
- MAJOR: breaking API/contract change, or non-backward-compatible DB migration.
- MINOR: new feature, additive migration, new router (non-breaking).
- PATCH: bugfix, non-breaking change.
- Mark breaking changes with `!` in the commit and a `BREAKING CHANGE:` footer.

## Branch naming

- `p{phase}-{slug}` for phase work: `p0-foundation`, `p2-leave`.
- `feat/{scope}-{desc}`, `fix/{scope}-{desc}`, `chore/...`, `docs/...`.
- No direct pushes to `main`; short-lived branch + PR required.

## Commit scopes (Conventional Commits)

`p0`, `p1-people`, `p2-leave`, `p2-time`, `p3-payroll`, `p3-benefits`, `p4-recruitment`, `p4-onboarding`, `p4-offboarding`, `p5-performance`, `p6-mss`, `p6-ess`, `p7-project`, `p7-reports`, `p7-notif`, `db`, `api`, `web`, `deps`, `docs`, `release`.

## Database migration versioning

- Prisma migrations are append-only and ordered.
- Each migration may include RLS DDL; RLS changes are tracked in `packages/db/prisma/rls.sql` and re-applied on recreate.
- Web version must be compatible with the deployed migration set; a migration that breaks old clients is a MAJOR event.

## Tags

- App releases use annotated, signed tags: `v{versionName}` (e.g. `v1.0.1`).
- A MAJOR/forced-update bump also requires a `v{versionName}` tag.

## Task runner

- `turbo.json` defines `build`, `lint`, `typecheck`, `dev`, `test`.
- Root scripts: `turbo run <task>` (or filtered: `turbo run dev --filter=web`).
