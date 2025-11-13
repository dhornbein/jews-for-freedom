# Jews For Freedom Website

A digital platform to mobilize American Jews in defense of democratic values through meaningful resistance to authoritarianism. This single-page static site serves as a landing page for form signatures and social sharing.

## Project Overview

### Partner Organizations
- Religious Action Center
- Bend the Arc
- Collaborative for Jewish Organizing
- Jews United for Justice
- Jewish Social Justice Roundtable

### Site Type
Single-page static site (Nuxt SSG) with jump-link navigation to sections

## Core Features

### 1. Form Integration (Primary Feature)
**Implementation**: Action Network Widget/API
- Position as "Sign Your Name on This Statement"
- Embed Action Network form
- Implementation options:
  - oEmbed widget (simplest): `https://actionnetwork.org/oembed/`
  - API integration: `https://actionnetwork.org/docs/v2/forms/`
- All data and list management handled by Action Network
- No backend required

### 2. Content Pages
**Implementation**: Nuxt Content (Markdown)
- About Us page with project information
- Core principles and messaging
- Partner organization information
- Static content managed in markdown files

### 3. Social Sharing
**Implementation**: Meta tags + share buttons
- Comprehensive Open Graph coverage for all platforms
- Social share buttons (Twitter/X, Facebook, etc.)
- Pre-filled share text for easy promotion
- Template graphics for distributed promotion

### 4. Partner Organization Display
- Partner logos with endorsements
- Co-branding materials following design guidelines
- Partner organization highlights

### 5. Privacy & Legal
- Privacy policy page
- Terms of service
- GDPR/privacy compliance measures

## Stretch Goals

### Dynamic Share Images
Generate customizable social media/SMS sharing images on-the-fly
- Allow for image customization
- Support multiple formats (social media, text message)
- Automated generation based on content

## Architecture Overview

### Fonts

Adobe Font Link: `<link rel="stylesheet" href="https://use.typekit.net/hdp3ciu.css">`

- Roc Grotesk
   - Compressed Bold (Headings)
   - Wide Bold (alternative Headings)
- Museo Slab - 500 (Body)

### Colors

#9dc64e - green
#f59043 - orange
#d15175 - pink
#539bbd - blue
#8a9bbd - lavender
#1a1a1a - dark
#2f2e2b - text
#c81f1d - primary
#f0e8d1 - background

### Technology Stack
- **Framework**: Nuxt 4 (SSG mode)
- **Rendering**: Static Site Generation
- **Content**: Nuxt Content (Markdown)
- **Styling**: TailwindCSS v3
- **State Management**: Pinia (if needed)
- **Deployment**: Static hosting (Netlify/Vercel/similar)

### Key Integrations
- **Action Network**: Petition widget/API for signature collection
- **Social Platforms**: OG tags + share functionality

### Page Structure
Single page with sections:
- Hero/Statement
- About Us
- Partner Organizations
- Petition Form (Action Network embed)
- How to Help/Share
- Footer (privacy, terms, contact)

## Standards

MUST FOLLOW THESE RULES, NO EXCEPTIONS

- Stack: Nuxt 4, Vue.js, TypeScript, TailwindCSS (v3), Pinia
- Patterns: ALWAYS use Composition API + `<script setup>`, NEVER use Options API
- ALWAYS Keep types alongside your code, use TypeScript for type safety, prefer `interface` over `type` for defining types
- Keep unit and integration tests alongside the file they test: `components/ui/Button.vue` + `components/ui/Button.spec.ts`
- ALWAYS use TailwindCSS classes rather than manual CSS
- DO NOT hard code colors, use Tailwind's color system
- ONLY add meaningful comments that explain why something is done, not what it does
- ALWAYS use named functions when declaring methods, use arrow functions only for callbacks
- ALWAYS prefer named exports over default exports
- DO NOT manually import components, composables, utils, or Vue/Nuxt APIs - Nuxt 4 auto-imports them
- You do not need to `cd` into the project folder, vscode automatically opens the correct root

