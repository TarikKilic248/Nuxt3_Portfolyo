<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import PokemonCard from '~/components/pokemon/pokemonCard.vue'
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
const pageCount = 5

function playCry(cryUrl: string) {
  const audio = new Audio(cryUrl)
  audio.play()
}

const rows = computed(() => {
  return pokemons.value.slice((page.value - 1) * pageCount, page.value * pageCount).map((pokemon: Pokemons) => {
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

const isOpen = ref(false)
</script>

<template>
  <NuxtLayout name="default">
    <div class="myBorder w-full h-full flex justify-center">
      <div class="myBorder w-3/4">
        <UTable :rows="rows" :columns="columnsTable">
          <template #name-data="{ row }">
            <div class="myBorder flex flex-row max-h-24">
              <img
                :src="row.picture"
                class="myBorder -my-5 scale-75 hover:scale-100 cursor-pointer "
                :alt="row.name"
                @click="playCry(row.cries)"
              >
              <div class="flex justify-center items-center capitalize">
                {{ row.name }}
              </div>
            </div>
          </template>

          <template #heightWeight-data="{ row }">
            <div class="py-1 myBorder lining-nums text-center">
              {{ row.heightWeight }}
            </div>
          </template>

          <template #stats-data="{ row }">
            <div class="py-1 myBorder">
              {{ row.stats }}
            </div>
          </template>

          <template #types-data="{ row }">
            <div class="py-1 myBorder">
              {{ row.types }}
            </div>
          </template>

          <template #features-data="{ row }">
            <UButton
              label="Go to.." @click="() => {
                isOpen = true;
                pokemonStore.selectedPokemon = row;
              }"
            />
          </template>
        </UTable>

        <div class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700">
          <UPagination v-model="page" :page-count="pageCount" :total="pokemons.length" />
        </div>
      </div>
    </div>
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
            <img :src="pokemonStore.selectedPokemon.picture" alt="Front sprite" class="w-16 h-16">
            <img :src="pokemonStore.selectedPokemon.backPicture" alt="Back sprite" class="w-16 h-16">
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
