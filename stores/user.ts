import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Todo, UserWithTodo } from '~/types';

export const useUserStore = defineStore('user', () => {
  const selectedUser = ref<UserWithTodo>();
  const selectedUserId = computed(() => selectedUser.value?.id)

  return {
    selectedUser,
    selectedUserId,
  }
});
