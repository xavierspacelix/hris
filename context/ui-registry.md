# UI Registry

Reusable component inventory for HRIS (web + mobile). Derived from `design-system.md`. Build each as a primitive with variants for visual/state differences; add a new component only when structure/semantics differ. Update this file (via `/imprint`) whenever a reusable component is added.

## Primitives

- **Button** — variants: primary (navy), positive (green), secondary (white/neutral), destructive (red), ghost; sizes sm/md/lg; states default/hover/focus/active/disabled/loading.
- **Input** — text/number/email; 40–44px; states default/focus/error/disabled; label + helper.
- **Select** — single/multi; compact toolbar variant for filters.
- **Checkbox / Radio / Switch** — selected = green.
- **DatePicker / DateRange** — filter toolbar use.
- **Badge / StatusChip** — tinted semantic bg + label (Active, Approved, Pending, Rejected, On Leave, Completed).
- **Avatar** — circular 24/32/40/48/56; initials fallback on soft semantic surface.
- **Card** — base surface + border + radius; header (title, support, action) / content / footer.
- **MetricCard** — label + value (24–32px bold) + delta/comparison + optional mini visual.
- ** DataTable** — compact rows 44–52px, sortable, selectable, pagination, toolbar, statuses, avatars, result count.
- **Pagination** — page size + page controls.
- **Toast** — icon + message + optional action + dismiss; semantic icon/color.
- **Modal** — confirmation 400–480px, forms 560–720px.
- **Drawer** — preserves context for data-heavy workflows.
- **Menu / Tooltip / Popover** — 6–8px radius, subtle border, `shadow-md`, items ≥36–40px.
- **Tabs** — section switching.
- **SidebarItem** — 40–44px, 18–20px icon, 6–8px radius, single active treatment.

## Composed patterns

- **PageHeader** — title (heading-3/4) + actions + optional branch filter (cross-branch roles only).
- **StatRow / MetricsGrid** — row of MetricCards.
- **FilterToolbar** — search + selects + date range + status.
- **TableCard** — Card wrapping a DataTable with toolbar.
- **ChartCard** — white card + title + chart (Recharts web / RN-chart mobile).
- **ApprovalRow** — item summary + Approve/Reject.
- **EmptyState** — icon + title + one sentence + optional action.
- **AuditRow** — actor + action + entity + time + diff.

## Mobile (Expo) equivalents

- **ScreenShell** — header + scroll body + bottom tabs.
- **ProfileField** — read/edit.
- **ClockButton** — in/out with GPS/photo.
- **PayslipCard** — breakdown + PDF.
- **LeaveRequestForm** — type/range/half-day/attachment.
- **NotificationItem** — list row + deep link.

## Variants rule

Add variants for visual/state differences (e.g. Button destructive). Do not fork a new component for a color change — use a variant. Keep one icon family (Lucide). Keep one type scale (Manrope, `ui-tokens.md`).
