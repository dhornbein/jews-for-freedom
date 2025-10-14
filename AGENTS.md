# Jews For Freedom Website

A digital platform to mobilize American Jews in defense of democratic values through meaningful resistance to authoritarianism. This single-page static site serves as a landing page for petition signatures and social sharing.

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

### 1. Petition Integration (Primary Feature)
**Implementation**: Action Network Widget/API
- Position as "Sign Your Name on This Statement"
- Embed Action Network petition form
- Implementation options:
  - oEmbed widget (simplest): `https://actionnetwork.org/oembed/`
  - API integration: `https://actionnetwork.org/docs/v2/petitions/`
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