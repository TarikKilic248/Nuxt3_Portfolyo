<script setup lang="ts">

const message = ref("Nuxt");

function hello() {
  sayHello(message.value);
}

const { data } = await useFetch('/api/hello')

</script>

<template>
  <NuxtLink to="/about">GoTo About Page / </NuxtLink>
  <NuxtLink to="/todo">   GoTo TODO Page / </NuxtLink>
  <NuxtLink to="/quote">   GoTo Quote Page</NuxtLink>


    <UAlert
      title="Customize Alert Avatar"
      description="Insert custom content into the avatar slot!"
      :avatar="{
        src: 'https://avatars.githubusercontent.com/u/739984?v=4',
        alt: 'Avatar',
      }"
    >
      <template #avatar="{ avatar }">
        <UAvatar
          v-bind="avatar"
          chip-color="primary"
          chip-text=""
          chip-position="top-right"
        />
      </template>
    </UAlert>
  <div>
    <UButton color="primary" variant="solid">Button</UButton>
    <h1>Welcome to the homepage</h1>
    <AppAlert> This is an auto-imported component </AppAlert>
  </div>

  <h1>Demo with auto imports</h1>
  <form class="flex gap-2" @submit.prevent="hello">
    <CustomInput v-model="message" />
    <UButton type="submit"> Hello </UButton>
  </form>


  <div>
    <p>
      Result of <UKbd
        size="md"
        value="/api/hello"
      />:
    </p>
    <pre>{{ data }}</pre>
  </div>


</template>

<style>
body {
  background-color: rgb(124, 163, 163);
}
</style>
