# Prototype Instructions (Agent)

How the agent builds the HRIS UI **prototype first** — before any backend logic. The goal is a navigable, visually verified UI on mock data, matching the Design System. No API, no DB, no auth wiring during prototyping.

> Note: "opendesign" = build the prototype as an open, reviewable artifact (working screens with mock data) that the user can see and correct early. If a dedicated design tool (Figma, etc.) is preferred, point the agent at its export; otherwise the prototype is the real component tree with mocked props.

## When

- Run during each phase, before the matching implementation work (see `build-plan.md`).
- Build-plan principle: *"Full page UI built with mock data first — verified visually before any logic is written."*

## Inputs to read first

1. `context/design-system.md` (principles only)
2. `context/web-screens.md` or `context/mobile-screens.md` (the screen list for the current phase)
3. The active phase's `context/features/*.md` and `context/build-plan.md`

> Do **not** read `ui-tokens.md`, `ui-rules.md`, `ui-registry.md` as source of truth yet. The user designs in their own design tool; after the prototype is approved, those UI context files are regenerated from it. The agent translates the design-tool output into components.

## Workflow

1. **Read the design system + the feature spec.** Extract the exact screens, fields, and states.
2. **Mock data only.** Create typed mock fixtures in a `mocks/` or `__mocks__/` module. No `fetch`, no Prisma, no env secrets.
3. **Build screens with real components.** Use shadcn (web) / RN components (mobile) styled by tokens. Wire navigation between prototype screens.
4. **Cover all states.** Loading, empty, error, success, disabled, and role differences (cross-branch vs branch-scoped).
5. **Self-review against rules.** Tokens only, Indonesian copy, accessible, responsive (web) / safe-area (mobile).
6. **Visual verification.** Run the dev server / Expo and confirm each screen renders. Iterate until the user approves the look.
7. **Only after approval**, proceed to wire real data (API/DB) per the feature spec.

## Per-phase prototype scope

| Phase | Screens to prototype (web unless noted) |
|---|---|
| P0 | Login, tenant onboarding, dashboard shell, branch switcher, audit log viewer, mobile auth/tab shell |
| P1 | People list + profile, org chart, document vault |
| P2 | Attendance clock-in/timesheet, leave list + request + approval |
| P3 | Benefits enrollment, payroll run + payslip |
| P4 | Requisition/posting, applicant pipeline, onboarding checklist, offboarding |
| P5 | Goals, review cycle, feedback |
| P6 | Manager self-service pages; mobile ESS full (profile, clock, leave, payslip, benefits, goals, docs) |
| P7 | Project board/backlog/roadmap, reports dashboards, notifications center |

## Rules (strict)

- Never hardcode colors/sizes — use tokens.
- Mock data must match the field shapes in the feature spec so swap-to-real is mechanical.
- No business logic, no auth checks, no API calls in prototype code.
- Keep prototype and real code in the same component files where possible (toggle data source later), not throwaway copies.
- If a screen's requirements are unclear or "TBC", stop and ask — do not invent scope.

## Handoff

After approval, the same components are reused for implementation. The prototype becomes the UI layer; only the data source changes from mock to `packages/api`.
