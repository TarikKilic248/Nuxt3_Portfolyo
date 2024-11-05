<script setup lang="ts">
import { useUserStore } from '~/stores/todo/user'

definePageMeta({
  name: 'todoDetail',
})

const userStore = useUserStore()
onMounted(() => {
  if (userStore.selectedUser) {
  // normal sayfadan geliş
  }
  else {
    // restart atılınca
    // param dan url al
    // kullanıcıları yeniden yükle
    // filtre kullanarak id sine göre çek
  }
})
</script>

<template>
  <NuxtLayout name="default">
    {{ userStore.selectedUser }}
  </NuxtLayout>
</template>
