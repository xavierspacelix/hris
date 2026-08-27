# UI Rules

Derived from `design-system.md` + `ui-tokens.md`. These are the binding rules for building HRIS UI (web + mobile). The visual design comes from the Figma HRDashboard kit.

## Tokens & styling

1. Use CSS variables / token objects only. **No hardcoded hex, no raw Tailwind palette classes** in components.
2. Color role discipline: green = brand/interaction accent (active nav, focus, checks, progress, positive). Navy = primary text + strong actions. Red = error/destructive/critical only. Blue/purple/orange/yellow = analytics/category differentiation.
3. Typography = Manrope only. Use the `ui-tokens.md` scale; prefer weight over new colors. Do not uppercase general headings/nav.
4. Spacing from the 4px grid (4–64px). Radius: cards/menus 8–12px, inputs/buttons 6–8px, chips 4–6px or pill.
5. Borders + whitespace define components; `shadow-md` only on overlays, popovers, menus, dialogs.

## Controls

- Height 40–44px; 14px semibold text; 6–8px radius; 16–20px inline padding.
- Primary button: navy/white or green/white (brand-positive). Secondary: white, neutral border, navy text. Destructive: red, deliberate.
- Inputs: 40–44px, white, neutral border, placeholder `#A0AEC0`, label 12–14px medium. Focus uses green border + ring. Error: red border + descriptive helper text.
- Selected checkbox/radio/switch = green.
- Icon buttons: 32/36/40px square. Icon family: **Lucide** only. Sizes: 16 dense, 18 controls, 20 nav, 24 emphasis.
- Every interactive component ships default/hover/focus/active/disabled/loading; forms also error/success.

## Layout

- Persistent sidebar 240–260px (logo, grouped nav, account). Active = one treatment (green text/icon OR soft green bg OR green indicator), never all at once.
- Topbar 64–72px: search, notifications, tenant/branch context, profile.
- Main padding 24–32px. Responsive 12-col grid (4+4+4, 3+3+3+3, 8+4, 6+6); gaps 16–24px. No absolute screen layout.
- Filters in compact toolbars: search + selects + date range + status.

## Data display

- Tables: compact enterprise — white bg, subtle horizontal separators, 44–52px rows, 12–14px semibold headers, 14px body, selectable/sortable/paginated.
- Cards: white, `1px solid #EDF2F7`, 8px radius, 20–24px padding, optional `shadow-sm`. Metric cards: label + large value + delta.
- Status chips: 20–28px high, tinted semantic bg, labeled (Active, Approved, Pending, Rejected, On Leave, Completed).
- Charts: white card, thin `#EDF2F7` grid, `#718096` labels, series order green→blue→purple→orange→yellow, red only for negative. Progress = 4–8px track + semantic fill.

## Responsive & mobile

- Breakpoints 640/768/1024/1280/1536. Mobile: single column, collapsed nav, table overflow or alternate representation. Touch targets ~40–44px.
- Expo app reuses the same tokens via theme object; components mirror web semantics.

## Accessibility & states

- Communicate state with color **plus** label/icon/position. Icon-only controls need accessible names.
- Descriptive form errors; never remove focus outline without an accessible replacement.
- Skeletons use gray 100–200 and preserve layout. Empty states: optional icon, title, one sentence, optional action.

## Prohibited

- Hardcoded hex / raw Tailwind palette classes.
- Marketing pages, heavy radii, glassmorphism, gradients, Material clones, arbitrary decorative colors.
- Flooding surfaces with green; loud shadows on static cards.
