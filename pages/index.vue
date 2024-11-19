<script setup lang="ts">
definePageMeta({
  name: 'home',
  path: '/',
})
const router = useRouter()
// GÖREV 'istediğin zaman yapabilirsin'
// bu sayfa için görevin kendini burda başarılı bir şekilde tanıtman
// değerlendireceğim şey tasarım ve doğru component kullanımı olacak
</script>

<template>
  <NuxtLayout>
    <div class="w-full h-full flex flex-col lg:flex-row justify-center items-center gap-6">
      <ButtonGiant label="Todo List" @click="router.push({ name: 'todo' })" />
      <ButtonGiant
        label="Pokemon List"
        @click="router.push({ name: 'pokemon' })"
      />
      <ButtonGiant
        label="TMDB"
        @click="
          router.push({
            name: 'tmdb',
            params: {
              media: 'movie',
            },
          })
        "
      />
    </div>
  </NuxtLayout>
</template>
