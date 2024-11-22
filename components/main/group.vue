<script setup lang="ts">
const router = useRouter()
</script>

<template>
  <div class="flex flex-col lg:flex-row justify-center items-center gap-6 lg:border-x border-x p-5 border-indigo-500">
    <ButtonGiant label="Todo List" @click="router.push({ name: 'todo' })" />
    <ButtonGiant label="Pokemon List" @click="router.push({ name: 'pokemon' })" />
    <ButtonGiant label="TMDB" @click="router.push({ name: 'tmdb', params: { media: 'movie' } })" />
  </div>
</template>
