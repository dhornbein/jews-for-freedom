import { toJpeg } from 'html-to-image'

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
      // Wait for fonts to load
      if (document.fonts) {
        await document.fonts.ready
      }

      // Small delay to ensure everything is rendered
      await new Promise(resolve => setTimeout(resolve, 100))

      const {
        filename = 'jews-for-freedom-share.jpg',
        quality = 0.7,
        width,
        height
      } = options

      // Export with specified dimensions
      const dataUrl = await toJpeg(element, {
        quality,
        width,
        height,
        pixelRatio: 2, // Higher resolution for better quality
        style: {
          // Ensure fonts are loaded
          fontFamily: 'inherit'
        }
      })

      // Trigger download
      const link = document.createElement('a')
      link.download = filename
      link.href = dataUrl
      link.click()

      console.log('Image exported successfully')
    } catch (error) {
      console.error('Export failed:', error)
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
