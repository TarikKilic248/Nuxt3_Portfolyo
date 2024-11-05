<script setup lang="ts">
import { useTmdbStore } from '~/stores/tmdb'
import type { Media } from '~/types'

definePageMeta({
  name: 'tmdb',
})

const route = useRouter()
const tmdbStore = useTmdbStore()

onMounted(async () => {
  const media = route.currentRoute.value.params.media as 'movie' | 'tv'
  await tmdbStore.fetchMedia(media)
})

const visibleMediaList = ref<Media[]>()

watch(() => tmdbStore.mediaList?.results, (newList) => {
  visibleMediaList.value = []

  setTimeout(() => {
    visibleMediaList.value = newList || []
  }, 400)
})
</script>

<template>
  <NuxtLayout name="default">
    <div class="h-16 py-1 flex justify-around myBorder ">
      <TmdbHeader />
    </div>

    <TransitionGroup name="slide-fade" tag="div" class="grid grid-cols-8 gap-4 m-4 overflow-auto h-5/6 p-3">
      <TmdbCard
        v-for="(media, index) in visibleMediaList"
        :id="media.id"
        :key="media.id"
        :poster-path="media.poster_path"
        :vote-average="media.vote_average"
        :name="media.name || media.title"
        :style="{ transitionDelay: `${index * 100}ms` }"
      />
    </TransitionGroup>

    <div v-if="tmdbStore.mediaList" class="flex w-full justify-center">
      <UButton v-model="add" block variant="soft" icon="i-heroicons-plus-circle" color="gray" />
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
