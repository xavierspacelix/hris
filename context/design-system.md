# HR Dashboard Design System

Visual source of truth for HR Dashboard implementation. Derived from Figma **HRDashboard — HR Management Dashboard UI Kit** Styleguide and Components. Reproduce design language; do not copy individual screens pixel-for-pixel.

## Design Direction

Clean modern enterprise SaaS dashboard: professional, restrained, data-oriented, high-density without cramped layouts. Use white/light neutral surfaces, dark navy typography, green interaction accent, restrained radii, thin borders, minimal shadows, strong typography hierarchy, compact controls, purposeful charts/status colors.

Avoid marketing pages, highly rounded consumer UI, glassmorphism, heavy-shadow templates, gradients, Material clones, or arbitrary decorative colors.

## Typography

```css
font-family: "Manrope", ui-sans-serif, system-ui, -apple-system,
  BlinkMacSystemFont, "Segoe UI", sans-serif;
```

Use Manrope only. Weights: 400 regular, 500 medium, 600 semibold, 700 bold, 800 sparingly.

| Token | Size | Weight | Use |
| --- | ---: | ---: | --- |
| heading-1 | 48px | 700 | Exceptional standalone heading |
| heading-2 | 40px | 700 | Large section heading |
| heading-3 | 32px | 700 | Dashboard/page title |
| heading-4 | 24px | 700 | Major section |
| heading-5 | 20px | 700 | Section title |
| heading-6 | 18px | 700 | Card title |
| body-xl | 18px | 400 | Large body |
| body-lg | 16px | 400 | Body |
| body-md | 14px | 400 | Default body |
| body-sm | 12px | 400 | Metadata |
| body-xs | 10px | 400 | Micro labels only |

Default line heights: 48/58, 40/48, 32/40, 24/32, 20/28, 18/26, 16/24, 14/20, 12/18, 10/14. Prefer weight before new colors. Do not uppercase general headings/navigation.

## Colors

```css
--primary-500: #27A376;
--success: #22C55E;
--warning: #FACC15;
--error: #F75555;
--orange: #FE964A;
--blue: #0062FF;
--purple: #8C62FF;
--white: #FFFFFF;

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
```

Primary green is brand/interaction accent: active navigation, selected controls, focus, positive actions, checkboxes, progress, switches, relevant chart series. Do not flood surfaces with green. Navy is primary text, strong buttons, dark surfaces, and high-emphasis actions.

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

Use blue, purple, orange, yellow for analytics/category differentiation. Red means negative, error, critical, or destructive data only. Semantic state colors must be consistent across screens.

## Spacing, Radius, Borders, Shadows

4px base grid. Use 4, 8, 12, 16, 20, 24, 32, 40, 48, 64px; avoid arbitrary spacing values.

```css
--radius-xs: 4px;
--radius-sm: 6px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-pill: 9999px;
--shadow-sm: 0 1px 2px rgba(26, 32, 44, 0.04);
--shadow-md: 0 4px 12px rgba(26, 32, 44, 0.06);
```

Cards/menus use 8–12px radius; inputs/buttons use 6–8px; chips use 4–6px or pill. Default border: `1px solid #E2E8F0`; subtle separator: `1px solid #EDF2F7`. Borders and whitespace define components. Use `shadow-md` only for overlays, popovers, menus, and dialogs.

## Buttons And Controls

Controls are compact: 40–44px high, 14px semibold text, 16–20px inline padding, 6–8px radius. Primary buttons use navy/white or green/white where brand-positive. Secondary buttons use white, neutral border, navy text. Disabled controls use grey surface and readable muted text. Destructive controls use red deliberately.

Icon buttons: 32, 36, or 40px square. Use a single icon family: Lucide. Icon sizes: 16px dense inline, 18px controls, 20px navigation, 24px emphasis.

Inputs: 40–44px high, 12–14px inline padding, 14px text, white surface, neutral border. Placeholder `#A0AEC0`. Labels use 12–14px medium/semibold. Focus uses green border with `0 0 0 2px rgba(39, 163, 118, 0.10)`. Error fields require red border plus descriptive red helper text or icon. Disabled inputs use `#EDF2F7` surface.

