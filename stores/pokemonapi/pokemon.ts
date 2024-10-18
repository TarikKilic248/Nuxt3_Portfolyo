import type { Pokemon } from "~/types";

export const usePokemonStore = defineStore('pokemon', () => {
    const pokemons = ref<Pokemon[]>([]);

    const fetchPokemonApi = async () => {
        try {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=50');
            const data = await response.json();

            const fetchedPokemons = await Promise.all(
                data.results.map(async (pokemon: { name: string, url: string }) => {
                    
                    const detailsResponse = await fetch(pokemon.url);
                    const details = await detailsResponse.json();

                    
                    const abilities = details.abilities.map((ability: any) => 
                        `${ability.ability.name}, hidden: ${ability.is_hidden}`).join(' - ');

                    const base_experience = details.base_experience

                    const cries = {
                        latest: `https://cries.com/latest/${pokemon.name}`,
                        legacy: `https://cries.com/legacy/${pokemon.name}`,
                    };

                    const forms = details.forms.map((form: any) => form.name).join(', ')

                    const stats = details.stats.map((stat: any) => 
                        `${stat.stat.name}: ${stat.base_stat}`).join(', ');
                    
                    const types = details.types.map((typeSlot: any) => typeSlot.type.name).join(', ');

                    return {
                        customId: pokemon.name,        
                        abilities: abilities,         
                        base_experience: base_experience,
                        cries,
                        stats,
                        types,
                        forms:forms,              
                    };
                })
            );

            pokemons.value = fetchedPokemons;

            localStorage.setItem('pokemons', JSON.stringify(fetchedPokemons));

        } catch (error) {
            console.error("Pokémon verileri alınırken hata oluştu:", error);
        }
    };


    return{
        pokemons,

        fetchPokemonApi,
    }
})