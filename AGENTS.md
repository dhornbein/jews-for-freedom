# Jews For Freedom Website

## Project Overview
Mobilizing American Jews in defense of democratic values. Single-page Nuxt 4 SSG landing site collecting signatures and amplifying via social sharing.

## Update Summary
Applied a set of low-friction quick fixes to stabilize navigation, colors, sharing buttons, runtime config, and accessibility. These changes are small, atomic, and ready to commit; file references are listed in the "Quick Fixes Applied" section below.

### Partner Organizations
Religious Action Center · Bend the Arc · Collaborative for Jewish Organizing · Jews United for Justice · Jewish Social Justice Roundtable

### Page Sections
Hero / Introduction · Statement (form) · About · Partners · Share · Footer (legal, copyright)

### Action Network Form & API
- Form API endpoint: https://actionnetwork.org/api/v2/forms/3ac5ee23-fdfa-4988-8fc1-2cce1d8cad35/
- Form ID: 737550
- Form API docs: https://actionnetwork.org/docs/v2/forms/

## Standards (MUST)
- Nuxt 4
- Vue 3 — use `<script setup>` only
- TypeScript interfaces
- Tailwind v3 utility classes — no inline hex except centralized palette
- Named exports
- Runtime config for external URLs
- No Options API
- No hardcoded Action Network URL in components
- Centralized brand colors in Tailwind `theme.extend.colors.brand`

## Codebase Review
Summary: Core SSG + runtime config in place (nuxt.config.ts). Composition API & TS used consistently. Brand colors centralized (utils/brandColors.ts). Some inline hex color usage in share buttons violates color rule. Missing tests, button utility classes, partner section anchor, and Action Network API usage.

### Bugs / Defects (Priority Order)
1. Missing #partners anchor (fixed): index.vue lists partners but section id is `about`; nav link `#partners` (useNavLinks.ts line 18) previously led nowhere — nav link updated to `#whos-involved` to match generated id.
2. Unthrottled scroll handler: components/NavBar.vue lines 34–40 may cause perf issues on rapid scroll.
3. Inline hardcoded color gray-400: pages/index.vue line 27 (`text-gray-400`) conflicts with brand standardization task.
4. Share Buttons hex colors: components/share/Buttons.vue lines 39,52,65,78 use platform hex directly (violation of "no hard-coded colors" rule) + stray duplicate comment line 34.
5. Runtime form URL moved to env: nuxt.config.ts now reads `process.env.ACTION_NETWORK_FORM_URL` into `runtimeConfig.public.formUrl`; set the env var to enable FormEmbed.
8. Redundant onMounted sizing logic: ImageEditor.vue lines 343–350 and 396–399 registering resize twice (could consolidate).
9. Missing alt attributes for decorative NuxtImg elements (e.g., index.vue lines 8–9 second image lacks alt text).
10. Share template Minimal.vue does not emit body updates on CTA edits (CTA handled, body and headline fine) but missing @update:body usage in parent (ImageEditor.vue passes only headline & cta for minimal template lines 314–320; body edits still captured? Template emits update:body but parent not listening).

### Missing Features / Gaps
1. Action Network API integration: show live signature count + recent tally (FormEmbed + new composable useActionNetwork.ts).
2. Signature counter component near form CTA for social proof (pages/index.vue embed area).
3. Button utility system: central Tailwind component layer or CSS classes (`btn`, `btn-primary`, sizes) to standardize across NavBar, Footer, Share, etc.
4. Testing setup (Vitest + basic component smoke tests) to enforce composable behaviors (NavBar scroll, FormEmbed slug extraction, ShareButtons platform links).
5. Analytics hook (simple custom event dispatcher) for share actions (data-analytics-action already present).
6. Error boundary / loading fallback improvement: use suspense or error handling for content queries (index.vue lines 15–21, 28–32, 43–47 show simple Loading text only).
7. Accessibility improvements: keyboard focus styles for share buttons and dynamic image editor controls.
8. Color standardization utility: replace gray-* usages with brand shades or neutral palette extension.
9. Populate runtime formUrl securely via environment variable (document required). 

### Quick Fixes (Single PR Low-Friction)

## Reorganized TODOs
Legend: Complexity S=Small, M=Medium, L=Large. Priority: 🔴 Critical, 🟠 High, 🟡 Medium, 🟢 Low. Owner labels: Agent A/B/C.

