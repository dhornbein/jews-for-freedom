export interface AnalyticsEvent {
  action: string
  category?: string
  label?: string
  value?: number
}

export function useAnalytics() {
  function trackEvent(event: AnalyticsEvent) {
    // Log to console in development
    if (process.dev) {
      console.log('[Analytics]', {
        action: event.action,
        category: event.category || 'general',
        label: event.label,
        value: event.value
      })
    }

    // Future: Send to analytics service (Google Analytics, Plausible, etc.)
    // Example for GA4:
    // if (typeof window !== 'undefined' && window.gtag) {
    //   window.gtag('event', event.action, {
    //     event_category: event.category,
    //     event_label: event.label,
    //     value: event.value
    //   })
    // }
  }

  function trackShareAction(platform: string, url?: string) {
    trackEvent({
      action: `share_${platform}`,
      category: 'share',
      label: url || 'default'
    })
  }

  function trackCopyAction() {
    trackEvent({
      action: 'copy_link',
      category: 'share',
      label: 'clipboard'
    })
  }

  function trackFormAction(action: 'view' | 'submit' | 'error') {
    trackEvent({
      action: `form_${action}`,
      category: 'form'
    })
  }

  return {
    trackEvent,
    trackShareAction,
    trackCopyAction,
    trackFormAction
  }
}
