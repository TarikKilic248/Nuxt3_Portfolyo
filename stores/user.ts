import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  const selectedUser = ref<number | null>(null)

  const CurrentUser = computed({
    get() {
      return selectedUser.value;
    },
    set(val: number) {
      selectedUser.value = val;
    }
  });

  return {
    CurrentUser,
  }
});
