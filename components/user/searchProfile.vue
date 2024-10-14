<script setup lang="ts">

const userStore = useUserStore()
const selectedUserId = ref<number>()
const query = ref('')

const selectedUser = computed(() => {
  return userStore.userList?.find(user => user.userId === selectedUserId.value)
})

</script>

<template>
  <div>
    <USelectMenu class="w-60"
      v-model="selectedUserId"
      v-model:query="query"
      :options="userStore.userList?.map(user => ({ 
        label: user.name, 
        value: user.userId, 
        thumbnail: user.picture 
      }))"
      placeholder="Select a person"
      searchable
    />
  </div>
</template>

  
