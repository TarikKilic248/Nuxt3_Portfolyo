<script setup lang="ts">
import { useTmdbStore } from '~/stores/tmdb'
import type { Media } from '~/types'

definePageMeta({
  name: 'tmdb',
})

const route = useRouter()
const tmdbStore = useTmdbStore()
const currentMediaList = ref<Media[]>()

onMounted(async () => {
  const media = route.currentRoute.value.params.media as 'movie' | 'tv'
  tmdbStore.currentMediaType = media
  tmdbStore.mediaPage = 1
  await tmdbStore.fetchMedia(media)
  currentMediaList.value = tmdbStore.mediaList?.results
})

watch(() => tmdbStore.mediaList?.results, (newList) => {
  if (tmdbStore.currentMediaType !== route.currentRoute.value.params.media) {
    currentMediaList.value = []

    setTimeout(() => {
      currentMediaList.value = newList || []
    }, 400)
  }
  else if (newList && newList.length) {
    currentMediaList.value?.push(...newList)
  }
})
</script>

<template>
  <NuxtLayout name="default">
    <div class="h-16 py-1 flex justify-around">
      <TmdbHeader />
    </div>

    <TransitionGroup name="slide-fade" tag="div" class="grid grid-cols-10 gap-4 m-4 overflow-auto h-5/6 p-3">
      <TmdbCard
        v-for="(media, index) in currentMediaList"
        :id="media.id"
        :key="media.id"
        :poster-path="media.poster_path"
        :vote-average="media.vote_average"
        :name="media.name || media.title"
        :style="{ transitionDelay: `${index * 100}ms` }"
      />
    </TransitionGroup>

    <div v-if="tmdbStore.mediaList" class="flex w-full justify-center">
      <ButtonMore />
    </div>

    <div v-if="!tmdbStore.mediaList" class="fixed top-0 left-0 w-full h-full bg-gray-950 opacity-60 z-50 flex justify-center items-center">
      <div class="h-6 w-6 border animate-spin" />
    </div>
  </NuxtLayout>
</template>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.4s ease;
}
.slide-fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.slide-fade-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.slide-fade-leave-active {
  transition: opacity 0.1s, transform 0.1s;
}
.slide-fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
