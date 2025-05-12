# Resolve App - Bubble Implementation Guide

This document provides specific guidance for implementing the Resolve app UI in Bubble, focusing on the DocuSign-style signature and acknowledgment functionality.

## Table of Contents
- [Bubble Element Recommendations](#bubble-element-recommendations)
- [Signature and Initials Implementation](#signature-and-initials-implementation)
- [Layout Structure](#layout-structure)
- [Responsive Considerations](#responsive-considerations)
- [Workflow Logic](#workflow-logic)

---

## Bubble Element Recommendations

### Basic Elements

| UI Component | Recommended Bubble Element | Styling Notes |
|--------------|----------------------------|---------------|
| Page Container | Group with fixed width | Set max-width: 896px, center horizontally |
| Section Card | Group with rounded corners | Background: white, Border: 1px #e5e7eb, Radius: 8px, Shadow: light |
| Button (Primary) | Button | Background: #2e1a87, Text: white, Radius: 6px |
| Button (Outline) | Button | Background: white, Border: 1px #d1d5db, Text: #4b5563, Radius: 6px |
| Button (Ghost) | Button | Background: transparent, Text: #4b5563, No border |
| Text Input | Input element | Border: 1px #d1d5db, Radius: 6px, Font: 14px |
| Radio Option | Custom built with groups | Use groups with conditional styling based on selected state |
| Badge | Text with custom style | Background: contextual, Border-radius: full, Padding: 4px 8px |

### Navigation Elements

| UI Component | Recommended Bubble Element | Styling Notes |
|--------------|----------------------------|---------------|
| Top Navigation | Fixed group at top | Background: white, Border-bottom: 1px #e5e7eb, Height: 56px |
| Back Button | Group with icon and text | Icon: left arrow, Text: "Back to Home", Style as ghost button |

### Tabs Implementation

To create the Type/Draw tabs for signatures:
1. Create two groups side by side to serve as tab triggers
2. Style the active tab with a bottom border: 2px solid #2e1a87
3. Use conditional visibility to show/hide the corresponding tab content
4. Add click events to toggle the active tab state

---

## Signature and Initials Implementation

### "Initial Here" Tags

1. **Create a reusable component** with:
   - Group with background: #fcd34d (or #fef3c7 for completed state)
   - Text "Initial Here" OR Image element for displaying saved initials
   - Conditional styling based on state (signed/unsigned)

2. **States to track:**
   - Unsigned: Shows "Initial Here" text, background: #fcd34d, clickable
   - Signed: Shows user's initials image, background: #fef3c7, not clickable 

3. **Hover state:**
   - On hover, change background to #fbbf24 (only in unsigned state)

### Signature Modal

1. **Modal structure:**
   - Container group with max-width: 448px
   - Header with title "Set Up Your Signature & Initials"
   - Tab interface with "Type" and "Draw" options
   - Type tab content: Input field, font selector, signature/initials preview
   - Draw tab content: Drawing canvas areas
   - Footer with "Cancel" and "Save and Continue" buttons

2. **For Type method:**
   - Input field for full name
   - Font selector buttons (4 options)
   - Real-time preview of signature
   - Auto-generated initials (first letters of first/last name)

3. **For Draw method:**
   - Use Bubble's drawing plugin or a custom solution
   - Include clear buttons for each canvas
   - Preview areas for both signature and initials

4. **Validation:**
   - Check that both signature and initials exist before saving
   - Display appropriate validation messages if missing

---

## Layout Structure

### Waiver Document Layout

1. **Two-column grid structure:**
   - Left column (85%): Document text content
   - Right column (15%): "Initial Here" tags

2. **Create with:**
   - Main container group
   - For each paragraph: Create a group with:
     - Text element for paragraph content (left)
     - "Initial Here" component (right)

3. **Implement as repeating group** if document text is dynamic, otherwise use fixed layout

### Safety Questions Section

1. **Mobile-responsive layout:**
   - Desktop: Question text (75% width) and radio options (25% width) side by side
   - Mobile: Stack question above radio options

2. **Create with:**
   - Container group for each question
   - Text element for question
   - Custom radio button group for Yes/No
   - Conditional styling for selected options

---

## Responsive Considerations

1. **Breakpoints:**
   - Desktop: 1024px and above
   - Tablet: 768px to 1023px
   - Mobile: Below 768px

2. **Layout changes:**
   - Stack horizontal layouts vertically on mobile
   - Increase touch targets on mobile (min 44px)
   - Adjust font sizes: reduce by 1-2px on mobile

3. **Navigation:**
   - Collapse menu items on mobile
   - Consider a hamburger menu for smaller screens

---

## Workflow Logic

### Document Completion Workflow

1. **Track signature and initials state:**
   - Store signature and initials as image data
   - Create a list to track which paragraphs have been initialed

2. **Field validation:**
   - Check if all paragraphs have been initialed
   - Check if signature has been added
   - Enable "Complete & Continue" button only when all requirements met

3. **Completion state:**
   - Switch to read-only view
   - Change backgrounds to indicate completion
   - Show success message and next action buttons

### Signature Setup Flow

1. **Initial setup (first click on any tag):**
   - Open modal for creating signature and initials
   - Save both when valid
   - Apply to the clicked field

2. **Subsequent field completion:**
   - Apply saved signature/initials to clicked fields
   - Track completion in the list of signed paragraphs

3. **Auto-generation logic:**
   - When using Type method, extract first letters from names
   - Generate canvas image for both signature and initials
   - Store as data URLs for display

---

## Implementation Tips for Bubble

1. **State Management:**
   - Use custom states to track signature/initials
   - Use a list to track which paragraphs have been initialed
   - Store completion state in database for persistence

2. **Performance:**
   - If using many images, optimize size and loading
   - Consider lazy loading for document sections

3. **Plugin Recommendations:**
   - Consider a drawing plugin for signature canvas functionality
   - Use an image processing plugin for auto-generating initials

4. **Testing:**
   - Test on multiple devices and screen sizes
   - Test with both mouse and touch interactions
   - Verify all validation logic works as expected