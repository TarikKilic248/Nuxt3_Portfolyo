<script setup>
const id = ref(1);
definePageMeta({
  name: "quote",
});
</script>

<template>
  <div class="flex flex-col gap-2">
    <NuxtLink class="underline" to="/"> Back to Home </NuxtLink>
    <p>Example of data fetching inside a component:</p>

    <p>
      <UButton @click="id--"> Previous </UButton> -
      <UButton @click="id++"> Next </UButton>
    </p>

    <CardTheQuote :id="id" />
  </div>
</template>
