import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Todo, UserWithTodo } from '~/types'

export const useUserStore = defineStore('user', () => {
  const selectedUser = ref<UserWithTodo>()
  const selectedUserId = computed(() => selectedUser.value?.id)

  return {
    selectedUser,
    selectedUserId,
  }
})
