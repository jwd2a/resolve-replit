# Resolve App - UI Design Specifications
## For Bubble Implementation

---

**Table of Contents**
- [1. Color Palette](#1-color-palette)
- [2. Typography](#2-typography)
- [3. Spacing System](#3-spacing-system)
- [4. Layout Components](#4-layout-components)
- [5. UI Components](#5-ui-components)
- [6. Interactive Elements](#6-interactive-elements)
- [7. Page-Specific Components](#7-page-specific-components)
- [8. Animations & Transitions](#8-animations--transitions)

---

## 1. Color Palette

### Brand Colors
| Name | Hex Code | Example Usage |
| ---- | -------- | ------------- |
| Primary Purple | `#2e1a87` | Primary buttons, headings |
| Secondary Purple | `#25156d` | Button hover states |

### Neutral Colors
| Name | Hex Code | Example Usage |
| ---- | -------- | ------------- |
| White | `#ffffff` | Page backgrounds, cards |
| Gray-50 | `#f9fafb` | Alternative backgrounds |
| Gray-100 | `#f3f4f6` | Borders, dividers |
| Gray-200 | `#e5e7eb` | Borders, dividers, disabled states |
| Gray-300 | `#d1d5db` | Borders, form inputs |
| Gray-400 | `#9ca3af` | Placeholder text, icons |
| Gray-500 | `#6b7280` | Secondary text |
| Gray-600 | `#4b5563` | Primary text |
| Gray-700 | `#374151` | Headings, labels |
| Gray-800 | `#1f2937` | Prominent text |
| Gray-900 | `#111827` | Headings, important text |

### Functional Colors
| Name | Hex Code | Example Usage |
| ---- | -------- | ------------- |
| Success BG | `#ecfdf5` | Success message backgrounds |
| Success Border | `#d1fae5` | Success borders |
| Success Icons | `#059669` | Success icons |
| Success Text | `#047857` | Success text |
| Warning BG | `#fffbeb` | Warning backgrounds |
| Warning Border | `#fef3c7` | Warning borders |
| Warning Light | `#fde68a` | Warning indicators |
| Warning Medium | `#fcd34d` | Interactive elements (Initial tag) |
| Warning Dark | `#fbbf24` | Interactive elements hover |
| Warning Text | `#92400e` | Warning text, "Initial Here" text |
| Info BG | `#eff6ff` | Selected options background |
| Info Border | `#93c5fd` | Selected options border |
| Info Text | `#2563eb` | Selected options text |
| Error BG | `#fef2f2` | Error backgrounds |
| Error Border | `#fee2e2` | Error borders |
| Error Icons | `#dc2626` | Error icons |
| Error Text | `#b91c1c` | Error text |

---

## 2. Typography

### Font Stacks
- **UI Text**: System font stack (for most interface elements)
- **Document Text**: Serif font (for legal document content)
- **Signature Fonts**:
  - "Dancing Script" (Handwritten 1)
  - "Pacifico" (Handwritten 2)
  - "Caveat" (Casual)
  - "Homemade Apple" (Elegant)

### Text Sizes & Weights
| Element | Size | Weight | Color | Line Height |
| ------- | ---- | ------ | ----- | ----------- |
| Page Title | 30px (1.875rem) | Bold (700) | #2e1a87 | 1.25 |
| Section Header | 20px (1.25rem) | Semibold (600) | #1f2937 | 1.25 |
| Subsection Header | 18px (1.125rem) | Medium (500) | #374151 | 1.25 |
| Body Text | 16px (1rem) | Normal (400) | #4b5563 | 1.5 |
| Secondary Text | 14px (0.875rem) | Normal (400) | #6b7280 | 1.5 |
| Small Text/Labels | 12px (0.75rem) | Medium (500) | #6b7280 | 1.5 |

---

## 3. Spacing System

### Padding/Margins
- **Container Padding**: 24px (1.5rem)
- **Section Spacing**: 32px (2rem) margin bottom between major sections
- **Element Spacing**: 16px (1rem) between related elements
- **Form Field Spacing**: 24px (1.5rem) between form field groups
- **Button Padding**: 8px 16px (0.5rem 1rem)
- **Card Padding**: 24px (1.5rem)

### Container Sizes
- **Page Width**: Maximum 896px (56rem)
- **Modal Width**: Maximum 448px (28rem)

### Border Radius
- **Small Elements**: 4px (0.25rem)
- **Medium Elements**: 6px (0.375rem) 
- **Cards & Containers**: 8px (0.5rem)
- **Pills & Tags**: Full rounded (9999px)

---

## 4. Layout Components

### Navigation Menu
- **Appearance**: White background with bottom border
- **Height**: 56px
- **Logo Placement**: Left-aligned
- **Menu Items**: Horizontal center-aligned
- **User Menu**: Right-aligned

### Page Layout
- **Centered container** with max-width of 896px
- **Vertical spacing** between sections of 32px
- **Page padding** of 16px on small screens, 24px on larger screens

### Card Container
- **White background**
- **Light shadow** (box-shadow: 0 1px 2px rgba(0,0,0,0.05))
- **Border**: 1px solid #e5e7eb
- **Border radius**: 8px
- **Padding**: 24px

---

## 5. UI Components

### Buttons

#### Primary Button
- **Background**: #2e1a87
- **Hover Background**: #25156d
- **Text Color**: White
- **Padding**: 8px 16px
- **Border Radius**: 6px
- **Font Weight**: Medium (500)
- **Disabled State**: 50% opacity, not clickable

#### Outline Button
- **Background**: White
- **Border**: 1px solid #d1d5db
- **Text Color**: #4b5563
- **Hover Background**: #f9fafb
- **Hover Text Color**: #1f2937
- **Padding**: 8px 16px
- **Border Radius**: 6px
- **Font Weight**: Medium (500)

#### Ghost Button
- **Background**: Transparent
- **Text Color**: #4b5563
- **Hover Background**: #f3f4f6
- **Padding**: 8px 16px
- **Border Radius**: 6px
- **Font Weight**: Medium (500)

### Form Elements

#### Radio/Toggle Options
- **Container**: Flex layout with 8px gap
- **Individual Option**:
  - Border: 1px solid #e5e7eb
  - Border Radius: 6px
  - Padding: 6px 12px
  - Display: Flex with items centered
  - Gap: 8px
- **Selected Option**:
  - Background: #eff6ff
  - Border: 1px solid #93c5fd
  - Text Color: #2563eb

#### Text Input
- **Border**: 1px solid #d1d5db
- **Border Radius**: 6px
- **Padding**: 8px
- **Focus**: 2px outline #93c5fd
- **Font Size**: 14px
- **Label**: 14px, medium weight, #374151
- **Placeholder**: #9ca3af

### Status Indicators

#### Badge
- **Background**: Contextual (e.g., #ecfdf5 for success)
- **Border**: Contextual (e.g., 1px solid #d1fae5 for success)
- **Text**: Contextual (e.g., #047857 for success)
- **Border Radius**: Full rounded
- **Padding**: 4px 8px
- **Font Size**: 12px
- **Font Weight**: Medium (500)
- **Display**: Inline-flex with items centered

---

## 6. Interactive Elements

### Initial Tags
- **Default State**:
  - Background: #fcd34d
  - Text: "Initial Here" in #92400e
  - Font Size: 12px
  - Font Weight: Medium (500)
  - Padding: 4px 8px
  - Border Radius: 6px
  - Shadow: Subtle
  - Cursor: Pointer
- **Hover State**:
  - Background: #fbbf24
- **Applied State**:
  - Background: #fef3c7
  - Contains user's initials centered
  - Height: 32px
  - Cursor: Default

### Signature Field
- **Default State**:
  - Border: 1px solid #e5e7eb
  - Background: White
  - Border Radius: 6px
  - Height: 80px
  - Contains "Sign Here" button on right side
  - Text: "Click 'Sign Here' to add your signature"
  - Text Color: #9ca3af
- **Completed State**:
  - Contains user's signature centered
  - Padding: 16px

### Tabs
- **Container**: Full width
- **Tab List**:
  - Grid with equal columns
  - Border Bottom: 1px solid #e5e7eb
- **Tab Item**:
  - Padding: 8px
  - Font Size: 14px
  - Font Weight: Medium (500)
  - Text Align: Center
  - Border Bottom: 2px solid transparent
- **Selected Tab**:
  - Border Bottom: 2px solid #2e1a87
  - Color: #2e1a87

---

## 7. Page-Specific Components

### Waiver & Acknowledgment Page

#### Document Container
- **Border**: 1px solid #e5e7eb
- **Border Radius**: 6px
- **Padding**: 24px
- **Font Family**: Serif
- **Line Height**: 1.75
- **Layout**: 
  - Two column grid for paragraph content and initial tags
  - Left column (85%), Right column (15%)
- **Paragraph Spacing**: 32px
- **Initial Tags**: Right-aligned in second column
- **Completed State**: Light gray background (#f9fafb)

#### Safety Questions Section
- **Container**: Same border and radius as document
- **Title**: 18px, medium weight, #1f2937
- **Questions**: Inside cards with border
- **Layout**:
  - Desktop: Question text left (75%), options right (25%)
  - Mobile: Questions stacked above options
- **Options**: Horizontal flex with 8px gap

#### Signature Section
- **Container**: Same border and radius as document
- **Title**: 18px, medium weight, #1f2937
- **Signature Box**: Described in Interactive Elements

#### Completion State
- **Container**: Border: 1px solid #d1fae5, Background: #ecfdf5
- **Icon**: Checkmark in #059669
- **Title**: 18px, medium weight, #047857
- **Message**: 14px, #047857
- **Actions**: Horizontally aligned buttons (Download PDF, Continue)

### Signature Modal

#### Modal Container
- **Width**: Max 448px
- **Background**: White
- **Border Radius**: 8px
- **Padding**: 24px
- **Shadow**: Medium shadow

#### Tab Interface
- **Tab Triggers**: "Type" and "Draw"
- **Icons**: Keyboard icon for Type, Pen icon for Draw
- **Type Tab**:
  - Input field for name
  - Font selection buttons
  - Preview of typed signature and auto-generated initials
- **Draw Tab**:
  - Canvas area for signature
  - Canvas area for initials
  - Clear buttons for each canvas

#### Modal Actions
- **Cancel Button**: Ghost style
- **Save Button**: Primary style, text "Save and Continue"

---

## 8. Animations & Transitions

### Hover States
- **Transition**: Background color change over 150ms

### Modal
- **Open Animation**: Fade in with slight scale up (200ms)
- **Close Animation**: Fade out with slight scale down (200ms)

### Field Navigation
- **Scroll Behavior**: Smooth scrolling to the current paragraph when applying initials
  - Uses scrollIntoView({ behavior: 'smooth', block: 'center' })

---

## Implementation Notes for Bubble

1. **Component Reuse**:
   - Create reusable components for buttons, cards, form inputs
   - Style them consistently according to this spec

2. **Responsive Behavior**:
   - Desktop-first design with breakpoints for tablet and mobile
   - Stack horizontal layouts vertically on smaller screens

3. **DocuSign-style Functionality**:
   - Implement tag-based signature/initial system
   - Track completion status of all required fields
   - Implement dual-method signature capture (type/draw)

4. **Assets Required**:
   - Resolve logo
   - UI icons (from an icon set similar to Lucide)
   - Brand fonts (system fonts acceptable with fallbacks)