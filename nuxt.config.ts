// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', '@nuxt/ui'],

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, inital-scale=1',
    }
  }
})
