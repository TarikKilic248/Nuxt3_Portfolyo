<script setup lang="ts">
import { usePokemonStore } from '~/stores/pokemonapi/pokemon'

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
  }
  else {
    await pokemonStore.fetchPokemonApi()
  }
})

const page = ref(1)
const pageCount = 10

const rows = computed(() => {
  return pokemons.value.slice((page.value - 1) * pageCount, (page.value) * pageCount)
})
</script>

<template>
  <NuxtLayout name="default">
    <div>
      <div class="w-full h-full overflow-auto myBorder">
        <UTable :rows="rows" />

        <div class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700">
          <UPagination v-model="page" :page-count="pageCount" :total="pokemons.length" />
        </div>
      </div>
    </div>
    {{ pokemons }}
  </NuxtLayout>
</template>
