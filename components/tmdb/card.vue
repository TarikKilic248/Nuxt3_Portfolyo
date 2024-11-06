<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
  id: number
  posterPath: string
  voteAverage: number
  name: string
}>()
</script>

<template>
  <div>
    <div class="aspect-10/16 transition duration-400 hover:scale-105 z10">
      <img
        :src="`https://image.tmdb.org/t/p/w500${props.posterPath}`"
        alt="deneme"
        class="w-full h-full object-cover"
      >
    </div>
    <div class="mt-2">
      {{ props.name }}
    </div>
    <div class="flex text-sm gap-2 items-center opacity-60">
      {{ props.voteAverage }}
    </div>
  </div>
</template>
