# Accessibility Checklist

This document provides a manual testing guide for ensuring the Jews for Freedom website meets basic accessibility standards. For a single-page brochure site, these checks should be performed before deploying major changes.

## Alt Text Audit

### Images
- [ ] All informational images have descriptive `alt` text
- [ ] Decorative images use empty `alt=""` or `aria-hidden="true"`
- [ ] Logo images include organization name in alt text
- [ ] Partner organization logos are properly labeled

### Current Status
- Hero images: ✅ Verified
- Logo: ✅ "Jews for Freedom"
- Background/decorative images: ⚠️ Review for aria-hidden

## Focus States

### Interactive Elements
- [ ] All links have visible focus indicator
- [ ] Buttons show clear focus state
- [ ] Navigation links are keyboard accessible
- [ ] Share buttons have focus states
- [ ] Form inputs show focus clearly

### Test Method
1. Use Tab key to navigate through page
2. Verify visible outline or highlight on each element
3. Ensure focus order is logical (top to bottom, left to right)

## Semantic HTML

### Structure
- [ ] Proper heading hierarchy (h1 → h2 → h3)
- [ ] Navigation wrapped in `<nav>` element
- [ ] Main content in `<main>` element
- [ ] Footer in `<footer>` element
- [ ] Lists use `<ul>`, `<ol>`, or `<dl>`

### Forms
- [ ] Form inputs have associated `<label>` elements
- [ ] Required fields are marked (visually and for screen readers)
- [ ] Error messages are associated with inputs

## ARIA Labels

### Dynamic Content
- [ ] Signature counter has `aria-live` region
- [ ] Loading states announced to screen readers
- [ ] Success/error messages have appropriate ARIA roles

### Links and Buttons
- [ ] Icon-only buttons have `aria-label`
- [ ] Social media links have descriptive labels
- [ ] External links indicate they open in new window

### Current Elements to Review
- Social media icons: ✅ aria-label present
- Share buttons: ⚠️ Verify labels
- Form embed: ⚠️ Verify Action Network iframe accessibility

## Color Contrast

### Text
- [ ] Body text meets WCAG AA (4.5:1 minimum)
- [ ] Large text meets WCAG AA (3:1 minimum)
- [ ] Link text distinguishable from body text
- [ ] Button text readable on background

### Test Tools
- Use browser DevTools contrast checker
- WebAIM Contrast Checker: https://webaim.org/resources/contrastchecker/
- Chrome Lighthouse accessibility audit

### Brand Colors to Check
- Primary text on white background
- Primary button text on brand background
- Link hover states
- Footer text opacity levels

## Keyboard Navigation

### Navigation Flow
- [ ] Can reach all interactive elements via Tab
- [ ] Shift+Tab moves backward correctly
- [ ] Enter/Space activates buttons and links
- [ ] Escape closes modals/overlays (if present)
- [ ] Skip to content link available (optional for single page)

### Mobile Menu
- [ ] Hamburger menu operable via keyboard
- [ ] Focus trapped in open menu
- [ ] Can close menu with keyboard

## Screen Reader Testing

### Quick Test (Optional but Recommended)
- [ ] Test with browser's reader mode
- [ ] Verify heading outline makes sense
- [ ] Check image descriptions are meaningful
- [ ] Ensure form labels are read correctly

### Tools
- macOS: VoiceOver (Cmd+F5)
- Windows: NVDA (free) or JAWS
- Chrome extension: Screen Reader (for basic testing)

## Responsive Design Accessibility

### Mobile Considerations
- [ ] Touch targets at least 44x44 pixels
- [ ] Text readable without zooming (minimum 16px)
- [ ] No horizontal scrolling required
- [ ] Form inputs not obscured by keyboard

### Viewport Scaling
- [ ] Pinch-to-zoom enabled (no `user-scalable=no`)
- [ ] Layout doesn't break at 200% zoom
- [ ] Content reflows appropriately

## Forms (Action Network Embed)

### Action Network Form Checks
- [ ] All form fields have visible labels
- [ ] Required fields indicated clearly
- [ ] Error messages appear near relevant fields
- [ ] Success message announced and visible
- [ ] Form submittable via keyboard

**Note:** Action Network forms are third-party. Verify their iframe content meets accessibility standards.

## Testing Schedule

### Before Launch
- Complete full checklist
- Test with keyboard navigation
- Run Chrome Lighthouse audit
- Verify color contrast ratios

### After Major Updates
- Re-check modified sections
- Test new interactive features
- Verify responsive behavior
- Quick keyboard navigation test

### Quarterly Review (Recommended)
- Full accessibility audit
- Update this checklist as needed
- Review for new WCAG guidelines
- Test with actual assistive technology users if possible

## Resources

- WCAG 2.1 Guidelines: https://www.w3.org/WAI/WCAG21/quickref/
- WebAIM: https://webaim.org/
- A11y Project Checklist: https://www.a11yproject.com/checklist/
- Chrome DevTools Accessibility: https://developer.chrome.com/docs/devtools/accessibility/

---

**Last Updated:** 2025-11-14  
**Maintained By:** Development Team
