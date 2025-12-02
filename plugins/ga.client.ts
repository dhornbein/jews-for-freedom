// Client-only plugin to load Google tag (gtag.js) and initialize GA4
export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const gaId = config.public.gaMeasurementId

  if (!gaId) {
    if (process.dev) {
      console.warn('[GA] Missing NUXT_PUBLIC_GA_MEASUREMENT_ID; GA plugin not initialized.')
    }
    return
  }

  // Avoid double-inserting
  if (document.getElementById('gtag-js')) return

  // Inject the gtag.js script
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`
  script.id = 'gtag-js'
  document.head.appendChild(script)

  // Initialize dataLayer and gtag
  const inline = document.createElement('script')
  inline.text = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);} 
    gtag('js', new Date());
    gtag('config', '${gaId}', { send_page_view: false });
  `
  document.head.appendChild(inline)

  // Hook into Nuxt route changes to send page_view
  const router = useRouter()
  router.afterEach((to) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'page_view', {
        page_title: document.title,
        page_location: window.location.href,
        page_path: to.fullPath
      })
    }
  })
})
