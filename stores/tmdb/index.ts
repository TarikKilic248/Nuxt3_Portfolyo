import { useRuntimeConfig } from 'nuxt/app'
import { ref } from 'vue'
import type Media from '~/pages/[media].vue'
import type { Media, MediaList } from '~/types'

export const useTmdbStore = defineStore('tmdb', () => {
  const mediaList = ref<MediaList>()
  const mediaPage = ref(1)
  const currentMediaList = ref<Media[]>()

  const filterAdult = ref()
  const filterTitle = ref()
  const filterReleaseDate = ref()

  const apiKey = useRuntimeConfig().public.tmdbToken

  watch(
    () => useRouter().currentRoute.value.params.media,
    (newVal, oldVal) => {
      if (newVal !== oldVal) {
        currentMediaList.value = undefined
      }
    },
  )

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

  const loadMoreMediaList = async () => {
    mediaPage.value += 1
    await fetchMedia(useRouter().currentRoute.value.params.media as 'movie' | 'tv')
    if (currentMediaList.value && mediaList.value?.results) {
      currentMediaList.value.push(...mediaList.value.results)
    }
  }

  const filterList = computed(() => {
    return currentMediaList.value?.filter((media: Media) => {
      const matchesAdult = filterAdult.value === undefined || media.adult === filterAdult.value
      const matchesTitle = !filterTitle.value || (media.title || media.name)?.toLowerCase().includes(filterTitle.value.toLowerCase())
      const matchesReleaseDate = !filterReleaseDate.value || (media.release_date >= filterReleaseDate.value || media.first_air_date >= filterReleaseDate.value)

      return matchesAdult && matchesTitle && matchesReleaseDate
    })
  })

  return {
    fetchMedia,
    loadMoreMediaList,

    mediaList,
    mediaPage,
    currentMediaList,

    filterAdult,
    filterTitle,
    filterReleaseDate,
    filterList,
  }
})
