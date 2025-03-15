// nuxt.config.js
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: ['@pinia/nuxt', '@nuxt/ui'],

  runtimeConfig: {
    public: {
      tmdbApiKey: process.env.TMDB_API_KEY || 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NzcwZGEwOGU1NzljNDZiMDQzNjI1NzZkOThiYWVmMSIsIm5iZiI6MTczMDQ0NjY4My44MzMsInN1YiI6IjY3MjQ4NTViYTYxNmJiZTcxNWUxZTA0ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AKUkzcvaoNbZ5Wgbrf05-fJBzXjLstqqJ7V0ac5LDnI',
      tmdbToken: process.env.TMDB_TOKEN,
    },
  },

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    },
  },

  imports: {
    dirs: ['composables', 'store'],
  },
})