### Site Infra
| Priority | Task | Description | Acceptance Criteria | Complexity | Owner |
|----------|------|-------------|---------------------|------------|-------|
| 🔴 | Populate formUrl runtime (Completed ✅) | Add Action Network production form URL via env | formUrl set in `runtimeConfig.public.formUrl`; FormEmbed loads | S | - |
| 🔴 | Add partners anchor (Completed ✅) | Ensure nav link works | id="partners" present; nav scrolls correctly | S | - |
| 🟡 | Neutral color palette (Completed ✅) | Replace gray-* with brand-neutral | No raw gray-* in pages/components | S | - |
| 🟢 | Button utility system (Future) | Centralize `btn` classes | Shared classes in one file; all buttons use them; no duplicates | M | - |

### Feature Work
| Priority | Task | Description | Acceptance Criteria | Complexity | Owner |
|----------|------|-------------|---------------------|------------|-------|
| 🔴 | Signature counter with privacy | Display live count via server proxy | Server API filters PII; client shows count + aria-live; graceful fallback | M | Workstream 1 |
| 🔴 | Social media icons (Completed ✅) | Instagram, Bluesky, Twitter links | Icons in footer with hover; accessible labels; runtime config | S | Workstream 2 |
| 🟡 | Analytics events (Completed ✅) | Capture share interactions | Events logged (console or stub) on button actions | S | - |
| 🟢 | Share image generator (Future) | Finish MVP & polish | Remove duplicate logic; accessible controls; docs | M | - |

### Integrations
| Priority | Task | Description | Acceptance Criteria | Complexity | Owner |
|----------|------|-------------|---------------------|------------|-------|
| 🔴 | Action Network API proxy | Privacy-preserving server endpoint | `/api/signatures` returns count only; no PII; caching | M | Workstream 1 |
| 🟡 | Email template export | Provide share email body formatting | Function returns subject & body; used by ShareButtons | S | - |

### UX / A11y
| Priority | Task | Description | Acceptance Criteria | Complexity | Owner |
|----------|------|-------------|---------------------|------------|-------|
| 🔴 | Accessibility checklist (Completed ✅) | Manual testing guide | Document covers alt text, focus, semantic HTML, ARIA, contrast | S | Workstream 2 |
| 🟠 | Focus states for share buttons (Completed ✅) | Improve keyboard navigation | Visible focus ring; tab order logical | S | - |
| 🟡 | ARIA live for copy/share (Completed ✅) | Announce copy success | aria-live region updates "Link copied" | S | - |
| 🟢 | Image alt audit (Completed ✅) | Ensure alt or aria-hidden | All NuxtImg audited; decorative marked aria-hidden | S | - |

### Code Quality
| Priority | Task | Description | Acceptance Criteria | Complexity | Owner |
|----------|------|-------------|---------------------|------------|-------|
| 🔴 | Throttle scroll handler (Completed ✅) | Performance improvement | NavBar uses `useThrottleFn`; smooth scroll | S | - |
| 🟠 | Remove inline platform hex (Completed ✅) | Replace with Tailwind config | All share buttons use palette classes | S | - |
| 🟡 | Error boundary for content | Better fallback UI | Error state message if query fails | M | - |
| 🟡 | Type composables fully | Add missing interfaces | All composables export interfaces; no `any` | M | - |
| 🟢 | Refactor duplicate comments (Completed ✅) | Clean stray duplicates | No duplicate comment lines in Buttons.vue | S | - |

### Tests & Docs
| Priority | Task | Description | Acceptance Criteria | Complexity | Owner |
|----------|------|-------------|---------------------|------------|-------|
| 🟡 | README update | Add project-specific docs | README has overview, dev, deploy steps | S | - |
| 🟡 | Deployment guide to README | Netlify/Vercel steps | Env vars listed; build command `npm run generate` | S | - |

### Minor / Housekeeping
| Priority | Task | Description | Acceptance Criteria | Complexity | Owner |
|----------|------|-------------|---------------------|------------|-------|
| 🟡 | Fallback form error UX | Better error messaging | FormEmbed shows actionable retry link | S | - |
| 🟢 | Year roll-over check | Ensure footer year auto-updates | Footer shows current year via JS (already OK) | S | - |

