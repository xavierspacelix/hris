# HRIS Design System

> Source of truth for HRIS UI. Derived from the Figma **HRDashboard — HR Management Dashboard UI Kit** (Styleguide + Components). Reproduce the design language, not individual screens.

This document is the visual source of truth for the HRIS implementation. It is derived from the Figma **HRDashboard — HR Management Dashboard UI Kit** by inspecting the reusable Styleguide and Components sections rather than documenting individual application screens. The purpose is to help implementation agents reproduce the **design language**, not copy individual Figma screens pixel-for-pixel.

---

## 1. Design Direction

The product uses a **clean modern enterprise SaaS dashboard** visual language.

Primary characteristics:

- Professional and restrained rather than decorative.
- High information density without appearing cramped.
- White/light neutral surfaces with dark navy typography.
- Green as the primary brand and interaction accent.
- Small-to-medium border radii.
- Thin neutral borders.
- Soft hierarchy between page background, cards, controls, and content.
- Minimal use of shadows.
- Strong typography hierarchy.
- Compact controls appropriate for dashboard applications.
- Charts and status indicators use color purposefully rather than decoratively.
- Light and dark modes use the same structural hierarchy.
- Components should feel consistent across dashboard, CRUD, table, analytics, and HR management screens.

Avoid making the application look like:

- a marketing landing page,
- a highly rounded consumer mobile app,
- a glassmorphism interface,
- a heavily shadowed admin template,
- a colorful gradient-heavy dashboard,
- or a Material Design clone.

The intended feel is:

**modern enterprise HRIS + clean SaaS admin dashboard + data-oriented workspace.**

---

## 2. Typography

### Font Family

```css
font-family:
  "Manrope",
  ui-sans-serif,
  system-ui,
  -apple-system,
  BlinkMacSystemFont,
  "Segoe UI",
  sans-serif;
```

Primary font: **Manrope**. Observed weights: Regular 400, Medium 500, Semibold 600, Bold 700, ExtraBold 800 (sparingly). Do not introduce a second UI font unless required.

### Heading Scale

| Token | Size | Weight | Use |
|---|---:|---:|---|
| `heading-1` | 48px | 700 | Major standalone headings |
| `heading-2` | 40px | 700 | Large page/section heading |
| `heading-3` | 32px | 700 | Primary dashboard title |
| `heading-4` | 24px | 700 | Major card/section heading |
| `heading-5` | 20px | 700 | Section title |
| `heading-6` | 18px | 700 | Card heading |

For normal dashboard pages prefer 24–32px for the page title, not 40–48px everywhere.

### Body Scale

| Token | Size |
|---|---:|
| `body-xl` | 18px |
| `body-lg` | 16px |
| `body-md` | 14px |
| `body-sm` | 12px |
| `body-xs` | 10px |

Default body 14px/Regular; primary labels/important table values 14px/Medium or Semibold; small metadata 12px/Regular; avoid 10px except micro labels/chart annotations.

### Line Heights

48→58, 40→48, 32→40, 24→32, 20→28, 18→26, 16→24, 14→20, 12→18, 10→14.

### Typography Rules

Use weight before additional colors for hierarchy. Prefer Title / Secondary description / Metadata over multiple text colors. Do not make every card heading bold and oversized. Do not uppercase general navigation/headings (uppercase ok for compact status chips).

---

## 3. Color System

```css
--primary-500: #27A376;   /* green brand/interaction accent */
--neutral-900: #1A202C;   /* dark navy: primary text, strong buttons, dark surfaces */
```

Green: active nav, focus, selected controls, primary positive actions, selected checkboxes, progress, active switches, relevant chart series, success-adjacent UI. Do not flood large areas with green. Navy: primary text, strong buttons, dark sidebar, dark mode, high-emphasis actions.

## 4. Neutral Palette

```css
--gray-50:  #FAFAFA;
--gray-100: #F7FAFC;
--gray-200: #EDF2F7;
--gray-300: #E2E8F0;
--gray-400: #CBD5E0;
--gray-500: #A0AEC0;
--gray-600: #718096;
--gray-700: #4A5568;
--gray-800: #2D3748;
--gray-900: #1A202C;
```

Semantic mapping:

