<script setup lang="ts">
import { useTodoStore } from '~/stores/todo'

definePageMeta({
  name: 'todoDetail',
})

const todoStore = useTodoStore()
const route = useRoute()

onMounted(async () => {
  // Eğer kullanıcı listesi yüklü değilse, listeyi yükle
  if (!todoStore.userWithTodo || todoStore.userWithTodo.length === 0) {
    await todoStore.fetchTodoList()
  }

  // Eğer selectedUser zaten seçili değilse veya URL parametresine uymuyorsa, URL'deki ID'yi kullan
  const userId = Number.parseInt(route.params.id as string, 10)
  if (Number.isNaN(userId)) {
    console.error('Geçersiz kullanıcı ID')
    return
  }

  const foundUser = todoStore.userWithTodo?.find((user: { id: number }) => user.id === userId)
  if (foundUser) {
    todoStore.selectedUser = foundUser
  }
  else {
    console.error(`Kullanıcı bulunamadı: ID=${userId}`)
  }
})
</script>

<template>
  <NuxtLayout name="default">
    <div v-if="todoStore.selectedUser" class="p-3 flex flex-col gap-5 overflow-auto lg:flex-row w-full h-full">
      <div class="flex flex-col h-full gap-10 px-5 lg:border-r-2">
        <TodoUserCard />
        <TodoDetails />
      </div>

      <div class="w-full">
        <TodoList />
      </div>
    </div>
    <div v-else>
      <LoadingScreen :api="todoStore.selectedUser" />
    </div>
  </NuxtLayout>
</template>
