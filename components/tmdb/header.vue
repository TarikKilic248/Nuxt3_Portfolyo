<script setup lang="ts"></script>

<script setup lang="ts"></script>

<template>
  <div class="flex w-full h-full justify-around">
    <UButton
      label="Movies"
      class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-16 py-2.5 text-center mr-2 mb-2 shadow-none focus:shadow-blue-400/50 active:shadow-lg dark:focus:shadow-blue-800/80 dark:active:shadow-lg"
      @click="$router.push('/movie')"
    />

    <UButton
      label="TV Shows"
      class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-16 py-2.5 text-center mr-2 mb-2 shadow-none focus:shadow-blue-400/50 active:shadow-lg dark:focus:shadow-blue-800/80 dark:active:shadow-lg"
      @click="$router.push('/tv')"
    />
  </div>
</template>

