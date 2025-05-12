# Waivers & Acknowledgment Page - Bubble Implementation Guide

This document provides detailed specifications for implementing the Waivers & Acknowledgment page in Bubble, focusing on the DocuSign-style signature functionality we've developed.

## Page Overview

The Waivers & Acknowledgment page is a legal document viewer with interactive signature and initial capabilities, allowing users to:
1. View a legal waiver document
2. Initial specific paragraphs
3. Answer safety screening questions
4. Provide a signature
5. Complete the document

## Table of Contents
- [Visual Design](#visual-design)
- [Page Structure](#page-structure)
- [Signature & Initials System](#signature--initials-system)
- [Safety Questions](#safety-questions)
- [Document Completion](#document-completion)
- [Modal Implementation](#modal-implementation)

---

## Visual Design

### Colors
- **Primary Purple**: `#2e1a87` (Main buttons, headings)
- **Background**: White for active document, `#f9fafb` for completed document
- **Document Text**: Dark gray `#1f2937`
- **Borders**: Light gray `#e5e7eb`
- **Initial Tags**: Amber/yellow `#fcd34d` (active), `#fef3c7` (completed)
- **Success State**: Green `#ecfdf5` background, `#d1fae5` border, `#047857` text

### Typography
- **Page Title**: 30px bold, Purple (`#2e1a87`)
- **Section Headers**: 20px semibold, Dark gray (`#1f2937`)
- **Document Text**: 16px serif font, Line height 1.75, Dark gray (`#4b5563`)
- **Initial Tag Text**: 12px medium, Amber text (`#92400e`)
- **Button Text**: 14px medium, varies by button type

### Spacing
- **Page Container**: Max width 896px
- **Section Spacing**: 32px between major sections
- **Document Padding**: 24px
- **Paragraph Spacing**: 32px between paragraphs

---

## Page Structure

### 1. Header Section
```
- Back Button (left-aligned, ghost style)
- Page Title: "Waivers & Acknowledgment" (centered, purple)
- Subtitle text (centered, gray)
```

### 2. Video Section
```
- White card container
- Section title: "Watch: Resolve Acknowledgment Overview"
- Video thumbnail with play button
- Caption text below
```

### 3. Document Section
```
- White card container
- Section title: "Resolve Waiver and Acknowledgment" with optional completion badge
- Document container with:
  - Introduction paragraph (no initials required)
  - Multiple paragraphs with "Initial Here" tags
```

### 4. Safety Questions Section
```
- White card container
- Section title: "Safety Screening Questions"
- Three question cards with Yes/No toggle options
```

### 5. Signature Section
```
- White card container
- Section title: "Sign to Complete"
- Signature field/box
- "Complete & Continue" button (right-aligned)
```

### 6. Completion Section (shown after document is completed)
```
- Light green card container
- Success icon and heading
- Success message
- Two buttons: "Download PDF" and "Continue"
```

---

## Signature & Initials System

### "Initial Here" Tags

#### Visual Appearance:
- **Unsigned State**:
  - Background: `#fcd34d` (amber)
  - Text: "Initial Here" in `#92400e`
  - Size: small (height approximately 24px) 
  - Padding: 4px 8px
  - Border Radius: 6px
  - Hover: Background changes to `#fbbf24`

- **Signed State**:
  - Background: `#fef3c7` (light amber)
  - Content: User's initials image, centered
  - Size: same as unsigned state
  - Border Radius: 6px

#### Implementation in Bubble:
1. Create a reusable component for the "Initial Here" tag
2. Add conditional formatting based on whether the paragraph has been initialed
3. Store the state of each paragraph (initialed or not) in a list
4. When clicked, trigger the signature/initials modal if not already set up, otherwise apply saved initials

### Main Signature Field

#### Visual Appearance:
- **Unsigned State**:
  - Border: 1px solid `#e5e7eb`
  - Background: White
  - Height: 80px
  - Content: Text "Click 'Sign Here' to add your signature"
  - "Sign Here" button on right side (amber background)

- **Signed State**:
  - Border: 1px solid `#e5e7eb`
  - Background: White
  - Content: User's signature image, centered
  - Height: auto with appropriate padding

#### Implementation in Bubble:
1. Create a group with conditional styling based on signature state
2. Add click handler to open signature modal
3. Display signature image when signed

---

## Safety Questions

### Question Cards

#### Visual Appearance:
- **Container**: Border 1px solid `#e5e7eb`, radius 8px, padding 16px
- **Question Text**: Left-aligned, 14px medium, gray
- **Options**: Right-aligned, horizontal layout with 8px gap

#### Radio Options:
- **Default State**:
  - Border: 1px solid `#e5e7eb`
  - Background: White
  - Text: Dark gray
  - Padding: 6px 12px
  - Border Radius: 6px

- **Selected State**:
  - Border: 1px solid `#93c5fd`
  - Background: `#eff6ff` (light blue)
  - Text: `#2563eb` (blue)

#### Responsive Behavior:
- On desktop: Question (75% width) and options (25% width) side by side
- On mobile: Stack question above options

#### Implementation in Bubble:
1. Create groups for each question card
2. Use custom-styled radio buttons or toggle buttons
3. Store answer state for each question
4. Default all answers to "No"

---

## Document Completion

### Validation Rules:
1. All paragraphs must be initialed (checked against the list of signed paragraphs)
2. Main signature must be applied
3. Safety questions must all be answered (pre-answered to "No")

### Complete & Continue Button:
- **Disabled State**: Grayed out, not clickable
- **Enabled State**: Purple background (`#2e1a87`), white text
- **Hover**: Darker purple (`#25156d`)

### Completion State:
- Document background changes to light gray
- "Initial Here" tags replaced with applied initials
- "Signed & Completed" badge appears next to document title
- Safety questions become read-only
- Signature section replaced with success message
- Green success card with download and continue options

### Implementation in Bubble:
1. Add workflow to check all validation conditions
2. Enable/disable button based on validation
3. On submit, change document state to completed
4. Store completion state in database
5. Show success card with next actions

---

## Modal Implementation

### Signature & Initials Modal

#### Modal Structure:
```
- Header: "Set Up Your Signature & Initials"
- Subtitle: "Create your signature and initials once to use throughout the document"
- Tabs: "Type" and "Draw"
- Content area (changes based on selected tab)
- Footer: "Cancel" and "Save and Continue" buttons
```

#### Type Tab Content:
```
- Full Name input field
- Font selection buttons (4 options)
- Signature preview (generated from typed name)
- Initials preview (auto-generated from first letters)
```

#### Draw Tab Content:
```
- Signature canvas area (larger)
- Initials canvas area (smaller)
- Clear buttons for each canvas
```

#### Font Options:
- "Dancing Script" (Handwritten 1)
- "Pacifico" (Handwritten 2)
- "Caveat" (Casual)
- "Homemade Apple" (Elegant)

#### Modal Behavior:
1. Opens when any "Initial Here" tag or the signature field is clicked (if signature not yet set up)
2. Validates both signature and initials exist before saving
3. When saved, applies to the field that was clicked
4. For subsequent field clicks, directly applies the saved signature/initials

#### Initials Generation Logic:
For the "Type" method, initials are automatically generated:
- Extract first letter of first name and first letter of last name
- If only one name, use first letter 
- Display in selected font style
- Update in real-time as user types

#### Implementation in Bubble:
1. Create a modal popup with tabs
2. For the "Type" tab:
   - Add input field and font selector
   - Add JavaScript to generate preview from typed name
   - Auto-generate initials from name
3. For the "Draw" tab:
   - Use a drawing plugin or custom solution
   - Include clear functionality
4. Add validation and save logic
5. Store signature and initials as images

---

## Key Interactions Flowchart

1. **User Arrives at Page**
   - Document in unsigned state
   - All "Initial Here" tags active
   - Signature field empty
   - Safety questions defaulted to "No"

2. **First Signature/Initial Setup**
   - User clicks any "Initial Here" tag or "Sign Here" button
   - Modal opens
   - User creates signature and initials
   - On save, both are stored and applied to clicked field

3. **Subsequent Initialings**
   - User clicks remaining "Initial Here" tags
   - Saved initials are automatically applied
   - System tracks which paragraphs have been initialed

4. **Document Completion**
   - When all fields are completed, "Complete & Continue" button becomes active
   - User clicks button
   - Document switches to completed state
   - Success message appears with next actions

---

## Implementation Tips for Bubble

1. **State Management:**
   - Use custom states to track signature/initials
   - Use a list to track which paragraphs have been initialed
   - Store completion state in database for persistence

2. **Performance:**
   - Optimize image storage for signatures
   - Consider using Data URLs for temporary storage

3. **Plugin Recommendations:**
   - Use a drawing plugin for signature canvas
   - Consider an image processing plugin for generating initials from text

4. **Mobile Considerations:**
   - Test drawing functionality on touch devices
   - Ensure sufficient tap target sizes
   - Adjust layout for smaller screens

---

*Note: This implementation guide focuses specifically on the Waivers & Acknowledgment page functionality. Additional pages in the application may require separate implementation guides.*