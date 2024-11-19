<script setup lang="ts">
const props = defineProps<{
  api: any // Durum olarak geçilecek olan API
}>()
</script>

<template>
  <div v-if="!props.api" class="fixed top-0 left-0 w-full h-full bg-gray-950 opacity-60 z-50 flex justify-center items-center">
    <div class="h-6 w-6 border animate-spin" />
  </div>
</template>
