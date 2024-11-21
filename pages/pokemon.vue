<script setup lang="ts">
import { _max } from '#tailwind-config/theme/gridAutoColumns'
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
</script>

<template>
  <NuxtLayout name="default">
    <div class="flex h-full flex-col justify-between gap-2">
      <PokemonHeader />

      <PokemonTable />

      <div class="flex w-full justify-center">
        <UPagination v-model="pokemonPageStore.page" :page-count="pokemonPageStore.pageCount" :total="pokemonPageStore?.totalPage" />
      </div>
    </div>
  </NuxtLayout>
  <PokemonDetails />
  <LoadingScreen :api="pokemonStore.pokemons" />
</template>
