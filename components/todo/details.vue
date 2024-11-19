<script setup lang="ts">
import { useTodoStore } from '~/stores/todo'

const todoStore = useTodoStore()
</script>

<template>
  <div class="text-center font-sans text-base p-1">
    <p>
      About:
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perferendis, voluptates soluta.
      Quaerat beatae, laboriosam natus porro possimus optio eveniet omnis blanditiis asperiores.
      Harum quam natus accusantium, quae earum minus unde!
    </p>
  </div>

  <div class="flex flex-col gap-3 pl-1 text-sans">
    Contact:
    <div v-if="todoStore.selectedUser">
      <li>
        Email: {{ todoStore.selectedUser.email }}
      </li>
      <li>
        Cell: {{ todoStore.selectedUser.phone }}
      </li>
      <li>
        Address: {{ todoStore.selectedUser.location.city }}, {{ todoStore.selectedUser.location.state }}
        {{ todoStore.selectedUser.nat }}
      </li>
    </div>
  </div>
</template>
