# Garage Sale — Design Guide

## Philosophy: "Calm Command Center"

A professional, data-dense tool for managing a moving sale. No fluff, no decoration, no colored gradients. The interface should feel like a **custom-built professional tool**, not a default Tailwind app.

---

## 1. Color Palette: Slate & Sage

| Role | Color | OKLCH | Usage |
| :--- | :--- | :--- | :--- |
| **Background** | Slate-50 | `oklch(0.98 0.001 286.375)` | Main canvas, clean and non-distracting |
| **Sidebar** | Slate-900 | `oklch(0.141 0.005 285.823)` | Strong anchor, high contrast for navigation |
| **Primary Text** | Slate-900 | `oklch(0.141 0.005 285.823)` | Maximum legibility |
| **Secondary Text** | Slate-500 | `oklch(0.552 0.016 285.938)` | Metadata, sub-lines, muted information |
| **Accent (Action)** | Sage-600 | `oklch(0.4 0.015 65)` | Buttons, active states, success indicators |
| **Borders** | Slate-200 | `oklch(0.92 0.004 286.32)` | Hairline dividers, subtle structure |
| **Hover/Focus** | Slate-100 | `oklch(0.97 0.001 286.375)` | Interactive states |

---

## 2. Typography System

### Font Stack
- **Primary (UI/Labels):** `Geist Sans` (via Google Fonts)
  - Weights: 400 (Regular), 500 (Medium), 600 (Semibold)
  - Tracking: Tight (`-0.01em`)
  - Line-height: 1.4 (compact)

- **Secondary (Data/Numbers):** `JetBrains Mono` (via Google Fonts)
  - Weights: 400 (Regular)
  - Size: `11px` or `12px` for prices, dates, status chips
  - Line-height: 1.2 (very tight)

### Scale & Hierarchy
| Role | Size | Weight | Usage |
| :--- | :--- | :--- | :--- |
| **Page Title** | `20px` | 600 | Dashboard, Inventory headers |
| **Section Header** | `14px` | 600 | "Pra fazer agora", "Hoje", etc. |
| **Primary Content** | `13px` | 400 | Item titles, buyer names, message text |
| **Secondary Content** | `12px` | 400 | Metadata, timestamps, descriptions |
| **Data (Mono)** | `11px` | 400 | Prices (`R$ 1.500`), dimensions, status |
| **Label/Badge** | `11px` | 500 | Status chips, category tags |

---

## 3. Layout & Structure

### Master Layout
- **Sidebar:** Fixed left, `240px` wide, `Slate-900` background, white text
- **Header:** Top bar with breadcrumb or title, `Slate-50` background, `1px` bottom border
- **Main Content:** Flex-grow area, `Slate-50` background, generous padding
- **Side Drawer:** Overlay on right, `Slate-50` background, sharp edge (no rounded corners on drawer edge)

### Spacing System
- **Micro:** `4px` (between inline elements)
- **Small:** `8px` (between components)
- **Medium:** `12px` (between sections)
- **Large:** `16px` (between major blocks)
- **XL:** `24px` (page margins)

### Borders & Corners
- **Radius:** `2px` (small, precise) or `0px` (no radius for a "tool" feel)
- **Borders:** `1px solid` using `Slate-200` for all dividers
- **Shadows:** None. Depth is created through color shifts and borders.

---

## 4. Component Details

### Buttons
- **Primary Action:** `Sage-600` background, white text, `2px` radius, no shadow
- **Secondary Action:** `Slate-100` background, `Slate-900` text, `1px` border `Slate-200`, `2px` radius
- **Text Button:** No background, `Sage-600` text, underline on hover
- **Size:** Small (`8px 12px`), Medium (`10px 16px`), Large (`12px 20px`)
- **Font:** Geist Sans, `12px`, weight 500

### Inputs & Forms
- **Border:** `1px solid Slate-200` (bottom border only, or full border)
- **Focus Ring:** `2px solid Sage-600` (no blur)
- **Background:** `Slate-50` or white
- **Placeholder:** `Slate-400` text
- **Font:** Geist Sans, `13px`, weight 400

### Status Chips
- **Style:** Border + text (ghost style), not solid background
- **Available:** `Sage-600` border, `Sage-600` text
- **Reserved:** `Slate-400` border, `Slate-400` text
- **Sold:** `Slate-600` border, `Slate-600` text, strikethrough text
- **Draft:** `Slate-300` border, `Slate-400` text, italic

### Tables & Dense Data
- **Header Row:** `Slate-100` background, `Slate-900` text, `12px` font, weight 600
- **Data Row:** `Slate-50` background, `Slate-900` text, `13px` font, weight 400
- **Row Divider:** `1px solid Slate-200`
- **Hover State:** `Slate-100` background (subtle, no animation)
- **Padding:** `8px` vertical, `12px` horizontal

### Cards & Containers
- **Background:** White or `Slate-50`
- **Border:** `1px solid Slate-200` (all sides)
- **Radius:** `2px`
- **Padding:** `16px`
- **Shadow:** None

---

## 5. Interaction & Motion

### Transitions
- **Duration:** `75ms` (very fast, snappy)
- **Easing:** `ease-out` for most interactions
- **Avoid:** Bouncy animations, spring effects, long delays

### Hover & Focus States
- **Buttons:** Slight background color shift (`Slate-100` → `Slate-200`)
- **Links:** Underline appears on hover
- **Rows/Cards:** Background shifts to `Slate-100`
- **Focus Ring:** `2px solid Sage-600` (visible on all interactive elements)

### Side Drawer
- **Animation:** Slide in from right, `150ms`, `ease-out`
- **Backdrop:** Semi-transparent `Slate-900` with `40%` opacity
- **Edge:** Sharp, no rounded corners on the drawer edge

---

## 6. Accessibility & Contrast

- **Minimum Contrast Ratio:** 4.5:1 for all text (WCAG AA)
- **Focus Indicators:** Always visible, `2px` ring
- **Keyboard Navigation:** Tab order follows visual flow
- **Semantic HTML:** Use proper heading hierarchy, ARIA labels where needed

---

## 7. Anti-Patterns (What NOT to Do)

- ❌ Centered layouts (use sidebar + main area)
- ❌ Purple gradients (use Slate & Sage)
- ❌ Uniform rounded corners (use `2px` or `0px`)
- ❌ Inter font for everything (use Geist Sans + Geist Mono)
- ❌ Shadows for depth (use borders and color shifts)
- ❌ Bouncy animations (use `75ms` snappy transitions)
- ❌ Decorative emojis or icons (use Lucide icons only)
- ❌ Colored gradients (use solid colors)
- ❌ 3D charts (use flat, data-focused visualizations)

---

## 8. Implementation Checklist

- [ ] Import Geist Sans and Geist Mono from Google Fonts
- [ ] Update `client/src/index.css` with Slate & Sage OKLCH values
- [ ] Create Tailwind config overrides for custom spacing and radius
- [ ] Build sidebar component with Slate-900 background
- [ ] Build button components with Sage-600 accent
- [ ] Build table component with hairline borders
- [ ] Build side drawer with overlay and slide animation
- [ ] Test contrast ratios for all text
- [ ] Test keyboard navigation and focus states
