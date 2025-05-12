# Resolve Component Visual Cheat Sheet

This document provides a quick reference for the key UI components in the Resolve app, with descriptions of their appearance and behavior.

## Navigation Components

### Top Navigation Bar
- **Appearance:** White background with bottom border
- **Content:** Resolve logo (left), navigation links (center), user menu (right)
- **Height:** 56px

### Back Button
- **Appearance:** Text "Back to Home" with left arrow icon
- **Style:** Ghost button (transparent background)
- **Behavior:** Returns to home page when clicked

## Button Styles

### Primary Button
```
Background: #2e1a87
Text: White
Border: None
Hover: #25156d
```

### Outline Button
```
Background: White
Text: #4b5563
Border: 1px solid #d1d5db
Hover: Background #f9fafb, Text #1f2937
```

### Ghost Button
```
Background: Transparent
Text: #4b5563
Border: None
Hover: Background #f3f4f6
```

## Cards & Containers

### Section Card
```
Background: White
Border: 1px solid #e5e7eb
Border Radius: 8px
Shadow: Light (0 1px 2px rgba(0,0,0,0.05))
Padding: 24px
```

### Document Container
```
Background: White (#f9fafb when completed)
Border: 1px solid #e5e7eb
Border Radius: 6px
Padding: 24px
Font: Serif
Line Height: 1.75
```

### Success Card
```
Background: #ecfdf5
Border: 1px solid #d1fae5
Border Radius: 6px
Padding: 24px
Icon: Checkmark in #059669
Text: #047857
```

## Interactive Elements

### "Initial Here" Tag
**Unsigned State:**
```
Background: #fcd34d
Text: "Initial Here" in #92400e
Size: Text size 12px
Padding: 4px 8px
Border Radius: 6px
Hover: Background changes to #fbbf24
```

**Signed State:**
```
Background: #fef3c7
Content: User's initials image
Size: Height 32px
Border Radius: 6px
```

### Signature Field
**Empty State:**
```
Border: 1px solid #e5e7eb
Background: White
Height: 80px
Content: Text "Click 'Sign Here' to add your signature" + "Sign Here" button
```

**Signed State:**
```
Border: 1px solid #e5e7eb
Background: White
Content: User's signature image
Padding: 16px
```

### Radio/Toggle Options
**Default State:**
```
Border: 1px solid #e5e7eb
Background: White
Text: #4b5563
Padding: 6px 12px
Border Radius: 6px
```

**Selected State:**
```
Border: 1px solid #93c5fd
Background: #eff6ff
Text: #2563eb
```

## Modals & Dialogs

### Signature Modal
```
Width: Max 448px
Background: White
Border Radius: 8px
Padding: 24px
Shadow: Medium
Header: Title "Set Up Your Signature & Initials"
Tabs: "Type" and "Draw"
Footer: "Cancel" and "Save and Continue" buttons
```

### Tab Interface
```
Tab List: Full width, equal columns
Tab Items: Padding 8px, Font 14px medium
Active Tab: Border bottom 2px solid #2e1a87, Text #2e1a87
Inactive Tab: No border, Text #6b7280
```

## Status Indicators

### Badge (Completed)
```
Background: #ecfdf5
Border: 1px solid #d1fae5
Text: #047857
Content: "Signed & Completed" with lock icon
Border Radius: Full rounded
Padding: 4px 8px
Font Size: 12px
```

### Warning Message
```
Background: #fffbeb
Border: 1px solid #fef3c7
Text: #92400e
Border Radius: 6px
Padding: 12px
```

## Form Elements

### Text Input
```
Border: 1px solid #d1d5db
Background: White
Border Radius: 6px
Padding: 8px
Font Size: 14px
Focus: 2px outline #93c5fd
```

### Label
```
Font Size: 14px
Font Weight: Medium
Color: #374151
Margin Bottom: 8px
```

## Layout Patterns

### Two-Column Document Layout
```
Left Column: 85% width, paragraph text
Right Column: 15% width, "Initial Here" tags
```

### Responsive Questions Layout
```
Desktop: Question text (75%) left, options (25%) right
Mobile: Question stacked above options
```

## Key Interactions

### Signature/Initials Process
1. Click "Initial Here" or "Sign Here" tag
2. Modal opens with Type/Draw tabs
3. Create signature and initials
4. Save and apply to clicked field
5. For additional fields, click each remaining tag

### Document Completion
1. All paragraphs must be initialed (yellow tags completed)
2. Signature field must be completed
3. "Complete & Continue" button becomes active
4. On completion, document switches to read-only state with success message

---

*Note: This cheat sheet is a quick reference. For detailed specifications, refer to the full design documentation.*