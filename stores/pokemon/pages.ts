import { defineStore } from 'pinia'

export const usePokemonPage = defineStore('pokemonPage', () => {
  const page = ref(1)
  const pageCount = ref<number>(20)
  const totalPage = ref()

  const isOpen = ref(false)
  const openFilter = ref(false)
  const inputSelected = ref<string>('')
  const typeSelected = ref<string[]>([])
  const hpSelected = ref(50)
  const damageSelected = ref(50)

  return {
    page,
    pageCount,
    totalPage,

    isOpen,
    openFilter,
    inputSelected,
    typeSelected,
    hpSelected,
    damageSelected,
  }
})