## TODO List

### Critical Issues (Must Fix Before Deployment)

- [x] **Enable SSG mode** - Add `nitro: { preset: 'static' }` to nuxt.config.ts and use `npm run generate` instead of `npm run build`
- [x] **Add comprehensive Open Graph meta tags** - Create og-image.png (1200x630) and add full OG/Twitter Card meta
- [x] **Fix broken legal page links** - Create /privacy and /terms pages or remove footer links temporarily
- [x] **Move petition URL to runtime config** - Remove hardcoded test URL from PetitionEmbed component

### Missing Spec Features

- [x] **Implement social share buttons** - Create ShareButtons component with Web Share API + fallback links with pre-filled text
- [ ] **Get partner logos** - Obtain SVG/PNG assets and add to /public/partners/, update usePartners composable
- [ ] **Define button utility classes** - Either add .btn .btn-primary etc. to Tailwind or refactor markdown to standard classes
- [ ] **Add Action Network API integration** - Track signatures, show counter (beyond basic embed)
- [ ] **Create template graphics for sharing** - Static OG image at minimum, dynamic generation as stretch goal

### Minor Improvements

- [ ] **fix background svg texture image** - link is broken or not working

### Code Quality Improvements

- [ ] **Throttle NavBar scroll handler** - Use VueUse's useThrottleFn or lodash.throttle for performance
- [ ] **Standardize color usage** - Use brand.* palette consistently, remove raw Tailwind colors like gray-400
- [ ] **Restructure content files** - Move to /content/pages/ and /content/sections/ instead of flat structure
- [ ] **Add component organization** - Create components/ui/ for primitives, components/sections/ for page sections
- [ ] **Normalize composable patterns** - Pick consistent return type pattern (objects vs arrays)
- [ ] **Add error boundaries** - Handle content loading failures properly instead of showing "Loading..." forever
- [ ] **Add TypeScript types** - Type content queries, petition props, and other untyped areas
- [ ] **Refactor hardcoded strings** - Move static text to content files or constants, mainly OG text, titles, taglines, etc
- [ ] **Refactor CSS** - move btn classes from tailwind.css to the component <style> block

### Testing & Documentation

- [ ] **Setup Vitest** - Add test framework and configuration
- [ ] **Write component tests** - Add smoke tests for NavBar, PetitionEmbed, SiteFooter
- [ ] **Update README.md** - Replace default Nuxt starter content with project-specific docs
- [ ] **Document deployment process** - Add deploy instructions for Netlify/Vercel

### Nice to Have

- [ ] **Add analytics** - Track petition views, shares, completion rates
- [ ] **Implement signature counter** - Show total signatures if Action Network API permits
- [ ] **Add newsletter signup** - Collect emails for ongoing engagement
- [ ] **Create shareable graphics generator** - Dynamic OG images with customization (stretch goal)
- [ ] **Add A11y improvements** - Audit with axe/Lighthouse, add skip links, ARIA labels
- [ ] **Performance optimization** - Lazy load images, optimize font loading strategy

### Accessibility Improvements

- [ ] **ShareButtons keyboard navigation** - Ensure all buttons are keyboard accessible with proper focus states
- [ ] **Screen reader announcements** - Add ARIA live regions for copy confirmation and share actions
- [ ] **Focus management** - Proper tab order and focus trap for modal states if added
- [ ] **High contrast mode** - Test and ensure buttons are visible in high contrast modes
- [ ] **Reduced motion** - Respect prefers-reduced-motion for button state transitions

### Error Handling & Resilience

- [ ] **Expand clipboard error handling** - Better user feedback when clipboard API fails
- [ ] **Web Share API fallback UX** - Graceful degradation messaging when share fails
- [ ] **Network error handling** - Handle cases where external share links are blocked
- [ ] **Content loading failures** - Improve error boundaries for missing statement content
- [ ] **Icon loading failures** - Add fallback text when icons fail to load