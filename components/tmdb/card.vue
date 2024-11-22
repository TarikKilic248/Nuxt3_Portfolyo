<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  mediaid: number
  posterPath: string | null
  voteAverage: number
  voteCount: number
  popularity: number
  name: string
}>()

// voteAverage değerini yüzdeye çeviriyoruz
const voteWidth = computed(() => (100 - (props.voteAverage / 10) * 100))
</script>

<template>
  <div class="aspect-[10/16] transition duration-50 hover:scale-105 p-1">
    <div>
      <img
        :src="props.posterPath ? `https://image.tmdb.org/t/p/w500${props.posterPath}` : ''"
        alt="Media Poster"
        class="w-full h-full object-cover"
      >
    </div>
    <div class="mt-2 h-12 flex overflow-hidden text-ellipsis">
      <span class="line-clamp-2 hover:overflow-auto">
        {{ props.name }}
      </span>
    </div>

    <div class="mt-2 text-sm text-gray-400">
      Popularity: {{ props.popularity.toLocaleString() }}
    </div>

    <div class="flex flex-row gap-2">
      <div class="relative h-4 w-20 mt-1 border-r-2">
        <!-- Yıldız simgesi -->
        <img
          src="../../public/vote-star.png"
          alt="Star"
          class="absolute inset-0 w-full h-full"
        >
        <!-- Üstüne yerleştirilen dolu kaplama divi -->
        <div
          class="absolute inset-y-0 right-0 dark:bg-gray-900 bg-slate-100"
          :style="{ width: `${voteWidth}%` }"
        />
      </div>
      <div class="text-sm content-center text-gray-400 overflow-hidden whitespace-nowrap">
        {{ props.voteCount.toLocaleString() }} votes
      </div>
    </div>
  </div>
</template>
