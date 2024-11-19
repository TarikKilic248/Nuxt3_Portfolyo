<script setup lang="ts">
import { useTodoStore } from '~/stores/todo'

const todoStore = useTodoStore()

onMounted(async () => {
  if (!todoStore.todoList)
    await todoStore.fetchTodoList()
})
</script>

<template>
  <USelectMenu
    v-model="todoStore.selectedUser"
    class="xs:w-40 w-60"
    :options="todoStore.userWithTodo"
    placeholder="Select a person"
    option-attribute="name"
  />
</template>
