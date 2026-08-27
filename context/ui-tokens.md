# UI Tokens

Generated from `design-system.md` (Figma **HRDashboard — HR Management Dashboard UI Kit**). Source of truth = `design-system.md`; this file is the consumable token table. Use CSS variables on `:root` (web) and a matching theme object (mobile). Never hardcode values.

## Typography

Family: Manrope (web) / system fallback (mobile). Weights 400/500/600/700/800.

| Token | Size | Weight | Use |
|---|---:|---:|---|
| heading-1 | 48px | 700 | Standalone hero |
| heading-2 | 40px | 700 | Large section |
| heading-3 | 32px | 700 | Dashboard/page title |
| heading-4 | 24px | 700 | Major section |
| heading-5 | 20px | 700 | Section title |
| heading-6 | 18px | 700 | Card title |
| body-xl | 18px | 400 | Large body |
| body-lg | 16px | 400 | Body |
| body-md | 14px | 400 | Default body |
| body-sm | 12px | 400 | Metadata |
| body-xs | 10px | 400 | Micro labels |

Line heights: 48/58, 40/48, 32/40, 24/32, 20/28, 18/26, 16/24, 14/20, 12/18, 10/14. Prefer weight before new color.

## Color — Brand / Semantic

```css
--primary-500: #27A376;   /* green: active nav, focus, checks, progress, positive */
--success: #22C55E;
--warning: #FACC15;
--error: #F75555;         /* negative/destructive/critical only */
--orange: #FE964A;
--blue: #0062FF;
--purple: #8C62FF;
--white: #FFFFFF;
```

## Color — Neutrals

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

## Color — Surface / Text

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
--text-primary: #1A202C;  /* navy: primary text, strong buttons */
```

## Spacing (4px grid)

4, 8, 12, 16, 20, 24, 32, 40, 48, 64px. No arbitrary values.

## Radius

```css
--radius-xs: 4px;
--radius-sm: 6px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-pill: 9999px;
```

## Shadow

```css
--shadow-sm: 0 1px 2px rgba(26,32,44,0.04);
--shadow-md: 0 4px 12px rgba(26,32,44,0.06);  /* overlays/popovers/menus/dialogs only */
```

## Focus

Green: `0 0 0 2px rgba(39,163,118,0.10)` + `--primary-500` border.

## Breakpoints

640, 768, 1024, 1280, 1536px. Desktop keeps sidebar + dense tables; tablet collapses sidebar; mobile single column.

## Dark theme

```css
--background: #1A202C;
--surface: #2D3748;
--border-default: #4A5568;
--text-primary: #FFFFFF;
--text-tertiary: #A0AEC0;
/* green semantics retained */
```

## Mobile mapping

Map the same tokens to an RN theme object: `colors.primary`, `colors.textPrimary`, etc.; `spacing` scale; `radius`; `fontFamily: 'Manrope'`. Touch targets ~40–44px.
