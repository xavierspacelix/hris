# Design System

Source of truth for HRIS visual language. Every screen (web + mobile) must follow it. Components consume tokens from `ui-tokens.md`; never hardcode values.

## Principles

1. **Trustworthy & calm.** HR data is sensitive. Use generous whitespace, stable layouts, restrained color. No playful gradients or loud accents.
2. **Dense when needed.** HR screens are data-heavy (tables, payslips, org charts). Support compact density without losing readability.
3. **Accessible.** WCAG 2.1 AA minimum. Visible focus, 44px touch targets (mobile), AA contrast.
4. **Bahasa Indonesia** for all user-facing copy (labels, errors, empty states). Money/date use `id_ID` locale per tenant settings.
5. **Consistent tokens.** Color, type, spacing, radius, elevation come only from `ui-tokens.md`.
6. **Role-aware.** Cross-branch roles get branch filter controls; branch-scoped users never see them.

## Brand & Color

- Primary: a confident blue (`--color-primary`), used for primary actions, active nav, links.
- Neutrals: near-white bg, white surface, muted border, two text tones (default + muted).
- Semantic: success (green), warning (amber), danger (red), info (blue), branch (violet, for branch scoping affordances).
- Dark mode: token-driven; same variables, inverted surfaces.

## Typography

- Typeface: Inter (web) / system RN font (mobile). Mono (JetBrains Mono) for amounts, IDs, codes.
- Scale (1.25 ratio): display 28 / heading 20 / subheading 16 / body 14 / caption 12.
- Weight: 600 for headings, 500 for emphasis, 400 body.

## Spacing & Layout

- 4px base grid. Common gaps: 4 / 8 / 12 / 16 / 24 / 32.
- Web: top app bar + left sidebar (role-based nav). Full-width content, max readable width for forms.
- Mobile: bottom tab bar (Employee Self-Service), stack screens, safe-area aware.

## Radius & Elevation

- Radius: sm 6 / md 10 / lg 16.
- Shadow: sm (subtle), md (card), lg (modal/overlay).

## Components

- Web: shadcn/ui primitives (Button, Input, Select, Table, Dialog, Tabs, Card, Badge, Avatar, Toast, DatePicker, MultiSelect). Composed patterns in `ui-registry.md`.
- Mobile: RN components (ScreenShell, ProfileField, ClockButton, PayslipCard, LeaveRequestForm, NotificationItem). Themed via the same tokens mapped to RN style objects.

## Data Visualization

- Recharts for web dashboards (line/bar/composed). Consistent palette from tokens.
- Charts must have titles, legends, and empty states.

## Iconography

- Lucide (web) / lucide-react-native (mobile). One icon set only.

## Theming

- All tokens defined as CSS variables on `:root` (web) and a theme object (mobile).
- Theme switching (light/dark, tenant accent) changes variables only — never component code.

## Do / Don't

- DO: use tokens, provide empty/loading states, label actions clearly in Indonesian, right-align numbers.
- DON'T: hardcode hex, use raw Tailwind palette classes, mix type scales, put destructive action without confirmation.
