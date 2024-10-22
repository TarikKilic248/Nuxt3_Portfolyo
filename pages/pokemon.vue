<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { usePokemonStore } from '~/stores/pokemonapi/pokemon'
import type { Pokemons } from '~/types'

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
const pokemons = ref < [] > ([])

onMounted(async () => {
  const storedPokemons = localStorage.getItem('pokemons')

  if (storedPokemons) {
    pokemons.value = JSON.parse(storedPokemons)
    await pokemonStore.fetchPokemonApi()
  }
  else {
    await pokemonStore.fetchPokemonApi()
  }
})

const page = ref(1)
const pageCount = 20

const isOpen = ref(false)
const openFilter = ref(false)
const inputSelected = ref<string>('')
const typeSelected = ref<string[]>([])
const hpSelected = ref(50)
const damageSelected = ref(50)

function playCry(cryUrl: string) {
  const audio = new Audio(cryUrl)
  audio.play()
}

const rows = computed(() => {
  return pokemons.value
    .filter((pokemon: Pokemons) => {
      const hp = Number.parseInt(pokemon.content.stats.hp.base_stat)
      const attack = Number.parseInt(pokemon.content.stats.attack.base_stat)

      const types = Object.keys(pokemon.content.types) // types'ı array olarak alıyoruz
      const matchesType = typeSelected.value.length === 0 || typeSelected.value.some(type => types.includes(type))

      // Filtreleme için HP ve Attack sınırını kontrol ediyoruz
      return hp <= hpSelected.value && attack <= damageSelected.value && matchesType
    })
    .slice((page.value - 1) * pageCount, page.value * pageCount) // Sayfalama işlemi
    .map((pokemon: Pokemons) => {
      return {
        name: pokemon.name,
        heightWeight: `${pokemon.content.height} / ${pokemon.content.weight}`,
        stats: `HP: ${pokemon.content.stats.hp.base_stat}, ATTACK: ${pokemon.content.stats.attack.base_stat}`,
        types: Object.keys(pokemon.content.types).join(', '),
        picture: pokemon.content.sprites.front,
        backPicture: pokemon.content.sprites.back,
        cries: pokemon.content.cries,
        features: pokemon.content,
        base_experience: pokemon.content.base_experience,
        location_area_encounters: pokemon.content.location_area_encounters,
      }
    })
})

const columnsTable = [
  { key: 'name', label: 'Name' },
  { key: 'heightWeight', label: 'Height / Weight' },
  { key: 'stats', label: 'Stats' },
  { key: 'types', label: 'Types' },
  { key: 'features', label: 'Features' },
]
</script>

<template>
  <NuxtLayout name="default">
    <div class="flex h-full flex-col justify-between gap-2">
      <div class="h-16 py-5 px-10 flex gap-2 gap-x-8">
        <h1 class="text-xl font-semibold">
          Pokemon Filtreleme
        </h1>
        <UInput v-model="inputSelected" placeholder="Search.." />
        <USelectMenu v-model="typeSelected" :options="pokemonStore.types" multiple placeholder="Select type" />
        <div class="m-1 grid grid-cols-2">
          <URange v-model="hpSelected" color="red" size="sm" class="w-40" />
          <URange v-model="damageSelected" color="red" size="sm" class="w-40 ml-5" />
          <p class="text-center">
            HP: {{ hpSelected }}
          </p>
          <p class="text-center">
            ATTACK: {{ damageSelected }}
          </p>
        </div>
      </div>
      {{ inputSelected }}
      <UTable :rows="rows" :columns="columnsTable" class="h-full m-2">
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
              isOpen = true;
              pokemonStore.selectedPokemon = row;
            }"
          />
        </template>
      </UTable>
      <div class="flex w-full justify-center">
        <UPagination v-model="page" :page-count="pageCount" :total="pokemons.length" />
      </div>
    </div>
    <!--
    <div class="flex justify-between px-3 py-3.5 border-t border-gray-200 dark:border-gray-700">
      <ButtonFilter @click="openFilter = true" />
      <UPagination v-model="page" :page-count="pageCount" :total="pokemons.length" />
    </div> -->
  </NuxtLayout>

  <UModal v-model="isOpen" :overlay="false">
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
</template>
