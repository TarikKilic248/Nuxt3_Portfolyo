<script setup lang="ts">
import { useTmdbStore } from '~/stores/tmdb'

definePageMeta({
  name: 'tmdb',
})

const route = useRouter()
const tmdbStore = useTmdbStore()

onMounted(async () => {
  tmdbStore.mediaPage = 1
  await tmdbStore.fetchMedia(route.currentRoute.value.params.media as 'movie' | 'tv')
  tmdbStore.currentMediaList = tmdbStore.mediaList?.results
})
</script>

<template>
  <NuxtLayout name="default">
    <TmdbHeader />
    <TransitionGroup name="slide-fade" tag="div" class="grid lg:grid-cols-10 sm:grid-cols-5 grid-cols-2 gap-4 m-4 overflow-auto h-5/6 p-4">
      <TmdbCard
        v-for="(media, index) in tmdbStore.filterList"
        :id="media.id"
        :key="media.id"
        :poster-path="media.poster_path"
        :vote-average="media.vote_average"
        :name="media.name || media.title"
        :style="{ transitionDelay: `${(index % tmdbStore.mediaList?.results.length!) * 100}ms` }"
      />
    </TransitionGroup>
    <ButtonMore />
    <LoadingScreen />
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
