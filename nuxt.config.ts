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
  tailwindcss: {
    configPath: 'tailwind.config.ts'
  },
  app: {
    head: {
      link: [
        { rel: 'stylesheet', href: 'https://use.typekit.net/hdp3ciu.css' }
      ]
    }
  }
})