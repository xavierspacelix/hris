# UI Rules

1. No hardcoded hex or raw Tailwind palette classes in any component. Use tokens from `ui-tokens.md`.
2. Web components come from `packages/ui-web` (shadcn-generated). Do not hand-roll primitives already there.
3. Forms use react-hook-form + Zod; server validation is the source of truth.
4. Tables: server-side pagination for any list > 50 rows; show tenant/branch context in headers.
5. Cross-branch roles get a branch filter control; branch-scoped users never see it.
6. Loading and empty states are mandatory for every data view.
7. Destructive actions require a confirmation dialog and an audit entry.
8. PII fields are masked in lists; full value only on detail view with permission.
9. Mobile: bottom-tab navigation; actions reachable in ≤3 taps; respect safe-area insets.
10. Accessibility: keyboard nav, focus rings, minimum 44px touch targets on mobile.
11. Numbers/currency use tenant locale + currency from tenant settings.
12. Dates use tenant timezone.
