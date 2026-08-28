# Memory — HRIS Context Planning (web-only, design system finalized)

Last updated: 2026-08-28

## What was built

- `context/design-system.md`: full 55-section Figma HRDashboard spec (Manrope, green `#27A376`, navy `#1A202C`, gray scale, 4px spacing, radius 4–12px, charts, light/dark, responsive). Source of truth for all HRIS UI.
- `context/progress-tracker.md`, `context/build-plan.md`, `context/web-screens.md` (incl. Employee Self-Service section): all restructured around a **single Next.js web app** — no mobile client.
- All mobile/Expo references removed across AGENTS.md, README.md, architecture.md, project-overview.md, ui-registry/rules/tokens, versioning.md, prototype-instructions.md, library-docs.md, code-standards.md, features/*.
- Deleted `context/mobile-screens.md`, `context/release-update-rules.md`; renamed `employee-ss-mobile.md` → `employee-ss.md` (web).

## Decisions made

- **No native mobile app.** HRIS is one responsive Next.js 16 web app. Employee Self-Service is a role-scoped surface inside the same app (`/(tenant)/me`), server-scoped to the employee's own record + branch.
- Icon library = Lucide.
- **Build approach = UI-first, wire later.** P0 = scaffold monorepo + build the FULL UI on typed mock data (all screens, all roles). Real `packages/api` (tRPC) + `packages/db` (Prisma/RLS) implemented in a separate **Wiring** pass AFTER the UI is approved. Mock shapes match feature specs so swap is mechanical.
- Stack (web-only): Next 16 + tRPC + Prisma/PostgreSQL RLS + Better Auth + Tailwind/shadcn + BullMQ/Redis + Recharts + nodemailer(SMTP) + S3. Bun + Turborepo; CLI-only scaffolding.

## Problems solved

- None this session. (Prior: ssh push failed → fixed with `gh auth setup-git` + https.)

## Current state

- GitHub `https://github.com/xavierspacelix/hris` (public, `main`) holds AGENTS.md + README.md + context/*. No application code yet.
- Planning/design system complete. Latest commit removed all mobile scope.

## Next session starts with

- Start **P0: Scaffold + Full UI (mock data)** via CLI (network/installs needed):
  1. `bunx create-turbo@latest` (monorepo + turbo) at repo root.
  2. `bunx create-next-app@latest apps/web --ts --app --tailwind --eslint --src-dir --import-alias "@/*"`.
  3. Empty workspace packages: `packages/ui-web` (shadcn), `packages/db`, `packages/api` (logic deferred to Wiring pass).
  4. Apply design tokens (CSS variables from `design-system.md`), build app shell, then implement every screen (admin/manager/ESS) from `web-screens.md` using typed mocks.
- Do NOT write API/DB logic yet — that is the later Wiring pass.
- Awaiting user go-ahead before running scaffold (large installs).

## Open questions

- Is the Figma design-system spec the final word to build from, or will the user iterate in their design tool first?
- Confirm before running P0 scaffold.
