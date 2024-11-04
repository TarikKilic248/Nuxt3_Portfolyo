<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
  id: number
  posterPath: string
  voteAverage: number
}>()
</script>

<template>
  <a :href="`/movie/${props.id}`" class="pb2">
    <div class="aspect-10/16 transition duration-400 hover:scale-105 z10">
      <img
        :src="`https://image.tmdb.org/t/p/w500${props.posterPath}`"
        width="40"
        height="60"
        alt="deneme"
        class="w-full h-full object-cover"
      >
    </div>
    <div class="mt-2">deneme</div>
    <div class="flex text-sm gap-2 items-center">
      <!-- <div class="relative aspect-11/2 w-20">
        <img src="/stars.webp" class="absolute inset-0" aria-hidden="true">
        <img src="/stars-filled.webp" class="absolute inset-0" aria-hidden="true" style="clip-path: inset(0px calc(100% - (props.voteAverage * 10)%) 0px 0px);">
      </div> -->
      <div class="opacity-60">{{ props.voteAverage }}</div>
    </div>
  </a>
</template>
