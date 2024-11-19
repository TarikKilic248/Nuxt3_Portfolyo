<script setup lang="ts">
import { useTodoStore } from '~/stores/todo'

const router = useRouter()
const route = useRoute()
const todoStore = useTodoStore()

function changeUser(move: 'back' | 'forward') {
  const currentUserId = Number.parseInt(route.params.id as string, 10) // Mevcut URL'deki id'yi al

  if (todoStore.userWithTodo) {
    let newUserId: number | null = null

    if (move === 'back' && currentUserId > 1) {
      newUserId = currentUserId - 1 // Bir önceki kullanıcıya geçiş
    }
    else if (move === 'forward' && currentUserId < todoStore.userWithTodo.length) {
      newUserId = currentUserId + 1 // Bir sonraki kullanıcıya geçiş
    }

    if (newUserId !== null) {
      // Yeni kullanıcıya yönlendirme yap
      router.push(`/todo/${newUserId}`)
    }
  }
}
</script>

<template>
  <div v-if="todoStore.selectedUser" class="flex flex-col items-center gap-5">
    <div class="flex flex-row justify-center gap-5">
      <UButton
        icon="i-heroicons-arrow-long-left"
        class="h-10 mt-16"
        @click="changeUser('back')"
      />
      <img :src="todoStore.selectedUser.picture.large" class="w-40 rounded-lg">
      <UButton
        icon="i-heroicons-arrow-long-right"
        class="h-10 mt-16"
        @click="changeUser('forward')"
      />
    </div>
    <p>{{ todoStore.selectedUser.name }} / {{ todoStore.selectedUser.dob.age }}</p>
    <p>Username: {{ todoStore.selectedUser.login.username }}</p>
  </div>
</template>
