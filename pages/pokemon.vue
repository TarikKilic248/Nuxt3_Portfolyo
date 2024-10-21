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

const hoveredSprite = ref<string | null>(null)

function playCry(cryUrl: string) {
  const audio = new Audio(cryUrl)
  audio.play()
}

// Pokémon verilerini düzenleyip tabloya yerleştirme
const rows = computed(() => {
  return pokemons.value.slice((page.value - 1) * pageCount, page.value * pageCount).map((pokemon: Pokemons) => {
    return {
      name: pokemon.name,
      heightWeight: `${pokemon.content.height} / ${pokemon.content.weight}`,
      stats: `HP: ${pokemon.content.stats.hp.base_stat}, ATTACK: ${pokemon.content.stats.attack.base_stat}`,
      types: Object.keys(pokemon.content.types).join(', '),
      picture: pokemon.content.sprites.front, // İlk resim
      backPicture: pokemon.content.sprites.back, // Arka resim
      cries: pokemon.content.cries, // Cry URL
    }
  })
})
</script>

<template>
  <NuxtLayout name="default">
    <div>
      <div class="w-full h-full overflow-auto myBorder">
        <UTable :rows="rows">
          <template #name-data="{ row }">
            {{ row.name }}
          </template>

          <template #heightWeight-data="{ row }">
            {{ row.heightWeight }}
          </template>

          <template #stats-data="{ row }">
            {{ row.stats }}
          </template>

          <template #types-data="{ row }">
            {{ row.types }}
          </template>

          <!-- Picture Column with Hover and Click for Cry Sound -->
          <template #picture-data="{ row }">
            <img
              :src="hoveredSprite || row.picture"
              class="pokemon-image w-20 h-20 cursor-pointer"
              :alt="row.name"
              @mouseover="hoveredSprite = row.backPicture"
              @mouseleave="hoveredSprite = row.picture"
              @click="playCry(row.cries)"
            >
          </template>
        </UTable>

        <!-- Pagination -->
        <div class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700">
          <UPagination v-model="page" :page-count="pageCount" :total="pokemons.length" />
        </div>
      </div>
    </div>

    <!-- Pokémon Card Component -->
    <PokemonCard :poke="pokemonStore.pokemons" />
  </NuxtLayout>
</template>
