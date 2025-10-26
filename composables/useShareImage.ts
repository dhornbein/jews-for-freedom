// Instance-based composable - creates a new reactive state for each editor instance

// Import brand colors from Tailwind config
import type { Ref } from 'vue'
import { brandColors } from '../utils/brandColors'

interface BackgroundImageSettings {
  url: string
  position: string
  repeat: string
  size: string
}

interface ShareImageSettings {
  template: 'bold' | 'minimal'
  size: {
    preset: 'square' | 'landscape' | 'portrait'
    width: number
    height: number
  }
  content: {
    headline: string
    headlineSize: number
    body?: string
    bodySize: number
    callToAction: string
    callToActionSize: number
    url: string
    showQrCode: boolean
  }
  colors: {
    background: string
    backgroundImage: BackgroundImageSettings | null
    blendMode: string
    headlineText: string
    bodyText: string
    ctaBackground: string
    ctaText: string
    accent: string
  }
}

interface TemplateOption {
  value: 'bold' | 'minimal'
  label: string
}

interface SizeOption {
  value: 'square' | 'landscape' | 'portrait'
  label: string
  width: number
  height: number
}

interface ColorOption {
  name: string
  value: string
}

interface BlendModeOption {
  value: string
  label: string
}

interface ColorScheme {
  name: string
  color: string // The brand color identifier
  background: string
  blendMode: string
  headlineText: string
  bodyText: string
  ctaBackground: string
  ctaText: string
  accent: string
}

interface BackgroundImagePreset {
  name: string
  thumbnail: string
  settings: BackgroundImageSettings
}

// Configuration for editor UI
const TEMPLATE_OPTIONS: TemplateOption[] = [
  { value: 'bold', label: 'Bold' },
  { value: 'minimal', label: 'Minimal' }
]

const SIZE_OPTIONS: SizeOption[] = [
  { value: 'square', label: 'Square', width: 1080, height: 1080 },
  { value: 'landscape', label: 'Landscape', width: 1200, height: 630 },
  { value: 'portrait', label: 'Portrait', width: 1080, height: 1920 }
]

const BRAND_COLORS: ColorOption[] = [
  { name: 'Green', value: brandColors.green.DEFAULT },
  { name: 'Orange', value: brandColors.orange.DEFAULT },
  { name: 'Pink', value: brandColors.pink.DEFAULT },
  { name: 'Blue', value: brandColors.blue.DEFAULT },
  { name: 'Lavender', value: brandColors.lavender.DEFAULT },
  { name: 'Dark', value: brandColors.dark.DEFAULT },
  { name: 'Text', value: brandColors.text.DEFAULT },
  { name: 'Primary', value: brandColors.primary.DEFAULT },
  { name: 'Background', value: brandColors.background.DEFAULT },
  { name: 'White', value: brandColors.white.DEFAULT }
]

const BLEND_MODE_OPTIONS: BlendModeOption[] = [
  { value: 'normal', label: 'Normal' },
  { value: 'multiply', label: 'Multiply' },
  { value: 'screen', label: 'Screen' },
  { value: 'overlay', label: 'Overlay' },
  { value: 'darken', label: 'Darken' },
  { value: 'lighten', label: 'Lighten' },
  { value: 'color-dodge', label: 'Color Dodge' },
  { value: 'color-burn', label: 'Color Burn' },
  { value: 'hard-light', label: 'Hard Light' },
  { value: 'soft-light', label: 'Soft Light' }
]

const BACKGROUND_IMAGE_PRESETS: BackgroundImagePreset[] = [
  {
    name: 'None',
    thumbnail: '', // No thumbnail for "none"
    settings: {
      url: '',
      position: 'center',
      repeat: 'no-repeat',
      size: 'auto 80%'
    }
  },
  {
    name: 'Protest Crowd',
    thumbnail: '/img/protest-crowd.png',
    settings: {
      url: '/img/protest-crowd.png',
      position: 'center',
      repeat: 'no-repeat',
      size: 'cover'
    }
  },
  {
    name: 'Fists Middle',
    thumbnail: '/img/fists-mg.png',
    settings: {
      url: '/img/fists-mg.png',
      position: 'bottom',
      repeat: 'no-repeat',
      size: 'contain'
    }
  },
  {
    name: 'Arm Poster',
    thumbnail: '/img/arm-poster.png',
    settings: {
      url: '/img/arm-poster.png',
      position: 'center 160px',
      repeat: 'no-repeat',
      size: 'contain'
    }
  },
  {
    name: 'Cop',
    thumbnail: '/img/cop.png',
    settings: {
      url: '/img/cop.png',
      position: 'left bottom',
      repeat: 'no-repeat',
      size: 'auto 80%'
    }
  },
  {
    name: 'Dove',
    thumbnail: '/img/dove.png',
    settings: {
      url: '/img/dove.png',
      position: 'center',
      repeat: 'no-repeat',
      size: 'contain'
    }
  },
  {
    name: 'Not Now When Poster',
    thumbnail: '/img/not-now-when-poster.png',
    settings: {
      url: '/img/not-now-when-poster.png',
      position: 'center',
      repeat: 'no-repeat',
      size: 'contain'
    }
  }
]

