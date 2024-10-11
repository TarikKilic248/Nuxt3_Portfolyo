<script setup lang="ts">
import type { Todo } from "~/types";

defineProps<{
  todo: Todo;
}>();
</script>

<template>
  <UCard>
    <template #header> {{ todo.userId }} </template>
    {{ todo.todo }}
    <template #footer> {{ todo.completed }} </template>
  </UCard>
</template>
