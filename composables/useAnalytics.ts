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

    // Send to GA4 if available
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', event.action, {
        event_category: event.category,
        event_label: event.label,
        value: event.value
      })
    }
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

  function trackFormStart() {
    trackFormAction('view')
  }

  function trackFormSubmit() {
    trackFormAction('submit')
  }

  function trackFormError() {
    trackFormAction('error')
  }

  function trackNavClick(itemKey: string, href?: string) {
    trackEvent({
      action: 'nav_click',
      category: 'navigation',
      label: itemKey || href || 'unknown'
    })
  }

  function trackPartnerClick(orgName: string, href?: string) {
    trackEvent({
      action: 'partner_click',
      category: 'partners',
      label: orgName || href || 'unknown'
    })
  }

  function trackSpreadTheWord(elementName: string) {
    trackEvent({
      action: 'spread_click',
      category: 'share',
      label: elementName
    })
  }

  function trackShareButton(buttonName: string) {
    trackEvent({
      action: 'share_button_click',
      category: 'share',
      label: buttonName
    })
  }

  return {
    trackEvent,
    trackShareAction,
    trackCopyAction,
    trackFormAction,
    trackFormStart,
    trackFormSubmit,
    trackFormError,
    trackNavClick,
    trackPartnerClick,
    trackSpreadTheWord,
    trackShareButton
  }
}