```css
--background: #FAFAFA;
--surface: #FFFFFF;
--surface-muted: #F7FAFC;
--border-subtle: #EDF2F7;
--border-default: #E2E8F0;
--border-strong: #CBD5E0;
--text-disabled: #A0AEC0;
--text-tertiary: #718096;
--text-secondary: #4A5568;
--text-primary: #1A202C;
```

## 5. Semantic Colors

```css
--success: #22C55E;
--warning: #FACC15;
--error:   #F75555;
--orange:  #FE964A;
--blue:    #0062FF;
--purple:  #8C62FF;
--white:   #FFFFFF;
```

Use blue/purple/orange/yellow for analytics, charts, category differentiation, informational states, avatars/status. Do not use them as competing brand colors. Red = negative/error/critical/destructive only.

## 6. Color Usage

Primary text `#1A202C`; secondary `#4A5568`; muted `#718096`; disabled `#A0AEC0`; default border `#E2E8F0`; page background `#FAFAFA`; card background `#FFFFFF`.

## 7. Spacing System

4px base unit. Scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64px. Most composition uses 8/12/16/20/24/32. Avoid 13/19/27/37px.

Compact inline 4–8px; icon-to-label 8px; label-to-input 6–8px; field groups 16–20px; card padding 20–24px; widget gap 16–24px; section gap 24–32px; page horizontal padding 24–32px desktop.

## 8. Border Radius

```css
--radius-xs: 4px;
--radius-sm: 6px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-pill: 9999px;
```

4–6px small chips/micro; 6–8px buttons/inputs; 8–12px cards/menus; pill for badges/avatar status. Avoid excessive 16–24px rounding.

## 9. Borders

Default `1px solid #E2E8F0`; subtle separator `1px solid #EDF2F7`; focus `1px solid #27A376`; error `1px solid #F75555`. Borders preferred over shadows for defining components.

## 10. Shadows

```css
--shadow-sm: 0 1px 2px rgba(26,32,44,0.04);
--shadow-md: 0 4px 12px rgba(26,32,44,0.06);
```

Use `shadow-md` mainly for dropdown menus, popovers, floating panels, dialogs. Do not apply to every dashboard card.

## 11. Buttons

Baseline: height 40–44px, padding-inline 16–20px, radius 6–8px, Manrope 14px Semibold. Primary: dark navy bg + white text, or green bg + white text (brand-positive). Secondary: white bg, neutral border, dark text. Disabled: light grey bg, muted text, no strong shadow. Destructive: error red deliberately. Icon buttons: 32/36/40px square, consistent sizing per toolbar.

## 12. Form Controls

Input: height 40–44px, radius 6–8px, padding 12–14px, 14px, neutral border; default white/`#1A202C`; placeholder `#A0AEC0`. Label 12–14px Medium/Semibold; required `*` in red. Focus: green border + `box-shadow: 0 0 0 2px rgba(39,163,118,0.10)`. Error: red border + 12px red helper text (never color alone). Disabled: bg `#EDF2F7`, text `#A0AEC0`.

## 13. Checkbox, Radio, Switch

Selected states use green. Checkbox: green bg + white check. Radio: green ring/dot. Switch: green active track. Inactive neutral grey. Dark mode keeps same semantics.

## 14. Cards

```css
background: #FFFFFF;
border: 1px solid #EDF2F7;
border-radius: 8px;
padding: 20px 24px;
/* optional box-shadow: 0 1px 2px rgba(26,32,44,0.04); */
```

Structure: Header (title, supporting text, optional action) → Content → optional footer. Card title 16–18px Semibold/Bold; metric 24–32px Bold. No decorative gradients.

## 15. Metric Cards

Label → large metric → delta/comparison → optional mini visualization. Metric dominates. Example: `Employees / 1,248 / +4.8% from last month`.

## 16. Avatars

Sizes 24/32/40/48/56px, circular. Fallback: initials on soft semantic bg. Status indicator overlaps edge; keep dot small.

## 17. Chips and Status Badges

Height 20–28px, padding 4–8px horizontal, light semantic bg + stronger semantic fg (not saturated full bg). Examples: Active, Approved, Pending, Rejected, On Leave, Completed. Same semantic = same color across screens.

## 18. Iconography

