<script setup lang="ts">
import { useTodoStore } from '~/stores/todo'
import { useUserStore } from '~/stores/todo/user'
import type { UserWithTodo } from '~/types'

const todoStore = useTodoStore()
const userStore = useUserStore()

const selectedUser = ref < UserWithTodo > ()

function selectUser() {
  userStore.selectedUser = selectedUser.value
}

onMounted(async () => {
  if (!todoStore.todoList)
    await todoStore.fetchTodoList()
})
</script>

<template>
  <USelectMenu
    v-model="selectedUser"
    class="xs:w-40 w-60"
    :options="todoStore.UserWithTodo"
    placeholder="Select a person"
    option-attribute="name"
    @change="selectUser"
  />
</template>