Selected checkboxes/radios/switches use primary green. Every interactive component supports default, hover, focus, active, disabled, loading; forms additionally support error and success where needed.

## Components

Base card: white surface, `1px solid #EDF2F7`, 8px radius, 20px/24px padding, optional `shadow-sm`. Structure: header (title, support, action), content, optional footer. Card titles are 16–18px semibold/bold. Metrics are 24–32px bold.

Metric cards: label, large value, delta/comparison, optional miniature visual. Value dominates. Avoid decorative gradients.

Avatars are circular: 24, 32, 40, 48, 56px. Fallback uses initials with soft semantic surface. Status chips are 20–28px high with 4–8px horizontal padding and lightly tinted semantic backgrounds; include labels such as Active, Approved, Pending, Rejected, On Leave, Completed.

Tables are compact enterprise surfaces: white background, subtle horizontal separators, few vertical lines, 44–52px rows, 12–14px semibold headers, 14px body. Support selectable rows, statuses, avatars, sorting, actions, pagination, result counts, and compact toolbar controls. Prefer tables for dense records; use cards for summaries/charts/small entity collections.

Toasts: icon, message, optional action, dismiss. Neutral/lightly tinted surface; semantic icon/color. Menus, tooltips, popovers: 6–8px radius, subtle border, `shadow-md`, 8–12px padding, items at least 36–40px high. Modals: confirmation 400–480px, forms 560–720px. Drawers preserve context for data-heavy workflows.

## Navigation And Layout

Persistent desktop sidebar: 240–260px wide, logo, compact grouped nav, account/utility area. Navigation items: 40–44px high, 6–8px radius, 18–20px icons, 10–12px icon gap. Active state has one clear treatment: green text/icon, soft green background, or green indicator; never all simultaneously.

Topbar is 64–72px and quieter than content. It can include search, notifications, tenant/branch context, profile. Main content padding is 24–32px. Use responsive grid, conceptually 12 columns: 4+4+4, 3+3+3+3, 8+4, 6+6. Gaps: 16–24px. Do not absolute-position screen layout.

Filters appear in compact toolbars: search, selects, date range, status, secondary controls. Search has icon, 40px height, concise contextual placeholder.

## Data Visualization

Charts use white cards, thin `#EDF2F7` grid lines, muted `#718096` labels, compact legends, minimal axis decoration, Manrope typography. Series order: green, blue, purple, orange, yellow. Red only for negative/critical series. Progress uses 4–8px rounded neutral track with semantic fill.

## Themes And Responsive Behavior

Light: page `#FAFAFA`, surface white, border `#E2E8F0`, primary text `#1A202C`, secondary text `#4A5568`, green accent. Dark foundation: background `#1A202C`, surface `#2D3748`, border `#4A5568`, text white, muted `#A0AEC0`; retain green semantics. Do not use pure black.

Breakpoints: 640, 768, 1024, 1280, 1536px. Desktop retains sidebar and dense tables; tablet collapses sidebar/reduces grid; mobile uses one column and collapsed navigation with table overflow/alternative representation. Keep touch targets around 40–44px.

## Accessibility And States

Maintain readable contrast and communicate state with color plus label, icon, or position. Icon-only controls need accessible names. Forms need labels and descriptive errors. Hover is subtle (`#F7FAFC` on neutral controls). Never remove focus outline without accessible replacement. Disabled state suppresses hover/active but remains legible. Skeletons use gray 100–200 and preserve layout. Empty states are compact: optional icon, title, one sentence, optional action.

## Implementation Rules

Use CSS variables/tokens only: no hardcoded hex or raw Tailwind palette classes in components. Build reusable primitives and variants: Button, Input, Select, Checkbox, Switch, Badge, Avatar, Card, DataTable, Pagination, SidebarItem, PageHeader, MetricCard, ChartCard, Modal, Drawer, Toast. Add variants for visual/state differences; add a new component only where structure/semantics differ. Compose responsive flex/grid layouts, mock backend-less prototypes when required, and prioritize system consistency over one-off Figma coordinates.