const COLOR_SCHEMES: ColorScheme[] = [
  {
    name: 'Primary Red',
    color: brandColors.primary.DEFAULT,
    background: brandColors.primary.DEFAULT,
    blendMode: 'multiply',
    headlineText: brandColors.white.DEFAULT,
    bodyText: brandColors.tan.DEFAULT,
    ctaBackground: brandColors.background.DEFAULT,
    ctaText: brandColors.text.DEFAULT,
    accent: brandColors.background.DEFAULT
  },
  {
    name: 'Green',
    color: brandColors.green.DEFAULT,
    background: brandColors.green.DEFAULT,
    blendMode: 'soft-light',
    headlineText: brandColors.white.DEFAULT,
    bodyText: brandColors.dark.DEFAULT,
    ctaBackground: brandColors.dark.DEFAULT,
    ctaText: brandColors.tan.DEFAULT,
    accent: brandColors.dark.DEFAULT
  },
  {
    name: 'Orange',
    color: brandColors.orange.DEFAULT,
    background: brandColors.orange.DEFAULT,
    blendMode: 'multiply',
    headlineText: brandColors.white.DEFAULT,
    bodyText: brandColors.text.DEFAULT,
    ctaBackground: brandColors.tan.DEFAULT,
    ctaText: brandColors.text.DEFAULT,
    accent: brandColors.text.DEFAULT
  },
  {
    name: 'Pink',
    color: brandColors.pink.DEFAULT,
    background: brandColors.pink.DEFAULT,
    blendMode: 'soft-light',
    headlineText: brandColors.white.DEFAULT,
    bodyText: brandColors.tan.DEFAULT,
    ctaBackground: brandColors.background.DEFAULT,
    ctaText: brandColors.dark.DEFAULT,
    accent: brandColors.background.DEFAULT
  },
  {
    name: 'Blue',
    color: brandColors.blue.DEFAULT,
    background: brandColors.blue.DEFAULT,
    blendMode: 'multiply',
    headlineText: brandColors.white.DEFAULT,
    bodyText: brandColors.tan.DEFAULT,
    ctaBackground: brandColors.dark.DEFAULT,
    ctaText: brandColors.white.DEFAULT,
    accent: brandColors.dark.DEFAULT
  },
  {
    name: 'Lavender',
    color: brandColors.lavender.DEFAULT,
    background: brandColors.lavender.DEFAULT,
    blendMode: 'multiply',
    headlineText: brandColors.white.DEFAULT,
    bodyText: brandColors.text.DEFAULT,
    ctaBackground: brandColors.text.DEFAULT,
    ctaText: brandColors.white.DEFAULT,
    accent: brandColors.text.DEFAULT
  },
  {
    name: 'Dark',
    color: brandColors.dark.DEFAULT,
    background: brandColors.dark.DEFAULT,
    blendMode: 'overlay',
    headlineText: brandColors.background.DEFAULT,
    bodyText: brandColors.tan.DEFAULT,
    ctaBackground: brandColors.primary.DEFAULT,
    ctaText: brandColors.tan.DEFAULT,
    accent: brandColors.primary.DEFAULT
  },
  {
    name: 'Light',
    color: brandColors.background.DEFAULT,
    background: brandColors.background.DEFAULT,
    blendMode: 'multiply',
    headlineText: brandColors.white.DEFAULT,
    bodyText: brandColors.text.DEFAULT,
    ctaBackground: brandColors.primary.DEFAULT,
    ctaText: brandColors.background.DEFAULT,
    accent: brandColors.primary.DEFAULT
  }
]

interface ColorField {
  key: keyof ShareImageSettings['colors']
  label: string
}

