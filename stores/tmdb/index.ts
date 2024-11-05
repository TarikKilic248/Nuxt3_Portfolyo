import type { MediaList } from '~/types'

export const useTmdbStore = defineStore('tmdb', () => {
  const mediaList = ref<MediaList>()
  const mediaPage = ref(1)
  const mediaTotalPage = ref(500)

  const apiKey = useRuntimeConfig().public.tmdbToken

  const fetchMedia = async (media: 'movie' | 'tv') => {
    const url = `https://api.themoviedb.org/3/discover/${media}?language=en-US&page=${mediaPage.value}&sort_by=popularity.desc`
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
    }

    try {
      const response = await fetch(url, options)
      const json = await response.json()
      mediaList.value = json
    }
    catch (err) {
      console.error('Fetch error:', err)
    }
  }

  return {
    fetchMedia,

    mediaList,
    mediaPage,
    mediaTotalPage,
  }
})
