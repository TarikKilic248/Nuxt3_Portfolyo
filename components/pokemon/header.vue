<script setup lang="ts">
import { usePokemonStore } from '~/stores/pokemon'
import { usePokemonPage } from '~/stores/pokemon/pages'

const pokemonStore = usePokemonStore()
const pokemonPageStore = usePokemonPage()
</script>

<template>
  <div class="h-20 py-5 px-10 flex gap-2 gap-x-8 pl-5">
    <h1 class="text-xl font-semibold">
      Pokemon Filtreleme
    </h1>
    <UInput v-model="pokemonPageStore.inputSelected" class="shrink-0" placeholder="Search.." />
    <USelectMenu v-model="pokemonPageStore.typeSelected" :options="pokemonStore.types" multiple placeholder="Select type" />
    <div class="flex items-center min-w-64 gap-2 h-full px-2">
      HP
      <URange v-model="pokemonPageStore.hpSelected" label="asd" color="red" size="sm" :max="200" class="w-full md:w-40 " />
      {{ pokemonPageStore.hpSelected }}
    </div>
    <div class="flex items-center min-w-64 gap-2 h-full px-2">
      ATTACK
      <URange v-model="pokemonPageStore.damageSelected" label="asd" color="red" size="sm" :max="200" class="w-full md:w-40 " />
      {{ pokemonPageStore.damageSelected }}
    </div>
    <div>
      <p>Number of pokemons</p>
      <UInput v-model="pokemonStore.pokemonLimit" type="number" class="w-24" placeholder="300" />
    </div>
  </div>
</template>
