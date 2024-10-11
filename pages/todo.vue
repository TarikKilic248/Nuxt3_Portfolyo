<script setup lang="ts">
import type { Todo } from "~/types";

const todoList = ref<Todo[]>();

fetch("https://dummyjson.com/todos")
  .then((res) => res.json())
  .then((nw) => {
    console.log(nw);
    todoList.value = nw.todos;
  });
</script>

<template>
  <NuxtLink class to="/about">Go To About Page /</NuxtLink>
  <NuxtLink to="/">   Go To Home Page</NuxtLink>

  <div v-for="todo in todoList" :key="todo.id">
    <CardTodo class="my-2" :todo="todo" />
  </div>

</template>

<style>
body {
  background-color: rgb(124, 163, 163);
}
</style>
