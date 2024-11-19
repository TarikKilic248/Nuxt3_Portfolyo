<script setup lang="ts">
import { usePokemonStore } from '~/stores/pokemon'
import { usePokemonPage } from '~/stores/pokemon/pages'

const pokemonStore = usePokemonStore()
const pokemonPageStore = usePokemonPage()
</script>

<template>
  <UModal v-model="pokemonPageStore.isOpen" :overlay="false">
    <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
      <template #header>
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-lg font-semibold capitalize">
              {{ pokemonStore.selectedPokemon.name }}
            </h3>
            <p class="text-sm">
              Height: {{ pokemonStore.selectedPokemon.heightWeight.split(' / ')[0] }} cm
            </p>
            <p class="text-sm">
              Weight: {{ pokemonStore.selectedPokemon.heightWeight.split(' / ')[1] }} kg
            </p>
          </div>
          <div class="flex items-center space-x-4">
            <img :src="pokemonStore.selectedPokemon.picture" alt="Front sprite" class="scale-125">
            <img :src="pokemonStore.selectedPokemon.backPicture" alt="Back sprite" class="scale-125">
          </div>
        </div>
      </template>

      <Placeholder class="h-32">
        <div>
          <div class="p-4">
            <h4 class="font-semibold mb-2">
              Abilities
            </h4>
            <ul class="list-disc pl-4">
              <li v-for="(ability, index) in pokemonStore.selectedPokemon.features.abilities" :key="index">
                {{ index }}
              </li>
            </ul>
          </div>

          <div class="p-4">
            <h4 class="font-semibold mt-4 mb-2">
              Stats
            </h4>
            <ul class="list-disc pl-4">
              <li v-for="(stast, index) in pokemonStore.selectedPokemon.features.stats" :key="index">
                {{ index }}, {{ stast.base_stat }}
              </li>
            </ul>
          </div>

          <div>
            <h4 class="font-semibold mt-4 mb-2">
              Types
            </h4>
            <ul class="list-disc pl-4">
              <li v-for="(types, index) in pokemonStore.selectedPokemon.features.types" :key="index">
                {{ index }}, slot {{ types.slot }}
              </li>
            </ul>
          </div>
        </div>
      </Placeholder>

      <template #footer>
        <div class="p-4">
          <p><strong>Base Experience:</strong> {{ pokemonStore.selectedPokemon.base_experience }}</p>
          <p><strong>Location Encounters:</strong> {{ pokemonStore.selectedPokemon.location_area_encounters }}</p>
        </div>
      </template>
    </UCard>
  </UModal>
</template>
