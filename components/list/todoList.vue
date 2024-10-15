<script setup lang="ts">
const todoStore = useTodoStore()
// const userStore = useUserStore()
</script>

<template>
  
  <TransitionGroup name="list" tag="div" class="flex flex-col gap-3">
    <div v-for="todo in todoStore.mergedArray" :key="todo.id" class="myBorder gap-4 w-full flex justify-between px-3 py-2">
      <div :class="`h-4 w-4 border rounded-full mt-1 ${todo.completed ? 'bg-green-400' : ''}`" />
      <div class="flex w-full uppercase items-center">
        <label> {{ todo.title }} </label>
      </div>
    </div>
  </TransitionGroup>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
