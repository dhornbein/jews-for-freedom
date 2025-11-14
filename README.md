# Jews for Freedom

Mobilizing American Jews in defense of democratic values. A single-page Nuxt 4 SSG landing site for collecting signatures and amplifying via social sharing.

## Overview

This is a static site built with Nuxt 4 that includes:
- Action Network form integration for petition signatures
- Social sharing buttons with custom image generation
- Accessible, keyboard-navigable interface
- Analytics event tracking (extensible)
- Responsive design with Tailwind CSS

## Setup

Make sure to install dependencies:

```bash
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```bash
# Public Action Network form URL (required for the embedded form)
# Set this to your Action Network form URL, for example:
# `https://actionnetwork.org/forms/together-we-must-defend-our-freedoms`
NUXT_PUBLIC_FORM_URL=https://actionnetwork.org/forms/your-form-slug
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
npm run dev
```

## Production

Build the application for production (static site generation):

```bash
npm run generate
```

The static files will be output to `.output/public/` and can be deployed to any static hosting service (Netlify, Vercel, GitHub Pages, etc.).

Preview the production build locally:

```bash
npm run preview
```

## Project Structure

```
├── assets/
│   └── css/
│       ├── fonts.css          # Font face declarations
│       └── tailwind.css        # Tailwind base + custom components
├── components/
│   ├── FormEmbed.vue           # Action Network form integration
│   ├── NavBar.vue              # Main navigation
│   ├── SocialIcons.vue         # Social media links
│   └── share/
│       └── Buttons.vue         # Share button grid with analytics
├── composables/
│   ├── useAnalytics.ts         # Event tracking composable
│   ├── useNavLinks.ts          # Navigation configuration
│   └── useShareText.ts         # Social share text customization
├── pages/
│   └── index.vue               # Main landing page
├── utils/
│   └── brandColors.ts          # Centralized brand color palette
└── nuxt.config.ts              # Nuxt configuration
```

## Key Features

### Analytics Tracking

The site includes a flexible analytics system that currently logs events to the console in development. To integrate with a real analytics service:

1. **Console Logging (Default)**: Events are logged in development mode for debugging
   ```typescript
   // Automatically logs: [Analytics] { action: 'share_twitter', category: 'share', ... }
   ```

2. **Integrate Analytics Service**: Edit `composables/useAnalytics.ts` to send events to your service:

   ```typescript
   // Example: Google Analytics 4
   function trackEvent(event: AnalyticsEvent) {
     if (process.dev) {
       console.log('[Analytics]', event)
     }
     
     // Add your analytics service here
     if (typeof window !== 'undefined' && window.gtag) {
       window.gtag('event', event.action, {
         event_category: event.category,
         event_label: event.label,
         value: event.value
       })
     }
   }
   ```

   ```typescript
   // Example: Plausible Analytics
   function trackEvent(event: AnalyticsEvent) {
     if (typeof window !== 'undefined' && window.plausible) {
       window.plausible(event.action, {
         props: {
           category: event.category,
           label: event.label
         }
       })
     }
   }
   ```

3. **Available Events**: The composable tracks:
   - `share_twitter`, `share_facebook`, `share_bluesky`, etc. - Social share actions
   - `copy_link` - Copy to clipboard
   - `web_share` - Native Web Share API usage
   - `form_view`, `form_submit`, `form_error` - Form interactions (ready for future use)

4. **Using Analytics in Components**:
   ```vue
   <script setup>
   const analytics = useAnalytics()
   
   function handleAction() {
     analytics.trackEvent({
       action: 'custom_action',
       category: 'engagement',
       label: 'specific_feature'
     })
   }
   </script>
   ```

### Custom Button Styles

The project uses a centralized button system in `assets/css/tailwind.css`:

- `.btn` - Base button with focus states
- `.btn-primary` - Primary action button
- `.btn-outline-primary` - Outline variant
- `.btn-share` - Social share button style (used in share grid)
- Size variants: `.btn-sm`, `.btn-lg`, `.btn-xl`

All buttons include accessible focus states automatically.

### Brand Colors

Colors are centralized in `utils/brandColors.ts` and extended through Tailwind config. Use `brand-*` classes throughout:

```vue
<div class="bg-brand-primary text-white hover:bg-brand-primary-dark">
```

### Social Media Configuration

Social media links are configured in `nuxt.config.ts`:

```typescript
runtimeConfig: {
  public: {
    socialLinks: {
      twitter: 'https://twitter.com/jewsforfreedom',
      instagram: 'https://instagram.com/jewsforfreedom',
      bluesky: 'https://bsky.app/profile/jewsforfreedom.com'
    }
  }
}
```

## Accessibility

This site follows WCAG 2.1 AA guidelines. See `ACCESSIBILITY_CHECKLIST.md` for the full testing checklist.

Key features:
- Keyboard navigation with visible focus indicators
- ARIA live regions for dynamic updates
- Semantic HTML structure
- Alt text for all informational images
- Color contrast compliant with WCAG AA

## Deployment

### Netlify

1. Connect your repository
2. Set build command: `npm run generate`
3. Set publish directory: `.output/public`
4. Add environment variables in Netlify dashboard

  - **Key:** `NUXT_PUBLIC_FORM_URL`
  - **Value:** `https://actionnetwork.org/forms/<your-form-slug>`

### Vercel

1. Import project from Git
2. Framework preset: Nuxt.js
3. Build command: `npm run generate`
4. Output directory: `.output/public`

  - **Environment Variable:** `NUXT_PUBLIC_FORM_URL` → `https://actionnetwork.org/forms/<your-form-slug>`

### GitHub Pages

```bash
npm run generate
# Deploy .output/public to gh-pages branch
```

## Contributing

See `AGENTS.md` for development guidelines and task tracking.

## License

[Add your license here]
