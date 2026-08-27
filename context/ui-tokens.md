# UI Tokens

Design tokens as CSS variables. Components MUST use these, never raw hex or Tailwind palette classes.

## Semantic colors (web + mobile)
```css
:root {
  --color-bg: #f7f8fa;
  --color-surface: #ffffff;
  --color-surface-muted: #eef1f5;
  --color-border: #d8dee6;
  --color-text: #1a2230;
  --color-text-muted: #5b6675;
  --color-primary: #2f6df6;
  --color-primary-hover: #255bd6;
  --color-success: #1f9d6b;
  --color-warning: #d9930a;
  --color-danger: #d9483b;
  --color-info: #2f6df6;
  --color-branch: #7a5cf0;
}
```

## Spacing scale
`--space-1: 4px` … `--space-8: 32px`. Use 4px base grid.

## Radius
`--radius-sm: 6px; --radius-md: 10px; --radius-lg: 16px;`

## Typography
- Font: system UI stack / Inter. Base 14px, scale 1.25.
- Roles: display, heading, body, caption.

## Elevation
`--shadow-sm`, `--shadow-md`, `--shadow-lg` defined as soft shadows.

## Status
success / warning / danger / info map to the semantic colors above.

Mobile tokens mirror these via a theme object consumed by the RN component lib.
