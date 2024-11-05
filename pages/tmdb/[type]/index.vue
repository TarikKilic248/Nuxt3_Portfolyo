<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTmdbStore } from '~/stores/tmdb'

const route = useRoute()
const router = useRouter()
const tmdbStore = useTmdbStore()

definePageMeta({
  name: 'tmdb/movie',
})

onMounted(() => {
  fetchMediaByType()
})

function fetchMediaByType() {
  const type = route.params.type as 'movie' | 'tv'
  tmdbStore.fetchMedia(type)
}

function navigateTo(type: string) {
  router.push(`/tmdb/${type}`)
}
</script>

<template>
  <NuxtLayout name="default">
    <div class="flex h-full flex-col justify-between gap-2">
      <div class="h-16 py-5 px-10 flex gap-2 gap-x-8">
        <UButton label="Movies" @click="navigateTo('movie')" />
        <UButton label="TVShows" @click="navigateTo('tv')" />
      </div>

      <div class="grid grid-cols-7 gap-4 m-4 overflow-auto">
        <TmdbCard
          v-for="media in tmdbStore.mediaList?.results"
          :id="media.id"
          :key="media.id"
          :poster-path="media.poster_path"
          :vote-average="media.vote_average"
        />
      </div>

      <div v-if="tmdbStore.mediaList" class="flex w-full justify-center">
        <UPagination v-model="tmdbStore.mediaPage" :page-count="tmdbStore.mediaTotalPage" :total="tmdbStore.mediaTotalPage" />
      </div>
    </div>
  </NuxtLayout>

  <div v-if="!tmdbStore.mediaList" class="fixed top-0 left-0 w-full h-full bg-gray-950 opacity-60 z-50 flex justify-center items-center">
    <div class="h-6 w-6 border animate-spin" />
  </div>
</template>