Line/solid, compact, geometric, monochrome, consistent stroke. Sizes: 16 dense/inline, 18 controls, 20 nav, 24 emphasis. Default `#4A5568`; emphasis `#1A202C`; active `#27A376`; disabled `#A0AEC0`. One library only: **Lucide** (or Phosphor/Iconoir — pick one, do not mix).

## 19. Navigation

Persistent desktop sidebar. Items: height 40–44px, radius 6–8px, icon 18–20px, gap 10–12px. Active = one indication only (green text/icon OR soft green bg OR green indicator), not all at once.

## 20. Sidebar

Width 240–260px (range 220–280). Background white/light or dark navy. Do not change width between pages.

## 21. Top Bar

Search, notifications, utilities, profile. Height 64–72px, quieter than content.

## 22. Page Layout

Shell = Sidebar + Main(Topbar + Page Content). Content padding 24–32px.

## 23. Dashboard Grid

Responsive 12-col conceptual grid. Layouts: 4+4+4, 3+3+3+3, 8+4, 6+6. Gap 16–24px. Align cards vertically.

## 24. Tables

Compact enterprise. Row height 44–52px. Header 12–14px Medium/Semibold muted/dark; body 14px. White surface, subtle horizontal separators, minimal vertical borders. Support selectable rows, status badges, action buttons, avatars, sorting, pagination, row count, compact controls. Icon buttons for row actions.

## 25. Pagination

Compact. Active = strong contrast/primary accent; inactive neutral. Provide prev/next/current/row count. Avoid large consumer-style controls.

## 26. Toasts

Icon + message + optional action + dismiss. success→green, info→blue, warning→yellow/orange, error→red. Mostly neutral/lightly tinted surface.

## 27. Notifications

Small icon/avatar + title + supporting text + timestamp + unread indicator. Restrained.

## 28. Tooltips, Dropdowns, Popovers

Radius 6–8px, subtle border, `shadow-md`, padding 8–12px. Dropdown item min height 36–40px. Hover bg neutral 50–100.

## 29. Charts and Data Visualization

Series order: green → blue → purple → orange → yellow. Red for negative/error/critical/destructive data only. Thin neutral grid `#EDF2F7`, axis/secondary labels `#718096`, Manrope labels, white card bg, compact legends, minimal axis decoration.

## 30. Progress

Height 4–8px rounded track. Track `#EDF2F7`; progress `#27A376`. Semantic colors where data requires.

## 31. Light Mode

page `#FAFAFA`, surface `#FFFFFF`, border `#E2E8F0`, text-primary `#1A202C`, text-secondary `#4A5568`, primary `#27A376`. Keep majority neutral; green is accent.

## 32. Dark Mode

```css
--dark-background: #1A202C;
--dark-surface: #2D3748;
--dark-border: #4A5568;
--dark-text: #FFFFFF;
--dark-muted: #A0AEC0;
```

Green `#27A376` retained (may lighten for contrast). Avoid pure black.

## 33. Responsive Behaviour

Same component language across breakpoints. Desktop: persistent sidebar, multi-column, dense tables. Tablet: collapsible sidebar, reduced grid, kept cards. Mobile: single column, collapsed nav, horizontal table overflow or alternate representation, touch-friendly. Breakpoints: 640/768/1024/1280/1536px.

## 34. Mobile Touch Targets

Min interactive area 40–44px; visible icon may stay 18–24px.

## 35. Interaction States

Every interactive component: default/hover/focus/active/disabled. Forms add error/success. Async adds loading. No default-only implementations.

## 36. Hover

Subtle neutral hover `background: #F7FAFC`. Primary actions slightly darken, no new color.

## 37. Focus

Keyboard focus visible. Neutral controls: dark/green focus ring. Form controls: green focus border + subtle green outer ring. Never remove outline without accessible replacement.

## 38. Disabled State

Reduce contrast, suppress hover/active, maintain legibility. No opacity-only on unreadable text.

## 39. Loading State

Spinner / skeleton / progress. Skeleton neutral 100–200, preserve layout.

## 40. Empty States

Optional icon, short title, one-sentence explanation, optional action. No oversized decoration in dense workflows.

## 41. Design Tokens

