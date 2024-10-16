<script setup lang="ts">
import type { Todo } from '~/types';

const userStore = useUserStore()

const handleButtonClick = (button: string) => {
  let selectedUserTodo: Todo[] = [];

  if (userStore.selectedUser) {
    if (button === 'Done') {
      selectedUserTodo = userStore.selectedUser.todos.filter(todo => todo.completed === true);
    } 
    else if (button === 'Not Done') {
      selectedUserTodo = userStore.selectedUser.todos.filter(todo => todo.completed === false);
    } 
    else if (button === 'All') {
      selectedUserTodo = userStore.selectedUser.todos; 
    }
  }

  // userStore.selectedUser?.todos = selectedUserTodo; 
};
</script>

<template>
  <div>
    <div class="flex gap-2 mb-4 justify-between myBorder items-center">
      <ButtonSmall
        v-for="item in ['Done', 'Not Done', 'All']"
        :key="item"
        class="flex justify-between myBorder items-center"
        :label="item"
        @click="handleButtonClick(item)"
      />
    </div>

    <TransitionGroup name="list" tag="div" class="flex flex-col gap-3">
      <div 
        v-for="todo in userStore.selectedUser?.todos" 
        :key="todo.id" 
        class="myBorder gap-4 w-full flex justify-between px-3 py-2"
      >
        <div :class="`h-4 w-4 border rounded-full mt-1 ${todo.completed ? 'bg-green-400' : ''}`" />
        <div class="flex w-full items-center">
          <label> {{ todo.title }} </label>
        </div>
      </div>
    </TransitionGroup>
  </div>
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
