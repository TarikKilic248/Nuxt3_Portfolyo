import type { Pokemons } from '~/types'
import { usePokemonPage } from './pokemonPage'

export const usePokemonStore = defineStore('pokemon', () => {
  const pokemonPageStore = usePokemonPage()

  const pokemons = ref<Pokemons[]>()
  const types = ref()
  const selectedPokemon = ref()
  const pokemonLimit = ref(300)
  const pokemonTypeUrl = `${useRuntimeConfig().public.pokemonTypeUrl}` // burada ref degiskeni ile islem yapilmiyor

  const pokemonColumns = [
    { key: 'name', label: 'Name' },
    { key: 'heightWeight', label: 'Height / Weight' },
    { key: 'stats', label: 'Stats' },
    { key: 'types', label: 'Types' },
    { key: 'features', label: 'Features' },
  ]

  const filteredRows = computed(() => {
    return pokemons.value?.filter((pokemon: Pokemons) => {
      const hp = pokemon.stats.hp.base_stat
      const attack = pokemon.stats.attack.base_stat

      const Poketypes = Object.keys(pokemon.types)
      const matchesType = pokemonPageStore.typeSelected.length === 0 || pokemonPageStore.typeSelected.some(type => Poketypes.includes(type))

      const matchesInput = pokemon.name.toLowerCase().includes(pokemonPageStore.inputSelected.toLowerCase())

      return hp <= pokemonPageStore.hpSelected && attack <= pokemonPageStore.damageSelected && matchesType && matchesInput
    })
  })

  pokemonPageStore.totalPage = computed(() => {
    return filteredRows.value?.length
  })

  const mappedRows = computed(() => {
    return filteredRows.value?.map((pokemon: Pokemons) => {
      return {
        name: pokemon.name,
        heightWeight: `${pokemon.height} / ${pokemon.weight}`,
        stats: `HP: ${pokemon.stats.hp.base_stat}, ATTACK: ${pokemon.stats.attack.base_stat}`,
        types: Object.keys(pokemon.types).join(', '),
        picture: pokemon.sprites.front,
        backPicture: pokemon.sprites.back,
        cries: pokemon.cries,
        features: pokemon,
        base_experience: pokemon.base_experience,
        location_area_encounters: pokemon.location_area_encounters,
      }
    })
  })

  const paginatedRows = computed(() => {
    const startIndex = (pokemonPageStore.page - 1) * pokemonPageStore.pageCount
    const endIndex = pokemonPageStore.page * pokemonPageStore.pageCount
    return mappedRows.value?.slice(startIndex, endIndex)
  })

  const fetchPokemonApi = async () => {
    try {
      const response = await fetch(`${useRuntimeConfig().public.pokemonUrl}?limit=${pokemonLimit.value}`)
      const data = await response.json()

      const fetchedPokemons = await Promise.all(
        data.results.map(async (pokemon: { name: string, url: string }) => {
          const detailsResponse = await fetch(pokemon.url)
          const details = await detailsResponse.json()

          const height = details.height

          const weight = details.weight

          const sprites = {
            front: details.sprites.front_default,
            back: details.sprites.back_default,
          }

          const cries = details.cries.latest

          const stats: { [key: string]: { base_stat: number, url: string } } = {}
          details.stats.forEach((element: { stat: { name: string, url: string }, base_stat: number }) => {
            const statName = element.stat.name
            stats[statName] = {
              base_stat: element.base_stat,
              url: element.stat.url,
            }
          })

          const abilities: { [key: string]: { is_hidden: boolean, url: string } } = {}
          details.abilities.forEach((element: { ability: { name: string, url: string }, is_hidden: boolean }) => {
            const statName = element.ability.name
            abilities[statName] = {
              is_hidden: element.is_hidden,
              url: element.ability.url,
            }
          })

          const base_experience = details.base_experience

          const location_area_encounters = details.location_area_encounters

          const types: { [key: string]: { slot: number, url: string } } = {}
          details.types.forEach((element: { type: { name: string, url: string }, slot: number }) => {
            const statName = element.type.name
            types[statName] = {
              slot: element.slot,
              url: element.type.url,
            }
          })

          return {
            name: pokemon.name,
            abilities,
            base_experience,
            cries,
            height,
            sprites,
            stats,
            types,
            weight,
            location_area_encounters,

          }
        }),
      )

      pokemons.value = fetchedPokemons

      await fetch(pokemonTypeUrl)
        .then(_response => _response.json())
        .then((_data) => {
          types.value = _data.results
        })

      types.value = types.value.map((type: { name: string }) => type.name)
    }
    catch (error) {
      console.error('Pokémon verileri alınırken hata oluştu:', error)
    }
  }

  return {
    pokemons,
    pokemonLimit,
    types,
    selectedPokemon,

    paginatedRows,
    pokemonColumns,

    fetchPokemonApi,
  }
})
