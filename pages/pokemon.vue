<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { usePokemonStore } from '~/stores/pokemon'
import { usePokemonPage } from '~/stores/pokemon/pages'

definePageMeta({
  name: 'pokemon',
})

// GÖREV 3
// pokemon api kullanarak pokemonları çek
// çektiğin pokemonları nuxtui da bulunan table componenti ile listele
// tabloda bulunan detay butonuna tıklayınca pokemonun resmiyle beraber detaylarını gösteren bir modal açılmalı
// kullanıcı pokemonları bir çok filtre üzerinden filtreleyebilmeli
// bu filtrelerin arasında isimleriyle pokemon aramamızı sağlayan bir input olmalı ve anlık olarak çalışmalı
// en önemlisi ise paginatör bulunmalı ve pokemonları sayfa sayfa göstermeli

// bu görevde pokemonu tercih etmiyor isen görevleri tamamlayabileceğin başka bir api kullanabilirsin
// fakat unutma eğer tercih ettiğin api, apikey gerektiriyorsa .env dosyasına eklemen çok önemli

const pokemonStore = usePokemonStore()
const pokemonPageStore = usePokemonPage()

onMounted(async () => {
  await pokemonStore.fetchPokemonApi()
})

watch(() => pokemonStore.pokemonLimit, async () => {
  pokemonStore.pokemons = undefined
  await pokemonStore.fetchPokemonApi()
})

function playCry(cryUrl: string) {
  const audio = new Audio(cryUrl)
  audio.play()
}
</script>

<template>
  <NuxtLayout name="default">
    <div class="flex h-full flex-col justify-between gap-2">
      <div class="h-16 py-5 px-10 flex gap-2 gap-x-8">
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
          <p>Number of pokemons(limit=1301)</p>
          <UInput v-model="pokemonStore.pokemonLimit" type="number" class="w-24" placeholder="300" />
        </div>
      </div>

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
      <div class="flex w-full justify-center">
        <UPagination v-model="pokemonPageStore.page" :page-count="pokemonPageStore.pageCount" :total="pokemonPageStore.totalPage" />
      </div>
    </div>
  </NuxtLayout>

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
        <div class="p-4">
          <h4 class="font-semibold mb-2">
            Abilities
          </h4>
          <ul class="list-disc pl-4">
            <li v-for="(ability, index) in pokemonStore.selectedPokemon.features.abilities" :key="index">
              {{ index }}, {{ ability.url }}
            </li>
          </ul>
        </div>

        <div class="p-4">
          <h4 class="font-semibold mt-4 mb-2">
            Stats
          </h4>
          <ul class="list-disc pl-4">
            <li v-for="(stast, index) in pokemonStore.selectedPokemon.features.stats" :key="index">
              {{ index }}, {{ stast.base_stat }}, {{ stast.url }}
            </li>
          </ul>
        </div>

        <div>
          <h4 class="font-semibold mt-4 mb-2">
            Types
          </h4>
          <ul class="list-disc pl-4">
            <li v-for="(types, index) in pokemonStore.selectedPokemon.features.types" :key="index">
              {{ index }}, slot {{ types.slot }}, {{ types.url }}
            </li>
          </ul>
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

  <div v-if="!pokemonStore.pokemons" class="fixed top-0 left-0 w-full h-full bg-gray-950 opacity-60 z-50 flex justify-center items-center">
    <div class="h-6 w-6 border animate-spin" />
  </div>
</template>
