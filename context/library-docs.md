# Library Docs

Approved dependencies. Add an entry before using any new third-party package. Verify the exact version's official docs before approval.

## Runtime / Framework

| Package | Version (target) | Purpose | Constraints |
|---|---|---|---|
| next | 16.x | Web framework (App Router) | App Router only; no pages router |
| react | 19.x | UI | strict mode on |
| react-native / expo | SDK 52+ | Mobile ESS | Expo managed workflow |
| typescript | 5.x | Language | strict everywhere |

## API / Data

| Package | Version (target) | Purpose | Constraints |
|---|---|---|---|
| @trpc/server, @trpc/client, @trpc/react-query | 11.x | Shared API contract | Routers live in `packages/api` |
| @trpc/next, @trpc/expo | 11.x | Client adapters | |
| zod | 3.x | Validation | All inputs at API boundary |
| @prisma/client, prisma | 6.x | ORM + migrations | RLS via migrations; client extension for scoping |
| pg | 8.x | Native pg for RLS context (`SET LOCAL`) | Used inside `packages/db` only |
| dotenv | 17.4.2 | Load local Prisma CLI environment | `packages/db` only; `.env` remains untracked |

## Auth

| Package | Version (target) | Purpose | Constraints |
|---|---|---|---|
| better-auth | latest stable | Email/password, MFA, SSO OIDC/SAML, orgs | Tenant = org; resolve via subdomain |
| @better-auth/prisma-adapter | 1.7.2 | Better Auth Prisma integration | Create auth instance per tenant-scoped transaction |
| @simplewebauthn/server / browser | latest | WebAuthn MFA | |

## UI (web)

| Package | Version (target) | Purpose | Constraints |
|---|---|---|---|
| tailwindcss | 4.x | Styling | Tokens via CSS variables only |
| shadcn/ui | latest | Components | Generated into `packages/ui-web` |
| recharts | 2.x | Charts | |
| @tanstack/react-query | 5.x | Client data cache | Used with tRPC react adapter |

## UI (mobile)

| Package | Version (target) | Purpose | Constraints |
|---|---|---|---|
| react-native-paper / tamagui | TBD | Components | Decide in P0/P6 |
| expo-notifications | SDK | Push | |
| @tanstack/react-query | 5.x | Client cache | |

## Jobs / Infra

| Package | Version (target) | Purpose | Constraints |
|---|---|---|---|
| bullmq | 5.x | Background jobs | Redis required |
| ioredis | 5.x | Redis client | |
| nodemailer | 6.x | SMTP email | No external email SaaS |
| @aws-sdk/client-s3 | 3.x | Object storage | Path-prefixed by tenantId |
| zod-to-ts / @hookform/resolvers | latest | Form validation | |

## Notes

- Do not add a dependency without recording it here and confirming the existing stack is insufficient.
- Prefer official docs over training memory for Better Auth, Prisma 6, Next 16, Expo SDK 52, tRPC 11, PostgreSQL RLS.
