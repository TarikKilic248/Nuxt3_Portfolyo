// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', '@nuxt/ui'],

  runtimeConfig: {
    public: {
      pokemonUrl: process.env.PUBLIC_POKEMON_URL,
      pokemonTypeUrl: process.env.PUBLIC_POKEMON_TYPE_URL,
    },
  },

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, inital-scale=1',
    },
  },
})