```css
:root {
  --color-primary: #27A376;
  --color-success: #22C55E;
  --color-warning: #FACC15;
  --color-error: #F75555;
  --color-blue: #0062FF;
  --color-purple: #8C62FF;
  --color-orange: #FE964A;
  --gray-50: #FAFAFA;
  --gray-100: #F7FAFC;
  --gray-200: #EDF2F7;
  --gray-300: #E2E8F0;
  --gray-400: #CBD5E0;
  --gray-500: #A0AEC0;
  --gray-600: #718096;
  --gray-700: #4A5568;
  --gray-800: #2D3748;
  --gray-900: #1A202C;
  --background: var(--gray-50);
  --surface: #FFFFFF;
  --text-primary: var(--gray-900);
  --text-secondary: var(--gray-700);
  --text-muted: var(--gray-600);
  --border-subtle: var(--gray-200);
  --border-default: var(--gray-300);
  --radius-xs: 4px;
  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
}
```

## 42. Component Density

Comfortable-compact. Avoid 60px rows / 32px button padding (too loose) and 28px controls / 10px text (too dense). Typical control ~40–44px height.

## 43. Hierarchy Principle

Page order: (1) title/purpose, (2) primary actions, (3) key metrics, (4) main content, (5) secondary metadata, (6) utility controls. Not everything equally prominent.

## 44. Data-Dense Screen Rules

Prefer tables, compact filters, inline statuses, toolbars, pagination, drawers/modals for secondary edits. Cards for KPIs/summaries/charts/small collections — not every record.

## 45. Filters

Compact toolbar above content: Search + Select filters + Date range + Status + secondary controls. Avoid permanent large filter forms unless required.

## 46. Search

Search icon, height 40px, concise placeholder (`Search employee...`, `Search attendance...`, `Search requests...`). No generic "Type something here...".

## 47. Modal

Header (title + optional description) / Body / Footer actions. Small confirmation 400–480px; form dialog 560–720px. No full-screen on desktop unless required.

## 48. Drawers

Contextual details preserving place in data-heavy screens (employee quick profile, request details, activity, filters). Don't replace all modals with drawers.

## 49. Accessibility

Readable contrast. State via color + label/icon/position. Icon-only controls need accessible names. Form controls need labels; error fields need descriptive messages.

## 50. Implementation Philosophy

Translate the Figma system into reusable primitives: Button, Input, Select, Checkbox, Switch, Badge, Avatar, Card, DataTable, Pagination, SidebarItem, PageHeader, MetricCard, ChartCard, Modal, Drawer, Toast — not page-specific copies.

## 51. Reuse Rules

Before adding a component: (1) check existing primitive; (2) add a variant for state/appearance difference; (3) create new only if structure/semantics differ. Do `<Button variant="primary"/>` not `SaveEmployeeButton`/`CreateDepartmentButton`/etc.

## 52. Do

Use Manrope; 4px spacing; restrained cards; green purposefully; navy for hierarchy; semantic colors consistently; borders over heavy shadows; compact tables; consistent icons; all interaction states; reuse primitives; grid/flex responsive layouts; same language across HR modules; whitespace to organize.

## 53. Don't

Don't copy individual Figma screens as one-offs; don't introduce arbitrary colors/sizes; don't use giant radii; don't add gradients/glassmorphism; don't heavy-shadow every card; don't mix icon sets; don't make all text bold or all cards identical emphasis; don't use saturated semantics as decorative bg; don't overuse green; don't look like a marketing page; don't create page-specific components; don't hardcode absolute positioning from screenshots.

## 54. Agent Instruction

When implementing a screen: (1) read this document first; (2) identify existing reusable components; (3) compose with the system, not Figma coordinates; (4) use mock data when backend not required; (5) preserve typography/colors/density/spacing/radius/hierarchy; (6) use original Figma only when this doc doesn't answer; (7) prefer system consistency over a conflicting Figma screen; (8) don't invent new patterns; (9) responsive must be structurally adaptive; (10) treat result as enterprise HR dashboard, not component showcase.

## 55. Source Confidence

Directly observed: Manrope, heading/body sizes, weights, primary/semantic/greyscale/accent colors, form/button/checkbox/radio/switch states, iconography, avatars, chips, progress, table patterns, pagination, toasts, notifications, light/dark treatment. Normalized/inferred: spacing token naming, line-heights, exact card padding/radius/shadow mapping, breakpoints, sidebar/modal dimensions, layout recommendations — intentionally conservative; prefer these over arbitrary values until a specific product rule exists.
