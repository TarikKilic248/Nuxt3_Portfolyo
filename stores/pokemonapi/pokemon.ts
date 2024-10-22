import type { Pokemon, Pokemons } from '~/types'

export const usePokemonStore = defineStore('pokemon', () => {
  const pokemons = ref<Pokemons[]>([])
  const types = ref()
  const selectedPokemon = ref()

  const fetchPokemonApi = async () => {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1301')
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

          //   const cries = {
          //     latest: `https://cries.com/latest/${pokemon.name}`,
          //     legacy: `https://cries.com/legacy/${pokemon.name}`,
          //   }

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
            content: {
              abilities,
              base_experience,
              cries,
              height,
              sprites,
              stats,
              types,
              weight,
              location_area_encounters,
            },

          }
        }),
      )

      pokemons.value = fetchedPokemons
      localStorage.setItem('pokemons', JSON.stringify(fetchedPokemons))

      await fetch('https://pokeapi.co/api/v2/type/')
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
    types,
    selectedPokemon,

    fetchPokemonApi,
  }
})
