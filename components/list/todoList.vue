<script setup lang="ts">
import { ref, computed } from 'vue';
import { useUserStore } from '~/stores/user';

const userStore = useUserStore();
const filterType = ref('All');

const selectedUserTodo = computed(() => {
  switch (filterType.value) {
    case 'Done':
      return userStore.selectedUser?.todos.filter(todo => todo.completed === true);
    case 'Not Done':
      return userStore.selectedUser?.todos.filter(todo => todo.completed === false);
    case 'All':
    default:
      return userStore.selectedUser?.todos;
  }
});

const handleButtonClick = (button: string) => {
  filterType.value = button;
};
</script>

<template>
  <div>
    <div class="flex gap-2 mb-4 justify-between myBorder items-center">
      <ButtonSmall
        v-for="item in ['All', 'Not Done', 'Done']"
        :key="item"
        class="flex justify-between myBorder items-center"
        :label="item"
        @click="handleButtonClick(item)"
        
      />
    </div>

    <TransitionGroup name="list" tag="div" class="flex flex-col gap-3">
      <div
        v-for="todo in selectedUserTodo"
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