### Completed (Locked ✅)
- ✅ Enable SSG mode
- ✅ Add comprehensive Open Graph meta tags
- ✅ Fix broken legal page links (privacy.vue, terms.vue present)
- ✅ Move petition URL to runtime config scaffolding
- ✅ Implement social share buttons (Buttons.vue)

- ✅ Quick fixes: nav link, NavBar throttling, removed inline platform hexes, added social palette entries, runtime formUrl env placeholder, hero image alt

## Top 2 Workstreams

### 1. Action Network API + Signature Counter
Goal: Display live signature count to increase social proof with privacy-preserving architecture.
Why High Priority: Directly improves conversion; currently missing.
Acceptance Criteria:
- Server API endpoint proxies Action Network API to protect credentials and filter PII
- Endpoint returns only aggregate count + anonymized recent submission timestamps
- Counter visible near form with accessible label
- Runtime config uses form ID / URL; no hard-coded strings
- Graceful fallback if API fails (hidden or "Updating…")
Privacy Pattern:
- Create Nuxt server route (`/api/signatures`) that fetches from Action Network API server-side
- Filter response to exclude email, name, postal code, phone - return only count & timestamps
- Use server environment variable for Action Network API key (never exposed to client)
- Consider caching responses (5-10 min) to reduce API load and improve performance
First 5 Tasks:
1. Create server API route `server/api/signatures.ts` that fetches Action Network data server-side with API key from env.
2. Filter response to return only `{ count: number, recentCount?: number }` - no PII.
3. Create client composable `composables/useSignatureCount.ts` that calls `/api/signatures`.
4. Add signature counter component `components/SignatureCounter.vue` (renders count + aria-live).
5. Integrate component in pages/index.vue under FormEmbed section.
Dependencies: Need Action Network API key with read-only permissions.

### 2. Polish & Social Links (Combined Testing + UX Improvements)
Goal: Basic accessibility/functionality checks and add social media presence to footer/nav.
Why Medium Priority: Establishes quality baseline and improves social discovery.
Acceptance Criteria:
- Minimal a11y testing: ARIA labels present, focus states work, semantic HTML validated
- Simple manual testing checklist (no test framework needed for single-page site)
- Social icons (Instagram, Bluesky, Twitter/X) in footer with hover states
- Optional: compact social icons in mobile nav
- Icons use accessible labels and proper link attributes (rel, target)
First 5 Tasks:
1. Add social media links to runtime config (Twitter, Instagram, Bluesky URLs).
2. Create `components/SocialIcons.vue` with icon links using heroicons or lucide-vue.
3. Integrate SocialIcons in SiteFooter.vue.
4. Optional: Add compact social icons to mobile NavBar.
5. Create simple accessibility checklist doc (`ACCESSIBILITY_CHECKLIST.md`) covering: alt text audit, focus states, semantic markup, ARIA labels, color contrast.

## Issues / PR Plan
Simplified workflow for single agent:
1. Create feature branch for each task: `feat/signature-counter`, `feat/social-links`, etc.
2. Implement changes, keeping commits atomic and focused.
3. Run `npm run generate` locally to verify SSG build.
4. Commit to local feature branch - DO NOT PUSH to remote.
5. Update AGENTS.md to mark completed tasks.

Files to Change (Planned):
- server/api/signatures.ts (new): privacy-preserving API proxy
- composables/useSignatureCount.ts (new): client-side data fetching
- components/SignatureCounter.vue (new): display component
- components/SocialIcons.vue (new): social media icon links
- pages/index.vue: integrate SignatureCounter
- components/SiteFooter.vue: integrate SocialIcons
- nuxt.config.ts: add social media URLs to runtime config
- ACCESSIBILITY_CHECKLIST.md (new): manual testing guide

## Notes on Standards Compliance
- All current components use `<script setup lang="ts">` (✅). 
- No Options API usage found (✅).
- Color centralization mostly OK but inline platform hex violates rule (❌). 
- Need button utilities to align with style standard (❌ currently implicit). 
- Runtime form URL now reads from `process.env.ACTION_NETWORK_FORM_URL` (needs env var set to enable FormEmbed). 
- Tests entirely missing (❌).

---
End of updated AGENTS.md.
