export interface Todo {
  userId: number
  id: number
  title: any
  completed: boolean
  todo: string
}

export interface User {
  id: number
  name: string
  picture: string
}

export interface UserWithTodo extends User {
  todos: Todo[]
}

export interface PokemonContent {
  abilities: object
  base_experience: number
  cries: string
  height: number
  name: string
  sprites: object
  stats: object
  types: object
  weight: number
  location_area_encounters: string
}

export interface Pokemons {
  name: string
  content: PokemonContent
}

export interface Pokemon {
  name: string
  url: string
}
