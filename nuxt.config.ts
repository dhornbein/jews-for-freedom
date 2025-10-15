// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/content',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxtjs/tailwindcss'
  ],
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
  app: {
    head: {
      link: [
        { rel: 'stylesheet', href: 'https://use.typekit.net/hdp3ciu.css' }
      ]
    }
  },
  runtimeConfig: {
    public: {
      petitionUrl: process.env.NUXT_PUBLIC_PETITION_URL || 'https://actionnetwork.org/petitions/test-petition-352?source=direct_link&',
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://jewsforfreedom.org'
    }
  }
})