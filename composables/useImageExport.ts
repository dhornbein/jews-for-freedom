import { toJpeg } from 'html-to-image'
import { getFontEmbedCSS } from '~/utils/fontEmbedCss'

interface ExportOptions {
  filename?: string
  quality?: number
  width?: number
  height?: number
}

export function useImageExport() {
  const isExporting = ref(false)
  const exportError = ref<string | null>(null)

  async function exportAsJpeg(
    element: HTMLElement,
    options: ExportOptions = {}
  ): Promise<void> {
    if (!element) {
      exportError.value = 'No element to export'
      return
    }

    isExporting.value = true
    exportError.value = null

    try {
      // Wait for fonts to load (best-effort)
      if (document.fonts) {
        await document.fonts.ready
      }

      // Build base64-embedded font CSS to avoid stylesheet parsing bugs (esp. Firefox)
      let embeddedCSS = ''
      try {
        embeddedCSS = await getFontEmbedCSS()
      } catch {
        // Fallback: proceed without embedded CSS
      }

      // Small delay to ensure any pending layout before capture
      await new Promise(resolve => setTimeout(resolve, 20))

      const {
        filename = 'jews-for-freedom-share.jpg',
        quality = 0.95,
        width,
        height
      } = options

      // Export with specified dimensions and embedded fonts
      const dataUrl = await toJpeg(element, {
        quality,
        width,
        height,
        pixelRatio: 1,
        cacheBust: true,
        // When provided, html-to-image skips parsing stylesheets for @font-face and uses this instead
        fontEmbedCSS: embeddedCSS || undefined,
        preferredFontFormat: 'woff2',
        // Ensure it doesn't try to auto-parse fonts (we provide our own CSS)
        skipFonts: false,
        includeQueryParams: false,
      })

      // Trigger download
      const link = document.createElement('a')
      link.download = filename
      link.href = dataUrl
      link.click()
    } catch (error) {
      exportError.value = error instanceof Error ? error.message : 'Export failed'
    } finally {
      isExporting.value = false
    }
  }

  return {
    isExporting: readonly(isExporting),
    exportError: readonly(exportError),
    exportAsJpeg
  }
}
