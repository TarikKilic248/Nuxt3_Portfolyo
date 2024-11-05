import { useColorMode } from '@vueuse/core'
import { computed, onMounted, ref } from 'vue'

export function linkProvider() {
  const colorMode = useColorMode()
  const isLoaded = ref(false) // Yüklenme durumu
  const mediaType = ref('movie')

  // Uygulama yüklendiğinde isLoaded'ı true yap
  onMounted(() => {
    isLoaded.value = true
  })

  const defaultLinks = computed(() => [
    [{
      label: 'Tarık Kılıç Alsancak',
      avatar: {
        src: 'https://github.com/TarikKilic248.png',
      },
      click: () => window.open('https://github.com/TarikKilic248'),
    }],
    [{
      label: 'Home',
      icon: 'i-heroicons-home',
      to: { name: 'home' },
    }, {
      label: 'Todo List',
      icon: 'i-heroicons-calendar-days',
      to: { name: 'todo' },
    }, {
      label: 'Pokemon List',
      icon: 'i-heroicons-bug-ant',
      to: { name: 'pokemon' },
    }, {
      label: 'TMDB',
      icon: 'i-heroicons-tv',
      to: { name: 'tmdb', params: {
        media: mediaType.value,
      } },
    }, {
      class: 'flex items-center',
      // Yüklenme durumu için koşul ekliyoruz
      label: isLoaded.value && colorMode.value === 'dark' ? 'Dark' : 'Light',
      icon: isLoaded.value && colorMode.value === 'dark' ? 'i-heroicons-moon' : 'i-heroicons-sun',
      click: () => colorMode.value = colorMode.value === 'dark' ? 'light' : 'dark',
    }],
  ])

  return {
    defaultLinks,
  }
}
