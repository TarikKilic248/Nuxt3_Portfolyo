// nuxt.config.js
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', '@nuxt/ui'],

  runtimeConfig: {
    // Sunucu tarafında erişilecek yapılandırmalar

    // İstemci tarafında erişilecek yapılandırmalar
    public: {
      tmdbApiKey: process.env.TMDB_API_KEY,
      tmdbToken: process.env.TMDB_TOKEN,

      pokemonUrl: process.env.PUBLIC_POKEMON_URL,
      pokemonTypeUrl: process.env.PUBLIC_POKEMON_TYPE_URL,
    },
  },

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    },
  },

  build: {
    rollupOptions: {
      external: ['pinia'],
    },
  },
})
