<script setup lang="ts">
definePageMeta({
  name: 'home',
  path: '/',
})

// GÖREV 'istediğin zaman yapabilirsin'
// bu sayfa için görevin kendini burda başarılı bir şekilde tanıtman
// değerlendireceğim şey tasarım ve doğru component kullanımı olacak
</script>

<template>
  <NuxtLayout>
    <div class="h-full flex flex-col lg:flex-row justify-center items-center -m-10">
      <MainHeader />
      <div class="w-36 lg:border-y border-indigo-500" />
      <MainGroup />
    </div>
  </NuxtLayout>
</template>

<style scoped>
.bg-main {
  @apply bg-[url('/default.jpg')];
}
</style>
