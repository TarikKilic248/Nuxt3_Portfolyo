<script setup lang="ts">
import { usePokemonStore } from '~/stores/pokemon'
import { usePokemonPage } from '~/stores/pokemon/pages'

const pokemonStore = usePokemonStore()
const pokemonPageStore = usePokemonPage()

function playCry(cryUrl: string) {
  const audio = new Audio(cryUrl)
  audio.play()
}
</script>

<template>
  <UTable :rows="pokemonStore.paginatedRows" :columns="pokemonStore.pokemonColumns" class="h-full m-2">
    <template #name-data="{ row }">
      <div class="flex flex-row max-h-24 justify-start">
        <img
          :src="row.picture"
          class="-my-5 scale-75 hover:scale-100 cursor-pointer animation-all duration-300 delay-100 hover:rounded-full"
          :alt="row.name"
          @click="playCry(row.cries)"
          @mouseover="playCry(row.cries)"
        >
        <div class="flex items-center ml-5 capitalize font-sans font-bold text-lg">
          {{ row.name }}
        </div>
      </div>
    </template>

    <template #heightWeight-data="{ row }">
      <div class="py-1 lining-nums text-center">
        <p class="font-sans font-bold text-lg">
          {{ row.heightWeight }}
        </p>
      </div>
    </template>

    <template #stats-data="{ row }">
      <div class="py-1 text-center">
        <p class="font-sans font-bold text-lg">
          {{ row.stats }}
        </p>
      </div>
    </template>

    <template #types-data="{ row }">
      <div class="py-1 text-center">
        <p class="font-sans font-bold capitalize text-lg">
          {{ row.types }}
        </p>
      </div>
    </template>

    <template #features-data="{ row }">
      <UButton
        label="Details.." @click="() => {
          pokemonPageStore.isOpen = true;
          pokemonStore.selectedPokemon = row;
        }"
      />
    </template>
  </UTable>
</template>
