interface FormCustomization {
  selector: string
  modify: (element: Element) => void
}

interface UseFormCustomizationOptions {
  customizations: FormCustomization[]
  containerSelector?: string
  maxWaitTime?: number
}

export function useFormCustomization(options: UseFormCustomizationOptions) {
  const { customizations, containerSelector = '.can_embed', maxWaitTime = 10000 } = options

  const applyCustomizations = (container: Element) => {
    customizations.forEach(({ selector, modify }) => {
      const elements = container.querySelectorAll(selector)
      elements.forEach(element => {
        try {
          modify(element)
        } catch (error) {
          console.warn(`Failed to apply customization to ${selector}:`, error)
        }
      })
    })
  }

  const waitForForm = () => {
    return new Promise<Element | null>((resolve) => {
      const startTime = Date.now()
      
      // Check if form already exists
      const existingContainer = document.querySelector(containerSelector)
      if (existingContainer?.querySelector('form')) {
        applyCustomizations(existingContainer)
        resolve(existingContainer)
        return
      }

      // Watch for form to be added
      const observer = new MutationObserver((mutations) => {
        const container = document.querySelector(containerSelector)
        if (container?.querySelector('form')) {
          observer.disconnect()
          applyCustomizations(container)
          resolve(container)
          return
        }

        // Timeout check
        if (Date.now() - startTime > maxWaitTime) {
          observer.disconnect()
          console.warn('Form customization timed out')
          resolve(null)
        }
      })

      observer.observe(document.body, {
        childList: true,
        subtree: true
      })
    })
  }

  return {
    waitForForm,
    applyCustomizations
  }
}
