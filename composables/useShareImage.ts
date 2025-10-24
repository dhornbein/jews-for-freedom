// Instance-based composable - creates a new reactive state for each editor instance

interface ShareImageSettings {
  template: 'bold' | 'minimal'
  size: {
    preset: 'square' | 'landscape' | 'portrait'
    width: number
    height: number
  }
  content: {
    headline: string
    callToAction: string
    url: string
    showQrCode: boolean
  }
  colors: {
    background: string
    backgroundImage: string
    blendMode: string
    headlineText: string
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
  { name: 'Green', value: '#9dc64e' },
  { name: 'Orange', value: '#f59043' },
  { name: 'Pink', value: '#d15175' },
  { name: 'Blue', value: '#539bbd' },
  { name: 'Lavender', value: '#8a9bbd' },
  { name: 'Dark', value: '#1a1a1a' },
  { name: 'Text', value: '#2f2e2b' },
  { name: 'Primary', value: '#c81f1d' },
  { name: 'Background', value: '#f0e8d1' },
  { name: 'White', value: '#ffffff' }
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

interface ColorField {
  key: keyof ShareImageSettings['colors']
  label: string
}

const COLOR_FIELDS: ColorField[] = [
  { key: 'background', label: 'Background' },
  { key: 'headlineText', label: 'Headline Text' },
  { key: 'ctaBackground', label: 'CTA Button' },
  { key: 'ctaText', label: 'CTA Text' },
  { key: 'accent', label: 'Accent' }
]

const DEFAULT_SETTINGS: ShareImageSettings = {
  template: 'bold',
  size: {
    preset: 'square',
    width: 1080,
    height: 1080
  },
  content: {
    headline: 'Stand Up Against Authoritarianism',
    callToAction: 'Sign the Statement',
    url: 'jewsforfreedom.com',
    showQrCode: true
  },
  colors: {
    background: '#c81f1d',
    backgroundImage: '/img/protest-crowd.png',
    blendMode: 'multiply',
    headlineText: '#ffffff',
    ctaBackground: '#f0e8d1',
    ctaText: '#2f2e2b',
    accent: '#9dc64e'
  }
}

/**
 * Creates a new instance of share image state.
 * Each call creates an independent reactive state object.
 */
export function useShareImage() {
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
    settings.colors[field] = color
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
    blendModeOptions: BLEND_MODE_OPTIONS,
    colorFields: COLOR_FIELDS,
    
    // Update functions
    updateTemplate,
    updateSize,
    updateColor,
    updateContent,
    resetToDefaults
  }
}

// Type export for components
export type { ShareImageSettings, TemplateOption, SizeOption, ColorOption, BlendModeOption, ColorField }
