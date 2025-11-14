// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/content',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt'
  ],
  content: {
    renderer: {
      anchorLinks: false,
    }
  },
  image: {
    provider: 'none',
    dir: 'public'
  },
  tailwindcss: {
    configPath: 'tailwind.config.ts'
  },
  nitro: {
    preset: 'static',
    prerender: {
      routes: ['/']
    }
  },
  css: [
    '~/assets/css/fonts.css'
  ],
  runtimeConfig: {
    public: {
      formUrl: process.env.ACTION_NETWORK_FORM_URL || '',
      siteUrl: 'https://jewsforfreedom.com'
    }
  }
})