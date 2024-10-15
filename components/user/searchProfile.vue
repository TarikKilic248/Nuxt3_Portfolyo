<script setup lang="ts">
const todoStore = useTodoStore()

const selectedUser = ref < number > (1)
const store = useUserStore()

function selectUser() {
  store.CurrentUser = selectedUser.value
}

onMounted(async () => {
  if (!todoStore.todoList)
    await todoStore.fetchTodoList()
})
</script>

<template>
  <USelectMenu
    v-model="selectedUser"
    class="w-60"
    :options="todoStore.mergedArray"
    placeholder="Select a person"
    option-attribute="name"
    value-attribute="id"
    @change="selectUser"
  />
</template>
