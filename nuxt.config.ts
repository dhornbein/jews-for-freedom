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
  components: [{ path: '~/components', pathPrefix: false }],
  tailwindcss: {
    configPath: 'tailwind.config.ts'
  },
  fonts: {
    // Adobe Fonts Web Project ID from AGENTS.md
    adobe: {
      id: ['hdp3ciu']
    }
  },
})