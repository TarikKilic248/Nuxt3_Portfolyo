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

export interface Pokemons {
  name: string
  abilities: object
  base_experience: number
  cries: string
  height: number
  sprites: {
    back: string
    front: string
  }
  stats: {
    attack: { base_stat: number, url: string }
    hp: { base_stat: number, url: string }
    special_attack: { base_stat: number, url: string }
    special_defence: { base_stat: number, url: string }
    speed: { base_stat: number, url: string }
  }
  types: object
  weight: number
  location_area_encounters: string
}