const COLOR_FIELDS: ColorField[] = [
  { key: 'background', label: 'Background' },
  { key: 'headlineText', label: 'Headline Text' },
  { key: 'bodyText', label: 'Body Text' },
  { key: 'ctaBackground', label: 'CTA Button' },
  { key: 'ctaText', label: 'CTA Text' },
  { key: 'accent', label: 'Accent' }
]

/**
 * Creates a new instance of share image state.
 * Each call creates an independent reactive state object.
 */
export function useShareImage() {
  const config = useRuntimeConfig()
  const sharedText = useShareText()
  
  // Strip protocol from site URL for display
  const displayUrl = config.public.siteUrl.replace(/^https?:\/\//, '')
  
  const DEFAULT_SETTINGS: ShareImageSettings = {
    template: 'bold',
    size: {
      preset: 'square',
      width: 1080,
      height: 1080
    },
    content: {
      headline: 'Stand Up Against Authoritarianism',
      headlineSize: 64,
      body: sharedText.longText,
      bodySize: 24,
      callToAction: 'Sign the Statement',
      callToActionSize: 32,
      url: displayUrl,
      showQrCode: true
    },
    colors: {
      backgroundImage: {
        url: '/img/protest-crowd.png',
        position: 'center',
        repeat: 'no-repeat',
        size: 'cover'
      },
      blendMode: 'multiply',
      background: brandColors.primary.DEFAULT,
      headlineText: brandColors.white.DEFAULT,
      bodyText: brandColors.tan.DEFAULT,
      ctaBackground: brandColors.background.DEFAULT,
      ctaText: brandColors.text.DEFAULT,
      accent: brandColors.background.DEFAULT
    }
  }
  
  // Create a new reactive instance for this editor
  const settings = reactive<ShareImageSettings>(JSON.parse(JSON.stringify(DEFAULT_SETTINGS)))

  function updateTemplate(template: 'bold' | 'minimal') {
    settings.template = template
  }

  function updateSize(preset: 'square' | 'landscape' | 'portrait') {
    const sizeOption = SIZE_OPTIONS.find(s => s.value === preset)
    if (sizeOption) {
      settings.size = {
        preset,
        width: sizeOption.width,
        height: sizeOption.height
      }
    }
  }

  function updateColor(field: keyof ShareImageSettings['colors'], color: string) {
    if (field === 'backgroundImage' || field === 'blendMode') {
      return // These are handled by specialized functions
    }
    settings.colors[field] = color
  }

  function updateColorScheme(scheme: ColorScheme) {
    settings.colors.background = scheme.background
    settings.colors.blendMode = scheme.blendMode
    settings.colors.headlineText = scheme.headlineText
    settings.colors.bodyText = scheme.bodyText
    settings.colors.ctaBackground = scheme.ctaBackground
    settings.colors.ctaText = scheme.ctaText
    settings.colors.accent = scheme.accent
  }

  function updateBackgroundImage(preset: BackgroundImagePreset) {
    if (preset.settings.url === '') {
      settings.colors.backgroundImage = null
    } else {
      settings.colors.backgroundImage = { ...preset.settings }
    }
  }

  function updateContent(field: keyof ShareImageSettings['content'], value: string | boolean) {
    ;(settings.content as any)[field] = value
  }

  function resetToDefaults() {
    Object.assign(settings, JSON.parse(JSON.stringify(DEFAULT_SETTINGS)))
  }

  return {
    // Reactive state (using reactive instead of ref, so no .value needed)
    settings,
    
    // Configuration options for UI
    templateOptions: TEMPLATE_OPTIONS,
    sizeOptions: SIZE_OPTIONS,
    brandColors: BRAND_COLORS,
    colorSchemes: COLOR_SCHEMES,
    backgroundImagePresets: BACKGROUND_IMAGE_PRESETS,
    blendModeOptions: BLEND_MODE_OPTIONS,
    colorFields: COLOR_FIELDS,
    
    // Update functions
    updateTemplate,
    updateSize,
    updateColor,
    updateColorScheme,
    updateBackgroundImage,
    updateContent,
    resetToDefaults
  }
}

// Type export for components
export type UseShareImageReturn = ReturnType<typeof useShareImage>
export type { ShareImageSettings, BackgroundImageSettings, TemplateOption, SizeOption, ColorOption, BlendModeOption, ColorField, ColorScheme, BackgroundImagePreset }
